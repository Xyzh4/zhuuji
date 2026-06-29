
# 新疆文化平台 - 后端项目

## 环境要求

- **Java**: 21 或更高版本
- **Maven**: 3.8 或更高版本

## 安装步骤

### 1. 安装 Maven

**Windows:**
1. 下载 Maven: https://maven.apache.org/download.cgi
2. 解压到某个目录（例如: `C:\Program Files\Apache\maven`）
3. 配置环境变量:
   - 添加 `MAVEN_HOME`: `C:\Program Files\Apache\maven`
   - 在 `Path` 中添加: `%MAVEN_HOME%\bin`
4. 验证安装: 打开新的终端，运行 `mvn --version`

### 2. 运行项目

在 `backend/java` 目录下运行:

```bash
mvn clean install
mvn spring-boot:run
```

或者如果你使用 IntelliJ IDEA:
1. 打开 `backend/java` 目录
2. 等待 Maven 依赖下载完成
3. 找到 `Application.java` 文件
4. 右键点击，选择 "Run 'Application.main()'"

## 访问地址

- **API 接口**: http://localhost:8080
- **H2 数据库控制台**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:xinjiang_culture`
  - 用户名: `sa`
  - 密码: (留空)

## API 接口

### 获取民族列表
```
GET /api/ethnic/list
```

### 获取民族详情
```
GET /api/ethnic/details/{id}
```

## 数据库配置

当前使用 **H2 内存数据库**（开发/演示用）。

如需切换到 MySQL，修改 `application.properties` 文件即可。

