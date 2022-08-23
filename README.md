<h1>科协报名表单<img src="https://github.com/MR-Addict/joinus/actions/workflows/docker.yml/badge.svg?branch=main"/></h1>

## 1. 准备数据库

### 1.1 创建新数据库

#### 1.1.1 创建joinus数据库

创建新的提交数据库，名称为`joinus`：

```sql
CREATE DATABASE joinus;
```

#### 1.1.2 创建提交Table

创建新的Table，名称为`joinus`：

```sql
USE joinus;

CREATE TABLE `joinus`(
    `ID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `提交时间` VARCHAR(10) DEFAULT (DATE_FORMAT(CURRENT_DATE, '%Y/%m/%d')) NOT NULL,
    `姓名` VARCHAR(10) NOT NULL,
    `性别` VARCHAR(1) NOT NULL,
    `手机` VARCHAR(11) NOT NULL,
    `QQ` VARCHAR(11) NOT NULL,
    `邮箱` VARCHAR(30) NOT NULL,
    `学号` VARCHAR(12) NOT NULL,
    `学院` VARCHAR(30) NOT NULL,
    `专业` VARCHAR(30) NOT NULL,
    `第一志愿` VARCHAR(7) NOT NULL,
    `第二志愿` VARCHAR(7) NOT NULL,
    `调剂` VARCHAR(1) NOT NULL,
    `自我介绍` VARCHAR(500) NOT NULL
);
```

#### 1.1.3 创建管理员Table

创建新的Table，名称为`admin`：

```sql
USE joinus;

CREATE TABLE `admin`(
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(10) NOT NULL,
    `password` VARCHAR(100) NOT NULL
);
```

### 1.2 创建新用户

#### 1.2.1 创建joinus_insert用户

创建新的MySQL用户，用户名为`joinus_insert`，密码为`password`：

```sql
CREATE USER 'joinus_insert'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

授予`joinus_insert`用户权限：

```sql
USE joinus; GRANT INSERT ON joinus TO 'joinus_insert'@'localhost' WITH GRANT OPTION;
```

#### 1.2.2 创建joinus_select用户

创建新的MySQL用户，用户名为`joinus_select`，密码为`password`：

```sql
CREATE USER 'joinus_select'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

授予`joinus_select`用户权限：

```sql
USE joinus; GRANT SELECT ON joinus TO 'joinus_select'@'localhost' WITH GRANT OPTION;
```

```sql
USE joinus; GRANT SELECT ON admin TO 'joinus_select'@'localhost' WITH GRANT OPTION;
```

#### 1.2.3 重置用户权限缓存

重置用户权限缓存：

```sql
FLUSH PRIVILEGES;
```

## 2. 启动服务器

克隆本文档：

```bash
git clone https://github.com/MR-Addict/joinus.git
```

启动docker容器：

```bash
docker-compose up -d
```
