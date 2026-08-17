/**
 * THE FINAL TRACE - Chapter III Climax Logic
 */

(function () {
  // --- DOM REFERENCES ---
  const openingDiag = document.getElementById("opening-diagnostics");
  const diagLine1 = document.getElementById("diag-line-1");
  const diagLine2 = document.getElementById("diag-line-2");
  const diagLine3 = document.getElementById("diag-line-3");
  const diagLine4 = document.getElementById("diag-line-4");

  const mainConsole = document.getElementById("main-console");
  const encryptionModule = document.getElementById("encryption-module");
  const fileInfo = document.getElementById("file-info");
  
  const accessBtnWrap = document.getElementById("access-btn-wrap");
  const accessBtn = document.getElementById("access-memory-btn");
  
  const decryptionWrap = document.getElementById("decryption-wrapper");
  const decryptionLogs = document.getElementById("decryption-logs");
  const progressBarFill = document.getElementById("progress-bar-fill");

  const memoryExhibit = document.getElementById("memory-exhibit");
  const exhibitImg = document.getElementById("exhibit-img");
  const exhibitLogsText = document.getElementById("exhibit-logs-text");

  const suspenseOverlay = document.getElementById("suspense-overlay");
  const suspenseLine1 = document.getElementById("suspense-line-1");
  const suspenseLine2 = document.getElementById("suspense-line-2");
  const suspenseLine3 = document.getElementById("suspense-line-3");
  const suspenseLine4 = document.getElementById("suspense-line-4");
  
  const finalFileBox = document.getElementById("final-file-box");
  const openFinalBtn = document.getElementById("open-final-file-btn");

  const glitchFlash = document.getElementById("glitch-flash");
  const customCursor = document.getElementById("custom-cursor");

  // --- TYPEWRITER SYSTEM COORDINATOR ---
  function typewriteText(text, element, speed = 40, callback = null) {
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

  // --- 1. OPENING DIAGNOSTICS SEQUENCE ---
  function runDiagnosticsSequence() {
    // Line 1: FINAL CONNECTION ESTABLISHED.
    setTimeout(() => {
      diagLine1.style.opacity = "1";
      
      setTimeout(() => {
        diagLine1.style.opacity = "0";
        diagLine1.style.transform = "translateY(-10px)";
        
        // Line 2: FINAL TRACE DETECTED.
        setTimeout(() => {
          diagLine2.style.opacity = "1";
          
          setTimeout(() => {
            diagLine2.style.opacity = "0";
            diagLine2.style.transform = "translateY(-10px)";
            
            // Line 3: MEMORY RECORD: FOUND
            setTimeout(() => {
              diagLine3.style.opacity = "1";
              
              setTimeout(() => {
                diagLine3.style.opacity = "0";
                diagLine3.style.transform = "translateY(-10px)";
                
                // Line 4: ANALYZING FINAL TRACE...
                setTimeout(() => {
                  diagLine4.style.opacity = "1";
                  typewriteText("ANALYZING FINAL TRACE...", diagLine4, 45, () => {
                    
                    // Fade diagnostic and open console
                    setTimeout(() => {
                      openingDiag.style.opacity = "0";
                      
                      setTimeout(() => {
                        openingDiag.remove();
                        mainConsole.classList.add("reveal");
                      }, 1500);

                    }, 1200);

                  });
                }, 600);

              }, 1800);
            }, 600);

          }, 1800);
        }, 600);

      }, 1800);
    }, 600);
  }

  // --- 2. DECRYPTION PROGRESS LOADER ---
  let isDecrypting = false;

  accessBtn.addEventListener("click", () => {
    if (isDecrypting) return;
    isDecrypting = true;

    // Phase 1: Hide buttons/metadata fields
    accessBtnWrap.style.opacity = "0";
    fileInfo.style.opacity = "0";
    
    setTimeout(() => {
      accessBtnWrap.remove();
      fileInfo.remove();
      
      // Reveal loader
      decryptionWrap.classList.add("reveal");
      runDecryptionProcess();
    }, 500);
  });

  function runDecryptionProcess() {
    const logs = [
      "> ACCESS REQUESTED... AUTHORIZED.",
      "> CALIBRATING DECRYPTION PROTOCOL [AES-256]...",
      "> INJECTING QUANTUM MEMORY CHANNELS...",
      "> BYPASSING SECURITY LOCKS...",
      "> MEMORY DECRYPT COMPLETED."
    ];

    let currentLogIdx = 0;
    let progress = 0;
    
    // Type logs sequentially and increase progress bar fill
    function typeNextLog() {
      if (currentLogIdx < logs.length) {
        const row = document.createElement("div");
        decryptionLogs.appendChild(row);
        
        typewriteText(logs[currentLogIdx], row, 25, () => {
          currentLogIdx++;
          // Trigger progress jumps corresponding to logs
          targetProgressValue(currentLogIdx * 20);
        });
      }
    }

    function targetProgressValue(target) {
      const interval = setInterval(() => {
        if (progress < target) {
          progress += 2;
          progressBarFill.style.width = `${progress}%`;
        } else {
          clearInterval(interval);
          if (progress < 100) {
            setTimeout(typeNextLog, 400);
          } else {
            // Decrypted! Reveal exhibit
            setTimeout(revealMemoryExhibit, 800);
          }
        }
      }, 30);
    }

    // Start logs cycle
    typeNextLog();
  }

  // --- 3. EXHIBIT BLUR FADE REVEAL ---
  function revealMemoryExhibit() {
    // Screen glitch blink
    glitchFlash.classList.add("flash-active");
    
    setTimeout(() => {
      glitchFlash.classList.remove("flash-active");
      
      // Hide loader and show image card
      decryptionWrap.style.transition = "opacity 0.6s";
      decryptionWrap.style.opacity = "0";
      
      setTimeout(() => {
        decryptionWrap.remove();
        memoryExhibit.classList.add("reveal");
        
        // Step 1: Slow blur-to-focus fade (remove grayscale/blur)
        setTimeout(() => {
          exhibitImg.classList.add("focused");
          
          // Step 2: Print typewriter status summary below the image
          setTimeout(() => {
            typewriteText("MEMORY RECOVERED. STATUS: COMPLETE.\nIDENTITY DATA COMPILING...", exhibitLogsText, 40, () => {
              
              // Step 3: Trigger dramatic thriller blackout sequence after reading delay
              setTimeout(() => {
                triggerSuspenseBlackout();
              }, 4500);

            });
          }, 1500);

        }, 1200);

      }, 600);

    }, 200);
  }

  // --- 4. CLIMAX BLACKOUT NARRATOR ---
  function triggerSuspenseBlackout() {
    glitchFlash.classList.add("flash-active");
    
    setTimeout(() => {
      glitchFlash.classList.remove("flash-active");
      
      // Dim console layout, show suspense black canvas
      mainConsole.style.transition = "opacity 1.5s";
      mainConsole.style.opacity = "0";
      
      setTimeout(() => {
        mainConsole.remove();
        suspenseOverlay.classList.add("reveal");
        runSuspenseNarrator();
      }, 1500);

    }, 250);
  }

  function runSuspenseNarrator() {
    // Line 1: THIS WAS NEVER ABOUT A CASE.
    setTimeout(() => {
      suspenseLine1.classList.add("reveal-active");
      
      // Line 2: IT WAS ABOUT A MEMORY.
      setTimeout(() => {
        suspenseLine2.classList.add("reveal-active");
        
        // Line 3: AND ONE LAST FILE...
        setTimeout(() => {
          suspenseLine3.classList.add("reveal-active");
          
          // Line 4: IS STILL LOCKED.
          setTimeout(() => {
            suspenseLine4.classList.add("reveal-active");
            
            // Fade lock box module in
            setTimeout(() => {
              finalFileBox.classList.add("reveal-active");
            }, 1800);

          }, 2000);
        }, 2200);
      }, 2200);
    }, 800);
  }

  // --- 5. FINAL BUTTON TRANSITION ---
  let isNavigating = false;

  openFinalBtn.addEventListener("click", () => {
    if (isNavigating) return;
    isNavigating = true;

    openFinalBtn.textContent = "ACCESS CONFIRMED.";
    openFinalBtn.disabled = true;
    glitchFlash.classList.add("flash-active");

    setTimeout(() => {
      glitchFlash.classList.remove("flash-active");
      
      // CRT compression monitor shutdown and relative navigation
      document.body.classList.add("crt-compress");
      
      setTimeout(() => {
        window.location.href = "page4.html";
      }, 800);

    }, 1000);
  });

  // --- 6. CUSTOM INTERACTIVE CURSOR ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice && customCursor) {
    customCursor.style.display = "block";
    
    window.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });

    const interactiveElements = [accessBtn, openFinalBtn];
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
        window.location.href = "page2.html";
      }, 150);
    });
    if (!isTouchDevice && customCursor) {
      backBtn.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
      backBtn.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
    }
  }

  // Boot
  runDiagnosticsSequence();

})();
