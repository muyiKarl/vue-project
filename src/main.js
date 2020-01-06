import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入mockjs
import { mockXHR } from '../mock'
mockXHR()

import ElementUI from 'element-ui'; // 引入 element-ui
import 'element-ui/lib/theme-chalk/index.css'; // 引入 element-ui 样式

import './permission'; // router 拦截

import '@/styles/index.scss'; // 引入scss全局样式

// 引入阿里图标
import '@/assets/iconfont/iconfont.js';

/** 
 * 在引入 Element 时，可以传入一个全局配置对象。
 * 该对象目前支持 size 与 zIndex 字段。
 *     size 用于改变组件的默认尺寸
 *     zIndex 设置弹框的初始 z-index（默认值：2000）
*/
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.config.productionTip = false // 阻止显示生产模式的消息

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
