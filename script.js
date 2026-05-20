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

// Mini Terminal Popup Logic
const aboutContent = `I'm a student developer who turns ideas into working products. I build AI tools, experiment fast, and ship consistently instead of overthinking. Most of my work starts as a random idea and ends as something real people can use. I focus on learning by building, not just consuming.

I'm an admin at BVA (Bangalore Vibecoders Association), a 300+ member community where builders come together to create real projects, not just consume content.

I turn ideas into reality. Repeatedly.`;

const activityContent = `BEYOND THE SCREEN - ACTIVITIES:

1. EVENT VOLUNTEER
Volunteered in multiple events including Codeavour 7.0, Comic Con (x2), and several university events — handling on-ground coordination and attendee experience.

2. STUDENT LIFE ASSOCIATE
Organized university-level events on multiple occasions and mentored multiple clubs assigned to me, bridging student leadership and institutional goals.

3. FORMER HOD — GAMING AFFINITY
Served as Head of Department for the Gaming Affinity vertical at Viral Fission (Virtual), leading the gaming community and content direction.

4. VICE PRESIDENT — ANIME & MANGA CLUB
Led marketing, event planning, and recruitment strategies. Organized Anime Day, Student Induction Program (SIP), and stall events — gaining 100+ followers and 30+ recruitments.

5. DESIGN LEAD — MULTIPLE CLUBS
Led design and marketing efforts across clubs. Created posters, promotional materials, and social media content for various events and campaigns.`;

let projectsContent = `PROJECTS REGISTRY:

1. AI AGENT SHELL
A customized terminal interface powered by LLMs for automated task execution and workspace management.

2. BVA CLUB PLATFORM
Portal developed for Bangalore Vibecoders Association enabling real-time member collaboration and showcase of club activities.

3. MONOCHROME ENGINE
A lightweight, pixel-perfect 2D rendering canvas engine with retro visual filters (CRT scanlines, chromatic aberration).`;

async function loadContentfulProjects() {
    try {
        const spaceId = "ajk4pzy1lq44";
        const accessToken = "zgIVfVbr1RQcO5e1EY-M1P5R7hS1PedKMnoa7xAdUhs";
        const res = await fetch(`https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=portfolio`);
        if (!res.ok) throw new Error("Database fetch failed");
        const data = await res.json();
        
        let formatted = "PROJECTS REGISTRY:\n\n";
        let index = 1;
        
        // Sort items or use the order returned
        const entries = data.items.filter(item => item.sys.type === 'Entry');
        
        entries.forEach(entry => {
            if (entry.fields && entry.fields.title) {
                const title = entry.fields.title;
                const desc = entry.fields.description || "No description available.";
                let projectUrl = entry.fields.projectUrl;
                
                // Drawing Offline (Magic Trick), and RNG Offline (Magic Trick) do not have any project url
                if (title.includes("Drawing Offline") || title.includes("RNG Offline")) {
                    projectUrl = "Magicians Exclusive Utility";
                }
                
                formatted += `${index}. ${title.toUpperCase()}\n`;
                formatted += `${desc}\n`;
                if (projectUrl) {
                    formatted += `URL: ${projectUrl}\n\n`;
                } else {
                    formatted += `URL: N/A\n\n`;
                }
                index++;
            }
        });
        
        projectsContent = formatted.trim();
    } catch (err) {
        console.error("Contentful load error:", err);
    }
}

// Call on startup
loadContentfulProjects();

const skillsContent = `SKILLS & TOOLS:

* English Proficiency (Written)
* Event Management
* Digital Marketing
* Graphic Designing
* Vibe Coding
* Web Development (HTML, CSS, JS, React)
* Android App Development
* UI & UX Design`;

const contactContent = `CONTACT DETAILS:

Name: J Riteesh Reddy
Title: Student Developer
GitHub: https://github.com/JRiteeshReddy
Email: jriteeshreddy@gmail.com
Status: Open for opportunities & collaborations.

---
YOU CAN TRANSMIT A MESSAGE DIRECTLY THROUGH THIS TERMINAL GUESTBOOK.
PLEASE COMPLY WITH THE FOLLOWING HANDSHAKE PROMPTS:`;

const popupContainer = document.getElementById("popup-container");
let zIndexCounter = 100;
const activePopups = {};

let draggedPopup = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let ghostWindow = null;

