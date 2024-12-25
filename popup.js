let intervalId = null;
let selectedTabId;
let phase = 1;

const monitorSwitch = document.getElementById("monitorSwitch");

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'playNotification') {
        playNotification();
    }
});

monitorSwitch.addEventListener("change", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (monitorSwitch.checked) {
        startMonitoring(tab.id);
    } else {
        stopMonitoring();
    }
});

function playNotification() {
    const soundUrl = chrome.runtime.getURL('sounds/notification.wav');
    console.log("Sound url: ", soundUrl);
    const audio = new Audio(soundUrl);
    audio.play().then(() => {
        console.log("Played")
    }).catch((error) => {
        console.error('Error playing the sound:', error);
    });
}

function startMonitoring(tabId) {
    if (!intervalId) {
        intervalId = setInterval(() => {
            console.log("Current phase:", phase);
            logCurrentTime();
            if (phase === 6) {
                phase = 1;
                chrome.tabs.reload(Number(tabId));
                setTimeout(() => {
                    chrome.scripting.executeScript({
                        target: { tabId: Number(tabId) },
                        files: ["content.js"]
                    });
                }, 5000);
            }
            else {
                phase = phase + 1;
            }

        }, 10000); // 10 seconds
    }
}

function stopMonitoring() {
    selectedTabId = null;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function logCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
    console.log(`Phase Time: ${formattedTime}`);
}