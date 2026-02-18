# SEO Testing Checklist - DCC Sponsorship Website

## Pre-Deployment Tests (Local)

### Browser Inspection
- [ ] Open `index.html` in browser
- [ ] Open DevTools (F12) → Elements tab
- [ ] Verify `<head>` section contains:
  - [ ] Open Graph meta tags (`og:title`, `og:description`, `og:image`)
  - [ ] Twitter Card meta tags (`twitter:card`, `twitter:title`)
  - [ ] Structured data (`<script type="application/ld+json">`)
  - [ ] Canonical URL tag
  - [ ] Meta keywords and description

### File Accessibility
- [ ] Confirm `robots.txt` exists in root
- [ ] Confirm `sitemap.xml` exists in root
- [ ] Check all image alt text is present

---

## Post-Deployment Tests (Live Site)

### 1. Basic Accessibility Tests

**Test robots.txt:**
```bash
curl https://dcc-sponsorship.co.uk/robots.txt
```
- [ ] File loads successfully
- [ ] Contains sitemap reference
- [ ] No 404 errors

**Test sitemap.xml:**
```bash
curl https://dcc-sponsorship.co.uk/sitemap.xml
```
- [ ] File loads successfully
- [ ] Valid XML format
- [ ] All URLs listed correctly

**Test meta tags in live HTML:**
```bash
curl -s https://dcc-sponsorship.co.uk | grep -i "og:title"
curl -s https://dcc-sponsorship.co.uk | grep -i "twitter:card"
curl -s https://dcc-sponsorship.co.uk | grep -i "application/ld+json"
```
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Structured data present

---

### 2. Facebook Sharing Debugger

**URL:** https://developers.facebook.com/tools/debug/

**Steps:**
1. [ ] Go to Facebook Sharing Debugger
2. [ ] Enter: `https://dcc-sponsorship.co.uk`
3. [ ] Click "Debug"

**Verify:**
- [ ] Title: "Dartford Cricket Club - Sponsorship Opportunities 2026-2027"
- [ ] Description appears correctly
- [ ] Image: DCC Logo displays
- [ ] No errors or warnings
- [ ] Preview looks professional

**If changes made:**
- [ ] Click "Scrape Again" to refresh cache

**Screenshot:** Take a screenshot of the preview for records

---

### 3. Twitter Card Validator

**URL:** https://cards-dev.twitter.com/validator

**Steps:**
1. [ ] Go to Twitter Card Validator
2. [ ] Enter: `https://dcc-sponsorship.co.uk`
3. [ ] Click "Preview card"

**Verify:**
- [ ] Card type: "summary_large_image"
- [ ] Title displays correctly
- [ ] Description appears
- [ ] DCC Logo shows as image
- [ ] Preview looks good

**Note:** May require Twitter/X login

**Screenshot:** Save preview image

---

### 4. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

**Steps:**
1. [ ] Go to Rich Results Test
2. [ ] Enter: `https://dcc-sponsorship.co.uk`
3. [ ] Click "Test URL"
4. [ ] Wait for results (may take 30-60 seconds)

**Verify:**
- [ ] "Page is eligible for rich results" ✅
- [ ] SportsOrganization schema detected
- [ ] No errors in structured data
- [ ] All fields populated:
  - [ ] Name: "Dartford Cricket Club"
  - [ ] Founded: "1727"
  - [ ] Address: Dartford, Kent
  - [ ] Telephone and email present
  - [ ] Social media links present

**If errors:**
- [ ] Note error messages
- [ ] Fix and retest

**Screenshot:** Save validation results

---

### 5. Schema.org Validator

**URL:** https://validator.schema.org/

**Steps:**
1. [ ] Go to Schema Validator
2. [ ] Select "URL" tab
3. [ ] Enter: `https://dcc-sponsorship.co.uk`
4. [ ] Click "Run Test"

**Verify:**
- [ ] No errors
- [ ] SportsOrganization type recognized
- [ ] All properties valid

**Alternative method:**
- [ ] Copy JSON-LD from page source
- [ ] Paste into "Code Snippet" tab
- [ ] Validate

---

### 6. Google Search Console Setup

**URL:** https://search.google.com/search-console

