let isReaderMode = false;

chrome.action.onClicked.addListener((tab) => {
  isReaderMode = !isReaderMode;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['Readability.js', 'reader.js']
  });
  chrome.tabs.sendMessage(tab.id, { mode: isReaderMode ? 'reader' : 'normal' });
});