document.addEventListener('DOMContentLoaded', function() {
    const registrationBtn = document.getElementById('registration-btn');
    const recoveryBtn = document.getElementById('recovery-btn');
    const registrationFormContainer = document.getElementById('registration-form-container');
    const recoveryFormContainer = document.getElementById('recovery-form-container');

    registrationBtn.addEventListener('click', function() {
        registrationFormContainer.style.display = 'block';
        recoveryFormContainer.style.display = 'none';
        registrationBtn.classList.add('active');
        recoveryBtn.classList.remove('active');
    });

    recoveryBtn.addEventListener('click', function() {
        registrationFormContainer.style.display = 'none';
        recoveryFormContainer.style.display = 'block';
        registrationBtn.classList.remove('active');
        recoveryBtn.classList.add('active');
    });
});
