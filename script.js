// Database sampah untuk klasifikasi
const wasteDatabase = {
    organic: [
        'pisang', 'apel', 'jeruk', 'mangga', 'nanas', 'semangka', 'anggur',
        'sayur', 'sayuran', 'bayam', 'kangkung', 'wortel', 'kentang', 'tomat',
        'sisa makanan', 'nasi', 'mie', 'roti', 'buah', 'daun', 'batang',
        'kulit buah', 'bangkai', 'kotoran', 'sampah dapur', 'limbah makanan',
        'ampas tahu', 'ampas kopi', 'daun kering', 'ranting', 'rumput'
    ],
    nonOrganic: [
        'botol plastik', 'plastik', 'kantong plastik', 'bungkus plastik',
        'gelas plastik', 'sedotan plastik', 'stereofoam', 'styrofoam',
        'kaca', 'botol kaca', 'gelas kaca', 'beling',
        'logam', 'aluminium', 'kaleng', 'besi', 'seng',
        'kertas', 'kardus', 'koran', 'majalah', 'buku',
        'kain', 'tekstil', 'baterai', 'elektronik', 'kabel',
        'ban', 'karet', 'baterai bekas', 'lampu', 'bolam'
    ]
};

// Statistik
let stats = {
    organic: parseInt(localStorage.getItem('organicCount')) || 0,
    nonOrganic: parseInt(localStorage.getItem('nonOrganicCount')) || 0
};

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get daily statistics from localStorage
function getDailyStats() {
    const dailyData = localStorage.getItem('dailyStats');
    return dailyData ? JSON.parse(dailyData) : {};
}

// Save daily statistics to localStorage
function saveDailyStats(dailyData) {
    localStorage.setItem('dailyStats', JSON.stringify(dailyData));
}

// Update daily statistics
function updateDailyStats(type) {
    const today = getTodayDate();
    const dailyData = getDailyStats();
    
    if (!dailyData[today]) {
        dailyData[today] = {
            organic: 0,
            nonOrganic: 0,
            date: today
        };
    }
    
    if (type === 'organic') {
        dailyData[today].organic++;
    } else {
        dailyData[today].nonOrganic++;
    }
    
    saveDailyStats(dailyData);
    displayDailyHistory();
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
}

// Display daily history
function displayDailyHistory() {
    const dailyData = getDailyStats();
    const dailyHistory = document.getElementById('dailyHistory');
    const today = getTodayDate();
    
    // Sort dates descending (newest first)
    const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(b) - new Date(a));
    
    // Limit to last 30 days
    const recentDates = sortedDates.slice(0, 30);
    
    if (recentDates.length === 0) {
        dailyHistory.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 20px;">Belum ada data harian. Mulai klasifikasi sampah untuk melihat statistik harian!</p>';
        return;
    }
    
    let html = '';
    recentDates.forEach(date => {
        const data = dailyData[date];
        const total = data.organic + data.nonOrganic;
        const isToday = date === today;
        
        html += `
            <div class="daily-history-item ${isToday ? 'today' : ''}">
                <div class="daily-date">
                    <div class="date-label">
                        <span>${formatDate(date)}</span>
                        ${isToday ? '<span class="today-badge">Hari Ini</span>' : ''}
                    </div>
                </div>
                <div class="daily-numbers">
                    <div class="daily-number-item organic">
                        <div class="daily-number-label">Organik</div>
                        <div class="daily-number-value">${data.organic}</div>
                    </div>
                    <div class="daily-number-item non-organic">
                        <div class="daily-number-label">Non-Organik</div>
                        <div class="daily-number-value">${data.nonOrganic}</div>
                    </div>
                </div>
                <div class="daily-total">Total: ${total} sampah</div>
            </div>
        `;
    });
    
    dailyHistory.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    setupFileInput();
    displayDailyHistory();
    
    // Initialize chart if on grafik tab
    setTimeout(() => {
        if (document.getElementById('grafik').classList.contains('active')) {
            initChart();
            showChart('harian');
        }
    }, 500);
});

