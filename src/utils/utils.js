

/**
 * 判断是否为一个JSON
 * @param str
 * @returns {boolean}
 */
export const isJSON = (str) => {
  if (typeof str != 'object') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return true;
};

/**
 * 函数节流
 * @param {Function} doSomething 
 * @param {Number} wait 
 */
export const throttle = (doSomething, wait) => {
  var timeout,
      _this,
      _arguments,
      previous = 0;

  var later = function() {
      previous = +new Date();
      timeout = null;
      doSomething.apply(_this, _arguments);
  };
  var throttled = function() {
      var now = +new Date();
      //下次触发 doSomething 剩余的时间
      var remaining = wait - (now - previous),
          _this = this;
      _arguments = arguments;
      // 如果没有剩余的时间了
      if (remaining <= 0) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          doSomething.apply(_this, _arguments);
      } else if (!timeout) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}


/**
 * json转key=value格式
 * @param param
 * @returns {string}
 */
export const jsonToParams = (param) => {
  let result = "";
  for (let name in param) {
    if (typeof param[name] != 'function') {
      result += "&" + name + "=" + encodeURI(param[name]);
    }
  }
  return result.substring(1)
};

/**
 * 写入cookie
 * @param name
 * @param value
 */
export const setCookie = (name, value) => {
  var Days = 1;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";domain=cp.4399.studio;path=/;expires=" + exp.toGMTString();
};

/**
 * 读取cookie
 * @param name
 * @returns {*}
 */
export const getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};

/**
 * 删除cookie
 * @param name
 */
export const delCookie = (name) => {
  setCookie(name, "");
};


/**
 * 写入sessionStorage
 * @param name
 */
export const setSessionStorage = (key,value) => {
  if(window.sessionStorage){
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * 读取sessionStorage
 * @param name
 */
export const getSessionStorage = (key) => {
  if(window.sessionStorage){
    return window.sessionStorage.getItem(key);
  }
};

/**
 * 删除sessionStorage
 * @param name
 */
export const removeSessionStorage = (key,value) => {
  if(window.sessionStorage){
    return window.sessionStorage.removeItem(key, value);
  }
};

/**
 * 清除sessionStorage
 */
export const clearSessionStorage = () => {
  if(window.sessionStorage){
      window.sessionStorage.clear();
  }
}

/**
 * 写入localStorage
 * @param name
 */
export const setLocalStorage = (key,value) => {
  if(window.localStorage){
      window.localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * 读取localStorage
 * @param name
 */
export const getLocalStorage = (key) => {
  if(window.localStorage){
      return window.localStorage.getItem(key);
  }
}

/**
 * 清楚localStorage
 * @param name
 */
export const clearAllLocalStorage = () => {
  if(window.localStorage){
      window.localStorage.clear();
  }
}

/**
 * 是否是空对象
 * @param {*} obj 
 */
export const isOwnEmpty = (obj) => { 
    for(var name in obj) 
    { 
        if(obj.hasOwnProperty(name)) 
        { 
            return false; 
        } 
    } 
    return true; 
}; 

