// Get audio elements
var music = document.getElementById("graduationMusic");
var soundBtn = document.getElementById("soundBtn");
var volumeSlider = document.getElementById("volumeSlider");

// Force autoplay when the page loads
window.onload = function() {
    music.play().catch(error => console.log("Autoplay blocked:", error));
};

// Toggle play/pause
soundBtn.addEventListener("click", function() {
    if (music.paused) {
        music.play();
        this.textContent = "🔇 Mute Music";
    } else {
        music.pause();
        this.textContent = "🔊 Play Music";
    }
});

// Adjust volume with slider
volumeSlider.addEventListener("input", function() {
    music.volume = this.value;
});

// Confetti Animation
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiParticles = [];

for (let i = 0; i < 100; i++) {
    confettiParticles.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height,
        r: Math.random() * 6 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speed: Math.random() * 3 + 1
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y += p.speed;
        if (p.y > confettiCanvas.height) p.y = 0;
    });
    requestAnimationFrame(drawConfetti);
}

drawConfetti();

// Function to handle "Yes" response (show the exam schedule)
function confirmSTEM() {
    document.getElementById("main-interface").style.display = "none";  // Hide the confirmation prompt
    document.getElementById("exam-section").style.display = "block";   // Show the exam schedule
}

// Function to handle "No" response (hide the exam schedule)
function denySTEM() {
    document.getElementById("main-interface").innerHTML = "<h1>Sorry, this page is only for STEM 18 - Mapanaliksik. 😅</h1>";
    // Optionally you can add a redirect or provide a message to go back
}

// Sound control functions (for background music volume control)
function toggleSound() {
    var audio = document.getElementById("backgroundMusic");
    var button = document.querySelector(".sound-btn");
    
    if (audio.paused) {
        audio.play();
        button.textContent = "🔊 Mute";
    } else {
        audio.pause();
        button.textContent = "🔇 Unmute";
    }
}

// Volume control for background music
function setVolume() {
    var volume = document.getElementById("volumeSlider").value;
    var audio = document.getElementById("backgroundMusic");
    audio.volume = volume / 100;
}

