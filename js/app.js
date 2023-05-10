const elForm = document.querySelector(".js-form");
const elFilmsInput = document.querySelector(".js-search-input");
const elFilmsSelect = document.querySelector(".js-films-select");
const elFilmsOption = document.querySelector(".js-films-option");
const elFilmsBtn = document.querySelector(".js-search-btn");
const elFilmsList = document.querySelector(".js-films-list");
const elFilmsTemp = document.querySelector(".js-films-temp").content;
const filmsFragment = new DocumentFragment();
const Genres = [];

// Render Films
function renderFilms(films) {
    elFilmsList.innerHTML = null;

    films.forEach((film) => {
        const cloneFilmTepm = elFilmsTemp.cloneNode(true);

        cloneFilmTepm.querySelector(".js-films-img").src = film.poster;
        cloneFilmTepm.querySelector(".js-films-title").textContent = film.title;
        cloneFilmTepm.querySelector(".js-films-desc").textContent = film.overview.split(" ").slice(0, 10).join(" ");
        cloneFilmTepm.querySelector(".js-films-genres").textContent = film.genres.join(", ");
        // cloneFilmTepm.querySelector(".js-films-btn").dataset.id = film.id;

        filmsFragment.appendChild(cloneFilmTepm);
    })

    elFilmsList.appendChild(filmsFragment);

}
// Genres ichidagi genrelarni bitta o'zgaruvchiga yigib olish
let selectGenres = () => {

    for (let i = 0; i < films.length; i++) {
        for (let j = 0; j < films[i].genres.length; j++) {
            if (Genres.includes(films[i].genres[j])) {
                continue;
            } else {
                Genres.push(films[i].genres[j]);
            }
        }
    };

};

selectGenres();

// Draw Select
function drawSelect() {
    for (const genre of Genres) {

        const elOption = document.createElement("option");
        elOption.textContent = genre;
        elOption.style.value = "genre";

        elFilmsSelect.appendChild(elOption)

    };
}

drawSelect();

// Search Films
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    elFilmsSelect.value = elFilmsOption.textContent;

    const searchQuery = new RegExp(elFilmsInput.value, "gi");
    const foundFilms = films.filter((film) => String(film.title).match(searchQuery));

    if (foundFilms.length > 0) {
        renderFilms(foundFilms);
    } else {
        elFilmsList.innerHTML = `<div class = 'text-darcyan text-center mt-5 display-2'> ${elFilmsInput.value} not found movie 🙄</div>`;
    }
});
elFilmsSelect.addEventListener("click", (evt) => {
    evt.preventDefault();

    const searchQuery = new RegExp(elFilmsSelect.value, "gi");
    const foundFilms = films.filter((film) => String(film.genres).match(searchQuery));

    if (foundFilms.length > 0) {
        renderFilms(foundFilms);
    }
});


renderFilms(films);