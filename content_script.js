// --- 核心高亮函数 (已优化) ---
// 单纯执行高亮操作的函数
function highlightItems() {
    // 1. 高亮SKU (新方案：先定位行，再在行内查找)
    // 根据您提供的class "sc-hcdzEp goGcNp"，我们用其中一个来定位商品所在的行
    const productRows = document.querySelectorAll('tr.goGcNp');

    productRows.forEach(row => {
        // 在当前行(row)的内部，查找所有div
        const divsInRow = row.querySelectorAll('div');
        
        // 遍历这些div，找到包含 "Seller SKU:" 的那个
        divsInRow.forEach(div => {
            // 使用 .innerText 确保我们只获取可见文本，并用 trim() 去掉前后空格
            // 使用 startsWith() 进行更精确的匹配
            if (div.innerText && div.innerText.trim().startsWith('Seller SKU:')) {
                // 找到了目标div，应用高亮样式
               
                // 为 BD 开头的值增加样式
                const skuValue = div.innerText.replace('Seller SKU:', '').trim();
                if (skuValue.startsWith('BD')) {
                    const span = document.createElement('span');
                    span.innerText = skuValue;
                    span.style.color = '#8e24aa';
                    span.style.fontWeight = 'bold';
                    span.style.fontSize = '1.2em';
                    div.innerHTML = 'Seller SKU: ';
                    div.appendChild(span);
                }
            }
        });

        // 高亮件数
        const quantityDivs = row.querySelectorAll('.isUnTN');
        quantityDivs.forEach(div => {
            const text = div.textContent; // 格式为 "× 1", "× 2" 等
            const quantity = parseInt(text.replace('×', '').trim(), 10);

            if (!isNaN(quantity) && quantity >= 2) {
                div.style.color = 'red';
                div.style.fontWeight = 'bold';
                div.style.fontSize = '1.5em';

                // 为当前行添加蓝色边框和圆角样式
                row.style.border = '3px solid #007bff';
                row.style.borderRadius = '8px';
                row.style.boxSizing = 'border-box';
            }
        });
    });

    // 2. 高亮件数 (此部分逻辑正确，无需改动)
    // 件数div的class是 "sc-cTkwdZ isUnTN"
    const quantityDivs = document.querySelectorAll('.isUnTN'); 
    quantityDivs.forEach(div => {
        const text = div.textContent; // 格式为 "× 1", "× 2" 等
        const quantity = parseInt(text.replace('×', '').trim(), 10);

        if (!isNaN(quantity) && quantity >= 2) {
            div.style.color = 'red';
            div.style.fontWeight = 'bold';
            div.style.fontSize = '1.5em';
        }
    });
}

// 新增自动展开功能
function expandShowMoreButtons() {
    try {
        // 查找所有可能的展开按钮 (.sc-cTkwdZ.cTfdes 类)
        const showMoreButtons = document.querySelectorAll('.sc-cTkwdZ.cTfdes');
        let foundButtons = false;
        
        showMoreButtons.forEach(button => {
            // 获取按钮文本内容
            const buttonText = button.textContent || '';
            
            // 检查按钮文本是否包含"Show"和"more items"
            if (buttonText.includes('Show') && buttonText.includes('more items')) {
                console.log('发现展开按钮:', buttonText);
                // 模拟点击展开按钮
                button.click();
                foundButtons = true;
            }
        });
        
        // 如果找到并点击了按钮，返回true表示需要重新应用高亮
        return foundButtons;
    } catch (error) {
        // 使用弹窗显示错误信息
        alert('自动展开功能出错: ' + error.message);
        return false;
    }
}

// 主要高亮函数，集成了展开功能
function applyHighlights() {
    // 先执行自动展开
    const needReapply = expandShowMoreButtons();
    
    // 无论是否展开，都执行一次高亮
    highlightItems();
    
    // 如果找到并点击了展开按钮，设置延迟后再次高亮以处理新展示的内容
    if (needReapply) {
        setTimeout(() => {
            highlightItems();
        }, 300);
    }
}

// --- 清除高亮效果的函数 (同步更新) ---
function removeHighlights() {
    // 1. 移除SKU高亮（与提亮逻辑一致）
    const productRows = document.querySelectorAll('tr.goGcNp');
    productRows.forEach(row => {
        const divsInRow = row.querySelectorAll('div');
        divsInRow.forEach(div => {
            if (div.innerText && div.innerText.trim().startsWith('Seller SKU:')) {
                // 恢复原始文本内容
                const skuValue = div.innerText.replace('Seller SKU:', '').trim();
                if (skuValue.startsWith('BD')) {
                    div.innerHTML = 'Seller SKU: ' + skuValue;
                }
                // 移除所有样式
                div.style.backgroundColor = '';
                div.style.fontWeight = '';
                div.style.padding = '';
                div.style.borderRadius = '';
                div.style.display = '';
                div.style.color = '';
                div.style.fontSize = '';
            }
        });
    });

    // 2. 移除件数高亮
    const quantityDivs = document.querySelectorAll('.isUnTN');
    quantityDivs.forEach(div => {
        div.style.color = '';
        div.style.fontWeight = '';
        div.style.fontSize = '';
    });

    // 3. 移除高亮边框
    productRows.forEach(row => {
        row.style.border = '';
        row.style.borderRadius = '';
        row.style.boxSizing = '';
    });
}


// --- 主逻辑 (无需改动) ---
function main() {
    chrome.storage.sync.get(['highlightEnabled'], function (result) {
        if (result.highlightEnabled) {
            applyHighlights();
        }
    });
}

// 监听从popup发来的消息 (无需改动)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "toggleHighlight") {
        if (request.enabled) {
            applyHighlights();
        } else {
            removeHighlights();
        }
    }
});

// 使用 MutationObserver 来处理动态加载的内容 (无需改动)
const observer = new MutationObserver((mutations) => {
    setTimeout(() => {
         chrome.storage.sync.get(['highlightEnabled'], function (result) {
            if (result.highlightEnabled) {
                applyHighlights();
            }
        });
    }, 500);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// 这部分代码已移至上方，移除以避免重复

// 初始执行
main();