import { chromium } from 'playwright';

const BASE = 'http://localhost:4174';
const results = [];
const check = (ok, name, detail = '') => results.push({ ok, name, detail });

const routes = [
  ['/', 'Home'],
  ['/work', 'Work'],
  ['/work/namaa', 'Case study: namaa'],
  ['/work/study-os', 'Case study: study-os'],
  ['/work/climatify', 'Case study: climatify'],
  ['/systems', 'Systems'],
  ['/thinking', 'Thinking'],
  ['/thinking/designing-systems-with-sustainability-in-mind', 'Article'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/definitely-not-a-page', '404'],
];

const browser = await chromium.launch();

for (const [path, label] of routes) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  const bad = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => bad.push('FAILED ' + r.url()));
  page.on('response', (r) => {
    if (r.status() >= 400) bad.push(r.status() + ' ' + r.url());
  });

  const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  const state = await page.evaluate(() => {
    const main = document.querySelector('#main');
    const portrait = document.querySelector('[data-identity] img');
    return {
      status: document.readyState,
      title: document.title,
      mainText: main ? main.innerText.trim().length : 0,
      h1: main?.querySelector('h1')?.innerText?.replace(/\s+/g, ' ').trim() ?? null,
      firstHeading: (() => {
        const el = main?.querySelector('h1, h2, h3');
        return el ? `${el.tagName} ${el.innerText.replace(/\s+/g, ' ').trim().slice(0, 60)}` : null;
      })(),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      portrait: portrait
        ? { ok: portrait.complete && portrait.naturalWidth === 1280, w: portrait.naturalWidth }
        : null,
      lang: document.documentElement.lang,
    };
  });

  const is404 = path === '/definitely-not-a-page';
  check(resp.status() === 200, `${label}: HTTP 200 on direct load (${path})`, `status=${resp.status()}`);
  check(errors.length === 0, `${label}: no console errors`, errors.join(' | '));
  check(bad.length === 0, `${label}: no failed/4xx requests`, bad.join(' | '));
  check(state.mainText > 120, `${label}: page content rendered`, `chars=${state.mainText}`);
  check(state.title.length > 5, `${label}: document.title set`, `title="${state.title}"`);
  check(state.canonical !== null, `${label}: canonical rewritten per route`, state.canonical);
  check(
    state.canonical !== null && !state.canonical.includes('example.com'),
    `${label}: canonical uses real domain (BASE_URL placeholder replaced)`,
    state.canonical
  );
  check(state.lang === 'en', `${label}: html lang`, state.lang);

  if (path === '/' || path === '/about') {
    check(state.portrait?.ok, `${label}: portrait loaded from /images/lofty-portrait.jpg`, JSON.stringify(state.portrait));
  }

  console.log(
    `${is404 ? '404 ' : '   '} ${path.padEnd(54)} title="${state.title}" heading=${JSON.stringify(state.firstHeading)}${state.h1 ? '' : ' (no h1)'}`
  );

  await ctx.close();
}

/* ---- client-side navigation keeps the SPA alive (no full reload) ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    window.__spaProbe = 1;
  });
  await page.click('nav a[href="/work"]');
  await page.waitForURL('**/work', { timeout: 5000 });
  await page.waitForTimeout(600);
  const probe = await page.evaluate(() => window.__spaProbe);
  const heading = (await page.locator('#main').innerText()).slice(0, 80).replace(/\s+/g, ' ').trim();
  check(probe === 1, 'SPA nav: link click does not full-reload the page', `probe=${probe}`);
  check(errors.length === 0, 'SPA nav: no page errors', errors.join(' | '));
  console.log(`\nSPA nav -> /work  main[0..80]=${JSON.stringify(heading)}`);

  // deep-link reload still works after client nav
  await page.reload({ waitUntil: 'networkidle' });
  const headingB = (await page.locator('#main').innerText()).slice(0, 80).replace(/\s+/g, ' ').trim();
  check(headingB === heading, 'deep link reload renders same page', `${heading} | ${headingB}`);
  await ctx.close();
}

/* ---- static files ---- */
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const checks = [
    ['/images/lofty-portrait.jpg', /image\/jpeg/],
    ['/favicon.svg', /image\/svg\+xml/],
    ['/sitemap.xml', /xml/],
    ['/robots.txt', /text\/plain/],
    ['/_redirects', /text\/plain|octet-stream/],
  ];
  for (const [url, type] of checks) {
    const r = await page.request.get(BASE + url);
    const ct = r.headers()['content-type'] || '';
    const body = await r.body();
    const okType = url === '/_redirects' || type.test(ct);
    check(r.status() === 200 && okType && body.length > 0, `static: ${url}`, `${r.status()} ${ct || '(no content-type)'} bytes=${body.length}`);
    console.log(`static ${url.padEnd(30)} ${r.status()} ${ct} ${body.length}B`);
  }

  // sitemap + robots content sanity
  const sitemap = await (await page.request.get(BASE + '/sitemap.xml')).text();
  const robots = await (await page.request.get(BASE + '/robots.txt')).text();
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const paths = locs.map((u) => new URL(u).pathname);
  const expected = [
    '/', '/work', '/work/namaa', '/work/study-os', '/work/climatify',
    '/systems', '/thinking',
    '/thinking/designing-systems-with-sustainability-in-mind',
    '/about', '/contact',
  ];
  const missing = expected.filter((p) => !paths.includes(p));
  check(missing.length === 0, 'sitemap: covers every app route', `missing=${missing.join(',')}`);
  check(!locs.some((u) => u.includes('example.com')), 'sitemap: no placeholder domain (replace before launch)', locs[0]);
  check(!robots.includes('example.com'), 'robots.txt: no placeholder domain (replace before launch)', robots.trim().split('\n').pop());
  const redirects = await (await page.request.get(BASE + '/_redirects')).text();
  check(/\/\*\s+\/index\.html\s+200/.test(redirects), '_redirects: SPA fallback rule', JSON.stringify(redirects));

  // index.html shipped to dist: canonical / og:url must not be the placeholder
  const indexHtml = await (await page.request.get(BASE + '/')).text();
  check(
    !indexHtml.includes('example.com'),
    'index.html: no placeholder canonical/og:url (replace before launch)',
    (indexHtml.match(/example\.com[^"]*/g) || []).join(', ')
  );
  check(
    indexHtml.includes('/assets/index-') && !indexHtml.includes('/src/main.tsx'),
    'index.html: built asset links, no dev module script',
    ''
  );
  await ctx.close();
}

await browser.close();

let fail = 0;
for (const r of results) {
  if (!r.ok) fail++;
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : '  :: ' + r.detail}`);
}
console.log(`\n${results.length - fail}/${results.length} passed`);
process.exit(fail ? 1 : 0);
