# Solução Verde — Consultoria & Licenciamento Ambiental

Uma landing page institucional moderna, de alta performance e totalmente responsiva desenvolvida para a **Solução Verde**. O projeto foi planejado com foco em conversão de leads, autoridade de marca e excelente experiência do usuário.

---

## 🚀 Funcionalidades Principais

- **Design Premium e Responsivo**: Desenvolvido sob medida com Tailwind CSS, oferecendo uma interface limpa, moderna e adaptada para dispositivos móveis, tablets e desktops.
- **Seções de Serviços Especializados**:
  - **Estudos Técnicos**: Detalhamento de EIA/RIMA, RAP, PRAD e relatórios ambientais.
  - **Assessoria a Órgãos Ambientais**: Interlocução qualificada com órgãos de controle (como a CETESB).
  - **Regularização Ambiental**: Passivos, multas, TACs e eliminação de riscos legais.
- **Calculadora de Riscos Ambientais**: Uma ferramenta interativa para ajudar empresas a avaliarem rapidamente seu nível de enquadramento e riscos ambientais regulatórios.
- **Formulários de Captura Inteligentes**: Integração para captação de contatos qualificados e solicitações de análise prévia.
- **Micro-Animações**: Transições suaves e elegantes utilizando `motion` para elevar a qualidade estética do site.

---

## 🛠️ Tecnologias Utilizadas

- **React 19** com **TypeScript** para maior segurança no código e tipagem robusta.
- **Vite** para um ecossistema de desenvolvimento e compilação ultra-rápido.
- **Tailwind CSS** para estilização utilitária e design responsivo.
- **Motion** para animações fluidas e polidas de interface.
- **Lucide React** para um pacote de ícones moderno e minimalista.

---

## 💻 Como Rodar o Projeto Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   cd NOME_DO_REPOSITORIO
   ```

2. **Instalar Dependências**:
   ```bash
   npm install
   ```

3. **Iniciar o Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   *O servidor iniciará localmente e você poderá acessá-lo pelo navegador.*

4. **Gerar a Build de Produção**:
   ```bash
   npm run build
   ```
   *Os arquivos estáticos prontos para produção serão gerados na pasta `dist/`.*

---

## 📦 Como Publicar no GitHub Pages

O projeto já está configurado com caminhos relativos (`base: './'` no `vite.config.ts`), facilitando a publicação direta no GitHub Pages.

### Método Rápido com o pacote `gh-pages`

1. Instale o pacote como dependência de desenvolvimento:
   ```bash
   npm install -D gh-pages
   ```

2. No seu arquivo `package.json`, adicione os seguintes scripts sob a chave `"scripts"`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. No mesmo `package.json`, adicione uma propriedade no topo com o link da sua página:
   ```json
   "homepage": "https://seu-usuario.github.io/nome-do-repositorio"
   ```

4. Execute o comando de deploy:
   ```bash
   npm run deploy
   ```

*O script irá gerar o build de produção automaticamente e criará/atualizará a branch `gh-pages` no GitHub, disponibilizando o site online em poucos minutos.*

---

## 📄 Licença

Este projeto é de uso institucional para a Solução Verde. Todos os direitos reservados.
