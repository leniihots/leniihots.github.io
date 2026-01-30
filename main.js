// Menu mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Capturar valores do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Simulação de envio
    alert(`Obrigado, ${name}! Sua solicitação de ${getServiceName(service)} foi recebida.\n\nEntrarei em contato em breve no email ${email} para agendarmos sua sessão.`);
    
    // Limpar formulário
    contactForm.reset();
});

// Função para obter nome do serviço
function getServiceName(value) {
    const services = {
        'individual': 'Coaching Individual',
        'team': 'Coaching para Times',
        'replay': 'Análise de Replay',
        'competition': 'Preparação para Competições'
    };
    return services[value] || 'coaching';
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Atualizar ano no footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Adicionar classe ativa ao link de navegação conforme scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Função para rotação de testemunhos (opcional)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    
    testimonials[index].style.display = 'block';
}

// Se houver mais de um testemunho, criar slider automático
if (testimonials.length > 1) {
    // Inicialmente mostrar todos em coluna
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'block';
    });
    
    // Opcional: Adicionar navegação para slider
    // Descomente as linhas abaixo para ativar slider automático
    /*
    showTestimonial(0);
    
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    */
}

// Adicionar estilos para links ativos
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--accent) !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);