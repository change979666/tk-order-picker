document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('toggleSwitch');

    // 1. 加载时，读取存储的状态并设置开关
    chrome.storage.sync.get(['highlightEnabled'], function (result) {
        toggleSwitch.checked = !!result.highlightEnabled;
    });

    // 2. 当用户点击开关时，保存新状态并通知内容脚本
    toggleSwitch.addEventListener('change', function () {
        const isEnabled = toggleSwitch.checked;
        chrome.storage.sync.set({ highlightEnabled: isEnabled }, function () {
            // 向当前活动的标签页发送消息
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "toggleHighlight",
                        enabled: isEnabled
                    });
                }
            });
        });
    });

    // 错误处理
    window.onerror = function (message, source, lineno, colno, error) {
        alert(`错误: ${message}\n来源: ${source}\n行号: ${lineno}, 列号: ${colno}`);
    };
});