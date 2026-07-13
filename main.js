/* ==========================================================================
   Halftask Login Page Interactivity & Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const emailLabel = document.getElementById('email-label');
  const emailError = document.getElementById('email-error');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  
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
  emailInput.addEventListener('input', () => {
    const parent = emailInput.closest('.form-group');
    parent.classList.remove('invalid');
    emailError.classList.remove('visible');
    emailError.textContent = '';
  });

  // Handle Form Submission
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
    btnText.style.opacity = '0';
    btnLoader.hidden = false;
    
    // Simulate authentication api request
    setTimeout(() => {
      // Revert states
      submitBtn.disabled = false;
      btnText.style.opacity = '1';
      btnLoader.hidden = true;
      
      showToast(`Magic link sent to ${emailVal}!`, 'success');
      emailInput.value = ''; // Reset input
    }, 1800);
  });

  // Passkey Simulation Trigger
  const passkeyBtn = document.getElementById('passkey-btn');
  passkeyBtn.addEventListener('click', () => {
    showToast('Initializing secure passkey verification...', 'info');
  });

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

  // Signup Trigger Toast
  const signupTriggers = document.querySelectorAll('.signup-trigger, #header-signup-btn');
  signupTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Registration is currently closed for the beta phase. Please log in using the email credentials!', 'info');
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

  const headerSearchInput = document.getElementById('search-input-header');
  if (headerSearchInput) {
    headerSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        triggerSearch(headerSearchInput.value);
        headerSearchInput.value = '';
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
});

