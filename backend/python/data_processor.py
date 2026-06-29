import json
import pandas as pd
import numpy as np
from datetime import datetime

class DataProcessor:
    def __init__(self):
        self.ethnic_data = self.load_ethnic_data()
        self.festival_data = self.load_festival_data()
    
    def load_ethnic_data(self):
        """加载民族数据"""
        return [
            {
                "id": 1,
                "name": "维吾尔族",
                "population": 11620000,
                "language": "维吾尔语",
                "distribution": "主要分布在南疆地区",
                "festivals": ["古尔邦节", "肉孜节", "诺鲁孜节"]
            },
            {
                "id": 2,
                "name": "哈萨克族",
                "population": 1560000,
                "language": "哈萨克语",
                "distribution": "主要分布在北疆地区",
                "festivals": ["诺鲁孜节", "肉孜节", "古尔邦节"]
            },
            {
                "id": 3,
                "name": "柯尔克孜族",
                "population": 200000,
                "language": "柯尔克孜语",
                "distribution": "主要分布在克孜勒苏柯尔克孜自治州",
                "festivals": ["诺鲁孜节", "肉孜节"]
            },
            {
                "id": 4,
                "name": "蒙古族",
                "population": 170000,
                "language": "蒙古语",
                "distribution": "主要分布在巴音郭楞蒙古自治州和博尔塔拉蒙古自治州",
                "festivals": ["那达慕大会", "春节"]
            }
        ]
    
    def load_festival_data(self):
        """加载节日数据"""
        return [
            {
                "id": 1,
                "name": "古尔邦节",
                "ethnic": "维吾尔族",
                "date": "2024-06-17",
                "description": "维吾尔族重要节日，举行盛大的庆祝活动"
            },
            {
                "id": 2,
                "name": "肉孜节",
                "ethnic": "维吾尔族",
                "date": "2024-05-13",
                "description": "维吾尔族传统节日，标志着斋月结束"
            },
            {
                "id": 3,
                "name": "诺鲁孜节",
                "ethnic": "哈萨克族",
                "date": "2024-03-20",
                "description": "哈萨克族新年，象征着春天的开始"
            },
            {
                "id": 4,
                "name": "那达慕大会",
                "ethnic": "蒙古族",
                "date": "2024-08-10",
                "description": "蒙古族传统节日，举行赛马、摔跤等活动"
            }
        ]
    
    def process_population_data(self):
        """处理人口数据"""
        df = pd.DataFrame(self.ethnic_data)
        total_population = df['population'].sum()
        df['percentage'] = (df['population'] / total_population * 100).round(2)
        
        return {
            "total_population": total_population,
            "ethnic_distribution": df[["name", "population", "percentage"]].to_dict('records')
        }
    
    def generate_heatmap_data(self):
        """生成热力图数据"""
        heatmap_data = []
        
        for festival in self.festival_data:
            date = datetime.strptime(festival['date'], "%Y-%m-%d")
            heatmap_data.append({
                "date": festival['date'],
                "month": date.month,
                "day": date.day,
                "intensity": np.random.randint(5, 10),  # 模拟热度值
                "festival": festival['name'],
                "ethnic": festival['ethnic']
            })
        
        return heatmap_data
    
    def clean_data(self, data):
        """数据清洗"""
        if isinstance(data, list):
            cleaned_data = []
            for item in data:
                if isinstance(item, dict):
                    cleaned_item = {k: v for k, v in item.items() if v is not None}
                    cleaned_data.append(cleaned_item)
            return cleaned_data
        return data
    
    def analyze_cultural_heritage(self):
        """分析文化遗产数据"""
        heritage_data = {
            "intangible_cultural_heritage": [
                {"name": "维吾尔族木卡姆", "level": "国家级", "description": "维吾尔族传统音乐艺术"},
                {"name": "哈萨克族阿依特斯", "level": "国家级", "description": "哈萨克族传统说唱艺术"},
                {"name": "柯尔克孜族史诗《玛纳斯》", "level": "国家级", "description": "柯尔克孜族传统史诗"},
                {"name": "蒙古族长调", "level": "国家级", "description": "蒙古族传统音乐艺术"}
            ],
            "traditional_crafts": [
                {"name": "艾德莱斯绸制作技艺", "ethnic": "维吾尔族"},
                {"name": "哈萨克族刺绣", "ethnic": "哈萨克族"},
                {"name": "柯尔克孜族毡房制作", "ethnic": "柯尔克孜族"},
                {"name": "蒙古族银器制作", "ethnic": "蒙古族"}
            ]
        }
        
        return heritage_data

if __name__ == "__main__":
    processor = DataProcessor()
    
    # 测试人口数据处理
    population_data = processor.process_population_data()
    print("人口数据处理结果:")
    print(json.dumps(population_data, ensure_ascii=False, indent=2))
    
    # 测试热力图数据生成
    heatmap_data = processor.generate_heatmap_data()
    print("\n热力图数据:")
    print(json.dumps(heatmap_data, ensure_ascii=False, indent=2))
    
    # 测试文化遗产分析
    heritage_data = processor.analyze_cultural_heritage()
    print("\n文化遗产分析结果:")
    print(json.dumps(heritage_data, ensure_ascii=False, indent=2))