function linkifyPopup(element) {
    const text = element.textContent;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    element.innerHTML = text.replace(urlRegex, (url) => {
        let cleanUrl = url.replace(/[.,;)]$/, '');
        return `<a href="${cleanUrl}" target="_blank" class="terminal-link">${cleanUrl}</a>`;
    });
}

function appendContactForm(container) {
    const formDiv = document.createElement("div");
    formDiv.classList.add("terminal-form-container");
    formDiv.innerHTML = `
        <div class="terminal-form">
            <div class="terminal-history"></div>
            <div class="terminal-active-line">
                <span class="terminal-prompt-label">NAME: &gt; </span>
                <div class="terminal-input-wrapper">
                    <span class="terminal-input-mirror"></span>
                    <span class="blinking-cursor"></span>
                    <input type="text" class="terminal-hidden-input" autocomplete="off" spellcheck="false" />
                </div>
            </div>
        </div>
    `;
    container.appendChild(formDiv);

    const historyContainer = formDiv.querySelector(".terminal-history");
    const activeLine = formDiv.querySelector(".terminal-active-line");
    const promptLabel = formDiv.querySelector(".terminal-prompt-label");
    const inputMirror = formDiv.querySelector(".terminal-input-mirror");
    const hiddenInput = formDiv.querySelector(".terminal-hidden-input");

    // Auto-focus input on popup complete
    setTimeout(() => hiddenInput.focus(), 150);

    // Clicking anywhere in the container focuses the input (for keyboard display on mobile too)
    container.addEventListener("click", () => {
        hiddenInput.focus();
    });

    const steps = [
        { key: "name", label: "NAME: &gt; " },
        { key: "email", label: "EMAIL: &gt; " },
        { key: "message", label: "MESSAGE: &gt; " }
    ];
    let currentStep = 0;
    const data = { name: "", email: "", message: "" };
    
    // Track active transmission timeouts to allow cancellation/editing
    let transmissionTimeouts = {
        ids: [],
        isAborted: false
    };

    hiddenInput.addEventListener("input", () => {
        inputMirror.textContent = hiddenInput.value;
    });

    hiddenInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = hiddenInput.value.trim();
            if (!value) return;

            // Email validation
            if (currentStep === 1) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    let errLine = historyContainer.querySelector(".terminal-validation-error");
                    if (!errLine) {
                        errLine = document.createElement("div");
                        errLine.classList.add("terminal-history-line", "terminal-error-line", "terminal-validation-error");
                        errLine.textContent = ">>> WARNING: INVALID EMAIL PROTOCOL. RE-ENTER EMAIL. <<<";
                        historyContainer.appendChild(errLine);
                    }
                    hiddenInput.value = "";
                    inputMirror.textContent = "";
                    container.scrollTop = container.scrollHeight;
                    return;
                } else {
                    const errLine = historyContainer.querySelector(".terminal-validation-error");
                    if (errLine) {
                        historyContainer.removeChild(errLine);
                    }
                }
            }

            // Save key responses
            const step = steps[currentStep];
            data[step.key] = value;

            // Print step to static history with data-step-index attribute
            const historyLine = document.createElement("div");
            historyLine.classList.add("terminal-history-line", "interactive-history");
            historyLine.setAttribute("data-step-index", currentStep);
            historyLine.innerHTML = `<span class="terminal-prompt-label">${step.key.toUpperCase()}:</span> ${value}`;
            
            // Allow clicking to edit/rewind to this step
            const stepIndex = currentStep;
            historyLine.addEventListener("click", () => {
                // Abort any running transmission
                transmissionTimeouts.isAborted = true;
                transmissionTimeouts.ids.forEach(clearTimeout);
                transmissionTimeouts.ids = [];

                // Remove all lines from this step index onwards
                const lines = historyContainer.querySelectorAll(".terminal-history-line");
                lines.forEach(line => {
                    const idxAttr = line.getAttribute("data-step-index");
                    if (idxAttr === null) {
                        // Status logs or validation warnings
                        historyContainer.removeChild(line);
                    } else {
                        const idx = parseInt(idxAttr);
                        if (idx >= stepIndex) {
                            historyContainer.removeChild(line);
                        }
                    }
                });

                // Reset step & populate input
                currentStep = stepIndex;
                hiddenInput.value = data[steps[stepIndex].key];
                inputMirror.textContent = hiddenInput.value;
                promptLabel.innerHTML = steps[stepIndex].label;

                // Re-enable form inputs
                activeLine.style.display = "flex";
                hiddenInput.disabled = false;
                hiddenInput.focus();

                container.scrollTop = container.scrollHeight;
            });

            historyContainer.appendChild(historyLine);

            currentStep++;

            if (currentStep < steps.length) {
                promptLabel.innerHTML = steps[currentStep].label;
                hiddenInput.value = data[steps[currentStep].key] || "";
                inputMirror.textContent = hiddenInput.value;
            } else {
                hiddenInput.value = "";
                inputMirror.textContent = "";
                activeLine.style.display = "none";
                hiddenInput.disabled = true;
                transmissionTimeouts.isAborted = false;
                await submitTerminalForm(historyContainer, data, container, transmissionTimeouts);
            }
            container.scrollTop = container.scrollHeight;
        }
    });
}

