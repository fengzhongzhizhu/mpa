/* eslint-disable */
import "@babel/polyfill";
import './about.less';
console.log('11111');

// import imgUrl from '../../images/cat.jpeg';
import imgUrl from '../../images/priceUp.png';


const img = document.createElement("img");
img.style.width = "200px";
img.src = imgUrl;
document.body.appendChild(img);