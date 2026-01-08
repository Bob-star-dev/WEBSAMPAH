// Dummy Data Generator for Smart Trash Bin App
// This will be replaced with Firebase data later

// Generate dummy data for the past 30 days
function generateDummyData() {
    const data = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = formatDate(date);
        
        // Generate random but realistic data
        // Organic waste typically more common
        const organic = Math.floor(Math.random() * 15) + 5; // 5-20 items
        const nonOrganic = Math.floor(Math.random() * 12) + 3; // 3-15 items
        
        data[dateStr] = {
            organic: organic,
            nonOrganic: nonOrganic,
            date: dateStr,
            timestamp: date.getTime()
        };
    }
    
    return data;
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Get today's date string
function getTodayDate() {
    return formatDate(new Date());
}

// Storage management
const DataManager = {
    // Initialize data - generate dummy if not exists
    init() {
        let data = localStorage.getItem('trashData');
        if (!data) {
            // Generate initial dummy data
            const dummyData = generateDummyData();
            localStorage.setItem('trashData', JSON.stringify(dummyData));
            return dummyData;
        }
        return JSON.parse(data);
    },
    
    // Get all data
    getAllData() {
        return this.init();
    },
    
    // Get today's data
    getTodayData() {
        const data = this.getAllData();
        const today = getTodayDate();
        return data[today] || { organic: 0, nonOrganic: 0, date: today };
    },
    
    // Get data for specific date range
    getDateRangeData(startDate, endDate) {
        const data = this.getAllData();
        const result = {};
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateStr = formatDate(d);
            if (data[dateStr]) {
                result[dateStr] = data[dateStr];
            } else {
                result[dateStr] = {
                    organic: 0,
                    nonOrganic: 0,
                    date: dateStr
                };
            }
        }
        
        return result;
    },
    
    // Get weekly data (last 4 weeks)
    getWeeklyData() {
        const data = this.getAllData();
        const weeks = [];
        const today = new Date();
        
        for (let i = 3; i >= 0; i--) {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - (i * 7) - 6);
            weekStart.setHours(0, 0, 0, 0);
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            
            let organic = 0;
            let nonOrganic = 0;
            
            Object.keys(data).forEach(dateStr => {
                const date = new Date(dateStr + 'T00:00:00');
                if (date >= weekStart && date <= weekEnd) {
                    organic += data[dateStr].organic || 0;
                    nonOrganic += data[dateStr].nonOrganic || 0;
                }
            });
            
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
                              'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const label = `Minggu ${weekStart.getDate()}-${weekEnd.getDate()} ${monthNames[weekStart.getMonth()]}`;
            
            weeks.push({
                label: label,
                organic: organic,
                nonOrganic: nonOrganic,
                total: organic + nonOrganic
            });
        }
        
        return weeks;
    },
    
    // Get monthly data (last 12 months)
    getMonthlyData() {
        const data = this.getAllData();
        const months = [];
        const today = new Date();
        
        for (let i = 11; i >= 0; i--) {
            const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
            
            let organic = 0;
            let nonOrganic = 0;
            
            Object.keys(data).forEach(dateStr => {
                const date = new Date(dateStr + 'T00:00:00');
                if (date >= monthStart && date <= monthEnd) {
                    organic += data[dateStr].organic || 0;
                    nonOrganic += data[dateStr].nonOrganic || 0;
                }
            });
            
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
                              'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const label = `${monthNames[monthStart.getMonth()]} ${monthStart.getFullYear()}`;
            
            months.push({
                label: label,
                organic: organic,
                nonOrganic: nonOrganic,
                total: organic + nonOrganic
            });
        }
        
        return months;
    },
    
    // Get statistics summary
    getStats() {
        const data = this.getAllData();
        let totalOrganic = 0;
        let totalNonOrganic = 0;
        let dayCount = Object.keys(data).length;
        
        Object.values(data).forEach(dayData => {
            totalOrganic += dayData.organic || 0;
            totalNonOrganic += dayData.nonOrganic || 0;
        });
        
        const total = totalOrganic + totalNonOrganic;
        const organicPercentage = total > 0 ? ((totalOrganic / total) * 100).toFixed(1) : 0;
        const nonOrganicPercentage = total > 0 ? ((totalNonOrganic / total) * 100).toFixed(1) : 0;
        
        return {
            totalOrganic,
            totalNonOrganic,
            total,
            organicPercentage,
            nonOrganicPercentage,
            dayCount,
            avgDaily: dayCount > 0 ? (total / dayCount).toFixed(1) : 0
        };
    },
    
    // Format date for display (Indonesian)
    formatDateDisplay(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${dayName}, ${day} ${month} ${year}`;
    },
    
    // Format date short (DD/MM)
    formatDateShort(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day}/${month}`;
    }
};

// Initialize data on load
DataManager.init();

