import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router/index.js'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import store from './store'
import mitt from 'mitt'
import filters from "./filters/index";
import { directives } from '@/utils/directives'

const app = createApp(App)
for (let i in Icons) {
    app.component(`eleIcons-${i}`, Icons[i])
}
app.use(store)
app.use(router).use(ElementPlus, { locale })

// 全局注册
directives(app) // 指令
app.config.globalProperties.$mitt = mitt()
app.mount('#app')

console.log("$filters", filters)
// //全局的过滤器
app.config.globalProperties.$filters = {
    ...filters,
};





