// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendToObsidian",
    title: "发送到 Obsidian",
    contexts: ["selection"]
  });
});

// 处理右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToObsidian") {
    const selectedText = info.selectionText;
    const url = tab.url;
    const title = tab.title;
    
    // 获取存储的 Obsidian 配置
    chrome.storage.sync.get(['obsidianPath'], function(result) {
      if (result.obsidianPath) {
        // 构建 Markdown 格式的内容
        const content = `# ${selectedText.slice(0, 5)}\n\n${selectedText}\n\n来源: ${url}\n时间: ${new Date().toLocaleString()}`;
        
        // 构建 Obsidian URI
        // 使用选中文本的前五个字作为文件名
        const fileName = selectedText.slice(0, 5).trim().replace(/[\\/:*?"<>|]/g, '_');
        const timestamp = new Date().toISOString().slice(0, 10); // 只使用日期部分
        const fullFileName = `${fileName}_${timestamp}`;
        
        // 构建 Obsidian URI
        const obsidianUri = `obsidian://new?vault=${encodeURIComponent(result.obsidianPath)}&name=${encodeURIComponent(fullFileName)}&content=${encodeURIComponent(content)}`;
        
        // 在当前标签页打开 URI
        chrome.tabs.update(tab.id, { url: obsidianUri }, () => {
          // 500ms 后返回原页面
          setTimeout(() => {
            chrome.tabs.update(tab.id, { url: url });
          }, 500);
        });
      } else {
        // 如果未配置 Obsidian 路径，打开选项页面
        chrome.runtime.openOptionsPage();
      }
    });
  }
}); 