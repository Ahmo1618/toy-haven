// Support page: validate local feedback and expand or collapse FAQ answers.
const supportForm = document.getElementById('supportForm');
supportForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nameOK = validateField(
        'supportName',
        'supportNameError',
        'Enter a name of at least 2 characters.',
    );
    const emailOK = validateField(
        'supportEmail',
        'supportEmailError',
        'Enter a valid email address.',
    );
    const messageOK = validateField(
        'supportMessage',
        'supportMessageError',
        'Write at least 10 characters.',
    );
    if (!nameOK || !emailOK || !messageOK) {
        supportForm.querySelector('[aria-invalid="true"]').focus();
        return;
    }
    const feedback = {
        name: document.getElementById('supportName').value,
        email: document.getElementById('supportEmail').value,
        message: document.getElementById('supportMessage').value,
        date: new Date().toISOString(),
    };
    const messages = readList('feedback');
    messages.push(feedback);
    if (saveList('feedback', messages)) {
        supportForm.reset();
        document.getElementById('supportSuccess').textContent =
            'Thank you. Your feedback was saved in this browser.';
    }
});
document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
        const open = question.getAttribute('aria-expanded') === 'true';
        question.setAttribute('aria-expanded', String(!open));
        document.getElementById(question.getAttribute('aria-controls')).hidden = open;
        question.querySelector('span').textContent = open ? '+' : '−';
    });
});
