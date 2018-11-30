/* eslint-disable */
import Vue from 'vue';
import { objMerge, isEmptyObject, isUndef } from './string';
// 接口基本链接
const path = process.env.API;

function showMessage(msg) {
  Vue.prototype.$zkMessage.danger(msg);
}

function handleFetch(url, options) {
  // url = path + url;
  return fetch(url, options).then(res => {
    return res.json();
  });
}

/**
 * 合并剩余参数
 * @param url
 * @param params
 * @returns {*}
 */
function jointUrl(url, params) {
  let joinStr = '?';
  Object.keys(params).forEach((key) => {
    url += `${joinStr}${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    joinStr = '&';
  });
  return url;
}

/**
 * 当有请求参数时，把参数合并到URL上， 这里提供了url带参数的写法
 * 如：/user/:id/info -> /user/xxx/info
 * @param url
 * @param params
 * @returns {*}
 */
function handleUrl(url, params = {}) {
  if (isEmptyObject(params)) {
    return url;
  }
  // 匹配url中带参数的情况，并删除已匹配的param
  const matchUrlArgs = url.match(/:([^\/]*)/g);
  if (matchUrlArgs && matchUrlArgs.length) {
    const copyParams = { ...params };
    let key, param;
    matchUrlArgs.forEach((arg) => {
      key = arg.substr(1);
      param = copyParams[key];
      if (!isUndef(param)) {
        url = url.replace(arg, encodeURIComponent(param));
        delete copyParams[key];
      }
    });
    url = jointUrl(url, copyParams);
    return url;
  }
  url = jointUrl(url, params);
  return url;
}

/**
 * 处理await 写法
 * @param method
 * @param args
 */
function handleAwait(method, ...args) {
  return this[method](...args).then((data) => {
    if (data.code === 0) {
      return data.data;
    }
    showMessage(data.msg || '接口请求错误。');
    return 'e';
  }).catch((e) => {
    showMessage(e.msg || '接口请求错误。');
  });
}
function getFetchOpts(options) {
  // 合并请求配置
  return objMerge({
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  }, options, true);
}
export function zkFetch (url, options = {}) {
  const initOptions = getFetchOpts(options);
  return {
    /**
     * 获取接口
     * @param params
     */
    get(params) {
      return handleFetch(handleUrl(url, params), { ...initOptions, method: 'get' });
    },
    /**
     * post 接口
     * @param data
     * @param params
     */
    post(data, params) {
      return handleFetch(handleUrl(url, params), { ...initOptions, method: 'post', body: JSON.stringify(data) });
    },
    /**
     * 删除方法
     * @param params
     */
    delete(params) {
      return handleFetch(handleUrl(url, params), { ...initOptions, method: 'delete' });
    },
    /**
     * 修改方法
     * @param data
     * @param params
     */
    put(data, params) {
      return handleFetch(handleUrl(url, params), { ...initOptions, method: 'put', body: JSON.stringify(data) });
    },
    // 下面这些方法是对上面方法的扩展，写法更洁净，并提供错误提示
    /* async fn() {
        const data = await api.postAwait({
          'name': '',
          'password': ''
        });
      }, */
    getAwait(params) {
      return handleAwait.call(this, 'get', params);
    },
    postAwait(data, params) {
      return handleAwait.call(this, 'post', data, params);
    },
    deleteAwait(params) {
      return handleAwait.call(this, 'delete', params);
    },
    putAwait(data, params) {
      return handleAwait.call(this, 'put', data, params);
    }
  };
}
