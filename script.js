/* =========================
   KAZA'S AI MAIN SCRIPT
========================= */


/* ===== MOBILE BACK ===== */

window.addEventListener("popstate", function () {

  window.location.href = "index.html";

});

history.pushState({}, "");


/* =========================
   QUIZ LIVE TIMER
========================= */

let countdown = 180;

const timerElement =
document.getElementById("timer");

const startButton =
document.getElementById("startQuiz");

function updateTimer(){

  if(timerElement){

    let minutes =
    Math.floor(countdown / 60);

    let seconds =
    countdown % 60;

    seconds =
    seconds < 10
    ? "0" + seconds
    : seconds;

    timerElement.innerHTML =
    minutes + ":" + seconds;

  }

  countdown--;

  if(countdown < 0){

    clearInterval(timerInterval);

    if(startButton){

      startButton.disabled = true;

      startButton.innerHTML =
      "Quiz terminé ❌";

      startButton.style.opacity = "0.5";

    }

  }

}

const timerInterval =
setInterval(updateTimer, 1000);


/* =========================
   QUIZ START
========================= */

if(startButton){

  startButton.addEventListener("click", function(){

    alert(
      "Le Quiz Mondial commence 🚀"
    );

    window.location.href =
    "quiz.html";

  });

}


/* =========================
   USER POINTS SYSTEM
========================= */

let userPoints =
localStorage.getItem("userPoints");

if(!userPoints){

  localStorage.setItem(
    "userPoints",
    0
  );

}

function addPoints(points){

  let currentPoints =
  parseInt(
    localStorage.getItem("userPoints")
  );

  currentPoints += points;

  localStorage.setItem(
    "userPoints",
    currentPoints
  );

  updatePoints();

}


/* =========================
   UPDATE POINTS
========================= */

function updatePoints(){

  const pointsElement =
  document.getElementById("points");

  if(pointsElement){

    pointsElement.innerHTML =
    localStorage.getItem("userPoints");

  }

}

updatePoints();


/* =========================
   USER LEVEL SYSTEM
========================= */

function getLevel(points){

  if(points >= 10000){

    return "Génie Absolu ⚡";

  }

  else if(points >= 5000){

    return "Génie 🧠";

  }

  else if(points >= 1500){

    return "Expert 🌍";

  }

  else if(points >= 500){

    return "Intelligent ⭐";

  }

  else{

    return "Débutant";

  }

}


/* =========================
   UPDATE LEVEL
========================= */

function updateLevel(){

  const levelElement =
  document.getElementById("level");

  if(levelElement){

    let points =
    parseInt(
      localStorage.getItem(
        "userPoints"
      )
    );

    levelElement.innerHTML =
    getLevel(points);

  }

}

updateLevel();


/* =========================
   QUIZ ANSWERS
========================= */

const answerButtons =
document.querySelectorAll(".answer-btn");

answerButtons.forEach(button => {

  button.addEventListener("click", () => {

    const correct =
    button.dataset.correct;

    if(correct === "true"){

      addPoints(100);

      button.style.background =
      "#22c55e";

      alert(
        "Bonne réponse ✅ +100 points"
      );

    }

    else{

      button.style.background =
      "#ef4444";

      alert(
        "Mauvaise réponse ❌"
      );

    }

  });

});


/* =========================
   GLOBAL LEADERBOARD
========================= */

const leaderboard =
JSON.parse(
  localStorage.getItem(
    "leaderboard"
  )
) || [];

function savePlayer(name, points){

  leaderboard.push({

    name:name,
    points:points

  });

  leaderboard.sort(
    (a,b) => b.points - a.points
  );

  localStorage.setItem(
    "leaderboard",
    JSON.stringify(leaderboard)
  );

}

function displayLeaderboard(){

  const leaderboardContainer =
  document.getElementById(
    "leaderboard"
  );

  if(leaderboardContainer){

    leaderboardContainer.innerHTML = "";

    leaderboard.forEach((player,index)=>{

      leaderboardContainer.innerHTML += `

      <div class="card">

        <h3>
        #${index + 1}
        ${player.name}
        </h3>

        <p>
        ⭐ ${player.points} points
        </p>

      </div>

      `;

    });

  }

}

displayLeaderboard();


/* =========================
   LIVE QUIZ ACCESS
========================= */

function lockQuiz(){

  const quizContainer =
  document.getElementById(
    "quizContainer"
  );

  if(quizContainer){

    quizContainer.innerHTML = `

    <div class="card">

      <h2>
      Quiz indisponible ❌
      </h2>

      <p>
      Vous avez raté le quiz mondial.
      </p>

    </div>

    `;

  }

}


/* =========================
   NOTIFICATIONS DEMO
========================= */

function notifyUser(message){

  if(Notification.permission ===
  "granted"){

    new Notification(message);

  }

}

if("Notification" in window){

  Notification.requestPermission();

}


/* =========================
   QUIZ ALERT
========================= */

setTimeout(()=>{

  notifyUser(
    "Le Quiz Mondial commence bientôt 🌍"
  );

},10000);


/* =========================
   FUTURE FIREBASE
========================= */

// Firebase live quiz,
// leaderboard,
// accounts,
// notifications,
// real-time data
// seront ajoutés ici 🔥
/* =========================================
   KAZA'S AI - SCRIPT.JS
========================================= */


/* ===== MENU MOBILE FUTUR ===== */

const nav = document.querySelector("nav");

const menuBtn = document.createElement("div");

menuBtn.innerHTML = "☰";

