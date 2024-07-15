//firebase
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAtFMzOwGWjtG_ECvB1ZeUDsGk_bPD9xW0",
    authDomain: "alvaro-kim-clock.firebaseapp.com",
    databaseURL: "https://alvaro-kim-clock-default-rtdb.firebaseio.com",
    projectId: "alvaro-kim-clock",
    storageBucket: "alvaro-kim-clock.appspot.com",
    messagingSenderId: "132997193466",
    appId: "1:132997193466:web:5eb661cb8549ce4973b343"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

//hasta aqui termina los de firebase 

//esto lo estoy sacando de un tutorial llamado Connect Firebase Database to Html Form using JavaScript | How To Save Data In Firebase JavaScript
//get ref to database services
const b = getDatabase (app)


document.getElementById ("submit").addEventListener('click', function (e){
set(ref(db, 'user/' + document.getElementById("username").value),
{
  username: document.getElementById("username").value

});
   alert("Login Sucessfull !");
})





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
        <h2 contenteditable="true"> Click aqui para cambiar el STOPWATCH # ${index + 1}</h2>
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

        lapResetButton.style.width = '65px'; // Set the width to 65 pixels
        lapResetButton.style.height = '65px'; // Set the height to 65 pixels
        lapResetButton.style.fontSize = '16px'; // Set font size to 14 pixels
    }

    function stopTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = 'green';
        lapResetButton.textContent = 'Reset';
        lapResetButton.style.color = 'black';
        lapResetButton.style.backgroundColor = 'yellow';
        lapResetButton.style.width = '45px'; // Set the width to 60 pixels
        lapResetButton.style.height = '35px'; // Set the height to 35 pixels
        lapResetButton.style.fontSize = '10px'; // Set font size to 14 pixels
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
        // const milliseconds = Math.floor((time % 1000) / 10); removes milliseconds
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        //return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
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
