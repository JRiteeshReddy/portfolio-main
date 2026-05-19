const codeLines = [
    "C:\\Windows\\system32> boot -system",
    "Initializing kernel... OK",
    "Loading drivers... OK",
    "Mounting file systems... OK",
    "Checking memory... 32768MB OK",
    "Establishing secure connection to remote server...",
    "Connection established. IP: 192.168.1.104",
    "Bypassing security protocols... [SUCCESS]",
    "Accessing mainframe database...",
    " ",
    "Executing injection script: portfolio_init.sh",
    "def compile_portfolio():",
    "    target = 'J RITEESH REDDY'",
    "    status = 'STUDENT DEVELOPER'",
    "    skills = ['Vibe Coding', 'AI', 'Full Stack']",
    "    return render(target, status, skills)",
    " ",
    "Compiling... Done.",
    "Downloading necessary assets..."
];

const codeOutput = document.getElementById("code-output");
const bootSequence = document.getElementById("boot-sequence");
const heroSection = document.getElementById("hero-section");

let currentLine = 0;

function typeCode() {
    if (currentLine < codeLines.length) {
        let p = document.createElement("div");
        codeOutput.appendChild(p);
        
        let lineText = codeLines[currentLine];
        let charIndex = 0;
        
        let typeInterval = setInterval(() => {
            p.textContent += lineText.charAt(charIndex);
            charIndex++;
            window.scrollTo(0, document.body.scrollHeight);
            
            if (charIndex >= lineText.length) {
                clearInterval(typeInterval);
                currentLine++;
                setTimeout(typeCode, Math.random() * 200 + 50);
            }
        }, Math.random() * 20 + 10);
    } else {
        startDownload();
    }
}

function startDownload() {
    let p = document.createElement("div");
    codeOutput.appendChild(p);
    
    let progress = 0;
    
    let downloadInterval = setInterval(() => {
        let bar = "[";
        let filled = Math.floor(progress / 5);
        for (let i = 0; i < 20; i++) {
            bar += (i < filled) ? "#" : ".";
        }
        bar += `] ${progress}%`;
        
        p.textContent = `Downloading: ${bar}`;
        
        progress += Math.floor(Math.random() * 15) + 1;
        
        if (progress >= 100) {
            progress = 100;
            p.textContent = `Downloading: [####################] 100% - COMPLETE`;
            clearInterval(downloadInterval);
            
            setTimeout(() => {
                let success = document.createElement("div");
                success.textContent = "\nSystem ready. Initializing interface...";
                codeOutput.appendChild(success);
                
                setTimeout(() => {
                    bootSequence.classList.add("hidden");
                    heroSection.classList.remove("hidden");
                }, 1000);
                
            }, 500);
        }
    }, 150);
}

// Start sequence
setTimeout(typeCode, 1000);

// Screen Glitch Effect
function triggerRandomGlitch() {
    const screen = document.getElementById("terminal-screen");
    
    // Only glitch if the hero section is visible
    if (!heroSection.classList.contains("hidden")) {
        screen.classList.add("glitching");
        
        setTimeout(() => {
            screen.classList.remove("glitching");
        }, Math.random() * 300 + 100); // Glitch lasts 100ms to 400ms
    }
    
    // Schedule next glitch between 3s and 10s
    setTimeout(triggerRandomGlitch, Math.random() * 7000 + 3000);
}

// Start the glitch cycle
setTimeout(triggerRandomGlitch, 5000);

