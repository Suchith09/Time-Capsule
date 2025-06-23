// Updated `script.js` with 🎉 Confetti Effect, ⏳ Countdown Timer Animation, and 🔐 Locker Effect

// Load this script after your HTML content is loaded

document.addEventListener("DOMContentLoaded", function () {
  const vaultForm = document.getElementById("vault-form");
  const viewBtn = document.getElementById("view-vault-btn");
  const clearBtn = document.getElementById("clear-vault-btn");
  const display = document.getElementById("vault-display");

  // Lock Message
  vaultForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const memoryTitle = document.getElementById("memory-title").value;
    const memoryText = document.getElementById("memory-text").value;
    const openOnDate = new Date(document.getElementById("open-date").value);
    const lockKey = document.getElementById("lock-key").value;

    const entry = {
      memoryTitle,
      memoryText: lockKey ? CryptoJS.AES.encrypt(memoryText, lockKey).toString() : memoryText,
      openTimestamp: openOnDate.getTime(),
      hasPassword: !!lockKey,
    };

    const oldEntries = JSON.parse(localStorage.getItem("vaultEntries") || "[]");
    oldEntries.push(entry);
    localStorage.setItem("vaultEntries", JSON.stringify(oldEntries));

    alert(`🔒 Locked! Will unlock on ${openOnDate.toDateString()}`);
    vaultForm.reset();
  });

  // View Vault Entries
  viewBtn.addEventListener("click", function () {
    display.innerHTML = "";
    const entries = JSON.parse(localStorage.getItem("vaultEntries") || "[]");
    const now = Date.now();

    entries.forEach((entry) => {
      const card = document.createElement("div");
      card.classList.add("vault-card");

      const isReady = now >= entry.openTimestamp;

      if (isReady) {
        if (entry.hasPassword) {
          const userKey = prompt(`🔐 Enter password for "${entry.memoryTitle}"`);
          try {
            const decrypted = CryptoJS.AES.decrypt(entry.memoryText, userKey).toString(CryptoJS.enc.Utf8);
            card.innerHTML = `<h3>${entry.memoryTitle}</h3><p>${decrypted || "❌ Wrong password!"}</p>`;
            if (decrypted) showConfetti();
          } catch {
            card.innerHTML = `<h3>${entry.memoryTitle}</h3><p>⚠️ Error decrypting.</p>`;
          }
        } else {
          card.innerHTML = `<h3>${entry.memoryTitle}</h3><p>${entry.memoryText}</p>`;
          showConfetti();
        }
      } else {
        const timeLeft = entry.openTimestamp - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((timeLeft / (1000 * 60)) % 60);
        card.innerHTML = `
          <h3>${entry.memoryTitle}</h3>
          <p class="countdown">⏳ Unlocks in ${days}d ${hours}h ${mins}m</p>
        `;
        animateCountdown(card.querySelector(".countdown"));
      }

      display.appendChild(card);
    });
  });

  // Clear All
  clearBtn.addEventListener("click", () => {
    if (confirm("Clear all saved capsules?")) {
      localStorage.removeItem("vaultEntries");
      display.innerHTML = "";
      alert("🗑️ All capsules cleared!");
    }
  });

  // Confetti 🎉
  function showConfetti() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.id = "confetti-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const pieces = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 6 + 4,
      d: Math.random() * 40 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.y += Math.sin(p.d) + 1;
        if (p.y > window.innerHeight) p.y = 0;
      });
      requestAnimationFrame(draw);
    }

    draw();
    setTimeout(() => document.body.removeChild(canvas), 3000);
  }

  // Animate Countdown
  function animateCountdown(element) {
    element.style.opacity = 0;
    element.style.transform = "translateY(10px)";
    setTimeout(() => {
      element.style.transition = "all 0.6s ease-in-out";
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }, 100);
  }
});
