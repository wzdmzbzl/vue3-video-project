import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

// 图片使用格式<i-ep-xxx />
const pathSrc = path.resolve(__dirname, "src");

export default defineConfig(({ mode }) => {
  // 加载 env
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      // element-plus 自动导入
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // 图标自动导入
          IconsResolver({
            prefix: "Icon",
          }),
        ],
        // 自动导入 vue 响应式语法
        imports: ["vue"],
        dts: path.resolve(pathSrc, "typings", "auto-imports.d.ts"), // typings 目录需要手动在src下创建
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 图标自动导入
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
        dts: path.resolve(pathSrc, "typings", "components.d.ts"), // typings 目录需要手动在src下创建
      }),
      // 图标自动导入
      Icons({
        autoInstall: true,
      }),
    ],
    // 路径别名
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    // css 预处理器
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    // 开发服务器设置
    server: {
      port: +env.VITE_APP_PORT, // 端口号
      // 代理配置
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://gmall-h5-api.atguigu.cn",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ""),
        },
      },
    },
  };
});
