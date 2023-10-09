import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App)
//导入element-plus
import ElementPlus from 'element-plus'

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router)
app.use(ElementPlus)
app.mount('#app')
