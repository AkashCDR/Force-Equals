document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleWidget');

    chrome.storage.local.get(['widgetEnabled'], function(result) {
      toggleSwitch.checked = result.widgetEnabled !== false;
    });
  
 
    toggleSwitch.addEventListener('change', function() {
      const isEnabled = this.checked;
      chrome.storage.local.set({ widgetEnabled: isEnabled });
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "toggleWidget",
          enabled: isEnabled
        });
      });
    });
  });