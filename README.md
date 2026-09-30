# Toy Haven

A responsive six-page toy and collectables website built with
HTML, CSS and vanilla JavaScript.

## Pages

- Home
- Products
- Shopping cart
- Checkout
- Wishlist
- Support

## Features

- Sixteen products across four categories
- Product search and category filtering
- Product details popup
- Shopping cart with quantity controls
- Wishlist with collection statuses
- Form validation
- Responsive layouts
- Offline support through a service worker

## Run locally

1. Open the toy-haven folder in Visual Studio Code.
2. Open index.html using Live Server.

No framework, package installation or build command is required.

## File structure

- assets/ — product images and icons
- css/style.css — website styling
- js/ — product data and website functionality
- HTML files — the six website pages
- manifest.webmanifest — web app information
- sw.js — offline caching

## Data and limitations

Cart, wishlist and form records are saved in the browser using
localStorage. There is no backend database. Payments, deliveries,
support messages and newsletter emails are not processed or sent.

Product images are AI-generated and stored in WebP format.
Detailed asset credits, wireframes and testing records are
maintained separately with the coursework materials.

## Testing

36 local JavaScript logic checks passed using a simulated DOM.
These do not replace browser testing. Validation of the latest
files, accessibility checks and Lighthouse audits remain pending.