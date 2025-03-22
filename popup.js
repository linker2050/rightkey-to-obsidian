document.addEventListener('DOMContentLoaded', function() {
  const configureButton = document.getElementById('configure');
  const statusDiv = document.getElementById('status');

  // 检查是否已配置 Obsidian 路径
  chrome.storage.sync.get(['obsidianPath'], function(result) {
    if (result.obsidianPath) {
      showStatus('已配置 Obsidian 路径: ' + result.obsidianPath, 'success');
    } else {
      showStatus('请配置 Obsidian 路径', 'error');
    }
  });

  configureButton.addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });

  document.getElementById('openOptions').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
});

function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = 'status ' + type;
  statusDiv.style.display = 'block';
} 