let isReaderMode = false;

document.getElementById('toggleButton').addEventListener('click', function() {
  isReaderMode = !isReaderMode;
  this.textContent = isReaderMode ? 'Disable Reader Mode' : 'Enable Reader Mode';
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {mode: isReaderMode ? 'reader' : 'normal'});
  });
});