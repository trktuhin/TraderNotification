let previousData = "";

function checkForChanges() {
    logCurrentTime();

    // read current order count
    const targetEl = document.querySelector('div[data-auto="order_count"] .vBIeHEz6.hV4L34DK');
    let orderCount = 'No orders';
    if (targetEl) {
        orderCount = targetEl.textContent.trim();
    }

    // read previous order count
    const storedCount = localStorage.getItem('orderCount');

    console.log("Previous:" + storedCount + " Latest:" + orderCount);

    if (orderCount !== storedCount) {
        chrome.runtime.sendMessage({ action: 'playNotification' });
        localStorage.setItem('orderCount', orderCount);
    }
}

function logCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
    console.log(`Checking Time: ${formattedTime}`);
}

checkForChanges();