#### Initial Setup (One-time)
1. [ ] Sign in with Google account
2. [ ] Click "Add Property"
3. [ ] Select "URL prefix"
4. [ ] Enter: `https://dcc-sponsorship.co.uk`
5. [ ] Choose verification method:
   - [ ] **Option A:** HTML file upload (easiest)
   - [ ] **Option B:** DNS record (if you have domain access)
   - [ ] **Option C:** HTML tag in `<head>`
6. [ ] Complete verification
7. [ ] Wait for confirmation (may take a few minutes)

#### Submit Sitemap
1. [ ] Go to "Sitemaps" in left sidebar
2. [ ] Enter: `sitemap.xml`
3. [ ] Click "Submit"
4. [ ] Verify status shows "Success"
5. [ ] Note: "Discovered URLs" count (should be 7)

#### Request Indexing (Optional but recommended)
1. [ ] Go to "URL Inspection" tool
2. [ ] Enter: `https://dcc-sponsorship.co.uk`
3. [ ] Click "Request Indexing"
4. [ ] Repeat for key pages:
   - [ ] `https://dcc-sponsorship.co.uk/#packages`
   - [ ] `https://dcc-sponsorship.co.uk/#contact`
   - [ ] `https://dcc-sponsorship.co.uk/#donate`

---

### 7. HTML Validation (Optional)

**URL:** https://validator.w3.org/

**Steps:**
1. [ ] Go to W3C Validator
2. [ ] Enter: `https://dcc-sponsorship.co.uk`
3. [ ] Click "Check"

**Verify:**
- [ ] No critical errors
- [ ] Warnings are acceptable (if minor)

---

### 8. Mobile-Friendly Test

**URL:** https://search.google.com/test/mobile-friendly

**Steps:**
1. [ ] Go to Mobile-Friendly Test
2. [ ] Enter: `https://dcc-sponsorship.co.uk`
3. [ ] Click "Test URL"

**Verify:**
- [ ] "Page is mobile friendly" ✅
- [ ] No mobile usability issues
- [ ] Screenshot looks good on mobile

---

### 9. PageSpeed Insights (Performance Check)

**URL:** https://pagespeed.web.dev/

**Steps:**
1. [ ] Go to PageSpeed Insights
2. [ ] Enter: `https://dcc-sponsorship.co.uk`
3. [ ] Click "Analyze"

**Check:**
- [ ] Mobile score (aim for 80+)
- [ ] Desktop score (aim for 90+)
- [ ] No major performance issues
- [ ] Lazy loading working correctly

**Note:** SEO improvements should NOT negatively impact scores

---

## Monitoring Schedule

### Week 1 (After Deployment)
- [ ] Day 1: Run all tests above
- [ ] Day 3: Check Google Search Console for indexing
- [ ] Day 7: Review any crawl errors in GSC

### Week 2-4
- [ ] Check Search Console weekly
- [ ] Monitor "Coverage" report
- [ ] Review "Performance" data (impressions, clicks)
- [ ] Check for any enhancement issues

### Monthly
- [ ] Review organic search traffic in analytics
- [ ] Check keyword rankings
- [ ] Update sitemap lastmod dates if content changed
- [ ] Re-test social sharing previews

---

## Common Issues & Solutions

### Issue: Facebook shows old preview
**Solution:** Use "Scrape Again" button in debugger to clear cache

### Issue: Sitemap not found (404)
**Solution:** Verify file is in root directory, not in subdirectory

### Issue: Structured data not detected
**Solution:** Check JSON-LD syntax, ensure no JavaScript errors on page

### Issue: Google Search Console verification fails
**Solution:** Try alternative verification method (HTML file vs DNS)

### Issue: Pages not indexed after 2 weeks
**Solution:** Use "Request Indexing" in URL Inspection tool

---

## Success Metrics

After 30 days, you should see:
- [ ] All pages indexed in Google Search Console
- [ ] Organic search impressions increasing
- [ ] Rich results appearing in search
- [ ] Social shares showing proper previews
- [ ] No crawl errors in GSC

---

## Contact for Issues

If you encounter problems:
- **Technical Issues:** Check SEO-IMPROVEMENTS.md documentation
- **Google Search Console:** https://support.google.com/webmasters
- **Schema.org Questions:** https://schema.org/docs/faq.html

---

## Testing Completion

**Tested by:** ___________________________

**Date:** ___________________________

**Overall Status:** 
- [ ] All tests passed ✅
- [ ] Minor issues (documented below)
- [ ] Major issues (requires fixes)

**Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

---

**Last Updated:** February 18, 2026  
**Version:** 1.0
