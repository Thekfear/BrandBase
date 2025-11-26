document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quote-form');
    const fileInput = document.getElementById('logo-upload');
    const fileCustom = document.querySelector('.file-custom');

    // File input visual feedback
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fileCustom.textContent = `File selezionato: ${e.target.files[0].name}`;
            fileCustom.style.borderColor = 'var(--color-primary)';
            fileCustom.style.color = 'var(--color-primary)';
        }
    });

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.textContent;
        
        btn.textContent = 'Invio in corso...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            // Success state
            btn.textContent = 'Richiesta inviata con successo!';
            btn.style.backgroundColor = 'var(--color-accent)';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                fileCustom.textContent = 'Carica file...';
                fileCustom.style.borderColor = 'var(--color-border)';
                fileCustom.style.color = 'var(--color-text-light)';
                
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.backgroundColor = 'var(--color-primary)';
            }, 3000);
        }, 1500);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