// Setup file input
function setupFileInput() {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);
}

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            showPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// Show preview
function showPreview(imageSrc) {
    const uploadArea = document.getElementById('uploadArea');
    const previewArea = document.getElementById('previewArea');
    const previewImage = document.getElementById('previewImage');
    
    uploadArea.style.display = 'none';
    previewArea.style.display = 'block';
    previewImage.src = imageSrc;
    
    // Auto classify after showing preview
    setTimeout(() => {
        classifyImage(imageSrc);
    }, 500);
}

// Cancel upload
function cancelUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const previewArea = document.getElementById('previewArea');
    const resultArea = document.getElementById('resultArea');
    const fileInput = document.getElementById('fileInput');
    
    uploadArea.style.display = 'block';
    previewArea.style.display = 'none';
    resultArea.style.display = 'none';
    fileInput.value = '';
}

// Open camera
function openCamera() {
    const fileInput = document.getElementById('fileInput');
    fileInput.setAttribute('capture', 'environment');
    fileInput.click();
}

// Classify image (simulated AI classification)
function classifyImage(imageSrc) {
    const resultArea = document.getElementById('resultArea');
    const resultContent = document.getElementById('resultContent');
    
    resultArea.style.display = 'block';
    resultContent.innerHTML = '<div class="loading"></div><p>Menganalisis gambar...</p>';
    
    // Simulate AI processing delay
    setTimeout(() => {
        // For demo purposes, randomly classify or use image analysis
        // In real implementation, this would use TensorFlow.js or API call
        const classification = simulateImageClassification();
        displayResult(classification);
    }, 2000);
}

// Simulate image classification
function simulateImageClassification() {
    // In a real app, this would use ML model
    // For demo, we'll use a simple heuristic based on image analysis simulation
    const random = Math.random();
    
    // Simulate 70% accuracy for organic, 30% for non-organic (realistic distribution)
    if (random < 0.5) {
        return {
            type: 'organic',
            name: 'Sampah Organik',
            description: 'Sampah ini dapat terurai secara alami dan cocok untuk kompos',
            icon: '',
            confidence: (75 + Math.random() * 20).toFixed(1)
        };
    } else {
        return {
            type: 'non-organic',
            name: 'Sampah Non-Organik',
            description: 'Sampah ini tidak dapat terurai dan sebaiknya didaur ulang',
            icon: '',
            confidence: (75 + Math.random() * 20).toFixed(1)
        };
    }
}

// Classify manual input
function classifyManual() {
    const input = document.getElementById('wasteInput').value.toLowerCase().trim();
    
    if (!input) {
        alert('Silakan masukkan nama sampah terlebih dahulu!');
        return;
    }
    
    const resultArea = document.getElementById('resultArea');
    const resultContent = document.getElementById('resultContent');
    const previewArea = document.getElementById('previewArea');
    
    previewArea.style.display = 'none';
    resultArea.style.display = 'block';
    resultContent.innerHTML = '<div class="loading"></div><p>Menganalisis...</p>';
    
    setTimeout(() => {
        const classification = classifyWaste(input);
        displayResult(classification);
    }, 1000);
}

// Classify waste based on database
function classifyWaste(wasteName) {
    const lowerName = wasteName.toLowerCase();
    
    // Check organic
    for (let item of wasteDatabase.organic) {
        if (lowerName.includes(item) || item.includes(lowerName)) {
            return {
                type: 'organic',
                name: 'Sampah Organik',
                description: 'Sampah ini dapat terurai secara alami dan cocok untuk kompos atau pengolahan organik lainnya.',
                icon: '',
                confidence: '95.0',
                wasteName: wasteName
            };
        }
    }
    
    // Check non-organic
    for (let item of wasteDatabase.nonOrganic) {
        if (lowerName.includes(item) || item.includes(lowerName)) {
            return {
                type: 'non-organic',
                name: 'Sampah Non-Organik',
                description: 'Sampah ini tidak dapat terurai secara alami dan sebaiknya didaur ulang atau diolah secara khusus.',
                icon: '',
                confidence: '95.0',
                wasteName: wasteName
            };
        }
    }
    
    // If not found, make educated guess based on keywords
    if (lowerName.includes('plastik') || lowerName.includes('kaca') || lowerName.includes('logam') || 
        lowerName.includes('kaleng') || lowerName.includes('botol') || lowerName.includes('kertas')) {
        return {
            type: 'non-organic',
            name: 'Sampah Non-Organik',
            description: 'Berdasarkan karakteristik, sampah ini kemungkinan besar non-organik dan dapat didaur ulang.',
            icon: '',
            confidence: '80.0',
            wasteName: wasteName
        };
    }
    
    // Default to organic for food-related items
    return {
        type: 'organic',
        name: 'Sampah Organik',
        description: 'Sampah ini kemungkinan besar organik dan dapat terurai secara alami.',
        icon: '🌿',
        confidence: '70.0',
        wasteName: wasteName
    };
}

