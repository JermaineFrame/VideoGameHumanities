/* ===================================
   Modal JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('eventModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;

    // Close modal handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevent modal body clicks from closing modal
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
});

/**
 * Close the modal
 */
function closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.classList.remove('active');

        // Clear body scroll lock if it was set
        document.body.style.overflow = '';
    }
}

/**
 * Open modal (called from other scripts)
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

// Make closeModal available globally
window.closeModal = closeModal;
window.openModal = openModal;
