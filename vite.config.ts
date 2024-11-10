import { type UserConfig, type ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import path from "path";
import UnoCSS from "unocss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const pathSrc = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // loadEnv:加载.env文件
  // process.cwd():获取当前工作目录的绝对路径
  const env = loadEnv(mode, process.cwd());
  return {
    // 路径别名
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    server: {
      host: "0.0.0.0",
      port: +env.VITE_APP_PORT,
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          target: env.VITE_APP_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        // 要注册的全局导入
        imports: ["vue", "pinia", "vue-router"],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        eslintrc: {
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"], // element-plus图标库
          }),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/components", "src/**/components"],
        dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      UnoCSS({
        /* options */
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    css: {
      // css预处理器
      preprocessorOptions: {
        // 自定义全局css变量
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
  };
});
