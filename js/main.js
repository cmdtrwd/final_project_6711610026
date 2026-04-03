
// 1. CURSOR MOUSE
const cursor = document.querySelector(".cursor");

if (cursor) {
    let cursorTimeout;

    document.addEventListener("mousemove", (e) => {
        cursor.style.top = e.clientY + "px";
        cursor.style.left = e.clientX + "px";
        cursor.style.display = "block";

        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(() => {
            cursor.style.display = "none";
        }, 1000);
    });

    document.addEventListener("mouseout", () => {
        cursor.style.display = "none";
    });
}

// 2. HAMBURGER MENU
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
}


// 3. CARD SLIDE
const cards = document.querySelectorAll('.klong-card');

if (cards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => cardObserver.observe(card));
}

// 4. SLIDER
const slidesWrapper = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const slideItems = document.querySelectorAll('.slide');
const sliderPrev = document.querySelector('.slider-prev');
const sliderNext = document.querySelector('.slider-next');

if (slidesWrapper && slideItems.length > 0) {
    const total = slideItems.length;
    let current = 0;
    let isTransitioning = false;

    // clone slides (infinite loop)
    slideItems.forEach(slide => {
        slidesWrapper.appendChild(slide.cloneNode(true));
    });
    slideItems.forEach(slide => {
        slidesWrapper.insertBefore(slide.cloneNode(true), slidesWrapper.firstChild);
    });

    function getVisibleCount() {
        return window.innerWidth >= 768 ? 3 : 1;
    }

    function setPosition(index, animate) {
        slidesWrapper.style.transition = animate ? 'transform 0.6s ease' : 'none';
        slidesWrapper.style.transform = `translateX(-${(index + total) * (100 / getVisibleCount())}%)`;
    }

    function updateDots() {
        if (dots.length === 0) return;
        dots.forEach(d => d.classList.remove('active'));
        const offset = Math.floor(getVisibleCount() / 2);
        const activeDot = (((current + offset) % total) + total) % total;
        dots[activeDot].classList.add('active');
    }

    function goTo(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        current = index;
        setPosition(current, true);
        updateDots();
    }

    slidesWrapper.addEventListener('transitionend', () => {
        if (current >= total) {
            current = 0;
            setPosition(current, false);
        } else if (current < 0) {
            current = total - 1;
            setPosition(current, false);
        }
        isTransitioning = false;
    });

    // dot click
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
    });

    // prev / next
    if (sliderPrev) sliderPrev.addEventListener('click', () => goTo(current - 1));
    if (sliderNext) sliderNext.addEventListener('click', () => goTo(current + 1));

    // resize
    window.addEventListener('resize', () => setPosition(current, false));

    // init
    setPosition(0, false);
    updateDots();
}


// 5. FADE IN 

const fadeEls = document.querySelectorAll(
    '.profile-title, .profile-img, .profile-info, .youtube-title, .section-title'
);

if (fadeEls.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => fadeObserver.observe(el));
}