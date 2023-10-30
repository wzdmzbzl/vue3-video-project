import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import svgLoader from 'vite-svg-loader'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

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
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      // 图标自动导入
      Icons({
        autoInstall: true,
      }),
      // * vite 可以使用 jsx/tsx 语法
      vueJsx(),
      // * name 可以写在 script 标签上
      VueSetupExtend(),
       // * vite-svg-loader支持，可以直接引入svg图标当作组件使用
       svgLoader(),
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
      host: "localhost",
      port: Number(env.VITE_APP_PORT),
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "https://mock.apifox.cn/m1/2869156-0-default",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ""),
        },
      },
    },
  };
});
