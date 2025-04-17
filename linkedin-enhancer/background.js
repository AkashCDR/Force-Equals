chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleWidget") {

      chrome.storage.local.set({ widgetEnabled: request.enabled });
      
    }
  });