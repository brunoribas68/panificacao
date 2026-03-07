# 🥖 Calculadora de Pães (Panificação)

Aplicação web moderna para calcular ingredientes de panificação com base em **porcentagem do padeiro**, com interface em estilo **glassmorphism** (React + Vite + TailwindCSS).

## ✅ Stack do projeto

- **React** `18.3.1`
- **React DOM** `18.3.1`
- **React Router DOM** `6.28.0`
- **Vite** `5.4.11`
- **@vitejs/plugin-react** `4.3.4`
- **TailwindCSS** `3.4.15`
- **PostCSS** `8.4.49`
- **Autoprefixer** `10.4.20`
- **PropTypes** `15.8.1`

> As versões acima são as versões configuradas no `package.json` deste projeto.

## 📦 Pré-requisitos

### Rodando localmente (sem Docker)

- **Node.js** 18+ (recomendado 20+)
- **npm** 9+

### Rodando com Docker

- **Docker** 24+
- **Docker Compose** 2+

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repo>
cd panificacao
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto em modo desenvolvimento:

```bash
npm run dev
```

4. Abra no navegador:

```text
http://localhost:5173
```

> Unidade oficial do cálculo: **gramas (g)**. O campo de farinha sempre recebe gramas (ex.: 10000 = 10kg).

## 🐳 Rodando com Docker

### Opção 1: Docker Compose (recomendado)

Suba o projeto:

```bash
docker compose up --build
```

Depois acesse:

```text
http://localhost:5173
```

Para parar:

```bash
docker compose down
```

### Opção 2: Docker direto

Build da imagem:

```bash
docker build -t panificacao-app .
```

Executar container:

```bash
docker run --rm -p 5173:5173 panificacao-app
```

## 🛠️ Scripts disponíveis

- `npm run dev` → inicia ambiente de desenvolvimento
- `npm run build` → gera build de produção
- `npm run preview` → visualiza build localmente

## 📂 Estrutura de pastas

```text
src/
  components/
    BreadCard.jsx
    Calculator.jsx
  data/
    recipes.js
  pages/
    Home.jsx
    CalculatorPage.jsx
  App.jsx
Dockerfile
docker-compose.yml
.dockerignore
```


## 🖼️ Onde colocar imagens

- `public/images/breads/` → imagens de pães acessadas por URL direta (ex.: `/images/breads/pao-frances.jpg`).
- `public/images/ui/` → fundos, ícones e elementos visuais globais.
- `src/assets/images/` → imagens importadas diretamente nos componentes React.

## 🧮 Lógica de cálculo

Para cada ingrediente:

```text
ingrediente (g) = farinhaEmGramas * (percentual / 100)

Para hidratação em faixa:
agua_min = farinhaEmGramas * (percentualMin / 100)
agua_max = farinhaEmGramas * (percentualMax / 100)
```

Depois:

- soma-se a **massa madre** informada manualmente;
- calcula-se o **peso total da massa em gramas**;
- calcula-se o **número de pães produzidos** com base no peso unitário (`breadWeight`) da receita.

## 🍞 Tipos de pão disponíveis

- Pão Francês
- Pão Caseiro
- Pão Hot Dog
- Pão Hambúrguer
- Pão de Leite
- Pão Sovado
- Pão Vienense
- Pão Sírio

## 🎨 Interface

- Visual moderno inspirado em Apple glassmorphism
- Fundos com blur e gradientes
- Cards translúcidos com cantos arredondados
- Layout responsivo para mobile e desktop
