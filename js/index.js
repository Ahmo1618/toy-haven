// Each slide has its own image, text and destination.
const slides = [
    {
        tag: "01 / THE COLLECTOR'S CORNER",
        title: 'Small pieces. Big obsessions.',
        text: 'Figurines, game-night favourites and little machines with serious detail.',
        image: 'astronaut',
        alt: 'Lunar Explorer Figure',
        category: 'Figurines',
    },
    {
        tag: '02 / GAME NIGHT STARTS HERE',
        title: 'Good company. Great games.',
        text: 'Clear the table. Pick a game. Make an evening of it.',
        image: 'boardgame',
        alt: 'Sunday Trail Game',
        category: 'Board Games',
    },
    {
        tag: '03 / THE MINIATURE GARAGE',
        title: 'Small cars. Serious detail.',
        text: 'Find a new favourite for your model-car display.',
        image: 'roadster',
        alt: 'Crimson Roadster Model',
        category: 'Diecast Cars',
    },
    {
        tag: '04 / ROOM FOR IMAGINATION',
        title: 'A little more play.',
        text: 'Soft companions, curious robots and everyday adventures.',
        image: 'teddy',
        alt: 'Classic Teddy Bear',
        category: 'Toys',
    },
];
let slideIndex = 0;
let sliderTimer;
let paused = reducedMotion;
const pauseButton = document.getElementById('pauseSlides');
function showSlide() {
    const slide = slides[slideIndex];
    document.getElementById('heroTag').textContent = slide.tag;
    document.getElementById('heroTitle').textContent = slide.title;
    document.getElementById('heroText').textContent = slide.text;
    document.getElementById('heroImage').src = 'assets/images/' + slide.image + '.webp';
    document.getElementById('heroImage').alt = slide.alt;
    document.getElementById('heroLink').href =
        'products.html?category=' + encodeURIComponent(slide.category);
    document.getElementById('slideCount').textContent = '0' + (slideIndex + 1) + ' / 04';
}
function startRotation() {
    clearInterval(sliderTimer);
    if (!paused && !document.hidden) {
        sliderTimer = setInterval(function () {
            slideIndex = (slideIndex + 1) % slides.length;
            showSlide();
        }, 6000);
    }
    pauseButton.textContent = paused ? 'Start rotation' : 'Pause rotation';
    pauseButton.setAttribute('aria-pressed', String(paused));
}
document.getElementById('nextSlide').addEventListener('click', function () {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide();
    startRotation();
});
document.getElementById('previousSlide').addEventListener('click', function () {
    slideIndex = (slideIndex + slides.length - 1) % slides.length;
    showSlide();
    startRotation();
});
pauseButton.addEventListener('click', function () {
    paused = !paused;
    startRotation();
});
// Pause when keyboard users interact inside the carousel.
document.querySelector('.hero').addEventListener('focusin', function (event) {
    if (event.target !== pauseButton) {
        paused = true;
        startRotation();
    }
});
document.addEventListener('visibilitychange', startRotation);
startRotation();
// UTC calendar conversion from the user's local date avoids daylight-saving rounding.
const today = new Date();
const dayNumber = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86400000,
);
const daily = products[dayNumber % products.length];
document.getElementById('dailyProduct').innerHTML = `
    <div><img src="${daily.image}" alt="${daily.name}" width="600" height="450" loading="lazy"></div>
    <div><p class="eyebrow">TODAY'S SHELF PICK / ${productReference(daily.id)}</p><h2>${daily.name}</h2><p>${daily.description}</p><strong>${money(daily.price)}</strong><a class="button" href="products.html?product=${daily.id}">Meet today's pick ↗</a></div>`;
products
    .filter(function (product) {
        return [1, 3, 5, 7].includes(product.id);
    })
    .forEach(function (product) {
        document.getElementById('featuredProducts').appendChild(productCard(product));
    });
