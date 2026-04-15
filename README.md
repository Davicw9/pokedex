# Pokédex - React + TypeScript + Vite

Uma aplicação moderna de Pokédex construída com React, TypeScript e Tailwind CSS, consumindo dados da [PokéAPI](https://pokeapi.co/).

## 🌐 Demonstração
Acesse o projeto online: [https://pokedex-delta-liard.vercel.app](https://pokedex-delta-liard.vercel.app)

## 🚀 Funcionalidades

- **Listagem Completa**: Veja todos os 151 Pokémons originais (Primeira Geração).
- **Sistema de Paginação**: Navegue pela lista com uma interface de paginação limpa e intuitiva (20 Pokémons por página).
- **Busca em Tempo Real**: Encontre seu Pokémon favorito instantaneamente através da barra de pesquisa interativa.
- **Detalhes Completos**: Clique em qualquer Pokémon para ver informações avançadas como:
  - Sprite em alta resolução (Official Artwork).
  - Tipos e Habilidades.
  - Peso e Altura em kg e metros.
  - Barras animadas de Status Base (HP, Attack, Defense, etc.).
- **Favoritos Salvos**: Salve seus Pokémons preferidos através do botão de coração. Suas escolhas ficam guardadas no navegador (LocalStorage), e há uma opção incrível que filtra a lista para mostrar apenas os seus favoritos.
- **Design Dinâmico**: A paleta de cores (sombras, bordas, barras) se adapta dinamicamente ao tipo principal do Pokémon.

## 🛠️ Tecnologias Utilizadas

- **React** (Hooks: `useState`, `useEffect`, `useMemo`)
- **TypeScript** (Tipagem avançada, garantindo robustez)
- **Vite** (Ambiente de desenvolvimento ultrarrápido)
- **Tailwind CSS** (Utilizado para estruturar e estilizar o projeto de forma responsiva e agradável)
- **Lucide-React** (Para o ícone de coração e os botões de voltar)
- **PokéAPI** (API REST pública do Pokémon)

## 📦 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Davicw9/pokedex.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd pokedex
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   Abra `http://localhost:5173/` no seu navegador para ver o projeto rodando.

## 🤝 Autor
Criado por [Davicw9](https://github.com/Davicw9).
