var typed = new Typed('#element', {
    strings: ['A Web Developer.'],
    typeSpeed: 80,
  });

const toggleMenu = () => {
    document.getElementById("menu-items").classList.toggle("active");
}

const showToast = (message, type = 'success') => {
    const toastContainer = document.createElement('div');
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '25px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '1000';

    toastContainer.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Notification</strong>
                <small>Just Now</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body ${type === 'success' ? 'bg-success' : 'bg-danger'} text-white">
                ${message}
            </div>
        </div>
    `;

    document.body.appendChild(toastContainer);

    setTimeout(() => {
        toastContainer.remove();
    }, 2500);
};

document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("cdy9BCkKmo2A-0Mom");
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();

        emailjs.send("service_ankana", "template_dfqfy0t", {
            from_name: document.querySelector('input[name="from_name"]').value,
            reply_to: document.querySelector('input[name="reply_to"]').value,
            message: document.querySelector('textarea[name="message"]').value
        })
        .then(response => {
            showToast("Message sent successfully!");
            document.getElementById("contact-form").reset();
        })
        .catch(error => {
            showToast("Failed to send message. Please try again.", "error");
            console.log("EmailJS Error:", error);
        });
        
    });
});


