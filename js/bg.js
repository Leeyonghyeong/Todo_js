const UNSPLASH_API_KEY = "kyjq_fx3GhaWmEc3ALSdP6tZ9OhFQ7gTdcwGHwagLJU";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body"),
    locationContainer = document.querySelector(".js-location span");

function loadBackground(imageUrl, city, country, name) {
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imageUrl})`;
    locationContainer.innerHTML = `${name}, ${city}, ${country}`;
    return;
}

function getBackground() {
    fetch(UNSPLASH_URL)
    .then(res => { return res.json()})
    .then(data => {
        const image = data;
        if(image.urls && image.urls.full && image.location) {
            const fullUrl = image.urls.full;
            const location = image.location;
            const city = location.city;
            const country = location.country;
            const name = location.name;
            loadBackground(fullUrl, city, country, name);
        } else {
            getBackground();
        }
    });
}

function init() {
    getBackground();
    return;
}

init();