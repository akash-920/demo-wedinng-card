/**
 * BALSHANKAR & MOHINI - ROYAL ENGAGEMENT & RING CEREMONY INVITATION
 * Interactive Logic, WhatsApp Redirect (8423791320) & Indian Festive Music
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Lock scroll initially for royal curtain screen
  document.body.classList.add("curtain-locked");

  initCurtainReveal();
  initCountdown();
  initIndianCelebrationMusic();
  initPetals();
  initRSVP();
  initShare();
  initScrollReveal();
});

/* ==========================================================================
   1. ROYAL CURTAIN REVEAL & OPENING
   ========================================================================== */
function initCurtainReveal() {
  const openBtn = document.getElementById("open-card-btn");
  const overlay = document.getElementById("curtain-overlay");

  if (!openBtn || !overlay) return;

  openBtn.addEventListener("click", () => {
    // Add opened animation
    overlay.classList.add("opened");

    // Start celebratory Indian engagement music
    startCelebrationMusic();

    // Enable petal shower
    startPetalsAnimation();

    // Unlock body scroll after curtain begins parting
    setTimeout(() => {
      document.body.classList.remove("curtain-locked");
    }, 1200);

    // Hide curtain overlay completely after animation completes
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 2200);
  });
}

/* ==========================================================================
   2. LIVE COUNTDOWN TIMER (TARGET: 29 NOV 2026, 6:00 PM IST)
   ========================================================================== */
