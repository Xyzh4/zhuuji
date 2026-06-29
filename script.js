// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动效果
    smoothScroll();
    
    // 从后端 API 加载数据
    loadEthnicData();
    
    // 按钮点击事件
    bindButtonEvents();
    
    // 初始化图片轮播
    initCarousels();
    
    // 初始化交互体验
    initExperience();
    
    // 初始化热力图
    initHeatmap();

    initFestivalMonthHeatmap();
    
    // 初始化文化地图
    initCulturalMap();
    
    // 初始化数据可视化图表
    initCharts();
    
    // 初始化所有互动功能
    initSearch();
    initQuiz();
    initTourism();
    
    // 初始化漂浮弹幕
    initDanmaku();
    
    // 初始化音乐控制
    initMusicControl();
    
    // 初始化路线轮播
    initRouteCarousel();
    
    // 初始化节日推荐卡片图片轮播
    initRecommendCardsCarousel();

    // 只在food.html页面上执行initFoodPage
    if (window.location.pathname.includes('food.html')) {
        initFoodPage();
    }
    
    // 只在architecture.html页面上执行建筑图表初始化
    if (window.location.pathname.includes('architecture.html')) {
        initArchitectureCharts();
    }
    
    // 初始化游记瀑布流布局
    initTravelWaterfall();
    
    // 初始化疆字动画
    initJiangCharacterAnimation();
    
    // 初始化地形数据图表
    console.log('Initializing terrain chart...');
    initTerrainChart();
    console.log('Terrain chart initialization complete.');
    
    // 初始化用户故事
    initUserStories();
    
    // 初始化季节轮播
    initSeasonCarousel();
    
    // 自动滚动到 food-title 锚点
    if (window.location.pathname.includes('food.html')) {
        setTimeout(() => {
            const foodTitle = document.getElementById('food-title');
            if (foodTitle) {
                window.scrollTo({
                    top: foodTitle.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// 初始化疆字动画
function initJiangCharacterAnimation() {
    if (!window.location.pathname.includes('landscape.html')) return;
    
    setTimeout(() => {
        // 等待页面加载完成
        const jiangCharacter = document.querySelector('.jiang-character');
        if (!jiangCharacter) return;
        
        // 动画序列
        const animationSequence = [
            // 第一步：高亮右侧三横（山脉）
            function() {
                const hengs = document.querySelectorAll('.heng');
                const mountainExplanations = document.querySelectorAll('.mountain-explanation');
                
                hengs.forEach((heng, index) => {
                    setTimeout(() => {
                        heng.style.animation = 'highlight 1s ease forwards';
                        setTimeout(() => {
                            if (mountainExplanations[index]) {
                                mountainExplanations[index].style.animation = 'fadeIn 0.5s ease forwards';
                            }
                        }, 500);
                    }, index * 300);
                });
            },
            
            // 第二步：高亮中间两田（盆地）
            function() {
                setTimeout(() => {
                    const tians = document.querySelectorAll('.tian');
                    const basinExplanations = document.querySelectorAll('.basin-explanation');
                    
                    tians.forEach((tian, index) => {
                        setTimeout(() => {
                            tian.style.animation = 'highlight 1s ease forwards';
                            setTimeout(() => {
                                if (basinExplanations[index]) {
                                    basinExplanations[index].style.animation = 'fadeIn 0.5s ease forwards';
                                }
                            }, 500);
                        }, index * 300);
                    });
                }, 2000);
            },
            
            // 第三步：高亮左侧弓土（守疆寓意）
            function() {
                setTimeout(() => {
                    const gong = document.querySelector('.gong');
                    const tu = document.querySelector('.tu');
                    const leftExplanation = document.querySelector('.left-explanation');
                    
                    if (gong) gong.style.animation = 'highlight 1s ease forwards';
                    if (tu) {
                        setTimeout(() => {
                            tu.style.animation = 'highlight 1s ease forwards';
                            setTimeout(() => {
                                if (leftExplanation) {
                                    leftExplanation.style.animation = 'fadeIn 0.5s ease forwards';
                                }
                            }, 500);
                        }, 300);
                    }
                }, 4000);
            }
        ];
        
        // 执行动画序列
        animationSequence.forEach((step, index) => {
            setTimeout(step, index * 100);
        });
    }, 500);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 初始化山脉和盆地元素的鼠标事件
function initMountainBasinEvents() {
    if (!window.location.pathname.includes('landscape.html')) return;
    
    const mountains = document.querySelectorAll('.mountain-basin-diagram .mountain');
    const basins = document.querySelectorAll('.mountain-basin-diagram .basin');
    
    // 为山脉添加事件
    mountains.forEach(mountain => {
        mountain.addEventListener('mouseenter', function() {
            const placeKey = this.getAttribute('data-place');
            this.classList.add('zoom-in');
            showTooltip(placeKey, this);
        });
        
        mountain.addEventListener('mouseleave', debounce(function() {
            this.classList.remove('zoom-in');
            hideTooltip();
        }, 100));
    });
    
    // 为盆地添加事件
    basins.forEach(basin => {
        basin.addEventListener('mouseenter', function() {
            const placeKey = this.getAttribute('data-place');
            this.classList.add('zoom-in');
            showTooltip(placeKey, this);
        });
        
        basin.addEventListener('mouseleave', debounce(function() {
            this.classList.remove('zoom-in');
            hideTooltip();
        }, 100));
    });
}

// 初始化地形数据图表
function initTerrainChart() {
    if (!window.location.pathname.includes('landscape.html')) return;
    
    const terrainChartCanvas = document.getElementById('terrainChart');
    if (!terrainChartCanvas) return;
    
    // 初始化山脉和盆地元素的鼠标事件
    initMountainBasinEvents();
    
    if (typeof Chart === 'undefined') {
        // 如果Chart.js未加载，动态加载
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            createTerrainChart(terrainChartCanvas);
            initBasinChart();
        };
        document.head.appendChild(script);
    } else {
        createTerrainChart(terrainChartCanvas);
        initBasinChart();
    }
}

// 初始化盆地图表
function initBasinChart() {
    if (!window.location.pathname.includes('landscape.html')) return;
    
    const basinChartCanvas = document.getElementById('basinChart');
    if (!basinChartCanvas) return;
    
    if (typeof Chart === 'undefined') {
        // 如果Chart.js未加载，动态加载
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            createBasinChart(basinChartCanvas);
        };
        document.head.appendChild(script);
    } else {
        createBasinChart(basinChartCanvas);
    }
}

// 地点信息数据
const placeInfo = {
    altai: {
        name: '阿尔泰山',
        description: '阿尔泰山脉位于新疆北部，呈西北-东南走向，绵延2000余公里。最高峰友谊峰海拔4374米，是中、俄、蒙三国界山。这里有茂密的森林、广阔的草原，是新疆重要的畜牧业基地。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Altai%20mountains%20Xinjiang%20beautiful%20landscape%20forests%20and%20grasslands&amp;image_size=landscape_4_3'
    },
    tianshan: {
        name: '天山',
        description: '天山山脉横贯新疆中部，全长约2500公里，是世界七大山系之一。最高峰托木尔峰海拔7443米。天山将新疆分为南北两部分，是新疆重要的生态屏障和水源涵养地。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Tianshan%20mountains%20Xinjiang%20majestic%20snow%20peaks%20and%20valleys&amp;image_size=landscape_4_3'
    },
    kunlun: {
        name: '昆仑山',
        description: '昆仑山脉西起帕米尔高原，横贯新疆南部，全长约2500公里，被誉为“万山之祖”。这里是古代神话的重要发源地，也是长江、黄河的发源地之一。',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kunlun%20mountains%20Xinjiang%20sacred%20mountain%20range%20mythology&amp;image_size=landscape_4_3'
    },
    junggar: {
        name: '准噶尔盆地',
        description: '准噶尔盆地位于天山与阿尔泰山之间，面积约38万平方公里，是中国第二大内陆盆地。盆地中部是古尔班通古特沙漠，边缘有广阔的绿洲，是新疆重要的农业和畜牧业基地。',
        image: '49541bdc622a52d71bdd1bf68129c91a.jpg'
    },
    tarim: {
        name: '塔里木盆地',
        description: '塔里木盆地位于天山与昆仑山之间，面积约53万平方公里，是中国最大的内陆盆地。盆地中心是塔克拉玛干沙漠，是世界第二大流动沙漠。边缘有塔里木河流域的绿洲，是古丝绸之路的重要通道。',
        image: '5ac80075ab223518966e077a4d834807.jpg'
    }
};

// 显示悬浮窗
function showTooltip(placeKey, element) {
    const tooltip = document.getElementById('hover-tooltip');
    const info = placeInfo[placeKey];
    
    if (tooltip && info) {
        const tooltipImage = tooltip.querySelector('.tooltip-image');
        const tooltipText = tooltip.querySelector('.tooltip-text');
        
        // 设置内容
        tooltipImage.innerHTML = `<img src="${info.image}" alt="${info.name}">`;
        tooltipText.innerHTML = `<h4>${info.name}</h4><p>${info.description}</p>`;
        
        // 显示悬浮窗（使用CSS中定义的位置）
        tooltip.classList.add('show');
    }
}

// 隐藏悬浮窗
function hideTooltip() {
    const tooltip = document.getElementById('hover-tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
    }
}

// 放大/缩小对应元素的函数
function zoomElement(chartType, index, zoomIn) {
    const elements = document.querySelectorAll('.mountain-basin-diagram .' + (chartType === 'terrain' ? 'mountain' : 'basin'));
    elements.forEach((el, i) => {
        if (i === index) {
            if (zoomIn) {
                el.classList.add('zoom-in');
                // 显示悬浮窗
                const placeKey = el.getAttribute('data-place');
                showTooltip(placeKey, el);
            } else {
                el.classList.remove('zoom-in');
            }
        }
    });
}

// 清除所有放大效果
function clearAllZoom() {
    document.querySelectorAll('.mountain.zoom-in, .basin.zoom-in').forEach(el => {
        el.classList.remove('zoom-in');
    });
    hideTooltip();
}

// 创建盆地图表
function createBasinChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    // 防抖版本的图表悬停处理
    const debouncedBasinHover = debounce(function(event, elements) {
        clearAllZoom();
        if (elements && elements.length > 0) {
            // 注意：饼图的顺序是塔里木盆地(0)和准噶尔盆地(1)，
            // 而HTML中的顺序是准噶尔盆地(0)和塔里木盆地(1)
            const index = elements[0].index === 0 ? 1 : 0;
            zoomElement('basin', index, true);
        }
    }, 50);
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['塔里木盆地', '准噶尔盆地'],
            datasets: [{
                data: [53, 38],
                backgroundColor: [
                    '#73C068',
                    '#3A993A'
                ],
                borderColor: [
                    '#73C068',
                    '#3A993A'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12
                        },
                        padding: 10
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} 万平方公里 (${percentage}%)`;
                        }
                    }
                }
            },
            onHover: debouncedBasinHover
        }
    });
}

// 创建地形数据图表
function createTerrainChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    // 防抖版本的图表悬停处理
    const debouncedTerrainHover = debounce(function(event, elements) {
        clearAllZoom();
        if (elements && elements.length > 0) {
            zoomElement('terrain', elements[0].index, true);
        }
    }, 50);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['阿尔泰山脉', '天山', '昆仑山'],
            datasets: [{
                label: '海拔（米）',
                data: [3000, 4000, 5500],
                backgroundColor: [
                    '#4A98C9',
                    '#3A87BF',
                    '#2D77AF'
                ],
                borderColor: [
                    '#4A98C9',
                    '#3A87BF',
                    '#2D77AF'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 0
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '海拔（米）',
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.x;
                            return `${context.label}: ${value} 米`;
                        }
                    }
                }
            },
            onHover: debouncedTerrainHover
        }
    });
}

// 初始化游记瀑布流布局
function initTravelWaterfall() {
    const grid = document.querySelector('.travel-grid');
    const columns = document.querySelectorAll('.travel-column');
    const itemsContainer = document.querySelector('.travel-items-container');
    
    if (!grid || !columns.length || !itemsContainer) return;
    
    const items = Array.from(itemsContainer.children);
    
    // 清空列
    columns.forEach(column => column.innerHTML = '');
    
    // 简单的轮询分配，确保每个列都有内容
    items.forEach((item, index) => {
        // 克隆项目
        const clone = item.cloneNode(true);
        
        // 轮询分配到不同的列
        const columnIndex = index % columns.length;
        columns[columnIndex].appendChild(clone);
    });
}

// 节日推荐卡片图片轮播
function initRecommendCardsCarousel() {
    const carousels = document.querySelectorAll('.card-img-carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 3000); // 每3秒切换一次图片
    });
}

function initFoodPage() {
    // 只在food.html页面上执行
    if (!window.location.pathname.includes('food.html')) return;
    
    const stage = document.getElementById('food-hero-stage');
    const stageSmall = document.getElementById('food-hero-stage-small');
    const pieCanvas = document.getElementById('food-method-pie');
    const orbit = document.getElementById('food-orbit');
    const tooltip = document.getElementById('food-orbit-tooltip');
    const seasonTrack = document.getElementById('food-season-track');
    const seasonDetail = document.getElementById('food-season-detail');

    const rankList = document.getElementById('food-rank-list');
    const storyWaterfall = document.getElementById('food-story-waterfall');
    const triviaGrid = document.getElementById('food-trivia-grid');
    const comboTable = document.getElementById('food-combo-table');

    // 检查是否有任何元素存在
    if (!stage && !stageSmall && !pieCanvas && !orbit && !seasonTrack && !rankList && !storyWaterfall && !triviaGrid && !comboTable) return;

    const methodData = [
        { key: '羊肉', value: 35, color: '#B5AED5' },
        { key: '面粉', value: 25, color: '#B2E6FD' },
        { key: '水果', value: 15, color: '#B8D2CC' },
        { key: '蔬菜', value: 15, color: '#E8B2A7' },
        { key: '其他', value: 10, color: '#FEEBB9' }
    ];



    const foods = [
        {
            id: 'dapanchi',
            name: '大盘鸡',
            emoji: '🍗',
            method: '炖煮',
            img: '797a7867df3f8fc80c7310c3939c1a58.jpg',
            story: '相传80年代沙湾县师傅为招待长途司机，把整只鸡炖煮配土豆与宽面，用大盘端上桌，“大盘鸡”由此走红。'
        },
        {
            id: 'hongliu',
            name: '红柳烤肉',
            emoji: '🍢',
            method: '烤制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20red%20willow%20skewers%20lamb%20bbq%20night%20market&image_size=landscape_16_9',
            story: '红柳枝串着大块羊肉烤到微焦，肉汁锁在纤维里，带一点木香；夜市里孜然一撒，香气能拐走半条街的人。'
        },
        {
            id: 'shouzhua',
            name: '手抓饭',
            emoji: '🍚',
            method: '焖炒',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20uyghur%20pilaf%20carrot%20lamb%20rice%20pot&image_size=landscape_16_9',
            story: '手抓饭的灵魂是油香与甜香的平衡：黄萝卜、洋葱先炒出香气，再与羊肉和米同焖，揭锅那一下，整条街都知道开饭了。'
        },
        {
            id: 'kaobaozi',
            name: '烤包子',
            emoji: '🥟',
            method: '烤制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20baked%20samsa%20crispy%20lamb%20onion&image_size=landscape_16_9',
            story: '喀什老城的烤包子店常在清晨就和面备馅，现宰羊肉配洋葱孜然，贴进馕坑烤十几分钟，出炉一口满是炭火香。'
        },
        {
            id: 'latiaozi',
            name: '拉条子',
            emoji: '🍜',
            method: '焖炒',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20laghman%20noodles%20hand%20pulled%20stir%20fry&image_size=landscape_16_9',
            story: '面团反复醒发后再拉成条，筋道是靠“拉、摔、抻”出来的；浇上番茄辣子或拌菜，一碗就能把人留住。'
        },
        {
            id: 'naan',
            name: '馕',
            emoji: '🫓',
            method: '烤制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20naan%20bread%20assorted%20flavors&image_size=landscape_16_9',
            story: '馕像“新疆人的口粮名片”，有玫瑰花馕、辣皮子馕、芝麻馕、窝窝馕等多种口味，既能配奶茶，也能蘸汤汁。'
        },
        {
            id: 'suannai',
            name: '酸奶',
            emoji: '🧋',
            method: '发酵饮',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20yogurt%20with%20raisins%20nuts%20dessert&image_size=landscape_16_9',
            story: '新疆酸奶常配葡萄干与坚果，酸甜交织；吃过烤肉后来一碗，解腻得刚刚好。'
        },
        {
            id: 'hamigua',
            name: '哈密瓜',
            emoji: '🍈',
            method: '鲜果冷食',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20Hami%20melon%20fresh%20slice%20juicy&image_size=landscape_16_9',
            story: '日照强、昼夜温差大让甜味被“锁”进果肉里，切开那一瞬的香气，是夏天最直观的幸福。'
        },
        {
            id: 'putao',
            name: '吐鲁番葡萄',
            emoji: '🍇',
            method: '鲜果冷食',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20Turpan%20grapes%20vineyard%20fresh%20bunch&image_size=landscape_16_9',
            story: '葡萄沟的风把甜味吹得更浓，阳光把果皮晒出香气；无核白、马奶子等品种享誉全国。'
        },
        {
            id: 'yangrouchuan',
            name: '烤羊肉串',
            emoji: '🍖',
            method: '烤制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20lamb%20kebab%20skewers%20grilled%20with%20cumin&image_size=landscape_16_9',
            story: '好羊肉串讲究“肉新、火旺、孜然准”，外焦里嫩的那一口，是新疆夜晚最具辨识度的味道。'
        },
        {
            id: 'xumachang',
            name: '熏马肠',
            emoji: '🌭',
            method: '烤制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20smoked%20horse%20sausage%20traditional&image_size=landscape_16_9',
            story: '熏马肠是哈萨克族传统美食，以马肉为原料，经过熏制而成，肉质紧实，风味独特。'
        },
        {
            id: 'gazi',
            name: '缸子肉',
            emoji: '🍲',
            method: '炖煮',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20pot%20meat%20lamb%20vegetable%20soup&image_size=landscape_16_9',
            story: '缸子肉是新疆特色小吃，用搪瓷缸子炖煮羊肉和蔬菜，汤鲜肉嫩，营养丰富。'
        },
        {
            id: 'malorens',
            name: '马肉纳仁',
            emoji: '🐴',
            method: '炖煮',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20horse%20meat%20naren%20noodle%20dish&image_size=landscape_16_9',
            story: '马肉纳仁是哈萨克族传统美食，以马肉和面片为主要原料，口感丰富，营养均衡。'
        },
        {
            id: 'baersake',
            name: '包尔萨克',
            emoji: '🥨',
            method: '烤制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20baoersake%20fried%20dough%20pastry&image_size=landscape_16_9',
            story: '包尔萨克是哈萨克族传统油炸面食，外酥内软，常与奶茶搭配食用，是新疆早餐的常见选择。'
        },
        {
            id: 'mianfeizi',
            name: '面肺子',
            emoji: '🍖',
            method: '炖煮',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20mianfei%20lung%20soup%20street%20food&image_size=landscape_16_9',
            story: '面肺子是新疆特色小吃，用羊肺填充面粉蒸制而成，口感独特，常配辣椒和醋食用。'
        },
        {
            id: 'gel瓦斯',
            name: '格瓦斯',
            emoji: '🥤',
            method: '发酵饮',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20kvass%20drink%20cold%20bottle%20summer&image_size=landscape_16_9',
            story: '格瓦斯带着微气泡与麦香甜，夏天冰镇后咕嘟一口，像把热浪瞬间按了暂停键。'
        },
        {
            id: 'kelile',
            name: '库尔勒香梨',
            emoji: '🍐',
            method: '鲜果冷食',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20Korla%20fragrant%20pear%20fresh&image_size=landscape_16_9',
            story: '库尔勒香梨以其皮薄肉嫩、汁多味甜而闻名，是新疆的地理标志产品。'
        },
        {
            id: 'aksu',
            name: '阿克苏冰糖心苹果',
            emoji: '🍎',
            method: '鲜果冷食',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20Aksu%20rock%20sugar%20heart%20apple&image_size=landscape_16_9',
            story: '阿克苏冰糖心苹果因果核周围形成透明的冰糖心而得名，甜度高，口感脆爽。'
        },
        {
            id: 'jiaomaji',
            name: '椒麻鸡',
            emoji: '🐔',
            method: '炖煮',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20pepper%20chicken%20spicy%20herbs&image_size=landscape_16_9',
            story: '椒麻鸡是新疆特色凉菜，鸡肉嫩滑，麻辣鲜香，是夏季消暑的绝佳选择。'
        },
        {
            id: 'langziji',
            name: '辣子鸡',
            emoji: '🌶️',
            method: '炒制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20spicy%20chicken%20dry%20stir%20fry&image_size=landscape_16_9',
            story: '辣子鸡是新疆经典菜式，鸡肉外酥内嫩，辣椒香而不辣，是下饭的好搭档。'
        },
        {
            id: 'shouzhuayangrou',
            name: '手抓羊肉',
            emoji: '🐑',
            method: '炖煮',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20hand%20grasped%20lamb%20meat%20traditional&image_size=landscape_16_9',
            story: '手抓羊肉是新疆牧区传统美食，肉质鲜嫩，蘸着盐和孜然食用，原汁原味。'
        },
        {
            id: 'kaoquanyang',
            name: '烤全羊',
            emoji: '🐏',
            method: '烤制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20roast%20whole%20lamb%20traditional%20feast&image_size=landscape_16_9',
            story: '烤全羊是新疆最隆重的待客之道，整只羊用馕坑烤制，皮脆肉嫩，香气四溢。'
        },
        {
            id: 'nangkengrou',
            name: '馕坑肉',
            emoji: '🍖',
            method: '烤制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20tandoor%20meat%20lamb%20skewers&image_size=landscape_16_9',
            story: '馕坑肉是用馕坑的余温烤制的羊肉，外焦里嫩，肉质鲜美，是新疆夜市的热门美食。'
        },
        {
            id: 'jiaziyangti',
            name: '胡辣羊蹄',
            emoji: '🐐',
            method: '炖煮',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20spicy%20lamb%20hoof%20stew&image_size=landscape_16_9',
            story: '胡辣羊蹄是新疆特色小吃，羊蹄经过长时间炖煮，口感软糯，香辣可口。'
        },
        {
            id: 'yangzatanbing',
            name: '羊肉焖饼',
            emoji: '🥞',
            method: '焖制',
            img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20lamb%20stew%20with%20pancake&image_size=landscape_16_9',
            story: '羊肉焖饼是新疆传统美食，羊肉炖熟后铺上薄饼，再焖至饼吸收汤汁，风味独特。'
        }
    ];

    const foodById = new Map(foods.map((f) => [f.id, f]));
    const methodIndex = new Map(methodData.map((m, i) => [m.key, i]));
    let pie = null;
    let pinnedMethod = null;
    let orbitItems = [];
    const methodPickIndex = {};

    function setPieActive(ingredientKey) {
        if (!pie) return;
        const idx = methodIndex.get(ingredientKey);
        if (idx === undefined) {
            pie.setActiveElements([]);
            pie.update();
            return;
        }
        pie.setActiveElements([{ datasetIndex: 0, index: idx }]);
        pie.update();
    }

    function setOrbitFocus(focusId) {
        if (!orbitItems || orbitItems.length === 0) return;
        orbitItems.forEach((el) => {
            const id = el.getAttribute('data-id');
            const isFocus = !!focusId && id === focusId;
            el.classList.toggle('is-focus', isFocus);
            el.classList.toggle('is-dim', !!focusId && !isFocus);
            el.dataset.boost = '0';
        });
    }

    function applyActive(methodKey, focusId) {
        setOrbitFocus(focusId || null);
        setPieActive(methodKey || null);
    }

    function clearActive() {
        setOrbitFocus(null);
        setPieActive(null);
    }

    function pickFrontIdByMethod(methodKey) {
        const candidates = orbitItems
            .filter((el) => el.getAttribute('data-method') === methodKey)
            .map((el) => ({ el, z: parseInt(el.style.zIndex || '0', 10) || 0 }))
            .sort((a, b) => b.z - a.z);
        return candidates[0]?.el?.getAttribute('data-id') || null;
    }

    function pickNextIdByMethod(methodKey) {
        const list = orbitItems.filter((el) => el.getAttribute('data-method') === methodKey).map((el) => el.getAttribute('data-id')).filter(Boolean);
        if (list.length === 0) return null;
        methodPickIndex[methodKey] = (methodPickIndex[methodKey] || 0) % list.length;
        const id = list[methodPickIndex[methodKey]];
        methodPickIndex[methodKey] = (methodPickIndex[methodKey] + 1) % list.length;
        return id;
    }

    function showTooltipFor(el) {
        if (!tooltip) return;
        const id = el.getAttribute('data-id');
        if (!id) return;
        const data = foodById.get(id);
        if (!data) return;
        tooltip.innerHTML = `<div class="tt-title">${data.emoji} ${data.name}</div><div class="tt-text">${data.story}</div>`;
        const rect = el.getBoundingClientRect();
        const w = 260;
        const margin = 10;
        const left = Math.min(window.innerWidth - w - margin, rect.right + 12);
        const top = Math.max(margin, Math.min(window.innerHeight - 120, rect.top - 10));
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.setAttribute('aria-hidden', 'false');
    }

    function hideTooltip() {
        if (!tooltip) return;
        tooltip.setAttribute('aria-hidden', 'true');
    }

    if (orbit) {
        orbit.innerHTML = foods.map((f) => {
            return `<button type="button" class="orbit-item" data-id="${f.id}" data-method="${f.method}" data-ingredient="${f.ingredient || f.method}" aria-label="${f.name}"><img src="${f.img}" alt="${f.name}"></button>`;
        }).join('');
        orbitItems = Array.from(orbit.querySelectorAll('.orbit-item'));
    }

    if (pieCanvas && typeof Chart !== 'undefined') {
        const ctx = pieCanvas.getContext('2d');
        pie = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: methodData.map((m) => m.key),
                datasets: [{
                    data: methodData.map((m) => m.value),
                    backgroundColor: methodData.map((m) => m.color),
                    borderColor: 'rgba(255,255,255,0.95)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '美食原材料占比',
                        color: '#333',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#333',
                            font: {
                                size: 12
                            },
                            padding: 10
                        }
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${percentage}%`;
                            }
                        }
                    }
                },
                radius: '80%',
                onHover: (_evt, elements) => {
                    if (pinnedMethod) return;
                    if (!elements || elements.length === 0) {
                        hideTooltip();
                        clearActive();
                        return;
                    }
                    const idx = elements[0].index;
                    const key = methodData[idx]?.key;
                    if (!key) return;
                    const focusId = pickFrontIdByMethod(key);
                    applyActive(key, focusId);
                },
                onClick: (_evt, elements) => {
                    if (!elements || elements.length === 0) {
                        pinnedMethod = null;
                        hideTooltip();
                        clearActive();
                        return;
                    }
                    const idx = elements[0].index;
                    const key = methodData[idx]?.key;
                    if (!key) return;
                    pinnedMethod = pinnedMethod === key ? null : key;
                    hideTooltip();
                    if (pinnedMethod) {
                        const focusId = pickNextIdByMethod(pinnedMethod);
                        applyActive(pinnedMethod, focusId);
                    }
                    else clearActive();
                }
            }
        });
    }



    if ((stage || stageSmall) && orbitItems.length > 0) {
        const currentStage = stage || stageSmall;
        const baseAngles = orbitItems.map((_el, i) => (Math.PI * 2 * i) / orbitItems.length);
        let rotation = 0;
        let last = performance.now();
        let radiusX = 0;
        let radiusY = 0;
        let isPaused = false;

        function recalcRadius() {
            const w = currentStage.clientWidth;
            const h = currentStage.clientHeight;
            const base = Math.max(200, Math.min(w, h) / 2 - 150);
            radiusX = base;
            radiusY = base;
        }

        recalcRadius();
        window.addEventListener('resize', recalcRadius);

        let hoveredItem = null;
        const hoveredPositions = new Map();

        function tick(now) {
            const dt = now - last;
            last = now;
            if (!isPaused) {
                rotation += dt * 0.00018;
            }
            orbitItems.forEach((el, i) => {
                if (el === hoveredItem) {
                    // 保持悬停的美食图在原地
                    return;
                }
                const a = baseAngles[i] + rotation;
                const x = radiusX * Math.cos(a);
                const y = radiusY * Math.sin(a);
                const depth = (Math.sin(a) + 1) / 2;
                const s = 0.82 + depth * 0.28;
                el.style.setProperty('--x', `${x}px`);
                el.style.setProperty('--y', `${y}px`);
                el.style.setProperty('--s', `${s}`);
                el.style.zIndex = `${Math.round(depth * 100)}`;
            });
            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);

        orbit.addEventListener('pointerover', (e) => {
            const t = e.target;
            if (!(t instanceof HTMLElement)) return;
            const item = t.closest('.orbit-item');
            if (!item) return;
            const related = e.relatedTarget;
            if (related instanceof HTMLElement && item.contains(related)) return;
            
            // 暂停轮播
            isPaused = true;
            
            // 保存当前位置
            hoveredItem = item;
            
            // 放大当前图片，但保持位置不变
            item.style.zIndex = '101';
            const currentS = parseFloat(item.style.getPropertyValue('--s') || '1');
            item.style.setProperty('--s', `${currentS * 1.2}`);
            
            // 显示浮窗介绍，确保在美食图旁边
            showTooltipFor(item);
            
            // 高亮饼图中对应的原材料
            const id = item.getAttribute('data-id');
            const food = foodById.get(id);
            let ingredient = '其他';
            
            // 根据食物名称推断原材料
            if (food) {
                const name = food.name;
                if (name.includes('羊肉') || name.includes('羊蹄') || name.includes('烤全羊') || name.includes('馕坑肉') || name.includes('红柳烤肉') || name.includes('烤包子') || name.includes('手抓饭') || name.includes('缸子肉') || name.includes('马肉纳仁') || name.includes('面肺子')) {
                    ingredient = '羊肉';
                } else if (name.includes('馕') || name.includes('拉条子') || name.includes('包尔萨克')) {
                    ingredient = '面粉';
                } else if (name.includes('哈密瓜') || name.includes('葡萄') || name.includes('香梨') || name.includes('苹果')) {
                    ingredient = '水果';
                } else if (name.includes('酸奶') || name.includes('格瓦斯') || name.includes('椒麻鸡') || name.includes('辣子鸡')) {
                    ingredient = '其他';
                }
            }
            
            setPieActive(ingredient);
        });

        orbit.addEventListener('pointerout', (e) => {
            const t = e.target;
            if (!(t instanceof HTMLElement)) return;
            const item = t.closest('.orbit-item');
            if (!item) return;
            const related = e.relatedTarget;
            if (related instanceof HTMLElement && item.contains(related)) return;
            
            // 恢复轮播
            isPaused = false;
            
            // 清除悬停状态
            hoveredItem = null;
            item.style.zIndex = '';
            item.style.setProperty('--s', '');
            
            // 隐藏浮窗
            hideTooltip();
            
            // 清除饼图高亮
            clearActive();
        });

        orbit.addEventListener('click', (e) => {
            const t = e.target;
            if (!(t instanceof HTMLElement)) return;
            const item = t.closest('.orbit-item');
            if (!item) return;
            const methodKey = item.getAttribute('data-method');
            const id = item.getAttribute('data-id');
            if (!methodKey) return;
            hideTooltip();
        });
    }

    const compareRoot = document.querySelector('.food-compare');
    if (compareRoot) {
        const items = Array.from(compareRoot.querySelectorAll('.compare-item'));
        items.forEach((item) => {
            item.addEventListener('click', () => {
                item.classList.toggle('is-open');
            });
        });
    }



    const seasonData = [
        { month: '1月', emoji: '🐴', name: '马肉纳仁', reason: '冬季进补，肉香更浓。', where: '伊犁/博州一带更常见。' },
        { month: '3月', emoji: '🌸', name: '诺鲁孜风味饭', reason: '春日时令，家宴与聚会更热闹。', where: '南北疆都有节庆餐桌。' },
        { month: '5月', emoji: '🥛', name: '酸奶+蜂蜜', reason: '初夏解腻，酸甜开胃。', where: '巴扎甜品摊常见。' },
        { month: '7月', emoji: '🍈', name: '哈密瓜', reason: '盛夏瓜果上新，甜度最高。', where: '哈密/吐鲁番水果摊。' },
        { month: '9月', emoji: '🍇', name: '葡萄', reason: '金秋收获，葡萄最香甜。', where: '吐鲁番葡萄沟周边。' },
        { month: '11月', emoji: '🍗', name: '大盘鸡', reason: '入冬暖胃，重口更适合。', where: '乌鲁木齐/昌吉更常见。' }
    ];

    function renderSeasonDetail(item) {
        if (!seasonDetail) return;
        seasonDetail.innerHTML = `<div class="sd-title">${item.emoji} ${item.month} · ${item.name}</div><div class="sd-text">为什么这个季节吃：${item.reason}<br>哪里吃：${item.where}</div>`;
    }

    if (seasonTrack) {
        seasonTrack.innerHTML = seasonData.map((s, idx) => {
            return `<div class="season-node" role="button" tabindex="0" data-idx="${idx}"><div class="month">${s.month}</div><div class="food">${s.emoji} ${s.name}</div></div>`;
        }).join('');
        const nodes = Array.from(seasonTrack.querySelectorAll('.season-node'));
        function setActive(i) {
            nodes.forEach((n, idx) => n.classList.toggle('is-active', idx === i));
            renderSeasonDetail(seasonData[i]);
            const node = nodes[i];
            if (node) node.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        seasonTrack.addEventListener('click', (e) => {
            const t = e.target;
            if (!(t instanceof HTMLElement)) return;
            const node = t.closest('.season-node');
            if (!node) return;
            const idx = parseInt(node.getAttribute('data-idx') || '', 10);
            if (!Number.isFinite(idx)) return;
            setActive(idx);
        });
        setActive(0);
    } else if (seasonDetail) {
        renderSeasonDetail(seasonData[0]);
    }

    const rankData = [
        { badge: '🥇', name: '大盘鸡', reason: '新疆第一菜，土豆软糯，鸡肉香辣', score: 92 },
        { badge: '🥈', name: '烤包子', reason: '皮薄馅大，炭火烤制，一口流油', score: 88 },
        { badge: '🥉', name: '手抓饭', reason: '黄萝卜+羊肉+米饭，香气扑鼻', score: 84 },
        { badge: '4', name: '红柳烤肉', reason: '红柳枝串羊肉，焦香四溢', score: 80 },
        { badge: '5', name: '拉条子', reason: '手工拉制，筋道弹牙', score: 78 },
        { badge: '6', name: '馕', reason: '新疆人的主食，种类繁多', score: 76 },
        { badge: '7', name: '烤羊肉串', reason: '孜然辣椒，外焦里嫩', score: 74 },
        { badge: '8', name: '酸奶', reason: '酸甜交织，解腻必备', score: 72 },
        { badge: '9', name: '鸽子汤', reason: '汤鲜肉嫩，暖胃滋补', score: 70 },
        { badge: '10', name: '缸子肉', reason: '搪瓷缸子炖，原汁原味', score: 68 },
        { badge: '11', name: '面肺子', reason: '羊肺灌面，口感独特', score: 66 },
        { badge: '12', name: '包尔萨克', reason: '油炸面食，配奶茶绝佳', score: 64 },
        { badge: '13', name: '熏马肠', reason: '哈萨克风味，肉质紧实', score: 62 },
        { badge: '14', name: '马肉纳仁', reason: '马肉拌面，营养丰富', score: 60 },
        { badge: '15', name: '格瓦斯', reason: '蜂蜜发酵，冰镇爽口', score: 58 }
    ];

    if (rankList) {
        rankList.innerHTML = rankData.map((r) => {
            const width = Math.max(10, Math.min(100, r.score));
            return `<div class="rank-item"><div class="rank-badge">${r.badge}</div><div class="rank-main"><div class="rank-name">${r.name}</div><div class="rank-reason">${r.reason}</div></div><div class="rank-bar"><span style="width:${width}%"></span></div></div>`;
        }).join('');
    }

    if (storyWaterfall) {
        const storyData = [
            {
                emoji: '🍗',
                title: '大盘鸡的故事',
                short: '把整只鸡炖煮配土豆宽面，用大盘端上桌。',
                full: '相传80年代新疆沙湾县，一位师傅为招待长途司机，把整只鸡炖了，配上土豆和宽面，用大盘子装。司机吃完赞不绝口，一传十十传百，“大盘鸡”就此诞生。',
                img: '797a7867df3f8fc80c7310c3939c1a58.jpg'
            },
            {
                emoji: '🥟',
                title: '烤包子的秘密',
                short: '现宰羊肉配洋葱孜然，贴进馕坑烤出炭火香。',
                full: '喀什老城的烤包子店，凌晨就开始和面。馅料只用当天现宰的羊肉，配上洋葱与孜然，贴进馕坑烤十几分钟。咬开瞬间，肉汁和炭火香一起涌出来。',
                img: '4c32d65dd7236c96c678777762072662.jpg'
            },
            {
                emoji: '🫓',
                title: '馕坑边的“等候”',
                short: '馕从馕坑出炉那一刻，最香。',
                full: '在新疆，买馕常常要在馕坑边等上一会儿。面团贴上坑壁，热浪把香气一点点“烘”出来。出炉时外壳酥脆、内里柔韧，是很多人对新疆的第一口记忆。',
                img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20naan%20bread%20assorted%20flavors&image_size=landscape_16_9'
            },
            {
                emoji: '🍜',
                title: '拉条子的手艺',
                short: '筋道来自反复醒发与拉摔抻的节奏。',
                full: '拉条子看似简单，却最考验师傅的手感。面团要醒到位，再用“拉、摔、抻”的节奏把面条拉得粗细均匀。筋道、弹牙的口感，是时间和手艺共同的结果。',
                img: 'f0ae285b9e00c2a40ac3c4a39e808cd4.png'
            },
            {
                emoji: '🍢',
                title: '红柳枝的香气',
                short: '红柳枝串出的羊肉自带木香。',
                full: '红柳在荒漠边缘顽强生长，枝条耐火。用红柳枝串起大块羊肉烤制，除了炭火香，还会带一点点木香。很多人说，这是“南疆夜市的味道”。',
                img: 'ccde300b2d7ca4ddae9f306f19fd6c66.jpg'
            },
            {
                emoji: '🥤',
                title: '格瓦斯的清凉',
                short: '微气泡与麦香甜，把夏天按下暂停键。',
                full: '格瓦斯在新疆很常见，冰镇后入口有微微气泡与麦香甜。吃完烤肉再来一口，清爽解腻，仿佛把炎热的夏天按下暂停键。',
                img: 'c83ade85fe37b8ac3a10400a655dab95.jpg'
            }
        ];

        storyWaterfall.innerHTML = storyData.map((s) => {
            return `<div class="story-card" data-short="${s.short}" data-full="${s.full}"><div class="story-head"><span class="story-emoji">${s.emoji}</span><span class="story-title">${s.title}</span></div><div class="story-img"><img src="${s.img}" alt="${s.title}"></div><div class="story-text">${s.short}</div><button class="story-toggle" type="button">展开</button></div>`;
        }).join('');

        storyWaterfall.addEventListener('click', (e) => {
            const t = e.target;
            if (!(t instanceof HTMLElement)) return;
            const btn = t.closest('.story-toggle');
            if (!btn) return;
            const card = btn.closest('.story-card');
            if (!card) return;
            const opened = card.classList.toggle('is-open');
            const text = card.querySelector('.story-text');
            const short = card.getAttribute('data-short') || '';
            const full = card.getAttribute('data-full') || '';
            if (text) text.textContent = opened ? full : short;
            btn.textContent = opened ? '收起' : '展开';
        });
    }

    if (triviaGrid) {
        const trivia = [
            { emoji: '🍖', q: '新疆人一年吃掉多少只羊？', a: '约2000万只，够绕地球一圈。' },
            { emoji: '🍈', q: '哈密瓜为什么叫哈密瓜？', a: '清朝哈密王献给乾隆的贡品，名声传开。' },
            { emoji: '🥟', q: '烤包子有多少种形状？', a: '圆形、方形、月牙形…每个地区不一样。' },
            { emoji: '🍇', q: '吐鲁番的葡萄有多少品种？', a: '超过500个品种。' },
            { emoji: '🧋', q: '新疆酸奶为什么那么酸？', a: '天然发酵，不加糖，酸香更纯。' },
            { emoji: '🫓', q: '馕为什么这么耐放？', a: '含水量低，烤制后外壳形成保护层。' },
            { emoji: '🍢', q: '红柳枝烤肉有什么特别？', a: '红柳枝的木香让烤肉更香，肉汁更丰富。' },
            { emoji: '🍲', q: '手抓饭的灵魂是什么？', a: '黄萝卜的甜香与羊肉的油香完美融合。' },
            { emoji: '🌭', q: '熏马肠是哪个民族的特色？', a: '哈萨克族的传统美食，冬季进补佳品。' },
            { emoji: '🥨', q: '包尔萨克通常搭配什么吃？', a: '配奶茶或酸奶，是新疆常见的早餐组合。' }
        ];

        triviaGrid.innerHTML = trivia.map((t) => {
            return `<div class="trivia-card" role="button" tabindex="0"><div class="trivia-inner"><div class="trivia-face trivia-front"><div class="trivia-q"><span class="trivia-emoji">${t.emoji}</span><span>${t.q}</span></div><div class="trivia-hint">点击翻转</div></div><div class="trivia-face trivia-back"><div class="trivia-a">${t.a}</div></div></div></div>`;
        }).join('');

        triviaGrid.addEventListener('click', (e) => {
            const t = e.target;
            if (!(t instanceof HTMLElement)) return;
            const card = t.closest('.trivia-card');
            if (!card) return;
            card.classList.toggle('is-flipped');
        });
    }

    if (comboTable) {
        const combos = [
            { 
                scene: '地道早餐', 
                combo: '奶茶 + 包尔萨克 + 果酱', 
                price: '15元',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20Uyghur%20breakfast%20milk%20tea%20borsak%20jam%20traditional%20food&amp;image_size=landscape_4_3'
            },
            { 
                scene: '一人食', 
                combo: '手抓饭 + 酸奶', 
                price: '40元',
                image: '9355345ac0be49b6c8087e4acfa58dd6.jpg'
            },
            { 
                scene: '朋友聚餐', 
                combo: '大盘鸡 + 皮带面 + 格瓦斯', 
                price: '60元',
                image: '1a117648840437ddc3c280bf0efa6ef0.jpg'
            },
            { 
                scene: '夜市小吃', 
                combo: '烤包子 + 烤串 + 烤蛋', 
                price: '50元',
                image: 'a14a8e1c5d94a3a9b6a1e55bb73448f2.jpg'
            },
            { 
                scene: '豪华宴席', 
                combo: '烤全羊 + 手抓肉 + 葡萄酒', 
                price: '150元',
                image: '6cfdbd0b61d34c57a2e79f478f2ab0ef.png'
            },
            { 
                scene: '夏季消暑', 
                combo: '酸奶 + 哈密瓜 + 葡萄', 
                price: '25元',
                image: 'c5bbe315e74c3819cd1f3d414f144d60.jpg'
            },
            { 
                scene: '冬季进补', 
                combo: '马肉纳仁 + 奶茶', 
                price: '55元',
                image: 'ac772bd18d2a41edee0c59519d914183.jpg'
            },
            { 
                scene: '特色午餐', 
                combo: '拉条子 + 烤羊肉串', 
                price: '45元',
                image: '94d0e2b4cbde926da708c99ab044da49.jpg'
            }
        ];

        comboTable.innerHTML = `
            <div class="combo-tooltip" id="combo-tooltip">
                <img src="" alt="美食图片" id="combo-tooltip-img">
            </div>
            <div class="combo-row combo-head"><div>场景</div><div>推荐组合</div><div>人均</div></div>
        ` + combos.map((c, index) => {
            return `<div class="combo-row" data-index="${index}">
                <div class="combo-scene">${c.scene}</div>
                <div class="combo-combo">${c.combo}</div>
                <div class="combo-price">${c.price}</div>
            </div>`;
        }).join('');
        
        // 添加鼠标事件
        const comboRows = comboTable.querySelectorAll('.combo-row[data-index]');
        const comboTooltip = document.getElementById('combo-tooltip');
        const comboTooltipImg = document.getElementById('combo-tooltip-img');
        
        comboRows.forEach((row, index) => {
            row.addEventListener('mouseenter', function(e) {
                const imageUrl = combos[index].image;
                
                // 直接设置图片并显示
                comboTooltipImg.src = imageUrl;
                comboTooltip.classList.add('show');
                
                // 给当前行添加高亮效果
                row.style.transform = 'translateX(8px)';
                row.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                row.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
                row.style.backgroundColor = 'rgba(218, 165, 32, 0.1)';
            });
            
            row.addEventListener('mouseleave', function() {
                comboTooltip.classList.remove('show');
                
                // 移除行的高亮效果
                row.style.transform = '';
                row.style.boxShadow = '';
                row.style.backgroundColor = '';
            });
        });
    }
}

