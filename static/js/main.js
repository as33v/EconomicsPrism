const scene = document.querySelector('.scene');

const prism = document.querySelector('.prism');
const prismTextSocial = document.querySelector('.text-social');
const prismTextEconomics = document.querySelector('.text-economics');
const prismTextEcologics = document.querySelector('.text-ecologics');
const prismTextSocialTranslate = 'translate3d(calc(125px - 50%), 500px, 161.5px)';
const prismTextEconomicsTranslate = 'translate3d(calc(-100% - 20px), 500px, -75px)';
const prismTextEcologicsTranslate = 'translate3d(270px, 500px, -75px)';
let prismRotate = 0;

const dots = document.querySelectorAll('.dot');

const getDotTranslate = dot => {
	let x = dot.dataset.x * 250;
	let y = 500 - (dot.dataset.y * 500);
	let z = (dot.dataset.z * 216.5) - 75;
	return 'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, ' + z.toFixed(1) + 'px) translate(-50%, -50%)';
};

const topSideBtn = document.getElementById('topSideBtn');
let topSide = false;

window.addEventListener('keydown', e => {
	if (!topSideBtn.checked) {
		if (e.keyCode === 37) prismRotate += 10;
		if (e.keyCode === 39) prismRotate -= 10;

		prism.style.transform = 'rotateY(' + prismRotate + 'deg)';
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
		scene.style.perspective = 'none';
		prism.style.transform = 'rotateX(90deg)';
		prismTextSocial.style.transform = prismTextSocialTranslate + ' rotateX(-90deg)';
		prismTextEconomics.style.transform = prismTextEconomicsTranslate + ' rotateX(-90deg)';
		prismTextEcologics.style.transform = prismTextEcologicsTranslate + ' rotateX(-90deg)';

		dots.forEach(dot => {
			dot.style.transform = getDotTranslate(dot) + ' rotateX(-90deg)';
		});
	} else {
		scene.style.perspective = '1000px';
		prism.style.transform = 'rotateY(' + prismRotate + 'deg)';
		prismTextSocial.style.transform = prismTextSocialTranslate + ' rotateY(' + -prismRotate + 'deg)';
		prismTextEconomics.style.transform = prismTextEconomicsTranslate + ' rotateY(' + -prismRotate + 'deg)';
		prismTextEcologics.style.transform = prismTextEcologicsTranslate + ' rotateY(' + -prismRotate + 'deg)';

		dots.forEach(dot => {
			dot.style.transform = getDotTranslate(dot) + ' rotateY(' + -prismRotate + 'deg)';
		});
	}
});

document.addEventListener('DOMContentLoaded', e => {
	dots.forEach(dot => {
		dot.style.transform = getDotTranslate(dot);
	});
});
