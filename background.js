let previousActiveTab = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (previousActiveTab && previousActiveTab !== activeInfo.tabId) {
    try {
      await chrome.tabs.sendMessage(previousActiveTab, { action: 'pauseMedia' });
    } catch (error) {
      console.log('Could not pause media in previous tab');
    }
  }

  try {
    await chrome.tabs.sendMessage(activeInfo.tabId, { action: 'resumeMedia' });
  } catch (error) {
    console.log('Could not resume media in new tab');
  }

  previousActiveTab = activeInfo.tabId;
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (previousActiveTab === tabId) {
    previousActiveTab = null;
  }
});
