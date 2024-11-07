import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

const pathSrc = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  // 路径别名
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // 要注册的全局导入
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
        filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
      },
      dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      // 指定自定义组件位置(默认:src/components)
      dirs: ["src/components", "src/**/components"],
      dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
    }),
  ],
});
