export default function evalJS (script, scope = {}) {
  let scopeDecl = '';
  for (let variable in scope) {
    if (scope.hasOwnProperty(variable)) {
      scopeDecl += 'var ' + variable + ' = __vuerun[\'' + variable + '\'];';
    }
  }
  // 把代码 ES6模块规范 转成 CommonJS模块规范
  script = script.replace('export default', 'module.exports =');
  // 下面是按照原始创建函数的形式组装
  // http://www.w3school.com.cn/js/pro_js_functions_function_object.asp
  script = `(function(exports){var module={};module.exports=exports;${scopeDecl};${script};return module.exports.__esModule?module.exports.default:module.exports;})({})`;
  return new Function('__vuerun', 'return ' + script)(scope) || {}; // eslint-disable-line
}
