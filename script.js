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
function updateCountdown() {
    let now = new Date();
    let closestTime = null;
    let rows = document.querySelectorAll("table tr:not(:first-child)");

    rows.forEach(row => {
        let timeText = row.cells[2]?.textContent.trim(); // Get the time column
        if (timeText) {
            let [startTime] = timeText.split(" - ");
            let classTime = new Date();
            let [hour, minute, period] = startTime.match(/\d+|\w+/g);
            hour = parseInt(hour);
            minute = parseInt(minute);
            if (period.toLowerCase() === "pm" && hour !== 12) hour += 12;

            classTime.setHours(hour, minute, 0, 0);
            if (classTime > now && (!closestTime || classTime < closestTime)) {
                closestTime = classTime;
            }
        }
    });

    if (closestTime) {
        let diff = closestTime - now;
        let hours = Math.floor(diff / 3600000);
        let minutes = Math.floor((diff % 3600000) / 60000);
        let seconds = Math.floor((diff % 60000) / 1000);
        document.getElementById("countdown").innerText = `Next class in: ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById("countdown").innerText = "No exam scheduled for you today^^";
    }
}

setInterval(updateCountdown, 1000);

function updateBackground() {
    let hours = new Date().getHours();
    let body = document.body;

    if (hours < 12) {
        body.style.background = "#fffbcc"; // Morning: Light yellow
    } else if (hours < 18) {
        body.style.background = "#cce7ff"; // Afternoon: Light blue
    } else {
        body.style.background = "#1a1a2e"; // Evening: Dark mode
        body.style.color = "white"; // Change text color for contrast
    }
}

updateBackground();

// Get all the class dates and times
const classDates = [
    { date: "April 3, 2025 10:00:00", className: "Research Capstone" },
    { date: "April 3, 2025 12:45:00", className: "Media and Information Literacy" },
    { date: "April 4, 2025 10:00:00", className: "Introduction to the Philosophy of thr Human Person" },
    { date: "April 4, 2025 11:15:00", className: "General Physics 2" },
    { date: "April 4, 2025 12:45:00", className: "Entrepreneurship" },
    { date: "April 7, 2025 10:00:00", className: "Values Education 3" },
    { date: "April 7, 2025 12:45:00", className: "Inquiries, Investigations and Immersion" },
    { date: "April 8, 2025 10:00:00", className: "Physical Education And Health 4" },
    { date: "April 8, 2025 11:15:00", className: "General Chemistry 2" }
];

// Function to get the next class date
function getNextClass() {
    const now = new Date();
    let nextClass = null;

    for (let i = 0; i < classDates.length; i++) {
        let classDate = new Date(classDates[i].date);
        if (classDate > now && (!nextClass || classDate < nextClass.date)) {
            nextClass = { 
                date: classDate, 
                name: classDates[i].className
            };
        }
    }

    return nextClass;
}

// Function to update the countdown timer
function updateCountdown() {
    const nextClass = getNextClass();

    if (nextClass) {
        const now = new Date();
        const timeDifference = nextClass.date - now;
        
        // Calculate the time remaining in days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);

        document.getElementById("countdownTimer").innerHTML = 
            `Next class: ${nextClass.name}<br>Time remaining: ${days} days, ${hours}h ${minutes}m ${seconds}s`;

        // If the countdown is finished, show a message
        if (timeDifference <= 0) {
            document.getElementById("countdownTimer").innerHTML = `Class is starting now!`;
        }
    }
}

// Set an interval to update the countdown every second
setInterval(updateCountdown, 1000);

// Run the countdown immediately on page load
updateCountdown();
