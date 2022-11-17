const scene = document.querySelector('.scene');

const prism = document.querySelector('.prism');
const prismTextSocial = document.querySelector('.text-social');
const prismTextEconomics = document.querySelector('.text-economics');
const prismTextEcologics = document.querySelector('.text-ecologics');
const prismTextSocialTranslate = 'translate3d(calc(125px - 50%), 500px, 161.5px)';
const prismTextEconomicsTranslate = 'translate3d(calc(-100% - 20px), 500px, -75px)';
const prismTextEcologicsTranslate = 'translate3d(270px, 500px, -75px)';
let prismRotate = 0;
let prismTranslateY = 0;
let prismTranslateZ = 0;
let prismScale = 1;

const dots = document.querySelectorAll('.dot');

const getDotTranslate = dot => {
	let x = dot.dataset.x * 250;
	let y = 500 - (dot.dataset.y * 500);
	let z = (dot.dataset.z * 216.5) - 75;
	return 'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, ' + z.toFixed(1) + 'px) translate(-50%, -50%)';
};

const getPrismScale = () => 'scale3d(' + prismScale + ', ' + prismScale + ', ' + prismScale + ')';

const topSideBtn = document.getElementById('topSideBtn');
let topSide = false;

prism.addEventListener('click', e => {
    prismScale = prismScale == 1 ? 2 : 1;
    prismTranslateY = 0;
    if (!topSideBtn.checked) {
        prism.style.transform = 'rotateY(' + prismRotate + 'deg) translateY(' + prismTranslateY + 'px) ' + getPrismScale();
    } else {
        if (prismScale > 1) prismTranslateZ = -100;
        else prismTranslateZ = 0;
		prism.style.transform = 'rotateX(90deg) translateZ(' + prismTranslateZ + 'px)' + getPrismScale();
    }
});

window.addEventListener('keydown', e => {
	if (!topSideBtn.checked) {
		if (e.keyCode === 37) prismRotate += 10;
		if (e.keyCode === 39) prismRotate -= 10;
        if (prismScale > 1) {
            if (e.keyCode === 38 && prismTranslateY < 400) prismTranslateY += 50;
            if (e.keyCode === 40 && prismTranslateY > -400) prismTranslateY -= 50;
        }

        prism.style.transform = 'rotateY(' + prismRotate + 'deg) translateY(' + prismTranslateY + 'px) ' + getPrismScale();
		prismTextSocial.style.transform = prismTextSocialTranslate + ' rotateY(' + -prismRotate + 'deg)';
		prismTextEconomics.style.transform = prismTextEconomicsTranslate + ' rotateY(' + -prismRotate + 'deg)';
		prismTextEcologics.style.transform = prismTextEcologicsTranslate + ' rotateY(' + -prismRotate + 'deg)';

		dots.forEach(dot => {
			dot.style.transform = getDotTranslate(dot) + ' rotateY(' + -prismRotate + 'deg)';
		});
    }
});

topSideBtn.addEventListener('change', e => {
	if (e.target.checked) {
        if (prismScale > 1) prismTranslateZ = -100;
        else prismTranslateZ = 0;
		scene.style.perspective = 'none';
		prism.style.transform = 'rotateX(90deg) translateY(' + prismTranslateY + 'px) TranslateZ(' + prismTranslateZ + 'px)' + getPrismScale();
		prismTextSocial.style.transform = prismTextSocialTranslate + ' rotateX(-90deg)';
		prismTextEconomics.style.transform = prismTextEconomicsTranslate + ' rotateX(-90deg)';
		prismTextEcologics.style.transform = prismTextEcologicsTranslate + ' rotateX(-90deg)';

		dots.forEach(dot => {
			dot.style.transform = getDotTranslate(dot) + ' rotateX(-90deg)';
		});
	} else {
		scene.style.perspective = '1000px';
		prism.style.transform = 'rotateY(' + prismRotate + 'deg) translateY(' + prismTranslateY + 'px) ' + getPrismScale();
		prismTextSocial.style.transform = prismTextSocialTranslate + ' rotateY(' + -prismRotate + 'deg)';
		prismTextEconomics.style.transform = prismTextEconomicsTranslate + ' rotateY(' + -prismRotate + 'deg)';
		prismTextEcologics.style.transform = prismTextEcologicsTranslate + ' rotateY(' + -prismRotate + 'deg)';

		dots.forEach(dot => {
			dot.style.transform = getDotTranslate(dot) + ' rotateY(' + -prismRotate + 'deg)';
		});
	}
});

document.addEventListener('DOMContentLoaded', e => {
    const regions = document.querySelectorAll('.regions li');

    for (let i = 0; i < dots.length; i++) {
        let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        dots[i].style.transform = getDotTranslate(dots[i]);
        dots[i].style.background = randomColor;
        regions[i].style.color = randomColor;
    }
});
