document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button');

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                body: new URLSearchParams(formData)
            });

            if (response.ok) {
                alert('Your message has been sent!');
                contactForm.reset();
            } else {
                throw new Error('An error occurred while sending the email.');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }
    });
});
