import {getRandomCatImg} from './script';

async function randomImgClick() {
    const imgEl = document.querySelector(`#catImg`)
    const newRandomImg = await getRandomCatImg();
    imgEl.src = newRandomImg ;
}
export {randomImgClick};