let widget = null;

function createWidget(data) {
  if (widget) return;
  
  widget = document.createElement('div');
  widget.className = 'le-widget';
  
  widget.innerHTML = `
    <div class="le-header">
      <h3>Account Match</h3>
      <button class="le-close">×</button>
    </div>


  <div class="le-content">
      <div class="le-company">${data.companyName}</div>
      <div class="le-score">
        <span>Match Score: ${data.matchScore}%</span>
        <div class="le-progress">
          <div class="le-progress-bar" style="width: ${data.matchScore}%"></div>
        </div>
    
        </div>
        
      <div class="le-status ${data.accountStatus.toLowerCase()}">
        ${data.accountStatus}
      </div>
    </div>
  `;

  const profileSection = document.querySelector('.pv-profile-section');
  if (profileSection) {
    profileSection.insertAdjacentElement('beforebegin', widget);
  } else {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.insertAdjacentElement('afterbegin', widget);
    }
  }
  widget.querySelector('.le-close').addEventListener('click', () => {
    widget.remove();
    widget = null;
    chrome.storage.local.set({ widgetEnabled: false });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleWidget") {
    if (request.enabled) {
      createWidget({
        companyName: "TechCorp",
        matchScore: 86,
        accountStatus: "Target"
      });
    } else if (widget) {
      widget.remove();
      widget = null;
    }
  }
});

chrome.storage.local.get(['widgetEnabled'], (result) => {
  if (result.widgetEnabled !== false) {
    createWidget({
      companyName: "TechCorp",
      matchScore: 86,
      accountStatus: "Target"
    });
  }
});