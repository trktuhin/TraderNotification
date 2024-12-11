let previousData = "";

function checkForChanges() {
    logCurrentTime();
    // const currentData = document.body.innerText; // Or a specific selector
    // if (previousData && currentData !== previousData) {
    //     new Audio(chrome.runtime.getURL("notify.mp3")).play();
    // }
    // previousData = currentData;
}

function logCurrentTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
    console.log(`Current Time: ${formattedTime}`);
}

checkForChanges();