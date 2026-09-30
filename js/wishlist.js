// Collection page: display saved products and persist the selected status.
const wishlistContainer = document.getElementById('wishlistItems');
function displayWishlist() {
    const list = getWishlist();
    wishlistContainer.style.minHeight = list.length === 0 ? '0' : '';
    wishlistContainer.innerHTML = '';
    let owned = 0;
    list.forEach(function (item) {
        if (item.status === 'Owned') {
            owned++;
        }
    });
    document.getElementById('collectionCount').textContent =
        list.length + ' saved · ' + owned + ' owned';
    if (list.length === 0) {
        emptyState(
            wishlistContainer,
            'Your shelf starts here.',
            'Save a product from the catalogue, then track its status.',
        );
    }
    list.forEach(function (item) {
        const product = getProduct(item.id);
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `<img src="${product.image}" alt="" loading="lazy" width="600" height="450"><div class="card-body"><p class="card-category">${product.category}</p><h3>${product.name}</h3><strong class="price">${money(product.price)}</strong><label for="status-${item.id}">Collection status</label><select id="status-${item.id}"><option>Interested</option><option>Owned</option><option>Not Interested</option></select><button class="secondary collection-button">Remove from collection</button></div>`;
        const select = card.querySelector('select');
        select.value = item.status;
        select.addEventListener('change', function () {
            const latest = getWishlist();
            const entry = latest.find(function (saved) {
                return saved.id === item.id;
            });
            if (!entry) {
                displayWishlist();
                return;
            }
            entry.status = select.value;
            if (saveList('wishlist', latest)) {
                displayWishlist();
                document.getElementById('status-' + item.id).focus();
                showMessage('Collection status updated.');
            }
        });
        card.querySelector('button').addEventListener('click', function () {
            const remaining = getWishlist().filter(function (saved) {
                return saved.id !== item.id;
            });
            if (saveList('wishlist', remaining)) {
                displayWishlist();
                showMessage('Removed from your collection.');
                document.querySelector('h1').setAttribute('tabindex', '-1');
                document.querySelector('h1').focus();
            }
        });
        wishlistContainer.appendChild(card);
    });
}
window.addEventListener('storage', displayWishlist);
displayWishlist();
