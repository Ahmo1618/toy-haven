// Checkout page: validate details, save a demo order and clear the cart.
const checkoutForm = document.getElementById('checkoutForm');
function loadSummary() {
    const cart = getCart();
    const container = document.getElementById('checkoutItems');
    container.innerHTML = '';
    cart.forEach(function (item) {
        const product = getProduct(item.id);
        const row = document.createElement('div');
        row.className = 'order-line';
        row.innerHTML = `<p>${product.name} × ${item.quantity}</p><strong>${money(product.price * item.quantity)}</strong>`;
        container.appendChild(row);
    });
    if (cart.length === 0) {
        container.textContent = 'Your cart is empty. Add a product before placing an order.';
    }
    document.getElementById('checkoutTotal').textContent = money(cartTotal(cart));
    document.getElementById('placeOrder').disabled = cart.length === 0;
    updateCartCount();
}
checkoutForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nameOK = validateField(
        'customerName',
        'nameError',
        'Enter your full name (at least 2 characters).',
    );
    const emailOK = validateField('customerEmail', 'emailError', 'Enter a valid email address.');
    const addressOK = validateField(
        'customerAddress',
        'addressError',
        'Enter an address of at least 10 characters.',
    );
    const paymentOK = validateField('paymentMethod', 'paymentError', 'Choose a payment method.');
    if (!nameOK || !emailOK || !addressOK || !paymentOK) {
        checkoutForm.querySelector('[aria-invalid="true"]').focus();
        return;
    }
    const cart = getCart();
    if (cart.length === 0) {
        document.getElementById('checkoutMessage').textContent = 'Your cart is empty.';
        loadSummary();
        return;
    }
    const order = {
        // Prefix plus milliseconds since 1 January 1970; this is not a random number.
        id: 'TH-' + Date.now(),
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        address: document.getElementById('customerAddress').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        items: [],
        total: cartTotal(cart),
        date: new Date().toISOString(),
    };
    cart.forEach(function (item) {
        const product = getProduct(item.id);
        order.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
        });
    });
    const history = readList('orders');
    history.push(order);
    if (!saveList('orders', history)) {
        return;
    }
    // Do not leave an order saved with a still-active cart if storage fails.
    if (!saveList('cart', [])) {
        history.pop();
        saveList('orders', history);
        return;
    }
    checkoutForm.reset();
    loadSummary();
    document.getElementById('orderConfirmation').textContent =
        'Order ' + order.id + ' · ' + money(order.total);
    const success = document.getElementById('successMessage');
    success.hidden = false;
    success.focus();
});
window.addEventListener('storage', loadSummary);
loadSummary();