// 初始化数据可视化图表
function initCharts() {
    // 新疆各民族人口分布饼图
    const populationCtx = document.getElementById('populationChart');
    if (populationCtx) {
        new Chart(populationCtx, {
            type: 'pie',
            data: {
                labels: ['维吾尔族', '汉族', '哈萨克族', '回族', '柯尔克孜族', '蒙古族', '塔吉克族', '其他'],
                datasets: [{
                    data: [1162, 880, 156, 100, 20, 17, 5, 30],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#C9CBCF',
                        '#8B4513'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 12
                            },
                            padding: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(2);
                                return `${label}: ${value}万人 (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }
    

    
    // 新疆文化遗产数量柱状图
    const heritageCtx = document.getElementById('heritageChart');
    if (heritageCtx) {
        new Chart(heritageCtx, {
            type: 'bar',
            data: {
                labels: ['传统音乐', '传统舞蹈', '传统戏剧', '传统美术', '传统技艺', '传统医药', '民俗'],
                datasets: [{
                    label: '非物质文化遗产数量',
                    data: [45, 38, 25, 32, 58, 18, 42],
                    backgroundColor: 'rgba(139, 69, 19, 0.8)',
                    borderColor: 'rgba(139, 69, 19, 1)',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}项`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 10
                        },
                        title: {
                            display: true,
                            text: '项目数量'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '文化类别'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 新疆旅游热度趋势折线图
    const tourismCtx = document.getElementById('tourismChart');
    if (tourismCtx) {
        new Chart(tourismCtx, {
            type: 'line',
            data: {
                labels: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
                datasets: [{
                    label: '2023 年游客数量',
                    data: [120, 150, 180, 220, 280, 350, 420, 450, 380, 320, 200, 160],
                    fill: true,
                    backgroundColor: 'rgba(218, 165, 32, 0.2)',
                    borderColor: 'rgba(218, 165, 32, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}万人次`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 100
                        },
                        title: {
                            display: true,
                            text: '游客数量（万人次）'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '月份'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 民族文化特色雷达图
    const radarCtx = document.getElementById('cultureRadarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['传统服饰', '传统美食', '传统音乐', '传统舞蹈', '传统手工艺', '传统建筑', '语言文字', '传统节日'],
                datasets: [
                    {
                        label: '维吾尔族',
                        data: [95, 90, 85, 90, 88, 85, 80, 92],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2
                    },
                    {
                        label: '哈萨克族',
                        data: [85, 80, 88, 85, 82, 75, 78, 85],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2
                    },
                    {
                        label: '蒙古族',
                        data: [80, 75, 82, 80, 78, 85, 75, 88],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        pointBackgroundColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            },
                            padding: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.r}%`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        },
                        ticks: {
                            display: false,
                            maxTicksLimit: 5
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 各民族文化遗产数量对比柱状图
    const ethnicHeritageCtx = document.getElementById('ethnicHeritageChart');
    if (ethnicHeritageCtx) {
        new Chart(ethnicHeritageCtx, {
            type: 'bar',
            data: {
                labels: ['维吾尔族', '哈萨克族', '柯尔克孜族', '蒙古族', '塔吉克族', '回族'],
                datasets: [{
                    label: '非物质文化遗产数量',
                    data: [120, 85, 60, 75, 45, 50],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}项`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 20
                        },
                        title: {
                            display: true,
                            text: '项目数量'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '民族'
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 新疆旅游人数变化折线图
    const tourismCanvasCtx = document.getElementById('tourismCanvas');
    if (tourismCanvasCtx) {
        new Chart(tourismCanvasCtx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [{
                    label: '游客数量 (万人次)',
                    data: [120, 150, 180, 220, 280, 350, 420, 450, 380, 320, 200, 160],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}万人次`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: '游客数量 (万人次)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '月份'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 新疆全年温度变化折线图
    const temperatureCtx = document.getElementById('temperatureCanvas');
    if (temperatureCtx) {
        new Chart(temperatureCtx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [{
                    label: '平均温度 (°C)',
                    data: [-10, -7, 2, 10, 16, 22, 25, 24, 18, 10, 0, -8],
                    fill: true,
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    borderColor: 'rgba(139, 69, 19, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}°C`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: '温度 (°C)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '月份'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 新疆旅游收入变化折线图
    const revenueCanvasCtx = document.getElementById('revenueCanvas');
    if (revenueCanvasCtx) {
        new Chart(revenueCanvasCtx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [{
                    label: '旅游收入 (亿元)',
                    data: [15, 20, 25, 35, 45, 60, 75, 80, 65, 55, 30, 25],
                    fill: true,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}亿元`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: '旅游收入 (亿元)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '月份'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 各地区旅游热度对比折线图
    const regionTourismCtx = document.getElementById('regionTourismChart');
    if (regionTourismCtx) {
        new Chart(regionTourismCtx, {
            type: 'line',
            data: {
                labels: ['乌鲁木齐', '吐鲁番', '喀什', '伊犁', '阿勒泰', '巴音郭楞', '阿克苏', '和田'],
                datasets: [{
                    label: '2023年旅游热度指数',
                    data: [95, 88, 92, 90, 85, 78, 75, 70],
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 10
                        },
                        title: {
                            display: true,
                            text: '热度指数'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '地区'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 新疆人口增长趋势折线图
    const populationTrendCtx = document.getElementById('populationTrendChart');
    if (populationTrendCtx) {
        new Chart(populationTrendCtx, {
            type: 'line',
            data: {
                labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
                datasets: [{
                    label: '新疆总人口（万人）',
                    data: [2181, 2233, 2299, 2360, 2424, 2585, 2626, 2650],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}万人`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 2000,
                        ticks: {
                            stepSize: 100
                        },
                        title: {
                            display: true,
                            text: '人口数量（万人）'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '年份'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
    
    // 文化产业发展趋势折线图
    const cultureIndustryCtx = document.getElementById('cultureIndustryChart');
    if (cultureIndustryCtx) {
        new Chart(cultureIndustryCtx, {
            type: 'line',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: '文化产业总产值（亿元）',
                    data: [320, 350, 380, 420, 480, 550, 620],
                    fill: true,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}亿元`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 100
                        },
                        title: {
                            display: true,
                            text: '产值（亿元）'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '年份'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// 初始化图片轮播
function initCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;
        
        // 设置第一张图片为活动状态
        slides[0].classList.add('active');
        
        // 上一张按钮点击事件
        prevBtn.addEventListener('click', function() {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            slides[currentIndex].classList.add('active');
        });
        
        // 下一张按钮点击事件
        nextBtn.addEventListener('click', function() {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        });
        
        // 自动轮播
        setInterval(function() {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 5000);
    });
}

// 从后端API加载民族数据
function loadEthnicData() {
    // 由于本地服务器没有后端API，暂时注释掉API调用
    // fetch('http://localhost:8080/api/ethnic/list')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('民族数据加载成功:', data);
    //         // 这里可以更新前端界面，使用从API获取的数据
    //     })
    //     .catch(error => {
    //         console.error('加载民族数据失败:', error);
    //         // 使用默认数据
    //     });
}

// 平滑滚动功能
function smoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 计算滚动位置，确保标题完全显示
                const headerHeight = 100; // 增加header高度，确保标题不被遮挡
                const elementTop = targetElement.offsetTop;
                const scrollPosition = elementTop - headerHeight;
                
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 开始探索按钮
    const exploreBtn = document.querySelector('.btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            window.location.href = 'landscape.html';
        });
    }
}

// 气候策略折叠自动轮播
function initClimateCarousel() {
    const carousel = document.getElementById('climateCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.arch-climate-slide');
    const dots = carousel.querySelectorAll('.arch-carousel-dots span');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let autoPlayTimer = null;
    const AUTOPLAY_INTERVAL = 4000;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    slides.forEach((slide, index) => {
        const header = slide.querySelector('.arch-climate-slide-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = slide.classList.contains('active');
                if (isActive) {
                    stopAutoPlay();
                } else {
                    showSlide(index);
                    startAutoPlay();
                }
            });
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoPlay();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoPlay();
        });
    });

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
}

// 绑定按钮事件
function bindButtonEvents() {
    // 民族详情按钮
    const ethnicButtons = document.querySelectorAll('.ethnic-card .btn-secondary');
    ethnicButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ethnicName = this.parentElement.querySelector('h3').textContent;
            // 根据民族名称跳转到对应的详情页面
            if (ethnicName === '维吾尔族') {
                window.location.href = 'ethnic-uyghur.html';
            }
        });
    });
    
    // 互动体验按钮
    const experienceButtons = document.querySelectorAll('.experience-card .btn-primary');
    experienceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const experienceName = this.parentElement.querySelector('h3').textContent;
            startExperience(experienceName);
        });
    });
}

// 显示民族详情
function showEthnicDetails(ethnicName) {
    // 创建详情模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${ethnicName}详情</h2>
            <div class="ethnic-details">
                <div class="detail-section">
                    <h3>语言</h3>
                    <p>${getEthnicLanguage(ethnicName)}</p>
                </div>
                <div class="detail-section">
                    <h3>民族发展时间轴</h3>
                    <div class="mini-timeline">
                        ${getEthnicTimeline(ethnicName)}
                    </div>
                </div>
                <div class="detail-section">
                    <h3>服饰</h3>
                    <p>${getEthnicClothing(ethnicName)}</p>
                </div>
                <div class="detail-section">
                    <h3>手工艺</h3>
                    <p>${getEthnicCrafts(ethnicName)}</p>
                </div>
                <div class="detail-section">
                    <h3>美食</h3>
                    <p>${getEthnicFood(ethnicName)}</p>
                </div>
                <div class="detail-section">
                    <h3>建筑</h3>
                    <p>${getEthnicArchitecture(ethnicName)}</p>
                </div>
                <div class="detail-section">
                    <h3>生活习俗</h3>
                    <p>${getEthnicCustoms(ethnicName)}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 关闭模态框
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        modal.remove();
        document.body.style.overflow = 'auto';
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
    
    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            width: 90%;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        .close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
            color: #8B4513;
        }
        .close:hover {
            color: #DAA520;
        }
        .ethnic-details {
            margin-top: 2rem;
        }
        .detail-section {
            margin-bottom: 2rem;
        }
        .detail-section h3 {
            color: #8B4513;
            margin-bottom: 1rem;
        }
        .mini-timeline {
            border-left: 2px solid #8B4513;
            padding-left: 1rem;
        }
        .mini-timeline-item {
            margin-bottom: 1rem;
        }
        .mini-timeline-date {
            font-weight: bold;
            color: #8B4513;
        }
    `;
    document.head.appendChild(style);
}

// 获取民族语言信息
function getEthnicLanguage(ethnicName) {
    const languages = {
        '维吾尔族': '维吾尔语，属于阿尔泰语系突厥语族，使用阿拉伯字母拼写的维吾尔文。',
        '哈萨克族': '哈萨克语，属于阿尔泰语系突厥语族，使用西里尔字母或阿拉伯字母拼写。',
        '柯尔克孜族': '柯尔克孜语，属于阿尔泰语系突厥语族，使用西里尔字母拼写。',
        '蒙古族': '蒙古语，属于阿尔泰语系蒙古语族，使用回鹘式蒙古文或西里尔字母拼写。'
    };
    return languages[ethnicName] || '该民族语言信息待完善。';
}

// 获取民族发展时间轴
function getEthnicTimeline(ethnicName) {
    const timelines = {
        '维吾尔族': `
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">公元前3世纪</div>
                <p>维吾尔族的先民丁零人在贝加尔湖一带活动。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">公元7世纪</div>
                <p>建立了回纥汗国，后改名为回鹘。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">公元10世纪</div>
                <p>西迁的回鹘人建立了喀喇汗王朝。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">公元13世纪</div>
                <p>蒙古西征，维吾尔族地区纳入蒙古帝国版图。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">1949年</div>
                <p>新疆和平解放，维吾尔族人民进入新的历史时期。</p>
            </div>
        `,
        '哈萨克族': `
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">公元15世纪</div>
                <p>哈萨克族正式形成，建立了哈萨克汗国。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">18世纪</div>
                <p>哈萨克汗国分裂为大、中、小三个玉兹。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">19世纪</div>
                <p>哈萨克族地区逐步被沙俄占领。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">1949年</div>
                <p>新疆和平解放，哈萨克族人民获得新生。</p>
            </div>
        `,
        '柯尔克孜族': `
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">公元前3世纪</div>
                <p>柯尔克孜族的先民坚昆人在叶尼塞河流域活动。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">公元8世纪</div>
                <p>建立了黠戛斯汗国。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">18世纪</div>
                <p>柯尔克孜族迁徙至天山地区。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">1949年</div>
                <p>新疆和平解放，柯尔克孜族人民迎来新的生活。</p>
            </div>
        `,
        '蒙古族': `
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">公元12世纪</div>
                <p>铁木真统一蒙古各部，建立蒙古帝国。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">13世纪</div>
                <p>蒙古西征，新疆纳入蒙古帝国版图。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">17世纪</div>
                <p>准噶尔部在新疆建立政权。</p>
            </div>
            <div class="mini-timeline-item">
                <div class="mini-timeline-date">1949年</div>
                <p>新疆和平解放，蒙古族人民进入新的历史时期。</p>
            </div>
        `
    };
    return timelines[ethnicName] || '<p>该民族发展时间轴待完善。</p>';
}

// 获取民族服饰信息
function getEthnicClothing(ethnicName) {
    const clothing = {
        '维吾尔族': '维吾尔族传统服饰色彩鲜艳，男子穿袷袢（长袍），女子穿艾德莱斯绸制成的连衣裙，头戴花帽。',
        '哈萨克族': '哈萨克族传统服饰以皮毛为主，男子穿羊皮大衣，女子穿色彩艳丽的连衣裙，头戴尖顶帽。',
        '柯尔克孜族': '柯尔克孜族传统服饰以皮衣为主，女子穿红色或蓝色的连衣裙，头戴白毡帽。',
        '蒙古族': '蒙古族传统服饰为蒙古袍，男子穿深色蒙古袍，女子穿色彩鲜艳的蒙古袍，头戴蒙古帽。'
    };
    return clothing[ethnicName] || '该民族服饰信息待完善。';
}

// 获取民族手工艺信息
function getEthnicCrafts(ethnicName) {
    const crafts = {
        '维吾尔族': '维吾尔族擅长制作艾德莱斯绸、地毯、花帽、木雕等手工艺品。',
        '哈萨克族': '哈萨克族擅长制作皮毛制品、马鞍、地毯等手工艺品。',
        '柯尔克孜族': '柯尔克孜族擅长制作马鞍、皮毛制品、手织毛毡等手工艺品。',
        '蒙古族': '蒙古族擅长制作蒙古包、马鞍、奶制品、手织毛毡等手工艺品。'
    };
    return crafts[ethnicName] || '该民族手工艺信息待完善。';
}

// 获取民族美食信息
function getEthnicFood(ethnicName) {
    const food = {
        '维吾尔族': '维吾尔族美食有手抓饭、烤羊肉串、馕、烤包子、拉条子等。',
        '哈萨克族': '哈萨克族美食有手抓肉、马肠子、奶疙瘩、奶茶等。',
        '柯尔克孜族': '柯尔克孜族美食有手抓肉、奶皮子、酸奶、烤饼等。',
        '蒙古族': '蒙古族美食有手抓肉、奶茶、奶豆腐、炒米等。'
    };
    return food[ethnicName] || '该民族美食信息待完善。';
}

// 获取民族建筑信息
function getEthnicArchitecture(ethnicName) {
    const architecture = {
        '维吾尔族': '维吾尔族传统建筑以土木结构为主，有阿以旺、高台民居等特色建筑。',
        '哈萨克族': '哈萨克族传统建筑为游牧帐篷（毡房），便于迁徙。',
        '柯尔克孜族': '柯尔克孜族传统建筑为毡房，冬季也有土房。',
        '蒙古族': '蒙古族传统建筑为蒙古包，圆形穹顶，便于拆装。'
    };
    return architecture[ethnicName] || '该民族建筑信息待完善。';
}

// 获取民族生活习俗信息
function getEthnicCustoms(ethnicName) {
    const customs = {
        '维吾尔族': '维吾尔族重视礼仪，热情好客，有古尔邦节、肉孜节等传统节日。',
        '哈萨克族': '哈萨克族是游牧民族，重视畜牧业，有诺鲁孜节、肉孜节等传统节日。',
        '柯尔克孜族': '柯尔克孜族是游牧民族，重视狩猎和畜牧业，有诺鲁孜节等传统节日。',
        '蒙古族': '蒙古族是游牧民族，重视畜牧业，有那达慕大会等传统节日。'
    };
    return customs[ethnicName] || '该民族生活习俗信息待完善。';
}

// 初始化互动体验
function initExperience() {
    // 这里可以添加更复杂的互动体验逻辑
    console.log('互动体验初始化完成');
}

// 开始互动体验
function startExperience(experienceName) {
    if (experienceName === '打馕工坊') {
        alert('欢迎来到打馕工坊！在这里你可以体验传统维吾尔族馕的制作过程。');
        // 这里可以添加打馕工坊的具体互动逻辑
    } else if (experienceName === '逛巴扎') {
        alert('欢迎来到虚拟巴扎！在这里你可以体验新疆传统市场的热闹氛围。');
        // 这里可以添加逛巴扎的具体互动逻辑
    } else if (experienceName === '维吾尔族传统舞蹈') {
        alert('欢迎来到维吾尔族传统舞蹈体验！在这里你可以学习和体验维吾尔族的传统舞蹈艺术。');
        // 这里可以添加维吾尔族传统舞蹈的具体互动逻辑
    } else if (experienceName === '哈萨克族奶茶制作') {
        alert('欢迎来到哈萨克族奶茶制作体验！在这里你可以学习制作正宗的哈萨克族奶茶。');
        // 这里可以添加哈萨克族奶茶制作的具体互动逻辑
    } else if (experienceName === '蒙古族那达慕大会') {
        alert('欢迎来到蒙古族那达慕大会体验！在这里你可以体验蒙古族传统的那达慕大会活动。');
        // 这里可以添加蒙古族那达慕大会的具体互动逻辑
    } else if (experienceName === '塔吉克族鹰舞') {
        alert('欢迎来到塔吉克族鹰舞体验！在这里你可以学习和体验塔吉克族的传统鹰舞。');
        // 这里可以添加塔吉克族鹰舞的具体互动逻辑
    } else if (experienceName === '柯尔克孜族刺绣') {
        alert('欢迎来到柯尔克孜族刺绣体验！在这里你可以学习柯尔克孜族的传统刺绣技艺。');
        // 这里可以添加柯尔克孜族刺绣的具体互动逻辑
    } else if (experienceName === '新疆传统乐器体验') {
        alert('欢迎来到新疆传统乐器体验！在这里你可以学习和体验新疆各民族的传统乐器。');
        // 这里可以添加新疆传统乐器体验的具体互动逻辑
    }
}

// 初始化热力图
function initHeatmap() {
    const calendarEl = document.getElementById('festival-calendar');
    if (!calendarEl) return;
    
    // 使用 ECharts 创建节日日历热力图
    const chart = echarts.init(calendarEl);
    
    // 生成节日数据
    const festivalData = [
        ['2024-01-01', 2],  // 元旦
        ['2024-02-10', 5],  // 春节
        ['2024-03-21', 8],  // 诺鲁孜节
        ['2024-04-10', 4],  // 肉孜节
        ['2024-05-18', 3],  // 西迁节
        ['2024-06-17', 5],  // 古尔邦节
        ['2024-07-20', 6],  // 那达慕大会
        ['2024-08-15', 4],  // 丰收节
        ['2024-09-17', 3],  // 中秋节
        ['2024-10-01', 5],  // 国庆节
        ['2024-11-11', 2],  // 其他节日
        ['2024-12-25', 3],  // 其他节日
    ];
    
    const option = {
        tooltip: {
            position: 'top',
            formatter: function(params) {
                const date = params.value[0];
                const value = params.value[1];
                let level = '';
                if (value >= 7) level = '高';
                else if (value >= 4) level = '中';
                else level = '低';
                return `${date}<br/>节日密度：${value} (${level})`;
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            inRange: {
                color: ['#f0f9ff', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac', '#084081']
            },
            textStyle: {
                color: '#333'
            }
        },
        calendar: {
            top: 30,
            left: 30,
            right: 30,
            cellSize: ['auto', 40],
            range: '2024',
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: { show: true },
            monthLabel: {
                nameMap: 'zh',
                fontSize: 12
            },
            dayLabel: {
                nameMap: 'zh',
                fontSize: 10
            }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: festivalData,
            label: {
                show: true,
                fontSize: 10,
                color: '#333'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    };
    
    chart.setOption(option);
    
    // 响应式调整
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

function initFestivalMonthHeatmap() {
    const el = document.getElementById('festival-month-heatmap');
    if (!el) return;
    if (typeof echarts === 'undefined') return;

    const chart = echarts.init(el);

    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const values = [3, 3, 6, 3, 3, 6, 9, 9, 6, 6, 6, 3];
    const data = months.map((m, i) => [m, '热度', values[i]]);

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: (params) => {
                const m = params.value[0];
                const v = params.value[2];
                let label = '节日较少';
                if (v >= 8) label = '节日密集';
                else if (v >= 5) label = '有重要节日';
                return `${m}<br/>${label}`;
            }
        },
        grid: {
            left: 40,
            right: 10,
            top: 6,
            bottom: 6,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: months,
            position: 'top',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: '#333',
                fontSize: 11
            }
        },
        yAxis: {
            type: 'category',
            data: ['热度'],
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: '#333',
                fontSize: 11
            }
        },
        visualMap: {
            type: 'piecewise',
            show: false,
            dimension: 2,
            pieces: [
                { min: 8, color: '#e74c3c' },
                { min: 5, max: 7, color: '#f1c40f' },
                { max: 4, color: '#2ecc71' }
            ]
        },
        series: [
            {
                type: 'scatter',
                data,
                symbolSize: 16,
                itemStyle: {
                    borderColor: 'rgba(255,255,255,0.9)',
                    borderWidth: 2,
                    shadowBlur: 8,
                    shadowColor: 'rgba(0,0,0,0.12)'
                }
            }
        ]
    };

    chart.setOption(option);

    function highlightTimelineByMonth(monthNumber) {
        const timeline = document.querySelector('.horizontal-timeline');
        if (!timeline) return;
        // 滚动容器就是 timeline 本身
        const track = timeline.querySelector('.timeline-track');
        if (!track) return;

        const items = Array.from(track.querySelectorAll('.timeline-item.horizontal'));
        if (items.length === 0) return;

        items.forEach((item) => item.classList.remove('is-highlight'));

        const matched = items.filter((item) => {
            const raw = (item.getAttribute('data-months') || '').trim();
            if (!raw) return false;
            const months = raw.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => Number.isFinite(n));
            return months.includes(monthNumber);
        });

        if (matched.length === 0) {
            return;
        }

        matched.forEach((item) => item.classList.add('is-highlight'));

        // 停止自动滚动，让对应元素滚动到可视区域
        if (window.festivalTimelineAutoScrollId) {
            cancelAnimationFrame(window.festivalTimelineAutoScrollId);
        }

        setTimeout(() => {
            const target = matched[0];
            const timelineRect = timeline.getBoundingClientRect();
            const itemRect = target.getBoundingClientRect();
            const current = timeline.scrollLeft;
            const delta = (itemRect.left - timelineRect.left) - (timelineRect.width / 2 - itemRect.width / 2);
            timeline.scrollTo({ left: current + delta, behavior: 'smooth' });
        }, 50);
    }

    // 鼠标悬浮时触发高亮并跳转
    chart.on('mouseover', (params) => {
        if (!params || !params.value || !params.value[0]) return;
        const monthLabel = String(params.value[0]).trim();
        const match = monthLabel.match(/^(\d+)\s*月$/);
        if (!match) return;
        const monthNumber = parseInt(match[1], 10);
        if (!Number.isFinite(monthNumber)) return;
        highlightTimelineByMonth(monthNumber);
    });
    
    // 鼠标移出时恢复自动滚动
    chart.on('mouseout', () => {
        const timeline = document.querySelector('.horizontal-timeline');
        const track = document.querySelector('.horizontal-timeline .timeline-track');
        if (timeline && track) {
            const items = Array.from(track.querySelectorAll('.timeline-item.horizontal'));
            items.forEach((item) => item.classList.remove('is-highlight'));
            startFestivalTimelineAutoScroll(timeline);
        }
    });

    window.addEventListener('resize', function() {
        chart.resize();
    });

    // 初始化自动滚动
    const festivalTimeline = document.querySelector('.horizontal-timeline');
    function startFestivalTimelineAutoScroll(container) {
        if (!container) return;
        if (window.festivalTimelineAutoScrollId) cancelAnimationFrame(window.festivalTimelineAutoScrollId);
        
        let scrollSpeed = 0.5;
        
        function scroll() {
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (maxScroll <= 0) return;

            container.scrollLeft += scrollSpeed;
            
            // 无缝循环：假设克隆了一倍的内容，当滚动过一半时瞬间回到0
            if (container.scrollLeft >= container.scrollWidth / 2) {
                container.scrollLeft = 0;
            }
            
            window.festivalTimelineAutoScrollId = requestAnimationFrame(scroll);
        }
        
        window.festivalTimelineAutoScrollId = requestAnimationFrame(scroll);
    }

    if (festivalTimeline) {
        // 为了视觉效果，克隆一些节点以实现无缝滚动
        const track = festivalTimeline.querySelector('.timeline-track');
        if (track) {
            const items = track.querySelectorAll('.timeline-item');
            if (items.length > 0) {
                items.forEach(item => {
                    const clone = item.cloneNode(true);
                    track.appendChild(clone);
                });
            }
        }
        
        // 鼠标在时间轴上时也停止滚动
        festivalTimeline.addEventListener('mouseenter', () => {
            if (window.festivalTimelineAutoScrollId) cancelAnimationFrame(window.festivalTimelineAutoScrollId);
        });
        festivalTimeline.addEventListener('mouseleave', () => {
            startFestivalTimelineAutoScroll(festivalTimeline);
        });

        startFestivalTimelineAutoScroll(festivalTimeline);
    }
}

// 初始化文化地图
function initCulturalMap() {
    const mapEl = document.getElementById('cultural-map');
    if (!mapEl) return;
    
    // 使用 ECharts 创建新疆文化地图
    const chart = echarts.init(mapEl);
    
    // 新疆各地州文化数据
    const culturalData = [
        {name: '乌鲁木齐市', value: 85, culture: '国际大巴扎、新疆博物馆'},
        {name: '克拉玛依市', value: 70, culture: '魔鬼城、黑油山'},
        {name: '吐鲁番市', value: 90, culture: '葡萄沟、火焰山、交河故城'},
        {name: '哈密市', value: 75, culture: '哈密王陵、巴里坤草原'},
        {name: '昌吉州', value: 65, culture: '天山天池、江布拉克'},
        {name: '博尔塔拉州', value: 70, culture: '赛里木湖、怪石峪'},
        {name: '巴音郭楞州', value: 80, culture: '博斯腾湖、罗布泊'},
        {name: '阿克苏地区', value: 75, culture: '天山神秘大峡谷'},
        {name: '克孜勒苏州', value: 65, culture: '喀拉库勒湖、慕士塔格峰'},
        {name: '喀什地区', value: 95, culture: '喀什噶尔老城、艾提尕尔清真寺'},
        {name: '和田地区', value: 80, culture: '和田玉、艾德莱斯绸'},
        {name: '伊犁州', value: 85, culture: '那拉提草原、杏花沟'},
        {name: '塔城地区', value: 60, culture: '塔城红楼、巴尔鲁克山'},
        {name: '阿勒泰地区', value: 75, culture: '喀纳斯湖、禾木村'}
    ];
    
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return `${params.name}<br/>文化指数：${params.value}<br/>特色文化：${params.data.culture}`;
            }
        },
        visualMap: {
            show: false,
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true,
            inRange: {
                color: ['#f0f9ff', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac', '#084081']
            },
            textStyle: {
                color: '#333'
            }
        },
        geo: {
            map: 'xinjiang',
            type: 'map',
            roam: true,
            zoom: 1.2,
            label: {
                show: true,
                color: '#333',
                fontSize: 10
            },
            itemStyle: {
                areaColor: '#f3f3f3',
                borderColor: '#666',
                borderWidth: 1
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#2a333d'
                },
                label: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name: '文化指数',
                type: 'map',
                geoIndex: 0,
                data: culturalData
            }
        ]
    };
    
    // 由于没有新疆地图的 GeoJSON，使用模拟数据展示效果
    // 实际使用时需要注册新疆地图的 GeoJSON 数据
    echarts.registerMap('xinjiang', {
        type: 'FeatureCollection',
        features: []
    });
    
    chart.setOption(option);
    
    // 响应式调整
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// 页面滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(139, 69, 19, 0.95)';
    } else {
        header.style.backgroundColor = '#8B4513';
    }
    
    // 显示/隐藏回到顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// 回到顶部按钮功能
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 响应式导航菜单
function toggleNav() {
    const nav = document.querySelector('.nav ul');
    nav.classList.toggle('active');
}

// 添加响应式导航按钮
if (window.innerWidth <= 768) {
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.textContent = '菜单';
    navToggle.addEventListener('click', toggleNav);
    
    const header = document.querySelector('.header');
    header.appendChild(navToggle);
    
    // 添加响应式导航样式
    const style = document.createElement('style');
    style.textContent = `
        .nav-toggle {
            display: block;
            background-color: #DAA520;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            margin: 1rem auto;
        }
        .nav ul {
            flex-direction: column;
            align-items: center;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        .nav ul.active {
            max-height: 300px;
        }
        .nav ul li {
            margin: 0.5rem 0;
        }
    `;
    document.head.appendChild(style);
}

// 初始化漂浮弹幕
function initDanmaku() {
    const container = document.getElementById('danmaku-container');
    if (!container) return;
    
    let danmakuContents = [];
    let currentIndex = 0;
    
    // 从API获取弹幕数据
    async function fetchDanmaku() {
        try {
            const response = await fetch('/api/danmu');
            if (!response.ok) {
                throw new Error('Failed to fetch danmaku');
            }
            const data = await response.json();
            // 处理API返回的数据格式：[{description:"弹幕内容"}]
            if (Array.isArray(data)) {
                danmakuContents = data.map(item => {
                    if (typeof item === 'object' && item !== null && 'description' in item) {
                        return item.description;
                    }
                    return String(item);
                }).filter(content => content && content.trim());
            } else {
                danmakuContents = [];
            }
            console.log('Fetched new danmaku:', danmakuContents);
        } catch (error) {
            console.error('Error fetching danmaku:', error);
            // 失败时使用默认弹幕
            danmakuContents = [
                "新疆的风景太美了，尤其是喀纳斯湖！",
                "维吾尔族的手抓饭真的太好吃了",
                "在喀什古城感受到了浓厚的民族文化",
                "新疆的羊肉串是我吃过最好吃的",
                "哈萨克族的姑娘歌声真好听",
                "新疆的水果又甜又便宜",
                "在那拉提草原骑马的感觉太棒了",
                "维吾尔族的花帽真漂亮",
                "新疆的酸奶比我想象的好喝",
                "在巴扎里买到了很多特色手工艺品"
            ];
        }
    }
    
    // 创建弹幕的函数
    function createDanmaku() {
        if (danmakuContents.length === 0) return;
        
        const danmaku = document.createElement('div');
        danmaku.className = 'danmaku-item';
        
        // 循环使用弹幕内容
        const content = danmakuContents[currentIndex];
        danmaku.textContent = content;
        currentIndex = (currentIndex + 1) % danmakuContents.length;
        
        // 随机位置（垂直方向）
        const top = Math.random() * (container.offsetHeight - 40);
        danmaku.style.top = `${top}px`;
        
        // 从右侧进入
        danmaku.style.right = `-300px`;
        
        container.appendChild(danmaku);
        
        // 动画效果
        const duration = 10000 + Math.random() * 5000; // 10-15秒
        let startTime = null;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
            
            // 计算位置
            const startX = container.offsetWidth;
            const endX = -danmaku.offsetWidth;
            const currentX = startX - (startX - endX) * progress;
            
            danmaku.style.right = `${container.offsetWidth - currentX}px`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // 动画结束后移除弹幕
                if (container.contains(danmaku)) {
                    container.removeChild(danmaku);
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // 初始化
    async function init() {
        await fetchDanmaku();
        
        // 每2秒创建一个弹幕
        setInterval(createDanmaku, 2000);
        
        // 每10秒重新获取弹幕
        setInterval(fetchDanmaku, 10000);
        
        // 初始创建几个弹幕
        for (let i = 0; i < 5; i++) {
            setTimeout(createDanmaku, i * 500);
        }
    }
    
    init();
}

// 初始化音乐控制
function initMusicControl() {
    const music = document.getElementById('background-music');
    const toggleBtn = document.getElementById('music-toggle');
    
    if (music && toggleBtn) {
        // 设置音量为一半（50%）
        music.volume = 0.5;
        
        // 从 localStorage 恢复播放状态
        const savedTime = localStorage.getItem('musicCurrentTime');
        const savedMuted = localStorage.getItem('musicMuted');
        const savedPlaying = localStorage.getItem('musicPlaying');
        
        if (savedTime) {
            music.currentTime = parseFloat(savedTime);
        }
        if (savedMuted !== null) {
            music.muted = savedMuted === 'true';
        }
        
        // 设置初始按钮状态 - 修正：🔊表示播放中，🔇表示静音
        if (music.muted) {
            toggleBtn.textContent = '🔇';
        } else {
            toggleBtn.textContent = '🔊';
        }
        
        // 尝试自动播放（需要用户先交互过）
        if (savedPlaying === 'true') {
            music.play().catch(function() {
                // 如果自动播放被阻止，保持静音状态
                music.muted = true;
                toggleBtn.textContent = '🔇';
            });
        }
        
        toggleBtn.addEventListener('click', function() {
            if (music.muted) {
                music.muted = false;
                toggleBtn.textContent = '🔊';
                music.play().catch(() => {});
            } else {
                music.muted = true;
                toggleBtn.textContent = '🔇';
            }
            localStorage.setItem('musicMuted', music.muted);
        });
        
        // 保存播放时间
        music.addEventListener('timeupdate', function() {
            localStorage.setItem('musicCurrentTime', music.currentTime);
        });
        
        // 保存播放状态
        music.addEventListener('play', function() {
            localStorage.setItem('musicPlaying', 'true');
        });
        music.addEventListener('pause', function() {
            localStorage.setItem('musicPlaying', 'false');
        });
    }
}

// 搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            searchResults.innerHTML = '<p>请输入搜索关键词</p>';
            return;
        }
        
        // 模拟搜索结果
        const results = [
            { title: '维吾尔族', link: 'ethnic-uyghur.html', description: '新疆的主体民族之一，有着悠久的历史和灿烂的文化' },
            { title: '哈萨克族', link: 'ethnic-kazakh.html', description: '主要分布在新疆北部，以畜牧业为主' },
            { title: '柯尔克孜族', link: 'ethnic-kirghiz.html', description: '主要分布在克孜勒苏柯尔克孜自治州' },
            { title: '蒙古族', link: 'ethnic-mongolian.html', description: '主要分布在巴音郭楞蒙古自治州和博尔塔拉蒙古自治州' },
            { title: '塔吉克族', link: 'ethnic-tajik.html', description: '主要分布在帕米尔高原地区' },
            { title: '回族', link: 'ethnic-hui.html', description: '分布在新疆各地，以农业和商业为主' },
            { title: '诺鲁孜节', link: 'index.html#timeline', description: '新疆多个民族共同的传统节日，标志着春天的到来' },
            { title: '古尔邦节', link: 'index.html#timeline', description: '伊斯兰教的重要节日，又称宰牲节' }
        ];
        
        const filteredResults = results.filter(result => 
            result.title.toLowerCase().includes(query.toLowerCase()) || 
            result.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filteredResults.length === 0) {
            searchResults.innerHTML = '<p>未找到相关内容</p>';
        } else {
            let html = '<h4>搜索结果：</h4>';
            filteredResults.forEach(result => {
                html += `<div style="margin-bottom: 1rem;"><a href="${result.link}" style="color: #8B4513; text-decoration: none; font-weight: bold;">${result.title}</a><p style="margin-top: 0.3rem; color: #666;">${result.description}</p></div>`;
            });
            searchResults.innerHTML = html;
        }
    }
}

// 知识问答功能
function initQuiz() {
    const questions = [
        {
            question: '新疆的主体民族是哪个？',
            options: ['维吾尔族', '哈萨克族', '回族', '蒙古族'],
            answer: 0
        },
        {
            question: '下列哪个节日是新疆多个民族共同庆祝的？',
            options: ['春节', '诺鲁孜节', '中秋节', '端午节'],
            answer: 1
        },
        {
            question: '新疆的首府是哪里？',
            options: ['喀什', '伊犁', '乌鲁木齐', '和田'],
            answer: 2
        },
        {
            question: '下列哪个是维吾尔族的传统手工艺？',
            options: ['艾德莱斯绸', '蒙古包', '哈萨克族马鞍', '柯尔克孜族毛毡'],
            answer: 0
        },
        {
            question: '新疆最大的少数民族是？',
            options: ['维吾尔族', '汉族', '哈萨克族', '回族'],
            answer: 0
        }
    ];
    
    let currentQuestion = 0;
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.getElementById('quiz-feedback');
    const nextQuestionBtn = document.getElementById('next-question');
    
    if (quizQuestion && quizOptions.length > 0 && nextQuestionBtn) {
        loadQuestion();
        
        quizOptions.forEach((option, index) => {
            option.addEventListener('click', function() {
                checkAnswer(index);
            });
        });
        
        nextQuestionBtn.addEventListener('click', function() {
            currentQuestion = (currentQuestion + 1) % questions.length;
            loadQuestion();
            quizFeedback.textContent = '';
            quizFeedback.className = 'quiz-feedback';
            quizOptions.forEach(option => {
                option.className = 'quiz-option';
                option.disabled = false;
            });
        });
    }
    
    function loadQuestion() {
        const q = questions[currentQuestion];
        quizQuestion.textContent = q.question;
        quizOptions.forEach((option, index) => {
            option.textContent = q.options[index];
            option.className = 'quiz-option';
            option.disabled = false;
        });
    }
    
    function checkAnswer(choice) {
        const q = questions[currentQuestion];
        quizOptions.forEach((option, index) => {
            if (index === q.answer) {
                option.className = 'quiz-option correct';
            } else if (index === choice) {
                option.className = 'quiz-option incorrect';
            }
            option.disabled = true;
        });
        
        if (choice === q.answer) {
            quizFeedback.textContent = '回答正确！';
            quizFeedback.className = 'quiz-feedback correct';
        } else {
            quizFeedback.textContent = `回答错误！正确答案是：${q.options[q.answer]}`;
            quizFeedback.className = 'quiz-feedback incorrect';
        }
    }
}

// 旅游路线推荐功能
function initTourism() {
    // 标签页切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 切换标签按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 切换内容显示
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 自定义路线生成
    const generateRouteBtn = document.getElementById('generate-route-btn');
    if (generateRouteBtn) {
        generateRouteBtn.addEventListener('click', function() {
            const startPoint = document.getElementById('start-point').value || '乌鲁木齐';
            const destination = document.getElementById('destination').value || '喀什';
            const waypoints = document.getElementById('waypoints').value ? document.getElementById('waypoints').value.split(',').map(w => w.trim()) : [];
            const days = document.getElementById('days').value;
            
            if (!startPoint || !destination) {
                alert('请填写出发地和目的地');
                return;
            }
            
            // 模拟生成路线（实际项目中可以调用高德地图API）
            const resultDiv = document.getElementById('custom-route-result');
            resultDiv.innerHTML = `
                <h4>🚗 自定义路线规划</h4>
                <div class="route-plan">
                    <p><strong>出发地：</strong>${startPoint}</p>
                    <p><strong>目的地：</strong>${destination}</p>
                    ${waypoints.length > 0 ? `<p><strong>途径点：</strong>${waypoints.join(' → ')}</p>` : ''}
                    <p><strong>预计行程：</strong>${days}天</p>
                    <p><strong>路线规划：</strong>已通过高德地图API生成最佳自驾路线</p>
                    <p><strong>推荐理由：</strong>这是一条根据您提供的景点规划的个性化路线，涵盖了新疆的自然风光和人文景观。</p>
                    <button class="btn-secondary" onclick="openMapDirection('${startPoint}', '${destination}', '${waypoints.join(',')}')">查看地图</button>
                </div>
            `;
        });
    }
    
    // 系统推荐路线
    const recommendRouteBtn = document.getElementById('recommend-route-btn');
    if (recommendRouteBtn) {
        recommendRouteBtn.addEventListener('click', function() {
            const travelDays = document.getElementById('travel-days').value;
            const travelType = document.getElementById('travel-type').value;
            const travelSeason = document.getElementById('travel-season').value;
            
            // 模拟系统推荐路线
            const resultDiv = document.getElementById('recommended-route-result');
            const recommendedRoute = getRecommendedRoute(travelDays, travelType, travelSeason);
            
            resultDiv.innerHTML = `
                <h4>🌟 系统推荐路线</h4>
                <div class="route-plan">
                    <p><strong>推荐路线：</strong>${recommendedRoute.name}</p>
                    <p><strong>行程天数：</strong>${travelDays}天</p>
                    <p><strong>路线类型：</strong>${getRouteTypeText(travelType)}</p>
                    <p><strong>最佳季节：</strong>${getSeasonText(travelSeason)}</p>
                    <p><strong>行程安排：</strong>${recommendedRoute.itinerary}</p>
                    <p><strong>推荐理由：</strong>${recommendedRoute.reason}</p>
                </div>
            `;
        });
    }
    
    // 初始化路线流程图轮播
    initRouteCarousel();
}



// 获取路线类型文本
function getRouteTypeText(type) {
    const types = {
        'silk-road': '丝绸之路沿线',
        'border': '边境国门',
        'nature': '自然风光',
        'culture': '文化体验',
        'adventure': '探险挑战'
    };
    return types[type] || type;
}

// 获取季节文本
function getSeasonText(season) {
    const seasons = {
        'spring': '春季',
        'summer': '夏季',
        'autumn': '秋季',
        'winter': '冬季'
    };
    return seasons[season] || season;
}

// 获取推荐路线
function getRecommendedRoute(days, type, season) {
    // 模拟推荐路线数据
    const routes = {
        '3': {
            'silk-road': {
                name: '丝绸之路精华线',
                itinerary: '乌鲁木齐 → 吐鲁番 → 库车 → 喀什',
                reason: '主打“短而精”：火洲吐鲁番的风物对比、库车龟兹文化的遗韵、喀什古城的烟火市井一线串联，适合第一次来新疆、想快速抓住丝路气质的人'
            },
            'border': {
                name: '伊犁边境短线',
                itinerary: '伊宁 → 霍尔果斯 → 赛里木湖',
                reason: '把“口岸”与“湖景”放在同一趟里：霍尔果斯的国门氛围与边贸气息，接上赛里木湖的高颜值蓝调风光，节奏轻快、移动不累'
            },
            'nature': {
                name: '天山天池短线',
                itinerary: '乌鲁木齐 → 天山天池 → 吐鲁番',
                reason: '一趟看懂“新疆的反差”：天山天池的高山湖泊与雪线气息，转身就到吐鲁番的热烈与葡萄绿洲，景观密度高、拍照出片'
            },
            'culture': {
                name: '民俗文化体验线',
                itinerary: '乌鲁木齐 → 喀什古城 → 和田',
                reason: '偏“人文沉浸”：逛喀什老城巷子与巴扎、看手工艺与音乐舞蹈的日常，再到和田触摸玉文化与南疆绿洲生活，适合喜欢城市漫游与市集氛围的人'
            },
            'adventure': {
                name: '沙漠探险线',
                itinerary: '乌鲁木齐 → 鄯善库木塔格沙漠 → 吐鲁番',
                reason: '轻量级探险入门：库木塔格的沙丘线条、滑沙与日落星空体验，强刺激但门槛不高，适合想在短假期里收获“大漠记忆”的人'
            }
        },
        '5': {
            'silk-road': {
                name: '丝绸之路全景线',
                itinerary: '乌鲁木齐 → 吐鲁番 → 库尔勒 → 库车 → 喀什',
                reason: '路线更“完整”：从吐鲁番的古城遗址与绿洲农事，到库尔勒/库车的丝路节点城市，再落到喀什的老城与多民族风情，文化与风景的比例更均衡'
            },
            'border': {
                name: '伊犁塔城边境线',
                itinerary: '伊宁 → 霍尔果斯 → 赛里木湖 → 塔城 → 小白杨哨所',
                reason: '边境氛围拉满：口岸、界碑与哨所故事贯穿全程，既能看到边贸与国门气象，也能在北疆湖泊与草原风光里放松，是“家国情怀 + 自然治愈”的组合'
            },
            'nature': {
                name: '北疆自然风光线',
                itinerary: '乌鲁木齐 → 布尔津 → 喀纳斯 → 禾木 → 克拉玛依',
                reason: '典型“北疆摄影线”：喀纳斯湖的层次色、禾木晨雾与木屋村落、布尔津河谷与克拉玛依的地貌反差，一路都是高质量风景位，适合喜欢湖泊森林与村落氛围的人'
            },
            'culture': {
                name: '多元文化体验线',
                itinerary: '乌鲁木齐 → 喀什古城 → 和田 → 库车龟兹故城',
                reason: '文化颗粒度更细：喀什的古城生活、和田的玉与手作、库车的龟兹遗迹，把“丝路文明”“绿洲城市”“民族工艺”拆开逐一体验，适合喜欢历史细节和慢逛的人'
            },
            'adventure': {
                name: '沙漠戈壁探险线',
                itinerary: '乌鲁木齐 → 鄯善库木塔格沙漠 → 罗布泊边缘 → 库尔勒',
                reason: '更硬核的荒野质感：从沙丘到戈壁，再到罗布泊边缘的空旷与风蚀地貌，适合喜欢公路旅行、地貌奇观与“无人区氛围”的玩家'
            }
        },
        '7': {
            'silk-road': {
                name: '丝绸之路完整线',
                itinerary: '乌鲁木齐 → 吐鲁番 → 库尔勒 → 库车 → 喀什 → 和田 → 民丰',
                reason: '丝路纵深延展到南疆：吐鲁番与库车的古城遗迹、喀什的老城与市集，再一路到和田与民丰的绿洲节点，历史脉络更连续，体验也更“走进西域”'
            },
            'border': {
                name: '新疆边境环线',
                itinerary: '伊宁 → 霍尔果斯 → 赛里木湖 → 塔城 → 小白杨哨所 → 布尔津 → 哈巴河',
                reason: '把北疆边境与阿勒泰风光打包：口岸/哨所的边境故事 + 阿勒泰河谷与森林湖泊的自然景致，行程更舒展，适合既想看“边境线”又想看“阿勒泰”的组合需求'
            },
            'nature': {
                name: '新疆自然风光大环线',
                itinerary: '乌鲁木齐 → 布尔津 → 喀纳斯 → 禾木 → 克拉玛依 → 赛里木湖 → 那拉提草原',
                reason: '一趟打卡湖、林、草原三件套：喀纳斯/禾木的森林村落、赛里木湖的蓝调湖景、那拉提的草原辽阔，再配上克拉玛依地貌反差，风景类型丰富不重复'
            },
            'culture': {
                name: '新疆文化深度游',
                itinerary: '乌鲁木齐 → 喀什古城 → 和田 → 库车龟兹故城 → 吐鲁番交河故城 → 伊宁',
                reason: '更像“丝路文明课”：南疆的人文生活与手工艺、库车龟兹遗存的历史纵深、吐鲁番交河/高昌的古城遗址，再到伊宁的多元城市气质，适合对历史与民族文化有兴趣的深度玩家'
            },
            'adventure': {
                name: '新疆探险挑战线',
                itinerary: '乌鲁木齐 → 鄯善库木塔格沙漠 → 罗布泊边缘 → 阿尔金山 → 和田',
                reason: '“地貌盲盒”式挑战：沙漠、戈壁到阿尔金山的高海拔荒原连续切换，路况与风景都更野，适合体能与耐力更强、喜欢硬核风光的人'
            }
        },
        '10': {
            'silk-road': {
                name: '丝绸之路极致线',
                itinerary: '乌鲁木齐 → 吐鲁番 → 库尔勒 → 库车 → 喀什 → 和田 → 民丰 → 且末 → 若羌 → 尉犁',
                reason: '长线的魅力在于“串珠成链”：绿洲城市、沙漠边缘与古道节点次第展开，能把丝路从北到南的地理逻辑走完整；适合喜欢公路长线、愿意用时间换故事的旅行者'
            },
            'border': {
                name: '新疆边境大环线',
                itinerary: '伊宁 → 霍尔果斯 → 赛里木湖 → 塔城 → 小白杨哨所 → 布尔津 → 哈巴河 → 吉木乃 → 阿拉山口',
                reason: '口岸密度更高、视野更开阔：从伊犁到阿勒泰再到阿拉山口，多口岸串联带来不同的边贸氛围与国门景观，是“边境国门主题”的深度版本'
            },
            'nature': {
                name: '新疆全景自然风光线',
                itinerary: '乌鲁木齐 → 布尔津 → 喀纳斯 → 禾木 → 克拉玛依 → 赛里木湖 → 那拉提草原 → 巴音布鲁克 → 库车天山神秘大峡谷',
                reason: '自然全景合集：湖泊森林（喀纳斯/禾木）、草原河谷（那拉提/巴音布鲁克）、峡谷地貌（天山神秘大峡谷）层层递进，适合追求“景观类型一次集齐”的旅行者'
            },
            'culture': {
                name: '新疆文化全景游',
                itinerary: '乌鲁木齐 → 喀什古城 → 和田 → 库车龟兹故城 → 吐鲁番交河故城 → 伊宁 → 特克斯八卦城 → 塔城',
                reason: '文化版“全家桶”：南疆古城与市集、龟兹/吐鲁番遗址的丝路历史、伊宁与塔城的多元城市风貌、特克斯八卦城的独特格局，适合想把文化点位一次看全的人'
            },
            'adventure': {
                name: '新疆终极探险线',
                itinerary: '乌鲁木齐 → 鄯善库木塔格沙漠 → 罗布泊边缘 → 阿尔金山 → 和田 → 帕米尔高原 → 红其拉甫',
                reason: '“极致版”把强烈的地貌与国门体验放在一起：沙漠与戈壁的苍茫、阿尔金山的荒原感、帕米尔高原的海拔与雪峰、红其拉甫的国门仪式感；适合追求震撼风景与挑战性的长线玩家'
            }
        }
    };
    
    // 根据季节调整推荐
    const seasonAdjustments = {
        'spring': '春季适合欣赏新疆的山花烂漫，特别是伊犁的杏花和塔城的巴旦杏花',
        'summer': '夏季是新疆的旅游旺季，适合前往高山草原和湖泊，避暑纳凉',
        'autumn': '秋季是新疆的黄金季节，适合欣赏胡杨林和喀纳斯的秋色',
        'winter': '冬季适合体验新疆的冰雪风情，特别是滑雪场和温泉'
    };
    
    const route = routes[days][type];
    return {
        name: route.name,
        itinerary: route.itinerary,
        reason: route.reason + '。' + seasonAdjustments[season]
    };
}

// 打开地图导航（实际项目中可以集成高德地图API）
function openMapDirection(start, destination, waypoints) {
    // 模拟打开地图
    alert(`正在打开高德地图导航：${start} → ${waypoints ? waypoints.replace(',', ' → ') + ' → ' : ''}${destination}`);
    // 实际项目中可以使用高德地图API
    // window.open(`https://uri.amap.com/navigation?from=${start}&to=${destination}&waypoints=${waypoints}&mode=car`);
}

// 初始化路线流程图轮播
function initRouteCarousel() {
    const carousel = document.getElementById('routes-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.route-flowchart');
    const prevBtn = document.getElementById('route-prev');
    const nextBtn = document.getElementById('route-next');
    const indicators = document.querySelectorAll('#route-indicators .indicator');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoScrollId = null;
    let isUserInteracting = false;
    
    // 智能自动滚动时间轴
    function startTimelineAutoScroll(container) {
        if (autoScrollId) cancelAnimationFrame(autoScrollId);
        
        let scrollSpeed = 0.8; // 稍微加快一点速度
        
        function scroll() {
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (maxScroll <= 0) return;

            container.scrollLeft += scrollSpeed;
            
            // 到达终点后，瞬间回到起点重新开始下一遍
            if (container.scrollLeft >= maxScroll - 1) {
                container.scrollLeft = 0;
            }
            
            autoScrollId = requestAnimationFrame(scroll);
        }
        
        autoScrollId = requestAnimationFrame(scroll);
    }
    
    // 更新轮播状态
    function updateCarousel() {
        if (autoScrollId) cancelAnimationFrame(autoScrollId);

        // 更新幻灯片活动状态 (淡入淡出效果)
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
                // 切换后，立即启动该路线的时间轴滚动
                const container = slide.querySelector('.flowchart-container');
                if (container) {
                    container.scrollLeft = 0;
                    // 几乎无延迟启动
                    requestAnimationFrame(() => startTimelineAutoScroll(container));
                }
            } else {
                slide.classList.remove('active');
            }
        });

        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 切换到下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    // 切换到上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // 绑定按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    // 绑定指示器事件
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // 触摸事件支持 (滑动切换)
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50; // 滑动阈值
        if (touchStartX - touchEndX > threshold) {
            // 向左滑动，显示下一张
            nextSlide();
        } else if (touchEndX - touchStartX > threshold) {
            // 向右滑动，显示上一张
            prevSlide();
        }
    }

    // 初始化显示第一张
    updateCarousel();
}

// 初始化用户故事交互功能
function initUserStories() {
    const filterButtons = document.querySelectorAll('.story-filter button');
    const sortSelect = document.getElementById('sort-option');
    const storyItems = document.querySelectorAll('.story-item');
    const readMoreButtons = document.querySelectorAll('.read-more button');
    
    // 筛选功能
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 移除所有按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // 添加当前按钮的active类
                button.classList.add('active');
                
                const tag = button.getAttribute('data-tag');
                
                // 筛选故事
                storyItems.forEach(item => {
                    if (tag === 'all' || item.getAttribute('data-tags').includes(tag)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 排序功能
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            const storiesContainer = document.querySelector('.stories-grid');
            
            if (!storiesContainer) return;
            
            // 将故事项转换为数组
            const storyArray = Array.from(storyItems);
            
            // 根据排序值排序
            if (sortValue === 'latest') {
                // 最新排序（假设最后添加的故事是最新的）
                storyArray.reverse();
            } else if (sortValue === 'popular') {
                // 最受欢迎排序（随机排序模拟）
                storyArray.sort(() => Math.random() - 0.5);
            }
            
            // 清空容器并重新添加排序后的故事
            storiesContainer.innerHTML = '';
            storyArray.forEach(item => {
                storiesContainer.appendChild(item);
            });
        });
    }
    
    // 阅读更多/收起功能
    if (readMoreButtons.length) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const storyContent = button.closest('.story-content');
                const isExpanded = storyContent.classList.contains('expanded');
                
                if (isExpanded) {
                    storyContent.classList.remove('expanded');
                    button.textContent = '阅读更多';
                } else {
                    storyContent.classList.add('expanded');
                    button.textContent = '收起';
                }
            });
        });
    }
    
    // 添加故事卡片悬停效果
    storyItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 初始化季节选择功能
function initSeasonCarousel() {
    console.log('开始初始化季节选择...');
    
    const seasonCards = document.querySelectorAll('.season-card');
    const detailImage = document.getElementById('detail-image');
    const detailAttractions = document.getElementById('detail-attractions');
    const detailTips = document.getElementById('detail-tips');
    
    if (!seasonCards.length) {
        console.log('未找到季节卡片');
        return;
    }
    
    // 季节数据
    const seasonData = {
        spring: {
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20spring%20apricot%20blossoms%20Yili%20Valley&image_size=landscape_16_9',
            attractions: ['伊犁杏花沟', '吐尔根乡', '新源野果林'],
            tips: '春季的新疆，平均气温在10-20℃，建议携带轻薄外套，注意防晒。杏花花期一般在4月中上旬，最佳观赏时间是清晨和傍晚。'
        },
        summer: {
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20summer%20grassland%20Nalati%20sheep%20herds&image_size=landscape_16_9',
            attractions: ['那拉提草原', '巴音布鲁克', '赛里木湖', '喀拉峻草原', '昭苏'],
            tips: '夏季的新疆，平均气温在20-25℃，是避暑的绝佳选择。草原碧绿，湖水湛蓝，适合各种户外活动。建议携带防晒用品和轻便外套。'
        },
        autumn: {
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20autumn%20Kanas%20Lake%20colorful%20trees&image_size=landscape_16_9',
            attractions: ['喀纳斯湖', '禾木村', '白哈巴', '可可托海', '塔里木胡杨林'],
            tips: '秋季的新疆，层林尽染，平均气温在10-18℃。喀纳斯的白桦林变成了金黄色的海洋，塔里木河的胡杨林也迎来最美季节。建议携带保暖衣物。'
        },
        winter: {
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xinjiang%20winter%20snow%20covered%20mountains&image_size=landscape_16_9',
            attractions: ['天山天池', '喀纳斯', '乌鲁木齐滑雪场', '阿勒泰', '伊宁'],
            tips: '冬季的新疆，银装素裹，平均气温在-10℃到5℃。各大滑雪场设施完善，雪质优良。建议穿着厚重保暖衣物，注意防滑。'
        }
    };
    
    let currentIndex = 0;
    let autoSlideId = null;
    
    // 更新详情显示
    function updateDetail(season) {
        const data = seasonData[season];
        if (!data) return;
        
        // 更新图片
        detailImage.src = data.image;
        
        // 更新景点
        detailAttractions.innerHTML = data.attractions.map(a => `<li>${a}</li>`).join('');
        
        // 更新贴士
        detailTips.textContent = data.tips;
    }
    
    // 切换季节
    function switchSeason(index, season) {
        // 更新卡片状态
        seasonCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        // 更新详情
        updateDetail(season);
        
        // 联动右侧旅行者故事
        const seasonTags = ['春季', '夏季', '秋季', '冬季'];
        const currentSeasonTag = seasonTags[index];
        
        const filterButtons = document.querySelectorAll('.story-filter button');
        filterButtons.forEach(button => {
            if (button.getAttribute('data-tag') === currentSeasonTag) {
                button.click();
            }
        });
        
        currentIndex = index;
    }
    
    // 绑定卡片点击事件
    seasonCards.forEach((card) => {
        card.addEventListener('click', () => {
            const index = parseInt(card.getAttribute('data-index'));
            const season = card.getAttribute('data-season');
            switchSeason(index, season);
            
            // 点击时重置自动轮播
            if (autoSlideId) {
                clearInterval(autoSlideId);
                startAutoSlide();
            }
        });
    });
    
    // 自动切换
    function nextSeason() {
        const nextIndex = (currentIndex + 1) % seasonCards.length;
        const nextCard = seasonCards[nextIndex];
        const season = nextCard.getAttribute('data-season');
        switchSeason(nextIndex, season);
    }
    
    // 启动自动轮播
    function startAutoSlide() {
        console.log('启动季节自动轮播');
        if (autoSlideId) {
            clearInterval(autoSlideId);
        }
        autoSlideId = setInterval(nextSeason, 5000);
    }
    
    // 鼠标悬停时暂停
    const seasonCircle = document.querySelector('.season-circle');
    if (seasonCircle) {
        seasonCircle.addEventListener('mouseenter', () => {
            if (autoSlideId) {
                clearInterval(autoSlideId);
                autoSlideId = null;
            }
        });
        
        seasonCircle.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    } else {
        console.log('未找到season-circle元素，跳过鼠标悬停事件绑定');
    }
    
    // 初始化显示春季
    switchSeason(0, 'spring');
    
    // 延迟启动自动轮播
    setTimeout(() => {
        startAutoSlide();
    }, 1000);
    
    console.log('季节选择初始化完成！');
}

// 初始化装备轮播功能
function initGearCarousel() {
    const carousel = document.querySelector('.gear-carousel');
    if (!carousel) return;
    
    const container = carousel.querySelector('.carousel-container');
    const items = carousel.querySelectorAll('.gear-item');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    if (!container || !items.length) return;
    
    let currentIndex = 0;
    const itemCount = items.length;
    
    // 更新轮播状态
    function updateCarousel() {
        // 移动容器
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 切换到下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }
    
    // 切换到上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // 绑定按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // 绑定指示器事件
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            goToSlide(index);
        });
    });
    
    // 自动轮播
    let autoSlideId = setInterval(nextSlide, 5000);
    
    // 鼠标悬停时暂停自动轮播
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideId);
    });
    
    // 鼠标离开时恢复自动轮播
    carousel.addEventListener('mouseleave', () => {
        autoSlideId = setInterval(nextSlide, 5000);
    });
    
    // 初始化显示第一张
    updateCarousel();
}

// 初始化用户故事上传功能
function initStoryUpload() {
    const uploadForm = document.getElementById('story-upload-form');
    const successMessage = document.getElementById('upload-success');
    
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('author-name').value;
            const role = document.getElementById('author-role').value;
            const title = document.getElementById('story-title').value;
            const content = document.getElementById('story-content').value;
            const tags = document.getElementById('story-tags').value;
            const avatar = document.getElementById('story-avatar').value;
            
            // 简单验证
            if (!name || !role || !title || !content) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 模拟表单提交
            console.log('提交游记:', { name, role, title, content, tags, avatar });
            
            // 显示成功消息
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // 3秒后隐藏成功消息
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }
            
            // 重置表单
            uploadForm.reset();
        });
    }
}

