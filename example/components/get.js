/**
 * 根据属性，获取元素的样式值
 * @param el  元素
 * @param attr 属性
 * @param pseudoClass 元素伪类
 * @returns {*}
 */
export function getStyle (el, attr, pseudoClass = null) {
  return window.getComputedStyle(el, pseudoClass)[attr];
}

/**
 * 获取属性，并且属性值是数字，而不是字符串
 * @param el 元素
 * @param attr 属性
 * @param pseudoClass 元素伪类
 * @returns {Number}
 */
export function getStyleNumber (el, attr, pseudoClass = null) {
  try {
    const val = getStyle(el, attr, pseudoClass);
    return parseFloat(val);
  } catch (e) {
    console.error(e);
  }
}

export function getWindowSize () {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

export function getElementPointWithId (id) {
  let e = document.getElementById(id);
  const h = e.offsetHeight;
  const w = e.offsetWidth;
  let x = e.offsetLeft;
  let y = e.offsetTop;
  while (e.offsetParent) {
    e = e.offsetParent;
    x += e.offsetLeft;
    y += e.offsetTop;
  }
  return { x, y, h, w };
}
