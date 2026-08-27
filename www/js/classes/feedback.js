export class Feedback {
    static sounds = {
        start: new Audio("sounds/start_timer.mp3"),
        tick: new Audio("sounds/tick.wav"),
        repeat: new Audio("sounds/repeat.wav"),
        intervalEnd: new Audio("sounds/end_interval.wav"),
        workoutEnd: new Audio("sounds/end_timer.mp3")
    };

    static playSound(sound) {
        const audio = this.sounds[sound];

        audio.currentTime = 0;
        audio.play();
    }

    static vibrate(style) {
        window.Capacitor?.Plugins?.Haptics?.impact({ style });
    }

    static startTimer() {
        this.playSound("start");
        this.vibrate("MEDIUM");
    }

    static tick() {
        this.playSound("tick");
    }

    static repeat() {
        this.playSound("repeat");
        this.vibrate("LIGHT");
    }

    static endInterval() {
        this.playSound("intervalEnd");
        this.vibrate("MEDIUM");
    }

    static endTimer() {
        this.playSound("workoutEnd");
        this.vibrate("HEAVY");
    }
}