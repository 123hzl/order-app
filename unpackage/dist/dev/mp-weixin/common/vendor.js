(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"order-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 108:
/*!**************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/common/uqrcode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //---------------------------------------------------------------------
// github https://github.com/Sansnn/uQRCode
//---------------------------------------------------------------------

var uQRCode = {};

(function () {
  //---------------------------------------------------------------------
  // QRCode for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word "QR Code" is registered trademark of 
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  //---------------------------------------------------------------------
  // QR8bitByte
  //---------------------------------------------------------------------

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }

  QR8bitByte.prototype = {

    getLength: function getLength(buffer) {
      return this.data.length;
    },

    write: function write(buffer) {
      for (var i = 0; i < this.data.length; i++) {
        // not JIS ...
        buffer.put(this.data.charCodeAt(i), 8);
      }
    } };


  //---------------------------------------------------------------------
  // QRCode
  //---------------------------------------------------------------------

  function QRCode(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = new Array();
  }

  QRCode.prototype = {

    addData: function addData(data) {
      var newData = new QR8bitByte(data);
      this.dataList.push(newData);
      this.dataCache = null;
    },

    isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
        throw new Error(row + "," + col);
      }
      return this.modules[row][col];
    },

    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },

    make: function make() {
      // Calculate automatically typeNumber if provided is < 1
      if (this.typeNumber < 1) {
        var typeNumber = 1;
        for (typeNumber = 1; typeNumber < 40; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

          var buffer = new QRBitBuffer();
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }

          for (var i = 0; i < this.dataList.length; i++) {
            var data = this.dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8)
          break;
        }
        this.typeNumber = typeNumber;
      }
      this.makeImpl(false, this.getBestMaskPattern());
    },

    makeImpl: function makeImpl(test, maskPattern) {

      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);

      for (var row = 0; row < this.moduleCount; row++) {

        this.modules[row] = new Array(this.moduleCount);

        for (var col = 0; col < this.moduleCount; col++) {
          this.modules[row][col] = null; //(col + row) % 3;
        }
      }

      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);

      if (this.typeNumber >= 7) {
        this.setupTypeNumber(test);
      }

      if (this.dataCache == null) {
        this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      }

      this.mapData(this.dataCache, maskPattern);
    },

    setupPositionProbePattern: function setupPositionProbePattern(row, col) {

      for (var r = -1; r <= 7; r++) {

        if (row + r <= -1 || this.moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c++) {

          if (col + c <= -1 || this.moduleCount <= col + c) continue;

          if (0 <= r && r <= 6 && (c == 0 || c == 6) ||
          0 <= c && c <= 6 && (r == 0 || r == 6) ||
          2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },

    getBestMaskPattern: function getBestMaskPattern() {

      var minLostPoint = 0;
      var pattern = 0;

      for (var i = 0; i < 8; i++) {

        this.makeImpl(true, i);

        var lostPoint = QRUtil.getLostPoint(this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }

      return pattern;
    },

    createMovieClip: function createMovieClip(target_mc, instance_name, depth) {

      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
      var cs = 1;

      this.make();

      for (var row = 0; row < this.modules.length; row++) {

        var y = row * cs;

        for (var col = 0; col < this.modules[row].length; col++) {

          var x = col * cs;
          var dark = this.modules[row][col];

          if (dark) {
            qr_mc.beginFill(0, 100);
            qr_mc.moveTo(x, y);
            qr_mc.lineTo(x + cs, y);
            qr_mc.lineTo(x + cs, y + cs);
            qr_mc.lineTo(x, y + cs);
            qr_mc.endFill();
          }
        }
      }

      return qr_mc;
    },

    setupTimingPattern: function setupTimingPattern() {

      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
      }

      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {
          continue;
        }
        this.modules[6][c] = c % 2 == 0;
      }
    },

    setupPositionAdjustPattern: function setupPositionAdjustPattern() {

      var pos = QRUtil.getPatternPosition(this.typeNumber);

      for (var i = 0; i < pos.length; i++) {

        for (var j = 0; j < pos.length; j++) {

          var row = pos[i];
          var col = pos[j];

          if (this.modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r++) {

            for (var c = -2; c <= 2; c++) {

              if (r == -2 || r == 2 || c == -2 || c == 2 ||
              r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },

    setupTypeNumber: function setupTypeNumber(test) {

      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      }

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },

    setupTypeInfo: function setupTypeInfo(test, maskPattern) {

      var data = this.errorCorrectLevel << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);

      // vertical		
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
      }

      // horizontal
      for (var i = 0; i < 15; i++) {

        var mod = !test && (bits >> i & 1) == 1;

        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }

      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;

    },

    mapData: function mapData(data, maskPattern) {

      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;

      for (var col = this.moduleCount - 1; col > 0; col -= 2) {

        if (col == 6) col--;

        while (true) {

          for (var c = 0; c < 2; c++) {

            if (this.modules[row][col - c] == null) {

              var dark = false;

              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }

              var mask = QRUtil.getMask(maskPattern, row, col - c);

              if (mask) {
                dark = !dark;
              }

              this.modules[row][col - c] = dark;
              bitIndex--;

              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }

    } };



  QRCode.PAD0 = 0xEC;
  QRCode.PAD1 = 0x11;

  QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {

    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

    var buffer = new QRBitBuffer();

    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
      data.write(buffer);
    }

    // calc num max data.
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalDataCount += rsBlocks[i].dataCount;
    }

    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
      buffer.getLengthInBits() +
      ">" +
      totalDataCount * 8 +
      ")");
    }

    // end code
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD0, 8);

      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(QRCode.PAD1, 8);
    }

    return QRCode.createBytes(buffer, rsBlocks);
  };

  QRCode.createBytes = function (buffer, rsBlocks) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

      var dcCount = rsBlocks[r].dataCount;
      var ecCount = rsBlocks[r].totalCount - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
      }

    }

    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) {
      totalCodeCount += rsBlocks[i].totalCount;
    }

    var data = new Array(totalCodeCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  };

  //---------------------------------------------------------------------
  // QRMode
  //---------------------------------------------------------------------

  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3 };


  //---------------------------------------------------------------------
  // QRErrorCorrectLevel
  //---------------------------------------------------------------------

  var QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2 };


  //---------------------------------------------------------------------
  // QRMaskPattern
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };


  //---------------------------------------------------------------------
  // QRUtil
  //---------------------------------------------------------------------

  var QRUtil = {

    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],


    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,

    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },

    getBCHDigit: function getBCHDigit(data) {

      var digit = 0;

      while (data != 0) {
        digit++;
        data >>>= 1;
      }

      return digit;
    },

    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask: function getMask(maskPattern, i, j) {

      switch (maskPattern) {

        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;

        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },

    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {

      var a = new QRPolynomial([1], 0);

      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }

      return a;
    },

    getLengthInBits: function getLengthInBits(mode, type) {

      if (1 <= type && type < 10) {

        // 1 - 9

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 27) {

        // 10 - 26

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + mode);}


      } else if (type < 41) {

        // 27 - 40

        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + mode);}


      } else {
        throw new Error("type:" + type);
      }
    },

    getLostPoint: function getLostPoint(qrCode) {

      var moduleCount = qrCode.getModuleCount();

      var lostPoint = 0;

      // LEVEL1

      for (var row = 0; row < moduleCount; row++) {

        for (var col = 0; col < moduleCount; col++) {

          var sameCount = 0;
          var dark = qrCode.isDark(row, col);

          for (var r = -1; r <= 1; r++) {

            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }

            for (var c = -1; c <= 1; c++) {

              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }

              if (r == 0 && c == 0) {
                continue;
              }

              if (dark == qrCode.isDark(row + r, col + c)) {
                sameCount++;
              }
            }
          }

          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }

      // LEVEL2

      for (var row = 0; row < moduleCount - 1; row++) {
        for (var col = 0; col < moduleCount - 1; col++) {
          var count = 0;
          if (qrCode.isDark(row, col)) count++;
          if (qrCode.isDark(row + 1, col)) count++;
          if (qrCode.isDark(row, col + 1)) count++;
          if (qrCode.isDark(row + 1, col + 1)) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }

      // LEVEL3

      for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount - 6; col++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row, col + 1) &&
          qrCode.isDark(row, col + 2) &&
          qrCode.isDark(row, col + 3) &&
          qrCode.isDark(row, col + 4) &&
          !qrCode.isDark(row, col + 5) &&
          qrCode.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount - 6; row++) {
          if (qrCode.isDark(row, col) &&
          !qrCode.isDark(row + 1, col) &&
          qrCode.isDark(row + 2, col) &&
          qrCode.isDark(row + 3, col) &&
          qrCode.isDark(row + 4, col) &&
          !qrCode.isDark(row + 5, col) &&
          qrCode.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }

      // LEVEL4

      var darkCount = 0;

      for (var col = 0; col < moduleCount; col++) {
        for (var row = 0; row < moduleCount; row++) {
          if (qrCode.isDark(row, col)) {
            darkCount++;
          }
        }
      }

      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;

      return lostPoint;
    } };




  //---------------------------------------------------------------------
  // QRMath
  //---------------------------------------------------------------------

  var QRMath = {

    glog: function glog(n) {

      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }

      return QRMath.LOG_TABLE[n];
    },

    gexp: function gexp(n) {

      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return QRMath.EXP_TABLE[n];
    },

    EXP_TABLE: new Array(256),

    LOG_TABLE: new Array(256) };



  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^
    QRMath.EXP_TABLE[i - 5] ^
    QRMath.EXP_TABLE[i - 6] ^
    QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }

  //---------------------------------------------------------------------
  // QRPolynomial
  //---------------------------------------------------------------------

  function QRPolynomial(num, shift) {

    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  QRPolynomial.prototype = {

    get: function get(index) {
      return this.num[index];
    },

    getLength: function getLength() {
      return this.num.length;
    },

    multiply: function multiply(e) {

      var num = new Array(this.getLength() + e.getLength() - 1);

      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }

      return new QRPolynomial(num, 0);
    },

    mod: function mod(e) {

      if (this.getLength() - e.getLength() < 0) {
        return this;
      }

      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));

      var num = new Array(this.getLength());

      for (var i = 0; i < this.getLength(); i++) {
        num[i] = this.get(i);
      }

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }

      // recursive call
      return new QRPolynomial(num, 0).mod(e);
    } };


  //---------------------------------------------------------------------
  // QRRSBlock
  //---------------------------------------------------------------------

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }

  QRRSBlock.RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4		
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7		
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10		
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {

    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
    }

    var length = rsBlock.length / 3;

    var list = new Array();

    for (var i = 0; i < length; i++) {

      var count = rsBlock[i * 3 + 0];
      var totalCount = rsBlock[i * 3 + 1];
      var dataCount = rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        list.push(new QRRSBlock(totalCount, dataCount));
      }
    }

    return list;
  };

  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {

    switch (errorCorrectLevel) {
      case QRErrorCorrectLevel.L:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectLevel.M:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectLevel.Q:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectLevel.H:
        return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return undefined;}

  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------

  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }

  QRBitBuffer.prototype = {

    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    },

    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    },

    getLengthInBits: function getLengthInBits() {
      return this.length;
    },

    putBit: function putBit(bit) {

      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }

      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }

      this.length++;
    } };


  //---------------------------------------------------------------------
  // Support Chinese
  //---------------------------------------------------------------------
  function utf16To8(text) {
    var result = '';
    var c;
    for (var i = 0; i < text.length; i++) {
      c = text.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007F) {
        result += text.charAt(i);
      } else if (c > 0x07FF) {
        result += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
        result += String.fromCharCode(0x80 | c >> 6 & 0x3F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      } else {
        result += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
        result += String.fromCharCode(0x80 | c >> 0 & 0x3F);
      }
    }
    return result;
  }

  uQRCode = {

    defaults: {
      size: 258,
      margin: 0,
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      fileType: 'png', // 'jpg', 'png'
      correctLevel: 3,
      typeNumber: -1 },


    make: function make(options) {
      var defaultOptions = {
        canvasId: options.canvasId,
        componentInstance: options.componentInstance,
        text: options.text,
        size: this.defaults.size,
        margin: this.defaults.margin,
        backgroundColor: this.defaults.backgroundColor,
        foregroundColor: this.defaults.foregroundColor,
        fileType: this.defaults.fileType,
        correctLevel: this.defaults.correctLevel,
        typeNumber: this.defaults.typeNumber };

      if (options) {
        for (var i in options) {
          defaultOptions[i] = options[i];
        }
      }
      options = defaultOptions;
      if (!options.canvasId) {
        console.error('uQRCode: Please set canvasId!');
        return;
      }

      function createCanvas() {
        var qrcode = new QRCode(options.typeNumber, options.correctLevel);
        qrcode.addData(utf16To8(options.text));
        qrcode.make();

        var ctx = uni.createCanvasContext(options.canvasId, options.componentInstance);
        ctx.setFillStyle(options.backgroundColor);
        ctx.fillRect(0, 0, options.size, options.size);

        var tileW = (options.size - options.margin * 2) / qrcode.getModuleCount();
        var tileH = tileW;

        for (var row = 0; row < qrcode.getModuleCount(); row++) {
          for (var col = 0; col < qrcode.getModuleCount(); col++) {
            var style = qrcode.isDark(row, col) ? options.foregroundColor : options.backgroundColor;
            ctx.setFillStyle(style);
            var x = Math.round(col * tileW) + options.margin;
            var y = Math.round(row * tileH) + options.margin;
            var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
            var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
            ctx.fillRect(x, y, w, h);
          }
        }

        setTimeout(function () {
          ctx.draw(false, function () {
            setTimeout(function () {
              uni.canvasToTempFilePath({
                canvasId: options.canvasId,
                fileType: options.fileType,
                width: options.size,
                height: options.size,
                destWidth: options.size,
                destHeight: options.size,
                success: function success(res) {
                  options.success && options.success(res.tempFilePath);
                },
                fail: function fail(error) {
                  options.fail && options.fail(error);
                },
                complete: function complete(res) {
                  options.complete && options.complete(res);
                } },
              options.componentInstance);
            }, options.text.length + 100);
          });
        }, 150);
      }

      createCanvas();
    } };



})();var _default =

uQRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 11:
/*!***********************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/store/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

//为了方便测试，此处用vuex做全局数据
var store = new _vuex.default.Store({
  state: {
    userInfo: {},
    isLogin: false,
    orderType: 'takein',
    addresses: [{
      "id": 1,
      "user_id": 1,
      "name": "梁先生",
      "phone": "18666610100",
      "gender": 0,
      "address": "有间大厦",
      "complete_address": "广东省深圳市宝安区福海大道118号",
      "description": "ABC1234",
      "latitude": "",
      "longitude": "",
      "is_default": 1 }],

    address: {},
    remark: '不打包' },

  mutations: {
    SET_ORDER_TYPE: function SET_ORDER_TYPE(state, orderType) {
      state.orderType = orderType;
    },
    SET_ADDRESS: function SET_ADDRESS(state, address) {
      state.address = address;
    },
    SET_REMARK: function SET_REMARK(state, remark) {
      state.remark = remark;
    },
    SET_USERINFO: function SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SET_ISLOGIN: function SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    } } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 13:
/*!*********************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _categories = _interopRequireDefault(__webpack_require__(/*! ./categories.js */ 14));
var _orders = _interopRequireDefault(__webpack_require__(/*! ./orders.js */ 15));
var _storeOrders = _interopRequireDefault(__webpack_require__(/*! ./storeOrders.js */ 16));
var _boardcast = _interopRequireDefault(__webpack_require__(/*! ./boardcast.js */ 17));
var _mart = _interopRequireDefault(__webpack_require__(/*! ./mart.js */ 18));
var _productList = _interopRequireDefault(__webpack_require__(/*! ./productList.js */ 19));
var _notices = _interopRequireDefault(__webpack_require__(/*! ./notices.js */ 20));
var _productDetail = _interopRequireDefault(__webpack_require__(/*! ./productDetail.js */ 21));
var _scores = _interopRequireDefault(__webpack_require__(/*! ./scores.js */ 22));
var _martDetail = _interopRequireDefault(__webpack_require__(/*! ./martDetail.js */ 23));
var _hotSearch = _interopRequireDefault(__webpack_require__(/*! ./hotSearch.js */ 24));
var _historySearch = _interopRequireDefault(__webpack_require__(/*! ./historySearch.js */ 25));
var _orderDetail = _interopRequireDefault(__webpack_require__(/*! ./orderDetail.js */ 26));
var _giftCards = _interopRequireDefault(__webpack_require__(/*! ./giftCards.js */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var json = {
  categories: _categories.default,
  orders: _orders.default,
  storeOrders: _storeOrders.default,
  boardcast: _boardcast.default,
  mart: _mart.default,
  productList: _productList.default,
  notices: _notices.default,
  productDetail: _productDetail.default,
  scores: _scores.default,
  martDetail: _martDetail.default,
  hotSearch: _hotSearch.default,
  historySearch: _historySearch.default,
  orderDetail: _orderDetail.default,
  giftCards: _giftCards.default };var _default =


function _default(name) {var loading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (loading) {
    uni.showLoading();
  }

  return new Promise(function (resolve) {
    setTimeout(function () {
      uni.hideLoading();
      resolve(json[name]);
    }, 500);
  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/categories.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [
{
  "id": 20,
  "name": "喜茶食验室",
  "sort": 1,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/f77f2e333a34410384c21da48e138599.jpg",
  "products": [
  {
    "id": 932,
    "name": "芝芝莓莓 ®",
    "no": "2002285591289050",
    "description": "冷670ml 热500ml 人气Top3 选用定製士多啤梨配搭清幽绿妍茶底新鲜现打，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 150527,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/fbcdfbd39c6548b185c1d0eef790808d.jpg" },

    {
      "id": 117035,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/66a64d27c2504838851ce69f2a901326.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/e75452c0d57443be87fdbe9b1dd61da5.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "0糖低卡甜菊糖",
      "values": [
      {
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "加料",
      "values": [
      {
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true },

      {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false },

      {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "冰量",
      "values": [
      {
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false },

      {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "甜度",
      "values": [
      {
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "茶底",
      "values": [
      {
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "口味",
      "values": [
      {
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false },

      {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 1061,
    "name": "未来肉芝士堡",
    "no": "2005095380168625",
    "description": "选用星期零植物基未来肉打造，每100克未来肉含17.1克蛋白质与5.5克膳食纤维，热量仅为真牛肉的51%，叠加干酪片与青节瓜，突破食界，品尝未来。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 153382,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/24/5ba38e1966334ff9af2ee27e1a803497.jpg" },

    {
      "id": 147238,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/88d10a251f5841a185101aaccfa7952e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 16,
      "name": "含小麦、大豆",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 22,
      "name": "含乳制品、蛋",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 22.12 },

  {
    "id": 1036,
    "name": "混坚果",
    "no": "2004238677566283",
    "description": "喜茶首款混合坚果，1盒内含3种口味：日式芥末、酥脆海苔、麻辣火锅。精选越南大颗腰果、美国加州巴旦木仁与土耳其榛子仁，独特喷淋技术，保证颗颗够味。自然慢焙烘烤，零人工添加色素与防腐剂。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 141992,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/01/7bf2447422bf4acb95b1a82366eeba34.jpg" },

    {
      "id": 139423,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/c2bf42835baf453d8987afa54e796f0e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2349,
      "name": "混坚果",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 80,
      "name": "含坚果、大豆及乳制品",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 81,
      "name": "含小麦制品、虾制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30 },

  {
    "id": 1033,
    "name": "夹心小方(咸蛋黄味)",
    "no": "2004204939030796",
    "description": "10片/盒，每片均为独立小包装。2.0新升级，甜度更低。咸蛋黄饼皮搭配浓郁原味夹心，一口吃下奶香和咸蛋黄相互交织，甜而不腻。精选美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 145005,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/b796c7a8edd44e7e968745cb63eae3a2.jpg" },

    {
      "id": 137571,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/882651cb064e4326b4b73c57cadbf8b8.jpg" },

    {
      "id": 137572,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/401a0054f6d040709b316d2c23c7b3c2.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2336,
      "name": "夹心小方(咸蛋黄味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45 },

  {
    "id": 1031,
    "name": "夹心小方(芝士味)",
    "no": "2004208719981465",
    "description": "10片/盒，每片均为独立小包装。全新口味登场，喜茶经典芝士化身浓郁芝香夹心，每一口都是浓浓芝士味。精选丹麦深加工芝士与美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 145004,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/9d1f23859ef0495aade6cbe0d46c492b.jpg" },

    {
      "id": 137566,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/43b09ca3b38a4c08a0b6ad142d1ad2ed.jpg" },

    {
      "id": 137567,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/8c4264b660714a70bda5f13e92c04377.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2334,
      "name": "夹心小方(芝士味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45 },

  {
    "id": 1032,
    "name": "夹心小方(金凤味)",
    "no": "2004202778423181",
    "description": "10片/盒，每片均为独立小包装。2.0新升级，甜度更低。金凤茶叶原叶研磨成焙香茶粉，融入饼皮和夹心，炭焙乌龙口感清新。精选美国进口巴旦木粉，健康食材，吃得放心。购买2盒/3盒夹心小方，默认搭配二合一/三合一的组合装腰封。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 145006,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/cf932ed0413a42b9a4a59aac686db19b.jpg" },

    {
      "id": 137569,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/9c35d5aa21d44791bbd2b7bad308f256.jpg" },

    {
      "id": 137570,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/21/6a6b02329cd64ddfa1c2ab87dfb0d209.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2335,
      "name": "夹心小方(金凤味)",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 92,
      "name": "乳及坚果制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "45",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 42.45 },

  {
    "id": 985,
    "name": "黑糖波波希腊酸奶",
    "no": "2003226159266660",
    "description": "黑糖脆波波与希腊酸奶灵感碰撞，酸奶部分无糖。选用100%生牛乳发酵，零添加色素、明胶，每100克含7.7克优质蛋白质，且仅含1.4克脂肪。建议将定制草莓燕麦片加入酸奶后大力搅匀整杯一起食用。酸奶保质期较短，请尽快食用。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 126120,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/ecd4f6fcfdb8406ab297607c517b9790.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 93,
      "name": "含乳、燕麦、南瓜子仁",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 1334,
        "name": "需要餐具",
        "price": "0",
        "is_selected": 1 },

      {
        "id": 1335,
        "name": "不需要一次性餐具",
        "price": "0",
        "is_selected": 0 }] }],




    "is_premade": "1",
    "remark": "酸奶",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81 },

  {
    "id": 986,
    "name": "蓝莓希腊酸奶",
    "no": "2003234480984193",
    "description": "加拿大野生蓝莓融入希腊酸奶，酸奶部分无糖。选用100%生牛乳发酵，零添加色素和明胶，每100克含7.7克优质蛋白质，且仅含1.4克脂肪。建议将定制草莓燕麦片加入酸奶后大力搅匀整杯一起食用。酸奶保质期较短，请尽快食用。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [
    {
      "id": 126119,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/ab0773906b3646278a84fe3dfaa759e9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 93,
      "name": "含乳、燕麦、南瓜子仁",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 1334,
        "name": "需要餐具",
        "price": "0",
        "is_selected": 1 },

      {
        "id": 1335,
        "name": "不需要一次性餐具",
        "price": "0",
        "is_selected": 0 }] }],




    "is_premade": "1",
    "remark": "酸奶",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81 },

  {
    "id": 967,
    "name": "芋泥咸蛋黄米面包",
    "no": "2003087530550002",
    "description": "喜茶首款“大米面包”，减油减糖低热量。以大米粉代替部分小麦粉制作为松软米面包，内馅中加入咸蛋黄和芋泥，美味与饱腹兼备。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 9,
    "images": [
    {
      "id": 119991,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/08/df694d96fb574658b11cde291aee699b.jpg" },

    {
      "id": 121237,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/50d442e74263480580861b2ba99db4b6.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 46,
      "name": "含小麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 11.50 },

  {
    "id": 966,
    "name": "紫米紫薯米面包",
    "no": "2003089320320200",
    "description": "喜茶首款“大米面包”，减油减糖低热量。以大米粉代替部分小麦粉制作为松软米面包，内馅中加入紫米紫薯两种杂粮，营养更均衡。",
    "label": "",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 10,
    "images": [
    {
      "id": 119992,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/08/08e8693f93db4152a16365469509c346.jpg" },

    {
      "id": 121238,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/d0674101531d4140b530fbb23bb0e458.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 11.50 },

  {
    "id": 188,
    "name": "芋泥糯米糍",
    "no": "1905258507239912",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯米糍外皮Q弹软韧，绵柔的芋泥内馅中带着细密颗粒感。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 14,
    "images": [
    {
      "id": 2958,
      "url": "https://go.cdn.heytea.com/storage/products/2018/12/07/D26Q9kO7a2ctt3ApN39vVuZNMa7OhjX6afuAScUg.jpg" },

    {
      "id": 121296,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/672cdb1e78b64cba9c7bd26192f7069c.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 818,
      "name": "芋泥糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 100,
      "name": "含乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96 },

  {
    "id": 522,
    "name": "布蕾糯米糍",
    "no": "1908077847471771",
    "description": "下单后不用等待叫号，直接出示给店员领取。Q弹冰爽的糯米糍裹入口即化的法式布蕾，满口留香。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 15,
    "images": [
    {
      "id": 65894,
      "url": "https://go.cdn.heytea.com/product/2019/08/08/tmp/abfbe602452f4b9c8143c732b4b99f78.jpg" },

    {
      "id": 121292,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/3105afea13424d76b54cfdd01332aec3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1391,
      "name": "布蕾糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 90,
      "name": "含蛋、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96 },

  {
    "id": 444,
    "name": "芒果糯米糍",
    "no": "1906114107951144",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯香外皮裹入大块芒果果肉，真材实料，芒香四溢。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 16,
    "images": [
    {
      "id": 51963,
      "url": "https://go.cdn.heytea.com/product/2019/06/11/tmp/534fc9ec25414764b3aa479b44549a1c.jpg" },

    {
      "id": 121295,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/182cb5f3f04d41b3ac32146dbf38e1a9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1246,
      "name": "芒果糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62 },

  {
    "id": 187,
    "name": "榴莲糯米糍",
    "no": "1905254929085716",
    "description": "下单后不用等待叫号，直接出示给店员领取。糯米糍外皮Q弹软韧，榴莲蓉内馅顺滑，浓郁中带有淡淡奶香。",
    "label": "糯米糍",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 17,
    "images": [
    {
      "id": 88395,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/339aab7f76e24296b1e716fab785c5bb.jpg" },

    {
      "id": 121293,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/7579079c0b0a4d7d8b464c3321e8f767.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 817,
      "name": "榴莲糯米糍",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 100,
      "name": "含乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "18",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 15.93 },

  {
    "id": 736,
    "name": "日式海盐牛角",
    "no": "1911120202609824",
    "description": "加入黄油烘焙的牛角包更加香酥，表面撒上些许海盐提香提味。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 18,
    "images": [
    {
      "id": 88571,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/13/f26206a42b2b48c38bef58c795d30e3a.jpg" },

    {
      "id": 121234,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/f09ec6f23c3543619731b1c37c9e790c.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 7.96 },

  {
    "id": 161,
    "name": "流沙牛角",
    "no": "1812135249995598",
    "description": "下单后不用等待叫号，直接出示给店员领取。在酥脆的牛角中注入咸蛋黄流沙，黄油甜香中带有粗颗粒的微咸，层次丰富，满口留香。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 19,
    "images": [
    {
      "id": 88364,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/5ad4996d0fdd4f3a85a25b8fe95a4db8.jpg" },

    {
      "id": 121233,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/78ad5460e80d4587a8f07abc4baf76e9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "温度",
    "is_enable": 1,
    "price": "10",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8.85 },

  {
    "id": 735,
    "name": "芋泥牛角",
    "no": "1911125473384653",
    "description": "软绵绵的芋泥填入松脆牛角包，带来双重满足口感。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 20,
    "images": [
    {
      "id": 88568,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/13/e479684b39db4cfea36e31c6e434ccd7.jpg" },

    {
      "id": 121241,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/979ca41d0238481ea7c3a7cb73335bd1.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62 },

  {
    "id": 534,
    "name": "法式布蕾牛角",
    "no": "1908125985893028",
    "description": "烤至酥脆的牛角中注入酸甜芝士布蕾，满口留香。（芝士奶酸味属正常口感）",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 21,
    "images": [
    {
      "id": 66925,
      "url": "https://go.cdn.heytea.com/product/2019/08/12/tmp/b297da7e150e46cc98c2138a290c9fb4.jpg" },

    {
      "id": 121231,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/1e1a115b801d439281790230bcfaeb0c.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 91,
      "name": "含麦、蛋、坚果",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "10",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8.85 },

  {
    "id": 535,
    "name": "海苔肉酥牛角",
    "no": "1908128591156037",
    "description": "酥脆的海苔肉酥铺满整只牛角包，芝士奶油醇香柔滑。",
    "label": "牛角",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 22,
    "images": [
    {
      "id": 66934,
      "url": "https://go.cdn.heytea.com/product/2019/08/12/tmp/d5ebe688cd0b4f8d922505aac18a6fcb.jpg" },

    {
      "id": 121232,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/a16f9bf3635e4875be1507a598d10ecc.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 10.62 },

  {
    "id": 316,
    "name": "咸蛋黄千层吐司",
    "no": "1903059853995257",
    "description": "下单后不用等待叫号，直接出示给店员领取。咸香蛋黄与奶香吐司层层交织，带来极度细腻的口感体验。",
    "label": "吐司",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 23,
    "images": [
    {
      "id": 23974,
      "url": "https://go.cdn.heytea.com/storage/products/2019/03/07/VJeeKv4CvYLoPhgFedawCrao1BfjTF2nNZ46ucKA.jpg" },

    {
      "id": 121290,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/f6acd196783c4d4c8cc6e41eaed3062a.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1039,
      "name": "咸蛋黄千层吐司",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [
    {
      "id": 87,
      "name": "含麦制品、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "24",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 21.24 },

  {
    "id": 159,
    "name": "小芋头条",
    "no": "1812139850535155",
    "description": "下单后不用等待叫号，直接出示给店员领取。来自喜茶热麦颇受欢迎的芋头条，现调整为适合一人食的分量，依然内馅饱满，与软韧的面包体默契相融。",
    "label": "小芋头条",
    "category_id": 20,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 24,
    "images": [
    {
      "id": 88366,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/2bed4fc9c2fe4d61a1ffd7d7835594b7.jpg" },

    {
      "id": 121240,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/25ea4c4d3db44e0bae3b080a18f24a69.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 99,
      "name": "含小麦、乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "状态",
      "values": [
      {
        "id": 1340,
        "name": "加热(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 1341,
        "name": "常温",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "1",
    "remark": "温度",
    "is_enable": 1,
    "price": "15",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 13.27 },

  {
    "id": 1064,
    "name": "太妃焦糖爆米花",
    "no": "2005127848825331",
    "description": "精选爆裂玉米与新西兰进口黄油炒制，每一条缝隙都填满太妃焦糖甜香，不含反式脂肪酸，0防腐剂。",
    "label": "",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 150037,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/6def2c810a5c4d1a80912ffad47f3162.jpg" },

    {
      "id": 150038,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/99f43d68f57c4278b62e5354510223c3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2406,
      "name": "太妃焦糖爆米花",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 102,
      "name": "含大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 0,
    "price": "12",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 11.32 },

  {
    "id": 836,
    "name": "火腿蛋可颂脆堡",
    "no": "1912251537314614",
    "description": "可颂面包夹入大块烟熏火腿与原味蛋饼，车打芝士更添浓郁奶香。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 11,
    "images": [
    {
      "id": 110948,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/41041a1dba3243c1859bfba0615d3797.jpg" },

    {
      "id": 121298,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/48db64dea6fa4c4b99ae3a005be469c9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 94,
      "name": "含小麦、燕麦、蛋",
      "type": 0,
      "label_color": "#BABABA" },

    {
      "id": 95,
      "name": "乳及大豆制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81 },

  {
    "id": 838,
    "name": "熏鸡芝士蛋三明治",
    "no": "1912253512109898",
    "description": "烟熏鸡肉混搭鸡蛋色拉与车打芝士，每一口都十足有料。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 12,
    "images": [
    {
      "id": 110950,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/9b8969a8830a485c945b2e5e353f20dc.jpg" },

    {
      "id": 121299,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/127cadc6fe59432390db87caf2fa2b68.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 96,
      "name": "含小麦、蛋、乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 16.81 },

  {
    "id": 837,
    "name": "芝芝火腿可颂",
    "no": "1912257503138775",
    "description": "烘烤至酥脆的酥香可颂，内夹烟熏火腿和车打芝士，满口留香。",
    "label": "可颂",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 13,
    "images": [
    {
      "id": 110949,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/9b90d1cb46ed434d836352e1bdd9245e.jpg" },

    {
      "id": 121300,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/7f8cca1df210430fa3375f650209a91d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 97,
      "name": "含小麦、乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "鲜食",
    "is_enable": 0,
    "price": "18",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 15.93 },

  {
    "id": 617,
    "name": "冷萃桂花绿",
    "no": "1909306163749525",
    "description": "冷萃茶不用等待叫号，可直接向店员出示后领取。细嫩茶芽与桂花一同于冷露中舒展沐浴八小时，制得茶汤清黄透亮，滋味鲜爽。",
    "label": "冷萃",
    "category_id": 20,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 25,
    "images": [
    {
      "id": 79221,
      "url": "https://go.cdn.heytea.com/product/2019/10/01/tmp/9d41fd6573ab49ab8eeb71b2746c0ba4.jpg" },

    {
      "id": 116975,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/7dcb32e0d8f047678447e7c30064c030.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1515,
      "name": "冷萃桂花绿",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "国内-喜茶实验室",
    "is_enable": 0,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49 }],


  "categoryAds": [] },

{
  "id": 12,
  "name": "当季限定",
  "sort": 2,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/05/02/c9d862a735af48d280ab8b21a2315514.jpg",
  "products": [
  {
    "id": 421,
    "name": "芝芝桃桃",
    "no": "1906061363116531",
    "description": "冷670ml 热500ml 精选当季水蜜桃+NFC桃汁（100%非浓缩还原桃汁）搭配金玉茶底制作而成，不使用任何香精等添加剂，不使用任何罐头水果。粉色为火龙果天然调色。若有小黑点，是火龙果籽，可放心食用。",
    "label": "",
    "category_id": 12,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 147227,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/f00875e937244d3188f462e43c21170a.jpg" },

    {
      "id": 139431,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/c846a8fc574146ccad2f9a7581a692ef.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "0糖低卡甜菊糖",
      "values": [
      {
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "加料",
      "values": [
      {
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true },

      {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false },

      {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "冰量",
      "values": [
      {
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false },

      {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "甜度",
      "values": [
      {
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "茶底",
      "values": [
      {
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "口味",
      "values": [
      {
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false },

      {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "0",
    "remark": "大陆普通",
    "is_enable": 1,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30 },

  {
    "id": 1037,
    "name": "多肉杨梅",
    "no": "2004238175994068",
    "description": "冷670ml 精选当季云南鲜杨梅，颗颗手剥去核。搭配来自优质茶园的绿妍原茶及喜茶经典芝士，冰凉消暑。",
    "label": "",
    "category_id": 12,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 147226,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/11/b95776a518d144ce8039a149c8ecf415.jpg" },

    {
      "id": 139334,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/26/d9cdb5e74f93439ebe30fdaa4928b5bd.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "0糖低卡甜菊糖",
      "values": [
      {
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "加料",
      "values": [
      {
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true },

      {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false },

      {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "冰量",
      "values": [
      {
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false },

      {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "甜度",
      "values": [
      {
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "茶底",
      "values": [
      {
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "口味",
      "values": [
      {
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false },

      {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "0",
    "remark": "普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 1014,
    "name": "芝芝莓莓桃",
    "no": "2004104298716366",
    "description": "冷670ml 莓莓与桃桃的首次灵感混搭。莓莓沁入桃汁，搭配清雅绿妍茶底与浓醇芝士，一次喝到两款人气饮品。",
    "label": "",
    "category_id": 12,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 140872,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/28/bfbe92590fa244b09353b873a5ca98a3.jpg" },

    {
      "id": 134740,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/14/1feb8648edad4cc9a37d9b1bdead9b59.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "31",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 29.25 }],


  "categoryAds": [] },

{
  "id": 67,
  "name": "人气必喝榜",
  "sort": 3,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/3b52e3d18fae4290b0a668a776b21645.jpg",
  "products": [
  {
    "id": 944,
    "name": "满杯红柚",
    "no": "2002289831003882",
    "description": "冷670ml  热500ml 人气Top7 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。冰沙减弱了红柚的微苦，更凸显茶味。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 72,
    "images": [
    {
      "id": 135796,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/16/334021739fee4274989793ce343156fd.jpg" },

    {
      "id": 117022,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/07dae739032e4b5f9034c82cfad32aa4.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/b6041bf0a93046039123851d0250101f.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 931,
    "name": "多肉葡萄",
    "no": "2002282994907759",
    "description": "冷670ml 热500ml 人气Top1 精选爽脆夏黑葡萄入茶，保留果肉完整肉感。搭配清雅绿妍茶底与醇香芝士，鲜爽可口。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 143240,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/03/26c8a4213c9243e88f4e3f6cfa14c30b.jpg" },

    {
      "id": 117056,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/1d874e762358478aa3ae4385a1397819.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/b280fca74f744e6896cabdb73ae31f47.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30 },

  {
    "id": 941,
    "name": "多肉芒芒甘露",
    "no": "2002288368800095",
    "description": "冷/热500ml  人气Top2 经典芒芒与杨枝甘露的灵感碰撞，精选清幽绿妍茶底，爆汁红柚粒撞上大块芒肉。热饮默认加入芋圆波波，不含脆波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 150526,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/40a6757ad5d34161aedda557f63bf315.jpg" },

    {
      "id": 117044,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/dab56268b0fa44499f3255e95657cf18.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/4015de8912a14300a877b19569096cda.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 932,
    "name": "芝芝莓莓 ®",
    "no": "2002285591289050",
    "description": "冷670ml 热500ml 人气Top3 选用定製士多啤梨配搭清幽绿妍茶底新鲜现打，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": false,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 150527,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/fbcdfbd39c6548b185c1d0eef790808d.jpg" },

    {
      "id": 117035,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/66a64d27c2504838851ce69f2a901326.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/e75452c0d57443be87fdbe9b1dd61da5.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "materials": [
    {
      "group_name": "0糖低卡甜菊糖",
      "values": [
      {
        "id": 1289,
        "name": "0糖低卡糖（不含糖分）",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "加料",
      "values": [
      {
        "id": 1323,
        "name": "芝士分装",
        "price": "1",
        "is_selected": false,
        "is_exclusive": true }] },



    {
      "group_name": "绿色喜茶",
      "values": [
      {
        "id": 409,
        "name": "常规吸管",
        "price": "0",
        "is_selected": true },

      {
        "id": 408,
        "name": "纸吸管-口感略有影响",
        "price": "0",
        "is_selected": false },

      {
        "id": 410,
        "name": "不使用吸管",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "冰量",
      "values": [
      {
        "id": 558,
        "name": "正常(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 29,
        "name": "少冰",
        "price": "0",
        "is_selected": false },

      {
        "id": 33,
        "name": "少少冰",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "甜度",
      "values": [
      {
        "id": 67,
        "name": "标准(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 93,
        "name": "少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 96,
        "name": "少少甜",
        "price": "0",
        "is_selected": false },

      {
        "id": 51,
        "name": "不另外加糖",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "茶底",
      "values": [
      {
        "id": 205,
        "name": "绿妍(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 413,
        "name": "去茶底",
        "price": "0",
        "is_selected": false }] },



    {
      "group_name": "口味",
      "values": [
      {
        "id": 186,
        "name": "芝士(推荐)",
        "price": "0",
        "is_selected": true },

      {
        "id": 145,
        "name": "去芝士",
        "price": "0",
        "is_selected": false },

      {
        "id": 1203,
        "name": "换芝芝雪糕(顶部)",
        "price": "0",
        "is_selected": false }] }],




    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 1070,
    "name": "芝芝莓莓桃",
    "no": "2005182670291325",
    "description": "冷670ml 人气Top4 莓莓与桃桃的首次灵感混搭。莓莓沁入桃汁，搭配清雅绿妍茶底与浓醇芝士，一次喝到两款人气饮品。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 150244,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/9faf0150339d4b9f97f15b95aa6e1eea.jpg" },

    {
      "id": 150263,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/befb6794a056416cb6d2887e8950b99e.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/05/18/a7df1a4418d14475aab48a76268cc8d1.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "31",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 29.25 },

  {
    "id": 938,
    "name": "芝芝芒芒 ®",
    "no": "2002280824114931",
    "description": "冷670ml 人气Top5 选用当季芒果搭配清幽绿妍茶底新鲜现制，清新绵密。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 150528,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/0c30e67747c04eeeb05a90b06a79c999.jpg" },

    {
      "id": 117074,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/fa956693617d4eecb733b4a7dc9dd333.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/41c6464515484d4797055629ea3ac978.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 935,
    "name": "烤黑糖波波鲜奶",
    "no": "2002288501288017",
    "description": "冷480ml 热500ml  人气Top6  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [
    {
      "id": 143245,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/03/489faf24180c45fe974f7711b5c945b0.jpg" },

    {
      "id": 116588,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/b9a1a1446e114335b9319a3a82e5e99f.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/880caa818dd1464d99f1a3b15fc74408.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81 },

  {
    "id": 933,
    "name": "豆豆波波茶",
    "no": "2002284899436338",
    "description": "冷/热500ml 人气Top8 选用浓郁阿萨姆奶茶茶底。浓厚黄豆粉、芋圆波波搭配秘制豆乳奶盖，底部藏有滑嫩豆花。饮用秘籍：1.舀起顶部小丸子和豆奶盖先尝，2.吸管一插到底，再吸豆花与奶茶。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 76,
    "images": [
    {
      "id": 150529,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/2cbf29cd972346e6afce4ae44bdbd001.jpg" },

    {
      "id": 116602,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/c1c1e721aae848ba9ec0c90642595a07.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/51dd0977ee194011b5a0c8caea5f2634.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 88,
      "name": "含乳制品、大豆、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 934,
    "name": "芋泥波波鲜奶",
    "no": "2002283784744731",
    "description": "冷/热500ml  人气Top9  默认冷饮，可做热。因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 82,
    "images": [
    {
      "id": 150530,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/8f982f2fedb049bbb42afb1ec660b157.jpg" },

    {
      "id": 116600,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/666de01e56fa40a5b57fa6b9f3fd7651.jpg" }],


    "name_image": "https://go.cdn.heytea.com/storage/product/2020/02/28/0c485a9ec288466186b30e1fb65449b9.jpg",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 923,
    "name": "m豆波波",
    "no": "2002263405725906",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 172,
    "images": [
    {
      "id": 114333,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/26/2c409b83237148f58ae346c44254a382.jpg" },

    {
      "id": 116572,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/f1656b78be914bc7aacfabc2dd87ad6d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 922,
    "name": "空气巧克力波波",
    "no": "2002260260233795",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 67,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 202,
    "images": [
    {
      "id": 114321,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/26/cd87394ec858482499b89db226e17626.jpg" },

    {
      "id": 116591,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/135b9a02c96b4be8af8ae7fe827613c3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-普通",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42 }],


  "categoryAds": [] },

{
  "id": 17,
  "name": "喜茶制冰",
  "sort": 4,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/ef7b2a24507a4e20b50355eccc3261db.jpg",
  "products": [
  {
    "id": 865,
    "name": "锡兰奶茶脆筒",
    "no": "2001106350637687",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，感谢理解。丝滑奶香与锡兰红茶交织，浓郁茶香，入口难忘。",
    "label": "",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 0,
    "sort": 1,
    "images": [
    {
      "id": 104839,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/10/a80b8ad8282c4c14b619a17e2524abc8.jpg" },

    {
      "id": 117368,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/a03b4da4d8984bb6a0d2374c73c3dc11.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 84,
      "name": "含乳、麦制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49 },

  {
    "id": 482,
    "name": "芝芝脆筒",
    "no": "1907049396650773",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。首次将喜茶经典芝士与冰淇淋结合，芝香浓郁，乳香丝滑。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 0,
    "sort": 2,
    "images": [
    {
      "id": 61018,
      "url": "https://go.cdn.heytea.com/product/2019/07/17/tmp/e9d83a24f39547f98369ce8bfdd781af.jpg" },

    {
      "id": 117369,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/a30e76e5abfb420db8deda04715c7aec.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 89,
      "name": "含乳、麦制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49 },

  {
    "id": 716,
    "name": "豆豆雪糕杯",
    "no": "1911057652116163",
    "description": "雪山黄豆粉和吹弹可破的豆花置于芝芝冰淇淋上，缀以软糯芋圆波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 86879,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/05/1d09b9bff6934df5a55c009c4c7d176c.jpg" },

    {
      "id": 117140,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/e6f339018d96413897f20e143153718b.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 60,
      "name": "含乳制品、大豆",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "15",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 14.15 },

  {
    "id": 91,
    "name": "波波雪糕杯",
    "no": "1812235098495352",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。浓醇乳香融入定制茶香，佐以古法黑糖熬制的Q弹波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 106621,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/bb5441ab575d478595c2b4cf8e3f82f9.jpg" },

    {
      "id": 117133,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/7ed49e6458364d8faf04850862797f1a.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "一个口味",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 },

  {
    "id": 518,
    "name": "爆芋泥雪糕杯",
    "no": "1908020946066711",
    "description": "由于冰淇淋易化，下单后需到冰淇淋机出示购买凭证制作领取，敬请谅解。醇香芝士雪糕搭配满满手捣鲜芋泥、大粒芋头丁及香糯芋圆波波。",
    "label": "冰激淋",
    "category_id": 17,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 64564,
      "url": "https://go.cdn.heytea.com/product/2019/08/02/tmp/4e90c2391b174547b164811e4d4256ab.jpg" },

    {
      "id": 117147,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/c28d24b339d7480ea11c3f38d7fbca4d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 }],


  "categoryAds": [] },

{
  "id": 3,
  "name": "果茶家族",
  "sort": 5,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/ac7a2ff85b6944fe83df06a79cc19834.jpg",
  "products": [
  {
    "id": 903,
    "name": "满杯红柚",
    "no": "2002116591295747",
    "description": "冷670ml  热500ml 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。冰沙减弱了红柚的微苦，更凸显茶味。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 110879,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/cb131fdf77a240759b8b7ca88b6cf60c.jpg" },

    {
      "id": 117018,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/a680c4a889db4348ac18073afd876d16.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "精简",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 987,
    "name": "多肉葡萄",
    "no": "2003233053569987",
    "description": "冷670ml 热500ml  精选爽脆夏黑葡萄入茶，保留果肉完整肉感。搭配清雅绿妍茶底与醇香芝士，鲜爽可口。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 125859,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/a8cc4a72b43b434488f7be0a83b0ff10.jpg" },

    {
      "id": 125860,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/befbd052ffd14a109af3512d762ef7b3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "精简菜单",
    "is_enable": 0,
    "price": "30",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 28.30 },

  {
    "id": 988,
    "name": "芝芝莓莓 ®",
    "no": "2003236541062275",
    "description": "冷670ml 热500ml 选用定制草莓搭配清幽绿妍茶底新鲜现制，莓香满溢。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 125863,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/23/6e368d7fa41d423eb08ea7f9824aed49.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "国内-精简",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 901,
    "name": "多肉芒芒甘露",
    "no": "2002112553238348",
    "description": "冷/热500ml  经典芒芒与杨枝甘露的灵感碰撞，精选清幽绿妍茶底，爆汁红柚粒撞上大块芒肉。热饮默认加入芋圆波波，不含脆波波。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 135047,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/15/44ed201701ef406087100b0c1690daad.jpg" },

    {
      "id": 117036,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/de106edd904148f185f6273835be0baf.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "精简菜单",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 1027,
    "name": "多肉芒芒甘露MAX",
    "no": "2004177218841779",
    "description": "冷670ml 多肉芒芒甘露升级大杯，果肉更多。经典芒芒与杨枝甘露的灵感碰撞，爆汁红柚粒撞上大块芒肉，精选清幽绿妍茶底，好喝不腻口。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 145003,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/811f5f21b97b494baa7dd860e73ea3d2.jpg" },

    {
      "id": 136964,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/19/16acc3dcfc944f65a031192183ed79fa.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "人气-精选",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 },

  {
    "id": 1025,
    "name": "莓莓芒芒甘露",
    "no": "2004173099743868",
    "description": "冷500ml 莓莓和芒芒甘露的首次灵感混搭。当季草莓搭配椰香芒果和红柚果粒，精选清新绿妍茶底，一次尝鲜两款人气饮品。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 145000,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/06/f59e648a91b646a0a240f57e8504a63a.jpg" },

    {
      "id": 136961,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/19/35254a5c17104f14b867118cbf5e22bc.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "当季-普通",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 902,
    "name": "芝芝芒芒",
    "no": "2002117627568550",
    "description": "冷670ml 选用当季芒果搭配清幽绿妍茶底新鲜现制，清新绵密。如选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。",
    "label": "",
    "category_id": 3,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 110878,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/bcfb2519560e422e87d5d6e42311ab33.jpg" },

    {
      "id": 117061,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/eb615f19fc7b4597b2bf2e7d72ecc49b.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "精选菜单",
    "is_enable": 0,
    "price": "32",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 30.19 }],


  "categoryAds": [] },

{
  "id": 1,
  "name": "芝芝茗茶",
  "sort": 6,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/3de570175dbb4c74a6291e1b6df4eb6a.jpg",
  "products": [
  {
    "id": 723,
    "name": "芝芝绿妍",
    "no": "1911069353676862",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制绿茶，较普通绿茶，少了几分涩气，口感清澈，茉莉香气馥郁怡人。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 86967,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/426b9ffb61b54d109c5e0a2fb17e6dd2.jpg" },

    {
      "id": 116966,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/e15fc76af0d5474db3fd7ea6f7c3038e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92 },

  {
    "id": 726,
    "name": "芝芝金玉",
    "no": "1911062610264848",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制乌龙，清新茶香中带有桂花香和淡淡的乳香，馥郁迷人。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 86975,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/71fc31a5917849148bc363187ade15dc.jpg" },

    {
      "id": 117003,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/9b2cde9273b34263a4de537e6c7fcdae.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75 },

  {
    "id": 728,
    "name": "芝芝金凤茶王",
    "no": "1911063020240079",
    "description": "冷/热500ml 芝士分装无法选择烤黑糖。喜茶定制乌龙茶，香气炭焙浓郁，入喉回甘，茶香余韵不断。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 86978,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/8c674061195c47abab7f0ba5389a9277.jpg" },

    {
      "id": 117006,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/55ae40fc3ddb4f34b637355fb05019e0.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75 },

  {
    "id": 729,
    "name": "芝芝嫣红2.0",
    "no": "1911064895831191",
    "description": "冷/热 500ml 芝士分装无法选择烤黑糖。喜茶定制红茶，茶底全新升级为蜜香红茶，汤色红艳明亮，口味丰富深沉。",
    "label": "",
    "category_id": 1,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 86979,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/06/66ee47abea144200ad9545038f07f3e1.jpg" },

    {
      "id": 117365,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/9bf19da3d15e47309857ca6f0a374a0f.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "有豆豆奶盖",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75 }],


  "categoryAds": [] },

{
  "id": 15,
  "name": "喜茶咖啡",
  "sort": 8,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/50609654ded746f28ea60485a7e715b5.jpg",
  "products": [
  {
    "id": 990,
    "name": "雪山香草拿铁",
    "no": "2003273864428595",
    "description": "冷500ml 热360ml 因热饮鲜奶油易融，推荐选择分装，敬请谅解。香草牛奶拿铁与香草鲜奶油雪顶灵感碰撞，缀以酥脆可口的碧根果碎，散发出柔和的坚果香及奶香。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 127384,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/27/22757b7d429c49929da91462c19308ec.jpg" },

    {
      "id": 129024,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/627939658eff4a9cba5a848dac2d2956.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 79,
      "name": "含乳制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 989,
    "name": "雪山摩卡",
    "no": "2003271920921171",
    "description": "冷500ml 热360ml 因热饮鲜奶油易融，推荐选择分装，敬请谅解。口感浓郁的可可牛奶摩卡，以入口即化的香草鲜奶油封顶，再轻撒上可可粉，交织出更加丰富的咖啡口感。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 129039,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/7a7b828bf69b4ad59a46ad9500c915e6.jpg" },

    {
      "id": 129025,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/01/41e2e384cc824a63aebf2fc8285ea580.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 330,
    "name": "芝芝咖啡",
    "no": "1903209749549957",
    "description": "冷500ml  热360ml  咖啡外送可能会影响口感。意式奶咖与喜茶芝士的默契结合，带来更浓郁的奶香。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 110986,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/12/0953921c70694dd08017c3566d21bb3e.jpg" },

    {
      "id": 117366,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/9ca5660ac7584711a1e687f880c17bd9.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 332,
    "name": "咖啡波波冰",
    "no": "1903204953514910",
    "description": "冷480ml  热360ml  咖啡外送可能会影响口感。现萃Espresso沁入细密冰沙，佐以Q弹黑糖波波，混搭出新格调。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 83013,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/3db0e2c514574207972f6760b6aec5d3.jpg" },

    {
      "id": 117130,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/b264c852833d4622ace76ae374f5d7d7.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 786,
    "name": "拿铁(无糖)",
    "no": "1912139005357496",
    "description": "热360ML 冷500ML。选用优质阿拉比卡咖啡豆拼配，现萃咖啡融入蒸煮牛奶，呈现经典拿铁的香纯。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 132284,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/0347a8c6fbee4c9c9043fff1ab3a39dc.jpg" },

    {
      "id": 132393,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/9f200190cba74818b933e8c19efbf267.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92 },

  {
    "id": 787,
    "name": "美式(无糖)",
    "no": "1912139775970865",
    "description": "热360ML 冷500ML。选用优质阿拉比卡咖啡豆拼配，原豆现磨，冲泡出纯粹饱满的咖啡香气。",
    "label": "",
    "category_id": 15,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 132285,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/baedb7f7c90343c68490f6ef3b56b39e.jpg" },

    {
      "id": 132391,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/97facddd55fd4235bc6be7a6fbe96251.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 82,
      "name": "含咖啡",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 12.26 }],


  "categoryAds": [] },

{
  "id": 7,
  "name": "热饮推荐",
  "sort": 9,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/23/72b2d1e753464b5a837618e24bc857c3.jpg",
  "products": [
  {
    "id": 651,
    "name": "热阿华田波波",
    "no": "1910180943088468",
    "description": "500ml 喜茶×阿华田联名款，口感较甜腻。颗颗软糯的黑糖波波坠入鲜牛奶，结合活力满满的阿华田酷脆酱、阿华田脆脆与黑糖布蕾，口口香脆。如需选购冷饮，请在波波家族点选。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 94128,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/47a76b8d425a41ff988b12d4c1f16e5f.jpg" },

    {
      "id": 116577,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/35198bd91dc24b02adf8c52a7381b3a3.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42 },

  {
    "id": 652,
    "name": "热奶茶波波",
    "no": "1910189005370634",
    "description": "500ml  经典奶茶回归，浓郁阿萨姆红茶搭配纯鲜牛乳打制，黑糖波波与布蕾的组合让口感层次更加丰富。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 94132,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/72bbb1e88e644114ab4fd66575e35efb.jpg" },

    {
      "id": 116597,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/897eabd7269d4173b5bb7596eec497ad.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "国内",
    "is_enable": 1,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 1071,
    "name": "热香草拿铁",
    "no": "2005189358606057",
    "description": "热360ml。选用优质阿拉比卡咖啡豆拼配，清新香草，风味融于现萃咖啡拿铁，香气馥郁。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 150321,
      "url": "https://go.cdn.heytea.com/storage/product/2020/05/18/3df5323771164e91a34a9b66b5a4a93f.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 843,
    "name": "热拿铁(无糖)",
    "no": "2001020664302393",
    "description": "360ML  选用优质阿拉比卡咖啡豆拼配，现萃咖啡融入蒸煮牛奶，呈现经典拿铁的香纯。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [
    {
      "id": 132286,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/b0310c0436e142b8a137e459cba41872.jpg" },

    {
      "id": 132394,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/07/0d611cf4ca9a4a78996f5f6ae58cc94e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "19",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 17.92 },

  {
    "id": 175,
    "name": "热满杯红柚",
    "no": "1812195149541014",
    "description": "500ml 精选饱满红柚果粒入茶，清幽绿妍茶底洋溢茉莉花香。热气氤氲的茶汤，带出红柚的酸甜。若选择甜菊糖，遇酸性水果会产生泡沫，属正常现象。如需选购冷饮，请在果茶家族内选购。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 9,
    "images": [
    {
      "id": 94137,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/53dfa505c0374a3c8c1e591ef5f62cfa.jpg" },

    {
      "id": 117024,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/02b673e5db164b0cb3f86f94f551de51.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "25",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 23.58 },

  {
    "id": 780,
    "name": "热空气巧克力波波",
    "no": "1912127891374933",
    "description": "500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 106302,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/38ff7925b24e45f396a53055be81e0b0.jpg" },

    {
      "id": 116593,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/32ebc886275f4bd3b1822378c16bb880.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42 },

  {
    "id": 781,
    "name": "热m豆波波",
    "no": "1912127683531223",
    "description": "500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 106303,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/bf760fd398bf4ae08b1c556550e385e6.jpg" },

    {
      "id": 116574,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/7263f087592a428a8581d4e8c3f88e75.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 283,
    "name": "热芋泥波波鲜奶",
    "no": "1901144910150975",
    "description": "500ml 因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。如需选购冷饮，请在波波家族点选。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 106698,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/546e45531ff54693af2fa84cbcab8dff.jpg" },

    {
      "id": 116601,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/aaef384a606640fbaa4c5f35ad3291e1.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "通用",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 734,
    "name": "热烤黑糖波波鲜奶",
    "no": "1911118126262032",
    "description": "500ml  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 7,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 94130,
      "url": "https://go.cdn.heytea.com/storage/product/2019/12/06/e1f41f7109294b3b857b8bb170769ff7.jpg" },

    {
      "id": 116589,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/9712450d1eda45ea8a421dfc05e4a824.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81 }],


  "categoryAds": [] },

{
  "id": 6,
  "name": "纯茶",
  "sort": 10,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/43c745f3ead64208830401107c44eef2.jpg",
  "products": [
  {
    "id": 27,
    "name": "纯绿妍",
    "no": "1902229954555253",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制绿茶，气质淡雅芳幽，散发着清逸的茉莉香气，馥郁怡人。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 82988,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/a2544f719c444feb92bffb1e0c806b15.jpg" },

    {
      "id": 118894,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/a9633f04b796445cb7f06a3f35eacc6e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "13",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 12.26 },

  {
    "id": 281,
    "name": "纯金玉",
    "no": "1901104953102101",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制乌龙，清新茶香中带有桂花香和淡淡的乳香，馥郁迷人。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 82989,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/7fc2a04e49c64d4e9bacbd927c0b7831.jpg" },

    {
      "id": 118896,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/0c371c50084a43e78378ae651d043cc8.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 },

  {
    "id": 29,
    "name": "纯金凤茶王",
    "no": "1902225410210057",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制乌龙茶，香气炭焙浓郁，入喉回甘，茶香余韵不断。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 82990,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/17/ebd9855a95c8409786028992347908ab.jpg" },

    {
      "id": 118897,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/d0ec2ad62d034109beded6cc0cf7e9f4.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 },

  {
    "id": 31,
    "name": "纯嫣红2.0",
    "no": "1902229953995457",
    "description": "冷/热500ml（纯茶系列无芝士）喜茶定制红茶，茶底全新升级为蜜香红茶，汤色红艳明亮，口味丰富深沉。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 83919,
      "url": "https://go.cdn.heytea.com/storage/product/2019/10/22/72cffdd3f5e04521bbdefcbd4adb752d.jpg" },

    {
      "id": 118898,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/07/84d30cb807ac48ccb3621318eb049e8d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "16",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 15.09 },

  {
    "id": 1049,
    "name": "纯奶茶",
    "no": "2004304604998948",
    "description": "冷/热500ml 精选阿萨姆红茶搭配牛奶调制，茶香浓郁，口感如丝般顺滑。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 141380,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/87b82a1b87cc4858a8b39d53e29ed690.jpg" },

    {
      "id": 141374,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/c9c4430e4e55453bbdf318467867ae1d.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "22",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 20.75 },

  {
    "id": 904,
    "name": "冷萃桂花绿",
    "no": "2002116613548083",
    "description": "冷萃茶不用等待叫号，可直接向店员出示后领取。细嫩茶芽与桂花一同于冷露中舒展沐浴八小时，制得茶汤清黄透亮，滋味鲜爽。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 110880,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/11/f8adbf0d089e45ddaddc1e84547bcdf7.jpg" },

    {
      "id": 116987,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/9734c2930f964a40a098413e435d0944.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2105,
      "name": "冷萃桂花绿",
      "appointable": true,
      "is_join_queue": 0,
      "is_now_making": 1 }],


    "labels": [
    {
      "id": 67,
      "name": "含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "1",
    "remark": "国内-纯茶",
    "is_enable": 0,
    "price": "9",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 8.49 },

  {
    "id": 1048,
    "name": "纯可可",
    "no": "2004300946915874",
    "description": "冷/热500ml 醇香可可搭配牛奶调制，交织出经典可可风味。",
    "label": "",
    "category_id": 6,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 141370,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/e0cbafb366934472bb72dca1d9882779.jpg" },

    {
      "id": 141375,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/30/273d81568dc045eb8d3e17f9dbad52b5.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "23",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 21.70 }],


  "categoryAds": [] },

{
  "id": 9,
  "name": "加料",
  "sort": 11,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/19047118303443b09ba73f82c54e4f03.jpg",
  "products": [
  {
    "id": 48,
    "name": "芝士",
    "no": "1908069651779130",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 60,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/22/BQiF2x5F5UHpdyrWGuomkha6cHCzajwacbSzJWrU.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "6",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 5.66 },

  {
    "id": 51,
    "name": "加料冰淇淋",
    "no": "1908066825277032",
    "description": "不是单独吃的冰淇淋，如需购买直接吃的冰淇淋请在“喜茶制冰”系列选购。温馨提示：冰淇淋运送途中易融化，请酌情加购。1.加在饮品里（请您务必备注需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "冰激淋",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 133116,
      "url": "https://go.cdn.heytea.com/storage/product/2020/04/09/c912c1ab408b4003ada51a1e827f549e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "6",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 5.66 },

  {
    "id": 95,
    "name": "脆波波",
    "no": "1908065534921229",
    "description": "脆波波无法添加在热饮里，比较适合添加在水果类饮品中。1.加在饮品里（请您务必备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 192,
      "url": "https://go.cdn.heytea.com/storage/products/2018/07/15/JUCyrE0xWBQJx2h702r36Hroj9iIvk1Sx8I4xqHU.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "3",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 2.83 },

  {
    "id": 52,
    "name": "红柚果粒",
    "no": "1908064628880923",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 78,
      "url": "https://go.cdn.heytea.com/storage/products/2018/05/03/qOcLwgnk2Ag0yXKrlhgv4DGViu3T6xzEwho753il.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "1",
    "remark": "",
    "is_enable": 1,
    "price": "2",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 1.89 },

  {
    "id": 89,
    "name": "黑波波",
    "no": "1908060875032077",
    "description": "黑波波因为口味不搭，无法添加在任何含水果的饮品里。由于黑波波本身自带甜度，还请酌情调整饮品甜度。1.加在饮品里（请您务必备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 163,
      "url": "https://go.cdn.heytea.com/storage/products/2018/06/12/7STwzMTlbwolNHyOeTZHoEfOWZPp7yyEUUiwLLRx.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "2",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 1.89 },

  {
    "id": 46,
    "name": "芋圆波波",
    "no": "1908063932379542",
    "description": "1.加在饮品里（请备注，需要加料是哪杯饮品）2.单独分装（1元打包费）",
    "label": "加料",
    "category_id": 9,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 816,
      "url": "https://go.cdn.heytea.com/storage/products/2018/10/08/zyRESIONRRKD93SzsK82Bd4bbCCMwmmvuLeXbMVj.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "3",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.0600,
    "un_include_tax_price": 2.83 }],


  "categoryAds": [] },

{
  "id": 59,
  "name": "共同抗疫",
  "sort": 12,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/529845ef52584ca1adca3af88ebf1c66.jpg",
  "products": [
  {
    "id": 868,
    "name": "无接触配送",
    "no": "2001147783071999",
    "description": "防疫期间，您可通过订单备注及电话告知等方式，引导骑手将外卖商品放在指定位置，例如：悬挂门把手、放置大堂桌面，避免接触，降低风险。由于茶饮均为现点现制，高峰期外送时间预计为1小时左右，建议您提前点单。如果您有任何建议或遇到配送、撒漏等问题，可拨打本店电话反馈（高峰期可能会出现忙线，还请谅解），也可前往喜茶GO-我的-联系客服，我们会尽快为您处理。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 106625,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/a70891bef83a4aa2b0f7c5b7d7ca1fd5.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2040,
      "name": "无接触配送",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 884,
    "name": "日常防疫",
    "no": "2001291964122103",
    "description": "1.尽量避免出门，出门必须戴上口罩；2.避免在无保护的情况下接触家禽家畜；3.烹制时彻底煮熟肉类和蛋类；4.咳嗽和打喷嚏时使用纸巾或弯曲手肘掩盖口鼻，立刻消毒双手；5.多喝温水，保持喉咙湿润；6.勤洗手勤消毒；7.规律作息。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 109315,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/59c79fe328ce49c98b469e5e3893bc69.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2075,
      "name": "日常防疫",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 887,
    "name": "门店防疫",
    "no": "2001290337601885",
    "description": "1.店员每日测量体温，全天佩戴口罩手套，每小时洗手消毒。2.每小时消毒店内可接触物，每四小时清洗消毒餐具。3.最大程度保持门店通风透气。4.门店现仅接受喜茶GO小程序点单，降低接触频次。5.顾客及骑手须佩戴口罩方可进店。6.骑手进店前测量体温，所有外卖订单采取无接触配送。我们希望为大家提供安全的环境，愉快喝茶。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 109320,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/fce916a50b5b46bdb31e862fe50f59b5.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2078,
      "name": "门店防疫",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 886,
    "name": "医护关怀 优先制作",
    "no": "2001296678335151",
    "description": "所有医院和防疫中心的外送订单，我们都将予以优先制作，尽微薄之力为一线医生和护士提供一些支持。愿医务人员们平安凯旋。",
    "label": "",
    "category_id": 59,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 109319,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/29/f57d3859f66b4ffe9a43e641d023fc2b.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 2077,
      "name": "医护关怀 优先制作",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 }],


  "categoryAds": [] },

{
  "id": 8,
  "name": "灵感提示",
  "sort": 13,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/6d5e68f5b2bd4fa2bb50f94e6ac0a512.jpg",
  "products": [
  {
    "id": 386,
    "name": "好果",
    "no": "1905133973948690",
    "description": "选用水果或nfc(100%鲜榨非浓缩还原)鲜果汁，不添加任何色素，香精。饮品颜色（如粉色）完全使用新鲜水果调色。因鲜果具有差异性，颜色，口味有时会有细微差别，希望能理解~",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 43204,
      "url": "https://go.cdn.heytea.com/product/2019/05/13/tmp/5ff509ec0bef4d17845fc8f788240945.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1299,
      "name": "好果",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 41,
    "name": "联系我们",
    "no": "1905150527205146",
    "description": "如有配送、洒漏、口味等问题，请尽快联系我们，我们将尽快解决为您重做。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 50,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/ygQajpQgwl61yLFjiPNlKb27irYd9Wrkwf8udrZG.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1321,
      "name": "联系我们",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 42,
    "name": "星球须知",
    "no": "1905274655799328",
    "description": "1.由于鲜奶打制，配送中芝士/轻芝士饮品可能会出现芝士下沉和茶混合的现象。2.冰沙类饮品配送中可能出现融化。3.热茶饮均为500ml规格，热咖啡均为360ml规格，望周知谅解。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 51,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/ecr5boTxqal4bpRBoK4pqks8SGlBxiBwgvAVWYDG.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1322,
      "name": "星球须知",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 43,
    "name": "好茶",
    "no": "1907103183786764",
    "description": "使用原产地定制原茶茶叶，我们希望用一杯好茶激发你的一份灵感。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 52,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/XxWAOA4cykEeUwAbKZLuIHLEdXS96M4NSBLEOsEp.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1323,
      "name": "好茶",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 44,
    "name": "好奶",
    "no": "1907102611854675",
    "description": "选用高品质冷藏鲜奶，高品质淡奶油，芝士使用鲜奶打制，不使用任何脂质沫（奶精、奶盖粉）。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 53,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/qS2cxdfDrzgCmAMATXlclkaXecBXLGWGMPBkl60P.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1324,
      "name": "好奶",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 45,
    "name": "好糖",
    "no": "1907106785814826",
    "description": "使用优质糖分，可于下单时按个人口味调整添加的糖分。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 54,
      "url": "https://go.cdn.heytea.com/storage/products/2018/03/09/17YCgUYwldCLGHEcNDJPjM68TQ9PaEUpp6voCUTk.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1325,
      "name": "好糖",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9992",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8842.48 },

  {
    "id": 104,
    "name": "过敏原",
    "no": "1905274126391239",
    "description": "部分饮品中含有乳制品、菠萝、芒果、大麦、小麦、麦芽制品等致敏物，请酌情选择。部分饮品中含有果肉、珍珠、芋圆等大颗粒物，请勿大力吸入，老人、儿童、孕妇请谨慎饮用。所有茶类饮品皆含咖啡因，如对咖啡因过敏，请谨慎选择。",
    "label": "其他",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 289,
      "url": "https://go.cdn.heytea.com/storage/products/2018/08/09/sDzZBhV27AdVpth9bwpVSnY1WhreD3EN02MqE0r2.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1327,
      "name": "过敏原",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 462,
    "name": "自带杯 减2元",
    "no": "1906215019076002",
    "description": "我们更鼓励大家自带杯到店饮茶，并且每杯饮品可享受减2元优惠。减少使用饮品杯，一起为地球做好事。*自带杯指定规格：洁净可受热，杯口≥6CM，容量≥500ML。本活动仅限门店现场点单，不与其他优惠共享，感谢理解。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 8,
    "images": [
    {
      "id": 54642,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/b8d76851e21b469c98978adccec77715.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1273,
      "name": "自带杯 减2元",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "9999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 8848.67 },

  {
    "id": 465,
    "name": "让垃圾各归各家",
    "no": "1906210816159145",
    "description": "我们现已在门店设置了分类垃圾桶，请将垃圾分好类再入桶，和茶茶一起分清标识，环保不迷路。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 9,
    "images": [
    {
      "id": 54640,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/0e79195904794fb6b23b466d00694eb8.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1276,
      "name": "让垃圾各归各家",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07 },

  {
    "id": 463,
    "name": "一起使用纸吸管",
    "no": "1906210475943584",
    "description": "少取用吸管，支持环保减塑。我们现已提供环保纸吸管及常规吸管两项选择，由于纸吸管长时间浸泡强度易下降，取用纸吸管的朋友请尽快饮用噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 10,
    "images": [
    {
      "id": 54615,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/35794eb50dd344f488affedffa62d170.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1274,
      "name": "一起使用纸吸管",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07 },

  {
    "id": 464,
    "name": "不打包 更环保",
    "no": "1906215007742339",
    "description": "一起来参与不打包行动。如需打包，请选择店内的可降解打包袋，更欢迎大家自带环保袋噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 11,
    "images": [
    {
      "id": 54641,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/f2523f450e9b4c4bbce58d88dd83bdf4.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1275,
      "name": "不打包 更环保",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07 },

  {
    "id": 466,
    "name": "纸巾按需取用",
    "no": "1906216036305300",
    "description": "节约一张纸，守护一棵树。请按需取用店内纸巾，减少不必要的浪费。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 12,
    "images": [
    {
      "id": 54639,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/fad86c295f2840bda47d06600a8c9e02.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1277,
      "name": "纸巾按需取用",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "999",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 884.07 },

  {
    "id": 467,
    "name": "循环利用 激发灵感",
    "no": "1906212821448901",
    "description": "我们提供的外带纸袋、饮品纸杯及纸杯套都是由可回收材料制成，用灵感点亮生活的每一个瞬间，希望每一个被带走的纸袋、杯套及纸杯，都能在大家的妙手下得到二次创作使用噢。",
    "label": "",
    "category_id": 8,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 13,
    "images": [
    {
      "id": 54638,
      "url": "https://go.cdn.heytea.com/product/2019/06/21/tmp/81411128480f45bf8dcd56038b5d66cb.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "skus": [
    {
      "id": 1278,
      "name": "循环利用 激发灵感",
      "appointable": false,
      "is_join_queue": 0,
      "is_now_making": 0 }],


    "labels": [],
    "is_premade": "0",
    "remark": "",
    "is_enable": 1,
    "price": "998",
    "is_sold_out_forever": 1,
    "is_tied_product": 0,
    "has_box_fee": 0,
    "tax_rate": 0.1300,
    "un_include_tax_price": 883.19 }],


  "categoryAds": [] },

{
  "id": 11,
  "name": "波波家族",
  "sort": 7,
  "category_image_url": "https://go.cdn.heytea.com/storage/category/2020/04/21/0dd0e6e55c4b4f119fadda81b0a7b3f8.jpg",
  "products": [
  {
    "id": 706,
    "name": "豆豆波波茶",
    "no": "1911010700649582",
    "description": "冷/热500ml 选用浓郁阿萨姆奶茶茶底。浓厚黄豆粉、芋圆波波搭配秘制豆乳奶盖，底部藏有滑嫩豆花。饮用秘籍：1.舀起顶部小丸子和豆奶盖先尝，2.吸管一插到底，再吸豆花与奶茶。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 1,
    "images": [
    {
      "id": 87818,
      "url": "https://go.cdn.heytea.com/storage/product/2019/11/09/5f9e812aec954a8b88a184ca6d81e8cc.jpg" },

    {
      "id": 116603,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/34f79e5ab5e844179bc4c0263a0ad57c.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 88,
      "name": "含乳制品、大豆、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "最新",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 68,
    "name": "烤黑糖波波鲜奶",
    "no": "1812209997985397",
    "description": "冷480ml 热500ml  黑糖珍珠搭配顺滑鲜奶，波波系列奶味较为浓郁，不喜欢浓厚口感的朋友慎点。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 2,
    "images": [
    {
      "id": 71356,
      "url": "https://go.cdn.heytea.com/product/2019/08/31/tmp/1258f79c91c04932bec8b09eb7eebb90.jpg" },

    {
      "id": 116584,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/1b653ccc95344896bdf1f0b0ddca5be1.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "唯一",
    "is_enable": 0,
    "price": "21",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 19.81 },

  {
    "id": 133,
    "name": "芋泥波波鲜奶",
    "no": "1812279955525098",
    "description": "冷/热500ml  默认冷饮，可做热。因芋泥容易氧化，为保持最佳体验，请务必于一小时内饮用完毕。茶底可选鲜奶/椰奶。手捣新鲜芋泥融入顺滑鲜奶，再加入颗颗Q弹的芋泥波波，绵密与润泽，尽在这一杯。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 3,
    "images": [
    {
      "id": 106697,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/16/9e614ed804284ed888b1913c4459ab93.jpg" },

    {
      "id": 116599,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/fe91df89885d42ffa8e8c0c58d34c6e5.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 70,
      "name": "含乳制品、不含茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "国内",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 770,
    "name": "m豆波波",
    "no": "1912064611771955",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油顶是m豆们的奇妙游乐园。饮用步骤：1.先用搭配的小勺吃掉奶油和m豆；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 4,
    "images": [
    {
      "id": 106300,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/c067c03758e4440ea8463743dd9f6941.jpg" },

    {
      "id": 116575,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/ffd1a8461b8141b09d8d0d466cffc82e.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "29",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 27.36 },

  {
    "id": 771,
    "name": "空气巧克力波波",
    "no": "1912062784685912",
    "description": "冷480ml  热 500ml  因热饮鲜奶油易融，推荐选择分装，敬请谅解。默认热饮，冷热皆宜。法芙娜巧克力口感浓郁顺滑，鲜奶油与空气巧克力交织出圣诞好味。饮用步骤：1.先用搭配的小勺吃掉奶油和空气巧克力；2.再插入吸管大口吮吸浓香巧克力和黑波波。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 5,
    "images": [
    {
      "id": 106299,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/15/1b193e1b37e84fb49e0fd0101b58a6a2.jpg" },

    {
      "id": 116594,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/852db33dcf4d4d17b13971a6c42dc4e2.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 86,
      "name": "含乳、麦制品、坚果",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "28",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 26.42 },

  {
    "id": 890,
    "name": "芋泥黑糖波波",
    "no": "2002020137219017",
    "description": "冷/热500ml 因芋泥易氧化，为保持最佳口感，建议于一小时内饮用完毕。手捣新鲜芋泥融入顺滑牛奶，Q弹黑波波甜香浓郁。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 6,
    "images": [
    {
      "id": 109837,
      "url": "https://go.cdn.heytea.com/storage/product/2020/02/02/b42a4e5690d742e8abab89610bd865b2.jpg" },

    {
      "id": 117358,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/05/e7691652c4a046bdbd6fbb7862436226.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 62,
      "name": "含乳制品",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 },

  {
    "id": 334,
    "name": "奶茶波波冰",
    "no": "1903205298100979",
    "description": "冷480ml 热500ml  由于冰沙外送易化，口感会略受影响，敬请谅解。经典奶茶回归，浓郁阿萨姆红茶搭配纯鲜牛乳打制细腻冰沙，黑糖波波和冰淇淋球的组合让口感层次更加丰富。",
    "label": "",
    "category_id": 11,
    "is_single": true,
    "support_takeaway": 1,
    "sort": 7,
    "images": [
    {
      "id": 106879,
      "url": "https://go.cdn.heytea.com/storage/product/2020/01/17/6fb20e4943944d7bb00a0034563c664a.jpg" },

    {
      "id": 116596,
      "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/6217859b873f47be860b3f37ed5701d4.jpg" }],


    "name_image": "",
    "show_trademark": false,
    "activity_ids": [],
    "labels": [
    {
      "id": 14,
      "name": "可做热饮",
      "type": 0,
      "label_color": "#5AA541" },

    {
      "id": 15,
      "name": "含乳制品、茶",
      "type": 0,
      "label_color": "#BABABA" }],


    "is_premade": "0",
    "remark": "国内",
    "is_enable": 0,
    "price": "27",
    "is_sold_out_forever": 0,
    "is_tied_product": 0,
    "has_box_fee": 1,
    "tax_rate": 0.0600,
    "un_include_tax_price": 25.47 }],


  "categoryAds": [] }];exports.default = _default;

/***/ }),

/***/ 15:
/*!**********************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/orders.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [
{
  "id": 1,
  "no": "755067202001181805428750",
  "outer_id": null,
  "pickup_no": "8191",
  "pickup_code_qrcode": "http://go.heytea.com/orders/755067202001181805428750/puckupNo",
  "pickup_type": "\u81EA\u63D0",
  "total_fee": "50.00",
  "box_fee": "0.00",
  "delivery_fee": "0.00",
  "discount_fee": "0.00",
  "coupon_fee": "0.00",
  "payment": "50.00",
  "currency_type": "CNY",
  "paid_at": "2020-01-18 18:05:50",
  "called_at": "2020-01-18 18:27:34",
  "status": "TRADE_CLOSED",
  "refund_status": "NO_REFUND",
  "reason": "\u534F\u5546\u4E00\u81F4\u9000\u6B3E",
  "pickup_time": "2020-01-18 18:49:32",
  "pickup_time_period": "",
  "pickup_time_period_show": null,
  "takeaway_time_immediately_show": "2020-01-18 18:50:50",
  "is_takeaway": false,
  "created_at": "2020-01-18 18:05:43",
  "remarks": "\u4E0D\u6253\u5305",
  "coupon_library_id": "",
  "activity": [],
  "is_comment": 2,
  "only_vip_show_invoice": false,
  "hidden_invoice": false,
  "invoice_successed": false,
  "show_remind_button": 0,
  "order_detail_qrcode": "https://go.heytea.com/device/755067202001181805428749/order",
  "making_order_count": 0,
  "need_wait_time": 0,
  "prior": 0,
  "trade_type": "JSAPI",
  "cupboard": null,
  "is_can_refund": false,
  "is_premade": false,
  "gather_feedback": false,
  "currency": 1,
  "tax_fee": "-1",
  "cancelCountdown": 0,
  "order_channel": "W",
  "open_pickupPage_expectTime": 1,
  "alipay_invoice_button": true,
  "new_order_invoice": true,
  "set_items": [],
  "showPaymentDetails": false,
  "items": [
  {
    "id": 1,
    "product_id": 551,
    "sku_id": 1420,
    "category_id": 11,
    "quantity": 2,
    "total_fee": "25.00",
    "price": "25.00",
    "name": "\u6D41\u5FC3\u5976\u9EC4\u6CE2\u6CE2\u51B0",
    "sname": "\u6D41\u5FC3\u5976\u9EC4\u6CE2\u6CE2\u51B0",
    "activity_name": "",
    "discount_price": 0,
    "show_trademark": false,
    "name_image": "",
    "activity_type": 0,
    "specifications": [],
    "attributes": [],
    "materials": [
    {
      "material_id": 140,
      "name": "\u51B0\u6C99\uFF08\u63A8\u8350\uFF09",
      "price": "0.00",
      "material_group_id": 5 },

    {
      "material_id": 33,
      "name": "\u5C11\u5C11\u51B0",
      "price": "0.00",
      "material_group_id": 3 },

    {
      "material_id": 409,
      "name": "\u5E38\u89C4\u5438\u7BA1",
      "price": "0.00",
      "material_group_id": 27 },

    {
      "material_id": 68,
      "name": "\u6B63\u5E38\u7CD6(\u63A8\u8350)",
      "price": "0.00",
      "material_group_id": 4 },

    {
      "material_id": 149,
      "name": "\u6807\u51C6\uFF08\u63A8\u8350\uFF09",
      "price": "0.00",
      "material_group_id": 6 }],


    "image": "https://go.cdn.heytea.com/product/2019/08/23/tmp/606742485b404725bcc5fe37330c4cde.jpg" }],


  "shop": {
    "id": 308,
    "name": "\u76CA\u7530\u5047\u65E5\u5929\u5730GO\u5E97",
    "contact_phone": "0755-27906072",
    "contact_name": "\u559C\u8336",
    "province": "\u5E7F\u4E1C\u7701",
    "city": "\u6DF1\u5733\u5E02",
    "city_code": "156440300",
    "district": "\u5B9D\u5B89\u533A",
    "address": "\u5E7F\u6DF1\u8DEF\u798F\u6C38\u6BB577\u53F71\u5C42L1-W55\u53F7",
    "latitude": "22.66992",
    "longitude": "113.827609",
    "min_charge": 30,
    "distance": 0,
    "delivery_distance": 3000,
    "support_mt_takeaway": 0,
    "support_sf_takeaway": 1,
    "support_td_takeaway": 0,
    "support_jd_takeaway": 0,
    "scene_code": "http://go.heytea.com/storage/shop/scene_code/shop_id_308.jpg",
    "tips": "15",
    "limit_cup": 50,
    "takeaway_limit_cup": "5",
    "location_city": null,
    "disable_order_type": 2,
    "country": "\u4E2D\u56FD",
    "country_code": "156",
    "district_code": "440306",
    "support_cash": 1,
    "nearby_shop_count": 0,
    "is_current_city": null,
    "is_support_premade": 0,
    "currency": 1,
    "estimate_time_type": 1,
    "appointable": null },

  "delivery": null },

{
  "id": 2,
  "no": "755067201911061936067635",
  "outer_id": null,
  "pickup_no": "8167",
  "pickup_code_qrcode": "http://go.heytea.com/orders/755067201911061936067635/puckupNo",
  "pickup_type": "\u81EA\u63D0",
  "total_fee": "10.00",
  "box_fee": "0.00",
  "delivery_fee": "0.00",
  "discount_fee": "0.00",
  "coupon_fee": "0.00",
  "payment": "10.00",
  "currency_type": "CNY",
  "paid_at": "2019-11-06 19:36:11",
  "called_at": "2019-11-06 19:38:16",
  "status": "TRADE_CLOSED",
  "refund_status": "NO_REFUND",
  "reason": "\u534F\u5546\u4E00\u81F4\u9000\u6B3E",
  "pickup_time": "2019-11-06 19:39:03",
  "pickup_time_period": "",
  "pickup_time_period_show": null,
  "takeaway_time_immediately_show": "2019-11-06 20:21:11",
  "is_takeaway": false,
  "created_at": "2019-11-06 19:36:06",
  "remarks": "\u4E0D\u6253\u5305",
  "coupon_library_id": "",
  "activity": [],
  "is_comment": 2,
  "only_vip_show_invoice": false,
  "hidden_invoice": false,
  "invoice_successed": false,
  "show_remind_button": 0,
  "order_detail_qrcode": "https://go.heytea.com/device/755067201911061936067635/order",
  "making_order_count": 0,
  "need_wait_time": 0,
  "prior": 0,
  "trade_type": "JSAPI",
  "cupboard": null,
  "is_can_refund": false,
  "is_premade": false,
  "gather_feedback": false,
  "currency": 1,
  "tax_fee": "1.15",
  "cancelCountdown": 0,
  "order_channel": "W",
  "open_pickupPage_expectTime": 1,
  "alipay_invoice_button": true,
  "new_order_invoice": false,
  "set_items": [],
  "showPaymentDetails": false,
  "items": [
  {
    "id": 106805414,
    "product_id": 161,
    "sku_id": 1186,
    "category_id": 20,
    "quantity": 1,
    "total_fee": "10.00",
    "price": "10.00",
    "name": "\u6D41\u6C99\u725B\u89D2",
    "sname": "\u6D41\u6C99\u725B\u89D2",
    "activity_name": "",
    "discount_price": 0,
    "show_trademark": false,
    "name_image": "",
    "activity_type": 0,
    "specifications": [],
    "attributes": [],
    "materials": [
    {
      "material_id": 41,
      "name": "\u52A0\u70ED(\u63A8\u8350)",
      "price": "0.00",
      "material_group_id": 3 }],


    "image": "https://go.cdn.heytea.com/storage/product/2019/11/12/5ad4996d0fdd4f3a85a25b8fe95a4db8.jpg" }],


  "shop": {
    "id": 308,
    "name": "\u76CA\u7530\u5047\u65E5\u5929\u5730GO\u5E97",
    "contact_phone": "0755-27906072",
    "contact_name": "\u559C\u8336",
    "province": "\u5E7F\u4E1C\u7701",
    "city": "\u6DF1\u5733\u5E02",
    "city_code": "156440300",
    "district": "\u5B9D\u5B89\u533A",
    "address": "\u5E7F\u6DF1\u8DEF\u798F\u6C38\u6BB577\u53F71\u5C42L1-W55\u53F7",
    "latitude": "22.66992",
    "longitude": "113.827609",
    "min_charge": 30,
    "distance": 0,
    "delivery_distance": 3000,
    "support_mt_takeaway": 0,
    "support_sf_takeaway": 1,
    "support_td_takeaway": 0,
    "support_jd_takeaway": 0,
    "scene_code": "http://go.heytea.com/storage/shop/scene_code/shop_id_308.jpg",
    "tips": "15",
    "limit_cup": 50,
    "takeaway_limit_cup": "5",
    "location_city": null,
    "disable_order_type": 2,
    "country": "\u4E2D\u56FD",
    "country_code": "156",
    "district_code": "440306",
    "support_cash": 1,
    "nearby_shop_count": 0,
    "is_current_city": null,
    "is_support_premade": 0,
    "currency": 1,
    "estimate_time_type": 1,
    "appointable": null },

  "delivery": null },

{
  "id": 3,
  "no": "755067201911061932051221",
  "outer_id": null,
  "pickup_no": "8165",
  "pickup_code_qrcode": "http://go.heytea.com/orders/755067201911061932051221/puckupNo",
  "pickup_type": "\u81EA\u63D0",
  "total_fee": "28.00",
  "box_fee": "0.00",
  "delivery_fee": "0.00",
  "discount_fee": "0.00",
  "coupon_fee": "0.00",
  "payment": "28.00",
  "currency_type": "CNY",
  "paid_at": "2019-11-06 19:32:11",
  "called_at": "2019-11-06 19:43:36",
  "status": "TRADE_CLOSED",
  "refund_status": "NO_REFUND",
  "reason": "\u534F\u5546\u4E00\u81F4\u9000\u6B3E",
  "pickup_time": "2019-11-06 19:54:35",
  "pickup_time_period": "",
  "pickup_time_period_show": null,
  "takeaway_time_immediately_show": "2019-11-06 20:17:11",
  "is_takeaway": false,
  "created_at": "2019-11-06 19:32:05",
  "remarks": "\u4E0D\u6253\u5305",
  "coupon_library_id": "",
  "activity": [],
  "is_comment": 2,
  "only_vip_show_invoice": false,
  "hidden_invoice": false,
  "invoice_successed": false,
  "show_remind_button": 0,
  "order_detail_qrcode": "https://go.heytea.com/device/755067201911061932051221/order",
  "making_order_count": 0,
  "need_wait_time": 0,
  "prior": 0,
  "trade_type": "JSAPI",
  "cupboard": null,
  "is_can_refund": false,
  "is_premade": false,
  "gather_feedback": false,
  "currency": 1,
  "tax_fee": "1.58",
  "cancelCountdown": 0,
  "order_channel": "W",
  "open_pickupPage_expectTime": 1,
  "alipay_invoice_button": true,
  "new_order_invoice": false,
  "set_items": [],
  "showPaymentDetails": false,
  "items": [
  {
    "id": 106803531,
    "product_id": 660,
    "sku_id": 1590,
    "category_id": 12,
    "quantity": 1,
    "total_fee": "28.00",
    "price": "28.00",
    "name": "\u6363\u86CB\u5357\u74DC\u6CE2\u6CE2\u51B0",
    "sname": "\u6363\u86CB\u5357\u74DC\u6CE2\u6CE2\u51B0",
    "activity_name": "",
    "discount_price": 0,
    "show_trademark": false,
    "name_image": "",
    "activity_type": 0,
    "specifications": [],
    "attributes": [],
    "materials": [
    {
      "material_id": 409,
      "name": "\u5E38\u89C4\u5438\u7BA1",
      "price": "0.00",
      "material_group_id": 27 },

    {
      "material_id": 149,
      "name": "\u6807\u51C6\uFF08\u63A8\u8350\uFF09",
      "price": "0.00",
      "material_group_id": 6 },

    {
      "material_id": 140,
      "name": "\u51B0\u6C99\uFF08\u63A8\u8350\uFF09",
      "price": "0.00",
      "material_group_id": 5 },

    {
      "material_id": 48,
      "name": "\u5C11\u7CD6",
      "price": "0.00",
      "material_group_id": 4 },

    {
      "material_id": 558,
      "name": "\u6B63\u5E38(\u63A8\u8350)",
      "price": "0.00",
      "material_group_id": 3 }],


    "image": "https://go.cdn.heytea.com/storage/product/2019/10/29/bac9cab39825405f9b80dac17027aff2.jpg" }],


  "shop": {
    "id": 308,
    "name": "\u76CA\u7530\u5047\u65E5\u5929\u5730GO\u5E97",
    "contact_phone": "0755-27906072",
    "contact_name": "\u559C\u8336",
    "province": "\u5E7F\u4E1C\u7701",
    "city": "\u6DF1\u5733\u5E02",
    "city_code": "156440300",
    "district": "\u5B9D\u5B89\u533A",
    "address": "\u5E7F\u6DF1\u8DEF\u798F\u6C38\u6BB577\u53F71\u5C42L1-W55\u53F7",
    "latitude": "22.66992",
    "longitude": "113.827609",
    "min_charge": 30,
    "distance": 0,
    "delivery_distance": 3000,
    "support_mt_takeaway": 0,
    "support_sf_takeaway": 1,
    "support_td_takeaway": 0,
    "support_jd_takeaway": 0,
    "scene_code": "http://go.heytea.com/storage/shop/scene_code/shop_id_308.jpg",
    "tips": "15",
    "limit_cup": 50,
    "takeaway_limit_cup": "5",
    "location_city": null,
    "disable_order_type": 2,
    "country": "\u4E2D\u56FD",
    "country_code": "156",
    "district_code": "440306",
    "support_cash": 1,
    "nearby_shop_count": 0,
    "is_current_city": null,
    "is_support_premade": 0,
    "currency": 1,
    "estimate_time_type": 1,
    "appointable": null },

  "delivery": null },

{
  "id": 4,
  "no": "755067201911061931525054",
  "outer_id": null,
  "pickup_no": "",
  "pickup_code_qrcode": "http://go.heytea.com/orders/755067201911061931525054/puckupNo",
  "pickup_type": "\u81EA\u63D0",
  "total_fee": "28.00",
  "box_fee": "0.00",
  "delivery_fee": "0.00",
  "discount_fee": "0.00",
  "coupon_fee": "0.00",
  "payment": "28.00",
  "currency_type": "CNY",
  "paid_at": null,
  "called_at": null,
  "status": "CANCELED",
  "refund_status": "NO_REFUND",
  "reason": "\u534F\u5546\u4E00\u81F4\u9000\u6B3E",
  "pickup_time": null,
  "pickup_time_period": "",
  "pickup_time_period_show": null,
  "takeaway_time_immediately_show": "2020-05-25 23:56:36",
  "is_takeaway": false,
  "created_at": "2019-11-06 19:31:52",
  "remarks": "\u4E0D\u6253\u5305",
  "coupon_library_id": "",
  "activity": [],
  "is_comment": 2,
  "only_vip_show_invoice": false,
  "hidden_invoice": false,
  "invoice_successed": false,
  "show_remind_button": 0,
  "order_detail_qrcode": "https://go.heytea.com/device/755067201911061931525054/order",
  "making_order_count": 0,
  "need_wait_time": 0,
  "prior": 0,
  "trade_type": "JSAPI",
  "cupboard": null,
  "is_can_refund": false,
  "is_premade": false,
  "gather_feedback": false,
  "currency": 1,
  "tax_fee": "1.58",
  "cancelCountdown": 0,
  "order_channel": "W",
  "open_pickupPage_expectTime": 1,
  "alipay_invoice_button": true,
  "new_order_invoice": false,
  "set_items": [],
  "showPaymentDetails": false,
  "items": [
  {
    "id": 106803458,
    "product_id": 660,
    "sku_id": 1590,
    "category_id": 12,
    "quantity": 1,
    "total_fee": "28.00",
    "price": "28.00",
    "name": "\u6363\u86CB\u5357\u74DC\u6CE2\u6CE2\u51B0",
    "sname": "\u6363\u86CB\u5357\u74DC\u6CE2\u6CE2\u51B0",
    "activity_name": "",
    "discount_price": 0,
    "show_trademark": false,
    "name_image": "",
    "activity_type": 0,
    "specifications": [],
    "attributes": [],
    "materials": [
    {
      "material_id": 409,
      "name": "\u5E38\u89C4\u5438\u7BA1",
      "price": "0.00",
      "material_group_id": 27 },

    {
      "material_id": 149,
      "name": "\u6807\u51C6\uFF08\u63A8\u8350\uFF09",
      "price": "0.00",
      "material_group_id": 6 },

    {
      "material_id": 140,
      "name": "\u51B0\u6C99\uFF08\u63A8\u8350\uFF09",
      "price": "0.00",
      "material_group_id": 5 },

    {
      "material_id": 48,
      "name": "\u5C11\u7CD6",
      "price": "0.00",
      "material_group_id": 4 },

    {
      "material_id": 558,
      "name": "\u6B63\u5E38(\u63A8\u8350)",
      "price": "0.00",
      "material_group_id": 3 }],


    "image": "https://go.cdn.heytea.com/storage/product/2019/10/29/bac9cab39825405f9b80dac17027aff2.jpg" }],


  "shop": {
    "id": 308,
    "name": "\u76CA\u7530\u5047\u65E5\u5929\u5730GO\u5E97",
    "contact_phone": "0755-27906072",
    "contact_name": "\u559C\u8336",
    "province": "\u5E7F\u4E1C\u7701",
    "city": "\u6DF1\u5733\u5E02",
    "city_code": "156440300",
    "district": "\u5B9D\u5B89\u533A",
    "address": "\u5E7F\u6DF1\u8DEF\u798F\u6C38\u6BB577\u53F71\u5C42L1-W55\u53F7",
    "latitude": "22.66992",
    "longitude": "113.827609",
    "min_charge": 30,
    "distance": 0,
    "delivery_distance": 3000,
    "support_mt_takeaway": 0,
    "support_sf_takeaway": 1,
    "support_td_takeaway": 0,
    "support_jd_takeaway": 0,
    "scene_code": "http://go.heytea.com/storage/shop/scene_code/shop_id_308.jpg",
    "tips": "15",
    "limit_cup": 50,
    "takeaway_limit_cup": "5",
    "location_city": null,
    "disable_order_type": 2,
    "country": "\u4E2D\u56FD",
    "country_code": "156",
    "district_code": "440306",
    "support_cash": 1,
    "nearby_shop_count": 0,
    "is_current_city": null,
    "is_support_premade": 0,
    "currency": 1,
    "estimate_time_type": 1,
    "appointable": null },

  "delivery": null },

{
  "id": 5,
  "no": "755015201910201229255436",
  "outer_id": null,
  "pickup_no": "8114",
  "pickup_code_qrcode": "http://go.heytea.com/orders/755015201910201229255436/puckupNo",
  "pickup_type": "\u81EA\u63D0",
  "total_fee": "33.00",
  "box_fee": "0.00",
  "delivery_fee": "0.00",
  "discount_fee": "0.00",
  "coupon_fee": "0.00",
  "payment": "33.00",
  "currency_type": "CNY",
  "paid_at": "2019-10-20 12:29:29",
  "called_at": "2019-10-20 12:51:15",
  "status": "TRADE_CLOSED",
  "refund_status": "NO_REFUND",
  "reason": "\u534F\u5546\u4E00\u81F4\u9000\u6B3E",
  "pickup_time": "2019-10-20 14:00:47",
  "pickup_time_period": "",
  "pickup_time_period_show": null,
  "takeaway_time_immediately_show": "2019-10-20 13:14:29",
  "is_takeaway": false,
  "created_at": "2019-10-20 12:29:25",
  "remarks": "\u4E0D\u6253\u5305",
  "coupon_library_id": "",
  "activity": [],
  "is_comment": 2,
  "only_vip_show_invoice": false,
  "hidden_invoice": false,
  "invoice_successed": false,
  "show_remind_button": 0,
  "order_detail_qrcode": "https://go.heytea.com/device/755015201910201229255436/order",
  "making_order_count": 0,
  "need_wait_time": 0,
  "prior": 0,
  "trade_type": "JSAPI",
  "cupboard": null,
  "is_can_refund": false,
  "is_premade": false,
  "gather_feedback": false,
  "currency": 1,
  "tax_fee": "-1",
  "cancelCountdown": 0,
  "order_channel": "W",
  "open_pickupPage_expectTime": 1,
  "alipay_invoice_button": true,
  "new_order_invoice": false,
  "set_items": [],
  "showPaymentDetails": false,
  "items": [
  {
    "id": 100194060,
    "product_id": 161,
    "sku_id": 1186,
    "category_id": 20,
    "quantity": 1,
    "total_fee": "10.00",
    "price": "10.00",
    "name": "\u6D41\u6C99\u725B\u89D2",
    "sname": "\u6D41\u6C99\u725B\u89D2",
    "activity_name": "",
    "discount_price": 0,
    "show_trademark": false,
    "name_image": "",
    "activity_type": 0,
    "specifications": [],
    "attributes": [],
    "materials": [
    {
      "material_id": 41,
      "name": "\u52A0\u70ED(\u63A8\u8350)",
      "price": "0.00",
      "material_group_id": 3 }],


    "image": "https://go.cdn.heytea.com/storage/product/2019/11/12/5ad4996d0fdd4f3a85a25b8fe95a4db8.jpg" },

  {
    "id": 100194061,
    "product_id": 514,
    "sku_id": 1373,
    "category_id": 11,
    "quantity": 1,
    "total_fee": "23.00",
    "price": "23.00",
    "name": "\u7206\u828B\u6CE5\u6CE2\u6CE2\u51B0",
    "sname": "\u7206\u828B\u6CE5\u6CE2\u6CE2\u51B0",
    "activity_name": "",
    "discount_price": 0,
    "show_trademark": false,
    "name_image": "",
    "activity_type": 0,
    "specifications": [],
    "attributes": [],
    "materials": [
    {
      "material_id": 409,
      "name": "\u5E38\u89C4\u5438\u7BA1",
      "price": "0.00",
      "material_group_id": 27 },

    {
      "material_id": 230,
      "name": "\u6709\u828B\u5934\u9897\u7C92(\u63A8\u8350)",
      "price": "0.00",
      "material_group_id": 12 },

    {
      "material_id": 149,
      "name": "\u6807\u51C6\uFF08\u63A8\u8350\uFF09",
      "price": "0.00",
      "material_group_id": 6 },

    {
      "material_id": 140,
      "name": "\u51B0\u6C99\uFF08\u63A8\u8350\uFF09",
      "price": "0.00",
      "material_group_id": 5 },

    {
      "material_id": 379,
      "name": "\u6B63\u5E38\u7CD6(\u63A8\u8350)",
      "price": "0.00",
      "material_group_id": 4 },

    {
      "material_id": 558,
      "name": "\u6B63\u5E38(\u63A8\u8350)",
      "price": "0.00",
      "material_group_id": 3 }],


    "image": "https://go.cdn.heytea.com/product/2019/08/02/tmp/a5a9bdd8b9db4b37a6d20df8e1aedf87.jpg" }],


  "shop": {
    "id": 28,
    "name": "\u4E07\u8C61\u5929\u5730PINK\u5E97",
    "contact_phone": "0755-86681153",
    "contact_name": "\u559C\u8336\u541B",
    "province": "\u5E7F\u4E1C\u7701",
    "city": "\u6DF1\u5733\u5E02",
    "city_code": "156440300",
    "district": "\u5357\u5C71\u533A",
    "address": "\u534E\u6DA6\u4E07\u8C61\u5929\u5730SL187\u53F7\u5546\u94FA",
    "latitude": "22.541500",
    "longitude": "113.955292",
    "min_charge": 30,
    "distance": 0,
    "delivery_distance": 3000,
    "support_mt_takeaway": 1,
    "support_sf_takeaway": 0,
    "support_td_takeaway": 0,
    "support_jd_takeaway": 0,
    "scene_code": "http://go.heytea.com/storage/shop/scene_code/shop_id_28.png",
    "tips": "15",
    "limit_cup": 10,
    "takeaway_limit_cup": "5",
    "location_city": null,
    "disable_order_type": 0,
    "country": "\u4E2D\u56FD",
    "country_code": "156",
    "district_code": "440305",
    "support_cash": 1,
    "nearby_shop_count": 0,
    "is_current_city": null,
    "is_support_premade": 0,
    "currency": 1,
    "estimate_time_type": 1,
    "appointable": null },

  "delivery": null }];exports.default = _default;

/***/ }),

/***/ 16:
/*!***************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/storeOrders.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [];exports.default = _default;

/***/ }),

/***/ 17:
/*!*************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/boardcast.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [
{
  "id": 53,
  "postId": 48,
  "no": "BB20200525152258",
  "sort": 1,
  "type": 1,
  "contentType": 1,
  "title": "喜茶制粽，现正预售中",
  "subtitle": "2020喜茶制粽端午礼盒",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/25/d7f9a7e9ea3747778d301b443147cd82.png",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 1,
    "name": null,
    "path": "https://mp.weixin.qq.com/s/eWEMnvHNtOEup-hzE38r8Q",
    "appId": null } },


{
  "id": 54,
  "postId": 49,
  "no": "BB20200525152844",
  "sort": 2,
  "type": 1,
  "contentType": 1,
  "title": "来颗布蕾QQ麻薯球",
  "subtitle": "灵感之茶，与音乐共生",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/25/0346c403e88243eaa76aa334097ad8ec.png",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 1,
    "name": null,
    "path": "https://mp.weixin.qq.com/s/AaMBCLliMla5ktAVF5TGSA",
    "appId": null } },


{
  "id": 50,
  "postId": 45,
  "no": "BB20200508143203",
  "sort": 3,
  "type": 1,
  "contentType": 1,
  "title": "喜茶星球会员升级啦",
  "subtitle": "点击了解升级详情",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/08/0a11147144ff42629e6eca9eeec53215.png",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 0,
    "name": null,
    "path": "pages/member/upgrade_publicity/index",
    "appId": null } },


{
  "id": 51,
  "postId": 46,
  "no": "BB20200521172417",
  "sort": 4,
  "type": 1,
  "contentType": 1,
  "title": "多肉车厘回归",
  "subtitle": "喜茶大陆门店现已有售",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/21/14b70fe3fd1d4a8eb0d079d5ac571bfb.jpeg",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 1,
    "name": null,
    "path": "https://mp.weixin.qq.com/s/nhnQd7zQlqJXMsjChVfCsw",
    "appId": null } },


{
  "id": 52,
  "postId": 47,
  "no": "BB20200521172540",
  "sort": 5,
  "type": 1,
  "contentType": 1,
  "title": "一杯灵感之茶的诞生",
  "subtitle": "新茶风，喜茶造",
  "coverPic": "https://go.cdn.heytea.com/storage/products/2020/05/21/f4ae061b3b1d44cfa8518b8b6ec8f348.jpeg",
  "imageTextContent": null,
  "redirectContent": {
    "redirectType": 1,
    "name": null,
    "path": "https://mp.weixin.qq.com/s/wXSC4MrE7NJlTk6uluhmDA",
    "appId": null } }];exports.default = _default;

/***/ }),

/***/ 178:
/*!***************************************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/components/jyf-parser/libs/MpHtmlParser.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * html 解析器
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20200528
 * @author JinYufeng
 * @listens MIT
 */
var cfg = __webpack_require__(/*! ./config.js */ 179),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 180),
windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;

function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.attrs = {};
  this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
  this.data = data;
  this.domain = options.domain;
  this.DOM = [];
  this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
  options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
  this.options = options;
  this.state = this.Text;
  this.STACK = [];
  // 工具函数
  this.bubble = function () {
    for (var i = _this.STACK.length, item; item = _this.STACK[--i];) {
      if (cfg.richOnlyTags[item.name]) {
        if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;
        return false;
      }
      item.c = 1;
    }
    return true;
  };
  this.decode = function (val, amp) {
    var i = -1,
    j,en;
    while (1) {
      if ((i = val.indexOf('&', i + 1)) == -1) break;
      if ((j = val.indexOf(';', i + 2)) == -1) break;
      if (val[i + 1] == '#') {
        en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
        if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
      } else {
        en = val.substring(i + 1, j);
        if (cfg.entities[en] || en == amp)
        val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
      }
    }
    return val;
  };
  this.getUrl = function (url) {
    if (url[0] == '/') {
      if (url[1] == '/') url = _this.options.prot + ':' + url;else
      if (_this.domain) url = _this.domain + url;
    } else if (_this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
    url = _this.domain + '/' + url;
    return url;
  };
  this.isClose = function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';};
  this.section = function () {return _this.data.substring(_this.start, _this.i);};
  this.parent = function () {return _this.STACK[_this.STACK.length - 1];};
  this.siblings = function () {return _this.STACK.length ? _this.parent().children : _this.DOM;};
}
MpHtmlParser.prototype.parse = function () {
  if (emoji) this.data = emoji.parseEmoji(this.data);
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  if (this.state == this.Text) this.setText();
  while (this.STACK.length) {this.popNode(this.STACK.pop());}
  if (this.DOM.length) {
    this.DOM[0].PoweredBy = 'Parser';
    if (this.title) this.DOM[0].title = this.title;
  }
  return this.DOM;
};
// 设置属性
MpHtmlParser.prototype.setAttr = function () {
  var name = this.attrName.toLowerCase();
  if (cfg.trustAttrs[name]) {
    var val = this.attrVal;
    if (val) {
      if (name == 'src') this.attrs[name] = this.getUrl(this.decode(val, 'amp'));else
      if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else
      this.attrs[name] = val;
    } else if (cfg.boolAttrs[name]) this.attrs[name] = 'T';
  }
  this.attrVal = '';
  while (blankChar[this.data[this.i]]) {this.i++;}
  if (this.isClose()) this.setNode();else
  {
    this.start = this.i;
    this.state = this.AttrName;
  }
};
// 设置文本节点
MpHtmlParser.prototype.setText = function () {
  var back,text = this.section();
  if (!text) return;
  text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;
  if (back) {
    this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
    var j = this.start + text.length;
    for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}
    return;
  }
  if (!this.pre) {
    // 合并空白符
    var tmp = [];
    for (var i = text.length, c; c = text[--i];) {
      if (!blankChar[c] || !blankChar[tmp[0]] && (c = ' ')) tmp.unshift(c);}
    text = tmp.join('');
  }
  this.siblings().push({
    type: 'text',
    text: this.decode(text) });

};
// 设置元素节点
MpHtmlParser.prototype.setNode = function () {
  var node = {
    name: this.tagName.toLowerCase(),
    attrs: this.attrs },

  close = cfg.selfClosingTags[node.name];
  this.attrs = {};
  if (!cfg.ignoreTags[node.name]) {
    // 处理属性
    var attrs = node.attrs,
    style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
    styleObj = {};
    if (attrs.id) {
      if (this.options.compress & 1) attrs.id = void 0;else
      if (this.options.useAnchor) this.bubble();
    }
    if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
    switch (node.name) {
      case 'a':
      case 'ad':


        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'embed':

        var src = node.attrs.src || '',
        type = node.attrs.type || '';
        if (type.includes('video') || src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8'))
        node.name = 'video';else
        if (type.includes('audio') || src.includes('.m4a') || src.includes('.wav') || src.includes('.mp3') || src.includes(
        '.aac'))
        node.name = 'audio';else
        break;
        if (node.attrs.autostart)
        node.attrs.autoplay = 'T';
        node.attrs.controls = 'T';





      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else
        this["".concat(node.name, "Num")]++;
        if (node.name == 'video') {
          if (this.videoNum > 3)
          node.lazyLoad = 1;
          if (attrs.width) {
            styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
            attrs.width = void 0;
          }
          if (attrs.height) {
            styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
            attrs.height = void 0;
          }
        }
        attrs.source = [];
        if (attrs.src) {
          attrs.source.push(attrs.src);
          attrs.src = void 0;
        }
        if (!attrs.controls && !attrs.autoplay) attrs.controls = 'T';
        this.bubble();
        break;
      case 'td':
      case 'th':
        if (attrs.colspan || attrs.rowspan)
        for (var k = this.STACK.length, item; item = this.STACK[--k];) {
          if (item.name == 'table') {
            item.c = void 0;
            break;
          }}}

    if (attrs.align) {
      styleObj['text-align'] = attrs.align;
      attrs.align = void 0;
    }
    // 压缩 style
    var styles = style.split(';');
    style = '';
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var _key = info[0].trim().toLowerCase(),
      _value = info.slice(1).join(':').trim();
      if (_value.includes('-webkit') || _value.includes('-moz') || _value.includes('-ms') || _value.includes('-o') || _value.includes(
      'safe'))
      style += ";".concat(_key, ":").concat(_value);else
      if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import'))
      styleObj[_key] = _value;
    }
    if (node.name == 'img') {
      if (attrs['data-src']) {
        attrs.src = attrs.src || attrs['data-src'];
        attrs['data-src'] = void 0;
      }
      if (attrs.src && !attrs.ignore) {
        if (this.bubble())
        attrs.i = (this.imgNum++).toString();else
        attrs.ignore = 'T';
      }
      if (attrs.ignore) styleObj['max-width'] = '100%';
      var width;
      if (styleObj.width) width = styleObj.width;else
      if (attrs.width) width = attrs.width.includes('%') ? attrs.width : attrs.width + 'px';
      if (width) {
        styleObj.width = width;
        attrs.width = '100%';
        if (parseInt(width) > windowWidth) {
          styleObj.height = '';
          if (attrs.height) attrs.height = void 0;
        }
      }
      if (styleObj.height) {
        attrs.height = styleObj.height;
        styleObj.height = '';
      } else if (attrs.height && !attrs.height.includes('%'))
      attrs.height += 'px';
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (!value) continue;
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // 填充链接
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      }
      // 转换 rpx
      else if (value.includes('rpx'))
        value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * windowWidth / 750 + 'px';});else
        if (key == 'white-space' && value.includes('pre'))
        this.pre = node.pre = true;
      style += ";".concat(key, ":").concat(value);
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (!close) {
      node.children = [];
      if (node.name == 'pre' && cfg.highlight) {
        this.remove(node);
        this.pre = node.pre = true;
      }
      this.siblings().push(node);
      this.STACK.push(node);
    } else if (!cfg.filter || cfg.filter(node, this) != false)
    this.siblings().push(node);
  } else {
    if (!close) this.remove(node);else
    if (node.name == 'source') {
      var parent = this.parent();
      if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
      parent.attrs.source.push(node.attrs.src);
    } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
  }
  if (this.data[this.i] == '/') this.i++;
  this.start = this.i + 1;
  this.state = this.Text;
};
// 移除标签
MpHtmlParser.prototype.remove = function (node) {var _this2 = this;
  var name = node.name,
  j = this.i;
  // 处理 svg
  var handleSvg = function handleSvg() {
    var src = _this2.data.substring(j, _this2.i + 1);
    if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;
    var i = j;
    while (_this2.data[j] != '<') {j--;}
    src = _this2.data.substring(j, i) + src;
    var parent = _this2.parent();
    if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
    parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
    _this2.siblings().push({
      name: 'img',
      attrs: {
        src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
        style: (/vertical[^;]+/.exec(node.attrs.style) || []).shift(),
        ignore: 'T' } });


  };
  if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
  while (1) {
    if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
      if (name == 'pre' || name == 'svg') this.i = j;else
      this.i = this.data.length;
      return;
    }
    this.start = this.i += 2;
    while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}
    if (this.section().toLowerCase() == name) {
      // 代码块高亮
      if (name == 'pre') {
        this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.
        substr(this.i - 5);
        return this.i = j;
      } else if (name == 'style')
      this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else
      if (name == 'title')
      this.title = this.data.substring(j + 1, this.i - 7);
      if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
      if (name == 'svg') handleSvg();
      return;
    }
  }
};
// 节点出栈处理
MpHtmlParser.prototype.popNode = function (node) {
  // 空白符处理
  if (node.pre) {
    node.pre = this.pre = void 0;
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].pre)
      this.pre = true;}
  }
  var siblings = this.siblings(),
  len = siblings.length,
  childs = node.children;
  if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false)
  return siblings.pop();
  var attrs = node.attrs;
  // 替换一些标签名
  if (cfg.blockTags[node.name]) node.name = 'div';else
  if (!cfg.trustTags[node.name]) node.name = 'span';
  // 去除块标签前后空串
  if (node.name == 'div' || node.name == 'p' || node.name[0] == 't') {
    if (len > 1 && siblings[len - 2].text == ' ')
    siblings.splice(--len - 1, 1);
    if (childs.length && childs[childs.length - 1].text == ' ')
    childs.pop();
  }
  // 处理列表
  if (node.c && (node.name == 'ul' || node.name == 'ol')) {
    if ((node.attrs.style || '').includes('list-style:none')) {
      for (var _i = 0, child; child = childs[_i++];) {
        if (child.name == 'li')
        child.name = 'div';}
    } else if (node.name == 'ul') {
      var floor = 1;
      for (var _i2 = this.STACK.length; _i2--;) {
        if (this.STACK[_i2].name == 'ul') floor++;}
      if (floor != 1)
      for (var _i3 = childs.length; _i3--;) {
        childs[_i3].floor = floor;}
    } else {
      for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
        if (_child.name == 'li') {
          _child.type = 'ol';
          _child.num = function (num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
              ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
              res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          }(num++, attrs.type) + '.';
        }}
    }
  }
  // 处理表格的边框
  if (node.name == 'table') {
    var padding = attrs.cellpadding,
    spacing = attrs.cellspacing,
    border = attrs.border;
    if (node.c) {
      this.bubble();
      attrs.style = (attrs.style || '') + ';display:table';
      if (!padding) padding = 2;
      if (!spacing) spacing = 2;
    }
    if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
    if (spacing) attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
    if (border || padding || node.c)
    (function f(ns) {
      for (var i = 0, n; n = ns[i]; i++) {
        if (n.type == 'text') continue;
        var style = n.attrs.style || '';
        if (node.c && n.name[0] == 't') {
          n.c = 1;
          style += ';display:table-' + (n.name == 'th' || n.name == 'td' ? 'cell' : n.name == 'tr' ? 'row' : 'row-group');
        }
        if (n.name == 'th' || n.name == 'td') {
          if (border) style = "border:".concat(border, "px solid gray;").concat(style);
          if (padding) style = "padding:".concat(padding, "px;").concat(style);
        } else f(n.children || []);
        if (style) n.attrs.style = style;
      }
    })(childs);
    if (this.options.autoscroll) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:scroll' };

      node.children = [table];
    }
  }
  this.CssHandler.pop && this.CssHandler.pop(node);
  // 自动压缩
  if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
  siblings[len - 1] = childs[0];
};
// 状态机
MpHtmlParser.prototype.Text = function (c) {
  if (c == '<') {
    var next = this.data[this.i + 1],
    isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};
    if (isLetter(next)) {
      this.setText();
      this.start = this.i + 1;
      this.state = this.TagName;
    } else if (next == '/') {
      this.setText();
      if (isLetter(this.data[++this.i + 1])) {
        this.start = this.i + 1;
        this.state = this.EndTag;
      } else this.Comment();
    } else if (next == '!') {
      this.setText();
      this.Comment();
    }
  }
};
MpHtmlParser.prototype.Comment = function () {
  var key;
  if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
  if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
  key = '>';
  if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
  this.i += key.length - 1;
  this.start = this.i + 1;
  this.state = this.Text;
};
MpHtmlParser.prototype.TagName = function (c) {
  if (blankChar[c]) {
    this.tagName = this.section();
    while (blankChar[this.data[this.i]]) {this.i++;}
    if (this.isClose()) this.setNode();else
    {
      this.start = this.i;
      this.state = this.AttrName;
    }
  } else if (this.isClose()) {
    this.tagName = this.section();
    this.setNode();
  }
};
MpHtmlParser.prototype.AttrName = function (c) {
  if (c == '=' || blankChar[c] || this.isClose()) {
    this.attrName = this.section();
    if (blankChar[c])
    while (blankChar[this.data[++this.i]]) {;}
    if (this.data[this.i] == '=') {
      while (blankChar[this.data[++this.i]]) {;}
      this.start = this.i--;
      this.state = this.AttrValue;
    } else this.setAttr();
  }
};
MpHtmlParser.prototype.AttrValue = function (c) {
  if (c == '"' || c == "'") {
    this.start++;
    if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
    this.attrVal = this.section();
    this.i++;
  } else {
    for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
    this.attrVal = this.section();
  }
  this.setAttr();
};
MpHtmlParser.prototype.EndTag = function (c) {
  if (blankChar[c] || c == '>' || c == '/') {
    var name = this.section().toLowerCase();
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].name == name) break;}
    if (i != -1) {
      var node;
      while ((node = this.STACK.pop()).name != name) {this.popNode(node);}
      this.popNode(node);
    } else if (name == 'p' || name == 'br')
    this.siblings().push({
      name: name,
      attrs: {} });

    this.i = this.data.indexOf('>', this.i);
    this.start = this.i + 1;
    if (this.i == -1) this.i = this.data.length;else
    this.state = this.Text;
  }
};
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 179:
/*!*********************************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/components/jyf-parser/libs/config.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */

var canIUse = wx.canIUse('editor'); // 高基础库标识，用于兼容

module.exports = {
  // 出错占位图
  errorImg: null,
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,section' + (

  canIUse ? '' :

  ',pre')),
  // 将被移除的标签
  ignoreTags: makeMap(
  'area,base,canvas,frame,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr' + (

  canIUse ? ',rp' : '') +


  ',iframe'),


  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,picture,table' + (

  canIUse ? ',bdi,bdo,caption,rt,ruby' : '')),


  // 自闭合的标签
  selfClosingTags: makeMap(
  'area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),

  // 信任的属性
  trustAttrs: makeMap(
  'align,allowfullscreen,alt,app-id,author,autoplay,autostart,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,width,xmlns'),

  // bool 型的属性
  boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
  // 信任的标签
  trustTags: makeMap(
  'a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video' + (

  canIUse ? ',bdi,bdo,caption,pre,rt,ruby' : '')),





  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = Object.create(null),
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}

/***/ }),

/***/ 18:
/*!********************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/mart.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [
{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f3a26c6ce9594b1e97324c82798f6c71.png",
  "id": 308158,
  "itemNo": "5875254410113816001",
  "itemStock": 629,
  "name": "芝芝果茶系列 喜茶xCONTIGO联名芝芝/波波吸管杯",
  "itemSalesVolume": 5734,
  "salePrice": 14800,
  "labelPrice": 14800 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/1f2a67c624a7451d968e9e4b03954219.png",
  "id": 308157,
  "itemNo": "5875248837678562001",
  "itemStock": 52,
  "name": "芝芝果茶系列 芝芝/波波玻璃杯",
  "itemSalesVolume": 2784,
  "salePrice": 3800,
  "labelPrice": 3800 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/144c0c63c6974c31aed91115880e0f2f.png",
  "id": 308145,
  "itemNo": "5873948140577130001",
  "itemStock": 36,
  "name": "夫子来喜 茶礼盒",
  "itemSalesVolume": 102,
  "salePrice": 6800,
  "labelPrice": 6800 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/33877cdc294b4f53b6d354a811b70e98.png",
  "id": 308160,
  "itemNo": "5889961614260412001",
  "itemStock": 1098,
  "name": "太妃焦糖味 爆米花 60gX3袋",
  "itemSalesVolume": 1517,
  "salePrice": 3600,
  "labelPrice": 3600 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/4bf0414775c44eca829aa5242d459a05.png",
  "id": 308159,
  "itemNo": "5878654210726418001",
  "itemStock": 637,
  "name": "灵感一周茶礼盒 7款喜茶经典茗茶袋泡茶",
  "itemSalesVolume": 1848,
  "salePrice": 4800,
  "labelPrice": 4800 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/d3630bd4bc854938a8169c420f3a6849.jpg",
  "id": 308156,
  "itemNo": "5875245257658433001",
  "itemStock": 763,
  "name": "混坚果3口味 2盒装 芥末味/海苔味/麻辣火锅味",
  "itemSalesVolume": 2082,
  "salePrice": 6000,
  "labelPrice": 6000 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/edc8203bfaab4cb19caf01e168acecf1.png",
  "id": 308152,
  "itemNo": "5874582768671687001",
  "itemStock": 77,
  "name": "广州限定搪瓷杯",
  "itemSalesVolume": 370,
  "salePrice": 8400,
  "labelPrice": 8400 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/73ef887855c74af09702b635d1464973.png",
  "id": 308153,
  "itemNo": "5874584305257205001",
  "itemStock": 35,
  "name": "广州限定帆布袋",
  "itemSalesVolume": 311,
  "salePrice": 5800,
  "labelPrice": 5800 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/d58efe491b54453bb86757ad71e1a725.png",
  "id": 308154,
  "itemNo": "5874586879833837001",
  "itemStock": 187,
  "name": "广州限定皮质手机壳",
  "itemSalesVolume": 142,
  "salePrice": 7200,
  "labelPrice": 7200 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/b99765b790b842fba62f087e156f6c6b.png",
  "id": 308155,
  "itemNo": "5874589128570809001",
  "itemStock": 71,
  "name": "广州限定钥匙扣",
  "itemSalesVolume": 141,
  "salePrice": 3800,
  "labelPrice": 3800 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/81cf385b26fe48d7971b81bedf4a28e3.png",
  "id": 308135,
  "itemNo": "5871100589448027001",
  "itemStock": 567,
  "name": "喜茶WonderLab联名礼盒 饱腹食品代餐奶昔6瓶",
  "itemSalesVolume": 1245,
  "salePrice": 13900,
  "labelPrice": 15900 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/7e8f188bef8f48eea2a208970be59153.png",
  "id": 308142,
  "itemNo": "5871327666758468001",
  "itemStock": 6814,
  "name": "喜茶饼家夹心小方",
  "itemSalesVolume": 1797,
  "salePrice": 4500,
  "labelPrice": 4500 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/28a63bbd2bf6467790d39f4ed9274ec1.png",
  "id": 308129,
  "itemNo": "5858321915470775001",
  "itemStock": 212,
  "name": "灵感魔都手机壳",
  "itemSalesVolume": 227,
  "salePrice": 2900,
  "labelPrice": 2900 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/ce87ab4bf1bd4dd8b2249fc4bc228baf.png",
  "id": 308130,
  "itemNo": "5858325640508027001",
  "itemStock": 66,
  "name": "灵感魔都帆布袋",
  "itemSalesVolume": 200,
  "salePrice": 3900,
  "labelPrice": 3900 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/0f178944c5db4cf3a76489010c0f24d0.png",
  "id": 308132,
  "itemNo": "5858332808611918001",
  "itemStock": 0,
  "name": "灵感魔都小男巫钥匙扣",
  "itemSalesVolume": 168,
  "salePrice": 2900,
  "labelPrice": 2900 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/17198929f7e7409aadf8930e492770bb.png",
  "id": 308131,
  "itemNo": "5858330358639234001",
  "itemStock": 0,
  "name": "灵感魔都冰箱贴",
  "itemSalesVolume": 334,
  "salePrice": 2500,
  "labelPrice": 2500 },

{
  "thumbnail": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/db26492cad3b40afbfe819c39df5ee58.png",
  "id": 308133,
  "itemNo": "5858334811291675001",
  "itemStock": 0,
  "name": "灵感魔都AirPods Case",
  "itemSalesVolume": 273,
  "salePrice": 2900,
  "labelPrice": 2900 }];exports.default = _default;

/***/ }),

/***/ 180:
/*!*************************************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/components/jyf-parser/libs/CssHandler.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cfg = __webpack_require__(/*! ./config.js */ 179),
isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};

function CssHandler(tagStyle) {
  var styles = Object.assign(Object.create(null), cfg.userAgentStyles);
  for (var item in tagStyle) {
    styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}
  this.styles = styles;
}
CssHandler.prototype.getStyle = function (data) {
  this.styles = new parser(data, this.styles).parse();
};
CssHandler.prototype.match = function (name, attrs) {
  var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
  if (attrs.class) {
    var items = attrs.class.split(' ');
    for (var i = 0, item; item = items[i]; i++) {
      if (tmp = this.styles['.' + item])
      matched += tmp + ';';}
  }
  if (tmp = this.styles['#' + attrs.id])
  matched += tmp + ';';
  return matched;
};
module.exports = CssHandler;

function parser(data, init) {
  this.data = data;
  this.floor = 0;
  this.i = 0;
  this.list = [];
  this.res = init;
  this.state = this.Space;
}
parser.prototype.parse = function () {
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  return this.res;
};
parser.prototype.section = function () {
  return this.data.substring(this.start, this.i);
};
// 状态机
parser.prototype.Space = function (c) {
  if (c == '.' || c == '#' || isLetter(c)) {
    this.start = this.i;
    this.state = this.Name;
  } else if (c == '/' && this.data[this.i + 1] == '*')
  this.Comment();else
  if (!cfg.blankChar[c] && c != ';')
  this.state = this.Ignore;
};
parser.prototype.Comment = function () {
  this.i = this.data.indexOf('*/', this.i) + 1;
  if (!this.i) this.i = this.data.length;
  this.state = this.Space;
};
parser.prototype.Ignore = function (c) {
  if (c == '{') this.floor++;else
  if (c == '}' && ! --this.floor) this.state = this.Space;
};
parser.prototype.Name = function (c) {
  if (cfg.blankChar[c]) {
    this.list.push(this.section());
    this.state = this.NameSpace;
  } else if (c == '{') {
    this.list.push(this.section());
    this.Content();
  } else if (c == ',') {
    this.list.push(this.section());
    this.Comma();
  } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
  this.state = this.Ignore;
};
parser.prototype.NameSpace = function (c) {
  if (c == '{') this.Content();else
  if (c == ',') this.Comma();else
  if (!cfg.blankChar[c]) this.state = this.Ignore;
};
parser.prototype.Comma = function () {
  while (cfg.blankChar[this.data[++this.i]]) {;}
  if (this.data[this.i] == '{') this.Content();else
  {
    this.start = this.i--;
    this.state = this.Name;
  }
};
parser.prototype.Content = function () {
  this.start = ++this.i;
  if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
  var content = this.section();
  for (var i = 0, item; item = this.list[i++];) {
    if (this.res[item]) this.res[item] += ';' + content;else
    this.res[item] = content;}
  this.list = [];
  this.state = this.Space;
};

/***/ }),

/***/ 19:
/*!***************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/productList.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "id": 149,
  "code": null,
  "name": "外卖3元代金券",
  "score": 300,
  "store": 731,
  "imageId": 145538,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/47cf654056494b3ba5556d23391c9633.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 150,
  "code": null,
  "name": "外卖5元代金券",
  "score": 500,
  "store": 646,
  "imageId": 145539,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/31e4070fff364f98bf40b8cf6704c9c4.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 151,
  "code": null,
  "name": "外卖10元代金券",
  "score": 1000,
  "store": 411,
  "imageId": 145540,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/4d230aaa89f3412d99b140aa0b471c09.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 152,
  "code": null,
  "name": "外卖20元代金券",
  "score": 2000,
  "store": 877,
  "imageId": 145543,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/994d95460d41428e923d8de54840581f.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 156,
  "code": null,
  "name": "外卖买二赠一券",
  "score": 2400,
  "store": 854,
  "imageId": 145554,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/16add8a8af2141b7bad9ebbf8c40cd84.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 153,
  "code": null,
  "name": "外卖25元代金券",
  "score": 2500,
  "store": 949,
  "imageId": 145544,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/6376f01ea7c44d988ba21376129ff67f.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 158,
  "code": null,
  "name": "外卖波波家族券",
  "score": 2800,
  "store": 197,
  "imageId": 145559,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/9cace2695e2d48bb86e5a38889282b0f.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 155,
  "code": null,
  "name": "外卖买一赠一券",
  "score": 2800,
  "store": 398,
  "imageId": 145553,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/52ebe803ab554ebb823d5e83d70dab9a.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 157,
  "code": null,
  "name": "外卖咖啡券",
  "score": 2900,
  "store": 198,
  "imageId": 145558,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/778839aab8364f72a447f584531a2bc9.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 154,
  "code": null,
  "name": "外卖赠饮券",
  "score": 3600,
  "store": 473,
  "imageId": 145547,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 0,
  "image_url": "/storage/products/2020/05/07/febaf8cf51934def9e2dbd1f16f40e5e.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 136,
  "code": null,
  "name": "HEYTEA3元代金券",
  "score": 300,
  "store": 806,
  "imageId": 145427,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/5a1cc7eb16614502aba65353d84a47b7.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 159,
  "code": null,
  "name": "HEYTEA加料券",
  "score": 450,
  "store": 163,
  "imageId": 147244,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/11/3151d4fd07e94c1e9b9b5a855e9441ce.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 137,
  "code": null,
  "name": "HEYTEA5元代金券",
  "score": 500,
  "store": 546,
  "imageId": 145431,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/ff91db9794634af58e2b528669652586.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 138,
  "code": null,
  "name": "HEYTEA10元代金券",
  "score": 1000,
  "store": 217,
  "imageId": 145433,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/6accb79605344dbe92ec965a0a79fd0d.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 139,
  "code": null,
  "name": "HEYTEA20元代金券",
  "score": 2000,
  "store": 664,
  "imageId": 145434,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/b8d9c79702d84507ad9a4d62b74feafc.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 144,
  "code": null,
  "name": "HEYTEA买二赠一券",
  "score": 2400,
  "store": 0,
  "imageId": 145443,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/a8a97fa8cad74c90aaa69eeecab07b15.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 140,
  "code": null,
  "name": "HEYTEA25元代金券",
  "score": 2500,
  "store": 753,
  "imageId": 145435,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/1191302d792a4659859a3f3dc8272645.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 143,
  "code": null,
  "name": "HEYTEA买一赠一券",
  "score": 2800,
  "store": 301,
  "imageId": 145440,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/5decb0e19389487a8f8edab4e8ba50c5.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 146,
  "code": null,
  "name": "HEYTEA波波家族券",
  "score": 2800,
  "store": 173,
  "imageId": 145447,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/33e6164b1784406e90e156c30bb1d12d.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 147,
  "code": null,
  "name": "HEYTEA咖啡券",
  "score": 2900,
  "store": 188,
  "imageId": 145448,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/60b0c4af60b0437faf7c759e4afe5b54.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 141,
  "code": null,
  "name": "HEYTEA优先券",
  "score": 3000,
  "store": 734,
  "imageId": 145437,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/bdf20e5efcee4f30bb56d017601bed27.jpeg",
  "http_url": "https://go.cdn.heytea.com" },
{
  "id": 142,
  "code": null,
  "name": "HEYTEA赠饮券",
  "score": 3600,
  "store": 843,
  "imageId": 145438,
  "skus": null,
  "source": null,
  "specification": 0,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "mall_type": 1,
  "member_type": 1,
  "image_url": "/storage/products/2020/05/07/8188b0d7fcc94a01bb81ab84eee4c62a.jpeg",
  "http_url": "https://go.cdn.heytea.com" }];exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"order-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"order-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"order-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"order-app","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***********************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/notices.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "id": 10,
  "content": "多肉车厘回归，精选当季山东樱桃，颗颗手工去核，入茶清甜消暑，快来下单尝鲜吧~",
  "image_id": 114210,
  "image": "https://go.cdn.heytea.com/2020/02/26/tmp/f5d557b627b640838d0c324bd96eabfb.jpg" },

{
  "id": 7,
  "content": "太妃焦糖爆米花全新上市，焦香十足，美味易爆，快来「喜茶食验室」下单尝鲜吧~",
  "image_id": 104726,
  "image": "https://go.cdn.heytea.com/2020/01/09/tmp/3f393edea5094c1d8f8b524610caa531.jpg" }];exports.default = _default;

/***/ }),

/***/ 21:
/*!*****************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/productDetail.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": 149,
  "name": "外卖3元代金券",
  "score": 300,
  "store": 355,
  "remark": "兑换说明：仅限在喜茶GO小程序下单时，选择“外卖配送”后可用；积分商城可兑换的喜茶券为电子券，成功兑换后可在您的喜茶券账户查看。成功兑换后的喜茶券即刻生效，不可退货。若使用过程中遇到问题，可联系喜茶客服帮您处理。",
  "specification": [],
  "skus": {},
  "unit": 1,
  "cut": "3.0元",
  "enough": "无门槛",
  "valen": null,
  "buy": "null",
  "fee": "null",
  "discount": "null",
  "type": "现金券",
  "sourceId": 2616,
  "sourceType": "App\\Models\\Coupon",
  "cname": null,
  "mall_type": 1,
  "member_type": 0,
  "http_url": "https://go.cdn.heytea.com",
  "image_url": "/storage/products/2020/05/07/47cf654056494b3ba5556d23391c9633.jpeg",
  "image_gallery": ["/storage/products/2020/05/07/47cf654056494b3ba5556d23391c9633.jpeg"],
  "is_specification": 0,
  "period_day": 1,
  "period_end": "2020-06-29",
  "period_start": "2020-05-29",
  "period_type": 1,
  "unit_time": "月",
  "category_limit": 1,
  "product_limit": 1,
  "shop_limit": 1,
  "content_text": "不可与现金券,赠饮券,买赠券,折扣券同时使用",
  "gray_flag": 1,
  "interval_time": "1",
  "type_num": 0,
  "use_limit": 2,
  "analytic_remark": null };exports.default = _default;

/***/ }),

/***/ 22:
/*!**********************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/scores.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "id": 73600008,
  "scoreChange": 1,
  "method": 7,
  "description": "会员任务领取_每日签到（奖励随机翻倍）",
  "createAt": "2020-05-30 00:41:48",
  "sourceType": null,
  "orderNo": null,
  "payment": null,
  "shopName": null,
  "client": 1 },
{
  "id": 73600007,
  "scoreChange": 10,
  "method": 7,
  "description": "会员任务领取_完善个人资料",
  "createAt": "2020-05-30 00:41:45",
  "sourceType": null,
  "orderNo": null,
  "payment": null,
  "shopName": null,
  "client": 1 },
{
  "id": 70873226,
  "scoreChange": 1,
  "method": 7,
  "description": "会员任务领取_每日签到（奖励随机翻倍）",
  "createAt": "2020-05-16 08:27:21",
  "sourceType": null,
  "orderNo": null,
  "payment": null,
  "shopName": null,
  "client": 1 },
{
  "id": 54302375,
  "scoreChange": 25,
  "method": 1,
  "description": "消费获得_微信小程序下单",
  "createAt": "2020-01-18 18:05:53",
  "sourceType": "App\\Models\\Order",
  "orderNo": "755067202001181805428749",
  "payment": "50.00",
  "shopName": "益田假日天地GO店",
  "client": 1 },
{
  "id": 42968209,
  "scoreChange": 5,
  "method": 1,
  "description": "购买 流沙牛角 等1件商品",
  "createAt": "2019-11-06 19:36:12",
  "sourceType": "App\\Models\\Order",
  "orderNo": "755067201911061936067634",
  "payment": "10.00",
  "shopName": "益田假日天地GO店",
  "client": 1 },
{
  "id": 42967480,
  "scoreChange": 14,
  "method": 1,
  "description": "购买 捣蛋南瓜波波冰 等1件商品",
  "createAt": "2019-11-06 19:32:12",
  "sourceType": "App\\Models\\Order",
  "orderNo": "755067201911061932051220",
  "payment": "28.00",
  "shopName": "益田假日天地GO店",
  "client": 1 },
{
  "id": 40618359,
  "scoreChange": 2,
  "method": 7,
  "description": "每日签到（奖励随机翻倍）",
  "createAt": "2019-10-21 15:16:17",
  "sourceType": null,
  "orderNo": null,
  "payment": null,
  "shopName": null,
  "client": 1 },
{
  "id": 40415803,
  "scoreChange": 16,
  "method": 1,
  "description": "购买 流沙牛角 等2件商品",
  "createAt": "2019-10-20 12:29:30",
  "sourceType": "App\\Models\\Order",
  "orderNo": "755015201910201229255435",
  "payment": "33.00",
  "shopName": "万象天地PINK店",
  "client": 1 }];exports.default = _default;

/***/ }),

/***/ 23:
/*!**************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/martDetail.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _storeId$storeIdList$;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = (_storeId$storeIdList$ = {
  "storeId": 9203,
  "storeIdList": null,
  "id": 308158,
  "itemNo": "5875254410113816001" }, _defineProperty(_storeId$storeIdList$, "storeId",
9203), _defineProperty(_storeId$storeIdList$,
"barcode", "WD015875254410118605"), _defineProperty(_storeId$storeIdList$,
"name", "芝芝果茶系列 喜茶xCONTIGO联名芝芝/波波吸管杯"), _defineProperty(_storeId$storeIdList$,
"categoryId", 5008066737), _defineProperty(_storeId$storeIdList$,
"labelId", null), _defineProperty(_storeId$storeIdList$,
"labelName", null), _defineProperty(_storeId$storeIdList$,
"brand", ""), _defineProperty(_storeId$storeIdList$,
"categoryDTO", {
  "id": 5008066737,
  "parentId": null,
  "category": "杯类产品",
  "categoryImgUrl": "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/fe5bafefa36c4c07b1b4e8c8bf4cb9f8z",
  "status": 1,
  "seq": 28,
  "isLeaf": 1,
  "industryId": 3,
  "name": null,
  "imgUrl": null,
  "imgUrlValue": null,
  "childrenCategory": [],
  "parentCategory": null,
  "outCategoryIdList": null }), _defineProperty(_storeId$storeIdList$,

"salePrice", 14800), _defineProperty(_storeId$storeIdList$,
"labelPrice", 14800), _defineProperty(_storeId$storeIdList$,
"memberPrice", null), _defineProperty(_storeId$storeIdList$,
"itemSalesVolume", 5735), _defineProperty(_storeId$storeIdList$,
"virtualSalesVolume", 0), _defineProperty(_storeId$storeIdList$,
"isShelf", 1), _defineProperty(_storeId$storeIdList$,
"itemStock", 626), _defineProperty(_storeId$storeIdList$,
"itemWithholdStock", 0), _defineProperty(_storeId$storeIdList$,
"describe", "<p><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/636beabc152f42b4a53b03e965a6256a.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/a0859178aef54178a7931cca26364577.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/70d45373965244d7aa69694cf80dcec2.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/37556ad39fbd43aaa245088017c15d44.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/bf8f0864d0854829aa82c2fd7178e2ef.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/8b40a73f6a9042a385ab4c65e053802f.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/50f7f75426b9412b95d8848fc4090069.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/80a346fac54749a1acad9c8ec115b11f.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/e2109b23aa354853a0faed67ad14e3ed.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/21dccf357bc74cc0a0faecf39c13a421.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/debb7001eaea4fe1aaa5012820d55abf.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/c3b7d74a6a0545d6857e9ed1bc26de9a.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/b5dfcec384c94d609572e88bf7fc0f54.png\" style=\"max-width: 100%;\"><img src=\"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f1ca48c88dc9438abfefa9ca57c43dca.png\" style=\"max-width: 100%;\"></p>"), _defineProperty(_storeId$storeIdList$,
"status", 1), _defineProperty(_storeId$storeIdList$,
"thumbnail", "https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f3a26c6ce9594b1e97324c82798f6c71.png"), _defineProperty(_storeId$storeIdList$,
"tag1", 0), _defineProperty(_storeId$storeIdList$,
"unit", "个"), _defineProperty(_storeId$storeIdList$,
"paySubtractStock", false), _defineProperty(_storeId$storeIdList$,
"itemOrder", 0), _defineProperty(_storeId$storeIdList$,
"createTime", "2020-04-22 11:17:26"), _defineProperty(_storeId$storeIdList$,
"updateTime", "2020-05-25 00:47:00"), _defineProperty(_storeId$storeIdList$,
"costPrice", 0), _defineProperty(_storeId$storeIdList$,
"freight", 1200), _defineProperty(_storeId$storeIdList$,
"weight", 0), _defineProperty(_storeId$storeIdList$,
"placeOfOrigin", ""), _defineProperty(_storeId$storeIdList$,
"shelfLife", null), _defineProperty(_storeId$storeIdList$,
"shelfLifeUnit", 0), _defineProperty(_storeId$storeIdList$,
"deliveryTimeType", 1), _defineProperty(_storeId$storeIdList$,
"deliveryTime", null), _defineProperty(_storeId$storeIdList$,
"daysAfterBuy", 1), _defineProperty(_storeId$storeIdList$,
"daysAfterBuyRange", "1-3"), _defineProperty(_storeId$storeIdList$,
"preSellStartTime", null), _defineProperty(_storeId$storeIdList$,
"preSellEndTime", null), _defineProperty(_storeId$storeIdList$,
"freightTemplateId", 21), _defineProperty(_storeId$storeIdList$,
"invoiceTemplateId", null), _defineProperty(_storeId$storeIdList$,
"length", null), _defineProperty(_storeId$storeIdList$,
"width", null), _defineProperty(_storeId$storeIdList$,
"height", null), _defineProperty(_storeId$storeIdList$,
"volume", null), _defineProperty(_storeId$storeIdList$,
"subName", "仅波波吸管杯&芝芝吸管杯有货"), _defineProperty(_storeId$storeIdList$,
"peopleLimitAmount", null), _defineProperty(_storeId$storeIdList$,
"placeOfDispatch", "广东广州"), _defineProperty(_storeId$storeIdList$,
"shelfTime", "2020-05-23T02:04:50.000+0000"), _defineProperty(_storeId$storeIdList$,
"preSell", false), _defineProperty(_storeId$storeIdList$,
"materialUrls", [
"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f3a26c6ce9594b1e97324c82798f6c71.png",
"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/524757c5ea534781b18fb882cdb4f650.png",
"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/f5bc97d7e70e4c5e9d516dde70dc9701.png",
"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/6300ca05a21e4283869b090a0e5ffec7.png",
"https://prod-mall-cos-1252929494.cos.ap-guangzhou.myqcloud.com/2307edb41ce8451bb5fbb20c4dad05a1.png"]), _defineProperty(_storeId$storeIdList$,

"skuTreeList", [{
  "keyId": 116,
  "attrKeySort": 0,
  "keyName": "款式",
  "showImage": 0,
  "treeValList": [{
    "valId": 1700,
    "attrValSort": 0,
    "valName": "莓莓吸管杯",
    "imageId": null,
    "imageUrl": null },
  {
    "valId": 1701,
    "attrValSort": 1,
    "valName": "桃桃吸管杯",
    "imageId": null,
    "imageUrl": null },
  {
    "valId": 1707,
    "attrValSort": 2,
    "valName": "芝芝吸管杯",
    "imageId": null,
    "imageUrl": null },
  {
    "valId": 1708,
    "attrValSort": 3,
    "valName": "波波吸管杯",
    "imageId": null,
    "imageUrl": null },
  {
    "valId": 1709,
    "attrValSort": 4,
    "valName": "葡萄吸管杯",
    "imageId": null,
    "imageUrl": null }] }]), _defineProperty(_storeId$storeIdList$,


"skuInfoList", [{
  "skuId": 12410,
  "skuBarcode": "50100830",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 0,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1700,
    "attrValSort": null,
    "valName": "莓莓吸管杯" }],

  "itemNo": "5875254410113816001" },
{
  "skuId": 12411,
  "skuBarcode": "50100832",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 0,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1701,
    "attrValSort": null,
    "valName": "桃桃吸管杯" }],

  "itemNo": "5875254410113816001" },
{
  "skuId": 12416,
  "skuBarcode": "50100833",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 222,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1707,
    "attrValSort": null,
    "valName": "芝芝吸管杯" }],

  "itemNo": "5875254410113816001" },
{
  "skuId": 12417,
  "skuBarcode": "50100831",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 404,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1708,
    "attrValSort": null,
    "valName": "波波吸管杯" }],

  "itemNo": "5875254410113816001" },
{
  "skuId": 12418,
  "skuBarcode": "50100829",
  "salePrice": 14800,
  "labelPrice": 14800,
  "memberPrice": null,
  "stock": 0,
  "withholdStock": 0,
  "skuInfoNames": [{
    "keyId": 116,
    "attrKeySort": 0,
    "keyName": "款式",
    "valId": 1709,
    "attrValSort": null,
    "valName": "葡萄吸管杯" }],

  "itemNo": "5875254410113816001" }]), _storeId$storeIdList$);exports.default = _default;

/***/ }),

/***/ 24:
/*!*************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/hotSearch.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "productName": "豆豆雪糕杯",
  "productId": 716,
  "type": 1,
  "images": [{
    "id": 156414,
    "url": "https://go.cdn.heytea.com/storage/product/2020/06/01/0080e20b3cca4d85ac19db53163aa138.jpg" },
  {
    "id": 154137,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/27/01ab97ed6518438ebdca8683c059b94c.jpg" }],

  "nameImage": "",
  "showTrademark": false },
{
  "productName": "芝芝莓莓 ®",
  "productId": 932,
  "type": 1,
  "images": [{
    "id": 156415,
    "url": "https://go.cdn.heytea.com/storage/product/2020/06/01/9cd1cc3f5c074d28b32af9e3e3a2cd14.jpg" },
  {
    "id": 154138,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/27/0c83954c0d5547b4b1fe1650b9b317b0.jpg" }],

  "nameImage": "",
  "showTrademark": false },
{
  "productName": "多肉芒芒甘露",
  "productId": 941,
  "type": 1,
  "images": [{
    "id": 155005,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/29/933b36506a8d450eb0f54f6b3c39d84f.jpg" },
  {
    "id": 155006,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/29/cfafc3e1a8ad45f8a1aebf70e355ce28.jpg" }],

  "nameImage": "https://go.cdn.heytea.com/storage/product/2020/05/29/d3d7c45908a24863acc51893320cb177.jpg",
  "showTrademark": false },
{
  "productName": "满杯红柚",
  "productId": 944,
  "type": 1,
  "images": [{
    "id": 155009,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/29/5648897812654a459ec7c70d4207acfb.jpg" },
  {
    "id": 155010,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/29/35abcb9cee8c4f9c907e5190f2322531.jpg" }],

  "nameImage": "https://go.cdn.heytea.com/storage/product/2020/05/29/d865085468ed414e8d63b13593d2aabc.jpg",
  "showTrademark": false },
{
  "productName": "多肉葡萄",
  "productId": 931,
  "type": 2,
  "images": [{
    "id": 154995,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/29/92a953a3ffaf4ce6bb29beb54efc0b5d.jpg" },
  {
    "id": 117059,
    "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/132420629a0d4fe78e2a164e3f1c44b7.jpg" }],

  "nameImage": "https://go.cdn.heytea.com/storage/product/2020/03/02/3aa66935a73f4b02ad78e591e1decabb.jpg",
  "showTrademark": false },
{
  "productName": "多肉芒芒甘露",
  "productId": 941,
  "type": 2,
  "images": [{
    "id": 135047,
    "url": "https://go.cdn.heytea.com/storage/product/2020/04/15/44ed201701ef406087100b0c1690daad.jpg" },
  {
    "id": 117036,
    "url": "https://go.cdn.heytea.com/storage/product/2020/03/04/de106edd904148f185f6273835be0baf.jpg" }],

  "nameImage": "",
  "showTrademark": false },
{
  "productName": "多肉芒芒甘露",
  "productId": 901,
  "type": 2,
  "images": [{
    "id": 154996,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/29/fdd842483f664d73bcc04105a7b412a5.jpg" },
  {
    "id": 143249,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/03/d6715484323c404086058c662ce3c8c8.jpg" }],

  "nameImage": "https://go.cdn.heytea.com/storage/product/2020/05/03/7c8d55f76d1240a196983d216d86e7ca.jpg",
  "showTrademark": false }];exports.default = _default;

/***/ }),

/***/ 25:
/*!*****************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/historySearch.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "productName": "芝芝莓莓 ®",
  "productId": 932,
  "type": 1,
  "images": [{
    "id": 156414,
    "url": "https://go.cdn.heytea.com/storage/product/2020/06/01/0080e20b3cca4d85ac19db53163aa138.jpg" },
  {
    "id": 154137,
    "url": "https://go.cdn.heytea.com/storage/product/2020/05/27/01ab97ed6518438ebdca8683c059b94c.jpg" }],

  "nameImage": "",
  "showTrademark": false }];exports.default = _default;

/***/ }),

/***/ 26:
/*!***************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/orderDetail.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "reason": "协商一致退款",
  "open_pickupPage_expectTime": 1,
  "gather_feedback": false,
  "pickup_code_qrcode": "http://go.heytea.com/orders/755015201910201229255435/puckupNo",
  "spell_unique_id": "",
  "delivery_fee": "0.00",
  "prior": 0,
  "pickup_type": "自提",
  "total_fee": 33.00,
  "payment": "33.00",
  "id": 55596826,
  "is_takeaway": false,
  "alipay_invoice_button": true,
  "set_items": [],
  "refund_status": "NO_REFUND",
  "invoice_successed": false,
  "new_order_invoice": false,
  "paid_at": "2019-10-20 12:29:29",
  "currency_type": "CNY",
  "coupon_fee": "0.00",
  "showPaymentDetails": false,
  "pickup_time": "2019-10-20 14:00:47",
  "items": [{
    "activity_name": "",
    "images": {
      "data": [{
        "id": 88364,
        "url": "https://go.cdn.heytea.com/storage/product/2019/11/12/5ad4996d0fdd4f3a85a25b8fe95a4db8.jpg" },

      {
        "id": 121233,
        "url": "https://go.cdn.heytea.com/storage/product/2020/03/11/78ad5460e80d4587a8f07abc4baf76e9.jpg" }] },



    "quantity": 1,
    "discount_price": 0,
    "sku_id": 1186,
    "specifications": {
      "data": [] },

    "name_image": "",
    "show_trademark": false,
    "category_id": 20,
    "materials": [{
      "material_group_id": 3,
      "price": "0.00",
      "name": "加热(推荐)",
      "material_id": 41 }],

    "price": "10.00",
    "sname": "流沙牛角",
    "product_id": 161,
    "total_fee": "10.00",
    "activity_type": 0,
    "name": "流沙牛角",
    "attributes": {
      "data": [] },

    "id": 100194060 },

  {
    "activity_name": "",
    "images": {
      "data": [{
        "id": 64565,
        "url": "https://go.cdn.heytea.com/product/2019/08/02/tmp/a5a9bdd8b9db4b37a6d20df8e1aedf87.jpg" },

      {
        "id": 116583,
        "url": "https://go.cdn.heytea.com/storage/product/2020/03/03/436ce2f2b562478bae451aefed7a0c97.jpg" }] },



    "quantity": 1,
    "discount_price": 0,
    "sku_id": 1373,
    "specifications": {
      "data": [] },

    "name_image": "",
    "show_trademark": false,
    "category_id": 11,
    "materials": [{
      "material_group_id": 27,
      "price": "0.00",
      "name": "常规吸管",
      "material_id": 409 },

    {
      "material_group_id": 12,
      "price": "0.00",
      "name": "有芋头颗粒(推荐)",
      "material_id": 230 },

    {
      "material_group_id": 6,
      "price": "0.00",
      "name": "标准（推荐）",
      "material_id": 149 },

    {
      "material_group_id": 5,
      "price": "0.00",
      "name": "冰沙（推荐）",
      "material_id": 140 },

    {
      "material_group_id": 4,
      "price": "0.00",
      "name": "正常糖(推荐)",
      "material_id": 379 },

    {
      "material_group_id": 3,
      "price": "0.00",
      "name": "正常(推荐)",
      "material_id": 558 }],


    "price": "23.00",
    "sname": "爆芋泥波波冰",
    "product_id": 514,
    "total_fee": "23.00",
    "activity_type": 0,
    "name": "爆芋泥波波冰",
    "attributes": {
      "data": [] },

    "id": 100194061 }],


  "status": "TRADE_CLOSED",
  "no": "755015201910201229255435",
  "hidden_invoice": false,
  "shop": {
    "support_jd_takeaway": 0,
    "is_support_premade": 0,
    "country": "中国",
    "contact_phone": "0755-86681153",
    "distance": 0,
    "city": "深圳市",
    "latitude": "22.541500",
    "limit_cup": 10,
    "disable_order_type": 0,
    "city_code": "156440300",
    "support_cash": 1,
    "tips": "15",
    "province": "广东省",
    "appointable": null,
    "location_city": null,
    "currency": 1,
    "id": 28,
    "min_charge": 30,
    "longitude": "113.955292",
    "nearby_shop_count": 0,
    "contact_name": "喜茶君",
    "address": "华润万象天地SL187号商铺",
    "is_current_city": null,
    "estimate_time_type": 1,
    "takeaway_limit_cup": "5",
    "support_td_takeaway": 0,
    "delivery_distance": 3000,
    "country_code": "156",
    "support_mt_takeaway": 1,
    "support_sf_takeaway": 0,
    "district_code": "440305",
    "district": "南山区",
    "name": "万象天地PINK店",
    "scene_code": "http://go.heytea.com/storage/shop/scene_code/shop_id_28.png" },

  "activity": [],
  "box_fee": "0.00",
  "called_at": "2019-10-20 12:51:15",
  "created_at": "2019-10-20 12:29:25",
  "is_can_refund": false,
  "outer_id": null,
  "discount_fee": "0.00",
  "order_detail_qrcode": "https://go.heytea.com/device/755015201910201229255435/order",
  "pickup_time_period_show": null,
  "making_order_count": 0,
  "is_premade": false,
  "tax_fee": "-1",
  "coupon_library_id": "",
  "is_comment": 2,
  "currency": 1,
  "order_channel": "W",
  "show_remind_button": 0,
  "only_vip_show_invoice": false,
  "delivery": null,
  "cupboard": null,
  "need_wait_time": 0,
  "cancelCountdown": 0,
  "pickup_no": "8114",
  "takeaway_time_immediately_show": "2019-10-20 13:14:29",
  "pickup_time_period": "",
  "trade_type": "JSAPI",
  "remarks": "不打包" };exports.default = _default;

/***/ }),

/***/ 27:
/*!*************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/giftCards.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [
{
  "id": 39,
  "name": "阿喜经典卡",
  "sort": 1,
  "product_list": [
  {
    "id": 1063,
    "name": "灵感之茶",
    "no": "2005092118946063",
    "category_id": 39,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/27/cc5aad062acf4fa7bf6d8a1db480e643.jpg",
    "sku_list": [
    {
      "id": 2400,
      "no": "39010184",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 998881,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2401,
      "no": "39010185",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999917,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2402,
      "no": "39010186",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999967,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2403,
      "no": "39010187",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999984,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2404,
      "no": "39010188",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999995,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2405,
      "no": "39010189",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999982,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "阿喜有礼，送礼选阿喜",
    "label": "",
    "sort": 1 },

  {
    "id": 1062,
    "name": "喜欢有你",
    "no": "2005098240053332",
    "category_id": 39,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/27/310774b20acf4ddfb83e42f4370ab5ee.jpg",
    "sku_list": [
    {
      "id": 2394,
      "no": "39010178",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999522,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2395,
      "no": "39010179",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999851,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2396,
      "no": "39010180",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999964,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2397,
      "no": "39010181",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999974,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2398,
      "no": "39010182",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999997,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2399,
      "no": "39010183",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999993,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "阿喜有礼，送TA杯灵感",
    "label": "",
    "sort": 2 },

  {
    "id": 859,
    "name": "阿喜有礼卡",
    "no": "2001090317042579",
    "category_id": 39,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/03/05/25f97758ccd446bfa622fbb56ee43117.jpg",
    "sku_list": [
    {
      "id": 2048,
      "no": "39010030",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 996147,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 1997,
      "no": "39010005",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999031,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 1998,
      "no": "39010006",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999679,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 1999,
      "no": "39010007",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999830,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2000,
      "no": "39010008",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999977,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2001,
      "no": "39010009",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999956,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "喜从天降，喜欢有礼。",
    "label": "",
    "sort": 3 }] },



{
  "id": 77,
  "name": "阿喜大儿童",
  "sort": 2,
  "product_list": [
  {
    "id": 1078,
    "name": "祖国的花朵",
    "no": "2005262287599615",
    "category_id": 77,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/30/f47f3466a76b446094dee15bdd3ae93f.jpg",
    "sku_list": [
    {
      "id": 2468,
      "no": "39010226",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999429,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2469,
      "no": "39010227",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999834,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2470,
      "no": "39010228",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999954,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2471,
      "no": "39010229",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999978,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2472,
      "no": "39010230",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999998,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2473,
      "no": "39010231",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999965,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "给茁壮成长的祖国花朵浇浇水。",
    "label": "",
    "sort": 1 },

  {
    "id": 1077,
    "name": "喜茶大儿童",
    "no": "2005269101380978",
    "category_id": 77,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/30/b023a6edb8a947eabed64f0abe166d00.jpg",
    "sku_list": [
    {
      "id": 2462,
      "no": "39010220",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999652,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2463,
      "no": "39010221",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999925,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2464,
      "no": "39010222",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999971,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2465,
      "no": "39010223",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999994,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2466,
      "no": "39010224",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999996,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "祝我的大儿童早日成为喝喜茶第一名。",
    "label": "",
    "sort": 2 }] },



{
  "id": 38,
  "name": "多肉车厘卡",
  "sort": 3,
  "product_list": [
  {
    "id": 1073,
    "name": "多肉车厘",
    "no": "2005206676227386",
    "category_id": 38,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/21/a1eb5412c77645e181af5513ab9cd2c8.jpg",
    "sku_list": [
    {
      "id": 2447,
      "no": "39010208",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999368,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2448,
      "no": "39010209",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999925,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2449,
      "no": "39010210",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999978,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2450,
      "no": "39010211",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999975,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2451,
      "no": "39010212",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999998,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2452,
      "no": "39010213",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999988,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "多肉锦“厘”请你喝",
    "label": "",
    "sort": 1 },

  {
    "id": 1072,
    "name": "Cherry blossoms",
    "no": "2005205125872416",
    "category_id": 38,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/21/e69aa5f59de24a68a9925bc869c8805e.jpg",
    "sku_list": [
    {
      "id": 2453,
      "no": "39010214",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999845,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2454,
      "no": "39010215",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999969,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2455,
      "no": "39010216",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999993,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2456,
      "no": "39010217",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999997,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2457,
      "no": "39010218",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999999,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2458,
      "no": "39010219",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999997,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "饮杯锦“厘”，开启今日好运",
    "label": "",
    "sort": 2 }] },



{
  "id": 72,
  "name": "阿喜表白卡",
  "sort": 4,
  "product_list": [
  {
    "id": 1067,
    "name": "喜欢你",
    "no": "2005181449891751",
    "category_id": 72,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/20/dfdf778485484bd5bbbaa158eebdb4db.jpg",
    "sku_list": [
    {
      "id": 2412,
      "no": "39010193",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999807,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2409,
      "no": "39010190",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999789,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2410,
      "no": "39010191",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999905,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2411,
      "no": "39010192",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999978,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2413,
      "no": "39010194",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999999,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2414,
      "no": "39010195",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999992,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "输入520，解锁我爱你",
    "label": "",
    "sort": 1 },

  {
    "id": 1069,
    "name": "LOVE",
    "no": "2005184770357582",
    "category_id": 72,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/20/5138a1bc8dce4bc5b0f95456d21168ee.jpg",
    "sku_list": [
    {
      "id": 2430,
      "no": "39010205",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999943,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2427,
      "no": "39010202",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999934,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2428,
      "no": "39010203",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999967,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2429,
      "no": "39010204",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999986,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2431,
      "no": "39010206",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999999,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2432,
      "no": "39010207",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999996,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "想你是怦然心动",
    "label": "",
    "sort": 2 },

  {
    "id": 1068,
    "name": "520",
    "no": "2005184661872021",
    "category_id": 72,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/05/20/690d2ca7f017423684a4a5bc2f910c9c.jpg",
    "sku_list": [
    {
      "id": 2424,
      "no": "39010199",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999955,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2421,
      "no": "39010196",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999914,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2422,
      "no": "39010197",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999961,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2423,
      "no": "39010198",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999996,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2425,
      "no": "39010200",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999999,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2426,
      "no": "39010201",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999999,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "You are my cup of tea",
    "label": "",
    "sort": 3 }] },



{
  "id": 75,
  "name": "阿喜桃桃卡",
  "sort": 5,
  "product_list": [
  {
    "id": 1034,
    "name": "“桃”我喜欢",
    "no": "2004226548252596",
    "category_id": 75,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/04/30/c7feb90b2d294cffaa7a9d1d58f328da.jpg",
    "sku_list": [
    {
      "id": 2337,
      "no": "39010148",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 998240,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2338,
      "no": "39010149",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999471,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2339,
      "no": "39010150",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999828,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2340,
      "no": "39010151",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999952,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2341,
      "no": "39010152",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999991,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2342,
      "no": "39010153",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999979,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "美有不同，“桃”我喜欢",
    "label": "",
    "sort": 1 },

  {
    "id": 1035,
    "name": "桃桃回归",
    "no": "2004228013138656",
    "category_id": 75,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/04/30/83ad7944bbe6461ebbb9a77940fc2f44.jpg",
    "sku_list": [
    {
      "id": 2343,
      "no": "39010154",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999400,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2344,
      "no": "39010155",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999848,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2345,
      "no": "39010156",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999954,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2346,
      "no": "39010157",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999982,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2347,
      "no": "39010158",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999998,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2348,
      "no": "39010159",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999996,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "今天也要桃气满满",
    "label": "",
    "sort": 2 }] },



{
  "id": 76,
  "name": "阿喜杨梅卡",
  "sort": 6,
  "product_list": [
  {
    "id": 1040,
    "name": "五月杨梅已满林",
    "no": "2004247712836414",
    "category_id": 76,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/04/27/b10c6a77f07e4ffbb864c1a86412835b.jpg",
    "sku_list": [
    {
      "id": 2353,
      "no": "39010160",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 998473,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2354,
      "no": "39010161",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999688,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2355,
      "no": "39010162",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999864,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2356,
      "no": "39010163",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999957,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2357,
      "no": "39010164",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999996,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2358,
      "no": "39010165",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999993,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "五月杨梅熟，邀君共享。",
    "label": "",
    "sort": 1 },

  {
    "id": 1041,
    "name": "杨梅宝珠请君尝",
    "no": "2004245596407508",
    "category_id": 76,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/04/27/52e9fb6761e3460d92b4aa9118631c59.jpg",
    "sku_list": [
    {
      "id": 2359,
      "no": "39010166",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999352,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2360,
      "no": "39010167",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999875,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2361,
      "no": "39010168",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999944,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2362,
      "no": "39010169",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999990,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2363,
      "no": "39010170",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999998,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2364,
      "no": "39010171",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999996,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "浓夏杨梅鲜，待君品尝。",
    "label": "",
    "sort": 2 }] },



{
  "id": 74,
  "name": "超芒战士卡",
  "sort": 7,
  "product_list": [
  {
    "id": 1029,
    "name": "莓莓超芒",
    "no": "2004187201975558",
    "category_id": 74,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/04/19/a61849b549064d22be88bb4b52a496bc.jpg",
    "sku_list": [
    {
      "id": 2322,
      "no": "39010136",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 997792,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2323,
      "no": "39010137",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999839,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2324,
      "no": "39010138",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999945,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2325,
      "no": "39010139",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999979,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2326,
      "no": "39010140",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999996,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2327,
      "no": "39010141",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999995,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "灵感进化，芒芒x莓莓",
    "label": "",
    "sort": 1 },

  {
    "id": 1030,
    "name": "超芒MAX",
    "no": "2004187781021510",
    "category_id": 74,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/04/19/895da2330e474e4ab82d3b37c050a11f.jpg",
    "sku_list": [
    {
      "id": 2328,
      "no": "39010142",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 999198,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2329,
      "no": "39010143",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999909,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2330,
      "no": "39010144",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999967,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2331,
      "no": "39010145",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999980,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2332,
      "no": "39010146",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999999,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2333,
      "no": "39010147",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999997,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "超芒进化，果肉MAX",
    "label": "",
    "sort": 2 }] },



{
  "id": 71,
  "name": "阿喜咖啡卡",
  "sort": 8,
  "product_list": [
  {
    "id": 999,
    "name": "灵感咖啡",
    "no": "2003316012787503",
    "category_id": 71,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/04/01/b2e07204268d48dba450306f37a15e98.jpg",
    "sku_list": [
    {
      "id": 2248,
      "no": "39010101",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 998070,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2249,
      "no": "39010102",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999914,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2250,
      "no": "39010103",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999966,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2251,
      "no": "39010104",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999979,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2252,
      "no": "39010105",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999998,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2253,
      "no": "39010106",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999996,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "你总给我带来惊喜…",
    "label": "",
    "sort": 1 },

  {
    "id": 997,
    "name": "喜茶咖啡",
    "no": "2003313975733445",
    "category_id": 71,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/04/01/906b1dd4bc2840e7a6543e136cebddc3.jpg",
    "sku_list": [
    {
      "id": 2236,
      "no": "39010095",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 998124,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2237,
      "no": "39010096",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999908,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2238,
      "no": "39010097",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999979,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2239,
      "no": "39010098",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999979,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2240,
      "no": "39010099",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999994,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2241,
      "no": "39010100",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999992,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "如果有多一杯咖啡…",
    "label": "",
    "sort": 2 }] },



{
  "id": 69,
  "name": "喜欢有她卡",
  "sort": 9,
  "product_list": [
  {
    "id": 962,
    "name": "女子力不承让，站上舞台就有光芒",
    "no": "2003059965973496",
    "category_id": 69,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/03/07/e7a3a03e1aa347109429df7322a895d6.jpg",
    "sku_list": [
    {
      "id": 2178,
      "no": "39010059",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 997879,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2179,
      "no": "39010060",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999499,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2180,
      "no": "39010061",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999872,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2181,
      "no": "39010062",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999891,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2182,
      "no": "39010063",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999993,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2183,
      "no": "39010064",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999992,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "暂无",
    "label": "",
    "sort": 1 },

  {
    "id": 961,
    "name": "人生这场戏，我自导自演",
    "no": "2003057407843852",
    "category_id": 69,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/03/07/80f111ee1ff348dda7805cf861a97fec.jpg",
    "sku_list": [
    {
      "id": 2172,
      "no": "39010053",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 996260,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2173,
      "no": "39010054",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999521,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2174,
      "no": "39010055",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999832,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2175,
      "no": "39010056",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999856,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2176,
      "no": "39010057",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999991,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2177,
      "no": "39010058",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999975,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "暂无",
    "label": "",
    "sort": 2 }] },



{
  "id": 55,
  "name": "阿喜好运卡",
  "sort": 10,
  "product_list": [
  {
    "id": 855,
    "name": "喜来运转",
    "no": "2001097929452420",
    "category_id": 55,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/03/05/5f3025b8a2294b58b50301e485e4f7b5.jpg",
    "sku_list": [
    {
      "id": 2051,
      "no": "39010033",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 996564,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2014,
      "no": "39010020",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 998789,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2015,
      "no": "39010021",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999631,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2016,
      "no": "39010022",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999830,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2017,
      "no": "39010023",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999971,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2018,
      "no": "39010024",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999977,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "运来你家，喜满天下。",
    "label": "",
    "sort": 1 },

  {
    "id": 858,
    "name": "恭喜发财",
    "no": "2001095918650083",
    "category_id": 55,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/03/05/7f2171d9ba184012933e609bf9a7e85c.jpg",
    "sku_list": [
    {
      "id": 2049,
      "no": "39010031",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 998484,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2003,
      "no": "39010010",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999530,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2004,
      "no": "39010011",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999879,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2005,
      "no": "39010012",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999942,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2006,
      "no": "39010013",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999989,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2007,
      "no": "39010014",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999981,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "好运入利是，财运装满袋。",
    "label": "",
    "sort": 2 },

  {
    "id": 856,
    "name": "桃花满面",
    "no": "2001092723675562",
    "category_id": 55,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/03/05/8475b66ccd1f48d1892518f224ee1b21.jpg",
    "sku_list": [
    {
      "id": 2052,
      "no": "39010032",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 998105,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2008,
      "no": "39010015",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999458,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2009,
      "no": "39010016",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999844,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2010,
      "no": "39010017",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999910,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2011,
      "no": "39010018",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999985,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2012,
      "no": "39010019",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999980,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "春风拂面精神爽，满面桃花邂佳人。",
    "label": "",
    "sort": 3 },

  {
    "id": 854,
    "name": "岁岁如意",
    "no": "2001094701734270",
    "category_id": 55,
    "is_enable": 1,
    "image_url": "https://go.cdn.heytea.com/storage/product/2020/03/05/13e0d54b9af145c2bd102b92b35ff27d.jpg",
    "sku_list": [
    {
      "id": 2050,
      "no": "39010034",
      "price": "60",
      "is_enabled": 1,
      "left_stock": 998746,
      "all_stock": 999999,
      "card_amount": "60.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2020,
      "no": "39010025",
      "price": "100",
      "is_enabled": 1,
      "left_stock": 999584,
      "all_stock": 999999,
      "card_amount": "100.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2021,
      "no": "39010026",
      "price": "300",
      "is_enabled": 1,
      "left_stock": 999870,
      "all_stock": 999999,
      "card_amount": "300.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2022,
      "no": "39010027",
      "price": "520",
      "is_enabled": 1,
      "left_stock": 999944,
      "all_stock": 999999,
      "card_amount": "520.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2023,
      "no": "39010028",
      "price": "666",
      "is_enabled": 1,
      "left_stock": 999987,
      "all_stock": 999999,
      "card_amount": "666.00",
      "card_discount_amount": "0.00" },

    {
      "id": 2024,
      "no": "39010029",
      "price": "999",
      "is_enabled": 1,
      "left_stock": 999984,
      "all_stock": 999999,
      "card_amount": "999.00",
      "card_discount_amount": "0.00" }],


    "apply_shop": "仅限中国大陆地区（不含港澳台）指定喜茶门店使用",
    "available_period": "全天",
    "use_need_knows": [
    "1、本卡为阿喜有礼电子卡；",
    "2、阿喜有礼电子卡的激活有效期为购买之日起1年内，成功激活后有3年的使用有效期；",
    "3、成功激活后，您可以在喜茶GO小程序或中国大陆喜茶门店（不含港澳台）使用阿喜有礼电子卡购买指定出售的商品；",
    "4、阿喜有礼卡电子卡可自用可赠送好友；",
    "5、成功购买阿喜有礼电子卡后，每个账户可激活使用的卡数至多为15张；",
    "6、成功购买阿喜有礼电子卡后，可在【我的】-【阿喜有礼】-【购买历史】-【查看详情】-【申请开票】申请预付卡发票；若使用阿喜有礼电子卡支付单笔订单时，该笔订单不再开具消费发票；",
    "7、购买阿喜有礼电子卡不累计积分与经验值，当您使用阿喜有礼电子卡进行消费时，根据实际消费金额累积积分与经验值；",
    "8、阿喜有礼电子卡可多次使用，不可兑换成现金、不找零；",
    "9、阿喜有礼可支持至多15张卡同时使用，支持与所在平台绑定的银行卡或平台账户余额进行组合支付使用；",
    "10、建议购买阿喜有礼电子卡后使用喜茶GO小程序点单自取或门店POS扫喜茶GO小程序会员码付款；阿喜有礼电子卡不支持第三方外卖使用；",
    "11、更多使用说明与须知详情请见《使用须知》及《喜茶单用途商业预付卡章程》。"],

    "description": "辞旧迎新之际，祝你岁岁皆如意。",
    "label": "",
    "sort": 4 }] }];exports.default = _default;

/***/ }),

/***/ 28:
/*!***********************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/common/util.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }

  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;

  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
}

function formatDateTime(date) {var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd hh:mm:ss';
  if (!date) {
    return '';
  }
  if (typeof date === 'number') {
    date = new Date(date * 1000);
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));}
  return fmt;
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }

  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.') };

}

var dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000 },

  humanize: function humanize(milliseconds) {
    var humanize = '';
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
        break;
      }
    }
    return humanize || '刚刚';
  },
  format: function format(dateStr) {
    var date = this.parse(dateStr);
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function _format(number) {
      return number < 10 ? '0' + number : number;
    };
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
    _format(date.getHours()) + ':' + _format(date.getMinutes());
  },
  parse: function parse(str) {//将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  } };


var hexToRgba = function hexToRgba(hex, opacity) {//16进制颜色转rgba
  return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
};

module.exports = {
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  formatLocation: formatLocation,
  dateUtils: dateUtils,
  hexToRgba: hexToRgba };

/***/ }),

/***/ 283:
/*!**************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/common/request.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var requestUtils = {
  // 域名
  domain: 'http://localhost:8888/',
  // domain: 'http://192.168.1.3:8080/',
  //接口地址
  interfaceUrl: function interfaceUrl() {
    return requestUtils.domain + 'order/api/';
  },
  toast: function toast(text, duration, success) {
    uni.showToast({
      title: text || "出错啦~",
      icon: success || 'none',
      duration: duration || 2000 });

  },
  modal: function modal(title, content) {var showCancel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var callback = arguments.length > 3 ? arguments[3] : undefined;var confirmColor = arguments.length > 4 ? arguments[4] : undefined;var confirmText = arguments.length > 5 ? arguments[5] : undefined;var cancelColor = arguments.length > 6 ? arguments[6] : undefined;var cancelText = arguments.length > 7 ? arguments[7] : undefined;
    uni.showModal({
      title: title || '提示',
      content: content,
      showCancel: showCancel,
      cancelColor: cancelColor || "#555",
      confirmColor: confirmColor || "#e41f19",
      confirmText: confirmText || "确定",
      cancelText: cancelText || "取消",
      success: function success(res) {
        if (res.confirm) {
          callback && callback(true);
        } else {
          callback && callback(false);
        }
      } });

  },
  isAndroid: function isAndroid() {
    var res = uni.getSystemInfoSync();
    return res.platform.toLocaleLowerCase() == "android";
  },
  isIphoneX: function isIphoneX() {
    var res = uni.getSystemInfoSync();
    var iphonex = false;
    var models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax'];
    var model = res.model.replace(/\s/g, "").toLowerCase();
    if (models.includes(model)) {
      iphonex = true;
    }
    return iphonex;
  },
  constNum: function constNum() {
    var time = 0;



    return time;
  },
  delayed: null,
  /**
                  * 请求数据处理
                  * @param string url 请求地址
                  * @param {*} postData 请求参数
                  * @param string method 请求方式
                  *  GET or POST
                  * @param string contentType 数据格式
                  *  'application/x-www-form-urlencoded'
                  *  'application/json'
                  * @param bool isDelay 是否延迟显示loading
                  * @param bool hideLoading 是否隐藏loading
                  *  true: 隐藏
                  *  false:显示
                  */
  request: function request(url) {var postData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "POST";var contentType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "application/x-www-form-urlencoded";var isDelay = arguments.length > 4 ? arguments[4] : undefined;var hideLoading = arguments.length > 5 ? arguments[5] : undefined;
    //接口请求
    var loadding = false;
    requestUtils.delayed && uni.hideLoading();
    clearTimeout(requestUtils.delayed);
    requestUtils.delayed = null;
    if (!hideLoading) {
      requestUtils.delayed = setTimeout(function () {
        uni.showLoading({
          mask: true,
          title: '请稍候...',
          success: function success(res) {
            loadding = true;
          } });

      }, isDelay ? 1000 : 0);
    }

    return new Promise(function (resolve, reject) {
      uni.request({
        url: requestUtils.interfaceUrl() + url,
        data: postData,
        header: {
          'content-type': contentType,
          'token': requestUtils.getToken() },

        method: method, //'GET','POST'
        dataType: 'json',
        success: function success(res) {
          if (loadding && !hideLoading) {
            uni.hideLoading();
          }
          if (res.statusCode === 200) {
            if (res.data.errno === 401) {
              //返回码401说明token过期或者用户未登录
              uni.removeStorage({
                key: 'token',
                success: function success() {
                  //个人中心页不跳转
                  if (uni.getStorageSync("navUrl") != "/pages/ucenter/index/index") {
                    requestUtils.modal('温馨提示', '您还没有登录，是否去登录', true, function (confirm) {
                      if (confirm) {
                        uni.redirectTo({
                          url: '/pages/auth/btnAuth/btnAuth' });

                      } else {
                        uni.navigateBack({
                          delta: 1,
                          fail: function fail(res) {
                            uni.switchTab({
                              url: '/pages/index/index' });

                          } });

                      }
                    });
                  }
                } });

            } else if (res.data.errno === 500) {
              requestUtils.toast(res.data.msg);
            } else if (res.data.errno === 404) {
              requestUtils.toast(res.data.msg);
            } else {
              resolve(res.data);
            }
          } else {
            reject(res.data.msg);
          }
        },
        fail: function fail(res) {
          requestUtils.toast("网络不给力，请稍后再试~");
          reject(res);
        },
        complete: function complete(res) {
          clearTimeout(requestUtils.delayed);
          requestUtils.delayed = null;
          if (res.statusCode === 200) {
            if (res.data.errno === 0 || res.data.errno === 401) {
              uni.hideLoading();
            } else {
              requestUtils.toast(res.data.msg);
            }
          } else {
            requestUtils.toast('服务器开小差了~');
          }
        } });

    });
  },
  /**
      * 上传文件
      * @param string url 请求地址
      * @param string src 文件路径
      */
  uploadFile: function uploadFile(url, src) {
    uni.showLoading({
      title: '请稍候...' });

    return new Promise(function (resolve, reject) {
      var uploadTask = uni.uploadFile({
        url: requestUtils.interfaceUrl() + url,
        filePath: src,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data',
          'token': requestUtils.getToken() },

        success: function success(res) {
          uni.hideLoading();
          var data = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}");
          if (data.errno == 0) {
            //返回图片地址
            resolve(data);
          } else {
            that.toast(res.msg);
          }
        },
        fail: function fail(res) {
          requestUtils.toast("网络不给力，请稍后再试~");
          reject(res);
        } });

    });
  },
  tuiJsonp: function tuiJsonp(url, callback, callbackname) {








  },
  //设置用户信息
  setUserInfo: function setUserInfo(mobile, token) {
    uni.setStorageSync("token", token);
    uni.setStorageSync("mobile", mobile);
  },
  //获取token
  getToken: function getToken() {
    return uni.getStorageSync("token");
  },
  //去空格
  trim: function trim(value) {
    return value.replace(/(^\s*)|(\s*$)/g, "");
  },
  //内容替换
  replaceAll: function replaceAll(text, repstr, newstr) {
    return text.replace(new RegExp(repstr, "gm"), newstr);
  },
  //格式化手机号码
  formatNumber: function formatNumber(num) {
    return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
  },
  //金额格式化
  rmoney: function rmoney(money) {
    return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
    /\,$/, '').split('').reverse().join('');
  },
  // 时间格式化输出，如11:03 25:19 每1s都会调用一次
  dateformat: function dateformat(micro_second) {
    // 总秒数
    var second = Math.floor(micro_second / 1000);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    return {
      day: day,
      hr: hr < 10 ? '0' + hr : hr,
      min: min < 10 ? '0' + min : min,
      sec: sec < 10 ? '0' + sec : sec,
      second: second };

  },
  //日期格式化
  formatDate: function formatDate(formatStr, fdate) {
    if (fdate) {
      if (~fdate.indexOf('.')) {
        fdate = fdate.substring(0, fdate.indexOf('.'));
      }
      fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
      var fTime,fStr = 'ymdhis';
      if (!formatStr)
      formatStr = "y-m-d h:i:s";
      if (fdate)
      fTime = new Date(fdate);else

      fTime = new Date();
      var month = fTime.getMonth() + 1;
      var day = fTime.getDate();
      var hours = fTime.getHours();
      var minu = fTime.getMinutes();
      var second = fTime.getSeconds();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      hours = hours < 10 ? '0' + hours : hours;
      minu = minu < 10 ? '0' + minu : minu;
      second = second < 10 ? '0' + second : second;
      var formatArr = [
      fTime.getFullYear().toString(),
      month.toString(),
      day.toString(),
      hours.toString(),
      minu.toString(),
      second.toString()];

      for (var i = 0; i < formatArr.length; i++) {
        formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
      }
      return formatStr;
    } else {
      return "";
    }
  },
  getDistance: function getDistance(lat1, lng1, lat2, lng2) {
    function Rad(d) {
      return d * Math.PI / 180.0;
    }
    if (!lat1 || !lng1) {
      return '';
    }
    // lat1用户的纬度
    // lng1用户的经度
    // lat2商家的纬度
    // lng2商家的经度
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(
    Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = '(距您' + s.toFixed(2) + '公里)'; //保留两位小数
    return s;
  },
  isMobile: function isMobile(mobile) {
    if (!mobile) {
      requestUtils.toast('请输入手机号码');
      return false;
    }
    if (!mobile.match(/^1[3-9][0-9]\d{8}$/)) {
      requestUtils.toast('手机号不正确');
      return false;
    }
    return true;
  },
  rgbToHex: function rgbToHex(r, g, b) {
    return "#" + requestUtils.toHex(r) + requestUtils.toHex(g) + requestUtils.toHex(b);
  },
  toHex: function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
    "0123456789ABCDEF".charAt(n % 16);
  },
  hexToRgb: function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16) } :
    null;
  },
  transDate: function transDate(date, fmt) {
    if (!date) {
      return '--';
    }
    var _this = new Date(date * 1000);
    var o = {
      'M+': _this.getMonth() + 1,
      'd+': _this.getDate(),
      'h+': _this.getHours(),
      'm+': _this.getMinutes(),
      's+': _this.getSeconds(),
      'q+': Math.floor((_this.getMonth() + 3) / 3),
      'S': _this.getMilliseconds() };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return fmt;
  },
  isNumber: function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  //判断字符串是否为空
  isEmpty: function isEmpty(str) {
    if (str === '' || str === undefined || str === null) {
      return true;
    } else {
      return false;
    }
  },
  expireTime: function expireTime(str) {
    if (!str) {
      return;
    }
    var NowTime = new Date().getTime();
    //IOS系统直接使用new Date('2018-10-29 11:25:21')，在IOS上获取不到对应的时间对象。
    var totalSecond = Date.parse(str.replace(/-/g, '/')) - NowTime || [];
    if (totalSecond < 0) {
      return;
    }
    return totalSecond / 1000;
  },

  /**
      * 统一下单请求
      */
  payOrder: function payOrder(orderId) {
    var tradeType = 'JSAPI';






    return new Promise(function (resolve, reject) {
      requestUtils.request('pay/prepay', {
        orderId: orderId,
        tradeType: tradeType },
      'POST').then(function (res) {
        if (res.errno === 0) {


































          var payParam = res.data;
          uni.requestPayment({
            'timeStamp': payParam.timeStamp,
            'nonceStr': payParam.nonceStr,
            'package': payParam.package,
            'signType': payParam.signType,
            'paySign': payParam.paySign,
            'success': function success(res) {
              console.log(res);
              resolve(res);
            },
            'fail': function fail(res) {
              console.log(res);
              reject(res);
            },
            'complete': function complete(res) {
              console.log(res);
              reject(res);
            } });


        } else {
          reject(res);
        }
      });
    });
  },

  /**
      * 调用微信登录
      */
  login: function login() {
    return new Promise(function (resolve, reject) {
      uni.login({
        success: function success(res) {
          if (res.code) {
            resolve(res);
          } else {
            reject(res);
          }
        },
        fail: function fail(err) {
          reject(err);
        } });

    });
  } };var _default =

requestUtils;
// module.exports = {
// 	interfaceUrl: requestUtils.interfaceUrl,
// 	toast: requestUtils.toast,
// 	modal: requestUtils.modal,
// 	isAndroid: requestUtils.isAndroid,
// 	isIphoneX: requestUtils.isIphoneX,
// 	constNum: requestUtils.constNum,
// 	request: requestUtils.request,
// 	uploadFile: requestUtils.uploadFile,
// 	tuiJsonp: requestUtils.tuiJsonp,
// 	setUserInfo: requestUtils.setUserInfo,
// 	getToken: requestUtils.getToken,
// 	trim: requestUtils.trim,
// 	replaceAll: requestUtils.replaceAll,
// 	formatNumber: requestUtils.formatNumber,
// 	rmoney: requestUtils.rmoney,
// 	dateformat: requestUtils.dateformat,
// 	formatDate: requestUtils.formatDate,
// 	getDistance: requestUtils.getDistance,
// 	isMobile: requestUtils.isMobile,
// 	rgbToHex: requestUtils.rgbToHex,
// 	hexToRgb: requestUtils.hexToRgb,
// 	transDate: requestUtils.transDate,
// 	isNumber: requestUtils.isNumber,
// 	isEmpty: requestUtils.isEmpty,
// 	expireTime: requestUtils.expireTime,
// 	payOrder: requestUtils.payOrder,
// 	login: requestUtils.login
// }
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 284:
/*!*************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/api/addresses.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  //点单-商品搜索
  orderSearch: "search/like" };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 322:
/*!**************************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/components/uni-popup/popup.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 323));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom' };var _default =


{
  data: function data() {
    return {
      config: config };

  },
  mixins: [_message.default] };exports.default = _default;

/***/ }),

/***/ 323:
/*!****************************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/components/uni-popup/message.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false;
      // 获取子组件对象
      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    } } };exports.default = _default;

/***/ }),

/***/ 345:
/*!**************************************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/components/uni-icons/icons.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 4:
/*!*******************************************************************!*\
  !*** /Users/hzl/Desktop/hadoopcloud/图片浏览app/order-app/pages.json ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 43:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 44);

/***/ }),

/***/ 44:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 45);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 45:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map