// 初始化非遗项目轮播功能
function initHeritageCarousel() {
    const carousel = document.querySelector('.heritage-carousel .carousel-container');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const indicators = carousel.querySelectorAll('.indicator');
    
    if (!slides.length) return;
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // 更新轮播状态
    function updateCarousel() {
        // 移除所有幻灯片的active类
        slides.forEach(slide => slide.classList.remove('active'));
        // 添加当前幻灯片的active类
        slides[currentIndex].classList.add('active');
        
        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // 联动canvas图表
        updateHeritageChart(currentIndex);
    }
    
    // 切换到下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    // 切换到上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // 绑定按钮事件
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // 绑定指示器事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // 初始化显示第一张
    updateCarousel();
}

// 更新非遗项目图表
function updateHeritageChart(index) {
    const heritageCtx = document.getElementById('heritageBarChart');
    if (!heritageCtx) return;
    
    // 非遗项目分类数据
    const heritageData = [
        {
            title: '麦西热甫',
            data: [0, 58, 0, 0, 0, 0, 0],
            label: '传统舞蹈'
        },
        {
            title: '艾德莱斯绸制作技艺',
            data: [0, 0, 0, 0, 58, 0, 0],
            label: '传统技艺'
        },
        {
            title: '维吾尔族木卡姆',
            data: [45, 0, 0, 0, 0, 0, 0],
            label: '传统音乐'
        },
        {
            title: '维吾尔族花帽制作技艺',
            data: [0, 0, 0, 32, 0, 0, 0],
            label: '传统美术'
        },
        {
            title: '维吾尔族地毯织造技艺',
            data: [0, 0, 0, 0, 58, 0, 0],
            label: '传统技艺'
        }
    ];
    
    // 获取当前非遗项目的数据
    const currentData = heritageData[index];
    
    // 销毁旧图表
    if (window.heritageChart) {
        window.heritageChart.destroy();
    }
    
    // 创建新图表
    window.heritageChart = new Chart(heritageCtx, {
        type: 'bar',
        data: {
            labels: ['传统音乐', '传统舞蹈', '传统戏剧', '传统美术', '传统技艺', '传统医药', '民俗'],
            datasets: [{
                label: currentData.label,
                data: currentData.data,
                backgroundColor: 'rgba(139, 69, 19, 0.8)',
                borderColor: 'rgba(139, 69, 19, 1)',
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}项`;
                        }
                    }
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    },
                    title: {
                        display: true,
                        text: '项目数量'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '非遗分类'
                    }
                }
            },
            onHover: function(event, chartElements) {
                if (chartElements.length > 0) {
                    const index = chartElements[0].index;
                    const category = this.data.labels[index];
                    
                    // 根据分类找到对应的轮播项
                    const categoryToIndex = {
                        '传统音乐': 2, // 维吾尔族木卡姆
                        '传统舞蹈': 0, // 麦西热甫
                        '传统美术': 3, // 维吾尔族花帽制作技艺
                        '传统技艺': 1  // 艾德莱斯绸制作技艺（默认）
                    };
                    
                    if (categoryToIndex[category] !== undefined) {
                        const targetIndex = categoryToIndex[category];
                        // 滚动到对应的轮播项
                        const slides = document.querySelectorAll('.carousel-slide');
                        const indicators = document.querySelectorAll('.indicator');
                        
                        // 移除所有幻灯片的active类
                        slides.forEach(slide => slide.classList.remove('active'));
                        // 添加目标幻灯片的active类
                        slides[targetIndex].classList.add('active');
                        
                        // 更新指示器状态
                        indicators.forEach((indicator, i) => {
                            indicator.classList.toggle('active', i === targetIndex);
                        });
                    }
                }
            }
        }
    });
}

// ==================== 建筑页面图表初始化 ====================
function initArchitectureCharts() {
    // ========== 序章图表：类型、年代、地区、保护级别 ==========
    // 图表：建筑类型占比（饼图）
    const typePieCtx = document.getElementById('typePieChart');
    if (typePieCtx) {
        new Chart(typePieCtx, {
            type: 'doughnut',
            data: {
                labels: ['城址建筑', '民居建筑', '军事建筑', '官式建筑'],
                datasets: [{
                    data: [28, 35, 12, 25],
                    backgroundColor: ['rgba(139, 69, 19, 0.8)', 'rgba(218, 165, 32, 0.8)', 'rgba(160, 82, 45, 0.8)', 'rgba(205, 133, 63, 0.8)'],
                    borderColor: 'rgba(255,255,255,0.5)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // 图表：各历史时期建筑遗产数量
    const eraBarCtx = document.getElementById('eraBarChart');
    if (eraBarCtx) {
        new Chart(eraBarCtx, {
            type: 'bar',
            data: {
                labels: ['汉代', '魏晋', '南北朝', '隋唐', '宋元', '明清', '近现代'],
                datasets: [{
                    label: '建筑遗产数量（处）',
                    data: [8, 12, 15, 35, 20, 45, 18],
                    backgroundColor: 'rgba(139, 69, 19, 0.7)',
                    borderColor: 'rgba(139, 69, 19, 1)',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: '数量（处）' } },
                    x: { title: { display: true, text: '历史时期' } }
                }
            }
        });
    }

    // 图表：各地州建筑遗产分布
    const regionBarCtx = document.getElementById('regionBarChart');
    if (regionBarCtx) {
        new Chart(regionBarCtx, {
            type: 'bar',
            data: {
                labels: ['喀什', '吐鲁番', '阿克苏', '伊犁', '和田', '巴州', '昌吉', '哈密'],
                datasets: [{
                    label: '遗产数量（处）',
                    data: [28, 22, 18, 15, 12, 10, 8, 6],
                    backgroundColor: 'rgba(218, 165, 32, 0.7)',
                    borderColor: 'rgba(218, 165, 32, 1)',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: { legend: { display: true } },
                scales: {
                    x: { beginAtZero: true, title: { display: true, text: '数量（处）' } }
                }
            }
        });
    }

    // 图表：保护级别分布
    const protectionCtx = document.getElementById('protectionChart');
    if (protectionCtx) {
        new Chart(protectionCtx, {
            type: 'polarArea',
            data: {
                labels: ['世界遗产', '全国重点文保', '省级文保', '市县级文保', '未定级'],
                datasets: [{
                    data: [6, 113, 250, 380, 150],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(139, 69, 19, 0.7)',
                        'rgba(218, 165, 32, 0.7)',
                        'rgba(205, 133, 63, 0.7)',
                        'rgba(160, 160, 160, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });
    }

    // ========== 第一章图表：传播路径 ==========
    // 图表：各时期中原技术影响范围
    const influenceCtx = document.getElementById('influenceTimelineChart');
    if (influenceCtx) {
        new Chart(influenceCtx, {
            type: 'line',
            data: {
                labels: ['前汉', '后汉', '魏晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
                datasets: [{
                    label: '中原技术影响指数',
                    data: [30, 45, 50, 55, 60, 90, 70, 65, 60, 95],
                    borderColor: 'rgba(139, 69, 19, 1)',
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: '本地技术保留指数',
                    data: [80, 75, 70, 68, 65, 55, 60, 65, 70, 50],
                    borderColor: 'rgba(218, 165, 32, 1)',
                    backgroundColor: 'rgba(218, 165, 32, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top' } },
                scales: {
                    y: { beginAtZero: true, max: 100, title: { display: true, text: '影响指数' } },
                    x: { title: { display: true, text: '历史时期' } }
                }
            }
        });
    }

    // 图表：中原技术要素占比
    const techElementCtx = document.getElementById('techElementChart');
    if (techElementCtx) {
        new Chart(techElementCtx, {
            type: 'doughnut',
            data: {
                labels: ['抬梁式木构架', '城坊规划', '斗拱工艺', '官式屋面', '彩画装饰', '砖石砌筑'],
                datasets: [{
                    data: [25, 20, 15, 15, 15, 10],
                    backgroundColor: [
                        'rgba(139, 69, 19, 0.8)',
                        'rgba(218, 165, 32, 0.8)',
                        'rgba(160, 82, 45, 0.8)',
                        'rgba(205, 133, 63, 0.8)',
                        'rgba(184, 134, 11, 0.8)',
                        'rgba(222, 184, 135, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });
    }

    // ========== 第二章图表：结构技术 ==========
    // 图表：结构技术来源占比
    const structureSourceCtx = document.getElementById('structureSourceChart');
    if (structureSourceCtx) {
        new Chart(structureSourceCtx, {
            type: 'pie',
            data: {
                labels: ['中原木作技术', '本地生土技术', '中原官式做法', '本地砖雕工艺'],
                datasets: [{
                    data: [35, 30, 20, 15],
                    backgroundColor: [
                        'rgba(139, 69, 19, 0.8)',
                        'rgba(218, 165, 32, 0.8)',
                        'rgba(160, 82, 45, 0.8)',
                        'rgba(205, 133, 63, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } }
            }
        });
    }

    // 图表：各类结构抗震性能对比
    const seismicCtx = document.getElementById('seismicChart');
    if (seismicCtx) {
        new Chart(seismicCtx, {
            type: 'radar',
            data: {
                labels: ['抗震性能', '热工性能', '耐久性', '施工便捷', '材料成本', '环保性'],
                datasets: [{
                    label: '生土墙',
                    data: [6, 9, 5, 8, 9, 10],
                    borderColor: 'rgba(139, 69, 19, 1)',
                    backgroundColor: 'rgba(139, 69, 19, 0.2)'
                }, {
                    label: '抬梁式木构',
                    data: [8, 7, 8, 6, 5, 9],
                    borderColor: 'rgba(218, 165, 32, 1)',
                    backgroundColor: 'rgba(218, 165, 32, 0.2)'
                }, {
                    label: '斗拱榫卯',
                    data: [9, 6, 9, 4, 4, 9],
                    borderColor: 'rgba(160, 82, 45, 1)',
                    backgroundColor: 'rgba(160, 82, 45, 0.2)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { r: { beginAtZero: true, max: 10 } }
            }
        });
    }

    // ========== 第三章图表：装饰纹样 ==========
    // 图表：纹样类型分布（按部位）- 平滑面积图
    const patternLocationCtx = document.getElementById('patternLocationChart');
    if (patternLocationCtx) {
        new Chart(patternLocationCtx, {
            type: 'line',
            data: {
                labels: ['门窗', '梁枋', '柱身', '墙面', '天花', '屋顶'],
                datasets: [{
                    label: '中原纹样',
                    data: [15, 20, 10, 8, 12, 5],
                    backgroundColor: 'rgba(178, 34, 52, 0.15)',
                    borderColor: 'rgba(178, 34, 52, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: 'rgba(178, 34, 52, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }, {
                    label: '民族纹样',
                    data: [25, 15, 20, 22, 18, 10],
                    backgroundColor: 'rgba(85, 107, 47, 0.15)',
                    borderColor: 'rgba(85, 107, 47, 1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: 'rgba(85, 107, 47, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 13 }, usePointStyle: true } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '纹样出现频次', font: { size: 13 } },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    x: {
                        title: { display: true, text: '建筑部位', font: { size: 13 } },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // 图表：各地区纹样文化来源比例 - 堆叠柱状图
    const patternRegionCtx = document.getElementById('patternRegionChart');
    if (patternRegionCtx) {
        new Chart(patternRegionCtx, {
            type: 'bar',
            data: {
                labels: ['喀什', '和田', '吐鲁番', '伊犁', '库车', '哈密'],
                datasets: [{
                    label: '中原纹样占比 (%)',
                    data: [20, 15, 45, 60, 35, 50],
                    backgroundColor: 'rgba(178, 34, 52, 0.8)',
                    borderColor: 'rgba(178, 34, 52, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }, {
                    label: '民族纹样占比 (%)',
                    data: [80, 85, 55, 40, 65, 50],
                    backgroundColor: 'rgba(85, 107, 47, 0.8)',
                    borderColor: 'rgba(85, 107, 47, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 13 }, usePointStyle: true } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        stacked: true,
                        title: { display: true, text: '占比 (%)', font: { size: 13 } },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    x: {
                        stacked: true,
                        title: { display: true, text: '地区', font: { size: 13 } },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // 图表：纹样文化融合指数 - 雷达图
    const patternFusionCtx = document.getElementById('patternFusionChart');
    if (patternFusionCtx) {
        new Chart(patternFusionCtx, {
            type: 'radar',
            data: {
                labels: ['龙凤纹', '花卉纹', '云纹', '回纹', '博古纹', '星纹', '格栅纹', '蔓草纹', '石榴纹', '巴旦木纹'],
                datasets: [{
                    label: '中原纹样应用度',
                    data: [85, 90, 75, 80, 70, 30, 20, 40, 35, 25],
                    backgroundColor: 'rgba(178, 34, 52, 0.2)',
                    borderColor: 'rgba(178, 34, 52, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(178, 34, 52, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }, {
                    label: '民族纹样应用度',
                    data: [25, 30, 35, 20, 15, 90, 85, 80, 75, 88],
                    backgroundColor: 'rgba(85, 107, 47, 0.2)',
                    borderColor: 'rgba(85, 107, 47, 1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(85, 107, 47, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 13 }, usePointStyle: true } }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20, font: { size: 11 } },
                        pointLabels: { font: { size: 12 } },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    }
                }
            }
        });
    }

    // ========== 第四章图表：气候适应 ==========
    // 图表1：厚生土墙隔热效果（墙厚 vs 室内外温差）
    const wallCtx = document.getElementById('wallThicknessChart');
    if (wallCtx) {
        new Chart(wallCtx, {
            type: 'bar',
            data: {
                labels: ['20cm', '40cm', '60cm', '80cm', '100cm'],
                datasets: [{
                    label: '昼夜室内外温差 (℃)',
                    data: [3, 6, 9, 11, 12],
                    backgroundColor: 'rgba(139, 69, 19, 0.7)',
                    borderColor: 'rgba(139, 69, 19, 1)',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '温差降幅: ' + context.parsed.y + '℃';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '温差 (℃)' }
                    },
                    x: {
                        title: { display: true, text: '墙体厚度' }
                    }
                }
            }
        });
    }

    // 图表2：庭院遮阳效果（不同时段日照强度对比）
    const shadeCtx = document.getElementById('courtyardShadeChart');
    if (shadeCtx) {
        new Chart(shadeCtx, {
            type: 'line',
            data: {
                labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
                datasets: [{
                    label: '无遮阳日照强度 (W/m²)',
                    data: [200, 500, 950, 800, 400, 100],
                    borderColor: 'rgba(218, 165, 32, 1)',
                    backgroundColor: 'rgba(218, 165, 32, 0.2)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: '有遮阳日照强度 (W/m²)',
                    data: [80, 150, 285, 240, 120, 40],
                    borderColor: 'rgba(139, 69, 19, 1)',
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '日照强度 (W/m²)' }
                    },
                    x: {
                        title: { display: true, text: '时间' }
                    }
                }
            }
        });
    }

    // 图表3：建筑适应策略综合效能雷达图
    const radarCtx = document.getElementById('strategyRadarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['隔热保温', '防风沙', '遮阳降温', '通风换气', '抗震稳固', '采光调节'],
                datasets: [{
                    label: '厚生土墙',
                    data: [9, 8, 5, 4, 7, 3],
                    borderColor: 'rgba(139, 69, 19, 1)',
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    pointBackgroundColor: 'rgba(139, 69, 19, 1)'
                }, {
                    label: '庭院遮阳',
                    data: [5, 4, 9, 8, 3, 8],
                    borderColor: 'rgba(218, 165, 32, 1)',
                    backgroundColor: 'rgba(218, 165, 32, 0.2)',
                    pointBackgroundColor: 'rgba(218, 165, 32, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: { stepSize: 2 }
                    }
                }
            }
        });
    }

    // 图表4：全年室内温度调节效果
    const tempCtx = document.getElementById('tempRegulationChart');
    if (tempCtx) {
        new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [{
                    label: '室外温度 (℃)',
                    data: [-10, -6, 3, 12, 18, 24, 28, 27, 20, 10, 2, -8],
                    borderColor: 'rgba(218, 165, 32, 1)',
                    backgroundColor: 'rgba(218, 165, 32, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4
                }, {
                    label: '室内温度 (℃)',
                    data: [8, 9, 12, 16, 20, 23, 25, 25, 22, 18, 13, 9],
                    borderColor: 'rgba(139, 69, 19, 1)',
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    y: {
                        title: { display: true, text: '温度 (℃)' }
                    },
                    x: {
                        title: { display: true, text: '月份' }
                    }
                }
            }
        });
    }

    // 图表5：建筑材料热工性能对比
    const materialThermalCtx = document.getElementById('materialThermalChart');
    if (materialThermalCtx) {
        new Chart(materialThermalCtx, {
            type: 'bar',
            data: {
                labels: ['生土墙', '土坯砖', '青砖', '胡杨木', '芦苇', '石材'],
                datasets: [{
                    label: '导热系数 W/(m·K)',
                    data: [0.58, 0.70, 0.81, 0.12, 0.06, 2.50],
                    backgroundColor: 'rgba(139, 69, 19, 0.7)',
                    borderColor: 'rgba(139, 69, 19, 1)',
                    borderWidth: 2,
                    borderRadius: 5
                }, {
                    label: '蓄热系数 W/(m²·K)',
                    data: [8.0, 9.5, 10.5, 3.5, 1.8, 18.0],
                    backgroundColor: 'rgba(218, 165, 32, 0.7)',
                    borderColor: 'rgba(218, 165, 32, 1)',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top' } },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: '热工参数值' } },
                    x: { title: { display: true, text: '建筑材料' } }
                }
            }
        });
    }

    // 图表6：新疆主要城市气候参数对比
    const cityClimateCtx = document.getElementById('cityClimateChart');
    if (cityClimateCtx) {
        new Chart(cityClimateCtx, {
            type: 'radar',
            data: {
                labels: ['夏季最高温(℃)', '冬季最低温(℃)', '年日照时数(h)', '年降水量(mm)', '年均风速(m/s)', '温差(℃)'],
                datasets: [{
                    label: '吐鲁番',
                    data: [40, -10, 3200, 16, 1.5, 50],
                    borderColor: 'rgba(218, 165, 32, 1)',
                    backgroundColor: 'rgba(218, 165, 32, 0.2)',
                    pointBackgroundColor: 'rgba(218, 165, 32, 1)'
                }, {
                    label: '喀什',
                    data: [33, -8, 2800, 60, 2.0, 41],
                    borderColor: 'rgba(139, 69, 19, 1)',
                    backgroundColor: 'rgba(139, 69, 19, 0.2)',
                    pointBackgroundColor: 'rgba(139, 69, 19, 1)'
                }, {
                    label: '和田',
                    data: [35, -6, 2700, 35, 2.5, 41],
                    borderColor: 'rgba(160, 82, 45, 1)',
                    backgroundColor: 'rgba(160, 82, 45, 0.2)',
                    pointBackgroundColor: 'rgba(160, 82, 45, 1)'
                }, {
                    label: '伊宁',
                    data: [30, -20, 2800, 250, 2.8, 50],
                    borderColor: 'rgba(205, 133, 63, 1)',
                    backgroundColor: 'rgba(205, 133, 63, 0.2)',
                    pointBackgroundColor: 'rgba(205, 133, 63, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top' } },
                scales: { r: { beginAtZero: true } }
            }
        });
    }

    // ========== 第六章图表：中华民族共同体建筑文化传承 ==========
    // 图表：各时期中原建筑文化影响维度（与介绍卡片联动）
    const heritageTimelineCtx = document.getElementById('heritageTimelineChart');
    if (heritageTimelineCtx) {
        // 维度索引到卡片索引的映射
        const dimensionToCard = [0, 1, 2, 3, 0, 2];
        const heritageCards = document.querySelectorAll('.arch-heritage-card');
        const heritageIndicators = document.querySelectorAll('.arch-heritage-indicators span');
        let currentHeritageCard = 0;
        let heritageAutoTimer = null;
        let isHovering = false;

        function showHeritageCard(index) {
            heritageCards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            heritageIndicators.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentHeritageCard = index;
        }

        function startHeritageAuto() {
            stopHeritageAuto();
            heritageAutoTimer = setInterval(() => {
                if (!isHovering) {
                    showHeritageCard((currentHeritageCard + 1) % heritageCards.length);
                }
            }, 3500);
        }

        function stopHeritageAuto() {
            if (heritageAutoTimer) {
                clearInterval(heritageAutoTimer);
                heritageAutoTimer = null;
            }
        }

        const heritageChart = new Chart(heritageTimelineCtx, {
            type: 'radar',
            data: {
                labels: ['城坊规划', '木作工艺', '装饰纹样', '官式做法', '筑城规制', '彩画艺术'],
                datasets: [{
                    label: '汉代',
                    data: [70, 50, 40, 60, 75, 45],
                    borderColor: 'rgba(178, 34, 52, 1)',
                    backgroundColor: 'rgba(178, 34, 52, 0.2)',
                    pointBackgroundColor: 'rgba(178, 34, 52, 1)',
                    pointRadius: 8,
                    pointHoverRadius: 12
                }, {
                    label: '唐代',
                    data: [90, 75, 65, 85, 90, 70],
                    borderColor: 'rgba(218, 165, 32, 1)',
                    backgroundColor: 'rgba(218, 165, 32, 0.2)',
                    pointBackgroundColor: 'rgba(218, 165, 32, 1)',
                    pointRadius: 8,
                    pointHoverRadius: 12
                }, {
                    label: '清代',
                    data: [85, 90, 85, 95, 80, 90],
                    borderColor: 'rgba(85, 107, 47, 1)',
                    backgroundColor: 'rgba(85, 107, 47, 0.2)',
                    pointBackgroundColor: 'rgba(85, 107, 47, 1)',
                    pointRadius: 8,
                    pointHoverRadius: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 13 }, usePointStyle: true } },
                    tooltip: {
                        callbacks: {
                            afterTitle: function(context) {
                                const dimIndex = context[0].dataIndex;
                                const cardIndex = dimensionToCard[dimIndex];
                                const cardTitles = ['城坊制度西传', '木作工艺交融', '装饰纹样融合', '营造智慧共生'];
                                return '对应：' + cardTitles[cardIndex];
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20, font: { size: 11 } },
                        pointLabels: { font: { size: 12 } },
                        grid: { color: 'rgba(0, 0, 0, 0.1)' }
                    }
                },
                onHover: (event, elements) => {
                    if (elements.length > 0) {
                        const dimIndex = elements[0].index;
                        const cardIndex = dimensionToCard[dimIndex];
                        if (cardIndex !== currentHeritageCard) {
                            showHeritageCard(cardIndex);
                        }
                    }
                }
            }
        });

        // 鼠标进入图表区域暂停自动轮播
        heritageTimelineCtx.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        heritageTimelineCtx.addEventListener('mouseleave', () => {
            isHovering = false;
            startHeritageAuto();
        });

        // 圆点导航点击
        heritageIndicators.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showHeritageCard(index);
                startHeritageAuto();
            });
        });

        // 启动自动轮播
        startHeritageAuto();
    }

    // 图表：建筑文化融合要素构成
    const fusionElementCtx = document.getElementById('fusionElementChart');
    if (fusionElementCtx) {
        // 创意变形山脊面积图（山峰式柱状变体）
        const peaksData = [
            { label: '中原城坊制度', value: 20, icon: '🏛️', gradient: ['rgba(178, 34, 52, 0.9)', 'rgba(178, 34, 52, 0.2)'] },
            { label: '中原木作工艺', value: 22, icon: '🪵', gradient: ['rgba(218, 165, 32, 0.9)', 'rgba(218, 165, 32, 0.2)'] },
            { label: '中原官式做法', value: 18, icon: '🏯', gradient: ['rgba(160, 82, 45, 0.9)', 'rgba(160, 82, 45, 0.2)'] },
            { label: '本地生土技术', value: 18, icon: '🧱', gradient: ['rgba(85, 107, 47, 0.9)', 'rgba(85, 107, 47, 0.2)'] },
            { label: '本地装饰纹样', value: 12, icon: '✨', gradient: ['rgba(140, 120, 83, 0.9)', 'rgba(140, 120, 83, 0.2)'] },
            { label: '民族营造智慧', value: 10, icon: '⭐', gradient: ['rgba(205, 133, 63, 0.9)', 'rgba(205, 133, 63, 0.2)'] }
        ];

        // 为每个山峰构建数据点（弧形山峰）
        const datasets = peaksData.map((p, i) => {
            const baseX = i * 1.0;
            return {
                label: p.label,
                data: [
                    { x: baseX - 0.4, y: 0 },
                    { x: baseX, y: p.value },
                    { x: baseX + 0.4, y: 0 }
                ],
                backgroundColor: (ctx) => {
                    const chart = ctx.chart;
                    const { ctx: canvasCtx, chartArea } = chart;
                    if (!chartArea) return p.gradient[0];
                    const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, p.gradient[0]);
                    gradient.addColorStop(1, p.gradient[1]);
                    return gradient;
                },
                borderColor: p.gradient[0],
                borderWidth: 2,
                fill: true,
                tension: 0.5,
                pointRadius: 0,
                pointHoverRadius: 0
            };
        });

        // 自定义插件：绘制山峰内部百分比、顶部图标、底部标签
        const peakLabelsPlugin = {
            id: 'peakLabels',
            afterDatasetsDraw(chart) {
                const { ctx, data, scales: { x, y } } = chart;
                peaksData.forEach((p, i) => {
                    const baseX = i * 1.0;
                    const px = x.getPixelForValue(baseX);
                    const py = y.getPixelForValue(p.value);

                    // 山峰内部白色百分比数字
                    ctx.save();
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 16px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 4;
                    ctx.fillText(p.value + '%', px, py + 20);
                    ctx.restore();

                    // 山峰顶部主题插画图标
                    ctx.save();
                    ctx.font = '22px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(p.icon, px, py - 20);
                    ctx.restore();

                    // 底部分类标签
                    ctx.save();
                    ctx.fillStyle = '#8B4513';
                    ctx.font = '11px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(p.label, px, y.bottom + 10);
                    ctx.restore();
                });
            }
        };

        new Chart(fusionElementCtx, {
            type: 'line',
            data: { datasets: datasets },
            plugins: [peakLabelsPlugin],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: { size: 12 },
                            usePointStyle: true,
                            padding: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: () => '',
                            label: (ctx) => {
                                const idx = ctx.datasetIndex;
                                return peaksData[idx].label + ': ' + peaksData[idx].value + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        min: -0.5,
                        max: peaksData.length - 0.5,
                        display: false,
                        grid: { display: false }
                    },
                    y: {
                        display: false,
                        min: 0,
                        max: 28,
                        grid: { display: false }
                    }
                },
                layout: {
                    padding: { top: 35, bottom: 30, left: 10, right: 10 }
                }
            }
        });
    }

    // 图表：中原技艺在新疆建筑中的应用强度
    const techApplicationCtx = document.getElementById('techApplicationChart');
    if (techApplicationCtx) {
        // 径向玫瑰图（扇区半径映射数值，渐变填充）
        const techData = [
            { label: '抬梁式木构架', value: 85, color: '#E63946', light: 'rgba(230, 57, 70, 0.3)' },
            { label: '斗拱榫卯', value: 70, color: '#F4A261', light: 'rgba(244, 162, 97, 0.3)' },
            { label: '城坊规划', value: 90, color: '#2A9D8F', light: 'rgba(42, 157, 143, 0.3)' },
            { label: '官式屋面', value: 75, color: '#264653', light: 'rgba(38, 70, 83, 0.3)' },
            { label: '雕花梁枋', value: 80, color: '#E76F51', light: 'rgba(231, 111, 81, 0.3)' },
            { label: '彩画装饰', value: 65, color: '#8338EC', light: 'rgba(131, 56, 236, 0.3)' },
            { label: '砖瓦工艺', value: 88, color: '#FFB703', light: 'rgba(255, 183, 3, 0.3)' }
        ];

        const total = techData.reduce((sum, item) => sum + item.value, 0);
        techData.forEach(item => {
            item.percent = ((item.value / total) * 100).toFixed(1);
        });

        // 自定义插件：扇区内部数值标注
        const valueLabelPlugin = {
            id: 'valueLabels',
            afterDatasetsDraw(chart) {
                const { ctx, chartArea } = chart;
                if (!chartArea) return;
                const meta = chart.getDatasetMeta(0);
                if (!meta || !meta.data) return;
                ctx.save();
                meta.data.forEach((arc, i) => {
                    const item = techData[i];
                    const { x, y, outerRadius, startAngle, endAngle } = arc.getProps(['x', 'y', 'outerRadius', 'startAngle', 'endAngle']);
                    const midAngle = (startAngle + endAngle) / 2;
                    const labelRadius = outerRadius * 0.7;
                    const lx = x + Math.cos(midAngle) * labelRadius;
                    const ly = y + Math.sin(midAngle) * labelRadius;
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 16px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowColor = 'rgba(0,0,0,0.5)';
                    ctx.shadowBlur = 6;
                    ctx.fillText(item.value, lx, ly - 8);
                    ctx.font = 'bold 11px sans-serif';
                    ctx.fillText(item.percent + '%', lx, ly + 8);
                });
                ctx.restore();
            }
        };

        // 自定义插件：外侧引线+标签
        const outerLabelPlugin = {
            id: 'outerLabels',
            afterDatasetsDraw(chart) {
                const { ctx, chartArea } = chart;
                if (!chartArea) return;
                const meta = chart.getDatasetMeta(0);
                if (!meta || !meta.data) return;
                ctx.save();
                meta.data.forEach((arc, i) => {
                    const item = techData[i];
                    const { x, y, outerRadius, startAngle, endAngle } = arc.getProps(['x', 'y', 'outerRadius', 'startAngle', 'endAngle']);
                    const midAngle = (startAngle + endAngle) / 2;
                    const lineStart = outerRadius + 5;
                    const lineEnd = outerRadius + 20;
                    const sx = x + Math.cos(midAngle) * lineStart;
                    const sy = y + Math.sin(midAngle) * lineStart;
                    const ex = x + Math.cos(midAngle) * lineEnd;
                    const ey = y + Math.sin(midAngle) * lineEnd;
                    ctx.strokeStyle = item.color;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(sx, sy);
                    ctx.lineTo(ex, ey);
                    ctx.stroke();
                    ctx.fillStyle = '#5D4037';
                    ctx.font = 'bold 11px sans-serif';
                    ctx.textAlign = Math.cos(midAngle) > 0 ? 'left' : 'right';
                    ctx.textBaseline = 'middle';
                    const tx = ex + (Math.cos(midAngle) > 0 ? 4 : -4);
                    ctx.fillText(item.label, tx, ey);
                });
                ctx.restore();
            }
        };

        new Chart(techApplicationCtx, {
            type: 'polarArea',
            data: {
                labels: techData.map(d => d.label),
                datasets: [{
                    data: techData.map(d => d.value),
                    backgroundColor: techData.map(d => d.color),
                    borderColor: techData.map(d => '#ffffff'),
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(38, 70, 83, 0.95)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 12 },
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: (ctx) => {
                                const item = techData[ctx.dataIndex];
                                return [item.label, '应用强度: ' + item.value, '占比: ' + item.percent + '%'];
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        display: false,
                        grid: { display: false },
                        ticks: { display: false },
                        angleLines: { display: false }
                    }
                },
                layout: { padding: { top: 20, bottom: 20, left: 60, right: 60 } }
            },
            plugins: [valueLabelPlugin, outerLabelPlugin]
        });
    }

    // 图表：各民族建筑技艺贡献比例
    const ethnicContributionCtx = document.getElementById('ethnicContributionChart');
    if (ethnicContributionCtx) {
        new Chart(ethnicContributionCtx, {
            type: 'polarArea',
            data: {
                labels: ['汉族', '维吾尔族', '回族', '哈萨克族', '蒙古族', '塔吉克族'],
                datasets: [{
                    data: [35, 28, 12, 10, 10, 5],
                    backgroundColor: [
                        'rgba(178, 34, 52, 0.75)',
                        'rgba(218, 165, 32, 0.75)',
                        'rgba(85, 107, 47, 0.75)',
                        'rgba(160, 82, 45, 0.75)',
                        'rgba(140, 120, 83, 0.75)',
                        'rgba(205, 133, 63, 0.75)'
                    ],
                    borderColor: 'rgba(255,255,255,0.7)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed.r + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}


