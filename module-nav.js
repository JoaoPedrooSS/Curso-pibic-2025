// Script para navegação de módulo com highlight da seção ativa
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.module-nav a[href^="#"]');
    const sections = document.querySelectorAll('h2[id]');
    
    console.log('Script carregado. Links encontrados:', navLinks.length);
    console.log('Seções encontradas:', sections.length);
    
    // Função para destacar link ativo
    function highlightActiveLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (scrollPosition >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Adicionar listener de scroll
    window.addEventListener('scroll', highlightActiveLink);
    
    // Executar ao carregar
    setTimeout(highlightActiveLink, 100);

    // Click handler para os links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Link clicado:', this.getAttribute('href'));
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href').substring(1); // Remove o #
            const targetElement = document.getElementById(targetId);
            
            console.log('Buscando elemento:', targetId, 'Encontrado:', !!targetElement);
            
            if (targetElement) {
                // Remover active de todos os links
                navLinks.forEach(l => l.classList.remove('active'));
                // Adicionar active ao link clicado
                this.classList.add('active');
                
                // Scroll para o elemento
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Ajustar offset após o scroll
                setTimeout(() => {
                    window.scrollBy(0, -70);
                }, 100);
            }
        });
    });
});
