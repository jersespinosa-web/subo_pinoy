document.addEventListener('DOMContentLoaded', () => {
  const toggleContainer = document.getElementById('authToggle');
  const loginTab = document.getElementById('loginTab');
  const signinTab = document.getElementById('signinTab');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const submitBtn = document.getElementById('submitBtn');
  const authForm = document.getElementById('authForm');

  let isSignIn = false;

  // Switch to Log in mode
  loginTab.addEventListener('click', () => {
    if (!isSignIn) return;
    isSignIn = false;
    updateAuthMode();
  });

  // Switch to Sign in mode
  signinTab.addEventListener('click', () => {
    if (isSignIn) return;
    isSignIn = true;
    updateAuthMode();
  });

  function updateAuthMode() {
    if (isSignIn) {
      toggleContainer.classList.add('signin-mode');
      signinTab.classList.add('active');
      loginTab.classList.remove('active');
      
      confirmPasswordInput.classList.remove('hidden');
      confirmPasswordInput.required = true;
      submitBtn.textContent = 'Sign in';
    } else {
      toggleContainer.classList.remove('signin-mode');
      loginTab.classList.add('active');
      signinTab.classList.remove('active');
      
      confirmPasswordInput.classList.add('hidden');
      confirmPasswordInput.required = false;
      confirmPasswordInput.value = '';
      submitBtn.textContent = 'Log in';
    }
  }

  // Handle Form Submission
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isSignIn) {
      const confirmPassword = confirmPasswordInput.value;
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      alert(Account created for ${username}!);
    } else {
      alert(Welcome back, ${username}!);
    }
  });
});
