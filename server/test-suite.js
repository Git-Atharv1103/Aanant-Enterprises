import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${testName} - ${details}`);
  }
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data, headers: res.headers }));
    }).on('error', err => reject(err));
  });
}

async function runTests() {
  console.log('\n======================================================');
  console.log('   AANANT ENTERPRISES — COMPREHENSIVE AUTOMATED TESTS');
  console.log('======================================================\n');

  // TEST SUITE 1: API Server (port 5000)
  console.log('--- SUITE 1: API Backend Server (Port 5000) ---');
  try {
    const statusRes = await fetchUrl('http://localhost:5000/api/status');
    assert(statusRes.statusCode === 200, 'GET /api/status returns HTTP 200');
    const statusJson = JSON.parse(statusRes.data);
    assert(statusJson.status === 'operational', 'API status reports operational');
    assert(typeof statusJson.service === 'string', 'API service name present');
  } catch (err) {
    assert(false, 'API server reachable on port 5000', err.message);
  }

  try {
    const quotesRes = await fetchUrl('http://localhost:5000/api/quotes');
    assert(quotesRes.statusCode === 200, 'GET /api/quotes returns HTTP 200');
    const quotesJson = JSON.parse(quotesRes.data);
    assert(quotesJson.success === true, 'GET /api/quotes returns success true');
  } catch (err) {
    assert(false, 'Quotes endpoint reachable', err.message);
  }

  try {
    const enquiriesRes = await fetchUrl('http://localhost:5000/api/enquiries');
    assert(enquiriesRes.statusCode === 200, 'GET /api/enquiries returns HTTP 200');
    const enquiriesJson = JSON.parse(enquiriesRes.data);
    assert(enquiriesJson.success === true, 'GET /api/enquiries returns success true');
  } catch (err) {
    assert(false, 'Enquiries endpoint reachable', err.message);
  }

  // TEST SUITE 2: Vite Frontend Dev Server (port 3000)
  console.log('\n--- SUITE 2: Vite Web Server (Port 3000) ---');
  try {
    const webRes = await fetchUrl('http://localhost:3000/');
    assert(webRes.statusCode === 200, 'GET http://localhost:3000/ returns HTTP 200');
    assert(webRes.data.includes('<title>'), 'HTML contains <title> tag');
    assert(webRes.data.includes('Aanant Enterprises'), 'HTML title contains Aanant Enterprises');
    assert(webRes.data.includes('id="root"'), 'HTML contains React #root element');
    assert(webRes.data.includes('/src/main.tsx'), 'HTML contains Vite entry script link');
  } catch (err) {
    assert(false, 'Web server reachable on port 3000', err.message);
  }

  // TEST SUITE 3: Static Public Assets Verification
  console.log('\n--- SUITE 3: Static Public Assets & SEO Files ---');
  const criticalFiles = [
    'index.html',
    'public/sitemap.xml',
    'public/robots.txt',
    'public/manifest.json',
    'public/favicon.svg',
    'public/images/aanant-logo.png'
  ];
  for (const file of criticalFiles) {
    const fullPath = path.join(ROOT, file);
    assert(fs.existsSync(fullPath), `Critical file exists: ${file}`);
  }

  // TEST SUITE 4: Corporate Gifting Asset Verification
  console.log('\n--- SUITE 4: Corporate Gifting Categories & Images ---');
  const giftingCategories = [
    'pens',
    'bags',
    'diaries',
    'bottles',
    'gift-combos',
    'office-accessories',
    'gift-boxes',
    'personalised-gifts'
  ];
  for (const cat of giftingCategories) {
    const dirPath = path.join(ROOT, 'public/images/corporate-gifting', cat);
    assert(fs.existsSync(dirPath), `Category folder exists: corporate-gifting/${cat}`);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      assert(files.length > 0, `Category has at least one image/asset (${files.length} found in ${cat})`);
    }
  }

  // TEST SUITE 5: Industrial Labelling Asset Verification
  console.log('\n--- SUITE 5: Industrial Labelling Assets ---');
  const industrialLabellingDir = path.join(ROOT, 'public/images/industrial-labelling');
  assert(fs.existsSync(industrialLabellingDir), 'Folder public/images/industrial-labelling exists');
  if (fs.existsSync(industrialLabellingDir)) {
    const indFiles = fs.readdirSync(industrialLabellingDir);
    assert(indFiles.length >= 5, `Industrial labelling has required product images (${indFiles.length} found)`);
  }

  // TEST SUITE 6: Component Spacing Verification
  console.log('\n--- SUITE 6: Component Spacing Cleanliness ---');
  const pageFiles = fs.readdirSync(path.join(ROOT, 'src/pages')).filter(f => f.endsWith('.tsx'));
  let excessiveSpacingFound = 0;
  for (const page of pageFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'src/pages', page), 'utf8');
    // Check for excessive top padding classes like pt-24, pt-28, pt-32, pt-36
    const matches = content.match(/\b(pt-24|pt-28|pt-32|pt-36|py-24|py-32)\b/g);
    if (matches) {
      excessiveSpacingFound += matches.length;
      console.warn(`    ⚠️ Notice in ${page}: ${matches.join(', ')}`);
    }
  }
  assert(excessiveSpacingFound === 0, `Zero excessive spacing classes (pt-24/28/32/36, py-24/32) in src/pages (${excessiveSpacingFound} found)`);

  // TEST SUITE 7: Production Build Artifacts Verification
  console.log('\n--- SUITE 7: Production Build Artifacts (dist/) ---');
  assert(fs.existsSync(path.join(ROOT, 'dist')), 'dist/ directory exists');
  assert(fs.existsSync(path.join(ROOT, 'dist/index.html')), 'dist/index.html exists');
  assert(fs.existsSync(path.join(ROOT, 'dist/assets')), 'dist/assets exists');
  if (fs.existsSync(path.join(ROOT, 'dist/assets'))) {
    const distAssets = fs.readdirSync(path.join(ROOT, 'dist/assets'));
    const hasJs = distAssets.some(f => f.endsWith('.js'));
    const hasCss = distAssets.some(f => f.endsWith('.css'));
    assert(hasJs, 'Production JS bundle generated in dist/assets');
    assert(hasCss, 'Production CSS bundle generated in dist/assets');
  }

  console.log('\n======================================================');
  console.log(`TEST SUMMARY: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
  console.log('======================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests();
