/**
 * HAPPY BIRTHDAY, ESTELLE! - Chapter IV Premium Cosmic Night Birthday Experience
 */

(function () {
  // --- DOM REFERENCES ---
  const canvas = document.getElementById("cosmic-canvas");
  const ctx = canvas.getContext("2d");
  
  const moon = document.getElementById("cosmic-moon");
  const planet1 = document.getElementById("planet-1");
  const planet2 = document.getElementById("planet-2");
  const planet3 = document.getElementById("planet-3");
  
  const bgDoll1 = document.getElementById("bg-doll-1");
  const bgDoll2 = document.getElementById("bg-doll-2");
  const bgDoll3 = document.getElementById("bg-doll-3");
  
  const portraitFrame = document.getElementById("cosmic-portrait-frame");
  const portraitPlanet = document.getElementById("portrait-planet");
  const portraitContainer = document.getElementById("cosmic-portrait-container");
  
  const soundToggle = document.getElementById("sound-toggle");
  const customCursor = document.getElementById("custom-cursor");
  const backBtn = document.getElementById("btn-back");
  const sparkleBtn = document.getElementById("sparkle-button");

  const hbTitle = document.getElementById("hb-title");
  const estelleTitle = document.getElementById("estelle-title");

  const mainGlassCard = document.getElementById("main-glass-card");
  const cardPrompt = document.getElementById("card-prompt");
  const msgContainer = document.getElementById("message-container");
  const msgLines = msgContainer.querySelectorAll(".message-line");

  // Game Hub DOM references
  const btnGameHub = document.getElementById("btn-game-hub");
  const gameHubOverlay = document.getElementById("game-hub-overlay");
  const closeHubBtn = document.getElementById("close-hub-btn");
  const hubDashboard = document.getElementById("hub-dashboard");
  const hubGameViewport = document.getElementById("hub-game-viewport");
  const backToDashboardBtn = document.getElementById("back-to-dashboard-btn");
  const currentGameTitle = document.getElementById("current-game-title");
  const gameSandbox = document.getElementById("game-sandbox");
  const gameCards = document.querySelectorAll(".game-card");

  // Movie Hub DOM references
  const btnMovieHub = document.getElementById("btn-movie-hub");
  const movieHubOverlay = document.getElementById("movie-hub-overlay");
  const closeMovieHubBtn = document.getElementById("close-movie-hub-btn");
  const movieDashboard = document.getElementById("movie-dashboard");
  const moviesGrid = document.getElementById("movies-grid");
  const movieDetailsViewport = document.getElementById("movie-details-viewport");
  const backToMovieDashboardBtn = document.getElementById("back-to-movie-dashboard-btn");
  const currentMovieTitle = document.getElementById("current-movie-title");
  const movieDetailArea = document.getElementById("movie-detail-area");

  // Movie Message (Letter) references
  const btnMovieMessage = document.getElementById("btn-movie-message");
  const movieMessageOverlay = document.getElementById("movie-message-overlay");
  const closeMovieMessageBtn = document.getElementById("close-movie-message-btn");

  // Lightbox DOM references
  const movieLightbox = document.getElementById("movie-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightboxBtn = document.getElementById("close-lightbox-btn");

  // --- 1. CANVAS STARFIELD ENGINE ---
  let stars = [];
  let cosmicDust = [];
  let shootingStars = [];
  let zoomingStars = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    cosmicDust = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 6000);
    
    // Back Layer - Tiny static stars
    for (let i = 0; i < starCount * 1.5; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 0.6,
        alpha: 0.2 + Math.random() * 0.4,
        twinkleSpeed: 0,
        type: "static"
      });
    }

    // Mid Layer - Pulsing/Twinkling stars
    for (let i = 0; i < starCount * 0.8; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1.2 + Math.random() * 1.0,
        alpha: 0.3 + Math.random() * 0.6,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        type: "twinkler"
      });
    }

    // Front Layer - Large soft glowing stars
    for (let i = 0; i < 15; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 2.2 + Math.random() * 1.2,
        alpha: 0.4 + Math.random() * 0.5,
        twinkleSpeed: 0.005 + Math.random() * 0.01,
        twinkleDir: 1,
        type: "glower"
      });
    }

    // Cosmic drifting dust particles
    for (let i = 0; i < 30; i++) {
      cosmicDust.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 10 + Math.random() * 20,
        alpha: 0.03 + Math.random() * 0.05,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.15 - Math.random() * 0.2
      });
    }
  }

  function spawnShootingStar() {
    shootingStars.push({
      x: Math.random() * canvas.width * 0.7,
      y: 0,
      vx: 4.5 + Math.random() * 4.0,
      vy: 4.5 + Math.random() * 4.0,
      length: 80 + Math.random() * 90,
      thickness: 1.2 + Math.random() * 1.5,
      alpha: 1.0,
      life: 0,
      maxLife: 25 + Math.round(Math.random() * 15)
    });
  }

  function spawnZoomingStar(x, y) {
    audioSystem.playSparkleChime();
    zoomingStars.push({
      x: x,
      y: y,
      maxSize: 18 + Math.random() * 12,
      currentSize: 1,
      life: 0,
      maxLife: 40,
      opacity: 1
    });
  }

  function updateAndDrawStarfield() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Nebulae dust
    const grad = ctx.createRadialGradient(canvas.width * 0.3, canvas.height * 0.7, 50, canvas.width * 0.3, canvas.height * 0.7, canvas.width * 0.6);
    grad.addColorStop(0, "rgba(126, 87, 194, 0.04)");
    grad.addColorStop(0.5, "rgba(236, 64, 122, 0.02)");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grad2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.2, 50, canvas.width * 0.8, canvas.height * 0.2, canvas.width * 0.5);
    grad2.addColorStop(0, "rgba(41, 182, 246, 0.03)");
    grad2.addColorStop(1, "transparent");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render Cosmic Dust
    cosmicDust.forEach((d) => {
      d.y += d.vy;
      d.x += d.vx;
      if (d.y < -d.r) d.y = canvas.height + d.r;
      if (d.x < -d.r || d.x > canvas.width + d.r) d.x = Math.random() * canvas.width;

      const dGrad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
      dGrad.addColorStop(0, `rgba(186, 104, 200, ${d.alpha})`);
      dGrad.addColorStop(1, "transparent");
      ctx.fillStyle = dGrad;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Render Stars
    stars.forEach((s) => {
      if (s.type === "twinkler") {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha > 0.95) s.twinkleDir = -1;
        if (s.alpha < 0.25) s.twinkleDir = 1;
      } else if (s.type === "glower") {
        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha > 0.8) s.twinkleDir = -0.5;
        if (s.alpha < 0.35) s.twinkleDir = 0.5;
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow aura for glowers
      if (s.type === "glower") {
        const glowGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3.5);
        glowGrad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha * 0.3})`);
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Render Shooting Stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const p = shootingStars[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha = 1.0 - (p.life / p.maxLife);

      if (p.life >= p.maxLife) {
        shootingStars.splice(i, 1);
        continue;
      }

      const tailGrad = ctx.createLinearGradient(p.x, p.y, p.x - p.length * (p.vx/10), p.y - p.length * (p.vy/10));
      tailGrad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.9})`);
      tailGrad.addColorStop(0.3, `rgba(244, 143, 177, ${p.alpha * 0.4})`);
      tailGrad.addColorStop(1, "transparent");

      ctx.strokeStyle = tailGrad;
      ctx.lineWidth = p.thickness;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.length * (p.vx/11), p.y - p.length * (p.vy/11));
      ctx.stroke();
    }

    // Render Custom Zooming Stars
    for (let i = zoomingStars.length - 1; i >= 0; i--) {
      const s = zoomingStars[i];
      s.life++;
      
      const progress = s.life / s.maxLife;
      if (progress < 0.3) {
        s.currentSize = 1 + (s.maxSize - 1) * (progress / 0.3);
      } else {
        s.currentSize = s.maxSize * (1 - (progress - 0.3) / 0.7);
        s.opacity = 1 - (progress - 0.3) / 0.7;
      }
      
      if (s.life >= s.maxLife) {
        zoomingStars.splice(i, 1);
        continue;
      }
      
      // Draw cross glow
      const glowGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.currentSize * 2.5);
      glowGrad.addColorStop(0, `rgba(255, 213, 79, ${s.opacity * 0.85})`);
      glowGrad.addColorStop(0.4, `rgba(255, 64, 129, ${s.opacity * 0.4})`);
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.currentSize * 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Center star core
      ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.currentSize * 0.4, 0, Math.PI * 2);
      ctx.fill();
      
      // Flares
      ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(s.x - s.currentSize, s.y);
      ctx.lineTo(s.x + s.currentSize, s.y);
      ctx.moveTo(s.x, s.y - s.currentSize);
      ctx.lineTo(s.x, s.y + s.currentSize);
      ctx.stroke();
    }

    // Schedule shooting stars randomly
    if (Math.random() < 0.0035) {
      spawnShootingStar();
    }

    requestAnimationFrame(updateAndDrawStarfield);
  }

  // --- 2. GPU-ACCELERATED SCROLL PARALLAX ENGINE ---
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    
    // Smooth drifting parallax layers
    moon.style.transform = `translateY(${scrollY * 0.14}px)`;
    planet1.style.transform = `translateY(${scrollY * 0.26}px) rotate(${scrollY * 0.015}deg)`;
    planet2.style.transform = `translateY(${scrollY * 0.18}px)`;
    planet3.style.transform = `translateY(${scrollY * 0.32}px)`;
    
    bgDoll1.style.transform = `translateY(${scrollY * 0.22}px) rotate(${scrollY * 0.02}deg)`;
    bgDoll2.style.transform = `translateY(${scrollY * 0.28}px) rotate(${-scrollY * 0.01}deg) scale(0.85)`;
    bgDoll3.style.transform = `translateY(${scrollY * 0.16}px) rotate(${scrollY * 0.015}deg) scale(0.7)`;
  });

  // --- 3. BACKGROUND ZOOM IN/OUT CONTROLLER ---
  function triggerBouncyZoom(element) {
    if (!element) return;
    audioSystem.playSparkleChime();
    gsap.killTweensOf(element);
    gsap.fromTo(element, 
      { scale: 1 }, 
      { scale: 1.38, duration: 0.38, yoyo: true, repeat: 1, ease: "back.out(1.8)" }
    );
  }

  // Bind zoom on background objects
  moon.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerBouncyZoom(document.getElementById("moon-inner"));
  });
  
  planet1.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerBouncyZoom(document.getElementById("planet-1-inner"));
  });
  
  planet2.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerBouncyZoom(document.getElementById("planet-2-inner"));
  });
  
  planet3.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerBouncyZoom(document.getElementById("planet-3-inner"));
  });
  
  bgDoll1.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerBouncyZoom(document.getElementById("bg-doll-1-inner"));
  });
  
  bgDoll2.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerBouncyZoom(document.getElementById("bg-doll-2-inner"));
  });
  
  bgDoll3.addEventListener("click", (e) => {
    e.stopPropagation();
    triggerBouncyZoom(document.getElementById("bg-doll-3-inner"));
  });

  // Bind click zoom and stardust effect on the friend's portrait
  if (portraitFrame) {
    portraitFrame.addEventListener("click", (e) => {
      e.stopPropagation();
      
      // Play a premium sound effect
      if (typeof audioSystem !== "undefined") {
        audioSystem.playCelebrationChime();
      }
      
      // GSAP bounce scale-up & organic rotation wobble
      gsap.killTweensOf(portraitFrame);
      const randomRot = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.random() * 2);
      
      gsap.fromTo(portraitFrame, 
        { scale: 1, rotation: 0 }, 
        { 
          scale: 1.08, 
          rotation: randomRot,
          duration: 0.35, 
          yoyo: true, 
          repeat: 1, 
          ease: "back.out(2)" 
        }
      );

      // Temporarily speed up the orbiting planet
      if (portraitPlanet) {
        portraitPlanet.style.animationDuration = "2.5s";
        gsap.to(portraitPlanet, {
          boxShadow: "0 0 35px #ffd54f, 0 0 15px #ff4081, 0 0 5px #ffffff",
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
        setTimeout(() => {
          portraitPlanet.style.animationDuration = "12s";
        }, 2500);
      }

      // Generate 15 stardust burst particles flying outwards
      const rect = portraitFrame.getBoundingClientRect();
      const parentRect = portraitContainer.getBoundingClientRect();
      const centerX = (rect.left + rect.right) / 2 - parentRect.left;
      const centerY = (rect.top + rect.bottom) / 2 - parentRect.top;
      
      const x = e.clientX ? (e.clientX - parentRect.left) : centerX;
      const y = e.clientY ? (e.clientY - parentRect.top) : centerY;
      
      const colors = ["#ff4081", "#ab47bc", "#29b6f6", "#ffd54f", "#ffffff"];
      const particleCount = 15;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "portrait-particle";
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.color = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        portraitContainer.appendChild(particle);
        
        // Random angle and radial velocity
        const angle = Math.random() * Math.PI * 2;
        const distance = 70 + Math.random() * 110;
        const destX = x + Math.cos(angle) * distance;
        const destY = y + Math.sin(angle) * distance;
        
        gsap.to(particle, {
          left: `${destX}px`,
          top: `${destY}px`,
          opacity: 0,
          scale: 0.1,
          duration: 0.7 + Math.random() * 0.6,
          ease: "power2.out",
          onComplete: () => {
            particle.remove();
          }
        });
      }

      // Spawn staggered zooming stars on the background canvas
      if (typeof spawnZoomingStar === "function") {
        const canvasRect = canvas.getBoundingClientRect();
        const canvasX = e.clientX - canvasRect.left;
        const canvasY = e.clientY - canvasRect.top;
        
        for (let i = 0; i < 3; i++) {
          const offsetScale = 35;
          const ox = canvasX + (Math.random() - 0.5) * offsetScale;
          const oy = canvasY + (Math.random() - 0.5) * offsetScale;
          setTimeout(() => {
            spawnZoomingStar(ox, oy);
          }, i * 140);
        }
      }
    });
  }

  // Bind click zoom on stars
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnZoomingStar(x, y);
  });

  // --- 4. INTERACTIVE CENTRAL GLASS CARD REVEAL ---
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (mainGlassCard) {
    mainGlassCard.classList.add("interactive");
    
    mainGlassCard.addEventListener("click", () => {
      if (mainGlassCard.classList.contains("is-opened")) return;
      
      mainGlassCard.classList.remove("interactive");
      mainGlassCard.classList.add("is-opened");
      
      // Play opening chimes sound
      audioSystem.playSparkleChime();
      
      // Animate card heading
      const heading = document.getElementById("card-heading");
      gsap.to(heading, { opacity: 0, duration: 0.4 });
      
      // Reposition and trigger sparkling lights in top-left
      const topLeftTitle = document.getElementById("top-left-friend");
      if (topLeftTitle) {
        topLeftTitle.classList.add("sparkle-active");
        
        const titleRect = topLeftTitle.getBoundingClientRect();
        createTapSparkles(titleRect.left + 50, titleRect.top + 15);
        
        setTimeout(() => {
          createTapSparkles(titleRect.left + 100, titleRect.top + 15);
        }, 300);
      }

      // Spawn stardust sparks from card center
      const rect = mainGlassCard.getBoundingClientRect();
      createTapSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      
      // Hide card-prompt
      cardPrompt.classList.add("hidden");
      
      // Expand message-container
      msgContainer.classList.remove("collapsed");
      msgContainer.classList.add("expanded");
      
      // Sequentially fade-reveal the 22 lines
      msgLines.forEach((line, idx) => {
        setTimeout(() => {
          line.classList.add("reveal-active");
          if (!audioSystem.muted) {
            audioSystem.playSparkleChime();
          }
        }, idx * 1650);
      });
    });

    if (!isTouchDevice && customCursor) {
      mainGlassCard.addEventListener("mouseenter", () => {
        if (!mainGlassCard.classList.contains("is-opened")) {
          customCursor.classList.add("hovering");
        }
      });
      mainGlassCard.addEventListener("mouseleave", () => {
        customCursor.classList.remove("hovering");
      });
    }
  }

  // --- 5. INTERACTIVE GRID CARDS GLOW MOUSEMOVE TRACKER ---
  const cards = document.querySelectorAll(".interactive-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    // Tap/Click card spark burst & toggle poem reveal state
    card.addEventListener("click", (e) => {
      audioSystem.playSparkleChime();
      createTapSparkles(e.clientX, e.clientY);

      const isRevealed = card.getAttribute("data-revealed") === "true";

      if (!isRevealed) {
        card.setAttribute("data-revealed", "true");
        card.classList.add("revealed");

        // Staggered star zoom effect on the background canvas behind the card
        if (typeof spawnZoomingStar === "function") {
          const rect = card.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();
          const cx = rect.left + rect.width / 2 - canvasRect.left;
          const cy = rect.top + rect.height / 2 - canvasRect.top;
          
          setTimeout(() => {
            spawnZoomingStar(cx, cy);
          }, 150);
        }

        // Change the indicator text to dynamic sparkle icon
        const indicator = card.querySelector(".card-indicator");
        if (indicator) {
          indicator.textContent = "✨";
        }
      } else {
        // Toggle back to teaser / Click to reveal state
        card.setAttribute("data-revealed", "false");
        card.classList.remove("revealed");

        // Reset the indicator text back to arrow
        const indicator = card.querySelector(".card-indicator");
        if (indicator) {
          indicator.textContent = "→";
        }
      }
    });
  });

  // --- 6. TAP SPARKLES ENGINE ---
  function createTapSparkles(cx, cy) {
    const container = document.body;
    const colors = ["#ff4081", "#ab47bc", "#29b6f6", "#ffd54f", "#ffffff"];
    
    for (let i = 0; i < 15; i++) {
      const spark = document.createElement("div");
      spark.style.position = "fixed";
      spark.style.width = `${4 + Math.random() * 5}px`;
      spark.style.height = `${4 + Math.random() * 5}px`;
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.left = `${cx}px`;
      spark.style.top = `${cy}px`;
      spark.style.borderRadius = "50%";
      spark.style.pointerEvents = "none";
      spark.style.zIndex = "999";
      spark.style.boxShadow = `0 0 8px ${spark.style.backgroundColor}`;
      
      container.appendChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 4.5;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed - 1.5;
      
      let x = cx;
      let y = cy;
      let alpha = 1.0;

      const animateSpark = () => {
        vy += 0.12;
        x += vx;
        y += vy;
        alpha -= 0.025;
        
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.opacity = alpha;

        if (alpha > 0) {
          requestAnimationFrame(animateSpark);
        } else {
          spark.remove();
        }
      };
      
      animateSpark();
    }
  }

  // --- 7. SOUND SYNTH DESIGN ---
  class ChimesAudioSystem {
    constructor() {
      this.muted = false;
      this.audioInited = false;
      this.ctx = null;
      this.masterGain = null;
      this.delayNode = null;

      this.bgm = new Audio();
      this.bgm.preload = "none";
      this.bgm.src = "assets/audio/birthday-music.mp3";
      this.bgm.loop = true;
      this.bgm.volume = 0.22;

      this.notes = [
        [523.25, 0.5], [523.25, 0.5], [587.33, 1.0], [523.25, 1.0], [698.46, 1.0], [659.25, 2.0],
        [523.25, 0.5], [523.25, 0.5], [587.33, 1.0], [523.25, 1.0], [783.99, 1.0], [698.46, 2.0],
        [523.25, 0.5], [523.25, 0.5], [1046.50, 1.0], [880.00, 1.0], [698.46, 1.0], [659.25, 1.0], [587.33, 2.0],
        [932.33, 0.5], [932.33, 0.5], [880.00, 1.0], [698.46, 1.0], [783.99, 1.0], [698.46, 2.5]
      ];
      this.currentNoteIdx = 0;
      this.synthTimeout = null;
      this.isSynthPlaying = false;
    }

    init() {
      if (this.audioInited) return;
      this.audioInited = true;

      const playPromise = this.bgm.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("🎵 Playing custom MP3 BGM.");
        }).catch(() => {
          this.startChimeSynth();
        });
      }
    }

    startChimeSynth() {
      if (this.isSynthPlaying || this.muted) return;
      this.isSynthPlaying = true;

      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtxClass();

        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.setValueAtTime(0.20, this.ctx.currentTime);

        this.delayNode = this.ctx.createDelay();
        this.delayNode.delayTime.setValueAtTime(0.35, this.ctx.currentTime);

        const delayGain = this.ctx.createGain();
        delayGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

        this.delayNode.connect(delayGain);
        delayGain.connect(this.delayNode);
        delayGain.connect(this.masterGain);

        this.playNextChime();
      } catch (err) {
        console.warn("Chime synth failed: ", err);
      }
    }

    playNextChime() {
      if (!this.isSynthPlaying || this.muted || !this.ctx) return;

      const note = this.notes[this.currentNoteIdx];
      const freq = note[0];
      const duration = note[1] * 700;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + (note[1] * 1.4));

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);
      gainNode.connect(this.delayNode);

      osc.start(now);
      osc.stop(now + (note[1] * 1.5));

      this.currentNoteIdx = (this.currentNoteIdx + 1) % this.notes.length;
      this.synthTimeout = setTimeout(() => {
        this.playNextChime();
      }, duration);
    }

    playSparkleChime() {
      if (this.muted) return;
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        const ctx = this.ctx || new AudioCtxClass();
        const now = ctx.currentTime;
        const freqs = [659.25, 783.99, 880.00, 1046.50];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gainNode.gain.setValueAtTime(0.06, now + idx * 0.08);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

          osc.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.3);
        });
      } catch (e) {}
    }

    playCelebrationChime() {
      if (this.muted) return;
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        const ctx = this.ctx || new AudioCtxClass();
        const now = ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50];

        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now);

          gainNode.gain.setValueAtTime(0.12, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

          osc.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 1.5);
        });
      } catch (e) {}
    }

    stopChimeSynth() {
      this.isSynthPlaying = false;
      if (this.synthTimeout) {
        clearTimeout(this.synthTimeout);
      }
      if (this.ctx) {
        try { this.ctx.close(); } catch(e) {}
        this.ctx = null;
      }
    }

    toggleMute() {
      this.init();
      this.muted = !this.muted;
      if (this.muted) {
        soundToggle.textContent = "🔇";
        this.bgm.pause();
        this.stopChimeSynth();
      } else {
        soundToggle.textContent = "🔊";
        const playPromise = this.bgm.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            this.startChimeSynth();
          });
        }
      }
    }
  }

  const audioSystem = new ChimesAudioSystem();

  // --- 8. SPEECH SYNTHESIS VOICE ---
  // Pre-warm the SpeechSynthesis voice cache on page load
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  function playVoiceBirthdayReveal() {
    if (audioSystem.muted) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance("Belated Happy Birthday, Estelle!");
        
        // Retrieve voices and select a high-quality English female voice
        const voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;
        
        // Filter out known male voices
        const maleNames = ["david", "mark", "george", "ravi", "male", "sean", "james", "conner", "richard", "he-il"];
        const englishFemaleVoices = voices.filter(v => {
          if (!v.lang.startsWith("en")) return false;
          const nameLower = v.name.toLowerCase();
          // Must not match any male names
          if (maleNames.some(m => nameLower.includes(m))) return false;
          return true;
        });
        
        // Priority female voice names
        const priorityFemaleNames = ["zira", "samantha", "google", "hazel", "susan", "heera", "victoria", "tessa"];
        for (const name of priorityFemaleNames) {
          selectedVoice = englishFemaleVoices.find(v => v.name.toLowerCase().includes(name));
          if (selectedVoice) break;
        }
        
        // Fallback to first filtered English female voice
        if (!selectedVoice && englishFemaleVoices.length > 0) {
          selectedVoice = englishFemaleVoices[0];
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        // Adjust pitch and rate for a cute, pleasant, friendly tone
        utterance.pitch = 1.6; // Slightly higher pitch for cute tone
        utterance.rate = 0.95; // Calm, friendly tempo
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn("Speech synthesis failed: ", e);
    }
  }

  // --- 9. FINAL CELEBRATION CLIMAX ---
  let finalCelebrationTriggered = false;

  function triggerFinalCelebration() {
    if (finalCelebrationTriggered) return;
    finalCelebrationTriggered = true;

    audioSystem.playCelebrationChime();
    playVoiceBirthdayReveal();
    triggerConfettiShower();

    for (let i = 0; i < 6; i++) {
      setTimeout(spawnShootingStar, i * 200);
    }
  }

  function triggerConfettiShower() {
    const container = document.body;
    const colors = ["#ff4081", "#ab47bc", "#29b6f6", "#ffd54f", "#ffffff"];
    
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement("div");
      piece.style.position = "fixed";
      piece.style.width = `${5 + Math.random() * 8}px`;
      piece.style.height = `${5 + Math.random() * 8}px`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `${-10 - Math.random() * 20}px`;
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      piece.style.zIndex = "99";
      piece.style.pointerEvents = "none";
      piece.style.boxShadow = `0 0 5px ${piece.style.backgroundColor}`;
      
      container.appendChild(piece);

      const speed = 2 + Math.random() * 4;
      const wind = (Math.random() - 0.5) * 1.5;
      
      let xPos = parseFloat(piece.style.left) * window.innerWidth / 100;
      let yPos = -20;

      const animateConfetti = () => {
        yPos += speed;
        xPos += wind;
        piece.style.left = `${xPos}px`;
        piece.style.top = `${yPos}px`;

        if (yPos < window.innerHeight + 10) {
          requestAnimationFrame(animateConfetti);
        } else {
          piece.remove();
        }
      };
      
      animateConfetti();
    }
  }

  // Wish Upon a Star Button handler
  // --- Wish Spawning State Variables ---
  let currentGameLevel = 1;
  let currentGameScore = 0;
  let gameSpawningInterval = null;
  let activeFloatingItems = [];
  let isGameRunning = false;
  let activeWishDismissCallback = null;

  const gameTargets = {
    1: { target: 5, speed: 1.5, type: "balloon", label: "Level 1: Pop Balloons!" },
    2: { target: 5, speed: 1.8, type: "star", label: "Level 2: Pop Stars!" },
    3: { target: 8, speed: 2.2, type: "alternate", label: "Level 3: Balloons & Stars!" },
    4: { target: 10, speed: 2.6, type: "alternate", label: "Level 4: Speed Up!" },
    5: { target: 12, speed: 3.2, type: "alternate", label: "Level 5: Cosmic Stars!" }
  };

  function startWishGame(cardNode) {
    currentGameLevel = 1;
    currentGameScore = 0;
    isGameRunning = true;
    activeFloatingItems = [];
    
    // Update Card inner content to game layout with a clear close (✕) button
    cardNode.innerHTML = `
      <button class="close-hub-btn" id="close-wish-game-btn" style="position: absolute; top: 15px; right: 20px; background: none; border: none; color: #fff; font-size: 1.2rem; cursor: pointer; z-index: 20;">✕</button>
      <h2 class="wish-title" style="margin-bottom: 10px; padding-right: 30px;">WISH BALLOONS & STARS 🎈⭐</h2>
      <div class="wish-game-container">
        <div class="wish-game-header">
          <span class="wish-game-level" id="wg-level">Level 1</span>
          <span class="wish-game-score" id="wg-score">Score: 0 / 5</span>
        </div>
        <div class="wish-game-play-area" id="wg-play-area">
          <div class="wish-game-status-msg" id="wg-status-msg">GET READY...</div>
        </div>
      </div>
      <span class="wish-close-hint" style="margin-top: 15px;">✦ CLICK OUTSIDE CARD TO CLOSE ✦</span>
    `;

    // Bind close game button click
    const closeBtn = cardNode.querySelector("#close-wish-game-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (typeof activeWishDismissCallback === "function") {
          activeWishDismissCallback();
        }
      });
      if (!isTouchDevice && customCursor) {
        closeBtn.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
        closeBtn.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
      }
    }

    setTimeout(() => {
      loadLevel(currentGameLevel);
    }, 1000);
  }

  function loadLevel(level) {
    if (!isGameRunning) return;
    
    currentGameLevel = level;
    currentGameScore = 0;
    
    const config = gameTargets[level];
    const statusMsg = document.getElementById("wg-status-msg");
    const levelIndicator = document.getElementById("wg-level");
    const scoreIndicator = document.getElementById("wg-score");
    
    if (levelIndicator) levelIndicator.textContent = `Level ${level}`;
    if (scoreIndicator) scoreIndicator.textContent = `Score: 0 / ${config.target}`;
    
    if (statusMsg) {
      statusMsg.style.display = "block";
      statusMsg.textContent = config.label;
      gsap.fromTo(statusMsg, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
    }
    
    // Clear previous spawns
    if (gameSpawningInterval) clearInterval(gameSpawningInterval);
    
    // Remove existing floating elements
    activeFloatingItems.forEach(item => item.remove());
    activeFloatingItems = [];
    
    setTimeout(() => {
      if (statusMsg) statusMsg.style.display = "none";
      startSpawning(config);
    }, 2000);
  }

  function startSpawning(config) {
    const playArea = document.getElementById("wg-play-area");
    if (!playArea || !isGameRunning) return;
    
    // Spawn loop
    gameSpawningInterval = setInterval(() => {
      if (!isGameRunning) return;
      
      const item = document.createElement("div");
      item.className = "floating-wish-item";
      
      // Alternate balloons and stars
      let itemType = config.type;
      if (itemType === "alternate") {
        itemType = Math.random() > 0.5 ? "balloon" : "star";
      }
      
      if (itemType === "balloon") {
        const balloonEmojis = ["🎈", "💖", "🎁"];
        item.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        item.style.filter = "drop-shadow(0 0 8px rgba(255, 64, 129, 0.4))";
      } else {
        const starEmojis = ["⭐", "✨", "🌟", "💫"];
        item.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        item.style.filter = "drop-shadow(0 0 10px rgba(255, 213, 79, 0.5))";
      }
      
      // Position
      const areaWidth = playArea.clientWidth || 300;
      const x = 20 + Math.random() * (areaWidth - 60);
      item.style.left = `${x}px`;
      
      playArea.appendChild(item);
      activeFloatingItems.push(item);
      
      // Float up animation
      const duration = 5 / config.speed;
      gsap.to(item, {
        bottom: "380px",
        duration: duration,
        ease: "none",
        onComplete: () => {
          item.remove();
          activeFloatingItems = activeFloatingItems.filter(i => i !== item);
        }
      });
      
      // Pop handler
      const popHandler = (e) => {
        e.stopPropagation();
        item.remove();
        activeFloatingItems = activeFloatingItems.filter(i => i !== item);
        
        // Play sound
        if (itemType === "balloon") {
          audioSystem.playSparkleChime();
          createTapSparkles(e.clientX || (e.touches && e.touches[0].clientX) || 0, e.clientY || (e.touches && e.touches[0].clientY) || 0);
        } else {
          audioSystem.playCelebrationChime();
          createTapSparkles(e.clientX || (e.touches && e.touches[0].clientX) || 0, e.clientY || (e.touches && e.touches[0].clientY) || 0);
        }
        
        currentGameScore++;
        const scoreIndicator = document.getElementById("wg-score");
        if (scoreIndicator) scoreIndicator.textContent = `Score: ${currentGameScore} / ${config.target}`;
        
        // Check level completion
        if (currentGameScore >= config.target) {
          clearInterval(gameSpawningInterval);
          activeFloatingItems.forEach(i => i.remove());
          activeFloatingItems = [];
          
          if (currentGameLevel < 5) {
            loadLevel(currentGameLevel + 1);
          } else {
            showGameVictory();
          }
        }
      };
      
      item.addEventListener("click", popHandler);
      item.addEventListener("touchstart", popHandler);
      
    }, 1000 - (config.speed * 120));
  }

  function showGameVictory() {
    isGameRunning = false;
    if (gameSpawningInterval) clearInterval(gameSpawningInterval);
    
    const playArea = document.getElementById("wg-play-area");
    if (playArea) {
      playArea.innerHTML = `
        <div class="wish-game-status-msg" style="color: var(--accent-gold); font-size: 1.25rem;">
          🌟 CONGRATULATIONS ESTELLE! 🌟<br><br>
          All levels complete!<br>
          Your wishes have been launched into the night sky! 🌠✨
        </div>
      `;
      
      // Spawn infinite stars
      if (typeof spawnZoomingStar === "function") {
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            spawnZoomingStar(window.innerWidth / 2 + (Math.random() - 0.5) * 300, window.innerHeight / 2 + (Math.random() - 0.5) * 300);
          }, i * 200);
        }
      }
    }
  }
  
  function cleanupWishGame() {
    isGameRunning = false;
    if (gameSpawningInterval) clearInterval(gameSpawningInterval);
    activeFloatingItems.forEach(i => i.remove());
    activeFloatingItems = [];
  }

  // Wish Upon a Star Button handler (Cinematic Interaction)
  sparkleBtn.addEventListener("click", () => {
    // Prevent multiple clicks
    if (sparkleBtn.disabled) return;
    
    // Disable button during animation
    sparkleBtn.disabled = true;
    sparkleBtn.style.opacity = '0.5';
    sparkleBtn.style.cursor = 'not-allowed';

    // Play chime sound
    audioSystem.playSparkleChime();

    // STEP 1: Slowly dim the surrounding stars and background for a moment
    const overlay = document.createElement("div");
    overlay.className = "wish-overlay";
    document.body.appendChild(overlay);
    
    gsap.to(overlay, { 
      opacity: 0.85, 
      duration: 1.5, 
      ease: "power1.inOut" 
    });

    // STEP 2: Create one beautiful glowing shooting star that travels smoothly across the screen
    // We delay the star creation slightly to let the dimming start
    setTimeout(() => {
      const star = document.createElement("div");
      star.className = "wish-shooting-star";
      document.body.appendChild(star);

      // Travel from top-left (offscreen) to the center (50vw, 50vh)
      gsap.fromTo(star, 
        { 
          left: "-150px", 
          top: "10%", 
          scale: 0.5, 
          opacity: 0 
        },
        { 
          left: "50vw", 
          top: "50vh", 
          scale: 1.2,
          opacity: 1, 
          duration: 1.8, 
          ease: "power2.out",
          onComplete: () => {
            // STEP 3: When the shooting star reaches the center, reveal a premium glowing glassmorphism card with a smooth fade/scale animation.
            
            // Star burst explosion of small particles
            const starBlastContainer = document.createElement("div");
            starBlastContainer.style.position = "fixed";
            starBlastContainer.style.left = "50vw";
            starBlastContainer.style.top = "50vh";
            starBlastContainer.style.zIndex = "2650";
            starBlastContainer.style.pointerEvents = "none";
            document.body.appendChild(starBlastContainer);

            audioSystem.playCelebrationChime();

            for (let i = 0; i < 15; i++) {
              const p = document.createElement("div");
              p.className = "wish-blast-particle";
              p.style.left = "0px";
              p.style.top = "0px";
              
              // Random color from stardust scheme
              const colors = ["#ffd54f", "#ff4081", "#ab47bc", "#29b6f6", "#ffffff"];
              p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
              p.style.boxShadow = `0 0 10px ${p.style.backgroundColor}`;
              
              starBlastContainer.appendChild(p);

              const angle = Math.random() * Math.PI * 2;
              const distance = 50 + Math.random() * 100;
              gsap.to(p, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0.2,
                duration: 1.2,
                ease: "power2.out",
                onComplete: () => {
                  p.remove();
                  if (i === 14) starBlastContainer.remove();
                }
              });
            }

            // Remove shooting star
            star.remove();

            // STEP 4: Display exactly the card text + Play Button
            const wishCard = document.createElement("div");
            wishCard.className = "cosmic-wish-card";
            wishCard.innerHTML = `
              <h2 class="wish-title">MAKE A WISH, ESTELLE ✨</h2>
              <p class="wish-instruction">Close your eyes for a moment...<br>Think of something you wish for.</p>
              <p class="wish-blessing">May this new year of your life bring you<br>countless beautiful moments. 🌙</p>
              <button class="wish-game-btn" id="start-wish-game-btn">🎮 Click to Play: Pop the Balloon & Stars to Wish 🎮</button>
              <span class="wish-close-hint" style="margin-top: 18px;">✦ CLICK OUTSIDE CARD TO CLOSE ✦</span>
            `;
            document.body.appendChild(wishCard);

            // Stop click propagation inside the card so clicks there don't close it
            wishCard.addEventListener("click", (e) => {
              e.stopPropagation();
            });

            // Bind start game click
            const startBtn = wishCard.querySelector("#start-wish-game-btn");
            if (startBtn) {
              startBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                audioSystem.playCelebrationChime();
                startWishGame(wishCard);
              });
            }

            // Animate card reveal
            gsap.fromTo(wishCard,
              { scale: 0.6, opacity: 0, xPercent: -50, yPercent: -50, x: 0, y: 0 },
              { 
                scale: 1, 
                opacity: 1, 
                xPercent: -50, 
                yPercent: -50, 
                x: 0,
                y: 0, 
                duration: 0.7, 
                ease: "back.out(1.2)",
                onComplete: () => {
                  // Re-enable button after animation finishes
                  sparkleBtn.disabled = false;
                  sparkleBtn.style.opacity = '1';
                  sparkleBtn.style.cursor = 'pointer';
                }
              }
            );

            // Dismiss click handler to clean up and restore background
            const dismissWish = () => {
              audioSystem.playSparkleChime();
              cleanupWishGame();

              gsap.to([wishCard, overlay], {
                opacity: 0,
                scale: (idx, target) => target === wishCard ? 0.7 : 1,
                duration: 0.6,
                ease: "power2.in",
                onComplete: () => {
                  wishCard.remove();
                  overlay.remove();
                }
              });
            };

            activeWishDismissCallback = dismissWish;

            // Overlay click dismisses the card
            overlay.addEventListener("click", dismissWish);
          }
        }
      );
    }, 800);
  });

  // --- 10. SCROLL INTERSECTION OBSERVER FOR CLIMAX ---
  const finalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerFinalCelebration();
      }
    });
  }, { threshold: 0.25 });
  
  const finalSecNode = document.querySelector(".final-section");
  if (finalSecNode) {
    finalObserver.observe(finalSecNode);
  }

  // --- 11. THE COSMIC GAME HUB CONTROLLER ---
  let activeGameLoop = null;
  let activeGameInterval = null;
  let activeGameCleanup = null;

  // Prevent main page scrolling when playing games
  const preventScrollOnGameKeys = (e) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key) || e.keyCode === 32) {
      e.preventDefault();
    }
  };

  btnGameHub.addEventListener("click", () => {
    audioSystem.playCelebrationChime();
    gameHubOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", preventScrollOnGameKeys);
  });

  closeHubBtn.addEventListener("click", () => {
    audioSystem.playSparkleChime();
    cleanupActiveGame();
    gameHubOverlay.classList.remove("show");
    document.body.style.overflow = "";
    window.removeEventListener("keydown", preventScrollOnGameKeys);
  });

  backToDashboardBtn.addEventListener("click", () => {
    audioSystem.playSparkleChime();
    cleanupActiveGame();
    hubGameViewport.classList.add("hidden");
    hubDashboard.classList.remove("hidden");
  });

  gameCards.forEach(card => {
    card.addEventListener("click", () => {
      const gameType = card.getAttribute("data-game");
      const title = card.querySelector(".game-card-title").textContent;
      
      audioSystem.playSparkleChime();
      hubDashboard.classList.add("hidden");
      hubGameViewport.classList.remove("hidden");
      currentGameTitle.textContent = title;
      
      loadGameSandbox(gameType);
    });
  });

  function cleanupActiveGame() {
    if (activeGameLoop) {
      cancelAnimationFrame(activeGameLoop);
      activeGameLoop = null;
    }
    if (activeGameInterval) {
      clearInterval(activeGameInterval);
      activeGameInterval = null;
    }
    if (activeGameCleanup) {
      activeGameCleanup();
      activeGameCleanup = null;
    }
    gameSandbox.innerHTML = "";
  }

  function loadGameSandbox(type) {
    cleanupActiveGame();
    if (type === "flappy") {
      initFlappySpaceRocket();
    } else if (type === "c2048") {
      initCosmic2048();
    } else if (type === "defense") {
      initAlienTapBlast();
    } else if (type === "tictactoe") {
      initTicTacCosmic();
    } else if (type === "match3") {
      initStarryGemMatch3();
    }
  }

  // --- GAME 1: FLAPPY SPACE ROCKET ---
  function initFlappySpaceRocket() {
    gameSandbox.innerHTML = `
      <div class="game-score-board">
        <div>Score: <span id="flappy-score" style="color:var(--accent-gold);">0</span></div>
      </div>
      <canvas id="flappy-canvas" class="game-canvas-element" width="340" height="280"></canvas>
      <div class="mobile-dpad">
        <div class="dpad-btn" id="f-jump" style="width:140px; border-radius:20px; background:#ff4081">BOOST 🚀</div>
      </div>
    `;

    const gCanvas = document.getElementById("flappy-canvas");
    const gCtx = gCanvas.getContext("2d");
    const scoreVal = document.getElementById("flappy-score");

    let score = 0;
    let gameOver = false;
    let gameStarted = false;

    let rx = 50;
    let ry = 130;
    let rSize = 14;
    let velocity = 0;
    let gravity = 0.28;
    let boost = -5.0;

    let columns = [];
    let colWidth = 45;
    let colGap = 85;

    function spawnColumn() {
      const topHeight = 35 + Math.random() * 110;
      columns.push({
        x: gCanvas.width,
        top: topHeight,
        bottom: gCanvas.height - topHeight - colGap,
        passed: false
      });
    }

    const restartGame = () => {
      gameOver = false;
      gameStarted = false;
      score = 0;
      scoreVal.textContent = score;
      ry = 130;
      velocity = 0;
      columns = [];
      loop();
    };

    const triggerBoost = () => {
      if (gameOver) {
        restartGame();
        return;
      }
      gameStarted = true;
      audioSystem.playSparkleChime();
      velocity = boost;
    };

    const handleJump = (e) => {
      if (e.key === " " || e.key === "ArrowUp") {
        triggerBoost();
      }
    };

    window.addEventListener("keydown", handleJump);
    document.getElementById("f-jump").addEventListener("click", triggerBoost);

    // Canvas click & touch bindings for restarting or boosting
    gCanvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      triggerBoost();
    });
    gCanvas.addEventListener("click", () => {
      triggerBoost();
    });

    activeGameCleanup = () => {
      window.removeEventListener("keydown", handleJump);
    };

    function loop() {
      gCtx.fillStyle = "#05020c";
      gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);

      if (!gameStarted && !gameOver) {
        gCtx.fillStyle = "#fff";
        gCtx.font = "bold 16px Outfit";
        gCtx.textAlign = "center";
        gCtx.fillText("FLAPPY SPACE ROCKET", gCanvas.width/2, gCanvas.height/2 - 20);
        gCtx.font = "12px Courier Prime";
        gCtx.fillStyle = "#ffd54f";
        gCtx.fillText("Press BOOST or Space to Fly", gCanvas.width/2, gCanvas.height/2 + 15);
        
        // Draw static rocket
        gCtx.fillStyle = "#ffd54f";
        gCtx.beginPath();
        gCtx.arc(rx, ry, rSize, 0, Math.PI*2);
        gCtx.fill();
        gCtx.fillStyle = "#ff4081";
        gCtx.beginPath();
        gCtx.moveTo(rx - rSize, ry - 4);
        gCtx.lineTo(rx - rSize - 10, ry);
        gCtx.lineTo(rx - rSize, ry + 4);
        gCtx.closePath();
        gCtx.fill();

        activeGameLoop = requestAnimationFrame(loop);
        return;
      }

      if (gameOver) {
        gCtx.fillStyle = "rgba(0,0,0,0.65)";
        gCtx.fillRect(0,0, gCanvas.width, gCanvas.height);
        gCtx.fillStyle = "#fff";
        gCtx.font = "bold 20px Outfit";
        gCtx.textAlign = "center";
        gCtx.fillText("GAME OVER", gCanvas.width/2, gCanvas.height/2 - 10);
        gCtx.font = "14px Courier Prime";
        gCtx.fillText("Tap screen/BOOST to restart", gCanvas.width/2, gCanvas.height/2 + 20);
        return;
      }

      // Physics
      velocity += gravity;
      ry += velocity;

      if (ry < rSize || ry > gCanvas.height - rSize) {
        gameOver = true;
        audioSystem.playCelebrationChime();
        return;
      }

      // Spawn column
      if (columns.length === 0 || columns[columns.length - 1].x < gCanvas.width - 150) {
        spawnColumn();
      }

      // Rocket
      gCtx.fillStyle = "#ffd54f";
      gCtx.beginPath();
      gCtx.arc(rx, ry, rSize, 0, Math.PI*2);
      gCtx.fill();

      // Fire tail
      gCtx.fillStyle = "#ff4081";
      gCtx.beginPath();
      gCtx.moveTo(rx - rSize, ry - 4);
      gCtx.lineTo(rx - rSize - 10, ry);
      gCtx.lineTo(rx - rSize, ry + 4);
      gCtx.closePath();
      gCtx.fill();

      // Columns
      gCtx.fillStyle = "rgba(41, 182, 246, 0.6)";
      for (let i = columns.length - 1; i >= 0; i--) {
        const col = columns[i];
        col.x -= 2.2;

        gCtx.fillRect(col.x, 0, colWidth, col.top);
        gCtx.fillRect(col.x, gCanvas.height - col.bottom, colWidth, col.bottom);

        if (!col.passed && col.x < rx) {
          col.passed = true;
          score += 10;
          scoreVal.textContent = score;
          audioSystem.playSparkleChime();
        }

        const hitTop = (rx + rSize > col.x && rx - rSize < col.x + colWidth && ry - rSize < col.top);
        const hitBottom = (rx + rSize > col.x && rx - rSize < col.x + colWidth && ry + rSize > gCanvas.height - col.bottom);
        if (hitTop || hitBottom) {
          gameOver = true;
          audioSystem.playCelebrationChime();
        }

        if (col.x < -colWidth) columns.splice(i, 1);
      }

      activeGameLoop = requestAnimationFrame(loop);
    }

    loop();
  }

  // --- GAME 2: COSMIC 2048 ---
  function initCosmic2048() {
    gameSandbox.innerHTML = `
      <div class="game-score-board">
        <div>Score: <span id="c2048-score" style="color:var(--accent-gold);">0</span></div>
      </div>
      <div class="grid-2048" id="grid-2048"></div>
      <div style="display:flex; flex-direction:column; align-items:center; gap:6px; margin-top:12px;">
        <div class="dpad-btn" id="k-up">▲</div>
        <div style="display:flex; gap:20px;">
          <div class="dpad-btn" id="k-left">◀</div>
          <div class="dpad-btn" id="k-right">▶</div>
        </div>
        <div class="dpad-btn" id="k-down">▼</div>
      </div>
    `;

    const gridContainer = document.getElementById("grid-2048");
    const scoreVal = document.getElementById("c2048-score");

    let score = 0;
    let board = Array(16).fill(0);

    function initCells() {
      gridContainer.innerHTML = "";
      for (let i = 0; i < 16; i++) {
        const cell = document.createElement("div");
        cell.className = "tile-2048";
        cell.id = `c2048-${i}`;
        gridContainer.appendChild(cell);
      }
    }

    function addRandomTile() {
      const emptyIndices = board.map((val, idx) => val === 0 ? idx : null).filter(val => val !== null);
      if (emptyIndices.length > 0) {
        const idx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        board[idx] = Math.random() > 0.1 ? 2 : 4;
      }
    }

    function is2048GameOver() {
      if (board.includes(0)) return false;
      for (let i = 0; i < 16; i++) {
        const row = Math.floor(i / 4);
        const col = i % 4;
        if (col < 3 && board[i] === board[i + 1]) return false;
        if (row < 3 && board[i] === board[i + 4]) return false;
      }
      return true;
    }

    function renderBoard() {
      scoreVal.textContent = score;
      for (let i = 0; i < 16; i++) {
        const cell = document.getElementById(`c2048-${i}`);
        cell.textContent = board[i] === 0 ? "" : board[i];
        cell.style.background = getTileColor(board[i]);
      }

      if (is2048GameOver()) {
        gridContainer.style.opacity = "0.5";
        scoreVal.innerHTML = `${score} <span style="color:red; font-weight:bold; margin-left:12px;">GAME OVER (Click Grid to Reset)</span>`;
      }
    }

    function getTileColor(val) {
      if (val === 0) return "rgba(255, 255, 255, 0.05)";
      if (val === 2) return "#5c3e35";
      if (val === 4) return "#8d6e63";
      if (val === 8) return "#e65100";
      if (val === 16) return "#ff7043";
      if (val === 32) return "#f4511e";
      if (val === 64) return "#e53935";
      if (val === 128) return "#ffb300";
      if (val === 256) return "#ffca28";
      if (val === 512) return "#ab47bc";
      if (val === 1024) return "#ff4081";
      return "linear-gradient(135deg, #ff4081 0%, #ffd54f 100%)";
    }

    function slide(row) {
      let arr = row.filter(val => val !== 0);
      let missing = 4 - arr.length;
      let zeros = Array(missing).fill(0);
      return arr.concat(zeros);
    }

    function combine(row) {
      for (let i = 0; i < 3; i++) {
        if (row[i] !== 0 && row[i] === row[i + 1]) {
          row[i] *= 2;
          row[i + 1] = 0;
          score += row[i];
        }
      }
      return row;
    }

    function moveLeft() {
      if (is2048GameOver()) return;
      let changed = false;
      for (let r = 0; r < 4; r++) {
        const startIdx = r * 4;
        let row = [board[startIdx], board[startIdx+1], board[startIdx+2], board[startIdx+3]];
        let slid = slide(row);
        let combined = combine(slid);
        let finalRow = slide(combined);
        for (let c = 0; c < 4; c++) {
          if (board[startIdx + c] !== finalRow[c]) changed = true;
          board[startIdx + c] = finalRow[c];
        }
      }
      if (changed) {
        audioSystem.playSparkleChime();
        addRandomTile();
        renderBoard();
      }
    }

    function moveRight() {
      if (is2048GameOver()) return;
      let changed = false;
      for (let r = 0; r < 4; r++) {
        const startIdx = r * 4;
        let row = [board[startIdx+3], board[startIdx+2], board[startIdx+1], board[startIdx+0]];
        let slid = slide(row);
        let combined = combine(slid);
        let finalRow = slide(combined);
        for (let c = 0; c < 4; c++) {
          if (board[startIdx + 3 - c] !== finalRow[c]) changed = true;
          board[startIdx + 3 - c] = finalRow[c];
        }
      }
      if (changed) {
        audioSystem.playSparkleChime();
        addRandomTile();
        renderBoard();
      }
    }

    function moveUp() {
      if (is2048GameOver()) return;
      let changed = false;
      for (let c = 0; c < 4; c++) {
        let col = [board[c], board[c+4], board[c+8], board[c+12]];
        let slid = slide(col);
        let combined = combine(slid);
        let finalCol = slide(combined);
        for (let r = 0; r < 4; r++) {
          if (board[c + r*4] !== finalCol[r]) changed = true;
          board[c + r*4] = finalCol[r];
        }
      }
      if (changed) {
        audioSystem.playSparkleChime();
        addRandomTile();
        renderBoard();
      }
    }

    function moveDown() {
      if (is2048GameOver()) return;
      let changed = false;
      for (let c = 0; c < 4; c++) {
        let col = [board[c+12], board[c+8], board[c+4], board[c]];
        let slid = slide(col);
        let combined = combine(slid);
        let finalCol = slide(combined);
        for (let r = 0; r < 4; r++) {
          if (board[c + (3-r)*4] !== finalCol[r]) changed = true;
          board[c + (3-r)*4] = finalCol[r];
        }
      }
      if (changed) {
        audioSystem.playSparkleChime();
        addRandomTile();
        renderBoard();
      }
    }

    const handleDirKeys = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") moveLeft();
      if (e.key === "ArrowRight" || e.key === "d") moveRight();
      if (e.key === "ArrowUp" || e.key === "w") moveUp();
      if (e.key === "ArrowDown" || e.key === "s") moveDown();
    };
    window.addEventListener("keydown", handleDirKeys);
    activeGameCleanup = () => window.removeEventListener("keydown", handleDirKeys);

    document.getElementById("k-up").addEventListener("click", moveUp);
    document.getElementById("k-down").addEventListener("click", moveDown);
    document.getElementById("k-left").addEventListener("click", moveLeft);
    document.getElementById("k-right").addEventListener("click", moveRight);

    gridContainer.addEventListener("click", () => {
      if (is2048GameOver()) {
        board = Array(16).fill(0);
        score = 0;
        gridContainer.style.opacity = "1";
        addRandomTile();
        addRandomTile();
        renderBoard();
      }
    });

    initCells();
    addRandomTile();
    addRandomTile();
    renderBoard();
  }

  // --- GAME 3: ALIEN TAP BLAST ---
  function initAlienTapBlast() {
    gameSandbox.innerHTML = `
      <div class="game-score-board">
        <div>Score: <span id="def-score" style="color:var(--accent-gold);">0</span></div>
        <div>Lives: <span id="def-lives" style="color:var(--accent-pink);">3</span></div>
      </div>
      <canvas id="defense-canvas" class="game-canvas-element" width="340" height="280"></canvas>
      <p style="font-size:0.75rem; color:#8e8a9f; margin-top:8px;">Tap falling alien ships before they land</p>
    `;

    const gCanvas = document.getElementById("defense-canvas");
    const gCtx = gCanvas.getContext("2d");
    const scoreVal = document.getElementById("def-score");
    const livesVal = document.getElementById("def-lives");

    let score = 0;
    let lives = 3;
    let gameOver = false;
    let gameStarted = false;
    let aliens = [];

    function spawnAlien() {
      aliens.push({
        x: 20 + Math.random() * (gCanvas.width - 45),
        y: 0,
        r: 14 + Math.random() * 6,
        color: Math.random() > 0.5 ? "#ff4081" : "#ab47bc",
        speed: 1.2 + Math.random() * 1.5
      });
    }

    const processTouch = (clientX, clientY) => {
      if (gameOver) {
        score = 0;
        lives = 3;
        gameOver = false;
        gameStarted = false;
        aliens = [];
        scoreVal.textContent = score;
        livesVal.textContent = lives;
        loop();
        return;
      }

      if (!gameStarted) {
        gameStarted = true;
        audioSystem.playSparkleChime();
        return;
      }

      const rect = gCanvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      for (let i = aliens.length - 1; i >= 0; i--) {
        const al = aliens[i];
        const dist = Math.hypot(al.x - clickX, al.y - clickY);
        if (dist < al.r + 12) {
          aliens.splice(i, 1);
          score += 10;
          scoreVal.textContent = score;
          audioSystem.playSparkleChime();
          createTapSparkles(clientX, clientY);
          break;
        }
      }
    };

    gCanvas.addEventListener("click", (e) => {
      processTouch(e.clientX, e.clientY);
    });

    gCanvas.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches[0]) {
        processTouch(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    function loop() {
      gCtx.fillStyle = "#05020c";
      gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);

      if (!gameStarted && !gameOver) {
        gCtx.fillStyle = "#fff";
        gCtx.font = "bold 16px Outfit";
        gCtx.textAlign = "center";
        gCtx.fillText("ALIEN TAP BLAST", gCanvas.width/2, gCanvas.height/2 - 20);
        gCtx.font = "12px Courier Prime";
        gCtx.fillStyle = "#ffd54f";
        gCtx.fillText("Tap screen to start Defense", gCanvas.width/2, gCanvas.height/2 + 15);
        activeGameLoop = requestAnimationFrame(loop);
        return;
      }

      if (gameOver) {
        gCtx.fillStyle = "rgba(0,0,0,0.65)";
        gCtx.fillRect(0,0, gCanvas.width, gCanvas.height);
        gCtx.fillStyle = "#fff";
        gCtx.font = "bold 20px Outfit";
        gCtx.textAlign = "center";
        gCtx.fillText("GAME OVER", gCanvas.width/2, gCanvas.height/2 - 10);
        gCtx.font = "14px Courier Prime";
        gCtx.fillText("Tap screen to restart", gCanvas.width/2, gCanvas.height/2 + 20);
        return;
      }

      if (Math.random() < 0.022) {
        spawnAlien();
      }

      // Render & Move
      for (let i = aliens.length - 1; i >= 0; i--) {
        const al = aliens[i];
        al.y += al.speed;

        gCtx.fillStyle = al.color;
        gCtx.beginPath();
        gCtx.arc(al.x, al.y, al.r, 0, Math.PI * 2);
        gCtx.fill();

        gCtx.fillStyle = "#fff";
        gCtx.beginPath();
        gCtx.arc(al.x - 3, al.y - 2, 2, 0, Math.PI*2);
        gCtx.arc(al.x + 3, al.y - 2, 2, 0, Math.PI*2);
        gCtx.fill();

        if (al.y > gCanvas.height) {
          aliens.splice(i, 1);
          lives--;
          livesVal.textContent = lives;
          audioSystem.playSparkleChime();
          if (lives <= 0) {
            gameOver = true;
            audioSystem.playCelebrationChime();
          }
        }
      }

      activeGameLoop = requestAnimationFrame(loop);
    }

    loop();
  }

  // --- GAME 4: TIC-TAC-COSMIC ---
  function initTicTacCosmic() {
    gameSandbox.innerHTML = `
      <div class="game-score-board">
        <div id="tictac-status">Your turn (🌙)</div>
      </div>
      <div class="tictac-board" id="tictac-board">
        <div class="tictac-cell" data-idx="0"></div>
        <div class="tictac-cell" data-idx="1"></div>
        <div class="tictac-cell" data-idx="2"></div>
        <div class="tictac-cell" data-idx="3"></div>
        <div class="tictac-cell" data-idx="4"></div>
        <div class="tictac-cell" data-idx="5"></div>
        <div class="tictac-cell" data-idx="6"></div>
        <div class="tictac-cell" data-idx="7"></div>
        <div class="tictac-cell" data-idx="8"></div>
      </div>
      <button class="game-control-btn" id="tictac-reset">Reset</button>
    `;

    const cells = document.querySelectorAll(".tictac-cell");
    const status = document.getElementById("tictac-status");
    const reset = document.getElementById("tictac-reset");

    let board = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;

    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    function checkWin(player) {
      return winPatterns.some(pattern => {
        return pattern.every(idx => board[idx] === player);
      });
    }

    function checkDraw() {
      return board.every(cell => cell !== "");
    }

    function aiMove() {
      const emptyCells = board.map((c, i) => c === "" ? i : null).filter(v => v !== null);
      if (emptyCells.length === 0 || gameOver) return;

      let chosenMove = emptyCells[0];

      // 1. Can AI win?
      for (let i = 0; i < emptyCells.length; i++) {
        let tempBoard = [...board];
        tempBoard[emptyCells[i]] = "O";
        if (winPatterns.some(p => p.every(idx => tempBoard[idx] === "O"))) {
          chosenMove = emptyCells[i];
          break;
        }
      }

      // 2. Block Player?
      let block = null;
      for (let i = 0; i < emptyCells.length; i++) {
        let tempBoard = [...board];
        tempBoard[emptyCells[i]] = "X";
        if (winPatterns.some(p => p.every(idx => tempBoard[idx] === "X"))) {
          block = emptyCells[i];
          break;
        }
      }
      if (block !== null && board[chosenMove] !== "O") {
        chosenMove = block;
      }

      board[chosenMove] = "O";
      const cellNode = document.querySelector(`[data-idx="${chosenMove}"]`);
      cellNode.textContent = "⭐";
      cellNode.classList.add("o-cell");
      audioSystem.playSparkleChime();

      if (checkWin("O")) {
        status.textContent = "Estelle Wins (⭐)!";
        status.style.color = "var(--accent-gold)";
        gameOver = true;
        audioSystem.playCelebrationChime();
      } else if (checkDraw()) {
        status.textContent = "It's a draw!";
        gameOver = true;
      } else {
        status.textContent = "Your turn (🌙)";
      }
    }

    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        const idx = cell.getAttribute("data-idx");
        if (board[idx] !== "" || gameOver) return;

        board[idx] = "X";
        cell.textContent = "🌙";
        cell.classList.add("x-cell");
        audioSystem.playSparkleChime();

        if (checkWin("X")) {
          status.textContent = "You win (🌙)!";
          status.style.color = "var(--accent-pink)";
          gameOver = true;
          audioSystem.playCelebrationChime();
        } else if (checkDraw()) {
          status.textContent = "It's a draw!";
          gameOver = true;
        } else {
          status.textContent = "Estelle is thinking...";
          setTimeout(aiMove, 600);
        }
      });
    });

    reset.addEventListener("click", () => {
      board = ["", "", "", "", "", "", "", "", ""];
      gameOver = false;
      status.textContent = "Your turn (🌙)";
      status.style.color = "#fff";
      cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "tictac-cell";
      });
    });
  }

  // --- GAME 5: STARRY GEM MATCH-3 ---
  function initStarryGemMatch3() {
    gameSandbox.innerHTML = `
      <div class="game-score-board">
        <div>Score: <span id="m3-score" style="color:var(--accent-gold);">0</span></div>
      </div>
      <div class="match3-grid" id="match3-grid"></div>
    `;

    const gridNode = document.getElementById("match3-grid");
    const scoreVal = document.getElementById("m3-score");

    let score = 0;
    let board = [];
    const gemTypes = ["⭐", "🌙", "🪐", "🌸", "💎"];

    function createBoard() {
      board = [];
      gridNode.innerHTML = "";
      for (let i = 0; i < 25; i++) {
        const randomGem = gemTypes[Math.floor(Math.random() * gemTypes.length)];
        board.push(randomGem);

        const gemCell = document.createElement("div");
        gemCell.className = "match3-gem";
        gemCell.id = `gem-${i}`;
        gemCell.setAttribute("data-idx", i);
        gemCell.innerHTML = randomGem;

        gemCell.addEventListener("click", () => handleGemClick(gemCell));
        gridNode.appendChild(gemCell);
      }
      checkAndResolveMatches(true);
    }

    let selectedGemNode = null;

    function handleGemClick(node) {
      if (selectedGemNode === null) {
        selectedGemNode = node;
        node.classList.add("selected");
        audioSystem.playSparkleChime();
      } else {
        const idx1 = parseInt(selectedGemNode.getAttribute("data-idx"));
        const idx2 = parseInt(node.getAttribute("data-idx"));

        const col1 = idx1 % 5;
        const row1 = Math.floor(idx1 / 5);
        const col2 = idx2 % 5;
        const row2 = Math.floor(idx2 / 5);

        const isAdjacent = (Math.abs(col1 - col2) + Math.abs(row1 - row2)) === 1;

        if (isAdjacent) {
          let temp = board[idx1];
          board[idx1] = board[idx2];
          board[idx2] = temp;

          selectedGemNode.innerHTML = board[idx1];
          node.innerHTML = board[idx2];
          audioSystem.playSparkleChime();

          const matchFound = checkAndResolveMatches(false);

          if (!matchFound) {
            setTimeout(() => {
              let t = board[idx1];
              board[idx1] = board[idx2];
              board[idx2] = t;
              selectedGemNode.innerHTML = board[idx1];
              node.innerHTML = board[idx2];
            }, 350);
          }
        }

        selectedGemNode.classList.remove("selected");
        selectedGemNode = null;
      }
    }

    function checkAndResolveMatches(silent = false) {
      let matchedIndices = new Set();

      // Check rows
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 3; c++) {
          const idx = r * 5 + c;
          if (board[idx] !== "" && board[idx] === board[idx+1] && board[idx] === board[idx+2]) {
            matchedIndices.add(idx);
            matchedIndices.add(idx+1);
            matchedIndices.add(idx+2);
          }
        }
      }

      // Check columns
      for (let c = 0; c < 5; c++) {
        for (let r = 0; r < 3; r++) {
          const idx = r * 5 + c;
          if (board[idx] !== "" && board[idx] === board[idx+5] && board[idx] === board[idx+10]) {
            matchedIndices.add(idx);
            matchedIndices.add(idx+5);
            matchedIndices.add(idx+10);
          }
        }
      }

      if (matchedIndices.size > 0) {
        if (!silent) {
          score += matchedIndices.size * 10;
          scoreVal.textContent = score;
          audioSystem.playCelebrationChime();
        }

        matchedIndices.forEach(idx => {
          board[idx] = "";
          const el = document.getElementById(`gem-${idx}`);
          if (el) el.innerHTML = "";
        });

        setTimeout(() => {
          for (let c = 0; c < 5; c++) {
            for (let r = 4; r >= 0; r--) {
              const idx = r * 5 + c;
              if (board[idx] === "") {
                let k = r - 1;
                while (k >= 0 && board[k*5 + c] === "") {
                  k--;
                }
                if (k >= 0) {
                  board[idx] = board[k*5 + c];
                  board[k*5 + c] = "";
                  
                  const elLower = document.getElementById(`gem-${idx}`);
                  const elUpper = document.getElementById(`gem-${k*5 + c}`);
                  if (elLower) elLower.innerHTML = board[idx];
                  if (elUpper) elUpper.innerHTML = "";
                }
              }
            }
          }

          for (let i = 0; i < 25; i++) {
            if (board[i] === "") {
              board[i] = gemTypes[Math.floor(Math.random() * gemTypes.length)];
              const el = document.getElementById(`gem-${i}`);
              if (el) el.innerHTML = board[i];
            }
          }

          checkAndResolveMatches(silent);
        }, 300);

        return true;
      }
      return false;
    }

    createBoard();
  }

  // --- COSMIC MOVIE HUB ENGINE ---
  const moviesData = [
    {
      id: "leo",
      title: "Leo",
      image: "assets/images/leo.jpeg",
      genre: "Action / Crime / Thriller",
      story: "Parthiban is a mild-mannered cafe owner in Himachal Pradesh who becomes a local hero, but his actions trigger a dark blast from the past, dragging him back into a brutal gangster world.",
      cast: "Vijay, Trisha, Sanjay Dutt, Arjun Sarja, Gautham Vasudev Menon",
      crew: "Director: Lokesh Kanagaraj | Music: Anirudh Ravichander | Producer: Seven Screen Studio"
    },
    {
      id: "amaran",
      title: "Amaran",
      image: "assets/images/amaran.jpeg",
      genre: "Action / Biography / Drama / War",
      story: "The inspiring true story of Major Mukund Varadarajan, an Indian Army officer who displayed immense valor during a counter-terrorism operation in Jammu and Kashmir.",
      cast: "Sivakarthikeyan, Sai Pallavi, Bhuvan Arora, Rahul Bose",
      crew: "Director: Rajkumar Periasamy | Music: G. V. Prakash Kumar | Producer: Raaj Kamal Films International"
    },
    {
      id: "dragon",
      title: "Dragon",
      image: "assets/images/dragon.jpeg",
      genre: "Comedy / Drama / Romance",
      story: "A fun, energetic youth drama centered around college life, ambition, and the wild, comedic misadventures of a group of close friends finding their path.",
      cast: "Pradeep Ranganathan, Anupama Parameswaran, Kayadu Lohar",
      crew: "Director: Ashwath Marimuthu | Music: Leon James | Producer: AGS Entertainment"
    },
    {
      id: "visaranai",
      title: "Visaranai",
      image: "assets/images/visaranai.jpeg",
      genre: "Crime / Drama / Thriller",
      story: "A hard-hitting police procedural drama that exposes police brutality, systemic corruption, and the tragic plight of innocent immigrant workers caught in a web of power.",
      cast: "Dinesh, Samuthirakani, Kishore, Anandhi, Murugadass",
      crew: "Director: Vetrimaaran | Music: G. V. Prakash Kumar | Producer: Wunderbar Films"
    },
    {
      id: "goat",
      title: "GOAT",
      image: "assets/images/goat.jpeg",
      genre: "Action / Sci-Fi / Thriller",
      story: "An elite counter-terrorism agent retired from active duty is forced back into the field when a deadly shadow from his past threatens his family and country.",
      cast: "Vijay, Prashanth, Prabhu Deva, Sneha, Laila, Meenakshi Chaudhary",
      crew: "Director: Venkat Prabhu | Music: Yuvan Shankar Raja | Producer: AGS Entertainment"
    },
    {
      id: "vidamuyarchi",
      title: "Vidamuyarchi",
      image: "assets/images/vidamuyarchi.jpeg",
      genre: "Action / Thriller",
      story: "A high-octane thriller about a man's relentless search for his wife who goes missing during a road trip, leading him into a web of conspiracy and danger.",
      cast: "Ajith Kumar, Trisha, Arjun Sarja, Aarav, Regina Cassandra",
      crew: "Director: Magizh Thirumeni | Music: Anirudh Ravichander | Producer: Lyca Productions"
    },
    {
      id: "mandela",
      title: "Mandela",
      image: "assets/images/mandela.jpeg",
      genre: "Comedy / Drama / Political",
      story: "In a divided village, a poor barber named Mandela suddenly becomes the single deciding vote in a local election, leading to a hilarious scramble for his favor.",
      cast: "Yogi Babu, Sheela Rajkumar, Sangili Murugan, G. M. Kumar",
      crew: "Director: Madonne Ashwin | Music: Bharath Sankar | Producer: YNOT Studios"
    },
    {
      id: "love_today",
      title: "Love Today",
      image: "assets/images/love_today.jpeg",
      genre: "Comedy / Romance / Drama",
      story: "A modern couple is challenged by the girl's father to swap their smartphones for 24 hours before marriage, leading to a chaotic, hilarious expose of secrets.",
      cast: "Pradeep Ranganathan, Ivana, Sathyaraj, Radhika Sarathkumar, Yogi Babu",
      crew: "Director: Pradeep Ranganathan | Music: Yuvan Shankar Raja | Producer: AGS Entertainment"
    },
    {
      id: "with_love",
      title: "With Love (2026)",
      image: "assets/images/with_love.jpeg",
      genre: "Romance / Drama",
      story: "Sathya and Monisha meet on a blind date and discover that they were schoolmates. As they revisit old memories and unspoken feelings, their unexpected meeting slowly brings them closer.",
      cast: "Hero: Abishan Jeevinth | Heroine: Anaswara Rajan",
      crew: "Director: Madhan"
    },
    {
      id: "doctor",
      title: "Doctor",
      image: "assets/images/doctor.jpeg",
      genre: "Action / Comedy / Crime",
      story: "An emotionless military doctor leads a quirky family on a rescue mission to track down and dismantle a human trafficking ring in a deadpan comedic style.",
      cast: "Sivakarthikeyan, Priyanka Arul Mohan, Vinay Rai, Yogi Babu, Redin Kingsley",
      crew: "Director: Nelson Dilipkumar | Music: Anirudh Ravichander | Producer: KJR Studios"
    },
    {
      id: "kaithi",
      title: "Kaithi",
      image: "assets/images/kaithi.jpeg",
      genre: "Action / Thriller",
      story: "An ex-convict who is eager to meet his daughter for the first time is intercepted by an inspector who needs his help to drive a truck full of unconscious cops to a hospital, while being chased by gang members.",
      cast: "Karthi, Narain, Arjun Das, George Maryan, Harish Uthaman",
      crew: "Director: Lokesh Kanagaraj | Music: Sam C. S. | Producer: Dream Warrior Pictures"
    },
    {
      id: "vikram_2",
      title: "Vikram 2",
      image: "assets/images/vikram_2.jpeg",
      genre: "Action / Crime / Thriller",
      story: "A special agent investigates a series of murders committed by a masked group of vigilantes, leading to a massive conflict involving a drug kingpin and a legendary black ops commander.",
      cast: "Kamal Haasan, Vijay Sethupathi, Fahadh Faasil, Kalidas Jayaram, Narain, Suriya (cameo)",
      crew: "Director: Lokesh Kanagaraj | Music: Anirudh Ravichander | Producer: Raaj Kamal Films International"
    },
    {
      id: "aayirathil_oruvan",
      title: "Aayirathil Oruvan",
      image: "assets/images/aayirathil_oruvan.jpeg",
      genre: "Action / Adventure / Fantasy",
      story: "An archaeologist, a government officer, and a group of coolies embark on a dangerous journey into the deserts of Vietnam to find a missing archaeologist and uncover the lost Chola civilization.",
      cast: "Karthi, Reemma Sen, Andrea Jeremiah, Parthiban",
      crew: "Director: Selvaraghavan | Music: G. V. Prakash Kumar | Producer: Dream Valley Corporation"
    },
    {
      id: "anniyan",
      title: "Anniyan",
      image: "assets/images/anniyan.jpeg",
      genre: "Action / Drama / Thriller",
      story: "An idealistic consumer protection advocate, frustrated by public apathy and corruption, develops multiple personality disorder, manifesting a vigilante persona who executes lawbreakers using ancient methods.",
      cast: "Vikram, Sadha, Nedumudi Venu, Vivek, Prakash Raj",
      crew: "Director: S. Shankar | Music: Harris Jayaraj | Producer: Oscar Films"
    },
    {
      id: "kaththi",
      title: "Kaththi",
      image: "assets/images/kaththi.jpeg",
      genre: "Action / Drama / Thriller",
      story: "Kathiresan, a criminal who escapes from prison, assumes the identity of his lookalike Jeeva, a social activist fighting a greedy corporation that is trying to seize agricultural land from farmers.",
      cast: "Vijay, Samantha, Neil Nitin Mukesh, Tota Roy Chowdhury",
      crew: "Director: A. R. Murugadoss | Music: Anirudh Ravichander | Producer: Lyca Productions"
    }
  ];

  function initMovieHub() {
    if (!moviesGrid) return;
    
    // Clear the grid to avoid duplicates
    moviesGrid.innerHTML = "";
    
    moviesData.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.setAttribute("data-movie-id", movie.id);
      
      card.innerHTML = `
        <div class="movie-card-img-wrap">
          <img class="movie-card-img" src="${movie.image}" alt="${movie.title}" loading="lazy">
        </div>
        <h4 class="movie-card-title">${movie.title}</h4>
      `;
      
      card.addEventListener("click", () => {
        audioSystem.playSparkleChime();
        showMovieDetails(movie);
      });
      
      // Hover custom cursor state binding
      if (!isTouchDevice && customCursor) {
        card.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
        card.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
      }
      
      moviesGrid.appendChild(card);
    });
  }

  function showMovieDetails(movie) {
    if (!movieDetailArea || !movieDetailsViewport || !movieDashboard) return;
    
    currentMovieTitle.textContent = movie.title;
    
    movieDetailArea.innerHTML = `
      <div class="movie-details-content">
        <div class="movie-details-poster-wrap" id="detail-poster-wrap">
          <img class="movie-details-poster" src="${movie.image}" alt="${movie.title}">
          <span class="click-4k-hint">🔍 CLICK PHOTO FOR 4K VIEW</span>
        </div>
        <div class="movie-details-info">
          <h2 class="movie-details-title">${movie.title}</h2>
          <h4 class="movie-details-story-title">Outline Story</h4>
          <p class="movie-details-story">${movie.story}</p>
          
          <div class="movie-details-meta">
            <div class="meta-block">
              <span class="meta-block-title">Genre</span>
              <p class="meta-block-val">${movie.genre}</p>
            </div>
            <div class="meta-block">
              <span class="meta-block-title">Starring Cast</span>
              <p class="meta-block-val">${movie.cast}</p>
            </div>
            <div class="meta-block">
              <span class="meta-block-title">Crew & Production</span>
              <p class="meta-block-val">${movie.crew}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Bind 4K Lightbox trigger to details poster wrapper
    const posterWrap = document.getElementById("detail-poster-wrap");
    if (posterWrap) {
      posterWrap.addEventListener("click", () => {
        open4KLightbox(movie.image);
      });
      
      if (!isTouchDevice && customCursor) {
        posterWrap.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
        posterWrap.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
      }
    }
    
    // Swap viewports
    movieDashboard.classList.add("hidden");
    movieDetailsViewport.classList.remove("hidden");
    
    // Scroll modal back to top
    movieHubOverlay.scrollTop = 0;
  }

  function open4KLightbox(imageSrc) {
    if (!movieLightbox || !lightboxImg) return;
    audioSystem.playCelebrationChime();
    
    lightboxImg.src = imageSrc;
    movieLightbox.classList.remove("hidden");
    
    // Spawn zoom background canvas star flares
    if (typeof spawnZoomingStar === "function") {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          spawnZoomingStar(cx + (Math.random() - 0.5) * 200, cy + (Math.random() - 0.5) * 200);
        }, i * 150);
      }
    }
  }

  function close4KLightbox() {
    if (!movieLightbox) return;
    audioSystem.playSparkleChime();
    movieLightbox.classList.add("hidden");
  }

  // --- MOVIE HUB BINDINGS ---
  if (btnMovieHub) {
    btnMovieHub.addEventListener("click", () => {
      audioSystem.playCelebrationChime();
      initMovieHub();
      movieDashboard.classList.remove("hidden");
      movieDetailsViewport.classList.add("hidden");
      movieHubOverlay.classList.add("show");
    });
  }

  if (closeMovieHubBtn) {
    closeMovieHubBtn.addEventListener("click", () => {
      audioSystem.playSparkleChime();
      movieHubOverlay.classList.remove("show");
    });
  }

  if (backToMovieDashboardBtn) {
    backToMovieDashboardBtn.addEventListener("click", () => {
      audioSystem.playSparkleChime();
      movieDetailsViewport.classList.add("hidden");
      movieDashboard.classList.remove("hidden");
    });
  }

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener("click", close4KLightbox);
  }

  if (movieLightbox) {
    movieLightbox.addEventListener("click", (e) => {
      if (e.target === movieLightbox) {
        close4KLightbox();
      }
    });
  }

  // --- MOVIE MESSAGE BINDINGS ---
  if (btnMovieMessage) {
    btnMovieMessage.addEventListener("click", () => {
      audioSystem.playCelebrationChime();
      movieMessageOverlay.classList.remove("hidden");
    });
  }

  const closeMovieMessage = () => {
    audioSystem.playSparkleChime();
    movieMessageOverlay.classList.add("hidden");
  };

  if (closeMovieMessageBtn) {
    closeMovieMessageBtn.addEventListener("click", closeMovieMessage);
  }

  if (movieMessageOverlay) {
    movieMessageOverlay.addEventListener("click", (e) => {
      if (e.target === movieMessageOverlay) {
        closeMovieMessage();
      }
    });
  }

  // --- 12. EVENT BINDINGS & LIFECYCLE ---
  soundToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    audioSystem.toggleMute();
  });

  const unlockAudio = () => {
    audioSystem.init();
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };

  window.addEventListener("click", unlockAudio);
  window.addEventListener("keydown", unlockAudio);
  window.addEventListener("touchstart", unlockAudio);

  window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();
    updateAndDrawStarfield();
  });
  
  window.addEventListener("resize", resizeCanvas);

  // Custom Cursor
  if (!isTouchDevice && customCursor) {
    customCursor.style.display = "block";
    
    window.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    });

    const hoverables = [
      soundToggle, sparkleBtn, backBtn, btnGameHub, closeHubBtn, backToDashboardBtn,
      btnMovieHub, closeMovieHubBtn, backToMovieDashboardBtn, closeLightboxBtn,
      btnMovieMessage, closeMovieMessageBtn
    ];
    hoverables.forEach(btn => {
      if (btn) {
        btn.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
        btn.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
      }
    });
    
    cards.forEach(card => {
      card.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
      card.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
    });

    gameCards.forEach(card => {
      card.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
      card.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
    });
  }

  // --- 13. BACK BUTTON NAVIGATION ---
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      audioSystem.stopChimeSynth();
      cleanupActiveGame();
      
      backBtn.classList.add("pressed");
      setTimeout(() => {
        window.location.href = "page3.html";
      }, 150);
    });
  }

})();