// Display classification result
function displayResult(result) {
    const resultContent = document.getElementById('resultContent');
    const resultClass = result.type === 'organic' ? 'result-organic' : 'result-non-organic';
    
    let html = `
        <div class="${resultClass}">
            <div class="result-type">${result.name}</div>
            <div class="result-description">${result.description}</div>
            <div style="margin-top: 20px; font-size: 1.2em;">
                <strong>Tingkat Akurasi: ${result.confidence}%</strong>
            </div>
            ${result.wasteName ? `<div style="margin-top: 10px; font-size: 0.9em; opacity: 0.9;">Item: ${result.wasteName}</div>` : ''}
        </div>
        <div style="margin-top: 20px;">
            <p style="color: var(--text-light);">
                <strong>Tips:</strong> ${result.type === 'organic' 
                    ? 'Buang sampah ini ke bak organik untuk dijadikan kompos atau pupuk organik.'
                    : 'Buang sampah ini ke bak non-organik dan pastikan untuk dibersihkan sebelum didaur ulang.'}
            </p>
        </div>
    `;
    
    resultContent.innerHTML = html;
    
    // Update statistics
    updateStatistics(result.type);
    
    // Show bin opening animation (simulated)
    setTimeout(() => {
        showBinOpening(result.type);
    }, 500);
}

// Update statistics
function updateStatistics(type) {
    if (type === 'organic') {
        stats.organic++;
    } else {
        stats.nonOrganic++;
    }
    
    // Save to localStorage
    localStorage.setItem('organicCount', stats.organic);
    localStorage.setItem('nonOrganicCount', stats.nonOrganic);
    
    // Update daily statistics
    updateDailyStats(type);
    
    updateStats();
}

// Update stats display
function updateStats() {
    const total = stats.organic + stats.nonOrganic;
    const organicPercentage = total > 0 ? ((stats.organic / total) * 100).toFixed(1) : 0;
    const nonOrganicPercentage = total > 0 ? ((stats.nonOrganic / total) * 100).toFixed(1) : 0;
    
    document.getElementById('organicCount').textContent = stats.organic;
    document.getElementById('nonOrganicCount').textContent = stats.nonOrganic;
    document.getElementById('totalCount').textContent = total;
    document.getElementById('organicPercentage').textContent = `${organicPercentage}%`;
    document.getElementById('nonOrganicPercentage').textContent = `${nonOrganicPercentage}%`;
}

// Reset statistics
function resetStats() {
    if (confirm('Apakah Anda yakin ingin mereset semua statistik? (Ini akan menghapus semua data termasuk statistik harian)')) {
        stats.organic = 0;
        stats.nonOrganic = 0;
        localStorage.setItem('organicCount', 0);
        localStorage.setItem('nonOrganicCount', 0);
        localStorage.removeItem('dailyStats');
        updateStats();
        displayDailyHistory();
        alert('Statistik telah direset!');
    }
}

// Show bin opening animation (simulated)
function showBinOpening(type) {
    // In a real implementation, this would trigger actual hardware
    console.log(`Opening ${type} bin...`);
    
    // Show notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'organic' ? 'var(--organic-color)' : 'var(--non-organic-color)'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        <strong>Bak ${type === 'organic' ? 'Organik' : 'Non-Organik'} Dibuka!</strong>
        <p style="margin: 5px 0 0 0; font-size: 0.9em;">Silakan buang sampah Anda</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Chart variables
let wasteChart = null;

// Initialize chart
function initChart() {
    const ctx = document.getElementById('wasteChart');
    if (ctx) {
        if (wasteChart) {
            wasteChart.destroy();
        }
        wasteChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Organik',
                    data: [],
                    backgroundColor: 'rgba(39, 174, 96, 0.8)',
                    borderColor: 'rgba(39, 174, 96, 1)',
                    borderWidth: 2
                }, {
                    label: 'Non-Organik',
                    data: [],
                    backgroundColor: 'rgba(231, 76, 60, 0.8)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: false
                    }
                }
            }
        });
    }
}

