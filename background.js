let intervalId = null;
let selectedTabId;
let phase = 1;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Selected action is:", message);
    if (message.action === "start") {
        selectedTabId = message.tabId;
        startMonitoring(message.tabId);
    } else if (message.action === "stop") {
        selectedTabId = null;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
});

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
                }, 10000);
            }
            else {
                phase = phase + 1;
            }

        }, 10000); // 10 seconds
    }
}


function logCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
    console.log(`Current Time: ${formattedTime}`);
}