async function submitTerminalForm(historyContainer, data, container, transmissionTimeouts) {
    const printLine = (text, delay = 0, styleClass = "") => {
        return new Promise(resolve => {
            const timeoutId = setTimeout(() => {
                const line = document.createElement("div");
                line.classList.add("terminal-history-line");
                if (styleClass) line.classList.add(styleClass);
                line.textContent = text;
                historyContainer.appendChild(line);
                container.scrollTop = container.scrollHeight;
                resolve();
            }, delay);
            transmissionTimeouts.ids.push(timeoutId);
        });
    };

    if (transmissionTimeouts.isAborted) return;
    await printLine("CONNECTING TO PORTFOLIO GUESTBOOK SECURE UPLINK...", 200);
    if (transmissionTimeouts.isAborted) return;
    await printLine("UPLINK ESTABLISHED. HANDSHAKE PROTOCOL: SECURE.", 800);
    if (transmissionTimeouts.isAborted) return;
    await printLine(`TRANSMITTING PAYLOAD FROM CLIENT: ${data.name.toUpperCase()}...`, 500);

    // Start network request to Formspree
    let responseOk = false;
    try {
        const response = await fetch("https://formspree.io/f/mnjraenn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message
            })
        });
        responseOk = response.ok;
        const resData = await response.json();
        console.log("Formspree connection attempt completed. Status:", response.status, "Data:", resData);
    } catch (err) {
        console.error("Formspree submission error details:", err);
        responseOk = false;
    }

    if (transmissionTimeouts.isAborted) return;

    if (responseOk) {
        await printLine("UPLOADING PACKETS: [====================] 100%", 500);
        if (transmissionTimeouts.isAborted) return;
        await printLine(">>> SECURE TRANSACTION: GUESTBOOK WRITE SUCCESSFUL! <<<", 500, "terminal-success-box");
        if (transmissionTimeouts.isAborted) return;
        await printLine("GUESTBOOK SESSION CLOSED. DISCONNECTING CLIENT...", 600);
    } else {
        await printLine(">>> TRANSMISSION FAILURE: PROTOCOL OVERFLOW OR SERVER OFFLINE. <<<", 500, "terminal-error-line");
        if (transmissionTimeouts.isAborted) return;
        await printLine("UPLINK DISCONNECTED. PRESS ANY KEY OR CLICK A LOG TO CORRECT.", 600);
        
        // Re-enable the form at the MESSAGE step so they can try again
        const activeLine = container.querySelector(".terminal-active-line");
        const hiddenInput = container.querySelector(".terminal-hidden-input");
        const promptLabel = container.querySelector(".terminal-prompt-label");
        const inputMirror = container.querySelector(".terminal-input-mirror");
        
        if (activeLine && hiddenInput) {
            activeLine.style.display = "flex";
            hiddenInput.disabled = false;
            hiddenInput.value = data.message;
            inputMirror.textContent = data.message;
            promptLabel.innerHTML = "MESSAGE: &gt; ";
            hiddenInput.focus();
        }
    }
}

