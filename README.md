# 🤖 Plataforma de Processo Seletivo - RioBotz

Esta é a plataforma web oficial desenvolvida para o processo seletivo da **RioBotz**, a equipe de robótica da PUC-Rio. O projeto foi construído do zero utilizando React e Tailwind CSS, focado em criar uma experiência interativa e gamificada para os candidatos, além de fornecer um painel de controle robusto para a administração da equipe.

**[🔗 Acesse a plataforma](https://processo-seletivo-riobotz.vercel.app)**

## ✨ Tecnologias Utilizadas

Este projeto marca a evolução da stack para o uso de frameworks modernos, adotando o React com Vite para máxima performance e Tailwind CSS para estilização ágil e responsiva. O front-end foi arquitetado de forma escalável, preparado para integração contínua com o back-end.

<p align="left">
  <a href="#"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="#"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"></a>
  <a href="#"><img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript"></a>
  <a href="#"><img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router"></a>
  <a href="#"><img src="https://img.shields.io/badge/Vercel-%23000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
  <a href="#"><img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git"></a>
</p>

## 🚀 Principais Características

- **🎯 Trilhas de Conhecimento Dinâmicas:** Interface visual em formato de "linha do tempo" (timeline) para as diferentes áreas da equipe (Mecânica, Eletrônica, Autônomos, Gestão e Comunicação).
- **🕹️ Gamificação (Botcoins):** Sistema de pontuação integrado para engajar os candidatos através da conclusão de quizzes e participação em workshops.
- **🧠 Desacoplamento de Dados:** Utilização de arquivos `.json` como um banco de dados estático (`workshops.json`), permitindo que a interface seja atualizada dinamicamente sem necessidade de alterar a lógica dos componentes.
- **🔐 Painel do Administrador:** Uma rota exclusiva para os membros da RioBotz gerenciarem inscrições, confirmarem presença em workshops e distribuírem Botcoins extras.
- **📱 Responsividade Extrema:** Layout 100% responsivo, com adaptação fluida de navegação (NavBar para Desktop e Menu Hambúrguer para Mobile) utilizando Tailwind CSS.

## 📁 Arquitetura do Projeto

O projeto utiliza uma abordagem moderna de _Feature-Based Architecture_, separando componentes globais de funcionalidades específicas de páginas (como a Landing Page), mantendo o repositório limpo e escalável.

```text
├── src/
│   ├── assets/              # Recursos estáticos (Imagens e SVGs)
│   ├── components/          # Componentes UI globais e reutilizáveis (Header, Footer, Workshop Card)
│   ├── features/            # Componentes isolados por contexto/funcionalidade
│   │   └── landing/         # Seções exclusivas da Landing Page (Hero, Carrossel, CallToAction)
│   ├── pages/               # Views principais da aplicação (Rotas)
│   │   ├── AdminWorkshop.jsx
│   │   ├── Eletronica.jsx
│   │   ├── Quiz.jsx
│   │   └── ...
│   ├── services/            # Recursos informativos (JSON)
│   │   └── workshops.json   # Base de dados centralizada dos workshops
│   ├── index.css            # Estilos globais e configurações do Tailwind
│   └── main.jsx             # Ponto de entrada e configuração do React Router
├── tailwind.config.js
├── vite.config.js
└── package.json
```

✨ Contribuidores
Desenvolvido com a colaboração de:

<p align="center">
<a href="https://github.com/thadeu-ct">
<img src="https://www.google.com/search?q=https://github.com/thadeu-ct.png" width="100" style="border-radius:50%" alt="Thadeu">
<br />
<sub><b>Thadeu Cavalcanti</b></sub><br />
<sub>Frontend & Arquitetura UI/UX</sub>
</a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://www.google.com/search?q=https://github.com/joaocapechi">
<img src="https://www.google.com/search?q=https://github.com/joaocapechi.png" width="100" style="border-radius:50%" alt="João Capechi">
<br />
<sub><b>João Capechi (Telhado)</b></sub><br />
<sub>Backend & Integração de API</sub>
</a>
</p>