// Show chart based on period
function showChart(period) {
    // Update button active state
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-period') === period) {
            btn.classList.add('active');
        }
    });
    
    // Update chart title
    const titles = {
        'harian': 'Grafik Harian (7 Hari Terakhir)',
        'mingguan': 'Grafik Mingguan (4 Minggu Terakhir)',
        'bulanan': 'Grafik Bulanan (12 Bulan Terakhir)'
    };
    document.getElementById('chartTitle').textContent = titles[period];
    
    const chartData = getChartData(period);
    
    if (wasteChart) {
        wasteChart.data.labels = chartData.labels;
        wasteChart.data.datasets[0].data = chartData.organic;
        wasteChart.data.datasets[1].data = chartData.nonOrganic;
        wasteChart.update();
    } else {
        initChart();
        setTimeout(() => {
            if (wasteChart) {
                wasteChart.data.labels = chartData.labels;
                wasteChart.data.datasets[0].data = chartData.organic;
                wasteChart.data.datasets[1].data = chartData.nonOrganic;
                wasteChart.update();
            }
        }, 100);
    }
}

// Get chart data based on period
function getChartData(period) {
    const dailyData = getDailyStats();
    const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b));
    
    let labels = [];
    let organic = [];
    let nonOrganic = [];
    
    if (period === 'harian') {
        // Last 7 days
        const last7Days = sortedDates.slice(-7);
        last7Days.forEach(date => {
            const data = dailyData[date];
            labels.push(formatDateShort(date));
            organic.push(data.organic || 0);
            nonOrganic.push(data.nonOrganic || 0);
        });
    } else if (period === 'mingguan') {
        // Last 4 weeks
        const weeks = getWeeklyData(sortedDates, dailyData, 4);
        weeks.forEach(week => {
            labels.push(week.label);
            organic.push(week.organic);
            nonOrganic.push(week.nonOrganic);
        });
    } else if (period === 'bulanan') {
        // Last 12 months
        const months = getMonthlyData(sortedDates, dailyData, 12);
        months.forEach(month => {
            labels.push(month.label);
            organic.push(month.organic);
            nonOrganic.push(month.nonOrganic);
        });
    }
    
    return { labels, organic, nonOrganic };
}

// Format date short (DD/MM)
function formatDateShort(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
}

// Get weekly aggregated data
function getWeeklyData(dates, dailyData, weeksCount) {
    const weeks = [];
    const today = new Date();
    
    for (let i = weeksCount - 1; i >= 0; i--) {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - (i * 7) - 6);
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        
        let organic = 0;
        let nonOrganic = 0;
        
        dates.forEach(date => {
            const dateObj = new Date(date + 'T00:00:00');
            if (dateObj >= weekStart && dateObj <= weekEnd) {
                const data = dailyData[date];
                organic += data.organic || 0;
                nonOrganic += data.nonOrganic || 0;
            }
        });
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const label = `Minggu ${weekStart.getDate()}-${weekEnd.getDate()} ${monthNames[weekStart.getMonth()]}`;
        
        weeks.push({ label, organic, nonOrganic });
    }
    
    return weeks;
}

// Get monthly aggregated data
function getMonthlyData(dates, dailyData, monthsCount) {
    const months = [];
    const today = new Date();
    
    for (let i = monthsCount - 1; i >= 0; i--) {
        const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
        
        let organic = 0;
        let nonOrganic = 0;
        
        dates.forEach(date => {
            const dateObj = new Date(date + 'T00:00:00');
            if (dateObj >= monthStart && dateObj <= monthEnd) {
                const data = dailyData[date];
                organic += data.organic || 0;
                nonOrganic += data.nonOrganic || 0;
            }
        });
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const label = `${monthNames[monthStart.getMonth()]} ${monthStart.getFullYear()}`;
        
        months.push({ label, organic, nonOrganic });
    }
    
    return months;
}

