# 소개

이 시스템은 Github에 올릴 목적의 프로젝트를 빠르게 만들기 위함임.

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn local
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn build

# Runs the end-to-end tests
yarn test:e2e
# Runs the tests only on Chromium
yarn test:e2e --project=chromium
# Runs the tests of a specific file
yarn test:e2e tests/example.spec.ts
# Runs the tests in debug mode
yarn test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```