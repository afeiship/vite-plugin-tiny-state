import vitePluginTinyState from '../src';

describe('vitePluginTinyState', () => {
  test('returns plugin object with name and hooks', () => {
    const plugin = vitePluginTinyState();
    expect(plugin.name).toBe('vite-plugin-tiny-state');
    expect(typeof plugin.resolveId).toBe('function');
    expect(typeof plugin.load).toBe('function');
    expect(typeof plugin.transform).toBe('function');
  });

  test('resolves virtual:tiny-state to \0virtual:tiny-state', () => {
    const plugin = vitePluginTinyState();
    const resolveId = plugin.resolveId as any;
    expect(resolveId.call({} as any, 'virtual:tiny-state')).toBe('\0virtual:tiny-state');
    expect(resolveId.call({} as any, 'other-module')).toBeUndefined();
  });

  test('loads virtual module code with default pattern', () => {
    const plugin = vitePluginTinyState();
    const load = plugin.load as any;
    const code = load.call({} as any, '\0virtual:tiny-state');
    expect(code).toContain("import nx from '@jswork/next'");
    expect(code).toContain("import '@jswork/react-tiny-state'");
    expect(code).toContain('import.meta.glob("/src/stores/**/*.ts"');
    expect(code).toContain('nx.$registerStores(modules)');
  });

  test('loads virtual module code with custom pattern', () => {
    const plugin = vitePluginTinyState({ pattern: '/src/stores/m2/**/*.ts' });
    const load = plugin.load as any;
    const code = load.call({} as any, '\0virtual:tiny-state');
    expect(code).toContain('import.meta.glob("/src/stores/m2/**/*.ts"');
  });

  test('autoInjects react-tiny-state and virtual module import into main.tsx', () => {
    const plugin = vitePluginTinyState({ autoInject: true });
    const transform = plugin.transform as any;
    const originalCode = "import React from 'react';";
    const res = transform.call({} as any, originalCode, '/project/src/main.tsx');
    expect(res).toBe("import '@jswork/react-tiny-state';\nimport 'virtual:tiny-state';\n" + originalCode);
  });

  test('does not duplicate import if already present', () => {
    const plugin = vitePluginTinyState({ autoInject: true });
    const transform = plugin.transform as any;
    const codeWithImport = "import 'virtual:tiny-state';\nimport React from 'react';";
    const res = transform.call({} as any, codeWithImport, '/project/src/main.tsx');
    expect(res).toBeUndefined();
  });

  test('skips injection when autoInject is false', () => {
    const plugin = vitePluginTinyState({ autoInject: false });
    const transform = plugin.transform as any;
    const res = transform.call({} as any, "console.log('hi')", '/project/src/main.tsx');
    expect(res).toBeUndefined();
  });
});