function openPopup(title, content, width = "600px") {
    // If popup already exists, bring it to the front
    if (activePopups[title]) {
        const popup = activePopups[title];
        zIndexCounter++;
        popup.style.zIndex = zIndexCounter;
        return;
    }

    // Create a new popup window element
    const popup = document.createElement("div");
    popup.classList.add("popup-window");
    popup.style.width = width;
    zIndexCounter++;
    popup.style.zIndex = zIndexCounter;

    // Cascade positioning slightly to avoid overlapping perfectly
    const offset = Object.keys(activePopups).length * 25;
    popup.style.left = `calc(15% + ${offset}px)`;
    popup.style.top = `calc(15% + ${offset}px)`;

    popup.innerHTML = `
        <div class="popup-header">
            <span class="popup-title">${title}</span>
            <button class="close-popup">[X]</button>
        </div>
        <div class="popup-content">
            <div class="popup-text"></div>
            <span class="blinking-cursor"></span>
        </div>
    `;

    popupContainer.appendChild(popup);
    activePopups[title] = popup;

    const popupText = popup.querySelector(".popup-text");
    const closeBtn = popup.querySelector(".close-popup");
    const header = popup.querySelector(".popup-header");
    const popupContentEl = popup.querySelector(".popup-content");

    // Choppy, snapped, pixelated scrolling
    popupContentEl.addEventListener("wheel", (e) => {
        e.preventDefault();
        const step = 32; // Snape scroll increment
        const direction = e.deltaY > 0 ? 1 : -1;
        popupContentEl.scrollTop = Math.round((popupContentEl.scrollTop + direction * step) / step) * step;
    }, { passive: false });

    // Dynamic fast typing effect
    let charIndex = 0;
    let typeInterval = setInterval(() => {
        popupText.textContent += content.charAt(charIndex);
        charIndex++;
        if (charIndex >= content.length) {
            clearInterval(typeInterval);
            linkifyPopup(popupText);
            const mainCursor = popup.querySelector(".popup-content > .blinking-cursor");
            if (mainCursor) mainCursor.style.display = "none";
            if (title === "CONTACT.EXE") {
                appendContactForm(popupContentEl);
            }
        }
    }, 10);

    // Bring popup to front on click/interaction
    popup.addEventListener("mousedown", () => {
        zIndexCounter++;
        popup.style.zIndex = zIndexCounter;
    });

    // Close popup handler
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering window selection/mousedown
        clearInterval(typeInterval);
        popupContainer.removeChild(popup);
        delete activePopups[title];
    });

    // Header drag handler
    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        draggedPopup = popup;
        
        // Also bring it to front
        zIndexCounter++;
        popup.style.zIndex = zIndexCounter;

        const rect = popup.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;

        // Prevent text selection globally while dragging
        document.body.style.userSelect = "none";

        // Create ghost outline
        ghostWindow = document.createElement("div");
        ghostWindow.classList.add("ghost-window");
        ghostWindow.style.width = rect.width + "px";
        ghostWindow.style.height = rect.height + "px";
        ghostWindow.style.left = rect.left + "px";
        ghostWindow.style.top = rect.top + "px";
        // Ghost window is always on top of the dragged window
        ghostWindow.style.zIndex = zIndexCounter + 1;
        document.body.appendChild(ghostWindow);
    });
}

document.getElementById("folder-about").addEventListener("click", () => openPopup("ABOUT.EXE", aboutContent, "560px"));
document.getElementById("folder-projects").addEventListener("click", () => openPopup("PROJECTS.EXE", projectsContent, "640px"));
document.getElementById("folder-activity").addEventListener("click", () => openPopup("ACTIVITY.EXE", activityContent, "680px"));
document.getElementById("folder-skills").addEventListener("click", () => openPopup("SKILLS.EXE", skillsContent, "460px"));
document.getElementById("folder-contact").addEventListener("click", () => openPopup("CONTACT.EXE", contactContent, "560px"));

// Global Document listeners for dragging ghost outline
document.addEventListener("mousemove", (e) => {
    if (isDragging && ghostWindow) {
        let newX = e.clientX - dragOffsetX;
        let newY = e.clientY - dragOffsetY;

        // Snappy grid step positioning
        const gridSize = 15;
        newX = Math.floor(newX / gridSize) * gridSize;
        newY = Math.floor(newY / gridSize) * gridSize;

        ghostWindow.style.left = newX + "px";
        ghostWindow.style.top = newY + "px";
    }
});

document.addEventListener("mouseup", () => {
    if (isDragging && ghostWindow && draggedPopup) {
        draggedPopup.style.left = ghostWindow.style.left;
        draggedPopup.style.top = ghostWindow.style.top;

        document.body.removeChild(ghostWindow);
        ghostWindow = null;
    }
    isDragging = false;
    draggedPopup = null;
    document.body.style.userSelect = "";
});