// Generate Smart Recommendations
function generateSmartRecommendations() {
    const dailyData = getDailyStats();
    const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b));
    const today = getTodayDate();
    const todayData = dailyData[today] || { organic: 0, nonOrganic: 0 };
    
    // Calculate averages
    let totalOrganic = 0;
    let totalNonOrganic = 0;
    let dayCount = sortedDates.length;
    
    sortedDates.forEach(date => {
        const data = dailyData[date];
        totalOrganic += data.organic || 0;
        totalNonOrganic += data.nonOrganic || 0;
    });
    
    const avgOrganic = dayCount > 0 ? (totalOrganic / dayCount) : 0;
    const avgNonOrganic = dayCount > 0 ? (totalNonOrganic / dayCount) : 0;
    const avgTotal = avgOrganic + avgNonOrganic;
    
    // Get last 7 days data
    const last7Days = sortedDates.slice(-7);
    let weekOrganic = 0;
    let weekNonOrganic = 0;
    last7Days.forEach(date => {
        const data = dailyData[date];
        weekOrganic += data.organic || 0;
        weekNonOrganic += data.nonOrganic || 0;
    });
    
    const recommendations = [];
    const insights = [];
    const trends = [];
    
    // Recommendation 1: Based on today's usage
    if (todayData.organic + todayData.nonOrganic > avgTotal * 1.5) {
        recommendations.push({
            icon: '',
            title: 'Penggunaan Tinggi Hari Ini',
            desc: `Hari ini Anda telah membuang ${todayData.organic + todayData.nonOrganic} sampah, lebih tinggi dari rata-rata ${avgTotal.toFixed(1)} per hari. Pertimbangkan untuk mengurangi konsumsi atau menggunakan produk yang lebih ramah lingkungan.`
        });
    }
    
    // Recommendation 2: Organic vs Non-Organic ratio
    const organicRatio = totalOrganic / (totalOrganic + totalNonOrganic || 1) * 100;
    if (organicRatio < 40) {
        recommendations.push({
            icon: '',
            title: 'Tingkatkan Penggunaan Produk Organik',
            desc: `Rasio sampah organik Anda hanya ${organicRatio.toFixed(1)}%. Coba gunakan lebih banyak produk yang dapat terurai alami dan kurangi penggunaan plastik sekali pakai.`
        });
    } else if (organicRatio > 70) {
        recommendations.push({
            icon: '',
            title: 'Bagus! Tingkat Organik Tinggi',
            desc: `Rasio sampah organik Anda ${organicRatio.toFixed(1)}% sangat baik! Teruskan kebiasaan baik ini untuk lingkungan yang lebih sehat.`
        });
    }
    
    // Recommendation 3: Weekly trend
    if (last7Days.length >= 3) {
        const firstHalf = last7Days.slice(0, Math.floor(last7Days.length / 2));
        const secondHalf = last7Days.slice(Math.floor(last7Days.length / 2));
        
        let firstHalfTotal = 0;
        let secondHalfTotal = 0;
        
        firstHalf.forEach(date => {
            const data = dailyData[date];
            firstHalfTotal += (data.organic || 0) + (data.nonOrganic || 0);
        });
        
        secondHalf.forEach(date => {
            const data = dailyData[date];
            secondHalfTotal += (data.organic || 0) + (data.nonOrganic || 0);
        });
        
        if (secondHalfTotal > firstHalfTotal * 1.2) {
            recommendations.push({
                icon: '',
                title: 'Tren Meningkat Terdeteksi',
                desc: 'Penggunaan sampah Anda meningkat dalam beberapa hari terakhir. Evaluasi pola konsumsi dan pertimbangkan daur ulang lebih banyak.'
            });
        } else if (secondHalfTotal < firstHalfTotal * 0.8) {
            recommendations.push({
                icon: '',
                title: 'Tren Menurun - Bagus!',
                desc: 'Penggunaan sampah Anda menurun. Teruskan upaya untuk mengurangi limbah!'
            });
        }
    }
    
    // Default recommendation if no specific recommendations
    if (recommendations.length === 0) {
        recommendations.push({
            icon: '',
            title: 'Tetap Konsisten',
            desc: 'Pola penggunaan sampah Anda sudah baik. Teruskan kebiasaan pemilahan sampah yang benar untuk menjaga lingkungan.'
        });
    }
    
    // Generate Insights
    insights.push({
        text: `Total sampah yang telah diklasifikasi: <strong>${totalOrganic + totalNonOrganic} item</strong>`
    });
    
    insights.push({
        text: `Rata-rata sampah per hari: <strong>${avgTotal.toFixed(1)} item</strong> (Organik: ${avgOrganic.toFixed(1)}, Non-Organik: ${avgNonOrganic.toFixed(1)})`
    });
    
    if (dayCount > 0) {
        insights.push({
            text: `Sampah organik: <strong>${totalOrganic} item (${organicRatio.toFixed(1)}%)</strong> | Non-organik: <strong>${totalNonOrganic} item (${(100 - organicRatio).toFixed(1)}%)</strong>`
        });
    }
    
    if (todayData.organic > 0 || todayData.nonOrganic > 0) {
        insights.push({
            text: `Sampah hari ini: <strong>${todayData.organic + todayData.nonOrganic} item</strong> (${todayData.organic} organik, ${todayData.nonOrganic} non-organik)`
        });
    }
    
    // Generate Trends
    if (last7Days.length >= 2) {
        const todayTotal = todayData.organic + todayData.nonOrganic;
        const yesterdayData = dailyData[last7Days[last7Days.length - 2]] || { organic: 0, nonOrganic: 0 };
        const yesterdayTotal = yesterdayData.organic + yesterdayData.nonOrganic;
        
        if (todayTotal > yesterdayTotal) {
            trends.push({
                text: `Tren hari ini: <strong>Meningkat ${todayTotal - yesterdayTotal} item</strong> dibandingkan kemarin`
            });
        } else if (todayTotal < yesterdayTotal) {
            trends.push({
                text: `Tren hari ini: <strong>Menurun ${yesterdayTotal - todayTotal} item</strong> dibandingkan kemarin`
            });
        } else {
            trends.push({
                text: `Tren hari ini: <strong>Stabil</strong> - sama seperti kemarin`
            });
        }
    }
    
    if (weekOrganic > weekNonOrganic) {
        trends.push({
            text: `Minggu ini: <strong>Lebih banyak organik (${weekOrganic} vs ${weekNonOrganic})</strong> - pola konsumsi yang baik!`
        });
    } else if (weekNonOrganic > weekOrganic) {
        trends.push({
            text: `Minggu ini: <strong>Lebih banyak non-organik (${weekNonOrganic} vs ${weekOrganic})</strong> - pertimbangkan mengurangi penggunaan plastik`
        });
    }
    
    // Display recommendations
    displayRecommendations(recommendations, insights, trends);
}

