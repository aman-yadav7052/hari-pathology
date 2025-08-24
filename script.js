// ---------- ANDROID/MOBILE OPTIMIZATION ----------
// Check if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

// Mobile-specific settings
if (isMobile) {
  // Disable hover effects on mobile
  document.documentElement.style.setProperty('--hover-enabled', 'none');
  
  // Optimize touch interactions
  document.addEventListener('touchstart', function() {}, {passive: true});
  document.addEventListener('touchmove', function() {}, {passive: true});
}

// ---------- MOBILE COMPATIBILITY FIXES ----------
// Fix for mobile viewport issues
function fixMobileViewport() {
  const viewport = document.querySelector('meta[name=viewport]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
  }
}

// Fix for mobile touch events
function addMobileTouchSupport() {
  // Add touch support for slideshow
  let touchStartX = 0;
  let touchEndX = 0;
  
  const slideshowContainer = document.querySelector('.slideshow-container');
  if (slideshowContainer) {
    slideshowContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slideshowContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        changeSlide(1);
      } else {
        // Swipe right - previous slide
        changeSlide(-1);
      }
    }
  }
  
  // Add touch support for testimonials
  const testimonialsContainer = document.querySelector('.testimonials-container');
  if (testimonialsContainer) {
    testimonialsContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    testimonialsContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleTestimonialSwipe();
    }, {passive: true});
  }
  
  function handleTestimonialSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next testimonial
        changeTestimonial(1);
      } else {
        // Swipe right - previous testimonial
        changeTestimonial(-1);
      }
    }
  }
}

// Fix for mobile form inputs
function fixMobileForms() {
  // Prevent zoom on input focus (iOS)
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    });
  });
  
  // Fix for mobile date input
  const dateInput = document.getElementById('date');
  if (dateInput) {
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

// Fix for mobile navigation
function fixMobileNavigation() {
  const menu = document.querySelector('.menu');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  if (mobileMenuBtn && menu) {
    mobileMenuBtn.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        menu.classList.remove('active');
      }
    });
  }
}

// ---------- DATA ----------
const labPhoneNumber = "6393345938";
const homeVisitFee = 150;

const testData = [
  { name: "CBC", price: 250, desc: "Saamaanya sehat jaanch", category: "basic" },
  { name: "Blood Sugar", price: 150, desc: "Diabetes ki jaanch", category: "basic" },
  { name: "LFT", price: 400, desc: "Liver ki jaanch", category: "advanced" },
  { name: "KFT", price: 450, desc: "Kidney ki jaanch", category: "advanced" },
  { name: "Lipid Profile", price: 500, desc: "Dil ki sehat ka assessment", category: "advanced" },
  { name: "Thyroid Profile (TSH)", price: 450, desc: "Thyroid imbalance ki jaanch", category: "advanced" },
  { name: "Vitamin D", price: 1000, desc: "Haddiyon aur immunity ki sehat", category: "special" },
  { name: "Dengue", price: 800, desc: "Dengue virus ki jaanch", category: "special" },
  { name: "Malaria", price: 400, desc: "Malaria parasite ki jaanch", category: "special" },
  { name: "HbA1c", price: 600, desc: "3 months ka blood sugar average", category: "advanced" },
  { name: "ESR", price: 200, desc: "Inflammation ki jaanch", category: "basic" },
  { name: "CRP", price: 350, desc: "C-reactive protein test", category: "advanced" },
];

// ---------- SLIDESHOW FUNCTIONALITY ----------
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function changeSlide(direction) {
  currentSlideIndex += direction;
  if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
  if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
}

// Auto slideshow (only on desktop)
let slideshowInterval;
function startSlideshow() {
  if (window.innerWidth > 768 && !isMobile) {
    slideshowInterval = setInterval(() => changeSlide(1), 5000);
  }
}

function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
  }
}

// ---------- TESTIMONIALS FUNCTIONALITY ----------
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  testimonialDots.forEach(dot => dot.classList.remove('active'));
  
  testimonials[index].classList.add('active');
  testimonialDots[index].classList.add('active');
}

