# ⚡️ erp-app ⚡️  
Everything you need to build a modern, full-stack **ERP** system.

---

## 🚀 Tech Stack

This project combines powerful, modern tools to deliver a robust ERP foundation:

- 🔄 **[Remult](https://remult.dev/)** – Full-stack, type-safe CRUD & real-time capabilities  
- 🧩 **[Angular](https://angular.dev/)** – Reactive, component-based frontend framework  
- ⚙️ **[NestJS](https://nestjs.com/)** – Scalable and maintainable backend framework  
- 💽 **[MySQL](https://www.mysql.com/)** – Reliable relational database  
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first styling framework  
- 🧱 **[PrimeNG](https://primeng.org/)** – Rich UI component library for Angular  

> 💡 This project is modular and built for extensibility — ideal for open-source collaboration or private customization.

---

## 📦 Prerequisites

Before getting started, ensure the following are installed:

- **Node.js v20+**
- **npm** (comes with Node.js)
- **MySQL Server**

---

## 📥 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/infolinematrix/erp-app.git
   cd erp-app
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

---

## ⚙️ Configuration

Create a `.env` file in the root directory. Use the provided `.env.example` as a template:

```bash
cp .env.example .env
```

Then update it with your database credentials and other environment variables.

---

## 🧑‍💻 Local Development

This app uses both a frontend and a backend server. Open **two terminals**:

### Terminal 1 – Frontend (Angular + Remult)

```bash
npm run dev
```

This will launch the development server and open the app in your browser.

### Terminal 2 – Backend (NestJS + Remult)

```bash
npm run dev-node
```

Runs the backend in watch mode for live reload on code changes.

---

## 🚀 Building for Production

To build the app and prepare it for deployment:

```bash
npm run build
```

Then, start the production server:

```bash
npm run start
```

---

## 🧰 Useful Angular CLI Commands

Generate a new module with routing:

```bash
ng g m <module-name> --routing
```

Clean up unused Angular imports:

```bash
ng generate @angular/core:cleanup-unused-imports
```

---

## 🧯 Dev Tips

### Unblocking a port (e.g., 4200)

If the Angular dev server port is blocked:

```bash
lsof -i :4200
kill -9 <PID>
```

---

## 🌍 Contributing

We welcome contributions! If you'd like to help:

1. Fork the repo
2. Create a new branch
3. Submit a pull request with a clear description

---

## 🛡 License

This project is open-source under the [MIT License](LICENSE).

---

## 💬 Questions?

Open an [issue](https://github.com/infolinematrix/erp-app/issues) or start a discussion — we're happy to help!