// Display recommendations
function displayRecommendations(recommendations, insights, trends) {
    const mainRecContainer = document.getElementById('mainRecommendations');
    const insightsContainer = document.getElementById('insightsList');
    const trendsContainer = document.getElementById('trendsList');
    
    // Main recommendations
    let recHtml = '';
    recommendations.forEach(rec => {
        recHtml += `
            <div class="recommendation-item">
                <div class="recommendation-title">
                    ${rec.title}
                </div>
                <div class="recommendation-desc">${rec.desc}</div>
            </div>
        `;
    });
    mainRecContainer.innerHTML = recHtml;
    
    // Insights
    let insightsHtml = '';
    insights.forEach(insight => {
        insightsHtml += `<li>${insight.text}</li>`;
    });
    insightsContainer.innerHTML = insightsHtml || '<li>Tidak ada data cukup untuk insight</li>';
    
    // Trends
    let trendsHtml = '';
    trends.forEach(trend => {
        trendsHtml += `<li>${trend.text}</li>`;
    });
    trendsContainer.innerHTML = trendsHtml || '<li>Tidak ada tren yang terdeteksi</li>';
}

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Refresh data when switching tabs
    if (tabName === 'statistik') {
        displayDailyHistory();
    } else if (tabName === 'grafik') {
        // Initialize chart and show daily by default
        setTimeout(() => {
            initChart();
            showChart('harian');
        }, 100);
    } else if (tabName === 'recommendation') {
        generateSmartRecommendations();
    }
}

// Allow Enter key to submit manual input
document.addEventListener('DOMContentLoaded', function() {
    const wasteInput = document.getElementById('wasteInput');
    if (wasteInput) {
        wasteInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                classifyManual();
            }
        });
    }
});