import { createStore } from "vuex";
import createPersistedstate from 'vuex-persistedstate'
const modules = {};
const files = import.meta.globEager('./modeules/*.js');
Object.keys(files).forEach((fileName) => {
  const name = fileName.replace(/\.\/modeules\/|\.js/g, '');
  modules[name] = files[fileName].default;
});


export default createStore({
  modules: {
    ...modules,
  },
  plugins: [
    //持久化vuex
    createPersistedstate({
      key: '_store',// 存数据的key名  
      storage: window.sessionStorage,//session储存数据  
      paths: ['router'], // 要把那些模块加入缓存
    })
  ]
});

