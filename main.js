/* ==========================================================================
   Halftask Login Page Interactivity & Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const emailLabel = document.getElementById('email-label');
  const emailError = document.getElementById('email-error');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;
  
  // Custom Toast Notification System
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      
      // Inject base container styling
      Object.assign(container.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: '9999',
        pointerEvents: 'none'
      });
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    
    // Style individual toast
    Object.assign(toast.style, {
      background: '#1a1f26',
      color: '#f3f4f6',
      padding: '14px 24px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '550',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255,255,255,0.15)',
      borderLeft: type === 'success' ? '4px solid #10b981' : type === 'error' ? '4px solid #ef4444' : '4px solid #0080f9',
      transform: 'translateY(40px) scale(0.95)',
      opacity: '0',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: 'auto',
      maxWidth: '350px',
      wordBreak: 'break-word'
    });

    container.appendChild(toast);

    // Fade-in animation
    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0) scale(1)';
      toast.style.opacity = '1';
    });

    // Dismiss timer
    setTimeout(() => {
      toast.style.transform = 'translateY(-20px) scale(0.9)';
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3200);
  }

  // Helper validation logic
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
  }

  // Clear validation styles when user edits input
  document.querySelectorAll('.form-group input, .form-group-checkbox input').forEach(input => {
    input.addEventListener('input', () => {
      const parent = input.closest('.form-group') || input.closest('.form-group-checkbox');
      if (parent) {
        parent.classList.remove('invalid');
        const errorEl = parent.querySelector('.error-msg');
        if (errorEl) {
          errorEl.classList.remove('visible');
          errorEl.textContent = '';
        }
      }
    });
    if (input.type === 'checkbox') {
      input.addEventListener('change', () => {
        const parent = input.closest('.form-group') || input.closest('.form-group-checkbox');
        if (parent) {
          parent.classList.remove('invalid');
          const errorEl = parent.querySelector('.error-msg');
          if (errorEl) {
            errorEl.classList.remove('visible');
            errorEl.textContent = '';
          }
        }
      });
    }
  });

  // Handle Form Submission for Login
  if (loginForm && emailInput && emailError && submitBtn) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailVal = emailInput.value.trim();
      const parent = emailInput.closest('.form-group');

      // Case 1: Empty input
      if (!emailVal) {
        parent.classList.add('invalid');
        emailError.textContent = 'Email is required';
        emailError.classList.add('visible');
        emailInput.focus();
        return;
      }

      // Case 2: Format mismatch
      if (!validateEmail(emailVal)) {
        parent.classList.add('invalid');
        emailError.textContent = 'Enter a valid email address';
        emailError.classList.add('visible');
        emailInput.focus();
        return;
      }

      // Success State: Trigger Button Loader Animation
      submitBtn.disabled = true;
      if (btnText) btnText.style.opacity = '0';
      if (btnLoader) btnLoader.hidden = false;
      
      // Simulate authentication api request
      setTimeout(() => {
        // Revert states
        submitBtn.disabled = false;
        if (btnText) btnText.style.opacity = '1';
        if (btnLoader) btnLoader.hidden = true;
        
        showToast(`Magic link sent to ${emailVal}!`, 'success');
        emailInput.value = ''; // Reset input
      }, 1800);
    });
  }

  // Passkey Simulation Trigger
  const passkeyBtn = document.getElementById('passkey-btn');
  if (passkeyBtn) {
    passkeyBtn.addEventListener('click', () => {
      showToast('Initializing secure passkey verification...', 'info');
    });
  }

  // Social Authentication Listeners
  const socialAuths = {
    'google-btn': 'Google',
    'apple-btn': 'Apple',
    'facebook-btn': 'Facebook',
    'whatsapp-btn': 'WhatsApp'
  };

  Object.entries(socialAuths).forEach(([id, name]) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        showToast(`Redirecting to authentication via ${name}...`, 'info');
      });
    }
  });

  // Links hooks
  const signupLink = document.getElementById('signup-link');
  if (signupLink) {
    signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Loading registration page...', 'info');
      setTimeout(() => {
        window.location.href = 'signup.html';
      }, 500);
    });
  }

  const helpLink = document.getElementById('help-link');
  if (helpLink) {
    helpLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Opening help center portal...', 'info');
    });
  }

  // --- Homepage Interactivity (Mobile menu, tabs, search) ---
  
  // Mobile drawer controls
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const mobileClose = document.getElementById('mobile-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');

  if (mobileToggle && mobileDrawer && drawerOverlay) {
    const toggleMenu = () => {
      mobileDrawer.classList.toggle('open');
      drawerOverlay.classList.toggle('open');
    };
    mobileToggle.addEventListener('click', toggleMenu);
    if (mobileClose) mobileClose.addEventListener('click', toggleMenu);
    drawerOverlay.addEventListener('click', toggleMenu);

    // Close on click of drawer links
    mobileDrawer.querySelectorAll('.mobile-nav-item').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
      });
    });
  }

  // Tabs (Hire vs Work)
  const tabTaker = document.getElementById('tab-taker-btn');
  const tabProvider = document.getElementById('tab-provider-btn');
  const panelTaker = document.getElementById('panel-taker');
  const panelProvider = document.getElementById('panel-provider');

  if (tabTaker && tabProvider && panelTaker && panelProvider) {
    tabTaker.addEventListener('click', () => {
      tabTaker.classList.add('active');
      tabProvider.classList.remove('active');
      panelTaker.classList.add('active');
      panelProvider.classList.remove('active');
    });

    tabProvider.addEventListener('click', () => {
      tabProvider.classList.add('active');
      tabTaker.classList.remove('active');
      panelProvider.classList.add('active');
      panelTaker.classList.remove('active');
    });
  }

  // Signup Trigger Redirect to signup page
  const signupTriggers = document.querySelectorAll('.signup-trigger, #header-signup-btn');
  signupTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'signup.html';
    });
  });

  // Search logic (Header and Hero)
  const triggerSearch = (query) => {
    if (!query.trim()) {
      showToast('Please type a search query first!', 'error');
      return;
    }
    showToast(`Searching for expert providers in "${query}"...`, 'info');
  };

  const headerSearchBtnToggle = document.getElementById('header-search-btn-toggle');
  const headerSearchContainer = document.querySelector('.header-search-container');
  const headerSearchInput = document.getElementById('search-input-header');

  if (headerSearchBtnToggle && headerSearchContainer && headerSearchInput) {
    headerSearchBtnToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = headerSearchContainer.classList.toggle('expanded');
      if (isExpanded) {
        headerSearchInput.focus();
      }
    });

    // Close header search if clicked outside
    document.addEventListener('click', (e) => {
      if (!headerSearchContainer.contains(e.target)) {
        headerSearchContainer.classList.remove('expanded');
      }
    });

    headerSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        triggerSearch(headerSearchInput.value);
        headerSearchInput.value = '';
        headerSearchContainer.classList.remove('expanded');
      }
    });
  }

  const heroSearchInput = document.getElementById('search-input-hero');
  const heroSearchBtn = document.getElementById('hero-search-submit');
  if (heroSearchInput && heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      triggerSearch(heroSearchInput.value);
      heroSearchInput.value = '';
    });
    heroSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        triggerSearch(heroSearchInput.value);
        heroSearchInput.value = '';
      }
    });
  }

  // Tags quick-fill search
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      const term = tag.textContent.trim();
      if (heroSearchInput) {
        heroSearchInput.value = term;
        heroSearchInput.focus();
      } else {
        triggerSearch(term);
      }
    });
  });

  // --- Signup Page (signup.html) Logic ---
  const signupForm = document.getElementById('signup-form');
  const signupStep1 = document.getElementById('signup-step-1');
  const signupStep2 = document.getElementById('signup-step-2');
  
  if (signupStep1 && signupStep2) {
    const takerCard = document.getElementById('role-taker');
    const providerCard = document.getElementById('role-provider');
    const btnNextStep = document.getElementById('btn-next-step');
    const btnBackStep = document.getElementById('btn-back-step');
    const signupHeading = document.getElementById('signup-heading');
    const signupSubheading = document.getElementById('signup-subheading');
    let selectedRole = null;

    // Card Selection
    const selectRole = (role) => {
      selectedRole = role;
      if (role === 'taker') {
        takerCard.classList.add('selected');
        takerCard.setAttribute('aria-checked', 'true');
        providerCard.classList.remove('selected');
        providerCard.setAttribute('aria-checked', 'false');
        btnNextStep.disabled = false;
        btnNextStep.textContent = 'Join as a Service Taker';
      } else {
        providerCard.classList.add('selected');
        providerCard.setAttribute('aria-checked', 'true');
        takerCard.classList.remove('selected');
        takerCard.setAttribute('aria-checked', 'false');
        btnNextStep.disabled = false;
        btnNextStep.textContent = 'Apply as a Service Provider';
      }
    };

    if (takerCard) takerCard.addEventListener('click', () => selectRole('taker'));
    if (providerCard) providerCard.addEventListener('click', () => selectRole('provider'));

    // Handle keyboards for accessibility
    [takerCard, providerCard].forEach(card => {
      if (card) {
        card.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            selectRole(card.dataset.role);
          }
        });
      }
    });

    // Proceed to Step 2
    const proceedToStep2 = () => {
      if (!selectedRole) return;
      
      // Update heading details based on role
      if (selectedRole === 'taker') {
        signupHeading.textContent = 'Sign up to hire elite talent';
        signupSubheading.textContent = 'Create your Service Taker account';
      } else {
        signupHeading.textContent = 'Sign up to find work';
        signupSubheading.textContent = 'Create your Service Provider account';
      }

      // Transition
      signupStep1.classList.remove('active');
      signupStep2.classList.add('active');
      const card = document.querySelector('.signup-card-container');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (btnNextStep) {
      btnNextStep.addEventListener('click', proceedToStep2);
    }

    // Double click to proceed directly
    if (takerCard) takerCard.addEventListener('dblclick', proceedToStep2);
    if (providerCard) providerCard.addEventListener('dblclick', proceedToStep2);

    // Go back to Step 1
    if (btnBackStep) {
      btnBackStep.addEventListener('click', () => {
        signupStep2.classList.remove('active');
        signupStep1.classList.add('active');
        const card = document.querySelector('.signup-card-container');
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Check if role is pre-selected via query params
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');
    if (roleParam === 'taker' || roleParam === 'provider') {
      selectRole(roleParam);
      proceedToStep2();
    }

    // Password visibility toggle
    const btnTogglePassword = document.getElementById('btn-toggle-password');
    const passwordInput = document.getElementById('password');
    if (btnTogglePassword && passwordInput) {
      btnTogglePassword.addEventListener('click', () => {
        const eyeOff = btnTogglePassword.querySelector('.eye-off');
        const eyeOn = btnTogglePassword.querySelector('.eye-on');
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          if (eyeOff) eyeOff.style.display = 'none';
          if (eyeOn) eyeOn.style.display = 'block';
          btnTogglePassword.setAttribute('aria-label', 'Hide password');
        } else {
          passwordInput.type = 'password';
          if (eyeOff) eyeOff.style.display = 'block';
          if (eyeOn) eyeOn.style.display = 'none';
          btnTogglePassword.setAttribute('aria-label', 'Show password');
        }
      });
    }

    // Sign up form submission
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const password = passwordInput;
        const terms = document.getElementById('agree-terms');

        let isValid = true;

        const showError = (input, msg) => {
          const parent = input.closest('.form-group') || input.closest('.form-group-checkbox');
          if (parent) {
            parent.classList.add('invalid');
            const errEl = parent.querySelector('.error-msg');
            if (errEl) {
              errEl.textContent = msg;
              errEl.classList.add('visible');
            }
          }
          isValid = false;
        };

        // Reset errors
        document.querySelectorAll('.signup-step .form-group, .signup-step .form-group-checkbox').forEach(el => {
          el.classList.remove('invalid');
          const errEl = el.querySelector('.error-msg');
          if (errEl) {
            errEl.classList.remove('visible');
            errEl.textContent = '';
          }
        });

        // Validations
        if (!firstName.value.trim()) {
          showError(firstName, 'First name is required');
        }
        if (!lastName.value.trim()) {
          showError(lastName, 'Last name is required');
        }
        if (!email.value.trim()) {
          showError(email, 'Email is required');
        } else if (!validateEmail(email.value)) {
          showError(email, 'Enter a valid email address');
        }
        if (!password.value) {
          showError(password, 'Password is required');
        } else if (password.value.length < 8) {
          showError(password, 'Password must be at least 8 characters');
        }
        if (!terms.checked) {
          showError(terms, 'You must agree to the Terms and Privacy Policy');
        }

        if (!isValid) return;

        // Show spinner
        const submitBtnSignup = signupForm.querySelector('#submit-btn');
        const btnTextSignup = submitBtnSignup ? submitBtnSignup.querySelector('.btn-text') : null;
        const btnLoaderSignup = submitBtnSignup ? submitBtnSignup.querySelector('.btn-loader') : null;

        if (submitBtnSignup) submitBtnSignup.disabled = true;
        if (btnTextSignup) btnTextSignup.style.opacity = '0';
        if (btnLoaderSignup) btnLoaderSignup.hidden = false;

        setTimeout(() => {
          if (submitBtnSignup) submitBtnSignup.disabled = false;
          if (btnTextSignup) btnTextSignup.style.opacity = '1';
          if (btnLoaderSignup) btnLoaderSignup.hidden = true;

          showToast(`Account successfully created as a ${selectedRole === 'taker' ? 'Service Taker' : 'Service Provider'}!`, 'success');
          signupForm.reset();

          // Redirect to login or index after a short delay
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        }, 1800);
      });
    }
  }
});

