const requestUtils = {
	// 域名
	domain: 'http://localhost:8888/',
	// domain: 'http://192.168.1.3:8080/',
	//接口地址
	interfaceUrl: function() {
		return requestUtils.domain + 'order/api/'
	},
	toast: function(text, duration, success) {
		uni.showToast({
			title: text || "出错啦~",
			icon: success || 'none',
			duration: duration || 2000
		})
	},
	modal: function(title, content, showCancel = false, callback, confirmColor, confirmText, cancelColor, cancelText) {
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: cancelColor || "#555",
			confirmColor: confirmColor || "#e41f19",
			confirmText: confirmText || "确定",
			cancelText: cancelText || "取消",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android"
	},
	isIphoneX: function() {
		const res = uni.getSystemInfoSync();
		let iphonex = false;
		let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax']
		const model = res.model.replace(/\s/g, "").toLowerCase()
		if (models.includes(model)) {
			iphonex = true;
		}
		return iphonex;
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time
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
	request: function(url, postData = {}, method = "POST", contentType = "application/x-www-form-urlencoded", isDelay, hideLoading) {
		//接口请求
		let loadding = false;
		requestUtils.delayed && uni.hideLoading();
		clearTimeout(requestUtils.delayed);
		requestUtils.delayed = null;
		if (!hideLoading) {
			requestUtils.delayed = setTimeout(() => {
				uni.showLoading({
					mask: true,
					title: '请稍候...',
					success(res) {
						loadding = true
					}
				})
			}, isDelay ? 1000 : 0)
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: requestUtils.interfaceUrl() + url,
				data: postData,
				header: {
					'content-type': contentType,
					'token': requestUtils.getToken()
				},
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					if (loadding && !hideLoading) {
						uni.hideLoading()
					}
					if (res.statusCode === 200) {
						if (res.data.errno === 401) {
							//返回码401说明token过期或者用户未登录
							uni.removeStorage({
								key: 'token',
								success() {
									//个人中心页不跳转
									if (uni.getStorageSync("navUrl") != "/pages/ucenter/index/index") {
										requestUtils.modal('温馨提示', '您还没有登录，是否去登录', true, (confirm) => {
											if (confirm) {
												uni.redirectTo({
													url: '/pages/auth/btnAuth/btnAuth',
												})
											} else {
												uni.navigateBack({
													delta: 1,
													fail: (res) => {
														uni.switchTab({
															url: '/pages/index/index',
														})
													}
												})
											}
										})
									}
								}
							})
						} else if (res.data.errno === 500) {
							requestUtils.toast(res.data.msg)
						} else if (res.data.errno === 404) {
							requestUtils.toast(res.data.msg)
						} else {
							resolve(res.data);
						}
					} else {
						reject(res.data.msg);
					}
				},
				fail: (res) => {
					requestUtils.toast("网络不给力，请稍后再试~")
					reject(res)
				},
				complete: function(res) {
					clearTimeout(requestUtils.delayed)
					requestUtils.delayed = null;
					if (res.statusCode === 200) {
						if (res.data.errno === 0 || res.data.errno === 401) {
							uni.hideLoading()
						} else {
							requestUtils.toast(res.data.msg)
						}
					} else {
						requestUtils.toast('服务器开小差了~')
					}
				}
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(url, src) {
		uni.showLoading({
			title: '请稍候...'
		})
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: requestUtils.interfaceUrl() + url,
				filePath: src,
				name: 'file',
				header: {
					'content-type': 'multipart/form-data',
					'token': requestUtils.getToken()
				},
				success: function(res) {
					uni.hideLoading()
					let data = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					if (data.errno == 0) {
						//返回图片地址
						resolve(data)
					} else {
						that.toast(res.msg);
					}
				},
				fail: function(res) {
					requestUtils.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	tuiJsonp: function(url, callback, callbackname) {
		// #ifdef H5
		window[callbackname] = callback;
		let tuiScript = document.createElement("script");
		tuiScript.src = url;
		tuiScript.type = "text/javascript";
		document.head.appendChild(tuiScript);
		document.head.removeChild(tuiScript);
		// #endif
	},
	//设置用户信息
	setUserInfo: function(mobile, token) {
		uni.setStorageSync("token", token)
		uni.setStorageSync("mobile", mobile)
	},
	//获取token
	getToken: function() {
		return uni.getStorageSync("token")
	},
	//去空格
	trim: function(value) {
		return value.replace(/(^\s*)|(\s*$)/g, "");
	},
	//内容替换
	replaceAll: function(text, repstr, newstr) {
		return text.replace(new RegExp(repstr, "gm"), newstr);
	},
	//格式化手机号码
	formatNumber: function(num) {
		return num.length === 11 ? num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : num;
	},
	//金额格式化
	rmoney: function(money) {
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
			/\,$/, '').split('').reverse().join('');
	},
	// 时间格式化输出，如11:03 25:19 每1s都会调用一次
	dateformat: function(micro_second) {
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
			day,
			hr: hr < 10 ? '0' + hr : hr,
			min: min < 10 ? '0' + min : min,
			sec: sec < 10 ? '0' + sec : sec,
			second: second
		}
	},
	//日期格式化
	formatDate: function(formatStr, fdate) {
		if (fdate) {
			if (~fdate.indexOf('.')) {
				fdate = fdate.substring(0, fdate.indexOf('.'));
			}
			fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
			var fTime, fStr = 'ymdhis';
			if (!formatStr)
				formatStr = "y-m-d h:i:s";
			if (fdate)
				fTime = new Date(fdate);
			else
				fTime = new Date();
			var month = fTime.getMonth() + 1;
			var day = fTime.getDate();
			var hours = fTime.getHours();
			var minu = fTime.getMinutes();
			var second = fTime.getSeconds();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hours = hours < 10 ? ('0' + hours) : hours;
			minu = minu < 10 ? '0' + minu : minu;
			second = second < 10 ? '0' + second : second;
			var formatArr = [
				fTime.getFullYear().toString(),
				month.toString(),
				day.toString(),
				hours.toString(),
				minu.toString(),
				second.toString()
			]
			for (var i = 0; i < formatArr.length; i++) {
				formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
			}
			return formatStr;
		} else {
			return "";
		}
	},
	getDistance: function(lat1, lng1, lat2, lng2) {
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
		let radLat1 = Rad(lat1);
		let radLat2 = Rad(lat2);
		let a = radLat1 - radLat2;
		let b = Rad(lng1) - Rad(lng2);
		let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(
			Math.sin(b / 2), 2)));
		s = s * 6378.137;
		s = Math.round(s * 10000) / 10000;
		s = '(距您' + s.toFixed(2) + '公里)' //保留两位小数
		return s
	},
	isMobile: function(mobile) {
		if (!mobile) {
			requestUtils.toast('请输入手机号码');
			return false
		}
		if (!mobile.match(/^1[3-9][0-9]\d{8}$/)) {
			requestUtils.toast('手机号不正确');
			return false
		}
		return true
	},
	rgbToHex: function(r, g, b) {
		return "#" + requestUtils.toHex(r) + requestUtils.toHex(g) + requestUtils.toHex(b)
	},
	toHex: function(n) {
		n = parseInt(n, 10);
		if (isNaN(n)) return "00";
		n = Math.max(0, Math.min(n, 255));
		return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
			"0123456789ABCDEF".charAt(n % 16);
	},
	hexToRgb(hex) {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	},
	transDate: function(date, fmt) {
		if (!date) {
			return '--'
		}
		let _this = new Date(date * 1000)
		let o = {
			'M+': _this.getMonth() + 1,
			'd+': _this.getDate(),
			'h+': _this.getHours(),
			'm+': _this.getMinutes(),
			's+': _this.getSeconds(),
			'q+': Math.floor((_this.getMonth() + 3) / 3),
			'S': _this.getMilliseconds()
		}
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		for (let k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
			}
		}
		return fmt
	},
	isNumber: function(val) {
		let regPos = /^\d+(\.\d+)?$/; //非负浮点数
		let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if (regPos.test(val) || regNeg.test(val)) {
			return true;
		} else {
			return false;
		}
	},
	//判断字符串是否为空
	isEmpty: function(str) {
		if (str === '' || str === undefined || str === null) {
			return true;
		} else {
			return false;
		}
	},
	expireTime: function(str) {
		if (!str) {
			return;
		}
		let NowTime = new Date().getTime();
		//IOS系统直接使用new Date('2018-10-29 11:25:21')，在IOS上获取不到对应的时间对象。
		let totalSecond = Date.parse(str.replace(/-/g, '/')) - NowTime || [];
		if (totalSecond < 0) {
			return;
		}
		return totalSecond / 1000
	},

	/**
	 * 统一下单请求
	 */
	payOrder: function(orderId) {
		let tradeType = 'JSAPI'
		// #ifdef APP-PLUS
		tradeType = 'APP'
		// #endif
		// #ifdef H5
		tradeType = 'MWEB'
		// #endif
		return new Promise(function(resolve, reject) {
			requestUtils.request('pay/prepay', {
				orderId: orderId,
				tradeType: tradeType
			}, 'POST').then((res) => {
				if (res.errno === 0) {
					// #ifdef H5
					location.href = res.mwebOrderResult.mwebUrl + '&redirect_url=' + encodeURIComponent(requestUtils.domain +
						'h5/#/pages/payResult/payResult?orderId=' + orderId)
					// #endif

					// #ifdef APP-PLUS
					let appOrderResult = res.appOrderResult;
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: {
							"appid": appOrderResult.appId,
							"noncestr": appOrderResult.nonceStr,
							"package": appOrderResult.packageValue,
							"partnerid": appOrderResult.partnerId,
							"prepayid": appOrderResult.prepayId,
							"timestamp": appOrderResult.timeStamp,
							"sign": appOrderResult.sign
						},
						success: function(res) {
							console.log(res)
							resolve(res);
						},
						fail: function(res) {
							console.log(res)
							reject(res);
						},
						complete: function(res) {
							console.log(res)
							reject(res);
						}
					});
					// #endif

					// #ifdef MP-WEIXIN
					let payParam = res.data;
					uni.requestPayment({
						'timeStamp': payParam.timeStamp,
						'nonceStr': payParam.nonceStr,
						'package': payParam.package,
						'signType': payParam.signType,
						'paySign': payParam.paySign,
						'success': function(res) {
							console.log(res)
							resolve(res);
						},
						'fail': function(res) {
							console.log(res)
							reject(res);
						},
						'complete': function(res) {
							console.log(res)
							reject(res);
						}
					});
					// #endif
				} else {
					reject(res);
				}
			});
		});
	},

	/**
	 * 调用微信登录
	 */
	login: function() {
		return new Promise(function(resolve, reject) {
			uni.login({
				success: function(res) {
					if (res.code) {
						resolve(res);
					} else {
						reject(res);
					}
				},
				fail: function(err) {
					reject(err);
				}
			});
		});
	}
}
export default requestUtils;
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
