// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // Close nav when clicking a link on mobile
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

// Active nav highlight on scroll
const sections = Array.from(document.querySelectorAll("section[id]"));
const navLinks = Array.from(document.querySelectorAll(".nav__link"));

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  { root: null, threshold: 0.35 }
);

sections.forEach((section) => observer.observe(section));

// Project filters
const chips = Array.from(document.querySelectorAll(".chip"));
const projects = Array.from(document.querySelectorAll(".project"));

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;
    projects.forEach((p) => {
      const tags = (p.dataset.tags || "").split(",").map((t) => t.trim());
      const show = filter === "all" || tags.includes(filter);
      p.style.display = show ? "" : "none";
    });
  });
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Add event listener for skillnode buttons to show a popup
/*const skillNodes = document.querySelectorAll(".skillnode");*/
const academicNodes = document.querySelectorAll("#academic-background .skillnode.academic");


// Academic details for popups
const academicDetails = {
  jackson: "I went to Jackson High School in Canton, Ohio between 2014 and 2018. In that time, I was involved in National Honors Society, National Honors History Society, Business Club, Key Club, Spanish Club, ACT Tutor, Basketball, Track, and Cross Country. \n\n I liked to stay busy and involved in High School, often with the addition of AP and College Credit classes. I graduated first in my class and was fortunate to receive a scholarship to Ohio State University, where my next chapter began.",
  osu: "At Ohio State, I pursued degrees in Accounting and Information Systems where I graduated summa cum laude, top 5% of my college, and with honors distinction. The accounting and information systems degrees provided a unique opportunity to blend technical and business skills, which helped me discover my passion for data science and analysis. \n\nDuring my time at Ohio State, I was involved in the honors business cohort, a financial coach for other OSU students, and the vice president of a greek organization. The experiences and skills I developed at Ohio State laid a strong foundation for a career at Progressive.",
  uiuc: "In my first rotation in the Analyst Development Program at Progressive, I had realized that I wanted to pursue a career in Data Science. I decided that a master's degree in Computer Science, along with machine learning passion projects on the side, would be the best way to build the skills and credentials necessary to make that transition. \n\nI have one class left to complete my degree where I am currently sitting at a 4.0 GPA. My coursework has spanned machine learning, deep learning, natural language processing, data mining, algorithms, statistics, cloud computing, and more. The skills and knowledge I have gained through this program have already had a significant impact on my work at Progressive and will continue to do so as I finish up the program and beyond."
};

academicNodes.forEach((node) => {
  node.addEventListener("click", () => {
    let popupContent;
    const imgSrc = node.querySelector("img").getAttribute("src");
    if (imgSrc.includes("jackson")) {
      popupContent = academicDetails.jackson;
    } else if (imgSrc.includes("osu")) {
      popupContent = academicDetails.osu;
    } else if (imgSrc.includes("uiuc")) {
      popupContent = academicDetails.uiuc;
    } else {
      popupContent = "Details not found.";
    }
    popupContent = popupContent.replace(/\n/g, "<br>");
    const popupImage = node.querySelector("img").outerHTML;

    // Create backdrop
    const backdrop = document.createElement("div");
    backdrop.classList.add("popup-backdrop");

    // Create popup container
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
      <div class="popup__content">
        <button class="popup__close" aria-label="Close popup">&times;</button>
        <div class="popup__image">${popupImage}</div>
        <p>${popupContent}</p>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(popup);

    popup.querySelector(".popup__close").addEventListener("click", () => {
      popup.remove();
      backdrop.remove();
    });
    backdrop.addEventListener("click", () => {
      popup.remove();
      backdrop.remove();
    });
  });
});

// Expand/collapse experience details
const expandArrows = document.querySelectorAll('.expand-arrow');
expandArrows.forEach(arrow => {
  arrow.addEventListener('click', function() {
    const bullets = this.parentElement.parentElement.querySelector('.bullets');
    if (bullets.style.display === 'none' || !bullets.style.display) {
      bullets.style.display = 'block';
      this.innerHTML = '&#9650;'; // Up arrow
    } else {
      bullets.style.display = 'none';
      this.innerHTML = '&#9660;'; // Down arrow
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.project-flip');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });

});

// Change hover text to tap on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.querySelectorAll('.hover-text').forEach(el => {
    el.textContent = "Tap a node to view details";
  });
}

/* =========================
   Mobile tap support for Technical Expertis
   ========================= */
(function () {
  const isPhone = window.matchMedia("(max-width: 720px)").matches;
  if (!isPhone) return;

  const techSection = document.querySelector("#skill-line");
  if (!techSection) return;

  const techNodes = techSection.querySelectorAll(".skillnode");

  techNodes.forEach((node) => {
    node.addEventListener("click", function () {
      const tip = this.getAttribute("data-tip");
      const img = this.querySelector("img");
      const imgSrc = img ? img.getAttribute("src") : "";
      const imgAlt = img ? img.getAttribute("alt") : "Skill";

      if (!tip) return;

      const oldPopup = document.querySelector(".popup");
      const oldBackdrop = document.querySelector(".popup-backdrop");
      if (oldPopup) oldPopup.remove();
      if (oldBackdrop) oldBackdrop.remove();

      const backdrop = document.createElement("div");
      backdrop.className = "popup-backdrop";

      const popup = document.createElement("div");
      popup.className = "popup";
      popup.innerHTML = `
        <button class="popup__close" aria-label="Close popup">&times;</button>
        <div class="popup__image">
          <img src="${imgSrc}" alt="${imgAlt}">
        </div>
        <div class="popup__content">${tip}</div>
      `;

      document.body.appendChild(backdrop);
      document.body.appendChild(popup);

      const closePopup = () => {
        popup.remove();
        backdrop.remove();
      };

      backdrop.addEventListener("click", closePopup);
      popup.querySelector(".popup__close").addEventListener("click", closePopup);
    });
  });
})();
