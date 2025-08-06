
# 🛒 Amazon Scraper - Bun + Vite Frontend

Projeto simples e funcional que realiza o scraping das listagens de produtos da Amazon, diretamente da primeira página de resultados de busca, utilizando **Bun** e um **Frontend estilizado com Vite + Vanilla JS**.

---

## 🚀 Tecnologias Utilizadas

- [Bun](https://bun.sh/) - Ambiente de execução JS/TS ultrarrápido.
- [Express](https://expressjs.com/) - Framework para construção do backend.
- [Vite](https://vitejs.dev/) - Build tool para frontend moderno.
- HTML, CSS e JavaScript Vanilla.

---

## 📦 Funcionalidades

- 🔍 Busca de produtos pela palavra-chave.
- 🖼️ Retorna título, imagem, avaliação e número de reviews.
- ⚙️ Frontend estilizado e responsivo.
- 🛡️ User-Agent customizado e proteção contra bloqueios.
- 🐛 Salvamento de HTML para debug em caso de falha.

---

## 🛠️ Como Rodar o Projeto Localmente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/Jonhs1/amazon-scraper.git
cd amazon-scraper
```

### 2️⃣ Instale as dependências
```bash
cd backend
bun install
```

### 3️⃣ Rode o Backend (Express)
```bash
bun run index.ts
```

O servidor estará rodando em: `http://localhost:3000`

---

### 4️⃣ Configure o Frontend
```bash
cd ../frontend
bun create vite .
bun install
```

### 5️⃣ Rode o Frontend (Vite)
```bash
bun run dev
```

Abra no navegador: `http://localhost:5173`

---

## 📂 Estrutura de Pastas
```
amazon-scraper/
├── backend/
│   ├── index.ts  (servidor + scraper Puppeteer)
│   └── package.json
└── frontend/
    ├── index.html
    ├── main.ts
    ├── style.css
    └── vite.config.ts
```

---

## 🛡️ Observações Importantes

- ⚠️ **Scraping da Amazon está sujeito a bloqueios (Captcha ou IP ban).**
  - Use proxies se necessário.
  - Evite volume alto de requisições seguidas.

---

## 🤝 Contribuições

Sinta-se livre para abrir PRs, sugestões ou melhorias para o projeto!

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## ✒️ Autor

**João Victor Miranda Oliveira**
