// import { createVuePlugin } from "vite-plugin-vue2";  //vue2的项目
// import requireTransform from 'vite-plugin-require-transform';
// import viteCompression from 'vite-plugin-compression';
// import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
// import px2rem from 'postcss-plugin-px2rem'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { VantResolver } from 'unplugin-vue-components/resolvers';
// const px2remOptions = {
//   rootValue: 19.2,  //换算基数， 默认100 ,也就是1920px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
//   unitPrecision: 2, //允许REM单位增长到的十进制数字，其实就是精度控制
//   // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
//   // propBlackList: [], // 黑名单
//   exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
//    selectorBlackList: [], //要忽略并保留为px的选择器
//   // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
//   // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
//   mediaQuery: false, //（布尔值）允许在媒体查询中转换px
//   minPixelValue: 1  //设置要替换的最小像素值(3px会被转rem)。 默认 0
// }

// const CWD = process.cwd();
export default defineConfig(({ mode }) => {
  return {
    // define: {
    //   'process.env': process.env
    // },
    plugins: [
      vue(),
      AutoImport({   // 注册并使用配置项自动导入vue
        imports: ['vue'],
        dts: 'src/utils/auto-import.d.ts',
        resolvers: [ElementPlusResolver()],    // 路径下自动生成文件夹存放全局指令
      },),
      Components({
        resolvers: [ElementPlusResolver(),],
      }),

      //vue2的项目
      // createVuePlugin({
      //   vueTemplateOptions: {},
      // }),
      // requireTransform({
      //   fileRegex: /.js$|.vue$/
      //   // fileRegex: /.js$|.ts$|.tsx$|.vue$/
      //   //   fileRegex:/.js$|.jsx$|.vue$/
      // }),
      // createStyleImportPlugin({
      //   resolves: [VantResolve()]
      // }),
      // 文件压缩管理
      // viteCompression({
      //   verbose: true,
      //   disable: false,
      //   threshold: 10240, // 大于100k的文件进行压缩
      //   algorithm: 'gzip',
      //   ext: '.gz',
      // }),
    ],
    resolve: {
      extensions: [".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
      alias: [
        {
          find: "@",
          replacement: "/src",
        },
        {
          find: "components",
          replacement: "/src/components",
        },
      ],
    },
    css: {
      // postcss: {
      //   plugins: [px2rem(px2remOptions)]
      // }
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true // require可以使用
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1]
                .split('/')[0].toString();
            }
          }
        }
      },
      cssCodeSplit: true, //  如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      sourcemap: true, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
      target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
      chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
      assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去除console
          drop_debugger: true, // 生产环境去除debugger
        },
      }
    },
    base: './',
    optimizeDeps: {
      // lodash-es 是vite自带的引用，optimizeDeps代表预构建;
      // 默认情况下，不在 node_modules 中的，链接的包不会被预构建,include代表强制预构建
      // include: ['element-plus', 'lodash-es'],
    },
    server: {
      open: false,
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://192.168.1.178',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
    // server: {
    //   host: '0.0.0.0',
    //   port: '8080',
    //   open: true,
    //   cors: true, // 允许跨域
    //   proxy: {
    //     //     '/mdsserver': {
    //     //         target: loadEnv(mode, CWD).VITE_BASE_URL, // 一般都有后面的mdsserver路径，所以去掉。直接用前面的域名就更全面
    //     //         changeOrigin: true,
    //     //         secure: false,
    //     //         rewrite: path => path.replace(/^\/mdsserver/, '') // 重写 api 为 空，就是去掉它
    //     //     },
    //     // '/apinhy': {
    //     //   target: loadEnv(mode, CWD).VITE_BASE_URL,
    //     //   changeOrigin: true,
    //     //   secure: false,
    //     //   rewrite: (path) => path.replace(/^\/apinhy/, '')
    //     // }
    //   }
    // },
    // css: {
    //   preprocessorOptions: {
    //     // 覆盖掉element-plus包中的主题变量文件
    //     scss: {
    //       additionalData: `@use "@/styles/element/index.less" as *;`,
    //     },
    //   },
    // },
  }
})
