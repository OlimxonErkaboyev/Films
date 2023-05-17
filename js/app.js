const elForm = document.querySelector(".js-form");
const elSortSelect = document.querySelector(".js-films-sort-select");
const elSortOPtionAZ = document.querySelector(".js-option-a-z");
const elSortOptionZA = document.querySelector(".js-option-z-a");
const elFilmsInput = document.querySelector(".js-search-input");
const elFilmsSelect = document.querySelector(".js-films-select");
const elFilmsOption = document.querySelector(".js-films-option");
const elFilmsBtn = document.querySelector(".js-search-btn");
const elFilmsList = document.querySelector(".js-films-list");
const elFilmsTemp = document.querySelector(".js-films-temp").content;
const filmsFragment = new DocumentFragment();
const Genres = [];
elFilmsInput.focus();
// Render Films
function renderFilms(films) {
    elFilmsList.innerHTML = null;

    films.forEach((film, index) => {
        const cloneFilmTepm = elFilmsTemp.cloneNode(true);
        const elFilmsId = film.id;
        cloneFilmTepm.querySelector(".js-films-img").src = film.poster;
        cloneFilmTepm.querySelector(".js-films-title").textContent = film.title;
        cloneFilmTepm.querySelector(".js-films-desc").textContent = film.overview.split(" ").slice(0, 10).join(" ");
        cloneFilmTepm.querySelector(".js-films-genres").textContent = film.genres.join(", ");
        cloneFilmTepm.querySelector(".js-films-btn").addEventListener("click", () => {
            window.location.replace("http://127.0.0.1:5500/more.html");
            window.localStorage.setItem("film", elFilmsId);
        });

        filmsFragment.appendChild(cloneFilmTepm);
    })

    elFilmsList.appendChild(filmsFragment);

}
// Genres ichidagi genrelarni bitta o'zgaruvchiga yigib olish

let selectGenres = () => {

    for (let i = 0; i < films.length; i++) {
        for (let j = 0; j < films[i].genres.length; j++) {
            if (!Genres.includes(films[i].genres[j])) {
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
elFilmsInput.addEventListener("input", (evt) => {
    evt.preventDefault();
    elSortSelect.value = document.querySelector(".js-films-sort-option").value;
    elFilmsSelect.value = elFilmsOption.textContent;

    const searchQuery = new RegExp(elFilmsInput.value, "gi");
    const foundFilms = films.filter((film) => String(film.title).match(searchQuery));
    console.log(foundFilms)
    if (foundFilms.length > 0) {
        renderFilms(foundFilms);
    } else {
        elFilmsList.innerHTML = `<div class = 'text-darcyan text-center mt-5 display-2'> ${elFilmsInput.value} not found movie 🙄</div>`;
    }
});

// Select Films

elFilmsSelect.addEventListener("click", (evt) => {
    evt.preventDefault();
    elFilmsInput.value = null
    elSortSelect.value = document.querySelector(".js-films-sort-option").value;

    const searchQuery = new RegExp(elFilmsSelect.value, "gi");
    const foundFilms = films.filter((film) => String(film.genres).match(searchQuery));
    if (foundFilms.length > 0) {
        renderFilms(foundFilms);
    };
});

elSortSelect.addEventListener("input", (evt) => {
    evt.preventDefault();
    elFilmsInput.value = null;

    const sortFilms = films.sort((a, b) => {
        const alower = a.title.toLowerCase();
        const blower = b.title.toLowerCase();

        if (elSortSelect.value == elSortOPtionAZ.value) {
            if (alower > blower) {
                return 1
            } else if (alower < blower) {
                return -1;
            } else {
                return 0;
            }
        } else if (elSortSelect.value == elSortOptionZA.value) {
            if (alower > blower) {
                return -1
            } else if (alower < blower) {
                return 1;
            } else {
                return 0;
            }
        }
    })
    renderFilms(sortFilms);
    // console.log(sortFilms)
})


renderFilms(films);
