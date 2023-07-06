// vite.config.js
import path from "path";
import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
 
// 自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
	ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
 
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			// 配置资源路径
			"@/": `${path.resolve(__dirname, "src")}/`,
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// 自定义的主题色
				additionalData: `@use "@/styles/element/index.scss" as *;`,
			},
		},
	},
	plugins: [
		vue(),
		// 自动引入
		AutoImport({
			resolvers: [ElementPlusResolver({
				// 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
				importStyle: "sass",
			})],
		}),
		Components({
			resolvers: [ElementPlusResolver({
				// 自动引入修改主题色添加这一行，使用预处理样式
				importStyle: "sass",
			})],
		})
	],
});