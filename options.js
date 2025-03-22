document.addEventListener('DOMContentLoaded', function() {
  const pathInput = document.getElementById('obsidianPath');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');

  // 加载已保存的设置
  chrome.storage.sync.get(['obsidianPath'], function(result) {
    if (result.obsidianPath) {
      pathInput.value = result.obsidianPath;
    }
  });

  // 保存设置
  saveButton.addEventListener('click', function() {
    const path = pathInput.value.trim();
    
    if (!path) {
      showStatus('请输入 Obsidian 保存路径', 'error');
      return;
    }

    chrome.storage.sync.set({
      obsidianPath: path
    }, function() {
      showStatus('设置已保存', 'success');
    });
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    setTimeout(function() {
      statusDiv.style.display = 'none';
    }, 3000);
  }
}); 