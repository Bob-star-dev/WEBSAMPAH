// Shared JavaScript for Smart Trash Bin App
// Navigation and common functions

// Navigation handler
function navigateTo(page) {
    window.location.href = page;
}

// Set active navigation item
function setActiveNav(page) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current page
    const currentNav = document.querySelector(`[data-page="${page}"]`);
    if (currentNav) {
        currentNav.classList.add('active');
    }
}

// Get current page name from URL
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Map to page identifiers
    if (page === 'index.html' || page === '' || page === 'dashboard.html') {
        return 'dashboard';
    } else if (page === 'analitik.html') {
        return 'analitik';
    } else if (page === 'rekomendasi.html') {
        return 'rekomendasi';
    } else if (page === 'profil.html') {
        return 'profil';
    }
    
    return 'dashboard';
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();
    setActiveNav(currentPage);
});

// Chart.js configuration
let chartInstance = null;

function initChart(canvasId, type = 'bar') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    // Destroy existing chart if any
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    chartInstance = new Chart(ctx, {
        type: type,
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#4b5563',
                        font: {
                            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#6b7280'
                    },
                    grid: {
                        color: '#e5e7eb'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#6b7280',
                        stepSize: 1
                    },
                    grid: {
                        color: '#e5e7eb'
                    }
                }
            }
        }
    });
    
    return chartInstance;
}

// Update chart data
function updateChart(chart, labels, organicData, nonOrganicData) {
    if (!chart) return;
    
    chart.data.labels = labels;
    chart.data.datasets = [
        {
            label: 'Organik',
            data: organicData,
            backgroundColor: 'rgba(16, 185, 129, 0.3)',
            borderColor: '#10b981',
            borderWidth: 2,
            borderRadius: 8
        },
        {
            label: 'Non-Organik',
            data: nonOrganicData,
            backgroundColor: 'rgba(245, 158, 11, 0.3)',
            borderColor: '#f59e0b',
            borderWidth: 2,
            borderRadius: 8
        }
    ];
    
    chart.update();
}

// Utility function to format numbers
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// Show loading state
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    }
}

// Show empty state
function showEmptyState(elementId, message = 'Tidak ada data') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon"><i class="fas fa-chart-bar"></i></div>
                <div class="empty-text">${message}</div>
            </div>
        `;
    }
}

// Animate number counting
function animateNumber(element, targetValue, duration = 1000) {
    if (!element) return;
    
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 16);
}

// Export for use in other scripts
window.AppJS = {
    navigateTo,
    setActiveNav,
    getCurrentPage,
    initChart,
    updateChart,
    formatNumber,
    showLoading,
    showEmptyState,
    animateNumber
};

