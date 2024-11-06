import * as eventHandling from './eventsHandling';

document.addEventListener("DOMContentLoaded", () => {
    const randomImgButton = document.querySelector(`#randomCatBtn`);
    const imgEl = document.querySelector(`#catImg`);

    imgEl.onerror = function() {
        this.src = './images/not-found-cat.png';
    };
    imgEl.src = './images/default-cat.png';
    randomImgButton.addEventListener(`click`,eventHandling.randomImgClick);
});