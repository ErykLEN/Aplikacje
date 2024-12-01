
interface AppState {
    currentStyle: string;
    styles: Record<string, string>;
}

const appState: AppState = {
    currentStyle: '',
    styles: {
        style1: 'style.css',
        style2: 'style2.css',
        style3: 'style3.css',
    },
};


function changeStyle(styleKey: string): void {
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


document.getElementById('style1')?.addEventListener('click', () => changeStyle('style1'));
document.getElementById('style2')?.addEventListener('click', () => changeStyle('style2'));
document.getElementById('style3')?.addEventListener('click', () => changeStyle('style3'));