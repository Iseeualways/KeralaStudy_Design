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
  
  // Check if carousel exists before proceeding
  if ($carousel.length === 0) return;
  
  const allCards = $(".college-card").clone();
  let carouselInitialized = false;

  function initCarousel() {
    // Prevent re-initialization
    if ($carousel.hasClass("slick-initialized")) {
      $carousel.slick("unslick");
    }
    
    $carousel.slick({
      slidesToShow: 4,
      centeredSlides: false,
      slidesToScroll: 1,
      infinite: true,
      arrows: false,
      autoplay: false,
      speed: 600,
      cssEase: "ease-in-out",
      responsive: [
        {
          breakpoint: 768,
          settings: { slidesToShow: 2 }
        }
      ]
    });
    carouselInitialized = true;
  }

  // Init carousel only once
  if (allCards.length > 0) {
    initCarousel();
  }

  // Custom Arrows
  $(".slick-prev-btn").off("click").on("click", function() {
    if ($carousel.hasClass("slick-initialized")) {
      $carousel.slick("slickPrev");
    }
  });
  
  $(".slick-next-btn").off("click").on("click", function() {
    if ($carousel.hasClass("slick-initialized")) {
      $carousel.slick("slickNext");
    }
  });

  // Filter functionality
  $(".filter-btn").off("click").on("click", function () {
    const city = $(this).data("city");
    
    // Active state
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    // Destroy and recreate
    if ($carousel.hasClass("slick-initialized")) {
      $carousel.slick("unslick");
    }
    
    $carousel.empty();

    // Filter cards (limit duplication)
    let filteredCards = city === "all"
      ? allCards.clone()
      : allCards.filter(`[data-city="${city}"]`).clone();

    // Only duplicate if necessary (max 2x)
    if (filteredCards.length < 4 && filteredCards.length > 0) {
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
if (slides.length > 0) {
  let currentSlide = 0;
  let autoPlayInterval = null;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    if (slides[index]) {
      slides[index].classList.add('active');
    }
  }

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(autoPlayInterval);
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(autoPlayInterval);
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
      startAutoPlay();
    });
  }

  // Auto Slide with proper cleanup
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 7000);
  }

  // Initialize
  showSlide(0);
  startAutoPlay();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(autoPlayInterval);
  });
}




