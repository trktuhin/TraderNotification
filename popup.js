const monitorSwitch = document.getElementById("monitorSwitch");

monitorSwitch.addEventListener("change", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.runtime.sendMessage({ action: monitorSwitch.checked ? "start" : "stop", tabId: tab.id });
});