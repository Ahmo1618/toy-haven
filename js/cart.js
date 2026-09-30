// Cart page: display saved items, calculate totals and connect quantity controls.
const cartContainer = document.getElementById('cartItems');
function displayCart() {
    const cart = getCart();
    cartContainer.style.setProperty(
  '--cart-slots', Math.max(1, cart.length)
);
    cartContainer.innerHTML = '';
    document.getElementById('cartTotal').textContent = money(cartTotal(cart));
    document.getElementById('checkoutLink').hidden = cart.length === 0;
    document.getElementById('clearCart').disabled = cart.length === 0;
    if (cart.length === 0) {
        emptyState(
            cartContainer,
            'Your cart is waiting.',
            'Add a favourite from the collection to get started.',
        );
    }
    cart.forEach(function (item) {
        const product = getProduct(item.id);
        const row = document.createElement('article');
        row.className = 'cart-item';
        row.innerHTML = `<img src="${product.image}" alt="" width="80" height="80"><div><h2>${product.name}</h2><p>${money(product.price)} each</p><strong>${money(product.price * item.quantity)}</strong></div><div class="quantity"><button class="minus secondary" aria-label="Decrease quantity of ${product.name}">−</button><span aria-label="Quantity">${item.quantity}</span><button class="plus secondary" aria-label="Increase quantity of ${product.name}">+</button></div><button class="remove-item" aria-label="Remove ${product.name}">Remove</button>`;
        row.querySelector('.minus').addEventListener('click', function () {
            changeQuantity(product.id, -1);
        });
        row.querySelector('.plus').disabled = item.quantity >= 99;
        row.querySelector('.plus').addEventListener('click', function () {
            changeQuantity(product.id, 1);
        });
        row.querySelector('.remove-item').addEventListener('click', function () {
            changeQuantity(product.id, -item.quantity);
        });
        cartContainer.appendChild(row);
    });
    updateCartCount();
}
function changeQuantity(id, amount) {
    let cart = getCart();
    const item = cart.find(function (entry) {
        return entry.id === id;
    });
    if (!item) {
        displayCart();
        return;
    }
    item.quantity = Math.min(99, item.quantity + amount);
    cart = cart.filter(function (entry) {
        return entry.quantity > 0;
    });
    if (saveList('cart', cart)) {
        displayCart();
        showMessage('Cart updated. Total: ' + money(cartTotal(cart)));
        // Restore focus after rebuilding the quantity controls.
        const name = getProduct(id).name;
        const label = (amount > 0 ? 'Increase' : 'Decrease') + ' quantity of ' + name;
        const button = cartContainer.querySelector('[aria-label="' + label + '"]');
        if (button && !button.disabled) {
            button.focus();
        } else {
            document.getElementById('cartCount').closest('a').focus();
        }
    }
}
document.getElementById('clearCart').addEventListener('click', function () {
    if (saveList('cart', [])) {
        displayCart();
        showMessage('Cart cleared.');
        document.getElementById('cartCount').closest('a').focus();
    }
});
window.addEventListener('storage', displayCart);
displayCart();
