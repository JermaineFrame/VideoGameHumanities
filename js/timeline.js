/* ===================================
   Timeline JavaScript
   =================================== */

let timelineData = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', async function() {
    const timelineContainer = document.getElementById('timelineContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Load timeline data
    try {
        const response = await fetch('data/timeline-data.json');
        timelineData = await response.json();
        renderTimeline();
    } catch (error) {
        console.error('Error loading timeline data:', error);
        timelineContainer.innerHTML = '<p class="text-center">Error loading timeline data. Please refresh the page.</p>';
        return;
    }

    // Filter button handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Get filter value
            currentFilter = this.getAttribute('data-filter');

            // Filter and render
            filterTimeline();
        });
    });

    // Setup scroll animations
    setupScrollAnimations();
});

/**
 * Render the timeline with all events
 */
function renderTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    let currentEra = '';
    let html = '';

    timelineData.forEach((event, index) => {
        // Add era divider if entering new era
        if (event.era !== currentEra) {
            currentEra = event.era;
            const eraLabel = getEraLabel(event.era);
            html += `
                <div class="era-divider" data-era="${event.era}">
                    <h3>${eraLabel}</h3>
                </div>
            `;
        }

        // Create timeline item
        html += createTimelineItem(event, index);
    });

    timelineContainer.innerHTML = html;

    // Add click handlers for timeline items
    addTimelineClickHandlers();
}

/**
 * Create HTML for a single timeline item
 */
function createTimelineItem(event, index) {
    const manufacturerClass = `manufacturer-${event.manufacturer.toLowerCase().replace(/\s+/g, '-')}`;
    const categoryClass = event.category;

    return `
        <div class="timeline-item"
             data-id="${event.id}"
             data-manufacturer="${event.manufacturer.toLowerCase()}"
             data-category="${categoryClass}"
             data-era="${event.era}">
            <div class="timeline-marker ${manufacturerClass}"
                 data-event-id="${event.id}"
                 title="Click for details"></div>
            <div class="timeline-content" data-event-id="${event.id}">
                <span class="timeline-year">${event.year}</span>
                <h3 class="timeline-title">${event.title}</h3>
                <p class="timeline-description">${event.description}</p>
                <div class="timeline-meta">
                    <span class="timeline-badge badge-${categoryClass}">${formatCategory(event.category)}</span>
                    <span class="badge ${manufacturerClass}">${event.manufacturer}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Filter timeline based on current filter
 */
function filterTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const eraDividers = document.querySelectorAll('.era-divider');

    timelineItems.forEach(item => {
        let shouldShow = false;

        if (currentFilter === 'all') {
            shouldShow = true;
        } else if (currentFilter.startsWith('manufacturer-')) {
            const manufacturer = currentFilter.replace('manufacturer-', '');
            shouldShow = item.getAttribute('data-manufacturer') === manufacturer;
        } else {
            shouldShow = item.getAttribute('data-category') === currentFilter;
        }

        if (shouldShow) {
            item.classList.remove('hidden');
            item.classList.add('visible');
        } else {
            item.classList.add('hidden');
            item.classList.remove('visible');
        }
    });

    // Show/hide era dividers based on whether they have visible items
    eraDividers.forEach(divider => {
        const era = divider.getAttribute('data-era');
        const visibleItems = document.querySelectorAll(`.timeline-item[data-era="${era}"].visible`);

        if (visibleItems.length > 0) {
            divider.style.display = 'block';
        } else {
            divider.style.display = 'none';
        }
    });
}

/**
 * Setup scroll animations for timeline items
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * Add click handlers to timeline items to open modal
 */
function addTimelineClickHandlers() {
    const clickableElements = document.querySelectorAll('[data-event-id]');

    clickableElements.forEach(element => {
        element.addEventListener('click', function() {
            const eventId = parseInt(this.getAttribute('data-event-id'));
            const event = timelineData.find(e => e.id === eventId);

            if (event) {
                openEventModal(event);
            }
        });
    });
}

/**
 * Open modal with event details
 */
function openEventModal(event) {
    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('modalBody');

    const manufacturerClass = `manufacturer-${event.manufacturer.toLowerCase().replace(/\s+/g, '-')}`;

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-placeholder">🎮</div>
            <span class="badge ${manufacturerClass} mb-sm">${event.manufacturer}</span>
            <h2 class="modal-title">${event.title}</h2>
            <span class="timeline-year">${event.year}</span>
        </div>
        <div class="modal-content-text">
            <p>${event.description}</p>
            <hr style="margin: var(--spacing-lg) 0; border: none; border-top: 2px solid var(--medium-gray);">
            <h3>Details</h3>
            <p><strong>Console/Platform:</strong> ${event.console}</p>
            <p><strong>Type:</strong> ${formatCategory(event.category)}</p>
            ${event.category === 'console-release' ?
                `<p class="mt-md"><a href="consoles/${getConsoleSlug(event.console)}.html" class="btn btn-primary">View Console Page</a></p>` :
                ''}
        </div>
    `;

    modal.classList.add('active');
}

/**
 * Helper function to get era label
 */
function getEraLabel(era) {
    const labels = {
        'gen1-2': '1st & 2nd Generation (1972-1983)',
        'gen3': '3rd Generation (1983-1992)',
        'gen4': '4th Generation (1987-1996)',
        'gen5': '5th Generation (1993-2002)',
        'gen6': '6th Generation (2000-2006)',
        'gen7': '7th Generation (2005-2013)',
        'gen8': '8th Generation (2012-2020)',
        'gen9': '9th Generation (2020-Present)'
    };
    return labels[era] || era;
}

/**
 * Helper function to format category
 */
function formatCategory(category) {
    return category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

/**
 * Helper function to get console slug for URLs
 */
function getConsoleSlug(consoleName) {
    return consoleName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[()]/g, '')
        .replace(/\//g, '-');
}
