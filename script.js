/* se corrigio el problema de que caundo llega a 1 hora se reinicia
// script.js

// Array to store the stopwatch instances
let stopwatches = [];
let currentStopwatchIndex = 0;

// Select DOM elements
const stopwatchContainer = document.getElementById('stopwatch-container');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');
const addStopwatchButton = document.getElementById('add-stopwatch');
const dotNavigation = document.querySelector('.dot-navigation');

// Add event listeners for navigation and adding stopwatches
backButton.addEventListener('click', showPreviousStopwatch);
nextButton.addEventListener('click', showNextStopwatch);
addStopwatchButton.addEventListener('click', addStopwatch);

// Function to create a new stopwatch instance
function createStopwatch(index) {
    const stopwatch = document.createElement('div');
    stopwatch.className = 'stopwatch';
    stopwatch.innerHTML = `
        <h2 contenteditable="true">Stopwatch number ${index + 1}</h2>
        <div class="main-timer">00:00.00</div>
        <div class="buttons">
            <button class="lap-reset button">Lap</button>
            <button class="start-stop button">Start</button>
        </div>
        <div class="laps"></div>
    `;
    // Add event listeners for the new stopwatch buttons
    const startStopButton = stopwatch.querySelector('.start-stop');
    const lapResetButton = stopwatch.querySelector('.lap-reset');
    const mainTimerDisplay = stopwatch.querySelector('.main-timer');
    const lapsContainer = stopwatch.querySelector('.laps');
    let timerInterval;
    let isRunning = false;
    let startTime = 0;
    let elapsedTime = 0;
    let lapTimes = [];
    let lapCount = 0;

    startStopButton.addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    lapResetButton.addEventListener('click', () => {
        if (isRunning) {
            lapTimer();
        } else {
            resetTimer();
        }
    });

    function startTimer() {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        startStopButton.textContent = 'Stop';
        startStopButton.style.backgroundColor = 'red';
        lapResetButton.textContent = 'Lap';
        lapResetButton.style.backgroundColor = 'grey';
    }

    function stopTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = 'green';
        lapResetButton.textContent = 'Reset';
        lapResetButton.style.backgroundColor = 'grey';
    }

    function resetTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = 0;
        lapTimes = [];
        lapCount = 0;
        updateTimerDisplay(0);
        lapsContainer.innerHTML = '';
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = 'green';
        lapResetButton.textContent = 'Lap';
        lapResetButton.style.backgroundColor = 'grey';
    }

    function lapTimer() {
        lapCount++;
        const lapTime = elapsedTime;
        const lapDuration = lapTime - (lapTimes[lapCount - 2] || 0);
        lapTimes.push(lapTime);

        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerHTML = `
            <span>Lap ${lapCount}</span>&nbsp;&nbsp;&nbsp;
            <span>${formatTime(lapDuration)}</span>&nbsp;&nbsp;&nbsp;
            <span>${formatTime(lapTime)}</span>&nbsp;&nbsp;&nbsp;
            <input type="text" class="lap-comment" placeholder="Add a comment">
        `;
        lapsContainer.prepend(lapElement);
    }

    function updateTimer() {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay(elapsedTime);
    }

    function updateTimerDisplay(time) {
        mainTimerDisplay.textContent = formatTime(time);
    }

    function formatTime(time) {
        const milliseconds = Math.floor((time % 1000) / 10);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);

        return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    return stopwatch;
}

// Function to add a new stopwatch
function addStopwatch() {
    const newStopwatch = createStopwatch(stopwatches.length);
    stopwatches.push(newStopwatch);
    stopwatchContainer.appendChild(newStopwatch);
    updateDotNavigation();
    showStopwatch(stopwatches.length - 1);
}

// Function to update the dot navigation
function updateDotNavigation() {
    dotNavigation.innerHTML = '';
    stopwatches.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === currentStopwatchIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => showStopwatch(index));
        dotNavigation.appendChild(dot);
    });
}

// Function to show a specific stopwatch
function showStopwatch(index) {
    stopwatches.forEach((stopwatch, i) => {
        if (i === index) {
            stopwatch.classList.remove('fade');
            stopwatch.style.display = 'block';
        } else {
            stopwatch.classList.add('fade');
            setTimeout(() => {
                stopwatch.style.display = 'none';
            }, 500); // Match the duration of the CSS transition
        }
    });
    currentStopwatchIndex = index;
    updateDotNavigation();
    updateNavigationButtons();
}

// Function to show the previous stopwatch
function showPreviousStopwatch() {
    if (currentStopwatchIndex > 0) {
        showStopwatch(currentStopwatchIndex - 1);
    }
}

// Function to show the next stopwatch
function showNextStopwatch() {
    if (currentStopwatchIndex < stopwatches.length - 1) {
        showStopwatch(currentStopwatchIndex + 1);
    }
}

// Function to update the visibility of navigation buttons
function updateNavigationButtons() {
    backButton.style.display = currentStopwatchIndex > 0 ? 'block' : 'none';
    nextButton.style.display = currentStopwatchIndex < stopwatches.length - 1 ? 'block' : 'none';
}

// Initial setup
addStopwatch();

*/


