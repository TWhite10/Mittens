import {getRandomCatImg} from './script';
import {getEnergyLevel} from './script';
//click hander for the random cat image 
async function randomImgClick() {
    const imgEl = document.querySelector(`#catImg`)
    const newRandomImg = await getRandomCatImg();
    imgEl.src = newRandomImg ;
}
export {randomImgClick};


//click handler for the energy level - find cat
// async function checkedRadio(){

// }