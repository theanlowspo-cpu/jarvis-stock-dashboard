// 從後端 data.json 獲取數據並更新前端
async function updateDashboard() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        console.log('Dashboard data loaded:', data);
        
        // 更新最後更新時間
        const lastUpdateEl = document.querySelector('.last-update');
        if (lastUpdateEl) {
            lastUpdateEl.textContent = `最後更新: ${data.lastUpdate}`;
        }
        
        // 更新狀態
        const statusEl = document.querySelector('.status');
        if (statusEl) {
            statusEl.textContent = data.status;
        }
        
        // 更新股票卡片
        const container = document.querySelector('.stocks-container');
        if (container && data.stocks) {
            container.innerHTML = '';
            
            data.stocks.forEach(stock => {
                const card = createStockCard(stock);
                container.appendChild(card);
            });
        }
        
    } catch (error) {
        console.error('Failed to update dashboard:', error);
    }
}

function createStockCard(stock) {
    const card = document.createElement('div');
    card.className = 'stock-card';
    
    const changeClass = parseFloat(stock.changePercent) >= 0 ? 'positive' : 'negative';
    const changeSign = parseFloat(stock.changePercent) >= 0 ? '+' : '';
    
    card.innerHTML = `
        <div class="stock-header">
            <h2>${stock.symbol}</h2>
            <div class="api-source">${stock.apiSource}</div>
        </div>
        <div class="stock-price">$${stock.price}</div>
        <div class="stock-change ${changeClass}">
            ${changeSign}${stock.change} (${changeSign}${stock.changePercent}%)
        </div>
        <div class="stock-indicators">
            <div>RSI: ${stock.rsi}</div>
            <div>MA5: $${stock.ma5}</div>
            <div>MA20: $${stock.ma20}</div>
        </div>
    `;
    
    return card;
}

// 每分鐘更新一次
updateDashboard();
setInterval(updateDashboard, 60000);