// script.js

// Array to store the stopwatch instances
let stopwatches = [];
let currentStopwatchIndex = 0;

// Select DOM elements
const stopwatchContainer = document.getElementById('stopwatch-container');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');
const addStopwatchButton = document.getElementById('add-stopwatch');
const dotNavigation = document.querySelector('.dot-navigation');

// Add event listeners for navigation and adding stopwatches
backButton.addEventListener('click', showPreviousStopwatch);
nextButton.addEventListener('click', showNextStopwatch);
addStopwatchButton.addEventListener('click', addStopwatch);

// Function to create a new stopwatch instance
function createStopwatch(index) {
    const stopwatch = document.createElement('div');
    stopwatch.className = 'stopwatch';
    stopwatch.innerHTML = `
        <h2 contenteditable="true">Stopwatch number ${index + 1}</h2>
        <div class="main-timer">00:00.00</div>
        <div class="buttons">
            <button class="lap-reset button">Lap</button>
            <button class="start-stop button">Stop</button>
        </div>
        <div class="laps"></div>
    `;
    // Add event listeners for the new stopwatch buttons
    const startStopButton = stopwatch.querySelector('.start-stop');
    const lapResetButton = stopwatch.querySelector('.lap-reset');
    const mainTimerDisplay = stopwatch.querySelector('.main-timer');
    const lapsContainer = stopwatch.querySelector('.laps');
    let timerInterval;
    let isRunning = false;
    let startTime = 0;
    let elapsedTime = 0;
    let lapTimes = [];
    let lapCount = 0;

    startStopButton.addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    lapResetButton.addEventListener('click', () => {
        if (isRunning) {
            lapTimer();
        } else {
            resetTimer();
        }
    });

    function startTimer() {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        startStopButton.textContent = 'Stop';
        startStopButton.style.backgroundColor = 'red';
        lapResetButton.textContent = 'Lap';
        lapResetButton.style.backgroundColor = 'grey';
    }

    function stopTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = 'green';
        lapResetButton.textContent = 'Reset';
        lapResetButton.style.backgroundColor = 'grey';
    }

    function resetTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = 0;
        lapTimes = [];
        lapCount = 0;
        updateTimerDisplay(0);
        lapsContainer.innerHTML = '';
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = 'red';
        lapResetButton.textContent = 'Lap';
        lapResetButton.style.backgroundColor = 'grey';
    }

    function lapTimer() {
        lapCount++;
        const lapTime = elapsedTime;
        const lapDuration = lapTime - (lapTimes[lapCount - 2] || 0);
        lapTimes.push(lapTime);

        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerHTML = `
            <span>Lap ${lapCount}</span>&nbsp;&nbsp;&nbsp;
            <span>${formatTime(lapDuration)}</span>&nbsp;&nbsp;&nbsp;
            <span>${formatTime(lapTime)}</span>&nbsp;&nbsp;&nbsp;
            <input type="text" class="lap-comment" placeholder="Add a comment">
        `;
        lapsContainer.prepend(lapElement);
    }

    function updateTimer() {
        elapsedTime = Date.now() - startTime;
        updateTimerDisplay(elapsedTime);
    }

    function updateTimerDisplay(time) {
        mainTimerDisplay.textContent = formatTime(time);
    }

    function formatTime(time) {
        const milliseconds = Math.floor((time % 1000) / 10);
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    return stopwatch;
}

// Function to add a new stopwatch
function addStopwatch() {
    const newStopwatch = createStopwatch(stopwatches.length);
    stopwatches.push(newStopwatch);
    stopwatchContainer.appendChild(newStopwatch);
    updateDotNavigation();
    showStopwatch(stopwatches.length - 1);
}

// Function to update the dot navigation
function updateDotNavigation() {
    dotNavigation.innerHTML = '';
    stopwatches.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === currentStopwatchIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => showStopwatch(index));
        dotNavigation.appendChild(dot);
    });
}

// Function to show a specific stopwatch
function showStopwatch(index) {
    stopwatches.forEach((stopwatch, i) => {
        if (i === index) {
            stopwatch.classList.remove('fade');
            stopwatch.style.display = 'block';
        } else {
            stopwatch.classList.add('fade');
            setTimeout(() => {
                stopwatch.style.display = 'none';
            }, 500); // Match the duration of the CSS transition
        }
    });
    currentStopwatchIndex = index;
    updateDotNavigation();
    updateNavigationButtons();
}

// Function to show the previous stopwatch
function showPreviousStopwatch() {
    if (currentStopwatchIndex > 0) {
        showStopwatch(currentStopwatchIndex - 1);
    }
}

// Function to show the next stopwatch
function showNextStopwatch() {
    if (currentStopwatchIndex < stopwatches.length - 1) {
        showStopwatch(currentStopwatchIndex + 1);
    }
}

// Function to update the visibility of navigation buttons
function updateNavigationButtons() {
    backButton.style.display = currentStopwatchIndex > 0 ? 'block' : 'none';
    nextButton.style.display = currentStopwatchIndex < stopwatches.length - 1 ? 'block' : 'none';
}

// Initial setup
addStopwatch();
