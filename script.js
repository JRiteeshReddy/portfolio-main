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

// Modal Data and Logic
const modalData = {
    'ABOUT': `
        <h2>ABOUT.TXT</h2>
        <p>I'm a student developer who turns ideas into working products. I build AI tools, experiment fast, and ship consistently instead of overthinking. Most of my work starts as a random idea and ends as something real people can use. I focus on learning by building, not just consuming.</p>
        <p>I'm an admin at BVA (Bangalore Vibecoders Association), a 300+ member community where builders come together to create real projects, not just consume content.</p>
    `,
    'WORK': `
        <h2>PROJECTS.EXE</h2>
        <div class="project-item">
            <h3>> PROJECT_01: AI Assistant</h3>
            <p>A smart terminal-based AI assistant built with Node.js and OpenAI API.</p>
        </div>
        <div class="project-item">
            <h3>> PROJECT_02: Community Dashboard</h3>
            <p>A web dashboard for BVA members to track projects and events.</p>
        </div>
        <div class="project-item">
            <h3>> PROJECT_03: Portfolio OS</h3>
            <p>This retro terminal-themed portfolio site built with vanilla HTML/CSS/JS.</p>
        </div>
    `,
    'SKILLS': `
        <h2>SKILLS.DAT</h2>
        <ul>
            <li>English Proficiency (Written)</li>
            <li>English Proficiency (Spoken)</li>
            <li>Event Management</li>
            <li>Digital Marketing</li>
            <li>Graphic Designing</li>
            <li>Vibe Coding</li>
            <li>Web Development</li>
            <li>Android App Development</li>
            <li>UI & UX Design</li>
        </ul>
    `,
    'CONTACT': `
        <h2>CONTACT.BAT</h2>
        <div class="social-links">
            <a href="mailto:example@email.com" target="_blank">[ EMAIL ]</a>
            <a href="https://github.com/JRiteeshReddy" target="_blank">[ GITHUB ]</a>
            <a href="https://linkedin.com/in/jriteeshreddy" target="_blank">[ LINKEDIN ]</a>
        </div>
        <form class="contact-form" action="#" method="POST">
            <p>> SEND A DIRECT MESSAGE:</p>
            <input type="text" name="name" placeholder="YOUR NAME" required>
            <input type="email" name="email" placeholder="YOUR EMAIL" required>
            <textarea name="message" rows="5" placeholder="ENTER MESSAGE..." required></textarea>
            <button type="submit">TRANSMIT_MESSAGE</button>
        </form>
    `
};

function openModal(section) {
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = \`C:\\Portfolio\\\${section}\`;
    modalBody.innerHTML = modalData[section];
    
    modalContainer.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-container').classList.add('hidden');
}

