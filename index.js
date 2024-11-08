import * as eventHandling from './eventsHandling';
//event listener for random cat btn
document.addEventListener("DOMContentLoaded", () => {
    const randomImgButton = document.querySelector(`#randomCatBtn`);
    const imgEl = document.querySelector(`#catImg`);

    imgEl.onerror = function() {
        this.src = './images/not-found-cat.png';
    };
    imgEl.src = 'https://api.thecatapi.com/v1/images/search';
    //event handle for btn
    randomImgButton.addEventListener(`click`,eventHandling.randomImgClick);
});

