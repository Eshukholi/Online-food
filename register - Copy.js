document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('register-form');
  const togglePassword = document.getElementById('toggle-password');
  const toggleConfirm = document.getElementById('toggle-confirm');
  const submitBtn = document.querySelector('.submit-btn');
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzle5N1rTcgRcG8W6eJNAw_fEdzoSBr34J29MJ4gqQ09TN7VmM4Hn8EBClZM55sQho/exec';  // Your /exec URL

  // Password toggles
  togglePassword.addEventListener('click', function() {
    const pwd = document.getElementById('password');
    const type = pwd.type === 'password' ? 'text' : 'password';
    pwd.type = type;
    this.textContent = type === 'password' ? '👁️' : '🙈';
  });

  toggleConfirm.addEventListener('click', function() {
    const pwd = document.getElementById('confirm-password');
    const type = pwd.type === 'password' ? 'text' : 'password';
    pwd.type = type;
    this.textContent = type === 'password' ? '👁️' : '🙈';
  });

  // Real-time validation
  const inputs = ['first-name', 'last-name', 'gender', 'mobile', 'password', 'confirm-password'];
  inputs.forEach(id => document.getElementById(id).addEventListener('input', validateForm));
  validateForm();

  function validateForm() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const gender = document.getElementById('gender').value;
    const mobile = document.getElementById('mobile').value.replace(/\s/g, '');
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const isMobileValid = /^[\d]{10}$/.test(mobile);
    const passwordsMatch = password === confirmPassword;
    const passwordStrong = password.length >= 6;
    const isValid = firstName && lastName && gender && isMobileValid && passwordStrong && passwordsMatch;

    submitBtn.style.opacity = isValid ? '1' : '0.6';
    submitBtn.disabled = !isValid;
  }

  // Form submit + REDIRECT to login.html
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (submitBtn.disabled) return;

    submitBtn.innerHTML = 'Creating Account...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch(SCRIPT_URL, { method: 'POST', body: formData });
      const text = await response.text();
      
      if (text.startsWith('OK')) {
        alert('Account created successfully! Redirecting to login...');
        window.location.href = 'login.html';  // ✅ AUTO LOGIN PAGE
      } else {
        alert('Error: ' + text);
      }
    } catch (error) {
      alert('Network error. Data may still be saved.');
      window.location.href = 'login.html';  // Redirect even on error
    } finally {
      submitBtn.innerHTML = 'Create Account';
    }
  });
});
