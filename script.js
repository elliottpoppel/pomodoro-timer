let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const workButton = document.getElementById('work-button');
const restButton = document.getElementById('rest-button');
const resetButton = document.getElementById('reset');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    if (timerId !== null) {
        updatePageTitle(isWorkTime ? 'work' : 'rest', minutes, seconds);
    }
}

function startWorkTimer() {
    if (timerId !== null) return;
    
    isWorkTime = true;
    timeLeft = WORK_TIME;
    updateDisplay();
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            updatePageTitle('work-complete');
            alert('Work time is over! Take a break!');
            prepareRestMode();
        }
    }, 1000);
    
    workButton.textContent = 'Pause Work';
    workButton.classList.remove('work-btn');
    workButton.classList.add('work-btn-pause');
    restButton.classList.add('inactive');
}

function startRestTimer() {
    if (timerId !== null) return;
    
    isWorkTime = false;
    timeLeft = BREAK_TIME;
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            updatePageTitle('rest-complete');
            alert('Break time is over! Time to work!');
            prepareWorkMode();
        }
    }, 1000);
    
    restButton.textContent = 'Pause Rest';
    restButton.classList.remove('rest-btn');
    restButton.classList.add('rest-btn-pause');
    workButton.classList.add('inactive');
}

function pauseTimer() {
    if (timerId === null) return;
    
    clearInterval(timerId);
    timerId = null;
    
    if (isWorkTime) {
        workButton.textContent = 'Start Work';
        workButton.classList.remove('work-btn-pause');
        workButton.classList.add('work-btn');
    } else {
        restButton.textContent = 'Start Rest';
        restButton.classList.remove('rest-btn-pause');
        restButton.classList.add('rest-btn');
    }
    
    updatePageTitle(null);
}

function prepareWorkMode() {
    timeLeft = WORK_TIME;
    isWorkTime = true;
    workButton.textContent = 'Start Work';
    workButton.classList.remove('work-btn-pause', 'inactive');
    workButton.classList.add('work-btn');
    restButton.classList.remove('rest-btn-pause');
    restButton.classList.add('rest-btn', 'inactive');
    updateDisplay();
}

function prepareRestMode() {
    timeLeft = BREAK_TIME;
    isWorkTime = false;
    restButton.textContent = 'Start Rest';
    restButton.classList.remove('rest-btn-pause', 'inactive');
    restButton.classList.add('rest-btn');
    workButton.classList.remove('work-btn-pause');
    workButton.classList.add('work-btn', 'inactive');
    updateDisplay();
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = WORK_TIME;
    isWorkTime = true;
    
    // Reset both buttons to their initial active states
    workButton.textContent = 'Start Work';
    workButton.classList.remove('work-btn-pause', 'inactive');
    workButton.classList.add('work-btn');
    
    restButton.textContent = 'Start Rest';
    restButton.classList.remove('rest-btn-pause', 'inactive');
    restButton.classList.add('rest-btn');
    
    updateDisplay();
    
    updatePageTitle(null);
}

function createTomatoRain() {
    const particlesContainer = document.getElementById('particles-container');
    const screenWidth = window.innerWidth;
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = '🍅';
            particle.className = 'particle-rain';
            
            const randomX = Math.random() * screenWidth;
            const swing = (Math.random() - 0.5) * 200;
            const duration = 1.5 + Math.random() * 1;
            const rotation = (Math.random() - 0.5) * 360;
            
            particle.style.setProperty('--swing', `${swing}px`);
            particle.style.setProperty('--rotation', `${rotation}deg`);
            particle.style.setProperty('--duration', `${duration}s`);
            
            particle.style.left = `${randomX}px`;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particlesContainer.removeChild(particle);
            }, duration * 1000);
        }, i * 100); // Stagger the tomatoes
    }
}

workButton.addEventListener('click', (event) => {
    if (timerId === null && !workButton.classList.contains('inactive')) {
        createParticles(event, '👨‍💻');
        startWorkTimer();
    } else if (isWorkTime) {
        pauseTimer();
    }
});

restButton.addEventListener('click', (event) => {
    if (timerId === null && !restButton.classList.contains('inactive')) {
        createParticles(event, '😴');
        startRestTimer();
    } else if (!isWorkTime) {
        pauseTimer();
    }
});

resetButton.addEventListener('click', (event) => {
    createTomatoRain();
    resetTimer();
});

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay();

function createParticles(event, emoji) {
    const particlesContainer = document.getElementById('particles-container');
    const buttonRect = event.target.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.textContent = emoji;
        particle.className = 'particle';
        
        // More random variations
        const angle = (Math.random() * Math.PI * 2);
        const distance = 100 + Math.random() * 150;
        const duration = 0.8 + Math.random() * 0.6;
        const scale = 0.5 + Math.random() * 1.5;
        const rotation = (Math.random() - 0.5) * 720;
        
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--scale', scale);
        particle.style.setProperty('--rotation', `${rotation}deg`);
        particle.style.setProperty('--duration', `${duration}s`);
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particlesContainer.removeChild(particle);
        }, duration * 1000);
    }
}

function updatePageTitle(state) {
    const baseTitle = 'Pomodoro Timer';
    if (!state) {
        document.title = baseTitle;
        return;
    }
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const time = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (state === 'work') {
        document.title = `👨‍💻 ${time} work remaining - ${baseTitle}`;
    } else if (state === 'rest') {
        document.title = `😴 ${time} rest remaining - ${baseTitle}`;
    } else if (state === 'work-complete') {
        document.title = `⏰ Work timer complete!`;
    } else if (state === 'rest-complete') {
        document.title = `⏰ Rest timer complete!`;
    }
} 