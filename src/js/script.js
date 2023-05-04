"use strict";

// const personalMoveDB = {
//     count: 0,
//     movies: {},
//     actors: {},
//     genres: [],
//     privat: false,
//     start: function () {
//         personalMoveDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
//
//         while (personalMoveDB.count === '' || personalMoveDB.count == null || isNaN(personalMoveDB.count)) {
//             personalMoveDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
//         }
//     },
//     rememberMyFilms: function () {
//         for (let i = 0; i < 2; i++) {
//             const a = prompt('Один из последних просмотренных фильмов?', '').trim(),
//                 b = +prompt('На сколько оцените его?', '');
//
//             if (a != null && b != null && a != '' && b != '' && a.length < 50) {
//                 personalMoveDB.movies[a] = b;
//                 console.log('done!');
//             } else {
//                 console.log('error');
//                 i--;
//             }
//         }
//     },
//     detectPersonalLevel: function () {
//         if (personalMoveDB.count <= 10){
//             console.log('Просмотрено довольно мало фильмов');
//         } else if (personalMoveDB.count >= 10 && personalMoveDB.count < 30) {
//             console.log('Вы классический зритель');
//         } else if (personalMoveDB.count >= 30) {
//             console.log("Вы киноман");
//         } else  {
//             console.log('Произошла ошибка');
//         }
//     },
//    showMyDB: function (hidden) {
//         if (!hidden) {
//         console.log(personalMoveDB);
//         }
//    },
//    toggleVisibleMyDB: function () {
//      if (personalMoveDB.privat) {
//          personalMoveDB.privat = false;
//      } else {
//          personalMoveDB.privat = true;
//      }
//    },
//    writeYourGenres: function () {
//        for (let i = 1; i <= 3; i++) {
//            let genres = prompt(`Ваш любимый жанр под номером ${i}`);
//             if (genres === '' || genres === null) {
//                 console.log('Вы ввели некорректные данные или не ввели их вовсе');
//                 i--;
//             } else {
//                 personalMoveDB.genres[i - 1] = genres;
//             }
//        }
//        personalMoveDB.genres.forEach((item, i) => {
//            console.log(`Любимый жанр ${i + 1} - это ${item}`);
//        });
//    }
// };

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');


    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };


    const makeChanges = () => {
        genre.textContent = 'Драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };


    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

               createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});

