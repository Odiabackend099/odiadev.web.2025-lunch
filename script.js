// ODIADEV PWA Registration & Enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Register Service Worker for PWA functionality
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered successfully:', registration.scope);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  }

  // PWA Install Prompt (for Nigerian mobile users)
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show custom install button after 3 seconds
    setTimeout(() => {
      if (deferredPrompt) {
        showInstallPrompt();
      }
    }, 3000);
  });

  function showInstallPrompt() {
    const installBanner = document.createElement('div');
    installBanner.innerHTML = `
      <div style="position:fixed;bottom:20px;left:20px;right:20px;background:var(--gold);color:#0d0e11;padding:16px;border-radius:12px;box-shadow:var(--shadow);z-index:1000;font-size:14px;">
        <strong>Install ODIADEV App</strong><br>
        Get faster access & offline support for Nigerian networks
        <div style="margin-top:8px;">
          <button id="install-yes" style="background:#0d0e11;color:var(--gold);border:none;padding:8px 16px;border-radius:6px;margin-right:8px;">Install</button>
          <button id="install-no" style="background:transparent;color:#0d0e11;border:1px solid #0d0e11;padding:8px 16px;border-radius:6px;">Later</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(installBanner);
    
    document.getElementById('install-yes').addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        deferredPrompt = null;
        installBanner.remove();
      });
    });
    
    document.getElementById('install-no').addEventListener('click', () => {
      installBanner.remove();
    });
  }
});

// Video demo placeholder
document.addEventListener('click', (e) => {
  if (e.target.closest('.play')) {
    alert('Demo video placeholder. Replace with your embed.');
  }
});
