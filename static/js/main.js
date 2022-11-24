const scene = document.querySelector('.scene');
const prism = document.querySelector('.prism');

// Prism Sides
const prismBackside = document.querySelector('.prism .backside');
const prismLeftside = document.querySelector('.prism .leftside');
const prismRightside = document.querySelector('.prism .rightside');

// Prism Top
const prismTopBottom = document.querySelector('.prism .top.bottom');
const prismTopLeft = document.querySelector('.prism .top.left');
const prismTopRight = document.querySelector('.prism .top.right');

// Prism Bottom
const prismBotBottom = document.querySelector('.prism .bot.bottom');
const prismBotLeft = document.querySelector('.prism .bot.left');
const prismBotRight = document.querySelector('.prism .bot.right');

// Prism Texts
const prismFirstText = document.querySelector('.prism .text.first');
const prismSecondText = document.querySelector('.prism .text.second');
const prismThirdText = document.querySelector('.prism .text.third');

// Dots
const dots = document.querySelectorAll('.prism .dot');
const labelBlocks = document.querySelectorAll('.label');


const prismRatio = 1.5;

let prismWidth = 300;
let prismRotateY = 0;
let prismTopside = false;
let dotSize = 15;
let dotFontSize = 13;

function getDotTranslate(dot) {
    let prismHeight = prismWidth * prismRatio;
    let innerHeight = Math.sqrt((prismWidth*prismWidth) - ((prismWidth/2)*(prismWidth/2)));
    let center = innerHeight / 3;

	let x = dot.dataset.x * prismWidth;
	let y = prismHeight - (dot.dataset.y * prismHeight);
	let z = (dot.dataset.z * innerHeight) - center;

	return 'translate3d(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px, ' + z.toFixed(1) + 'px) translate(-50%, -50%)';
}

function dotsColorize() {
    let degree = Math.random()*360;
    let step = 360 / dots.length
    for (let i = 0; i < dots.length; i++) {
        dots[i].style.background = 'hsl(' + (degree+(i*step)) + ', 100%, 70%)';
        labelBlocks[i].style.setProperty('--background', 'hsl(' + (degree+(i*step)) + ', 100%, 70%)');
    }
}

function sceneSetup() {
    let prismHeight = prismWidth * prismRatio;
    let innerHeight = Math.sqrt((prismWidth*prismWidth) - ((prismWidth/2)*(prismWidth/2)));
    let center = innerHeight / 3;
    let takeaway = innerHeight - center;

    prism.style.width = prismWidth + 'px';
    prism.style.height = prismHeight + 'px';

    prismBackside.style.transform = 'translateZ(' + -center + 'px)';
    prismLeftside.style.transform = 'translateZ(' + -center + 'px) rotateY(-60deg)';
    prismRightside.style.transform = 'translateZ(' + -center + 'px) rotateY(60deg)';

    prismTopBottom.style.transform = 'translateZ(' + -center + 'px) rotateX(90deg)';
    prismTopLeft.style.transform = 'translateZ(' + -center + 'px) rotateY(-60deg) rotateX(90deg)';
    prismTopRight.style.transform = 'translateZ(' + -center + 'px) rotateY(60deg) rotateX(90deg)';

    prismBotBottom.style.transform = 'translateZ(' + -center + 'px) rotateX(90deg)';
    prismBotLeft.style.transform = 'translateZ(' + -center + 'px) rotateY(-60deg) rotateX(90deg)';
    prismBotRight.style.transform = 'translateZ(' + -center + 'px) rotateY(60deg) rotateX(90deg)';

    dots.forEach(dot => {
        dot.style.width = dotSize + 'px';
        dot.style.height = dotSize + 'px';
        dot.style.fontSize = dotFontSize + 'px';
    });

    if (prismTopside) {
        scene.style.width = (Math.sqrt(Math.pow(prismHeight, 2) + Math.pow(prismWidth, 2)) + 100) + 'px';

        prism.style.transform = 'rotateX(90deg) rotateZ(' + -prismRotateY + 'deg)';

        prismFirstText.style.transform = 'translate3d(0, 10px, ' + (-center-20) + 'px) rotateX(-90deg) rotateY(' + -prismRotateY + 'deg)';
        prismSecondText.style.transform = 'translate3d(0, 10px, ' + (-center-20) + 'px) rotateX(-90deg) rotateY(' + -prismRotateY + 'deg)';
        prismThirdText.style.transform = 'translate3d(-50%, 10px, ' + (takeaway+20) + 'px) rotateX(-90deg) rotateY(' + -prismRotateY + 'deg)';

        dots.forEach(dot => {
            dot.style.transform = getDotTranslate(dot) + 'rotateX(-90deg) rotateY(' + -prismRotateY + 'deg)';
        });
    } else {
        scene.style.width = (prismWidth + takeaway + 100) + 'px';

        prism.style.transform = 'rotateY(' + prismRotateY + 'deg)';

        prismFirstText.style.transform = 'translate3d(-50%, 10px, ' + (-center-20) + 'px) rotateY(' + -prismRotateY + 'deg)';
        prismSecondText.style.transform = 'translate3d(50%, 10px, ' + (-center-20) + 'px) rotateY(' + -prismRotateY + 'deg)';
        prismThirdText.style.transform = 'translate3d(-50%, 10px, ' + (takeaway+20) + 'px) rotateY(' + -prismRotateY + 'deg)';

        dots.forEach(dot => {
            dot.style.transform = getDotTranslate(dot) + ' rotateY(' + -prismRotateY + 'deg)';
        });
    }
}


window.addEventListener('keydown', e => {
    if (e.keyCode === 37) prismRotateY -= 10;
    if (e.keyCode === 39) prismRotateY += 10;
    if (e.keyCode === 38 && prismWidth < 450) prismWidth += 10;
    if (e.keyCode === 40 && prismWidth > 200) prismWidth -= 10;
    if (e.keyCode === 32) prismTopside = !prismTopside;
    if (e.keyCode === 68) dotsColorize();
    if (e.keyCode === 90) { dotSize++; dotFontSize++; }
    if (e.keyCode === 88) { dotSize--; dotFontSize--; }
    sceneSetup();
});


sceneSetup();
dotsColorize();

