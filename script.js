let timerInterval;
let startTime;
let pausedTime = 0;
let isPaused = false;

const sampleTextElement = document.getElementById('sample-text');
const typingInputElement = document.getElementById('typing-input');
const timerElement = document.getElementById('timer');
const charCountElement = document.getElementById('char-count');
const speedResultElement = document.getElementById('speed-result');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');

function startTimer() {
    if (!startTime) {
        startTime = Date.now();
    }
    timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000) + pausedTime;
    timerElement.textContent = `Time: ${elapsedTime}s`;
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = !isPaused;
    if (isPaused) {
        pausedTime += Math.floor((Date.now() - startTime) / 1000);
        pauseButton.textContent = 'Resume';
    } else {
        startTime = Date.now();
        startTimer();
        pauseButton.textContent = 'Pause';
    }
}

function resetTest() {
    clearInterval(timerInterval);
    startTime = null;
    pausedTime = 0;
    isPaused = false;
    typingInputElement.value = '';
    timerElement.textContent = 'Time: 0s';
    charCountElement.textContent = 'Characters Typed: 0';
    speedResultElement.textContent = 'Speed: 0 CPM';
    pauseButton.textContent = 'Pause';
}

function calculateSpeed() {
    const elapsedTime = (Date.now() - startTime) / 60000 + pausedTime / 60; // in minutes
    const charCount = typingInputElement.value.length;
    const speed = Math.round(charCount / elapsedTime);
    speedResultElement.textContent = `Speed: ${speed} CPM`;
}

typingInputElement.addEventListener('input', () => {
    if (!startTime) {
        startTimer();
    }
    const charCount = typingInputElement.value.length;
    charCountElement.textContent = `Characters Typed: ${charCount}`;
    if (typingInputElement.value === sampleTextElement.textContent) {
        clearInterval(timerInterval);
        calculateSpeed();
    }
});

pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTest);
