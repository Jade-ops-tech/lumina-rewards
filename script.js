// Initialize Lucide icons
lucide.createIcons();

// Simple Router Logic for handling screen transitions
function navigateTo(targetScreenId) {
    // Get all screens
    const screens = document.querySelectorAll('.screen');
    
    // Remove active class to start exit transition
    screens.forEach(screen => {
        if (screen.classList.contains('active')) {
            screen.classList.remove('active');
        }
    });

    // Small delay before showing new screen to allow exit transition
    setTimeout(() => {
        const targetScreen = document.getElementById(targetScreenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            
            // Re-trigger animations by cloning and replacing nodes
            // This is a neat trick to restart CSS animations without JS animation libraries
            const animateNodes = targetScreen.querySelectorAll('.bounce-in, .slide-up, .fade-in-up, .fade-in');
            
            // Depending on performance, cloning isn't strictly necessary if animation: none is handled in CSS appropriately.
            // Our CSS rules already handle resetting animation when `.active` is removed.
            
            // Update bottom nav state if going to home screen
            if (targetScreenId === 'screen-home') {
                updateBottomNav(0);
            } else if (targetScreenId === 'screen-staff') {
                updateBottomNav(2); // Me/Staff tab
            } else {
                updateBottomNav(-1); // No active tab
            }
        }
    }, 50); // very short delay to allow browser to register the removeClass
}

// Handle Bottom Navigation state
function updateBottomNav(activeIndex) {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach((item, index) => {
        if (index === activeIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Reward Selection Logic in Staff Portal
function selectReward(element) {
    if (element.classList.contains('insufficient')) return;
    
    // Deselect all
    const rewards = document.querySelectorAll('.reward-item');
    rewards.forEach(r => r.classList.remove('selected'));
    
    // Select clicked
    element.classList.add('selected');
}

// Simple Countdown for QR code screen
let countdownInterval;
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    
    let timeLeft = 45;
    
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) timeLeft = 45; // Reset loop
        countdownEl.textContent = timeLeft;
    }, 1000);
}

// Initialize things
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});
