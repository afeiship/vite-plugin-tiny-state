# vite-plugin-tiny-state
> Vite plugin for zero-config auto-discovery and registration of react-tiny-state store modules.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/vite-plugin-tiny-state
```

## usage
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePlugin from '@jswork/vite-plugin-tiny-state';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePlugin()],
  server: {
    host: '0.0.0.0'
  }
});
```

## license
Code released under [the MIT license](https://github.com/afeiship/vite-plugin-tiny-state/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/vite-plugin-tiny-state
[version-url]: https://npmjs.org/package/@jswork/vite-plugin-tiny-state

[license-image]: https://img.shields.io/npm/l/@jswork/vite-plugin-tiny-state
[license-url]: https://github.com/afeiship/vite-plugin-tiny-state/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/vite-plugin-tiny-state
[size-url]: https://github.com/afeiship/vite-plugin-tiny-state/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/vite-plugin-tiny-state
[download-url]: https://www.npmjs.com/package/@jswork/vite-plugin-tiny-state
