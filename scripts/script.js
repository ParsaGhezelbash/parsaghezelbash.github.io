document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offset = 60;
            const elementPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });

            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const offset = 150; // Adjusted offset for better accuracy

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if section is in the viewport
        if (pageYOffset >= (sectionTop - offset) && pageYOffset < (sectionTop + sectionHeight - offset)) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Handle the top of the page case
    if (pageYOffset < sections[0].offsetTop - offset) {
        // If we are above the first section, nothing should be active,
        // or you might want to force the 'home' link to be active.
        // Let's default to the first nav item (Home).
        currentSectionId = navLinks[0].getAttribute('href').substring(1);
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref.includes(currentSectionId)) {
            link.classList.add('active');
        }
    });

    // Special case for when at the very top, ensure only 'Home' is active
    if (window.scrollY === 0) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('a.nav-item[href="#hero"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});

const style = document.createElement('style');
style.innerHTML = `
    .nav-item.active {
        color: var(--secondary) !important;
        font-weight: bold;
    }
    .nav-item.active::after {
        width: 100% !important;
        background: var(--secondary) !important;
    }
`;
document.head.appendChild(style);

document.getElementById('theme-icon').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('theme-icon');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    const isDark = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}); 

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('theme-icon').classList.add('fa-sun');
    document.getElementById('theme-icon').classList.remove('fa-moon');
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const sectionId = item.dataset.section;
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.dataset.modal;
        document.getElementById(modalId).style.display = 'flex';
    });
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

document.getElementById('email-icon').addEventListener('click', () => {
    const email = 'parsaghezelbash04@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const notification = document.createElement('div');
        notification.innerText = 'Email copied to clipboard!';
        notification.classList.add('notification');
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
});