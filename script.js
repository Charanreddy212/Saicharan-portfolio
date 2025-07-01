// Portfolio Data
const portfolioData = {
    personalInfo: {
        name: "Sai Charan Reddy Obili",
        title: "TQM & Process Supervisor",
        bio: "Dynamic TQM Supervisor specializing in ISO compliance and continuous improvement with proven track record in data analysis and effective training delivery.",
        profileImage: "",
    },
    contactInfo: {
        email: "charanreddy.vip212@gmail.com",
        phone: "7680943774",
        location: "Chennai, India",
        linkedin: "linkedin.com/in/sai-charan-reddy",
        github: "github.com/saicharan",
    },
    about: {
        content: "I am a Dynamic TQM Supervisor at Vikram Solar Limited, specializing in ISO compliance and continuous improvement. With a proven track record in data analysis and effective training delivery, I have enhanced process efficiency and reduced downtime. My skills in Six Sigma methodologies and strong communication drive successful audits and risk management initiatives across various projects."
    }
};

// Global Variables
let activeSection = '';
let isLoading = true;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Simulate loading
    setTimeout(() => {
        hideLoadingScreen();
        initializeAnimations();
        initializeNavigation();
        initializeLiquidBackground();
        initializeScrollEffects();
        initializeSkillAnimations();
        initializeIntersectionObserver();
    }, 2000);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
        }, 500);
    }
}

// Navigation Functions
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveSection();
        updateBackToTopButton();
    });
}

function updateActiveSection() {
    const sections = ['about', 'experience', 'skills', 'projects', 'education', 'certifications', 'hobbies', 'resume', 'contact'];
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                setActiveNavLink(section);
                break;
            }
        }
    }
}

function setActiveNavLink(sectionId) {
    if (activeSection === sectionId) return;
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section links
    document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(link => {
        link.classList.add('active');
    });
    
    activeSection = sectionId;
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = sectionId === 'header' ? 0 : 80;
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    closeMobileMenu();
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.remove('active');
}

