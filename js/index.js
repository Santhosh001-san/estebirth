/**
 * THE UNSEEN FILE - Psychological Thriller Interactive Script (HTML5 Audio Version)
 */

(function () {
  // --- DOM REFERENCES ---
  const terminal = document.getElementById("intro-terminal");
  const panel = document.getElementById("classified-panel");
  const cineOverlay = document.getElementById("cinematic-overlay");
  const btnContainer = document.getElementById("button-container");
  const unlockBtn = document.getElementById("unlock-btn");
  const soundToggle = document.getElementById("sound-toggle");
  const glitchFlash = document.getElementById("glitch-flash");
  const customCursor = document.getElementById("custom-cursor");

  // --- HTML5 AUDIO CONTROLLER ---
  class ThrillerAudioSystem {
    constructor() {
      this.muted = false; // Starts unmuted by default
      this.audioInited = false;
      this.activeFadeInterval = null;

      // Define standard HTML5 Audio objects
      // Preload set to "none" prevents the browser from automatically trying to download/check
      // the files on page load, eliminating 404 network logs unless explicit play is called.
      this.bgm = this.createAudioElement("assets/audio/ambient-thriller.mp3", true, 0.15);
      this.sfxTyping = this.createAudioElement("assets/audio/typing.mp3", false, 0.12);
      this.sfxGlitch = this.createAudioElement("assets/audio/glitch.mp3", false, 0.2);
      this.sfxScan = this.createAudioElement("assets/audio/scan.mp3", true, 0.1);
      this.sfxClick = this.createAudioElement("assets/audio/click.mp3", false, 0.25);
      this.sfxAccess = this.createAudioElement("assets/audio/access-granted.mp3", false, 0.3);
    }

    createAudioElement(src, loop = false, volume = 0.5) {
      const audio = new Audio();
      audio.preload = "none"; 
      audio.src = src;
      audio.loop = loop;
      audio.volume = volume;
      return audio;
    }

    // Safely attempt audio playback, catching missing files and autoplay blocks silently
    safelyPlay(audioObj) {
      if (this.muted) return;

      // Reset playback pointer to re-trigger short SFX
      audioObj.currentTime = 0;

      const playPromise = audioObj.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fail silently! Caught 404 file missing errors or autoplay blocks
        });
      }
    }

    safelyPause(audioObj) {
      try {
        audioObj.pause();
      } catch (e) {
        // Fail silently
      }
    }

    // Volume crossfade utilizing linear steps
    fadeBGMVolume(targetVol, durationMs) {
      if (this.muted) return;
      if (this.activeFadeInterval) {
        clearInterval(this.activeFadeInterval);
      }

      const startVol = this.bgm.volume;
      const steps = 15;
      const stepTime = durationMs / steps;
      const volumeStep = (targetVol - startVol) / steps;
      let currentStep = 0;

      this.activeFadeInterval = setInterval(() => {
        currentStep++;
        const nextVol = startVol + (volumeStep * currentStep);
        this.bgm.volume = Math.max(0, Math.min(1.0, nextVol));
        
        if (currentStep >= steps) {
          clearInterval(this.activeFadeInterval);
          this.activeFadeInterval = null;
        }
      }, stepTime);
    }

    // Initialize/unlock audio on first interaction
    init() {
      if (this.audioInited) return;
      this.audioInited = true;
      
      if (!this.muted) {
        this.safelyPlay(this.bgm);
      }
    }

    toggleMute() {
      this.audioInited = true;
      
      this.muted = !this.muted;
      if (this.muted) {
        soundToggle.textContent = "🔇";
        this.safelyPause(this.bgm);
        this.safelyPause(this.sfxScan);
      } else {
        soundToggle.textContent = "🔊";
        this.bgm.volume = 0.15; // Set base soundtrack volume
        this.safelyPlay(this.bgm);
        this.safelyPlay(this.sfxClick); // Quick confirm chime feed
      }
    }

    // Mapped state transitions
    triggerState(state) {
      switch (state) {
        case "opening":
          this.bgm.volume = 0.05;
          this.safelyPlay(this.bgm);
          break;
          
        case "initializing":
          this.fadeBGMVolume(0.08, 1500);
          break;
          
        case "connected":
          this.safelyPlay(this.sfxClick);
          this.fadeBGMVolume(0.12, 1000);
          break;
          
        case "searching":
          this.fadeBGMVolume(0.18, 2000);
          break;
          
        case "found":
          this.safelyPlay(this.sfxGlitch);
          break;
          
        case "unseen_file":
          this.fadeBGMVolume(0.22, 1500);
          break;
          
        case "never_supposed":
          // Suspenseful dropout
          this.fadeBGMVolume(0.02, 600);
          break;
          
        case "one_way_forward":
          // Re-swell
          this.fadeBGMVolume(0.18, 3000);
          break;
          
        case "button_hover":
          this.fadeBGMVolume(0.24, 400);
          this.safelyPlay(this.sfxClick); // play tick on hover
          break;
          
        case "button_hover_leave":
          this.fadeBGMVolume(0.18, 400);
          break;
          
        case "button_click":
          this.fadeBGMVolume(0.01, 200);
          this.safelyPlay(this.sfxClick); // Layered thump click
          break;
          
        case "verifying":
          this.safelyPlay(this.sfxScan);
          break;
          
        case "confirmed":
          this.safelyPause(this.sfxScan);
          this.safelyPlay(this.sfxGlitch);
          break;
          
        case "granted":
          this.safelyPlay(this.sfxAccess);
          this.safelyPause(this.bgm);
          break;
      }
    }
  }

  // Instantiate audio controller
  const audioSystem = new ThrillerAudioSystem();

  // --- TYPEWRITER SYSTEM COORDINATOR ---
  let terminalLines = [
    { text: "INITIALIZING SECURE CHANNEL...", delay: 800 },
    { text: "CONNECTION ESTABLISHED.", delay: 800 },
    { text: "SEARCHING ARCHIVE...", delay: 600, loader: true },
    { text: "ARCHIVE FOUND.", delay: 1500 }
  ];

  function typewriter(text, element, speed = 40, callback = null) {
    let index = 0;
    
    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        
        // Play click tick audio
        if (index % 2 === 0) audioSystem.safelyPlay(audioSystem.sfxTyping);
        
        setTimeout(type, speed + (Math.random() * 20 - 10));
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  function runSequence() {
    let lineIdx = 0;
    audioSystem.triggerState("opening");
    
    function showNextLine() {
      if (lineIdx < terminalLines.length) {
        const line = terminalLines[lineIdx];
        
        if (lineIdx === 0) audioSystem.triggerState("initializing");
        if (lineIdx === 1) audioSystem.triggerState("connected");
        if (lineIdx === 2) audioSystem.triggerState("searching");

        const lineDiv = document.createElement("div");
        lineDiv.style.marginBottom = "8px";
        terminal.appendChild(lineDiv);
        
        lineDiv.innerHTML = "> ";
        
        const textSpan = document.createElement("span");
        lineDiv.appendChild(textSpan);
        
        typewriter(line.text, textSpan, 35, () => {
          if (line.loader) {
            const loader = document.createElement("span");
            loader.className = "terminal-loader";
            loader.innerHTML = "...";
            lineDiv.appendChild(loader);
            
            setTimeout(() => {
              loader.remove();
              lineIdx++;
              setTimeout(showNextLine, line.delay);
            }, 1200);
          } else {
            lineIdx++;
            setTimeout(showNextLine, line.delay);
          }
        });
      } else {
        triggerSystemGlitch();
      }
    }
    
    setTimeout(showNextLine, 1200);
  }

  function triggerSystemGlitch() {
    audioSystem.triggerState("found");
    glitchFlash.classList.add("flash-active");
    
    setTimeout(() => {
      glitchFlash.classList.remove("flash-active");
      
      const interruptLine = document.createElement("div");
      interruptLine.style.color = "var(--crimson-light)";
      interruptLine.style.fontWeight = "700";
      interruptLine.innerHTML = "> ACCESSING FILE: 0815";
      terminal.appendChild(interruptLine);
      
      setTimeout(() => {
        terminal.style.transition = "opacity 0.8s";
        terminal.style.opacity = "0";
        
        setTimeout(() => {
          terminal.remove();
          revealClassifiedPanel();
        }, 800);
      }, 1600);
      
    }, 250);
  }

  function revealClassifiedPanel() {
    audioSystem.triggerState("unseen_file");
    panel.classList.add("reveal");
    
    setTimeout(() => {
      panel.style.transition = "opacity 1.2s ease-in, transform 1.2s ease-in";
      panel.style.opacity = "0";
      panel.style.transform = "translate(-50%, -50%) scale(0.9)";
      
      setTimeout(() => {
        panel.remove();
        revealCinematicText();
      }, 1200);
      
    }, 4500);
  }

  function revealCinematicText() {
    const text1 = document.getElementById("cine-msg-1");
    const text2 = document.getElementById("cine-msg-2");
    const text3 = document.getElementById("cine-msg-3");
    
    setTimeout(() => {
      text1.classList.add("reveal");
      audioSystem.triggerState("never_supposed");
      
      setTimeout(() => {
        text2.classList.add("reveal");
        
        setTimeout(() => {
          text3.classList.add("reveal");
          audioSystem.triggerState("one_way_forward");
          
          setTimeout(() => {
            btnContainer.classList.add("reveal");
          }, 2000);
          
        }, 2200);
      }, 2500);
    }, 800);
  }

  // --- ABSTRACT SILHOUETTE CANVAS ---
  const canvas = document.getElementById("silhouette-canvas");
  const ctx = canvas.getContext("2d");
  
  let shadowX = window.innerWidth / 2;
  let shadowY = window.innerHeight * 0.45;
  let baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.18;
  
  let glitchOffset = 0;
  let shadowOpacity = 0.15;
  let isGlitching = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    shadowX = canvas.width / 2;
    shadowY = canvas.height * 0.43;
    baseRadius = Math.min(canvas.width, canvas.height) * 0.16;
  }
  
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function drawSilhouette() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.filter = "blur(40px)";
    
    let currentX = shadowX + glitchOffset;
    
    // shoulders
    let gradSh = ctx.createRadialGradient(
      currentX, shadowY + baseRadius * 1.5, baseRadius,
      currentX, shadowY + baseRadius * 2.0, baseRadius * 3
    );
    gradSh.addColorStop(0, `rgba(10, 0, 0, ${shadowOpacity * 1.2})`);
    gradSh.addColorStop(0.5, `rgba(0, 0, 0, ${shadowOpacity})`);
    gradSh.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = gradSh;
    ctx.beginPath();
    ctx.ellipse(currentX, shadowY + baseRadius * 1.8, baseRadius * 2.2, baseRadius * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // head
    let gradH = ctx.createRadialGradient(
      currentX, shadowY, baseRadius * 0.2,
      currentX, shadowY, baseRadius * 1.1
    );
    gradH.addColorStop(0, `rgba(15, 0, 0, ${shadowOpacity * 1.5})`);
    gradH.addColorStop(0.6, `rgba(0, 0, 0, ${shadowOpacity})`);
    gradH.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = gradH;
    ctx.beginPath();
    ctx.arc(currentX, shadowY, baseRadius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    
    if (isGlitching && Math.random() < 0.3) {
      ctx.strokeStyle = "rgba(139, 0, 0, 0.4)";
      ctx.lineWidth = Math.random() * 4 + 1;
      const staticY = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, staticY);
      ctx.lineTo(canvas.width, staticY);
      ctx.stroke();
    }
  }

  function shadowLoop() {
    if (!isGlitching && Math.random() < 0.006) {
      isGlitching = true;
      glitchOffset = Math.random() * 30 - 15;
      shadowOpacity = 0.05 + Math.random() * 0.12;
      
      if (Math.random() < 0.5) audioSystem.safelyPlay(audioSystem.sfxGlitch);
      
      setTimeout(() => {
        glitchOffset = 0;
        shadowOpacity = 0.14;
        isGlitching = false;
      }, Math.random() * 200 + 80);
    }
    
    drawSilhouette();
    requestAnimationFrame(shadowLoop);
  }

  requestAnimationFrame(shadowLoop);

  // --- BUTTON CLICK TRANSITION SEQUENCE ---
  let isTransitioning = false;

  function runTransitionSequence() {
    if (isTransitioning) return;
    isTransitioning = true;

    unlockBtn.classList.add("verifying");
    audioSystem.triggerState("button_click");
    
    unlockBtn.innerHTML = "VERIFYING...<span class='radar-ring'></span>";
    unlockBtn.disabled = true;

    setTimeout(() => {
      audioSystem.triggerState("verifying");
    }, 400);

    setTimeout(() => {
      audioSystem.triggerState("confirmed");
      unlockBtn.textContent = "IDENTITY CONFIRMED.";
      glitchFlash.classList.add("flash-active");

      setTimeout(() => {
        glitchFlash.classList.remove("flash-active");
        
        unlockBtn.style.color = "#00ff00";
        unlockBtn.style.borderColor = "#00ff00";
        unlockBtn.textContent = "ACCESS GRANTED.";
        audioSystem.triggerState("granted");

        setTimeout(() => {
          document.body.classList.add("crt-compress");
          audioSystem.safelyPlay(audioSystem.sfxGlitch);
          
          setTimeout(() => {
            window.location.href = "page2.html";
          }, 800);

        }, 1300);

      }, 1000);

    }, 2800);
  }

  // --- CUSTOM TERMINAL CURSOR ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice && customCursor) {
    customCursor.style.display = "block";
    
    window.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });

    const hoveredElements = [unlockBtn, soundToggle];
    hoveredElements.forEach(el => {
      if (!el) return;
      el.addEventListener("mouseenter", () => {
        customCursor.classList.add("hovering");
        if (el.id === "unlock-btn" && !isTransitioning) {
          audioSystem.triggerState("button_hover");
        } else {
          audioSystem.safelyPlay(audioSystem.sfxTyping);
        }
      });
      
      el.addEventListener("mouseleave", () => {
        customCursor.classList.remove("hovering");
        if (el.id === "unlock-btn" && !isTransitioning) {
          audioSystem.triggerState("button_hover_leave");
        }
      });
    });
  }

  // --- BIND EVENT TRIGGERS ---
  soundToggle.addEventListener("click", (e) => {
    // Stop propagation so the window click event doesn't fire immediately after
    e.stopPropagation();
    audioSystem.toggleMute();
  });

  unlockBtn.addEventListener("click", () => {
    runTransitionSequence();
  });
  
  // Audio initializer trap for first user interaction (click, keypress, touch)
  const unlockAudio = () => {
    audioSystem.init();
    
    // Remove listeners once unlocked
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };
  
  window.addEventListener("click", unlockAudio);
  window.addEventListener("keydown", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);

  // Viewport mode switch logic
  const viewportToggle = document.getElementById("viewport-toggle");
  if (viewportToggle) {
    const savedMode = localStorage.getItem("viewport-mode");
    if (savedMode === "mobile") {
      document.body.classList.add("simulated-mobile");
      viewportToggle.innerHTML = "🖥️ Desktop View";
    }
    
    viewportToggle.addEventListener("click", () => {
      if (document.body.classList.contains("simulated-mobile")) {
        document.body.classList.remove("simulated-mobile");
        viewportToggle.innerHTML = "📱 Mobile View";
        localStorage.setItem("viewport-mode", "desktop");
      } else {
        document.body.classList.add("simulated-mobile");
        viewportToggle.innerHTML = "🖥️ Desktop View";
        localStorage.setItem("viewport-mode", "mobile");
      }
    });

    if (!isTouchDevice && customCursor) {
      viewportToggle.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
      viewportToggle.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
    }
  }

  // Boot typewriter sequences
  runSequence();

})();
