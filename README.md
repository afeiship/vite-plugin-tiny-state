# vite-plugin-tiny-state
> Vite plugin for zero-config auto-discovery and registration of react-tiny-state store modules.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## features
- 🚀 **Zero Configuration**: Automatically scans `src/stores/**/*.ts` and registers stores to `nx`.
- 📁 **Nested Subdirectories**: Supports nested paths (e.g. `member/profile.ts` -> `memberProfile`, `member/index.ts` -> `member`).
- 💉 **Auto-Injection**: Injects `import 'virtual:tiny-state';` into entry point (`src/main.tsx`) at compile time.
- ⚡ **Virtual Module**: Exposes `virtual:tiny-state` for manual imports if preferred.

## installation
```shell
npm install @jswork/vite-plugin-tiny-state
```

## usage

### 1. Add plugin to `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginTinyState from '@jswork/vite-plugin-tiny-state';

export default defineConfig({
  plugins: [
    react(),
    vitePluginTinyState(), // Zero-config auto-registration
  ],
});
```

### 2. Define store modules

Create store modules in `src/stores/`:

```ts
// src/stores/counter.ts
import nx from '@jswork/next';

export default nx.$defineStore({
  state: { count: 0 },
  getters: { double: (state) => state.count * 2 },
  actions: {
    increment: (state) => nx.$set('counter.count', state.count + 1),
  },
});
```

Nested subdirectories are fully supported:
```ts
// src/stores/member/profile.ts -> module name: memberProfile
export default nx.$defineStore({
  state: { nickname: 'Alice' },
});
```

### 3. Use directly in components

No need to `import '@/stores'` anywhere! Stores are automatically registered before app mounts.

```tsx
function Counter() {
  const count = nx.$use('counter.count');
  return <button onClick={() => nx.$call('counter.increment')}>{count}</button>;
}
```

## options

```ts
vitePluginTinyState({
  /**
   * Glob pattern to scan store modules.
   * @default '/src/stores/**\/*.ts'
   */
  pattern?: string;

  /**
   * Automatically inject virtual module import into the entry file.
   * @default true
   */
  autoInject?: boolean;

  /**
   * Target entry file path to inject.
   * @default 'src/main.tsx'
   */
  entry?: string;
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-plugin-tiny-state/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-plugin-tiny-state
[version-url]: https://npmjs.org/package/@jswork/vite-plugin-tiny-state

[license-image]: https://img.shields.io/npm/l/@jswork/vite-plugin-tiny-state
[license-url]: https://github.com/afeiship/vite-plugin-tiny-state/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-plugin-tiny-state
[size-url]: https://github.com/afeiship/vite-plugin-tiny-state/blob/master/dist/index.esm.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-plugin-tiny-state
[download-url]: https://www.npmjs.com/package/@jswork/vite-plugin-tiny-state