// Liquid Background Animation
function initializeLiquidBackground() {
    const canvas = document.getElementById('liquid-background');
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let time = 0;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createGradient(x, y, radius) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');
        return gradient;
    }
    
    function drawLiquidBlob(centerX, centerY, radius, time, offset) {
        ctx.beginPath();
        
        const points = 8;
        const angleStep = (Math.PI * 2) / points;
        
        for (let i = 0; i <= points; i++) {
            const angle = i * angleStep;
            const wave1 = Math.sin(time * 0.002 + offset + angle * 2) * 0.3;
            const wave2 = Math.cos(time * 0.003 + offset + angle * 3) * 0.2;
            const wave3 = Math.sin(time * 0.001 + offset + angle * 5) * 0.1;
            
            const r = radius * (1 + wave1 + wave2 + wave3);
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                const prevAngle = (i - 1) * angleStep;
                const prevWave1 = Math.sin(time * 0.002 + offset + prevAngle * 2) * 0.3;
                const prevWave2 = Math.cos(time * 0.003 + offset + prevAngle * 3) * 0.2;
                const prevWave3 = Math.sin(time * 0.001 + offset + prevAngle * 5) * 0.1;
                const prevR = radius * (1 + prevWave1 + prevWave2 + prevWave3);
                const prevX = centerX + Math.cos(prevAngle) * prevR;
                const prevY = centerY + Math.sin(prevAngle) * prevR;
                
                const cpX = (prevX + x) / 2 + Math.sin(time * 0.004 + offset) * 20;
                const cpY = (prevY + y) / 2 + Math.cos(time * 0.004 + offset) * 20;
                
                ctx.quadraticCurveTo(cpX, cpY, x, y);
            }
        }
        
        ctx.closePath();
        ctx.fillStyle = createGradient(centerX, centerY, radius * 2);
        ctx.fill();
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        time += 16;
        
        // Large background blobs
        drawLiquidBlob(canvas.width * 0.2, canvas.height * 0.3, 150, time, 0);
        drawLiquidBlob(canvas.width * 0.8, canvas.height * 0.7, 120, time, Math.PI);
        drawLiquidBlob(canvas.width * 0.6, canvas.height * 0.2, 100, time, Math.PI / 2);
        drawLiquidBlob(canvas.width * 0.3, canvas.height * 0.8, 130, time, Math.PI * 1.5);
        
        // Medium floating blobs
        drawLiquidBlob(
            canvas.width * 0.5 + Math.sin(time * 0.001) * 100,
            canvas.height * 0.4 + Math.cos(time * 0.0015) * 80,
            80,
            time,
            Math.PI / 3
        );
        
        drawLiquidBlob(
            canvas.width * 0.7 + Math.cos(time * 0.0012) * 60,
            canvas.height * 0.6 + Math.sin(time * 0.0008) * 90,
            70,
            time,
            Math.PI * 2 / 3
        );
        
        // Small floating particles
        for (let i = 0; i < 5; i++) {
            const x = canvas.width * (0.1 + i * 0.2) + Math.sin(time * 0.002 + i) * 50;
            const y = canvas.height * 0.5 + Math.cos(time * 0.0015 + i) * 100;
            drawLiquidBlob(x, y, 30 + Math.sin(time * 0.003 + i) * 10, time, i * Math.PI / 3);
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// Scroll Effects
function initializeScrollEffects() {
    // Back to top button
    updateBackToTopButton();
}

function updateBackToTopButton() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Skill Animations
function initializeSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const donutProgress = item.querySelector('.donut-progress');
        const level = parseInt(donutProgress.getAttribute('data-level'));
        const percentage = (level / 5) * 100;
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (percentage / 100) * circumference;
        
        // Set initial state
        donutProgress.style.strokeDashoffset = circumference;
        
        // Animate when in view
        setTimeout(() => {
            donutProgress.style.strokeDashoffset = offset;
        }, index * 200);
    });
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Special handling for skill animations
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkills();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.card, .timeline-item, .skill-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            const donutProgress = item.querySelector('.donut-progress');
            const level = parseInt(donutProgress.getAttribute('data-level'));
            const percentage = (level / 5) * 100;
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (percentage / 100) * circumference;
            
            donutProgress.style.strokeDashoffset = offset;
            
            // Animate percentage counter
            const percentageElement = item.querySelector('.percentage');
            animateCounter(percentageElement, 0, percentage, 1500);
        }, index * 100);
    });
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(start + (end - start) * progress);
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animation initialization
function initializeAnimations() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Modal Functions
function openDashboard() {
    const modal = document.getElementById('dashboard-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDashboard() {
    const modal = document.getElementById('dashboard-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openChat() {
    const modal = document.getElementById('chat-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeChat() {
    const modal = document.getElementById('chat-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Chat Functions
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, false);
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const response = generateBotResponse(message);
        addMessage(response, true);
    }, 1000);
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, isBot) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${isBot ? 'fa-robot' : 'fa-user'}"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Experience related queries
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
        return `${portfolioData.personalInfo.name} has professional experience as a TQM & Process Supervisor at Vikram Solar Limited since 2021. Previously worked as a Quality Analyst from 2019-2021. Specializes in ISO compliance, Six Sigma methodologies, and process improvements.`;
    }
    
    // Skills related queries
    if (message.includes('skill') || message.includes('technology') || message.includes('programming')) {
        return `${portfolioData.personalInfo.name} has expertise in 8 technical skills including: ISO Compliance, Six Sigma, Quality Management, Data Analysis, Process Improvement, Risk Management, Training & Development, and Audit Management with varying levels of proficiency.`;
    }
    
    // Projects related queries
    if (message.includes('project') || message.includes('portfolio') || message.includes('work samples')) {
        return `${portfolioData.personalInfo.name} has worked on 2 major projects: ISO 9001:2015 Implementation and Six Sigma Process Improvement. Each project showcases different technical skills and problem-solving abilities in quality management.`;
    }
    
    // Education related queries
    if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('college')) {
        return `${portfolioData.personalInfo.name} has a Bachelor of Engineering degree (2015-2019) with focus on industrial engineering, quality management, and process optimization with strong foundation in statistical analysis and project management.`;
    }
    
    // Certifications related queries
    if (message.includes('certification') || message.includes('certificate')) {
        return `${portfolioData.personalInfo.name} has 2 professional certifications: Six Sigma Green Belt from ASQ (2022) and ISO 9001:2015 Lead Auditor from IRCA (2021). These certifications demonstrate commitment to continuous learning and professional development.`;
    }
    
    // Contact related queries
    if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
        return `You can contact ${portfolioData.personalInfo.name} at ${portfolioData.contactInfo.email} or ${portfolioData.contactInfo.phone}. Located in ${portfolioData.contactInfo.location}. Also available on LinkedIn and GitHub.`;
    }
    
    // About/Bio related queries
    if (message.includes('about') || message.includes('who') || message.includes('background')) {
        return `${portfolioData.personalInfo.name} is a ${portfolioData.personalInfo.title}. ${portfolioData.about.content}`;
    }
    
    // Default responses for common greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return `Hello! I'm here to help you learn more about ${portfolioData.personalInfo.name}. You can ask me about their experience, skills, projects, education, or any other aspect of their professional background.`;
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
        return `You're welcome! Feel free to ask me anything else about ${portfolioData.personalInfo.name}'s background or qualifications.`;
    }
    
    // Default response
    return `I can help you learn about ${portfolioData.personalInfo.name}'s experience, skills, projects, education, certifications, or contact information. What specific area would you like to know more about?`;
}

// Resume Functions
function downloadResume() {
    // Create a simple resume content
    const resumeContent = `
        ${portfolioData.personalInfo.name}
        ${portfolioData.personalInfo.title}
        
        Contact: ${portfolioData.contactInfo.email} | ${portfolioData.contactInfo.phone}
        Location: ${portfolioData.contactInfo.location}
        
        About:
        ${portfolioData.about.content}
        
        Experience:
        • TQM & Process Supervisor at Vikram Solar Limited (2021 - Present)
        • Quality Analyst at Previous Company (2019 - 2021)
        
        Skills:
        • ISO Compliance (Expert)
        • Six Sigma (Advanced)
        • Quality Management (Expert)
        • Data Analysis (Advanced)
        • Process Improvement (Expert)
        • Risk Management (Advanced)
        • Training & Development (Advanced)
        • Audit Management (Advanced)
        
        Education:
        • Bachelor of Engineering (2015 - 2019)
        
        Certifications:
        • Six Sigma Green Belt - ASQ (2022)
        • ISO 9001:2015 Lead Auditor - IRCA (2021)
    `;
    
    // Create and download the file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sai_Charan_Reddy_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const dashboardModal = document.getElementById('dashboard-modal');
    const chatModal = document.getElementById('chat-modal');
    
    if (event.target === dashboardModal) {
        closeDashboard();
    }
    
    if (event.target === chatModal) {
        closeChat();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDashboard();
        closeChat();
        closeMobileMenu();
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveSection();
    updateBackToTopButton();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    smoothScrollPolyfill();
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('An error occurred:', event.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}