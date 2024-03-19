import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// const modules = {};
// const files = import.meta.globEager('./modules/*.js');
// Object.keys(files).forEach((fileName) => {
//   const name = fileName.replace(/\.\/modules\/|\.js/g, '');
//   modules[name] = files[fileName].default;
// });

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

 