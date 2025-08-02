# 🌌 Digital Time Capsule Web App

A creative, personal, and secure web app to store future messages — think of it like a letter to your future self! Users can write messages, choose an unlock date, and optionally add password protection. When the unlock date arrives, they can view and decrypt their saved messages.

---

## 🔐 Features

-  Add title, message, and select a future unlock date
-  Optional password protection using AES encryption (via CryptoJS)
-  Live countdown timer for each message
-  Confetti animation on successful unlock
-  Background image and clean UI styling
-  Uses `localStorage` (data stored in browser only — no backend)

---

##  Tech Stack

- HTML5
- CSS3 (Flexbox, Animations, Responsive Design)
- JavaScript (DOM manipulation, localStorage, CryptoJS)

---

##  How It Works

1. **Write your memory:** Title, message, and unlock date
2. **Optionally add a password** for encryption
3. Click **" Lock It Away"** to store
4. View locked messages by clicking **" View My Capsules"**
5. When the unlock date is reached, messages will be decryptable

---

## 📁 Project Structure

🔧 Setup Instructions

    Clone this repo or download the .zip

    Open index.html in a browser (Chrome recommended)

    No server or backend required

    All data is stored locally in the browser’s storage

 Notes:

    Confetti: Uses simple JS canvas animation

    Encryption: Uses CryptoJS.AES for basic password protection

    Data Safety: All messages are stored in browser only

 Credits:

    Built with 💖 using HTML, CSS, and JavaScript by [Suchith]

 Live Demo (if hosted on GitHub Pages):



