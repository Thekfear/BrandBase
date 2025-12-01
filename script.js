document.addEventListener('DOMContentLoaded', () => {
    // File Upload Interaction
    const fileInput = document.getElementById('logo-upload');
    const fileCustom = document.querySelector('.file-custom');

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                fileCustom.textContent = this.files[0].name;
                fileCustom.style.borderColor = 'var(--color-primary)';
                fileCustom.style.color = 'var(--color-primary)';
            } else {
                fileCustom.textContent = 'Carica file...';
                fileCustom.style.borderColor = 'var(--color-border)';
                fileCustom.style.color = 'var(--color-text-light)';
            }
        });
    }

    // Form Submission (Placeholder)
    const form = document.getElementById('quote-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-submit');
            const originalText = btn.textContent;

            btn.textContent = 'Invio in corso...';
            btn.disabled = true;

            const formData = new FormData(this);

            // Use FormSubmit.co AJAX endpoint
            // IMPORTANT: Replace TUO_INDIRIZZO_EMAIL with your actual email address
            fetch('https://formsubmit.co/ajax/sales@rosman.it', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === 'true' || data.success === true) {
                        alert('Grazie! La tua richiesta è stata ricevuta. Ti contatteremo entro 24 ore.');
                        this.reset();
                        if (fileCustom) {
                            fileCustom.textContent = 'Carica file...';
                            fileCustom.style.borderColor = 'var(--color-border)';
                            fileCustom.style.color = 'var(--color-text-light)';
                        }
                    } else {
                        alert('Qualcosa è andato storto. Per favore riprova o scrivici direttamente.');
                        console.error('FormSubmit error:', data);
                    }
                })
                .catch(error => {
                    alert('Si è verificato un errore di connessione. Per favore riprova.');
                    console.error('Fetch error:', error);
                })
                .finally(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        });
    }

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const spans = mobileBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
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
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    mobileBtn.click();
                }
            }
        });
    });
});
