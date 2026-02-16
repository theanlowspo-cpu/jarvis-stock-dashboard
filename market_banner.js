// 在頁面頂部插入市場狀態橫幅
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        if (data.isMarketClosed) {
            const banner = document.createElement('div');
            banner.style.cssText = `
                background: linear-gradient(135deg, #ff1744 0%, #c62828 100%);
                color: white;
                padding: 20px;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            `;
            
            const nextTradingDay = getNextTradingDay();
            
            banner.innerHTML = `
                <div style="font-size: 24px; margin-bottom: 10px;">🛑 美國股市休市中</div>
                <div style="font-size: 16px; opacity: 0.9;">
                    今日假期：${data.marketClosedReason}
                </div>
                <div style="font-size: 14px; margin-top: 10px; opacity: 0.8;">
                    下次開市：${nextTradingDay}
                </div>
                <div style="font-size: 12px; margin-top: 10px; opacity: 0.7;">
                    顯示數據為最後交易日收盤價
                </div>
            `;
            
            const container = document.querySelector('.container');
            container.insertBefore(banner, container.firstChild);
        }
    });

function getNextTradingDay() {
    const now = new Date();
    const day = now.getDay();
    
    // 如果是週五、週六，下次開市是下週一
    if (day === 5) return '下週一 (Monday)';
    if (day === 6) return '下週一 (Monday)';
    if (day === 0) return '明天 (Monday)';
    
    // 平日假期，下次開市是明天
    return '明天';
}
