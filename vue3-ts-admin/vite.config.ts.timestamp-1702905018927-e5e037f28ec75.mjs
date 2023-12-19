// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/vue3/vue3-ts-admin/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/vue3/vue3-ts-admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import AutoImport from "file:///D:/vue3/vue3-ts-admin/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/vue3/vue3-ts-admin/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/vue3/vue3-ts-admin/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import IconsResolver from "file:///D:/vue3/vue3-ts-admin/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///D:/vue3/vue3-ts-admin/node_modules/unplugin-icons/dist/vite.mjs";
import svgLoader from "file:///D:/vue3/vue3-ts-admin/node_modules/vite-svg-loader/index.js";
import VueSetupExtend from "file:///D:/vue3/vue3-ts-admin/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import vueJsx from "file:///D:/vue3/vue3-ts-admin/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/vue3/vue3-ts-admin/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\vue3\\vue3-ts-admin";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ mode }) => {
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
            prefix: "Icon"
          })
        ],
        // 自动导入 vue 响应式语法
        imports: ["vue"],
        dts: path.resolve(pathSrc, "typings", "auto-imports.d.ts")
        // typings 目录需要手动在src下创建
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 图标自动导入
          IconsResolver({
            enabledCollections: ["ep"]
          })
        ],
        dts: path.resolve(pathSrc, "typings", "components.d.ts")
        // typings 目录需要手动在src下创建
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      // 图标自动导入
      Icons({
        autoInstall: true
      }),
      // * vite 可以使用 jsx/tsx 语法
      vueJsx(),
      // * name 可以写在 script 标签上
      VueSetupExtend(),
      // * vite-svg-loader支持，可以直接引入svg图标当作组件使用
      svgLoader()
    ],
    // 路径别名
    resolve: {
      alias: {
        "@": pathSrc
      }
    },
    // css 预处理器
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    // 开发服务器设置
    server: {
      host: "localhost",
      port: Number(env.VITE_APP_PORT),
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "https://mock.apifox.cn/m1/2869156-0-default",
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/dev-api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2dWUzXFxcXHZ1ZTMtdHMtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHZ1ZTNcXFxcdnVlMy10cy1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdnVlMy92dWUzLXRzLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gXCJ1bnBsdWdpbi1pY29ucy9yZXNvbHZlclwiO1xuaW1wb3J0IEljb25zIGZyb20gXCJ1bnBsdWdpbi1pY29ucy92aXRlXCI7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcbmltcG9ydCBWdWVTZXR1cEV4dGVuZCBmcm9tICd2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5cbi8vIFx1NTZGRVx1NzI0N1x1NEY3Rlx1NzUyOFx1NjgzQ1x1NUYwRjxpLWVwLXh4eCAvPlxuY29uc3QgcGF0aFNyYyA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIC8vIFx1NTJBMFx1OEY3RCBlbnZcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgLy8gZWxlbWVudC1wbHVzIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICAgICAgICAvLyBcdTU2RkVcdTY4MDdcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcbiAgICAgICAgICBJY29uc1Jlc29sdmVyKHtcbiAgICAgICAgICAgIHByZWZpeDogXCJJY29uXCIsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSB2dWUgXHU1NENEXHU1RTk0XHU1RjBGXHU4QkVEXHU2Q0Q1XG4gICAgICAgIGltcG9ydHM6IFtcInZ1ZVwiXSxcbiAgICAgICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aFNyYywgXCJ0eXBpbmdzXCIsIFwiYXV0by1pbXBvcnRzLmQudHNcIiksIC8vIHR5cGluZ3MgXHU3NkVFXHU1RjU1XHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1NzI4c3JjXHU0RTBCXHU1MjFCXHU1RUZBXG4gICAgICB9KSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgICAgICAgLy8gXHU1NkZFXHU2ODA3XHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XG4gICAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgICBlbmFibGVkQ29sbGVjdGlvbnM6IFtcImVwXCJdLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBkdHM6IHBhdGgucmVzb2x2ZShwYXRoU3JjLCBcInR5cGluZ3NcIiwgXCJjb21wb25lbnRzLmQudHNcIiksIC8vIHR5cGluZ3MgXHU3NkVFXHU1RjU1XHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU1NzI4c3JjXHU0RTBCXHU1MjFCXHU1RUZBXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgICAgfSksXG4gICAgICAvLyBcdTU2RkVcdTY4MDdcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcbiAgICAgIEljb25zKHtcbiAgICAgICAgYXV0b0luc3RhbGw6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIC8vICogdml0ZSBcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjgganN4L3RzeCBcdThCRURcdTZDRDVcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgLy8gKiBuYW1lIFx1NTNFRlx1NEVFNVx1NTE5OVx1NTcyOCBzY3JpcHQgXHU2ODA3XHU3QjdFXHU0RTBBXG4gICAgICBWdWVTZXR1cEV4dGVuZCgpLFxuICAgICAgIC8vICogdml0ZS1zdmctbG9hZGVyXHU2NTJGXHU2MzAxXHVGRjBDXHU1M0VGXHU0RUU1XHU3NkY0XHU2M0E1XHU1RjE1XHU1MTY1c3ZnXHU1NkZFXHU2ODA3XHU1RjUzXHU0RjVDXHU3RUM0XHU0RUY2XHU0RjdGXHU3NTI4XG4gICAgICAgc3ZnTG9hZGVyKCksXG4gICAgXSxcbiAgICAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcGF0aFNyYyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBjc3MgXHU5ODg0XHU1OTA0XHU3NDA2XHU1NjY4XG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiIGFzICo7YCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdThCQkVcdTdGNkVcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgICBwb3J0OiBOdW1iZXIoZW52LlZJVEVfQVBQX1BPUlQpLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgW2Vudi5WSVRFX0FQUF9CQVNFX0FQSV06IHtcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9tb2NrLmFwaWZveC5jbi9tMS8yODY5MTU2LTAtZGVmYXVsdFwiLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvZGV2LWFwaS8sIFwiXCIpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVQLFNBQVMsY0FBYyxlQUFlO0FBQzdSLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZUFBZTtBQUN0QixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLFlBQVk7QUFDbkIsU0FBUyw0QkFBNEI7QUFYckMsSUFBTSxtQ0FBbUM7QUFjekMsSUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBRTdDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRXhDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFFdkMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBO0FBQUEsTUFFSixXQUFXO0FBQUEsUUFDVCxXQUFXO0FBQUEsVUFDVCxvQkFBb0I7QUFBQTtBQUFBLFVBRXBCLGNBQWM7QUFBQSxZQUNaLFFBQVE7QUFBQSxVQUNWLENBQUM7QUFBQSxRQUNIO0FBQUE7QUFBQSxRQUVBLFNBQVMsQ0FBQyxLQUFLO0FBQUEsUUFDZixLQUFLLEtBQUssUUFBUSxTQUFTLFdBQVcsbUJBQW1CO0FBQUE7QUFBQSxNQUMzRCxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXO0FBQUEsVUFDVCxvQkFBb0I7QUFBQTtBQUFBLFVBRXBCLGNBQWM7QUFBQSxZQUNaLG9CQUFvQixDQUFDLElBQUk7QUFBQSxVQUMzQixDQUFDO0FBQUEsUUFDSDtBQUFBLFFBQ0EsS0FBSyxLQUFLLFFBQVEsU0FBUyxXQUFXLGlCQUFpQjtBQUFBO0FBQUEsTUFDekQsQ0FBQztBQUFBLE1BQ0QscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLFFBQzFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsTUFBTTtBQUFBLFFBQ0osYUFBYTtBQUFBLE1BQ2YsQ0FBQztBQUFBO0FBQUEsTUFFRCxPQUFPO0FBQUE7QUFBQSxNQUVQLGVBQWU7QUFBQTtBQUFBLE1BRWQsVUFBVTtBQUFBLElBQ2I7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFVBQ25CLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTSxPQUFPLElBQUksYUFBYTtBQUFBLE1BQzlCLE9BQU87QUFBQSxRQUNMLENBQUMsSUFBSSxpQkFBaUIsR0FBRztBQUFBLFVBQ3ZCLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLGNBQWMsRUFBRTtBQUFBLFFBQ2xEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
