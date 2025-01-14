class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        // Timer modes in seconds
        this.modes = {
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60
        };

        this.initializeButtons();
        this.updateDisplay();
    }

    initializeButtons() {
        document.getElementById('start').addEventListener('click', () => this.start());
        document.getElementById('pause').addEventListener('click', () => this.pause());
        document.getElementById('reset').addEventListener('click', () => this.reset());
        
        // Mode buttons
        document.getElementById('pomodoro').addEventListener('click', (e) => this.setMode('pomodoro', e));
        document.getElementById('shortBreak').addEventListener('click', (e) => this.setMode('shortBreak', e));
        document.getElementById('longBreak').addEventListener('click', (e) => this.setMode('longBreak', e));
    }

    setMode(mode, event) {
        // Remove active class from all mode buttons
        document.querySelectorAll('.mode-selector button').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        event.target.classList.add('active');
        
        this.pause();
        this.timeLeft = this.modes[mode];
        this.updateDisplay();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        document.getElementById('timer').textContent = this.formatTime(this.timeLeft);
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.pause();
                    this.playAlarm();
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        const activeMode = document.querySelector('.mode-selector button.active').id;
        this.timeLeft = this.modes[activeMode];
        this.updateDisplay();
    }

    playAlarm() {
        // You can add a custom sound here
        alert('Time is up!');
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
}); 