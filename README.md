# react vite boilerplate

## Packages

- [Vite](https://vitejs.dev/guide/why.html)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Vite, ESLint and Prettier Installation Step:

1. Install VSCode extension [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

2. Install [Vite](https://vitejs.dev/guide/).

```
npm create vite@latest
```

3. Install eslint and related packages with standard configuration used by [Create React App](https://www.npmjs.com/package/eslint-config-react-app). The purpose for all packages is listed [here](https://www.robinwieruch.de/vite-eslint/).

```
npm i -D vite-plugin-eslint eslint eslint-config-react-app
```

4. Create a `.eslintrc` file with below settings

```json
{
  "extends": ["react-app"]
}
```

5. Add `eslint` in `vite.config.ts` file.

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
```

6.  Install `prettier` and some relevant packages [explained here](https://prettier.io/docs/en/install.html#eslint-and-other-linters).

```
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

7. Create `.prettierrc`.

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true
}
```

8. Update `.eslintrc` content with integration of prettier.

```json
{
  "extends": ["react-app", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  }
}
```

9. Add `package.json` npm script and test if it works as expected.

```json
{
  "scripts": {
    "lint": "eslint src/**/*.{js,jsx,ts,tsx,json}",
    "format": "prettier --write src/**/*.ts{,x}"
  }
}
```

10. Add `.vscode/settings.json`.

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## Available Scripts

### `npm run dev`, `npm run build`, `npm run preview`

Command line Offered by [Vite](https://vitejs.dev/guide/cli.html).

### `npm run lint`

Check lint.

### `npm run format`

Adjust format and save.
