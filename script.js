// ==================== AOS ====================
AOS.init();

// ==================== GSAP Intro ====================
gsap.from("body", { opacity: 0, duration: 1 });

// ==================== Slick Init ====================
$(".your-carousel").slick({
  slidesToShow: 3,
  autoplay: true,
  arrows: false,
});

// ==================== IntlTelInput Init ====================
const phoneInput = document.querySelector("#phone");
if (phoneInput) {
  window.intlTelInput(phoneInput, {
    initialCountry: "in",
    preferredCountries: ["in", "us", "gb", "ae"],
    separateDialCode: true,
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
  });
}

// ==================== College Carousel ====================
$(document).ready(function () {
  const $carousel = $(".college-carousel");
  const allCards = $(".college-card").clone();

  function initCarousel() {
    $carousel.slick({
      slidesToShow: 4,
      centeredSlides: true,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 600,
      cssEase: "ease-in-out",
    });
  }

  // Init
  initCarousel();

  // Custom Arrows
  $(".slick-prev-btn").click(() => $carousel.slick("slickPrev"));
  $(".slick-next-btn").click(() => $carousel.slick("slickNext"));

  // Filter functionality
  $(".filter-btn").click(function () {
    const city = $(this).data("city");

    // Active state
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    // Destroy current slick and clear
    $carousel.slick("unslick").empty();

    // Filter cards
    let filteredCards =
      city === "all"
        ? allCards.clone()
        : allCards.filter(`[data-city="${city}"]`).clone();

    // Duplicate if less than 6 cards
    while (filteredCards.length < 6) {
      filteredCards = filteredCards.add(filteredCards.clone());
    }

    // Append filtered cards and re-init
    $carousel.append(filteredCards);
    initCarousel();
  });
});

// ==================== Mobile Menu Toggle ====================
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });
}

// ==================== Courses Grid ====================
const courses = [
  {
    title: "Business Consulting",
    desc: "Learn the fundamentals of business strategy.",
    category: "business",
    icon: "💼",
  },
  {
    title: "Financial Planning",
    desc: "Master personal and corporate financial planning.",
    category: "business",
    icon: "💰",
  },
  {
    title: "Digital Marketing",
    desc: "Boost your digital presence and marketing skills.",
    category: "marketing",
    icon: "📈",
  },
  {
    title: "SEO Basics",
    desc: "Learn SEO techniques for modern websites.",
    category: "marketing",
    icon: "🔍",
  },
  {
    title: "Web Development",
    desc: "Frontend & backend development skills.",
    category: "tech",
    icon: "💻",
  },
  {
    title: "UI/UX Design",
    desc: "Design stunning user interfaces and experiences.",
    category: "design",
    icon: "🎨",
  },
  {
    title: "Project Management",
    desc: "Manage projects effectively.",
    category: "business",
    icon: "🗂️",
  },
  {
    title: "Graphic Design",
    desc: "Learn modern graphic design.",
    category: "design",
    icon: "🖌️",
  },
];

const coursesGrid = document.getElementById("coursesGrid");

function renderCourses(filter = "all") {
  if (!coursesGrid) return;

  coursesGrid.innerHTML = "";
  const filtered =
    filter === "all"
      ? courses
      : courses.filter((c) => c.category === filter);

  filtered.forEach((course) => {
    const card = document.createElement("div");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-icon">${course.icon}</div>
      <h4>${course.title}</h4>
      <p>${course.desc}</p>
      <a href="#" class="btn">Learn More</a>
    `;
    coursesGrid.appendChild(card);
  });
}

// Initial render
renderCourses();

// Category filter click
document.querySelectorAll(".category").forEach((cat) => {
  cat.addEventListener("click", () => {
    document
      .querySelectorAll(".category")
      .forEach((c) => c.classList.remove("active"));
    cat.classList.add("active");
    renderCourses(cat.dataset.category);
  });
});

// ==================== Hub Section Toggle ====================
const toggleBtns = document.querySelectorAll(".toggle-btn");
const sections = document.querySelectorAll(".hub-section");

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.getAttribute("data-target");
    sections.forEach((sec) =>
      sec.id === target
        ? sec.classList.add("active")
        : sec.classList.remove("active")
    );
  });
});




const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

document.getElementById('nextBtn').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Optional Auto Slide
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 7000);




