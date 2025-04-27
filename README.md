
# 🧩 Backend for Grant Matching Platform

Цей проект — бекенд для платформи пошуку грантів із автоматичним саммаризацією заявок за допомогою Google Gemini.

---

## 📦 Технології

- Node.js + Express.js
- PostgreSQL
- Amazon S3 (для зберігання файлів)
- Google Gemini (RAG для генерації саммарі)
- Multer (upload файлів)
- Sequelize ORM
- JWT авторизація

---

## ⚡ Структура проекту

```
/src
  /config         # Налаштування бази даних, S3, середовище
  /modules        # Модулі (auth, user, grants, grantApplications)
  /common
    /middlewares  # Middleware (auth, upload)
    /services     # Логіка S3, Gemini, парсинг файлів
    /utils        # Утиліти для парсингу, побудови промтів
index.js          # Точка входу
.env.example      # Приклад налаштувань
```

---

## 🚀 Як запустити проект локально

### 1. Клонувати репозиторій

```bash
git clone https://gitlab.com/your-org/your-project.git
cd your-project
```

### 2. Встановити залежності

```bash
npm install
```

### 3. Створити файл `.env`

```bash
cp .env.example .env
```

### 4. Налаштувати базу даних

```bash
npx sequelize-cli db:migrate
```

(або пропустити, якщо синк файлів сам)

### 5. Запустити сервер

```bash
npm start
```

або в режимі розробки:

```bash
npm run dev
```

---

## 🌐 Основні роутинг групи

| Метод | Роут | Опис |
|:---|:---|:---|
| POST | `/api/auth/register` | Реєстрація нового користувача |
| POST | `/api/auth/login` | Логін користувача |
| POST | `/api/users/upload-avatar` | Завантажити аватар |
| POST | `/api/grants` | CRUD для грантів |
| POST | `/api/grant-applications/parse` | Завантаження форми + файлу ➔ саммарі через Gemini |

---

## 📜 Нотатки

- Система використовує RAG (Retrieval-Augmented Generation) для точнішої саммарізації.
- Завантажені файли зберігаються на Amazon S3.
- Саммарі генерується через Google Gemini 1.5 Pro.
- Дані зберігаються у PostgreSQL.

---

## 📈 Моніторинг

_(опціонально)_

- Є можливість інтеграції Prometheus для збору метрик.
- Grafana для візуалізації статусу сервісів.

---

## 📄 Приклад `.env.example`

```dotenv
# Server
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password

# JWT
JWT_SECRET=your_jwt_secret_key

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_bucket_name

# Gemini API
GEMINI_API_KEY=your_gemini_api_key
```
