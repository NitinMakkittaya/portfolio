/* --- script.js --- */

// ==========================================
// 1. RAIN ANIMATION SYSTEM
// ==========================================
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rainDrops = [];

class Drop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 10 + 5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    fall() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.length;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
    }
}

// Initialize raindrops
for (let i = 0; i < 80; i++) {
    rainDrops.push(new Drop());
}

function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rainDrops.forEach(drop => {
        drop.fall();
        drop.draw();
    });
    requestAnimationFrame(animateRain);
}

animateRain();

// Handle window resizing for the rain canvas
window.addEventListener('resize', () => {
    // This ensures the canvas always matches the new layout size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Optional: Re-fill the array if the screen got much larger
    if (rainDrops.length < 80) {
        for (let i = 0; i < 20; i++) {
            rainDrops.push(new Drop());
        }
    }
});


// ==========================================
// 2. DOSSIER EFFECTS (Stamp & Red Threads)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    
    // --- Effect A: Stamp Impact Shake ---
    // Adds a class to the body to trigger a screen shake after 0.5s
    setTimeout(() => {
        document.body.classList.add('stamped-effect');
    }, 500);

    // --- Effect B: Dynamic Red Threads on Investigation Desk ---
    const svgCanvas = document.getElementById('red-threads-canvas');
    
    if (svgCanvas) {
        // Decide how many pushpins/knots you want
        const numberOfPins = 12;
        const pins = [];
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Generate random coordinates for the pins around the screen
        for (let i = 0; i < numberOfPins; i++) {
            // Keeping them slightly away from the absolute edges
            const x = Math.random() * (width - 100) + 50; 
            const y = Math.random() * (height - 100) + 50;
            pins.push({ x, y });
        }

        // 1. Draw the strings (lines) connecting the pins
        for (let i = 0; i < numberOfPins - 1; i++) {
            // Randomly skip some connections so it looks like a web, not a single polygon
            if (Math.random() > 0.2) { 
                // Connect to the next pin
                createLine(pins[i].x, pins[i].y, pins[i+1].x, pins[i+1].y);
                
                // Sometimes connect to a random pin to create criss-crossing
                if (Math.random() > 0.6) {
                    const randomPin = pins[Math.floor(Math.random() * numberOfPins)];
                    createLine(pins[i].x, pins[i].y, randomPin.x, randomPin.y);
                }
            }
        }

        // 2. Draw the pushpins/knots on top of the lines
        pins.forEach(pin => {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('cx', pin.x);
            circle.setAttribute('cy', pin.y);
            circle.setAttribute('r', 6); // Size of the pinhead
            circle.classList.add('thread-pin');
            svgCanvas.appendChild(circle);
        });

        // Helper function to draw lines in SVG
        function createLine(x1, y1, x2, y2) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.classList.add('thread-line');
            svgCanvas.appendChild(line);
        }
    }

});
// ==========================================
// 3. TERMINAL DECRYPTION EFFECT (Intro Page)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const scrambleTarget = document.getElementById('scramble-target');
    
    // Only run this script if we are on the intro page
    if (scrambleTarget) {
        const finalName = scrambleTarget.getAttribute('data-value');
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let iterations = 0;
        
  // Faster Decryption Animation
setTimeout(() => {

    const interval = setInterval(() => {

        scrambleTarget.innerText = finalName
            .split("")
            .map((letter, index) => {

                if (letter === " ") return " ";

                if (index < iterations) {
                    return finalName[index];
                }

                return characters[Math.floor(Math.random() * characters.length)];

            })
            .join("");

        if (iterations >= finalName.length) {
            clearInterval(interval);
        }

        iterations += 1.2;

    }, 12);

}, 1500);
    }
});