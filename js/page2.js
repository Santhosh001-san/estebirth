/**
 * THE FIRST TRACE - Chapter II Interactive Logic
 */

(function () {
  // --- DOM REFERENCES ---
  const openingOverlay = document.getElementById("opening-overlay");
  const openingCase = document.getElementById("opening-case");
  const openingTitle = document.getElementById("opening-title");
  const openingSub = document.getElementById("opening-sub");

  const interfaceConsole = document.getElementById("investigation-interface");
  const completionOverlay = document.getElementById("completion-overlay");
  
  // Cards & Modals
  const cardImage = document.getElementById("card-image");
  const cardRecord = document.getElementById("card-record");
  const cardSignal = document.getElementById("card-signal");

  const overlayImage = document.getElementById("overlay-image");
  const overlayRecord = document.getElementById("overlay-record");
  const overlaySignal = document.getElementById("overlay-signal");

  const closeImage = document.getElementById("close-image");
  const closeRecord = document.getElementById("close-record");
  const closeSignal = document.getElementById("close-signal");

  const logsImage = document.getElementById("logs-image");
  const logsRecord = document.getElementById("logs-record");
  const logsSignal = document.getElementById("logs-signal");

  // Canvas
  const waveformCanvas = document.getElementById("waveform-canvas");
  const waveCtx = waveformCanvas ? waveformCanvas.getContext("2d") : null;

  // Completion Reveal lines
  const revealLine1 = document.getElementById("reveal-msg-1");
  const revealLine2 = document.getElementById("reveal-msg-2");
  const subjectBox = document.getElementById("reveal-subject-box");
  const subjectName = document.getElementById("subject-name");
  const revealLine3 = document.getElementById("reveal-msg-3");
  const revealLine4 = document.getElementById("reveal-msg-4");
  const followBtnContainer = document.getElementById("follow-btn-container");
  const followBtn = document.getElementById("follow-trace-btn");

  const customCursor = document.getElementById("custom-cursor");
  const glitchFlash = document.getElementById("glitch-flash");

  // --- STATE TRACKERS ---
  const investigated = {
    image: false,
    record: false,
    signal: false
  };

  let signalCanvasActive = false;
  let waveAnimationFrameId = null;
  let signalPhase = 0;

  // --- TYPEWRITER SEQUENCER ---
  function typewriteText(text, element, speed = 50, callback = null) {
    let index = 0;
    element.innerHTML = "";
    
    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, speed + (Math.random() * 20 - 10));
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  // --- 1. PAGE OPENING SEQUENCE ---
  function runOpeningSequence() {
    // Stage 1: Case File #02 fades in
    setTimeout(() => {
      openingCase.style.opacity = "1";
      
      // Stage 2: The First Trace fades in
      setTimeout(() => {
        openingTitle.style.opacity = "1";
        
        // Stage 3: Typewrite "Something was left behind."
        setTimeout(() => {
          openingSub.style.opacity = "1";
          typewriteText("Something was left behind.", openingSub, 60, () => {
            
            // Stage 4: Fade overlay and reveal Grid console
            setTimeout(() => {
              openingOverlay.style.opacity = "0";
              
              setTimeout(() => {
                openingOverlay.remove();
                interfaceConsole.classList.add("reveal");
              }, 1500);

            }, 1800);

          });
        }, 1200);

      }, 1500);

    }, 600);
  }

  // --- 2. CLUE MODAL TRIGGERS ---
  
  // Generic typewriter drawer for overlays logs
  function drawOverlayLogs(element, logLines, speed = 25) {
    let lineIdx = 0;
    element.innerHTML = "";

    function printNextLine() {
      if (lineIdx < logLines.length) {
        const row = document.createElement("div");
        element.appendChild(row);
        typewriteText(logLines[lineIdx], row, speed, () => {
          lineIdx++;
          setTimeout(printNextLine, 250);
        });
      }
    }
    printNextLine();
  }

  // Open Modal Helper
  function openOverlay(overlayElement, logElement, logsArray, onOpenCallback = null) {
    overlayElement.classList.add("open");
    drawOverlayLogs(logElement, logsArray);
    if (onOpenCallback) onOpenCallback();
  }

  // Close Modal Helper
  function closeOverlay(overlayElement, typeKey, statusElementId, cardElement) {
    overlayElement.classList.remove("open");
    
    // Set state
    investigated[typeKey] = true;
    
    // Update card styling
    cardElement.classList.add("found");
    const statusText = document.getElementById(statusElementId);
    if (statusText) {
      statusText.textContent = "TRACE: RECOVERED";
    }

    // Stop canvas render loop if signal overlay closed
    if (typeKey === "signal") {
      signalCanvasActive = false;
      if (waveAnimationFrameId) {
        cancelAnimationFrame(waveAnimationFrameId);
      }
    }

    // Check if investigation is complete
    setTimeout(checkInvestigationCompletion, 600);
  }

  // Bind Open/Close Events
  cardImage.addEventListener("click", () => {
    openOverlay(overlayImage, logsImage, [
      "> SCANNING SEGMENT ARCHIVE...",
      "> DECRYPTION ERROR: NOISE THRESHOLD HIGH",
      "> EXTRAPOLATING MEMORY CLUE..."
    ]);
  });
  closeImage.addEventListener("click", () => {
    closeOverlay(overlayImage, "image", "status-image", cardImage);
  });

  cardRecord.addEventListener("click", () => {
    openOverlay(overlayRecord, logsRecord, [
      "> READING METADATA PACKETS...",
      "> SIGNATURE CONFIRMED: SUBJECT RESIDENCE LOCATED",
      "> INTEL SECURED: A memory exists here."
    ]);
  });
  closeRecord.addEventListener("click", () => {
    closeOverlay(overlayRecord, "record", "status-record", cardRecord);
  });

  cardSignal.addEventListener("click", () => {
    openOverlay(overlaySignal, logsSignal, [
      "> CAPTURING ANALOG INTERFERENCE...",
      "> FREQUENCY LOCKED ON TARGET DISTORTION",
      "> CALIBRATING WAVE MATCH..."
    ], () => {
      // Start wave canvas rendering
      signalCanvasActive = true;
      resizeSignalCanvas();
      drawWaveform();
    });
  });
  closeSignal.addEventListener("click", () => {
    closeOverlay(overlaySignal, "signal", "status-signal", cardSignal);
  });

  // --- 3. WAVEFORM OSCILLOSCOPE DRAW loop ---
  function resizeSignalCanvas() {
    if (!waveformCanvas) return;
    const parent = waveformCanvas.parentElement;
    waveformCanvas.width = parent.clientWidth;
    waveformCanvas.height = parent.clientHeight;
  }
  
  window.addEventListener("resize", () => {
    if (signalCanvasActive) resizeSignalCanvas();
  });

  function drawWaveform() {
    if (!signalCanvasActive || !waveCtx || !waveformCanvas) return;

    waveCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
    
    // Draw background grid lines
    waveCtx.strokeStyle = "rgba(139, 0, 0, 0.08)";
    waveCtx.lineWidth = 1;
    const gridSpacing = 20;
    
    for (let x = 0; x < waveformCanvas.width; x += gridSpacing) {
      waveCtx.beginPath();
      waveCtx.moveTo(x, 0);
      waveCtx.lineTo(x, waveformCanvas.height);
      waveCtx.stroke();
    }
    for (let y = 0; y < waveformCanvas.height; y += gridSpacing) {
      waveCtx.beginPath();
      waveCtx.moveTo(0, y);
      waveCtx.lineTo(waveformCanvas.width, y);
      waveCtx.stroke();
    }

    // Draw sinus wave
    waveCtx.strokeStyle = "rgba(255, 42, 42, 0.75)";
    waveCtx.shadowColor = "rgba(255, 42, 42, 0.5)";
    waveCtx.shadowBlur = 8;
    waveCtx.lineWidth = 2.5;
    waveCtx.beginPath();

    const midY = waveformCanvas.height / 2;
    const width = waveformCanvas.width;

    for (let x = 0; x < width; x++) {
      // Harmonic sine equations with random jitter simulating noisy scanner signals
      const angle = (x / width) * Math.PI * 4.5 + signalPhase;
      const amplitude = Math.sin(signalPhase * 0.5) * 35 * Math.sin(x / width * Math.PI);
      const noise = (Math.random() - 0.5) * 3; // Jitter static
      
      const y = midY + Math.sin(angle) * amplitude + noise;

      if (x === 0) {
        waveCtx.moveTo(x, y);
      } else {
        waveCtx.lineTo(x, y);
      }
    }
    
    waveCtx.stroke();
    waveCtx.shadowBlur = 0; // reset blur

    // Increment wave movement phase speed
    signalPhase += 0.06;

    waveAnimationFrameId = requestAnimationFrame(drawWaveform);
  }

  // --- 4. INVESTIGATION DISCOVERY COMPLETION ---
  function checkInvestigationCompletion() {
    // Check if all 3 parts are recovered
    if (investigated.image && investigated.record && investigated.signal) {
      triggerCompletionRevealer();
    }
  }

  function triggerCompletionRevealer() {
    // Briefly flash screen glitch static
    glitchFlash.classList.add("flash-active");
    
    setTimeout(() => {
      glitchFlash.classList.remove("flash-active");
      
      // Dim investigation grid layout and show completion panel overlay
      interfaceConsole.style.transition = "opacity 1.2s";
      interfaceConsole.style.opacity = "0";
      
      setTimeout(() => {
        interfaceConsole.remove();
        completionOverlay.classList.add("reveal");
        runCompletionRevealSequence();
      }, 1200);

    }, 200);
  }

  function runCompletionRevealSequence() {
    // Msg 1: ALL TRACES RECOVERED.
    setTimeout(() => {
      revealLine1.classList.add("reveal-active");
      
      // Msg 2: IDENTITY DATA: PARTIALLY RECOVERED
      setTimeout(() => {
        revealLine2.classList.add("reveal-active");
        
        // Subject Box & Glitched Name
        setTimeout(() => {
          subjectBox.classList.add("reveal-active");
          startNameDecryptGlitch();
          
          // Msg 3: YOU KNOW THIS PERSON.
          setTimeout(() => {
            revealLine3.classList.add("reveal-active");
            
            // Msg 4: DON'T YOU?
            setTimeout(() => {
              revealLine4.classList.add("reveal-active");
              
              // Button reveal
              setTimeout(() => {
                followBtnContainer.classList.add("reveal-active");
              }, 1500);

            }, 1800);
          }, 2400);
        }, 1500);
      }, 1600);
    }, 600);
  }

  function startNameDecryptGlitch() {
    // Subject clue decryption: "ESTHER RANI" (11 chars)
    // We glitch the name box, replacing blocks with real letters periodically
    // End value: E██████ R███
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ𝗫𝗫";
    const targetName = "E██████ R███";
    let iterations = 0;
    
    const glitchInterval = setInterval(() => {
      let currentVal = "";
      for (let i = 0; i < targetName.length; i++) {
        if (targetName.charAt(i) === " ") {
          currentVal += " ";
        } else if (iterations > 12 && i === 0) {
          currentVal += "E";
        } else if (iterations > 12 && i === 8) {
          currentVal += "R";
        } else {
          // Scramble characters
          currentVal += letters.charAt(Math.floor(Math.random() * letters.length));
        }
      }
      
      subjectName.textContent = currentVal;
      iterations++;
      
      if (iterations >= 20) {
        clearInterval(glitchInterval);
        subjectName.textContent = targetName;
        subjectName.classList.add("reveal-text"); // styling colors
      }
    }, 85);
  }

  // --- 5. FOLLOW TRACE BUTTON REDIRECT ---
  let isNavigating = false;

  followBtn.addEventListener("click", () => {
    if (isNavigating) return;
    isNavigating = true;

    // Trigger visual CRT compress screen shutoff transition
    document.body.classList.add("crt-compress");
    
    setTimeout(() => {
      // Redirect same-tab relatively to page3.html
      window.location.href = "page3.html";
    }, 800);
  });

  // --- 6. CUSTOM INTERACTIVE CURSOR ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice && customCursor) {
    customCursor.style.display = "block";
    
    window.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });

    // Elements scaling hooks
    const interactiveElements = [
      cardImage, cardRecord, cardSignal,
      closeImage, closeRecord, closeSignal,
      followBtn
    ];

    interactiveElements.forEach(el => {
      if (!el) return;
      el.addEventListener("mouseenter", () => {
        customCursor.classList.add("hovering");
      });
      el.addEventListener("mouseleave", () => {
        customCursor.classList.remove("hovering");
      });
    });
  }

  // --- 7. BACK BUTTON NAVIGATION ---
  const backBtn = document.getElementById("btn-back");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      backBtn.classList.add("pressed");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 150);
    });
    if (!isTouchDevice && customCursor) {
      backBtn.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
      backBtn.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
    }
  }

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

  // Boot
  runOpeningSequence();

})();
