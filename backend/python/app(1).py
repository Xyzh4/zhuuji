from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import pymysql
import os

# 绝对路径（你的项目目录，直接写死）
BASE_DIR = r"C:\Users\杨子涵\Desktop\5,1"

app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")
CORS(app)

# 你的 MySQL 密码
DB_PASSWORD = "zh0503"

def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password=DB_PASSWORD,
        database='xinjiang_tourism',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

# ===================== 首页（已经改成 index.html）=====================
@app.route('/')
@app.route('/index.html')
def home():
    return send_from_directory(BASE_DIR, 'index.html')

# ===================== 所有页面都能访问 =====================
@app.route('/<filename>')
def serve_file(filename):
    return send_from_directory(BASE_DIR, filename)

# ===================== 接口 =====================
@app.route('/api/danmu')
def get_danmu():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT description FROM danmu_table ORDER BY RAND() LIMIT 10")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/api/geo')
def get_geo():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name, description, height, official_url, source FROM xinjiang_geo ORDER BY RAND() LIMIT 3")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/api/geo-stats')
def get_geo_stats():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM xinjiang_geo_stats")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/api/xinjiang-facts')
def get_xinjiang_facts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM xinjiang_facts")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/api/culture-radar')
def culture_radar():
    return jsonify({
        "name": "维吾尔族文化综合评分",
        "dimensions": ["服饰色彩", "音乐", "建筑装饰", "工艺精细度", "文化传承"],
        "scores": [96, 98, 95, 97, 99],
        "source": "新疆维吾尔自治区非物质文化遗产保护研究中心",
        "source_url": "https://www.xinjiang.gov.cn/"
    })

@app.route('/api/food-material')
def get_food_material():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT material_name, ratio, color FROM food_material_ratio ORDER BY id")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/api/festival-heat')
def get_festival_heat():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT month, month_name, heat_level, heat_color FROM festival_heatmap ORDER BY month")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/api/tourist-temp')
def get_tourist_temp():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT month, month_name, tourist_count, avg_temp, tourist_color, temp_color FROM tourist_temp_monthly ORDER BY month")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)