function changeTestimonial(direction) {
  currentTestimonialIndex += direction;
  if (currentTestimonialIndex >= testimonials.length) currentTestimonialIndex = 0;
  if (currentTestimonialIndex < 0) currentTestimonialIndex = testimonials.length - 1;
  showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(index) {
  currentTestimonialIndex = index - 1;
  showTestimonial(currentTestimonialIndex);
}

// Auto testimonials (only on desktop)
let testimonialInterval;
function startTestimonialSlideshow() {
  if (window.innerWidth > 768 && !isMobile) {
    testimonialInterval = setInterval(() => changeTestimonial(1), 4000);
  }
}

function stopTestimonialSlideshow() {
  if (testimonialInterval) {
    clearInterval(testimonialInterval);
  }
}

// ---------- STATISTICS ANIMATION ----------
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = isMobile ? 1500 : 2000; // Faster on mobile
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current);
    }, 16);
  });
}

// Intersection Observer for stats animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(statsSection);
}

// ---------- THEME TOGGLE ----------
const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const icon = themeBtn.querySelector('i');
    if (document.body.classList.contains("light")) {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
    
    // Save theme preference
    localStorage.setItem('theme', document.body.classList.contains("light") ? 'light' : 'dark');
  });
}

// ---------- TEST CATEGORIES FILTERING ----------
let currentCategory = 'all';

function filterTests(category) {
  currentCategory = category;
  
  // Update active button
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-category="${category}"]`).classList.add('active');
  
  // Filter and render tests
  renderTests();
}

// Add event listeners to category buttons
document.addEventListener('DOMContentLoaded', () => {
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterTests(btn.getAttribute('data-category'));
    });
  });
});

// ---------- BUILD TEST CARDS ----------
const testsGrid = document.getElementById("testsGrid");
const testSelect = document.getElementById("testSelect");

function renderTests() {
  if (!testsGrid) return;
  
  testsGrid.innerHTML = "";
  
  const filteredTests = currentCategory === 'all' 
    ? testData 
    : testData.filter(test => test.category === currentCategory);
  
  filteredTests.forEach((t) => {
    const card = document.createElement("div");
    card.className = "card small test-card";
    card.innerHTML = `
      <div class="test-header">
        <h4>${t.name}</h4>
        <span class="test-category ${t.category}">${t.category}</span>
      </div>
      <p class="muted">${t.desc}</p>
      <div class="test-footer">
        <div class="test-price">₹${t.price}</div>
        <button class="btn small book-btn">
          <i class="fas fa-calendar-plus"></i> Book Now
        </button>
      </div>
    `;
    
    card.querySelector(".book-btn").addEventListener("click", () => {
      if (testSelect) testSelect.value = t.name;
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    });
    
    testsGrid.appendChild(card);
  });

  // Update select options
  if (testSelect) {
    testSelect.innerHTML = testData.map(t => 
      `<option value="${t.name}">${t.name} - ₹${t.price}</option>`
    ).join("");
  }
}

// Initial render
renderTests();

// ---------- CHART ----------
function renderChart() {
  const el = document.getElementById("testPricesChart");
  if (!el) return;
  if (Chart.getChart(el)) Chart.getChart(el).destroy();

  new Chart(el.getContext("2d"), {
    type: "bar",
    data: {
      labels: testData.map(t => t.name),
      datasets: [{
        label: "Keemat (₹)",
        data: testData.map(t => t.price),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          borderWidth: 1,
          cornerRadius: 8,
        }
      },
      scales: { 
        y: { 
          beginAtZero: true,
          grid: {
            color: 'rgba(148, 163, 184, 0.1)',
          },
          ticks: {
            color: 'rgba(148, 163, 184, 0.8)',
            callback: function(value) {
              return '₹' + value;
            }
          }
        },
        x: {
          grid: {
            color: 'rgba(148, 163, 184, 0.1)',
          },
          ticks: {
            color: 'rgba(148, 163, 184, 0.8)',
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

// ---------- BOOKING (WhatsApp) ----------
const bookingForm = document.getElementById("bookingForm");
const msg = document.getElementById("msg");

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(bookingForm);
    const name = form.get("name")?.trim();
    const phone = form.get("phone")?.trim();
    const test = form.get("test");
    const date = form.get("date");
    const homeCollection = document.getElementById("homeCollection")?.checked;

    if (!name || !phone || !test || !date) {
      if (msg) {
        msg.hidden = false; 
        msg.textContent = "Kripya sabhi jaankari bharein."; 
      }
      return;
    }

    const testDetails = testData.find(t => t.name === test);
    const price = testDetails ? testDetails.price : 0;
    const total = homeCollection ? price + homeVisitFee : price;

    const text = encodeURIComponent(
      `Hello Hari Pathology,

