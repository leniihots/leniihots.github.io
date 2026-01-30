// ==================== FUNÇÕES DE TEMA ====================

// Verificar tema salvo no localStorage ou preferência do sistema
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        return savedTheme;
    }
    
    // Verificar preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Aplicar tema ao documento
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').checked = true;
        document.getElementById('themeStatus').textContent = 'Modo Escuro Ativo';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('themeToggle').checked = false;
        document.getElementById('themeStatus').textContent = 'Modo Claro Ativo';
    }
    
    // Salvar preferência
    localStorage.setItem('theme', theme);
}

// Alternar entre temas
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    
    // Animação suave para transição de tema
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Remover transição após a animação
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
}

// Inicializar tema
function initTheme() {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    
    // Adicionar event listener ao toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }
}

// ==================== FUNÇÕES DE NAVEGAÇÃO ====================

// Menu mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

function initMobileMenu() {
    if (mobileMenuBtn && navLinks) {
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
    }
}

// ==================== FUNÇÕES DE FORMULÁRIO ====================

// Form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
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
    }
}

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

// ==================== FUNÇÕES DE SCROLL ====================

// Smooth scroll para links internos
function initSmoothScroll() {
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
}

// Adicionar classe ativa ao link de navegação conforme scroll
function initActiveNavLinks() {
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
}

// ==================== FUNÇÕES GERAIS ====================

// Atualizar ano no footer
function updateCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Adicionar estilos para links ativos
function addActiveNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--accent) !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

// Testemunhos (opcional - slider automático)
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    
    if (testimonials.length > 1) {
        // Se quiser implementar um slider automático no futuro
        // Pode ser adicionado aqui
    }
}

// ==================== INICIALIZAÇÃO ====================

// Inicializar todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initActiveNavLinks();
    updateCurrentYear();
    addActiveNavStyles();
    initTestimonials();
    
    // Adicionar event listener para mudanças na preferência de tema do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Só atualizar se não houver tema salvo manualmente
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });
});

// ==================== FUNÇÕES EXTRAS PARA O TEMA ====================

// Função para forçar a atualização do tema (útil para debugging)
window.forceTheme = function(theme) {
    applyTheme(theme);
};

// Função para obter o tema atual
window.getCurrentTheme = function() {
    return document.documentElement.getAttribute('data-theme') || 'light';
};
