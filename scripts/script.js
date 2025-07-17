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
    let current = '';
    const offset = 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - offset) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
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

const savedTheme = localStorage.getItem('theme') || 'dark';
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

document.getElementById('email-card').addEventListener('click', () => {
    const email = document.getElementById('email-address').innerText;
    navigator.clipboard.writeText(email).then(() => {
        const notification = document.createElement('div');
        notification.innerText = 'Email copied to clipboard!';
        notification.classList.add('notification');
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
});