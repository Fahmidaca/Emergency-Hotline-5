// Emergency Service Data
const emergencyServices = [
    {
        id: 1,
        icon: 'assets/emergency.png',
        name: 'National Emergency Number',
        english: 'National Emergency ',
        number: '999',
        category: 'All'
    },
    {
        id: 2,
        icon: 'assets/police.png',
        name: 'Police Helpline Number',
        english: 'Police ',
        number: '999',
        category: 'Police'
    },
    {
        id: 3,
        icon: 'assets/fire-service.png',
        name: 'Fire Service Number',
        english: 'Fire Service ',
        number: '999',
        category: 'Fire'
    },
    {
        id: 4,
        icon: 'assets/ambulance.png',
        name: 'Ambulance Service ',
        english: 'Ambulance ',
        number: '1994-999999',
        category: 'Health'
    },
    {
        id: 5,
        icon: 'assets/emergency.png',
        name: 'Women & Child Helpline',
        english: 'Women & Child Helpline',
        number: '109',
        category: 'Help'
    },
    {
        id: 6,
        icon: 'assets/emergency.png',
        name: 'Anti-corruption Helpline',
        english: 'Anti-corruption',
        number: '106',
        category: 'Govt.'
    },
    {
        id: 7,
        icon: 'assets/emergency.png',
        name: 'Electricity Helpline',
        english: 'Electricity outage',
        number: '16216',
        category: 'Electricity'
    },
    {
        id: 8,
        icon: 'assets/brac.png',
        name: 'BRAC Helpline',
        english: 'BRAC ',
        number: '16445',
        category: 'NGO'
    },
    {
        id: 9,
        icon: 'assets/Bangladesh-Railway.png',
        name: 'Railway Helpline',
        english: 'Railway ',
        number: '163',
        category: 'Travel'
    }
];

// State Management
let state = {
    heartCount: 0,
    coinCount: 100,
    copyCount: 2,
    callHistory: []
};

// DOM Elements
const cardsContainer = document.getElementById('cards-container');
const heartCountEl = document.getElementById('heart-count');
const coinCountEl = document.getElementById('coin-count');
const copyCountEl = document.getElementById('copy-count');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');

function init() {
    loadFromLocalStorage();
    renderCards();
    updateCounts();
    renderHistory();
    setupEventListeners();
}

// Render emergency service cards
function renderCards() {
    cardsContainer.innerHTML = '';
    
        emergencyServices.forEach(service => {
            const card = document.createElement('div');
            card.className = 'card';
            // Add police-icon class if category is Police
            const iconClass = service.category === 'Police' ? 'card-icon police-icon' : 'card-icon';
            card.innerHTML = `
                <div class="card-header">
                    <img src="${service.icon}" alt="${service.english}" class="${iconClass}">
                </div>
                <h3 class="card-title">${service.name}</h3>
                <p class="card-english">${service.english}</p>
                <p class="card-number">${service.number}</p>
                <span class="card-category">${service.category}</span>
                <div class="card-footer">
                    <button class="heart-btn" data-service-id="${service.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <div class="action-buttons">
                            <button class="btn btn-copy" data-service-id="${service.id}">
                                <i class="fas fa-copy"></i> Copy
                            </button>
                            <button class="btn btn-call" data-service-id="${service.id}">
                                <i class="fas fa-phone"></i> Call
                            </button>
                    </div>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
}

// Update all counts in the navbar
function updateCounts() {
    heartCountEl.textContent = state.heartCount;
    coinCountEl.textContent = state.coinCount;
    copyCountEl.textContent = `${state.copyCount} copy`;
}

// Setup event listeners
function setupEventListeners() {
    // Heart button clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.heart-btn')) {
            const heartBtn = e.target.closest('.heart-btn');
            const serviceId = parseInt(heartBtn.dataset.serviceId);
            handleHeartClick(serviceId, heartBtn);
        }
        
        // Copy button clicks
        if (e.target.closest('.btn-copy')) {
            const copyBtn = e.target.closest('.btn-copy');
            const serviceId = parseInt(copyBtn.dataset.serviceId);
            handleCopyClick(serviceId);
        }
        
        // Call button clicks
        if (e.target.closest('.btn-call')) {
            const callBtn = e.target.closest('.btn-call');
            const serviceId = parseInt(callBtn.dataset.serviceId);
            handleCallClick(serviceId);
        }
    });
    
    // Clear history button
    clearHistoryBtn.addEventListener('click', clearHistory);
}

// Handle heart button click
function handleHeartClick(serviceId, heartBtn) {
    state.heartCount++;
    updateCounts();
    saveToLocalStorage();
    
    // Visual feedback
    heartBtn.classList.add('liked');
    setTimeout(() => {
        heartBtn.classList.remove('liked');
    }, 1000);
}

// Handle copy button click
function handleCopyClick(serviceId) {
    const service = emergencyServices.find(s => s.id === serviceId);
    if (!service) return;
    
    // Copy to clipboard
    navigator.clipboard.writeText(service.number)
        .then(() => {
            // Show alert
            alert(`Copied: ${service.number} (${service.name})`);
            
            // Update copy count
            state.copyCount++;
            updateCounts();
            saveToLocalStorage();
        })
        .catch(err => {
            console.error('Copy failed:', err);
            alert('Copy failed. Please try again.');
        });
}

// Handle call button click
function handleCallClick(serviceId) {
    const service = emergencyServices.find(s => s.id === serviceId);
    if (!service) return;
    
    // Check if enough coins
    if (state.coinCount < 20) {
        alert('Insufficient coins! Please collect more coins.');
        return;
    }
    
    // Show call alert
        alert(`Calling: ${service.number} (${service.name})`);
    
    // Deduct coins
    state.coinCount -= 20;
    updateCounts();
    
    // Add to call history with timestamp
    const callTime = new Date().toLocaleString('en-US');
    state.callHistory.unshift({
        service: service.name,
        number: service.number,
        time: callTime
    });
    
    // Render updated history
    renderHistory();
    saveToLocalStorage();
}

function renderHistory() {
    if (state.callHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No call history</p>';
        return;
    }
    
    historyList.innerHTML = '';
    // Show only the latest 6 call history items
    state.callHistory.slice(0, 6).forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-service">${item.service}</div>
            <div class="history-number">${item.number}</div>
            <div class="history-time">${item.time}</div>
        `;
        historyList.appendChild(historyItem);
    });
}

// Clear call history
function clearHistory() {
    if (state.callHistory.length === 0) {
        alert('History is already empty');
        return;
    }
    
        if (confirm('Are you sure you want to clear all call history?')) {
        state.callHistory = [];
        renderHistory();
        saveToLocalStorage();
        alert('History has been successfully cleared');
    }
}

// Local Storage functions
function saveToLocalStorage() {
    localStorage.setItem('emergencyHotlineState', JSON.stringify(state));
}

function loadFromLocalStorage() {
    const savedState = localStorage.getItem('emergencyHotlineState');
    if (savedState) {
        state = { ...state, ...JSON.parse(savedState) };
        updateCounts();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
