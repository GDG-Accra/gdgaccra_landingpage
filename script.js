// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Team Data
const teamData = [
    { name: 'John Doe', role: 'Community Lead', image: 'assets/team1.jpg' },
    { name: 'Jane Smith', role: 'Technical Lead', image: 'assets/team2.jpg' },
    { name: 'Mike Johnson', role: 'Event Coordinator', image: 'assets/team3.jpg' },
    { name: 'Sarah Williams', role: 'Developer Relations', image: 'assets/team4.jpg' },
    { name: 'David Brown', role: 'Content Lead', image: 'assets/team5.jpg' },
    { name: 'Emma Davis', role: 'Community Manager', image: 'assets/team6.jpg' },
    { name: 'Alex Thompson', role: 'Technical Advisor', image: 'assets/team7.jpg' },
    { name: 'Grace Chen', role: 'Workshop Coordinator', image: 'assets/team8.jpg' }
];

// Populate Team
function populateTeam() {
    const teamGrid = document.querySelector('.team-grid');
    teamData.forEach(member => {
        const teamMember = document.createElement('div');
        teamMember.className = 'team-member';
        teamMember.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
        `;
        teamGrid.appendChild(teamMember);
    });
}

// Gallery Slider
function initGallery() {
    const track = document.querySelector('.gallery-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.gallery-nav.next');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const dotsContainer = document.querySelector('.gallery-dots');

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });

    // Create dot indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);
    let currentSlide = 0;

    // Move to slide function
    const moveToSlide = (targetIndex) => {
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        dots[currentSlide].classList.remove('active');
        dots[targetIndex].classList.add('active');
        currentSlide = targetIndex;
    };

    // Next button click
    nextButton.addEventListener('click', () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    // Previous button click
    prevButton.addEventListener('click', () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        moveToSlide(nextIndex);
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateTeam();
    initGallery();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});