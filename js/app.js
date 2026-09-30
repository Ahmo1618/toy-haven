// Shared functions. All keys use a final-project prefix so earlier demo data is left untouched.
const storagePrefix = 'toyHaven.final.';
let toastTimer;
function showMessage(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove('show');
    }, 3500);
}
function readList(key) {
    try {
        const value = JSON.parse(localStorage.getItem(storagePrefix + key));
        if (Array.isArray(value)) {
            return value;
        }
    } catch (error) {
        console.warn('Saved list could not be read:', key);
    }
    return [];
}
function saveList(key, list) {
    try {
        localStorage.setItem(storagePrefix + key, JSON.stringify(list));
        return true;
    } catch (error) {
        showMessage('Your browser could not save this change. Check its storage settings.');
        return false;
    }
}
function getProduct(id) {
    return products.find(function (product) {
        return product.id === Number(id);
    });
}
// padStart keeps references the same length: 1 becomes TH-001, 16 becomes TH-016.
function productReference(id) {
    return 'TH-' + String(id).padStart(3, '0');
}
function money(value) {
    return 'LKR ' + value.toLocaleString('en-LK');
}
function getCart() {
    return readList('cart').filter(function (item) {
        return (
            item &&
            getProduct(item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0 &&
            item.quantity <= 99
        );
    });
}
function cartTotal(cart) {
    let total = 0;
    cart.forEach(function (item) {
        total += getProduct(item.id).price * item.quantity;
    });
    return total;
}
function updateCartCount() {
    let count = 0;
    getCart().forEach(function (item) {
        count += item.quantity;
    });
    document.getElementById('cartCount').textContent = count;
}
function addToCart(id) {
    const product = getProduct(id);
    if (!product) {
        return;
    }
    const cart = getCart();
    const existing = cart.find(function (item) {
        return item.id === product.id;
    });
    if (existing) {
        if (existing.quantity >= 99) {
            showMessage('Maximum quantity is 99 per product.');
            return;
        }
        existing.quantity++;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }
    if (saveList('cart', cart)) {
        updateCartCount();
        showMessage(product.name + ' added to your cart.');
    }
}
function getWishlist() {
    return readList('wishlist').filter(function (item) {
        return (
            item &&
            getProduct(item.id) &&
            ['Interested', 'Owned', 'Not Interested'].includes(item.status)
        );
    });
}
function addToWishlist(id) {
    const product = getProduct(id);
    if (!product) {
        return;
    }
    id = product.id;
    const list = getWishlist();
    if (
        list.find(function (item) {
            return item.id === id;
        })
    ) {
        showMessage('Already saved in your collection.');
        return;
    }
    list.push({ id: id, status: 'Interested' });
    if (saveList('wishlist', list)) {
        showMessage('Saved to your collection.');
    }
}
// Reused by the Home and Products pages. Templates contain catalogue data, not user input.
function productCard(product, showDetails) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="600" height="450" loading="lazy">
        <div class="card-body"><p class="card-category">${product.category} / ${productReference(product.id)}</p>
        <h3>${product.name}</h3><strong class="price">${money(product.price)}</strong>
        <div class="card-actions"><button class="add-button" type="button">Add to cart</button>
        <a class="button secondary details-link" href="products.html?product=${product.id}">View</a></div>
        <button type="button" class="secondary collection-button">Save to collection</button></div>`;
    card.querySelector('.add-button').addEventListener('click', function () {
        addToCart(product.id);
    });
    card.querySelector('.collection-button').addEventListener('click', function () {
        addToWishlist(product.id);
    });
    if (showDetails) {
        card.querySelector('.details-link').addEventListener('click', function (event) {
            event.preventDefault();
            showDetails(product.id);
        });
    }
    return card;
}
function emptyState(container, heading, message) {
    container.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'empty';
    const title = document.createElement('h2');
    title.textContent = heading;
    const text = document.createElement('p');
    text.textContent = message;
    const link = document.createElement('a');
    link.href = 'products.html';
    link.textContent = 'Explore products →';
    box.append(title, text, link);
    container.appendChild(box);
}
// Reusable custom validation: native validity plus whitespace-safe minimum length.
function validateField(id, errorId, message) {
    const input = document.getElementById(id);
    input.value = input.value.trim();
    const enoughText = !(input.minLength > 0) || input.value.length >= input.minLength;
    const valid = input.value !== '' && enoughText && input.checkValidity();
    input.setAttribute('aria-invalid', String(!valid));
    document.getElementById(errorId).textContent = valid ? '' : message;
    return valid;
}
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
});
document.getElementById('newsletterForm').addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validateField('newsletterEmail', 'newsletterMessage', 'Enter a valid email address.')) {
        document.getElementById('newsletterEmail').focus();
        return;
    }
    const email = document.getElementById('newsletterEmail').value.toLowerCase();
    const emails = readList('newsletter');
    if (emails.includes(email)) {
        document.getElementById('newsletterMessage').textContent = 'Already saved in this browser.';
        return;
    }
    emails.push(email);
    if (saveList('newsletter', emails)) {
        event.target.reset();
        document.getElementById('newsletterMessage').textContent =
            'Your email preference has been saved on this device. No email was sent.';
    }
});
updateCartCount();
window.addEventListener('storage', function () {
    updateCartCount();
});
// Content stays visible if JavaScript is unavailable or reduced motion is requested.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealSections = document.querySelectorAll('.reveal');
function revealOnScroll() {
    revealSections.forEach(function (section) {
        if (section.getBoundingClientRect().top < window.innerHeight - 40) {
            section.classList.remove('pending');
        }
    });
}
if (!reducedMotion) {
    revealSections.forEach(function (section) {
        section.classList.add('pending');
    });
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    window.addEventListener('resize', revealOnScroll);
    revealOnScroll();
}
// Optional platform feature: the rest of the site works if registration is unavailable.
if ('serviceWorker' in navigator && window.isSecureContext) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').catch(function (error) {
            console.warn('Offline support is unavailable:', error);
        });
    });
}