function initCountdown() {
  // Engagement Date: 29 November 2026 at 18:00:00 IST
  const targetDate = new Date("2026-11-29T18:00:00+05:30").getTime();

  function update() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");

    // Hero Countdown elements
    const hDays = document.getElementById("cd-days");
    const hHours = document.getElementById("cd-hours");
    const hMins = document.getElementById("cd-mins");
    const hSecs = document.getElementById("cd-secs");

    if (hDays) hDays.textContent = pad(days);
    if (hHours) hHours.textContent = pad(hours);
    if (hMins) hMins.textContent = pad(mins);
    if (hSecs) hSecs.textContent = pad(secs);

    // Section Countdown elements
    const sDays = document.getElementById("scd-days");
    const sHours = document.getElementById("scd-hours");
    const sMins = document.getElementById("scd-mins");
    const sSecs = document.getElementById("scd-secs");

    if (sDays) sDays.textContent = pad(days);
    if (sHours) sHours.textContent = pad(hours);
    if (sMins) sMins.textContent = pad(mins);
    if (sSecs) sSecs.textContent = pad(secs);
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. FALLING PETALS SHOWER
   ========================================================================== */
const petalPalettes = [
  "radial-gradient(circle at 30% 30%, #f090a8, #c2185b)",
  "radial-gradient(circle at 30% 30%, #f7c8d8, #e26a8a)",
  "radial-gradient(circle at 30% 30%, #f6d2dc, #d85a7d)",
  "radial-gradient(circle at 30% 30%, #f3e3b3, #c9a14a)",
  "radial-gradient(circle at 30% 30%, #ffe6c2, #d98a3d)"
];

function initPetals() {
  const container = document.getElementById("petals-container");
  if (!container) return;

  const count = 28;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";

    const size = 11 + Math.random() * 16;
    const bg = petalPalettes[i % petalPalettes.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 14;
    const duration = 10 + Math.random() * 12;
    const sway = `${Math.round(Math.random() * 140 - 70)}px`;
    const opacity = (0.65 + Math.random() * 0.3).toFixed(2);

    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.2}px`;
    petal.style.background = bg;
    petal.style.animationDelay = `${delay}s`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.setProperty("--petal-sway", sway);
    petal.style.setProperty("--petal-opacity", opacity);

    container.appendChild(petal);
  }
}

function startPetalsAnimation() {
  const container = document.getElementById("petals-container");
  if (container) {
    container.style.display = "block";
  }
}

/* ==========================================================================
   4. NEW INDIAN CELEBRATION MUSIC (BANSURI & SANTOOR - RAAG PAHADI / BHUPALI)
   Sweet, romantic Indian celebratory engagement melody
   ========================================================================== */
let audioCtx = null;
let isPlaying = false;
let masterGain = null;
let melodyInterval = null;
let step = 0;

// Melodic phrases in romantic Raag Pahadi / Bhupali:
// Sa (C4: 261.63), Re (D4: 293.66), Ga (E4: 329.63), Pa (G4: 392.00), Dha (A4: 440.00), Sa' (C5: 523.25)
const melodicPhrases = [
  // Phrase 1: Sweet rising melody
  [261.63, 293.66, 329.63, 392.00],
  // Phrase 2: Joyful ornamentation
  [392.00, 440.00, 523.25, 440.00, 392.00],
  // Phrase 3: Romantic gentle glide
  [329.63, 392.00, 329.63, 293.66, 261.63],
  // Phrase 4: Playful engagement flourish
  [293.66, 329.63, 440.00, 392.00, 329.63, 261.63],
  // Phrase 5: Celebratory peak
  [392.00, 523.25, 587.33, 523.25, 440.00]
];

function initIndianCelebrationMusic() {
  const musicToggle = document.getElementById("music-toggle");
  if (!musicToggle) return;

  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      stopCelebrationMusic();
    } else {
      startCelebrationMusic();
    }
  });
}

function setupAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function startCelebrationMusic() {
  try {
    setupAudioContext();
    if (!audioCtx) return;

    isPlaying = true;
    const toggleBtn = document.getElementById("music-toggle");
    if (toggleBtn) toggleBtn.classList.add("playing");

    // Fade in volume
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.24, audioCtx.currentTime + 1.2);

    // Warm Tanpura Drone base (C3 = 130.81Hz, G3 = 196.00Hz, C4 = 261.63Hz)
    playTanpuraHarmonic(130.81, 0.05); // Low Sa
    playTanpuraHarmonic(196.00, 0.04); // Pa
    playTanpuraHarmonic(261.63, 0.03); // Middle Sa

    // Play initial flute flourish
    playNextPhrase();

    // Loop through romantic phrases every 3.2 seconds
    melodyInterval = setInterval(() => {
      if (!isPlaying || !audioCtx) return;
      playNextPhrase();
    }, 3200);

  } catch (e) {
    console.warn("Audio Context init deferred:", e);
  }
}

function playNextPhrase() {
  if (!audioCtx) return;
  const phrase = melodicPhrases[step % melodicPhrases.length];
  step++;

  phrase.forEach((freq, idx) => {
    const delay = idx * 0.42;
    // Play warm bamboo bansuri tone
    playBansuriNote(freq, delay);

    // Add delicate santoor chime on accent notes
    if (idx === 0 || idx === phrase.length - 1) {
      playSantoorPluck(freq * 2, delay + 0.02);
    }
  });
}

// Warm Bansuri (Bamboo Flute) synthesis
function playBansuriNote(freq, delay) {
  if (!audioCtx) return;
  const startTime = audioCtx.currentTime + delay;
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const noteGain = audioCtx.createGain();

  // Flute warmth: Triangle + Sine mix with soft vibrato
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(freq, startTime);

  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(freq, startTime);

  // Gentle breath vibrato
  const vibrato = audioCtx.createOscillator();
  const vibratoGain = audioCtx.createGain();
  vibrato.frequency.setValueAtTime(5.2, startTime); // 5.2 Hz vibrato
  vibratoGain.gain.setValueAtTime(3.5, startTime);
  vibrato.connect(vibratoGain);
  vibratoGain.connect(osc1.frequency);
  vibratoGain.connect(osc2.frequency);
  vibrato.start(startTime);
  vibrato.stop(startTime + 1.8);

  // Soft envelope with gradual release
  noteGain.gain.setValueAtTime(0.0001, startTime);
  noteGain.gain.linearRampToValueAtTime(0.09, startTime + 0.18);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

  osc1.connect(noteGain);
  osc2.connect(noteGain);
  noteGain.connect(masterGain);

  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + 1.9);
  osc2.stop(startTime + 1.9);
}

// Delicate Santoor / Sitar chime harmonic
function playSantoorPluck(freq, delay) {
  if (!audioCtx) return;
  const startTime = audioCtx.currentTime + delay;
  const pluck = audioCtx.createOscillator();
  const pluckGain = audioCtx.createGain();

  pluck.type = "sine";
  pluck.frequency.setValueAtTime(freq, startTime);

  pluckGain.gain.setValueAtTime(0.04, startTime);
  pluckGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.9);

  pluck.connect(pluckGain);
  pluckGain.connect(masterGain);

  pluck.start(startTime);
  pluck.stop(startTime + 0.95);
}

// Continuous Tanpura Drone
function playTanpuraHarmonic(freq, volume) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const droneGain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  droneGain.gain.setValueAtTime(volume, audioCtx.currentTime);

  osc.connect(droneGain);
  droneGain.connect(masterGain);
  osc.start();
}

function stopCelebrationMusic() {
  if (!audioCtx) return;
  isPlaying = false;
  const toggleBtn = document.getElementById("music-toggle");
  if (toggleBtn) toggleBtn.classList.remove("playing");

  if (melodyInterval) {
    clearInterval(melodyInterval);
    melodyInterval = null;
  }

  // Fade out smoothly
  masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
}

/* ==========================================================================
   5. INTERACTIVE RSVP FORM & WHATSAPP INTEGRATION (PHONE: 8423791320)
   ========================================================================== */
function initRSVP() {
  const form = document.getElementById("rsvp-form");
  const radioPills = document.querySelectorAll(".radio-pill");
  const minusBtn = document.getElementById("guest-minus");
  const plusBtn = document.getElementById("guest-plus");
  const countEl = document.getElementById("guest-count");

  let guestCount = 1;

  // Radio button toggle active class
  radioPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      radioPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });

  // Guest Counter (+ / -)
  if (minusBtn && plusBtn && countEl) {
    minusBtn.addEventListener("click", () => {
      if (guestCount > 1) {
        guestCount--;
        countEl.textContent = guestCount;
      }
    });

    plusBtn.addEventListener("click", () => {
      if (guestCount < 10) {
        guestCount++;
        countEl.textContent = guestCount;
      }
    });
  }

  // Handle Form Submit -> WhatsApp to 8423791320
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("guest-name");
      const wishesInput = document.getElementById("guest-wishes");
      const attendanceInput = document.querySelector('input[name="attendance"]:checked');

      const name = nameInput ? nameInput.value.trim() : "";
      const attendance = attendanceInput ? attendanceInput.value : "Joyfully Accept";
      const wishes = wishesInput ? wishesInput.value.trim() : "";

      if (!name) return;

      // Format WhatsApp Message for Engagement Ceremony
      const messageLines = [
        `*Engagement Ceremony RSVP - Balshankar & Mohini*`,
        ``,
        `*Guest Name:* ${name}`,
        `*Attendance:* ${attendance}`,
        `*Number of Guests:* ${guestCount}`,
      ];

      if (wishes) {
        messageLines.push(`*Wishes / Blessings:* ${wishes}`);
      }

      messageLines.push(``);
      messageLines.push(`_Excited to celebrate the Ring Ceremony on 29 Nov 2026 at Mankameshwar Palace, Kanpur!_`);

      const whatsappText = encodeURIComponent(messageLines.join("\n"));
      const targetPhone = "918423791320"; // User specified phone number 8423791320
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${whatsappText}`;

      // Open WhatsApp directly
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // Show toast confirmation
      showToast("Redirecting to WhatsApp (+91 8423791320)...");
    });
  }
}

/* ==========================================================================
   6. SHARE & CLIPBOARD TOAST
   ========================================================================== */
function initShare() {
  const shareBtn = document.getElementById("share-btn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: "Balshankar & Mohini Engagement Invitation",
      text: "You're cordially invited to celebrate the Engagement & Ring Ceremony of Balshankar & Mohini on 29th November 2026 at Mankameshwar Palace, Damodar Nagar, Kanpur.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard if share cancelled
      }
    }

    // Fallback: Copy URL to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Engagement invitation link copied!");
    } catch (e) {
      showToast("Link: " + window.location.href);
    }
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* ==========================================================================
   7. LIGHTBOX MODAL FOR GALLERY
   ========================================================================== */
window.openLightbox = function (imageSrc, caption) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");

  if (!modal || !img) return;

  img.src = imageSrc;
  if (cap) cap.textContent = caption || "";
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeLightbox = function () {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
};

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.closeLightbox();
  }
});

/* ==========================================================================
   8. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}
