import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class Visualization:
    def __init__(self):
        # 设置中文字体
        plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
        plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号
    
    def create_population_chart(self, population_data):
        """创建民族人口分布图表"""
        df = pd.DataFrame(population_data['ethnic_distribution'])
        
        # 创建饼图
        plt.figure(figsize=(10, 6))
        plt.pie(df['percentage'], labels=df['name'], autopct='%1.1f%%', startangle=90)
        plt.title('新疆各民族人口分布')
        plt.axis('equal')  # 保证饼图是圆的
        
        # 保存图表
        plt.savefig('backend/database/population_chart.png')
        plt.close()
        
        return 'backend/database/population_chart.png'
    
    def create_heatmap(self, heatmap_data):
        """创建节日日历热力图"""
        # 转换数据格式
        df = pd.DataFrame(heatmap_data)
        
        # 创建热力图数据结构
        pivot_data = df.pivot(index='day', columns='month', values='intensity')
        
        # 创建热力图
        plt.figure(figsize=(12, 8))
        sns.heatmap(pivot_data, cmap='YlOrRd', annot=True, fmt='g')
        plt.title('新疆民族节日热力图')
        plt.xlabel('月份')
        plt.ylabel('日期')
        
        # 保存图表
        plt.savefig('backend/database/festival_heatmap.png')
        plt.close()
        
        return 'backend/database/festival_heatmap.png'
    
    def create_cultural_map_data(self):
        """创建文化地图数据"""
        # 模拟新疆各地文化景点数据
        map_data = [
            {
                "id": 1,
                "name": "喀什古城",
                "latitude": 39.4699,
                "longitude": 75.9800,
                "ethnic": "维吾尔族",
                "type": "历史文化名城",
                "description": "喀什古城是中国最西端的一座历史文化名城，有着2000多年的历史。"
            },
            {
                "id": 2,
                "name": "伊犁草原",
                "latitude": 43.9200,
                "longitude": 81.3200,
                "ethnic": "哈萨克族",
                "type": "自然景观",
                "description": "伊犁草原是世界著名的草原之一，是哈萨克族的主要聚居地。"
            },
            {
                "id": 3,
                "name": "克孜勒苏柯尔克孜自治州",
                "latitude": 39.7000,
                "longitude": 75.9000,
                "ethnic": "柯尔克孜族",
                "type": "自治州",
                "description": "克孜勒苏柯尔克孜自治州是中国唯一的柯尔克孜族自治州。"
            },
            {
                "id": 4,
                "name": "巴音布鲁克草原",
                "latitude": 43.0000,
                "longitude": 84.0000,
                "ethnic": "蒙古族",
                "type": "自然景观",
                "description": "巴音布鲁克草原是中国第二大草原，是蒙古族的主要聚居地。"
            }
        ]
        
        return map_data
    
    def generate_timeline_data(self):
        """生成特色节目时间轴数据"""
        timeline_data = [
            {
                "id": 1,
                "date": "2024-01-01",
                "title": "元旦",
                "description": "新年第一天，新疆各地举行庆祝活动。",
                "ethnic": "各民族"
            },
            {
                "id": 2,
                "date": "2024-03-20",
                "title": "诺鲁孜节",
                "description": "哈萨克族新年，象征着春天的开始。",
                "ethnic": "哈萨克族"
            },
            {
                "id": 3,
                "date": "2024-05-13",
                "title": "肉孜节",
                "description": "维吾尔族传统节日，标志着斋月结束。",
                "ethnic": "维吾尔族"
            },
            {
                "id": 4,
                "date": "2024-06-17",
                "title": "古尔邦节",
                "description": "维吾尔族重要节日，举行盛大的庆祝活动。",
                "ethnic": "维吾尔族"
            },
            {
                "id": 5,
                "date": "2024-08-10",
                "title": "那达慕大会",
                "description": "蒙古族传统节日，举行赛马、摔跤等活动。",
                "ethnic": "蒙古族"
            }
        ]
        
        return timeline_data

if __name__ == "__main__":
    from data_processor import DataProcessor
    
    processor = DataProcessor()
    visualization = Visualization()
    
    # 测试人口分布图表
    population_data = processor.process_population_data()
    population_chart = visualization.create_population_chart(population_data)
    print(f"人口分布图表已保存至: {population_chart}")
    
    # 测试节日热力图
    heatmap_data = processor.generate_heatmap_data()
    festival_heatmap = visualization.create_heatmap(heatmap_data)
    print(f"节日热力图已保存至: {festival_heatmap}")
    
    # 测试文化地图数据
    map_data = visualization.create_cultural_map_data()
    print("文化地图数据:")
    for item in map_data:
        print(f"{item['name']}: {item['ethnic']} - {item['description']}")
    
    # 测试时间轴数据
    timeline_data = visualization.generate_timeline_data()
    print("\n特色节目时间轴数据:")
    for item in timeline_data:
        print(f"{item['date']}: {item['title']} ({item['ethnic']})")