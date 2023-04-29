"use strict";

const personalMoveDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function () {
        personalMoveDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

        while (personalMoveDB.count === '' || personalMoveDB.count == null || isNaN(personalMoveDB.count)) {
            personalMoveDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyFilms: function () {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', '').trim(),
                b = +prompt('На сколько оцените его?', '');

            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                personalMoveDB.movies[a] = b;
                console.log('done!');
            } else {
                console.log('error');
                i--;
            }
        }
    },
    detectPersonalLevel: function () {
        if (personalMoveDB.count <= 10){
            console.log('Просмотрено довольно мало фильмов');
        } else if (personalMoveDB.count >= 10 && personalMoveDB.count < 30) {
            console.log('Вы классический зритель');
        } else if (personalMoveDB.count >= 30) {
            console.log("Вы киноман");
        } else  {
            console.log('Произошла ошибка');
        }
    },
   showMyDB: function (hidden) {
        if (!hidden) {
        console.log(personalMoveDB);
        }
   },
   toggleVisibleMyDB: function () {
     if (personalMoveDB.privat) {
         personalMoveDB.privat = false;
     } else {
         personalMoveDB.privat = true;
     }
   },
   writeYourGenres: function () {
       for (let i = 1; i <= 3; i++) {
           let genres = prompt(`Ваш любимый жанр под номером ${i}`);
            if (genres === '' || genres === null) {
                console.log('Вы ввели некорректные данные или не ввели их вовсе');
                i--;
            } else {
                personalMoveDB.genres[i - 1] = genres;
            }
       }
       personalMoveDB.genres.forEach((item, i) => {
           console.log(`Любимый жанр ${i + 1} - это ${item}`);
       });
   }
};

const moveDB = {
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
      moveList = document.querySelector('.promo__interactive-list');

adv.forEach(item => {
   item.remove();
});

genre.textContent = 'Драма';

poster.style.backgroundImage = 'url("img/bg.jpg")';

moveList.innerHTML = "";

moveDB.movies.sort();

moveDB.movies.forEach((film, i) => {
    moveList.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
    `;
})
