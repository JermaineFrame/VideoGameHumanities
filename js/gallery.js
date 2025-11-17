/* ===================================
   Gallery & Lightbox JavaScript
   =================================== */

let currentGalleryImages = [];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});

/**
 * Initialize gallery functionality
 */
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Convert NodeList to array and store image data
    currentGalleryImages = Array.from(galleryItems).map((item, index) => ({
        index: index,
        element: item,
        image: item.querySelector('.gallery-image') || item.querySelector('.gallery-placeholder'),
        title: item.querySelector('.gallery-caption h4')?.textContent || 'Image',
        description: item.querySelector('.gallery-caption p')?.textContent || '',
        isVideo: item.querySelector('.gallery-video') !== null
    }));

    // Add click handlers to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });

        // Keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    // Setup lightbox if it exists
    setupLightbox();
}

/**
 * Setup lightbox controls
 */
function setupLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;

    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    // Close on overlay click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
}

/**
 * Open lightbox with specific image
 */
function openLightbox(index) {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        console.warn('Lightbox element not found');
        return;
    }

    currentImageIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Show previous image in lightbox
 */
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateLightboxContent();
}

/**
 * Show next image in lightbox
 */
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    updateLightboxContent();
}

/**
 * Update lightbox content with current image
 */
function updateLightboxContent() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox || !currentGalleryImages[currentImageIndex]) return;

    const imageData = currentGalleryImages[currentImageIndex];
    const lightboxContent = lightbox.querySelector('.lightbox-content');

    let mediaHTML = '';

    if (imageData.isVideo) {
        // Video element
        mediaHTML = `<video class="lightbox-video" controls autoplay>
            <source src="${imageData.image.src}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`;
    } else if (imageData.image.classList.contains('gallery-placeholder')) {
        // Placeholder
        mediaHTML = `<div class="gallery-placeholder" style="height: 400px; font-size: 8rem;">🎮</div>`;
    } else {
        // Regular image
        mediaHTML = `<img src="${imageData.image.src}" alt="${imageData.title}" class="lightbox-image">`;
    }

    lightboxContent.innerHTML = `
        ${mediaHTML}
        <div class="lightbox-caption">
            <h3>${imageData.title}</h3>
            <p>${imageData.description}</p>
            <p class="text-secondary"><small>Image ${currentImageIndex + 1} of ${currentGalleryImages.length}</small></p>
        </div>
    `;
}

/**
 * Create a gallery programmatically (utility function)
 */
function createGallery(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '<div class="gallery-grid">';

    images.forEach((image, index) => {
        html += `
            <div class="gallery-item">
                ${image.src ?
                    `<img src="${image.src}" alt="${image.title}" class="gallery-image">` :
                    `<div class="gallery-placeholder">🎮</div>`
                }
                <div class="gallery-caption">
                    <h4>${image.title}</h4>
                    <p>${image.description || ''}</p>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;

    // Reinitialize gallery
    initializeGallery();
}

// Export functions for use in other scripts
window.createGallery = createGallery;
window.openLightbox = openLightbox;
