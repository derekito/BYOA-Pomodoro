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
        this.whaleSound = document.getElementById('omSound');
        this.whaleSound.addEventListener('error', (e) => {
            console.error('Error loading whale sound:', e);
        });
        this.omInterval = null;
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
        // Update both the display and browser tab title
        this.updateDisplay();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        const timeString = this.formatTime(this.timeLeft);
        // Update the timer display
        document.getElementById('timer').textContent = timeString;
        // Update the browser tab title
        document.title = `${timeString} - Cosmic Tomato`;
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
        this.stopAlarm();
        const activeMode = document.querySelector('.mode-selector button.active').id;
        this.timeLeft = this.modes[activeMode];
        this.updateDisplay();
    }

    playAlarm() {
        try {
            // Reset the audio to start
            this.whaleSound.currentTime = 0;
            // Set volume to make sure it's not muted
            this.whaleSound.volume = 1;
            // Promise-based play
            this.whaleSound.play().then(() => {
                console.log('Audio played successfully');
            }).catch(error => {
                console.error('Error playing audio:', error);
                // Fallback to alert if audio fails
                alert('Time is up!');
            });
        } catch (error) {
            console.error('Error in playAlarm:', error);
            // Fallback to alert if audio fails
            alert('Time is up!');
        }
    }

    stopAlarm() {
        this.whaleSound.pause();
        this.whaleSound.currentTime = 0;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
}); 