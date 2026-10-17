import type { Plugin } from 'vite';

export interface TinyStatePluginOptions {
  /**
   * Pattern to glob store modules.
   * Supports single or nested subdirectories (e.g. member/profile.ts).
   * @default '/src/stores/**\/*.ts'
   */
  pattern?: string;
  /**
   * Automatically inject `import 'virtual:tiny-state';` into entry file.
   * @default true
   */
  autoInject?: boolean;
  /**
   * Target entry file path substring to inject virtual module.
   * @default 'src/main.tsx'
   */
  entry?: string;
}

const defaults: TinyStatePluginOptions = {
  pattern: '/src/stores/**/*.ts',
  autoInject: true,
  entry: 'src/main.tsx',
};

export const vitePluginTinyState = (inOptions?: TinyStatePluginOptions): Plugin => {
  const options = {
    ...defaults,
    ...inOptions,
  };

  const virtualModuleId = 'virtual:tiny-state';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;
  const pattern = options.pattern!;
  const autoInject = options.autoInject!;
  const entryPattern = options.entry!;

  return {
    name: 'vite-plugin-tiny-state',

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `
import nx from '@jswork/next';
import '@jswork/react-tiny-state';

const modules = import.meta.glob(${JSON.stringify(pattern)}, { eager: true, import: 'default' });
export const stores = nx.$registerStores(modules);
export default stores;
        `.trim();
      }
    },

    transform(code, id) {
      if (autoInject && id.replace(/\\/g, '/').includes(entryPattern)) {
        if (!code.includes(virtualModuleId)) {
          return `import '${virtualModuleId}';\n` + code;
        }
      }
    },
  };
};

export default vitePluginTinyState;
