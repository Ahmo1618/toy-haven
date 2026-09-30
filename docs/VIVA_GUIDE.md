# Toy Haven from first file to final demonstration

This guide explains the actual website in this folder. Read a section, open the named file, then make the suggested change yourself. If you can repeat an explanation but cannot predict what a change will do, you are not ready for the viva.

## 1. What you have built

Toy Haven is a six-page, front-end demonstration shop for figurines, toys, board games and diecast cars. The visual direction is a collector's catalogue: warm ivory, charcoal, amber buttons, numbered departments and neutral product photography. It serves collectors without hiding games or gifts from other visitors.

It uses plain HTML, CSS and JavaScript. There is no React, Bootstrap, Node server, database or payment gateway in the application. The sixteen products and LKR prices are fictional examples. Images were generated with AI and optimised as local WebP files. The site does not send email, ship products or charge cards.

“Beginner-friendly” does not mean every feature is trivial. The brief requires a modal, persistent data and PWA behaviour. These require learning beyond headings and buttons. Page scripts are separated, functions have descriptive names, and comments explain the less obvious decisions.

## 2. Open and run the project

1. Extract the ZIP completely into a new folder. Do not work inside the ZIP viewer.
2. Open the `toy-haven` folder in VS Code. `index.html`, `css`, `js` and `assets` must stay together.
3. Use VS Code's Live Server extension to open `index.html`. Alternatively, if Python is installed, open a terminal in this folder and run `python -m http.server 5500`, then visit `http://localhost:5500`.
4. Keep using the same address and port while testing. `localhost` and `127.0.0.1` are different hostnames; changing host, port or protocol changes the storage origin.
5. Save your edits and refresh. If the old version persists, unregister this project's service worker in DevTools → Application → Service Workers, then reload. For a released update, change `CACHE_NAME` in `sw.js` too.

VS Code edits the files. Live Server serves them over HTTP. The browser reads and runs them. None of these is the HTML language itself. Python is only an optional development server; it is not part of the website's application code.

