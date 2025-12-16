(function () {
  const container = document.getElementById('toast-container');

  function createToast({ title, description, type = 'info', duration = 4000 }) {
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'toast-title';
      titleEl.textContent = title;
      toast.appendChild(titleEl);
    }

    if (description) {
      const descEl = document.createElement('div');
      descEl.className = 'toast-description';
      descEl.textContent = description;
      toast.appendChild(descEl);
    }

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hide');
      toast.addEventListener('animationend', () => toast.remove());
    }, duration);
  }

  window.toast = {
    success: (data) => createToast({ ...data, type: 'success' }),
    error: (data) => createToast({ ...data, type: 'error' }),
    warning: (data) => createToast({ ...data, type: 'warning' }),
    info: (data) => createToast({ ...data, type: 'info' }),
  };
})();
