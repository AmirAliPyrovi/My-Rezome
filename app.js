const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
    const opened = mobileNav.classList.toggle('show');

    menuToggle.classList.toggle('open', opened);
    menuToggle.setAttribute('aria-expanded', String(opened));
});

mobileNav.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

        mobileNav.classList.remove('show');
        menuToggle.classList.remove('open');

        menuToggle.setAttribute('aria-expanded', 'false');

    });

});

const brandTyping = document.getElementById("brandTyping");

const brandText = "Web Developer";

let charIndex = 0;
let deleting = false;

function brandTypeEffect() {
    if (!brandTyping) return;

    brandTyping.textContent = brandText.substring(0, charIndex);

    if (!deleting) {
        charIndex++;

        if (charIndex > brandText.length) {
            deleting = true;
            setTimeout(brandTypeEffect, 1500);
            return;
        }
    } else {
        charIndex--;

        if (charIndex < 0) {
            charIndex = 0;
            deleting = false;
        }
    }

    setTimeout(brandTypeEffect, deleting ? 80 : 150);
}

brandTypeEffect();


const revealElements = document.querySelectorAll(
    '.section-heading, .section-copy, .skill-card, .project-card, .contact-detail'
);

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'show');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
});


const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
    }
}

window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();

const sections = document.querySelectorAll(
    "#home, #about, #skills, #projects, #call"
);

const navLinks = document.querySelectorAll(
    ".desktop-nav a, #mobileNav a"
);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    threshold: 0.35
});

sections.forEach(section => {
    sectionObserver.observe(section);
});


const tiltCards = document.querySelectorAll(
    ".skill-card, .project-card"
);

tiltCards.forEach(card => {
    card.addEventListener("mousemove", event => {
        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 20;
        const rotateY = (x - centerX) / 20;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (backToTop) {
        backToTop.classList.toggle("show", window.scrollY > 400);
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const circles = document.querySelectorAll(".circle-progress");

const circleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            const target = Number(circle.dataset.percent);
            const counter = circle.querySelector(".counter");

            let start = null;
            const duration = 1800;

            function animate(time) {
                if (!start) start = time;

                const progress = Math.min((time - start) / duration, 1);
                const value = Math.floor(progress * target);

                circle.style.setProperty(
                    "--progress",
                    `${value * 3.6}deg`
                );

                counter.textContent = `${value}%`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
            circleObserver.unobserve(circle);
        }
    });
}, { threshold: 0.3 });

circles.forEach(circle => circleObserver.observe(circle));

const canvas = document.getElementById("particleRain");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.3,
        opacity: Math.random() * 0.5 + 0.2
    }));
}

function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fill();

        particle.y += particle.speed;

        if (particle.y > canvas.height) {
            particle.y = -5;
            particle.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateRain);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateRain();

const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 120}ms`;
    timelineObserver.observe(item);
});

const languageToggle = document.getElementById("languageToggle");

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

    document.querySelectorAll("[data-fa][data-en]").forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    if (languageToggle) {
        languageToggle.textContent = lang === "fa" ? "EN" : "FA";
    }

    localStorage.setItem("siteLanguage", lang);
}

if (languageToggle) {
    languageToggle.addEventListener("click", () => {
        const currentLang = document.documentElement.lang;
        changeLanguage(currentLang === "fa" ? "en" : "fa");
    });
}

changeLanguage(localStorage.getItem("siteLanguage") || "fa");
const downloadResume = document.getElementById("downloadResume");
const serviceAlert = document.getElementById("serviceAlert");
const closeAlert = document.getElementById("closeAlert");

closeAlert.addEventListener("click", () => {
    serviceAlert.style.display = "none";
});

const socialMenu = document.getElementById("socialMenu");
const socialToggle = document.getElementById("socialToggle");

socialToggle.addEventListener("click", () => {
    socialMenu.classList.toggle("active");
});