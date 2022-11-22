const scene = document.querySelector('.scene');
const prism = document.querySelector('.prism');
const prismSides = document.querySelectorAll('.prism .side');
const prismBackside = document.querySelector('.prism .backside');
const prismLeftside = document.querySelector('.prism .leftside');
const prismRightside = document.querySelector('.prism .rightside');
const prismFirstText = document.querySelector('.prism .text.first');
const prismSecondText = document.querySelector('.prism .text.second');
const prismThirdText = document.querySelector('.prism .text.third');
const dots = document.querySelectorAll('.prism .dot');
const labelBlocks = document.querySelectorAll('.label');

const prismRatio = 1.5;

let prismWidth = 300;
let prismRotateY = 0;
let prismTopside = false;

function getDotTranslate(dot) {
    let prismHeight = prismWidth * prismRatio;
    let innerHeight = Math.sqrt((prismWidth*prismWidth) - ((prismWidth/2)*(prismWidth/2)));
    let center = innerHeight / 3;

	let x = dot.dataset.x * prismWidth;
	let y = prismHeight - (dot.dataset.y * prismHeight);
	let z = (dot.dataset.z * innerHeight) - center;

	return 'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, ' + z.toFixed(1) + 'px) translate(-50%, -50%)';
}

function sceneSetup() {
    let innerHeight = Math.sqrt((prismWidth*prismWidth) - ((prismWidth/2)*(prismWidth/2)));
    let center = innerHeight / 3;
    let takeaway = innerHeight - center;

    scene.style.width = (prismWidth + takeaway + 50) + 'px';

    prism.style.width = prismWidth + 'px';
    prism.style.height = (prismWidth * prismRatio) + 'px';

    if (prismTopside) {
        scene.style.perspective = 'none';

        prism.style.transform = 'rotateX(90deg)';

        prismSides.forEach(side => {
            side.style.border = 'none';
            side.style.borderTop = '1px solid #000';
            side.style.background = 'none';
        });

        prismBackside.style.transform = 'translateZ(' + -center + 'px) rotateX(90deg)';
        prismLeftside.style.transform = 'translateZ(' + -center + 'px) rotateY(-60deg) rotateX(90deg)';
        prismRightside.style.transform = 'translateZ(' + -center + 'px) rotateY(60deg) rotateX(90deg)';

        prismFirstText.style.transform = 'translate3d(-50%, 10px, ' + (-center-20) + 'px) rotateX(-90deg)';
        prismSecondText.style.transform = 'translate3d(50%, 10px, ' + (-center-20) + 'px) rotateX(-90deg)';
        prismThirdText.style.transform = 'translate3d(-50%, 10px, ' + (innerHeight - center + 20) + 'px) rotateX(-90deg)';

        dots.forEach(dot => {
            dot.style.transform = getDotTranslate(dot) + 'rotateX(-90deg)';
        });
    } else {
        scene.style.perspective = '1000px';

        prism.style.transform = 'rotateY(' + prismRotateY + 'deg)';

        prismSides.forEach(side => {
            side.style.border = '1px solid #000';
            side.style.background = 'url(/static/img/bg.svg)';
            side.style.backgroundSize = 'cover';
            side.style.backgroundPosition = 'center';
        });

        prismBackside.style.transform = 'translateZ(' + -center + 'px)';
        prismLeftside.style.transform = 'translateZ(' + -center + 'px) rotateY(-60deg)';
        prismRightside.style.transform = 'translateZ(' + -center + 'px) rotateY(60deg)';

        prismFirstText.style.transform = 'translate3d(-50%, 10px, ' + (-center-20) + 'px) rotateY(' + -prismRotateY + 'deg)';
        prismSecondText.style.transform = 'translate3d(50%, 10px, ' + (-center-20) + 'px) rotateY(' + -prismRotateY + 'deg)';
        prismThirdText.style.transform = 'translate3d(-50%, 10px, ' + (innerHeight - center + 20) + 'px) rotateY(' + -prismRotateY + 'deg)';

        dots.forEach(dot => {
            dot.style.transform = getDotTranslate(dot) + ' rotateY(' + -prismRotateY + 'deg)';
        });
    }
}

function dotsColorize() {
    let degree = Math.random()*360;
    for (let i = 0; i < dots.length; i++) {
        dots[i].style.background = 'hsl(' + (degree+(i*10)) + ', 85%, 85%)';
        labelBlocks[i].style.setProperty('--background', 'hsl(' + (degree+(i*10)) + ', 85%, 85%)');
    }
}


window.addEventListener('keydown', e => {
    if (e.keyCode === 37) prismRotateY -= 10;
    if (e.keyCode === 39) prismRotateY += 10;
    if (e.keyCode === 38 && prismWidth < 450) prismWidth += 10;
    if (e.keyCode === 40 && prismWidth > 200) prismWidth -= 10;
    if (e.keyCode === 32) prismTopside = !prismTopside;
    if (e.keyCode === 68) dotsColorize();
    sceneSetup();
});


sceneSetup();
dotsColorize();

