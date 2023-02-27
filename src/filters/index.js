const files = import.meta.globEager('./modules/*.js');
const modules = {}

Object.keys(files).forEach((fileName) => {
    const name = fileName.replace(/\.\/modules\/|\.js/g, '');
    modules[name] = files[fileName].default;
});


console.log("filters", modules)
export default modules