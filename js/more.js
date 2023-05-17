// More Page
const elMoreResult = document.querySelector(".result");
const elMoreTemp = document.querySelector(".more-temp").content;


const cloneMoreTemp = elMoreTemp.cloneNode(true);
const filmId = window.localStorage.getItem("film")
// films[elFilmsId];
console.log(filmId)
films.forEach((film) => {
    if (film.id == filmId) {
        cloneMoreTemp.querySelector(".more-img").src = film.poster;
        cloneMoreTemp.querySelector(".more-img").width = "300";
        cloneMoreTemp.querySelector(".more-img").height = "300";
        cloneMoreTemp.querySelector(".more-title").textContent = film.title;
        cloneMoreTemp.querySelector(".more-desc").textContent = film.overview;
        cloneMoreTemp.querySelector(".more-genres").textContent = film.genres;
        cloneMoreTemp.querySelector(".more-btn").addEventListener("click", () => {
            window.location.replace("http://127.0.0.1:5500/");
        });

        elMoreResult.appendChild(cloneMoreTemp);
    }
});