Opening an HTML file directly may show the layout, but use a local server for reliable storage and service-worker testing. A manifest alone does not prove offline support. Service workers need an appropriate secure context such as HTTPS or localhost. See the [MDN service worker guide](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

## 3. Languages and browser features

| Item | Job in this project | Example |
| --- | --- | --- |
| HTML | Describes content and its meaning | Navigation, product container, labelled form |
| CSS | Controls appearance and layout | Grid columns, colours, spacing, hover effects |
| JavaScript | Implements behaviour and decisions | Search, totals, validation, saved selections |
| JSON | Text format used to store structured data | A cart array converted to a string |
| DOM | Browser representation of the HTML document | `document.getElementById('cartCount')` |
| localStorage | Browser key/value storage | Cart and wishlist survive a refresh |
| Web app manifest | Describes the installable app | Name, icons, launch URL, display mode |
| Service worker | Handles cached file requests | Previously cached pages work offline |

HTML and CSS are not general-purpose programming languages. JSON is a data format, not a database. DOM and localStorage are browser APIs used through JavaScript. The service worker is also written in JavaScript, but runs separately from the page and cannot directly manipulate its DOM.

## 4. What happens when Home loads

The browser requests `index.html`. It reads the head, discovers `css/style.css`, the icon, manifest and three scripts. The CSS tells the browser how to lay out elements. The scripts have `defer`, so they download without immediately interrupting HTML parsing and run after the document has been parsed, in their listed order.

`data.js` defines the products. `app.js` defines shared functions and connects the menu, newsletter, cart badge and scroll effects. `index.js` builds the daily product, featured cards and carousel. The page script relies on definitions from the earlier scripts. Reversing their order can cause a reference error.

Once the page loads, `app.js` attempts to register `sw.js`. The service worker installs and caches the files listed in `FILES`. A later request can use a cached response. No compilation or bundling is required to publish this static project.

**Try it:** temporarily rename `js/data.js` in the HTML script path. Predict the result, inspect the Console and Network tabs, then restore it. A missing dependency can break several downstream features.

## 5. Read the HTML from top to bottom

`<!DOCTYPE html>` requests standards mode. `<html lang="en">` identifies English. `<meta charset="UTF-8">` sets character encoding. The viewport meta tag lets mobile layouts use the device width. The title appears in the browser tab, while the description gives a concise page summary.

The head links the stylesheet, favicon and manifest. Relative paths such as `css/style.css` are resolved from the current document's folder. Keeping the six pages in the same directory makes these paths predictable, including when GitHub Pages serves the project under a repository subfolder.

The body begins with a skip link. Keyboard users can jump past repeated navigation to `<main id="main">`. `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` and `<footer>` give content meaning. An article is used for a product card; navigation is used for page links. A `<div>` is a generic container when a more specific meaning is unnecessary.

Each page has one main heading. Lower headings group its content. Lists organise footer links. The modal has a table because product attributes are a genuine label/value mapping. Do not use a table simply to position the whole page.

An `id` identifies one element within that document. A `class` can be shared by many elements. `#cartCount` is a CSS selector for one ID; `.product-card` selects every element using that class. `href` is the destination of a link; `src` identifies an image or script resource.

Use a link for navigation and a button for an action. An image needs alternative text that describes its meaningful content. Decorative marks are hidden from assistive technology with `aria-hidden`. Form labels connect to inputs through matching `for` and `id` values.

The product dialog is a native `<dialog>`. JavaScript calls `showModal()` and `close()`. This gives built-in focus containment and Escape behaviour without a custom focus-trap library. A missing-JavaScript message explains why dynamic products or forms are unavailable.

**Try it:** change the Home headline in HTML and notice the carousel can replace it later. To change the rotating headline permanently, edit the matching slide object in `js/index.js` too.

## 6. Read the CSS

The stylesheet is divided into numbered sections: foundations, header/footer, Home, catalogue/modal, cart, checkout/support, feedback effects and responsive rules. Shared selectors let six pages use the same visual rules.

`:root` defines colour variables, such as `--accent`. `var(--accent)` reuses the value. Changing the variable updates all matching buttons. This avoids hunting for several slightly different colour values.

The box model is content plus padding, border and margin. Padding creates space inside a box; margin creates space outside it. `box-sizing: border-box` makes declared widths include padding and borders, which makes columns easier to size.

Flexbox is used for rows such as navigation and button groups. Grid is used for product collections and two-column page layouts. `gap` separates items without adding margins to each card. The container uses a percentage width with a maximum width, so content has breathing room on small screens and does not stretch indefinitely on large ones.

Base rules target small screens. At 600px, cards use two columns. At 900px, the navigation is expanded and catalogue cards use four columns; cart and checkout gain side-by-side summaries. At 1000px, the Home hero puts copy and artwork side by side. These are width breakpoints, not guesses about device brands.

`object-fit: contain` keeps complete product images visible. `object-fit: cover` fills a box and may crop an image. Local WebP assets reduce downloads compared with the original full-resolution generated PNGs. `loading="lazy"` defers below-the-fold images; the first hero image has higher priority.

`:hover` styles pointing-device interaction. `:focus-visible` supplies a visible keyboard focus indicator. `transition` animates a change between states. `@keyframes` defines an animation sequence, used for checkout success. The hamburger icon is built with a span and `::before`/`::after`; changing `aria-expanded` changes its visual state.

Scroll reveals add a temporary class and remove it when a section enters the viewport. A reduced-motion preference disables unnecessary movement. Content starts visible so a JavaScript failure does not permanently hide whole sections.

**Try it:** change the product grid from four desktop columns to three, then explain why you changed the rule inside the desktop media query rather than the one-column base rule.

## 7. JavaScript essentials used here

| Concept | Meaning | Actual use |
| --- | --- | --- |
| `const` | Binding cannot be reassigned | Product array reference |
| `let` | Binding may be reassigned | Current slide index and running totals |
| Object | Named properties describing one item | Product with ID, name and price |
| Array | Ordered collection of values | Products, cart items, feedback |
| Function | Reusable instructions, optionally returning a value | `money(value)` |
| Parameter | Name for an input inside a function | `id` in `getProduct(id)` |
| Argument | Value supplied when calling it | `getProduct(3)` supplies 3 |
| Conditional | Chooses a branch | Existing cart item or new one |
| Event listener | Function called when an event occurs | Click Add to cart |
| Callback | Function passed to another function | Function given to `filter` |
| Template literal | Backtick string with inserted values | `${product.name}` in a card |

`const` does not freeze an array or object. You can push onto a const array or change an object's property; you cannot assign a different array to that same binding.

`===` compares without automatic type conversion. `Number(id)` converts an ID taken from text into a number. `&&` means both conditions must be true; `||` means at least one may be true; `!` negates a condition. `return` exits a function and can provide its result.

`find` returns the first matching item or `undefined`. `filter` returns a new array containing all matches. `forEach` performs an operation for each item; it is not used to return a filtered list. `push` appends an item, `pop` removes the last item, and `includes` checks whether a string contains text or an array contains a value.

`textContent` inserts plain text. `innerHTML` parses HTML. This project uses `innerHTML` for developer-controlled catalogue templates, and `textContent` for messages. Do not insert untrusted customer messages as raw HTML; that can turn input into executable markup.

`event.preventDefault()` stops the browser's normal form submission. The local demo validates and saves information without navigating away. It does not stop the click from reaching every other listener; that is a different concept called event propagation.

## 8. Shared functions in app.js

| Function | What it does and why |
| --- | --- |
| `showMessage` | Shows a temporary status message and replaces its previous timer |
| `readList` | Reads JSON, checks it is an array and returns an empty array if absent or unreadable |
| `saveList` | Converts an array to JSON and returns whether browser storage succeeded |
| `productReference` | Formats IDs as TH-001 to TH-016 |
| `getProduct` | Finds the catalogue product for an ID |
| `money` | Formats a numeric amount with an LKR label |
| `getCart` | Rejects invalid stored IDs and quantities outside 1–99 |
| `cartTotal` | Adds each current product price multiplied by its quantity |
| `updateCartCount` | Shows total units, not just the number of different products |
| `addToCart` | Increments an existing item or adds a new ID/quantity pair |
| `getWishlist` | Keeps only valid products with an allowed status |
| `addToWishlist` | Adds an Interested item and prevents duplicates |
| `productCard` | Builds a reusable card and connects its buttons |
| `emptyState` | Creates consistent empty-cart, collection or search feedback |
| `validateField` | Trims text, checks constraints and updates the associated error message |
| `revealOnScroll` | Reveals sections that have approached the visible viewport |

The end of the file connects shared behaviour: menu toggling, Escape to close the menu, newsletter submission, the cart badge, cross-tab storage changes, scroll events and service-worker registration.

`try...catch` handles operations that can fail, such as parsing malformed JSON or saving to a full/blocked storage area. A successful-looking button message should not be shown after saving has failed.

## 9. Follow one Add to cart click

1. `productCard` connects a click listener to the card's Add button.
2. The listener calls `addToCart(product.id)`.
3. `getProduct` checks that the ID is a real catalogue product.
4. `getCart` reads the current saved cart and filters invalid entries.
5. `find` checks whether this ID is already present.
6. If present, quantity increases unless it is already 99. Otherwise `{ id: product.id, quantity: 1 }` is pushed.
7. `saveList('cart', cart)` converts and saves the updated array.
8. If saving succeeds, the badge updates and a message confirms the addition.

Example: Lunar Explorer is LKR 4,500. Add it twice and a LKR 2,800 teddy once. The cart contains two records but three units. The total is `4500 * 2 + 2800 * 1 = 11800`. The badge should show **3**, not 2.

**Challenge:** before clicking anything, write the expected array, badge and total. Check all three in the running site.

## 10. Each page script

### Home in index.js

The `slides` array stores image, heading, description, category and alternative text. `showSlide` updates the DOM. The next index is `(slideIndex + 1) % slides.length`; the remainder wraps the last slide back to zero. Previous adds the array length before taking the remainder to avoid a negative index.

`setInterval` rotates every 6,000 milliseconds. `clearInterval` prevents accumulating multiple timers. The page offers pause/resume, pauses when hidden, and pauses when keyboard users interact with carousel controls. Reduced-motion users start with rotation paused.

The daily feature converts the local calendar date to an integer day number using `Date.UTC`, then uses the remainder after division by `products.length` as an index. It stays consistent for a local calendar date and changes when the page is loaded on another date. It is deterministic, not random. An already-open page does not automatically refresh its daily choice at midnight.

### Catalogue in products.js

`displayProducts` normalises the search term with `trim().toLowerCase()`. Each product must match both the selected category and the name search. The filtered array becomes cards. Zero matches produces an empty-state message. Reset clears both controls.

`URLSearchParams` reads links such as `products.html?category=Toys` or `?product=3`. `encodeURIComponent` makes spaces and other characters safe when building the category query. A product link opens the modal, whose buttons reuse the shared cart and wishlist functions.

### Cart in cart.js

`displayCart` builds one row per saved product. It looks up current names and prices from the catalogue. `changeQuantity` changes the requested item, caps it at 99 and filters out quantities at or below zero. Minus at one therefore removes the item. Remove subtracts the whole quantity. Clear saves an empty array. An empty cart hides the checkout link.

The rows are rebuilt after an update, so the script deliberately restores keyboard focus to an appropriate control. A storage event refreshes the page when another tab changes the cart.

### Checkout in checkout.js

`loadSummary` shows the cart items and calculated total; an empty cart disables ordering. The submit listener validates name, email, delivery address and the selected payment method. Whitespace-only input is rejected. Errors are linked to fields and focus moves to the first invalid input.

The order copies product names and prices into item snapshots. If the catalogue price changes later, that saved order still records what the demo order cost. The order also stores a timestamp, customer details and the simulated payment selection. `Date.now()` supplies a simple demo reference, not a guaranteed globally unique production order number.

Only after the order saves does the script clear the cart and show the animated confirmation. It attempts to roll back the new order if clearing the cart fails. localStorage operations are not a database transaction, so this remains a small demonstration, not a production checkout.

Card is a simulated choice, not a form requesting a real card number. Cash on Delivery is also simulated. There is no payment provider, bank request or delivery arrangement.

### Collection in wishlist.js

The page displays saved products with Interested, Owned and Not Interested choices. Changing a select saves its value, redraws the count and restores focus. Adding the same product again does not create a duplicate. Remove deletes only the selected collection entry; it does not change the shopping cart.

### Support in support.js

The form checks name, email and message, appends a feedback object, and shows confirmation only after storage succeeds. A FAQ button toggles its answer's `hidden` property and its own `aria-expanded` state. Each answer can open independently.

## 11. Storage you can inspect

All project keys start with `toyHaven.final.`. Earlier demo records use a different prefix and are not imported automatically.

| Key suffix | Stored value |
| --- | --- |
| `cart` | Array of product IDs and quantities |
| `wishlist` | Array of product IDs and collection statuses |
| `newsletter` | Array of normalised email addresses |
| `feedback` | Array of names, emails, messages and dates |
| `orders` | Array of order snapshots and customer details |

localStorage stores strings. `JSON.stringify` turns an array into text; `JSON.parse` reconstructs the data. In DevTools → Application → Local Storage, inspect the matching origin and project key. A missing key, malformed JSON or a non-array value returns an empty list.

Storage is local to the browser and origin. It does not synchronise to another device or create an account. The user can edit or clear it, and browser settings can block it. Do not treat saved totals as secure or trusted on a real shopping site. See [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

Use invented test names and addresses. To reset only this project in the Console:

```js
['cart', 'wishlist', 'newsletter', 'feedback', 'orders'].forEach(function (key) {
    localStorage.removeItem('toyHaven.final.' + key);
});
location.reload();
```

## 12. Understand PWA support honestly

`manifest.webmanifest` is a JSON file describing the name, short name, start URL, scope, display mode, colours and icons. The 192px and 512px PNG icons are local assets. The SVG favicon is used in browser tabs.

`sw.js` has three event listeners. Install opens a versioned cache and adds the listed files. Activate removes older caches belonging to this project and takes control of open clients. Fetch handles same-origin GET requests and looks in the current cache before using the network.

`event.waitUntil(promise)` tells the browser that lifecycle work is still pending. A Promise represents an operation that will finish later. `.then(...)` runs the next step when it succeeds; `.catch(...)` handles a failure. `event.respondWith(...)` supplies the response for an intercepted request.

This is a cache-first strategy: predictable offline operation for a small static demo, but stale files are possible if you do not update the cache version. Add new application assets to `FILES`. The guide and wireframes are not part of the offline app cache. Install prompts vary by browser; do not claim every browser will display the same button.

**Explain it without jargon:** “The first successful online visit saves the site files. Later, the service worker can return those saved files if the network is unavailable.” Then show the actual cache and test offline on your laptop.

## 13. Debugging and testing

Start with the Console for JavaScript errors and Network for missing files. A 404 means the requested file was not found. A `ReferenceError` often means a name is missing or a script ran in the wrong order. A null-element error often means the HTML ID differs from the one JavaScript expects or the wrong page script is loaded.

Check the Elements panel and computed CSS when layout looks wrong. Check localStorage when data is wrong. Check Service Workers and Cache Storage when old code remains after an edit. Changing random lines without locating the source is not debugging.

Read `TEST_REPORT.html` for actual checks and pending browser checks. The assessment specifically names W3C HTML, W3C CSS, WAVE, desktop/mobile Lighthouse and responsive testing. Passing local logic tests does not substitute for these tools. Record your own screenshots and the final hosted URL.

## 14. GitHub Pages deployment

1. Create a repository such as `toy-haven-website` in your GitHub account.
2. Upload the contents of `toy-haven` so `index.html` is at the repository root. Do not upload only the ZIP or bury the site inside another folder.
3. Commit the files to `main`.
4. Open repository Settings → Pages. Select Deploy from a branch, `main`, and `/(root)`, then save.
5. Wait for the deployment result and open the URL GitHub provides. Do not invent the final link before deployment succeeds.
6. Test all six pages, images, filters, checkout and offline support at that URL. Add it to the submission document.

These settings follow [GitHub's publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Git tracks file history; GitHub hosts repositories; GitHub Pages serves the static website. These are related but different things.

## 15. Fifteen-minute rehearsal

| Time | Demonstrate and explain |
| --- | --- |
| 0–2 minutes | Audience, design decisions, six pages and responsive menu |
| 2–4 minutes | Carousel, daily selection, search plus category filter, modal |
| 4–6 minutes | Add duplicate products, quantities, correct arithmetic, refresh persistence |
| 6–8 minutes | Invalid checkout, valid simulated checkout and order storage |
| 8–9 minutes | Collection statuses and persistence |
| 9–10 minutes | Support validation, FAQ and newsletter |
| 10–12 minutes | File structure, shared function and storage format |
| 12–15 minutes | A requested code change, test evidence and limitations |

Practise these changes without copying a prepared answer: change one price, add a seventeenth product with a unique ID, change the accent colour, alter the carousel interval, explain the AND condition in filtering, and change a validation minimum consistently in HTML and its error message. Recheck the result each time.

## 16. Questions you should be able to answer

**Why six separate HTML pages?** The brief asks for a multi-page site. Separate pages keep navigation and page-specific code easy to follow at this level.

**Why repeat the header markup?** In a six-page static beginner project it is straightforward to inspect and edit. The cost is keeping copies consistent. Shared CSS and behaviour still avoid most duplication.

**Why use JavaScript objects instead of a database?** The brief permits objects and only requires front-end technology. Sixteen static demo products do not require server-side data management.

**Why save IDs in the cart?** An ID refers to the shared product record without duplicating every name and description. The displayed cart price comes from current catalogue data.

**Why copy prices into orders?** An order is a historical record; changing the catalogue later should not silently change the amount recorded for that order.

**Can localStorage protect payment information?** No. It is browser-accessible storage that users and page scripts can modify. This demo does not collect real payment credentials.

**How does filtering combine with searching?** A product must satisfy the category condition AND the case-insensitive name condition.

**What happens if JavaScript is disabled?** Static navigation and page structure remain, but catalogue generation, cart features, validation and dynamic content need JavaScript. The site displays a notice.

**What is reused across pages?** `money`, `getProduct`, storage helpers, validation and cart functions. `productCard` is shared by Home and Products.

**Is the daily item random?** No. A deterministic date-based index chooses the same item for the same local calendar date when loaded.

**What would a real store need?** A backend, trusted product and stock data, accounts if required, server-side validation, secure order processing, a payment provider, and genuine fulfilment. None is secretly provided by GitHub Pages.

**What did AI help with?** Explain the assistance honestly under your module's rules: code revision, generated product imagery, documentation and wireframes. Do not claim work or testing you did not do. Your defence is understanding, personalisation and demonstrated changes.

## 17. Make three decisions yourself

Choose one product to replace and explain why it fits the audience. Rewrite the Home introduction in your own voice. Choose one UX improvement after watching a friend use the site without instructions. Keep the six required pages and behaviours intact.

Before the viva, close this guide and answer: “Where does the price on this screen come from, which function changes the quantity, and which exact key makes it survive refresh?” If you cannot trace that path, practise it again in the code.

## 18. Connect this project to your class materials

| Supplied lesson | Find the idea in this project | Demonstrate it yourself |
| --- | --- | --- |
| 01. Basics of Web Design.pptx | Clear navigation, page purpose and audience | Explain who uses the collection status selector |
| 02. Web Designing Using Wireframes.pptx | Six desktop and six mobile layouts | Show how Cart changes from two columns to one |
| 04. intrduction to html II.pptx and HTML .docx | Links, images, lists, forms and product information table | Connect one label to its input using matching IDs |
| css.pdf | Shared selectors, spacing and responsive layout | Change a grid breakpoint, then predict the result |
| js.pptx and variables.pptx | External scripts, const and let | Explain why slideIndex uses let |
| function .pptx | Named functions, parameters and return values | Call money(11800) and explain its output |
| js (1).pptx | Callback functions | Identify the callback passed to filter; it runs during filtering |
| events .pptx | Click, input, change and submit listeners | Explain why search uses input and a select uses change |
| notes.pptx and notes (1).pptx | Reading input and making decisions | Explain the existing-item branch in addToCart |
| Notes (2).pptx | JSON and localStorage | Read an actual cart entry in DevTools |

The native dialog and service worker require additional study. PWA support is explicitly required by the brief; hiding or deleting the difficult parts would leave a requirement unmet. Learn their small, separate responsibilities after you understand normal page behaviour.

## 19. Your study route in five sessions

Do each session with the website and code open together. Move on only when you can complete the checkpoint without looking at an answer.

1. **Structure and running:** Read sections 2–5. Open all six pages. Explain browser, editor, server, relative path and defer. Checkpoint: add a new paragraph and a link to Support, then remove them.
2. **Layout and styling:** Read section 6. Find the container, product grid and media queries. Checkpoint: change the accent and desktop column count, predict the effects, then restore them.
3. **Data and behaviour:** Read sections 7–10. Start with data.js, then follow one Add click through app.js and cart.js. Checkpoint: calculate a three-item total on paper before checking the page.
4. **Forms and persistence:** Read sections 10–12. Test invalid input, successful checkout, collection status and feedback. Checkpoint: show the exact storage key for each feature and explain why it is not a database.
5. **Defence and deployment:** Read sections 13–17. Complete the real-browser audit record and rehearse with a timer. Checkpoint: change a product price while someone watches, then explain what changes in the cart and what remains fixed in an old order.

If your explanation fails at one step, return to that file. Memorising the finished answer will not help when the lecturer asks you to change it.

## 20. Read one real function line by line

This is the total calculation used by both Cart and Checkout:

```js
function cartTotal(cart) {
    let total = 0;
    cart.forEach(function (item) {
        total += getProduct(item.id).price * item.quantity;
    });
    return total;
}
```

| Line or expression | What actually happens |
| --- | --- |
| function cartTotal(cart) | Defines a function named cartTotal with a parameter called cart |
| let total = 0 | Starts a running numeric total; let allows reassignment |
| cart.forEach(function (item) { | Calls the callback once for each cart record, passing that record as item |
| item.id | Reads the product ID from the current cart record |
| getProduct(item.id).price | Looks up the matching product object, then reads its current numeric price |
| item.quantity | Reads how many units of that product are in the cart |
| price * quantity | Calculates that row's subtotal |
| total += ... | Adds the subtotal to the running total; equivalent to total = total + ... |
| }); | Closes the callback body and the forEach call |
| return total | Sends the final number back to whichever code called cartTotal |

`money(cartTotal(cart))` then formats that number for display. Calculation and presentation are separate: adding formatted strings such as `LKR 4,500` would not produce correct arithmetic.

**Prediction task:** The cart is `[{id: 1, quantity: 2}, {id: 3, quantity: 1}]`. Product 1 costs 4500 and product 3 costs 2800. Write total after each callback, the returned value and the displayed string. Now predict what happens if you accidentally put `let total = 0` inside the callback.

Answer only after trying: the running totals are 9000 and 11800, the function returns the number 11800, and money formats it as LKR 11,800. Moving the declaration inside the callback creates a different local variable on each iteration; the return outside cannot access that variable if no outer total is declared.

## 30 September catalogue update

The four Home department cards use `object-fit: contain`, so the whole image fits inside the box. Labels sit below the images in normal document flow. No absolute overlay or zoom crop is needed. The catalogue now has sixteen products, four per category. `productReference(id)` uses `padStart` to keep product codes at three digits.
