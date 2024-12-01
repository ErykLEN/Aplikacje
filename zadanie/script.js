"use strict";
var _a, _b, _c;
const appState = {
    currentStyle: '',
    styles: {
        style1: 'style.css',
        style2: 'style2.css',
        style3: 'style3.css',
    },
};
function changeStyle(styleKey) {
    const existingLink = document.querySelector('link[rel="stylesheet"]');
    if (existingLink) {
        existingLink.remove();
    }
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = appState.styles[styleKey];
    document.head.appendChild(newLink);
    appState.currentStyle = styleKey;
}
(_a = document.getElementById('style1')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => changeStyle('style1'));
(_b = document.getElementById('style2')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => changeStyle('style2'));
(_c = document.getElementById('style3')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => changeStyle('style3'));
