# Toy Haven testing and submission record

30 September update: the catalogue now has 16 products (four per category). Department images use contain and captions sit below them. All 36 local logic checks passed. Earlier W3C reports and the Word test record are retained as historical evidence; revalidate the changed Home/Product HTML and CSS before submission. No new browser, WAVE or Lighthouse audit is claimed.


Student name: Ismath Inoon Ahmed Zahrab
Student ID: CB017224
Live GitHub Pages URL: [pending deployment]

33/33 local logic checks passed using Node with DOM/storage stubs. These are not real-browser tests. Nine JavaScript syntax checks passed. Local HTML references, IDs, labels, image alt attributes and ARIA references were checked. Official W3C validation passed: all six HTML files have 0 errors, 0 warnings and 0 notices; CSS has 0 errors and 73 warnings under CSS Level 3 + SVG. Evidence is in docs/verification/w3c/index.html. All 28 service-worker cache entries exist.

## Completed logic checks

- L01 PASS — Eight unique products across all four categories
- L02 PASS — Missing storage returns empty list
- L03 PASS — Malformed JSON returns empty list
- L04 PASS — Non-array storage returns empty list
- L05 PASS — Cart rejects unknown IDs, zero, fractions and excessive quantities
- L06 PASS — Repeated add increments one record and cart badge
- L07 PASS — Known arithmetic: two 4500 figures plus 2800 teddy equals 11800
- L08 PASS — Quantity limit 99 is enforced when adding
- L09 PASS — Unknown product cannot be added
- L10 PASS — Wishlist prevents duplicate products
- L11 PASS — Wishlist rejects invalid status and unknown ID
- L12 PASS — Blocked storage reports failure without successful update
- L13 PASS — Custom validation trims and rejects whitespace
- L14 PASS — Custom validation enforces minimum trimmed length
- L15 PASS — Wishlist normalises known IDs and rejects unknown additions
- L16 PASS — Minus at one removes the product
- L17 PASS — Cart quantity changes recalculate totals
- L18 PASS — Clear cart empties storage and hides checkout
- L19 PASS — All products initially appear in result count
- L20 PASS — Combined category plus case-insensitive trimmed search
- L21 PASS — Search and category use AND, not OR
- L22 PASS — Product modal selects requested product
- L23 PASS — Modal Close closes dialog
- L24 PASS — Checkout disabled with empty cart
- L25 PASS — Blank checkout saves no order
- L26 PASS — Valid Card simulation saves snapshot and clears cart
- L27 PASS — Empty-cart resubmission does not duplicate order
- L28 PASS — Cash on Delivery simulation also saves selected method
- L29 PASS — Support stores valid feedback
- L30 PASS — Newsletter deduplicates case-normalised email
- L31 PASS — Daily product is an existing deterministic product
- L32 PASS — Carousel wraps from last slide to first
- L33 PASS — Carousel previous wraps to last slide

## Browser and assessment test cases

### M01 All six pages

Steps: Open every header/footer link.

Expected: Correct page loads; no broken images or Console errors.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M02 Mobile menu

Steps: At 390px select Menu, then Escape.

Expected: Menu expands, icon changes, Escape closes and restores focus.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M03 Carousel

Steps: Wait 6 seconds; use Previous, Next and Pause.

Expected: Image, heading and category link change together; pause stops rotation.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M04 Daily feature

Steps: Reload on the same local date; compare with another date in an isolated test.

Expected: Same date selects same item; another date advances the index.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M05 Filters

Steps: Choose Toys and search ROBOT; then select Diecast Cars.

Expected: One robot result, then no matches; reset restores eight items.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M06 Product modal

Steps: Select View; tab through its controls; press Escape.

Expected: Correct product, complete image, keyboard contained while open, focus returns after closing.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M07 Cart and persistence

Steps: Add Lunar Explorer twice and Teddy once; open Cart and refresh.

Expected: Two rows, three units and LKR 11,800 persist.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M08 Quantity and removal

Steps: Increase/decrease; minus at one; use Remove and Clear.

Expected: Totals update; zero-quantity rows vanish; empty checkout link unavailable.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M09 Invalid checkout

Steps: With an item in cart submit empty fields, malformed email and short address.

Expected: Visible relevant errors; focus on first invalid field; no saved order.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M10 Successful checkout

Steps: Use fictional valid details and Card. Repeat with Cash on Delivery.

Expected: Confirmation animates; order snapshot is saved; cart clears; no real payment occurs.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M11 Collection statuses

Steps: Save a product twice, mark Owned, refresh, then Not Interested and remove.

Expected: One saved entry; correct persisted status and counts; removal works.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M12 Feedback validation

Steps: Try blank and invalid fields, then fictional valid feedback.

Expected: Invalid entries rejected; valid message saved locally; success shown.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M13 FAQ

Steps: Open and close every question with keyboard and pointer.

Expected: Corresponding answer and expanded state change correctly.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M14 Newsletter

Steps: Submit invalid email, then Demo@Example.com and demo@example.com.

Expected: Invalid rejected; only one normalised saved address; duplicate feedback shown.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M15 Responsive layout

Steps: Inspect all pages at 320, 390, 768, 1024 and 1440px, including populated cart and modal.

Expected: No horizontal overflow, clipped text or overlapping controls.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M16 Keyboard and motion

Steps: Use Tab, Shift+Tab, Enter and Escape. Enable reduced motion.

Expected: Visible focus, usable controls, reduced animations and paused initial carousel.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M17 Offline and install

Steps: On localhost/HTTPS finish the first load, wait for worker activation, reload, then go offline and visit all pages.

Expected: Cached pages/assets load; local cart still works; inspect manifest and installed-app behaviour where supported.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M18 Cross-tab updates

Steps: Open Cart in two tabs; modify quantities in one.

Expected: Other tab refreshes its badge and cart after storage event.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M19 HTML validity

Steps: Submit all six HTML files to the W3C Nu HTML Checker HTTP service.

Expected: No HTML errors; review warnings and notices.

Actual: PASS — all six files returned 0 errors, 0 warnings and 0 notices.

Status: PASS — official service validation

Browser/device/date: HTTP service submission, not browser execution; 26 September 2026

Evidence: docs/verification/w3c/html-summary.json and six original JSON responses

### M20 CSS validity

Steps: Submit css/style.css to the W3C CSS service using CSS Level 3 + SVG and warning level 2.

Expected: No CSS errors; record and review warnings.

Actual: PASS for validity — 0 errors and 73 warnings. 29 colour/background warnings and 44 redefinition warnings retained; rendered contrast checks remain pending.

Status: PASS — official service validation

Browser/device/date: HTTP service submission, not browser execution; 26 September 2026

Evidence: docs/verification/w3c/style-css.html and css-summary.json

### M21 WAVE

Steps: Run WAVE on each hosted page and key dynamic state.

Expected: Investigate all errors; record results and remaining issues.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M22 Lighthouse

Steps: Run Chrome Lighthouse on desktop and mobile against the final hosted site.

Expected: Record actual Performance, Accessibility, Best Practices and SEO scores plus reports.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]

### M23 GitHub Pages

Steps: Open the actual deployment URL in a private window and on a phone.

Expected: All pages/assets work under repository path; copy the verified URL into the submission document.

Actual: [record your observation]

Status: Pending

Browser/device/date: [fill in]

Evidence: [screenshot or report filename]


## Environment limitations

The remote browser blocked the local website preview with ERR_BLOCKED_BY_CLIENT. No visual-browser, offline or accessibility-audit pass is claimed. GitHub Pages has not been deployed. The editable test record must be completed against the running website before submission.