menuBtn.style.fontSize = "28px";
menuBtn.style.cursor = "pointer";
menuBtn.style.color = "#22c55e";
menuBtn.style.display = "none";

document.querySelector("header")
.appendChild(menuBtn);

menuBtn.addEventListener("click", () => {

  nav.classList.toggle("active");

});


/* ===== RESPONSIVE MENU ===== */

function checkScreen(){

  if(window.innerWidth < 768){

    menuBtn.style.display = "block";

    nav.style.display = "none";

  }

  else{

    menuBtn.style.display = "none";

    nav.style.display = "flex";

  }

}

checkScreen();

window.addEventListener("resize", checkScreen);

menuBtn.addEventListener("click", () => {

  if(nav.style.display === "none"){

    nav.style.display = "flex";
    nav.style.flexDirection = "column";

  }

  else{

    nav.style.display = "none";

  }

});


/* ===== ANIMATION SCROLL ===== */

const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {

  cards.forEach(card => {

    const position =
    card.getBoundingClientRect().top;

    const screen =
    window.innerHeight;

    if(position < screen - 100){

      card.style.opacity = "1";

      card.style.transform =
      "translateY(0px)";

    }

  });

});


cards.forEach(card => {

  card.style.opacity = "0";

  card.style.transform =
  "translateY(50px)";

  card.style.transition =
  "0.7s";

});


/* ===== HERO GLOW EFFECT ===== */

const hero = document.querySelector(".hero");

if(hero){

  hero.addEventListener("mousemove", e => {

    hero.style.background =
    `
    radial-gradient(
    circle at ${e.clientX}px ${e.clientY}px,
    rgba(34,197,94,0.15),
    transparent 30%
    )
    `;

  });

}


/* ===== QUIZ COUNTDOWN ===== */

const countdown = document.getElementById("countdown");

const startBtn =
document.getElementById("startQuiz");

if(countdown){

  let time = 180;

  const timer = setInterval(() => {

    const minutes =
    Math.floor(time / 60);

    const seconds =
    time % 60;

    countdown.innerHTML =
    `
    ${minutes} :
    ${seconds < 10 ? "0" : ""}
    ${seconds}
    `;

    time--;

    if(time < 0){

      clearInterval(timer);

      countdown.innerHTML =
      "Quiz Terminé ⛔";

      if(startBtn){

        startBtn.disabled = true;

        startBtn.innerHTML =
        "Quiz Manqué";

        startBtn.style.opacity = "0.5";

      }

    }

  }, 1000);

}


/* ===== QUIZ START ===== */

if(startBtn){

  startBtn.addEventListener("click", () => {

    alert(
    "Le Quiz Mondial Commence 🚀"
    );

    window.location.href =
    "quiz.html";

  });

}


/* ===== FAKE LIVE PLAYERS ===== */

const livePlayers =
document.getElementById("livePlayers");

if(livePlayers){

  let players = 120;

  setInterval(() => {

    players +=
    Math.floor(Math.random() * 5);

    livePlayers.innerHTML =
    players;

  }, 3000);

}


/* ===== PROFILE LEVEL SYSTEM ===== */

const points =
document.getElementById("userPoints");

const level =
document.getElementById("userLevel");

if(points && level){

  let score = 0;

  score = localStorage.getItem("points") || 0;

  points.innerHTML = score;

  if(score >= 10000){

    level.innerHTML =
    "Génie Absolu ⚡";

  }

  else if(score >= 5000){

    level.innerHTML =
    "Génie";

  }

  else if(score >= 1500){

    level.innerHTML =
    "Expert";

  }

  else if(score >= 500){

    level.innerHTML =
    "Intelligent";

  }

  else{

    level.innerHTML =
    "Débutant";

  }

}


/* ===== SAVE POINTS ===== */

function addPoints(value){

  let current =
  localStorage.getItem("points") || 0;

  current =
  parseInt(current) + value;

  localStorage.setItem(
  "points",
  current
  );

}


/* ===== QUIZ ANSWERS ===== */

const answers =
document.querySelectorAll(".answer");

answers.forEach(answer => {

  answer.addEventListener("click", () => {

    if(answer.dataset.correct === "true"){

      answer.style.background =
      "#22c55e";

      addPoints(100);

    }

    else{

      answer.style.background =
      "red";

    }

  });

});


/* ===== LIVE NOTIFICATION ===== */

function showNotification(text){

  const notif =
  document.createElement("div");

  notif.innerHTML = text;

  notif.style.position = "fixed";
  notif.style.bottom = "30px";
  notif.style.right = "30px";

  notif.style.background =
  "#22c55e";

  notif.style.color = "black";

  notif.style.padding = "15px 25px";

  notif.style.borderRadius = "15px";

  notif.style.zIndex = "9999";

  notif.style.fontWeight = "bold";

  notif.style.boxShadow =
  "0 10px 30px rgba(0,0,0,0.4)";

  document.body.appendChild(notif);

  setTimeout(() => {

    notif.remove();

  }, 4000);

}


/* ===== AUTO QUIZ ALERT ===== */

setTimeout(() => {

  showNotification(
  "🌍 Nouveau Quiz Mondial dans 5 minutes"
  );

}, 5000);


/* ===== RETURN BUTTON ===== */

window.addEventListener(
"popstate",
function(){

  window.location.href =
  "index.html";

});

history.pushState({}, "");


/* ===== FUTURE FIREBASE READY ===== */

console.log(
"Kaza's AI ⚡ Firebase Ready"
);