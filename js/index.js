let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener(
  "scroll",
  function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop + 10) {
      header.style.transform = "translateY(-100%)";
    } else if (scrollTop < lastScrollTop - 10) {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  },
  { passive: true }
);

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  const imgEl = document.querySelector(".moon-btn");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }

  themeToggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    imgEl.src = body.classList.contains("dark-theme")
      ? "images/sun.png"
      : "images/moon.png";
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => {
            img.classList.add("active");
          };
          obs.unobserve(img);
        }
      });
    },
    {
      threshold: 0.1, // картинка должна быть хотя бы на 10% видна
    }
  );

  lazyImages.forEach((img) => observer.observe(img));
});

const animatedItems = document.querySelectorAll(".animated");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      obs.unobserve(entry.target);
    }
  });
});

animatedItems.forEach((item) => observer.observe(item));

const light = document.querySelector(".cursor-light");

document.addEventListener("mousemove", (e) => {
  light.style.transform = `translate(${e.clientX - 50}px, ${e.clientY - 50}px)`;
});