Main ek test book karna chahta hoon.

*Naam:* ${name}
*Phone:* ${phone}
*Test:* ${test}
*Date:* ${date}
*Price:* ₹${price}${homeCollection ? `\n*Home Collection:* ₹${homeVisitFee}` : ""}
*Total:* ₹${total}`
    );

    // Try to open WhatsApp, fallback to phone if not available
    try {
      window.open(`https://wa.me/${labPhoneNumber}?text=${text}`, "_blank");
    } catch (error) {
      // Fallback to phone call
      window.location.href = `tel:${labPhoneNumber}`;
    }
    
    if (msg) {
      msg.hidden = false;
      msg.textContent = "Aapki booking WhatsApp par bhej di gayi hai.";
    }
    bookingForm.reset();
  });
}

// ---------- FEEDBACK (WhatsApp) ----------
const feedbackForm = document.getElementById("feedbackForm");
const fbStatus = document.getElementById("fbStatus");

if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(feedbackForm);
    const name = form.get("name")?.trim();
    const phone = form.get("phone")?.trim();
    const message = form.get("message")?.trim();

    if (!name || !phone || !message) {
      if (fbStatus) {
        fbStatus.hidden = false; 
        fbStatus.textContent = "Kripya sabhi fields bharein."; 
      }
      return;
    }

    const text = encodeURIComponent(
      `Hello Hari Pathology,

Feedback:

*Naam:* ${name}
*Phone:* ${phone}
*Sandesh:* ${message}`
    );
    
    // Try to open WhatsApp, fallback to phone if not available
    try {
      window.open(`https://wa.me/${labPhoneNumber}?text=${text}`, "_blank");
    } catch (error) {
      // Fallback to phone call
      window.location.href = `tel:${labPhoneNumber}`;
    }
    
    if (fbStatus) {
      fbStatus.hidden = false;
      fbStatus.textContent = "Aapka feedback WhatsApp par bhej diya gaya hai.";
    }
    feedbackForm.reset();
  });
}

// ---------- SMOOTH SCROLLING FOR NAVIGATION ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ---------- MOBILE INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', () => {
  fixMobileViewport();
  addMobileTouchSupport();
  fixMobileForms();
  fixMobileNavigation();
  startSlideshow();
  startTestimonialSlideshow();
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      const icon = themeBtn.querySelector('i');
      if (icon) icon.className = "fas fa-sun";
    }
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  stopSlideshow();
  stopTestimonialSlideshow();
  startSlideshow();
  startTestimonialSlideshow();
  fixMobileNavigation();
});

// Load chart when page is ready
window.addEventListener("load", renderChart);

// ---------- ADDITIONAL CSS FOR TEST CARDS ----------
const style = document.createElement('style');
style.textContent = `
  .test-card {
    transition: all 0.3s ease;
    border-left: 4px solid var(--brand);
  }
  
  .test-card:hover {
    transform: translateY(-5px);
    border-left-color: var(--accent);
  }
  
  .test-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .test-category {
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 12px;
    text-transform: uppercase;
    font-weight: 600;
  }
  
  .test-category.basic {
    background: rgba(16, 185, 129, 0.2);
    color: #10b981;
  }
  
  .test-category.advanced {
    background: rgba(59, 130, 246, 0.2);
    color: #3b82f6;
  }
  
  .test-category.special {
    background: rgba(168, 85, 247, 0.2);
    color: #a855f7;
  }
  
  .test-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  
  .test-price {
    font-weight: 700;
    color: var(--brand);
    font-size: 18px;
  }
  
  .book-btn {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  /* Mobile menu button */
  .mobile-menu-btn {
    display: none;
  }
  
  @media (max-width: 768px) {
    .mobile-menu-btn {
      display: block !important;
    }
    
    .menu {
      display: none;
    }
    
    .menu.active {
      display: flex;
    }
    
    /* Android-specific optimizations */
    .test-card:active {
      transform: scale(0.98);
    }
    
    .btn:active {
      transform: scale(0.95);
    }
  }
`;
document.head.appendChild(style);
