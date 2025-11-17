/* ===================================
   Visualizations JavaScript
   Interactive Charts and Infographics
   =================================== */

/**
 * Create a comparison chart for console specifications
 */
function createSpecsComparison(containerId, consoles) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const specs = ['cpu', 'memory', 'unitsSold'];
    const labels = {
        cpu: 'CPU Speed (MHz)',
        memory: 'RAM (KB)',
        unitsSold: 'Units Sold (millions)'
    };

    let html = '<div class="specs-comparison">';

    specs.forEach(spec => {
        html += `
            <div class="spec-chart">
                <h4>${labels[spec]}</h4>
                <div class="chart-bars">
        `;

        consoles.forEach(console => {
            const value = extractNumericValue(console[spec]);
            const maxValue = Math.max(...consoles.map(c => extractNumericValue(c[spec])));
            const percentage = (value / maxValue) * 100;

            html += `
                <div class="chart-bar-container">
                    <div class="chart-label">${console.name}</div>
                    <div class="chart-bar-wrapper">
                        <div class="chart-bar manufacturer-${console.manufacturer.toLowerCase()}"
                             style="width: ${percentage}%">
                            <span class="chart-value">${console[spec]}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

/**
 * Extract numeric value from spec strings
 */
function extractNumericValue(spec) {
    if (typeof spec === 'number') return spec;
    if (typeof spec !== 'string') return 0;

    // Extract first number from string
    const match = spec.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
}

/**
 * Create a timeline visualization for a specific era
 */
function createEraTimeline(containerId, events) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const minYear = Math.min(...events.map(e => e.year));
    const maxYear = Math.max(...events.map(e => e.year));
    const yearRange = maxYear - minYear;

    let html = '<div class="era-timeline-viz">';

    html += '<div class="timeline-axis">';
    for (let year = minYear; year <= maxYear; year++) {
        html += `<div class="year-marker">${year}</div>`;
    }
    html += '</div>';

    html += '<div class="timeline-events">';

    events.forEach(event => {
        const position = ((event.year - minYear) / yearRange) * 100;
        html += `
            <div class="timeline-event-marker"
                 style="left: ${position}%"
                 title="${event.title} (${event.year})">
                <div class="event-dot"></div>
                <div class="event-label">${event.title}</div>
            </div>
        `;
    });

    html += '</div>';
    html += '</div>';

    container.innerHTML = html;
}

/**
 * Create a graphics evolution comparison slider
 */
function createGraphicsComparison(containerId, generations) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let currentIndex = 0;

    let html = `
        <div class="graphics-comparison">
            <div class="comparison-display" id="comparisonDisplay">
                ${generateComparisonSlide(generations[0])}
            </div>
            <div class="comparison-controls">
                <button class="comparison-btn" id="prevGen">← Previous Generation</button>
                <span class="comparison-indicator" id="genIndicator">1 / ${generations.length}</span>
                <button class="comparison-btn" id="nextGen">Next Generation →</button>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Add event listeners
    const prevBtn = document.getElementById('prevGen');
    const nextBtn = document.getElementById('nextGen');
    const display = document.getElementById('comparisonDisplay');
    const indicator = document.getElementById('genIndicator');

    function updateDisplay() {
        display.innerHTML = generateComparisonSlide(generations[currentIndex]);
        indicator.textContent = `${currentIndex + 1} / ${generations.length}`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + generations.length) % generations.length;
        updateDisplay();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % generations.length;
        updateDisplay();
    });
}

/**
 * Generate a comparison slide for graphics evolution
 */
function generateComparisonSlide(gen) {
    return `
        <div class="gen-comparison-slide">
            <div class="gen-info">
                <h3>${gen.name}</h3>
                <p class="gen-years">${gen.years}</p>
            </div>
            <div class="gen-specs">
                <div class="spec-item">
                    <strong>Resolution:</strong> ${gen.resolution}
                </div>
                <div class="spec-item">
                    <strong>Colors:</strong> ${gen.colors}
                </div>
                <div class="spec-item">
                    <strong>Key Innovation:</strong> ${gen.innovation}
                </div>
            </div>
            <div class="gen-visual">
                <!-- Placeholder for visual representation -->
                <div class="visual-placeholder">${gen.visualEmoji || '🎮'}</div>
            </div>
        </div>
    `;
}

/**
 * Create a pie chart for market share
 */
function createMarketShareChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    let html = '<div class="pie-chart-container">';
    html += '<svg viewBox="0 0 200 200" class="pie-chart">';

    data.forEach((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        const largeArc = angle > 180 ? 1 : 0;

        const x1 = 100 + 80 * Math.cos((currentAngle - 90) * Math.PI / 180);
        const y1 = 100 + 80 * Math.sin((currentAngle - 90) * Math.PI / 180);

        currentAngle += angle;

        const x2 = 100 + 80 * Math.cos((currentAngle - 90) * Math.PI / 180);
        const y2 = 100 + 80 * Math.sin((currentAngle - 90) * Math.PI / 180);

        html += `
            <path d="M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z"
                  fill="var(--${item.color})"
                  class="pie-slice"
                  data-label="${item.label}"
                  data-percentage="${percentage.toFixed(1)}">
            </path>
        `;
    });

    html += '</svg>';

    html += '<div class="pie-legend">';
    data.forEach(item => {
        const percentage = ((item.value / total) * 100).toFixed(1);
        html += `
            <div class="legend-item">
                <div class="legend-color" style="background: var(--${item.color})"></div>
                <span>${item.label}: ${percentage}%</span>
            </div>
        `;
    });
    html += '</div>';

    html += '</div>';

    container.innerHTML = html;
}

/**
 * Initialize all visualizations on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Example: Initialize any visualization containers found on the page
    const vizContainers = document.querySelectorAll('[data-visualization]');

    vizContainers.forEach(container => {
        const vizType = container.getAttribute('data-visualization');
        const vizData = container.getAttribute('data-viz-data');

        // Load and render based on visualization type
        if (vizType && vizData) {
            // Parse data and create visualization
            // This would be expanded based on actual implementation needs
        }
    });
});

// Export functions for use in other scripts
window.createSpecsComparison = createSpecsComparison;
window.createEraTimeline = createEraTimeline;
window.createGraphicsComparison = createGraphicsComparison;
window.createMarketShareChart = createMarketShareChart;
