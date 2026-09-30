// Products page: combine category and name filters, then display product details.
const grid = document.getElementById('productGrid');
const search = document.getElementById('searchInput');
const category = document.getElementById('categoryFilter');
const modal = document.getElementById('productModal');
function displayProducts() {
    const term = search.value.trim().toLowerCase();
    const matches = products.filter(function (product) {
        const correctCategory = category.value === 'all' || product.category === category.value;
        const correctName = product.name.toLowerCase().includes(term);
        return correctCategory && correctName;
    });
    grid.innerHTML = '';
    document.getElementById('resultCount').textContent = matches.length + ' products found';
    matches.forEach(function (product) {
        grid.appendChild(productCard(product, viewProduct));
    });
      if (matches.length === 0) {
    emptyState(grid, 'No matching finds.', 'Try a different name or reset your filters.');
  }

  grid.style.minHeight = matches.length === 0 ? '0' : '';
}
function viewProduct(id) {
    const product = getProduct(id);
    if (!product) {
        return;
    }
    document.getElementById('modalBody').innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="600" height="450">
        <h2 id="modalTitle">${product.name}</h2><p>${product.description}</p>
        <table class="spec-table"><caption>Product information</caption><tbody><tr><th scope="row">Department</th><td>${product.category}</td></tr><tr><th scope="row">Type</th><td>${product.type}</td></tr><tr><th scope="row">Reference</th><td>${productReference(product.id)}</td></tr><tr><th scope="row">Price</th><td>${money(product.price)}</td></tr></tbody></table>
        <div class="card-actions"><button id="modalAdd">Add to cart</button><button class="secondary" id="modalSave">Save to collection</button></div><p id="modalMessage" role="status"></p>`;
    document.getElementById('modalAdd').addEventListener('click', function () {
        addToCart(product.id);
        document.getElementById('modalMessage').textContent =
            document.getElementById('toast').textContent;
    });
    document.getElementById('modalSave').addEventListener('click', function () {
        addToWishlist(product.id);
        document.getElementById('modalMessage').textContent =
            document.getElementById('toast').textContent;
    });
    modal.showModal();
}
document.getElementById('modalClose').addEventListener('click', function () {
    modal.close();
});
// The native dialog also handles Escape, keyboard focus containment and focus return.
search.addEventListener('input', displayProducts);
category.addEventListener('change', displayProducts);
document.getElementById('resetFilters').addEventListener('click', function () {
    search.value = '';
    category.value = 'all';
    displayProducts();
    search.focus();
});
const params = new URLSearchParams(window.location.search);
const initialCategory = params.get('category');
if (
    products.some(function (product) {
        return product.category === initialCategory;
    })
) {
    category.value = initialCategory;
}
displayProducts();
if (params.has('product')) {
    viewProduct(Number(params.get('product')));
}
