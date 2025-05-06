const form = document.getElementById('proxy-search-form');
const input = document.getElementById('proxy-url-input');
const iframe = document.getElementById('proxy-frame');
const backBtn = document.getElementById('back-btn');
const forwardBtn = document.getElementById('forward-btn');

const historyStack = [];
let currentIndex = -1;

const proxy = 'proxy:port';

function loadURL(url) {
  let finalURL = url;
  if (!/^https?:\/\//i.test(url)) {
    finalURL = 'https://duckduckgo.com/?q=' + encodeURIComponent(url);
  }

  const proxied = `${proxy}/proxy?url=${encodeURIComponent(finalURL)}`;
  iframe.src = proxied;

  if (currentIndex === -1 || historyStack[currentIndex] !== finalURL) {
    historyStack.splice(currentIndex + 1);
    historyStack.push(finalURL);
    currentIndex++;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = input.value.trim();
  if (url) loadURL(url);
});

backBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    iframe.src = `${proxy}/proxy?url=${encodeURIComponent(historyStack[currentIndex])}`;
  }
});

forwardBtn.addEventListener('click', () => {
  if (currentIndex < historyStack.length - 1) {
    currentIndex++;
    iframe.src = `${proxy}/proxy?url=${encodeURIComponent(historyStack[currentIndex])}`;
  }
});