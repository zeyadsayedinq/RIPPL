import { n as __esmMin, t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
var init_extends = __esmMin((() => {}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(a, n) {
	if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(e, r) {
	for (var t = 0; t < r.length; t++) {
		var o = r[t];
		o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
	}
}
function _createClass(e, r, t) {
	return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
	if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(t, e) {
	if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
	if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
	return _assertThisInitialized(t);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(t) {
	return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
		return t.__proto__ || Object.getPrototypeOf(t);
	}, _getPrototypeOf(t);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
	return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
		return t.__proto__ = e, t;
	}, _setPrototypeOf(t, e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inherits.js
function _inherits(t, e) {
	if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
	t.prototype = Object.create(e && e.prototype, { constructor: {
		value: t,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
	t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(r) {
	if (Array.isArray(r)) return _arrayLikeToArray(r);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(r) {
	return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/toArray.js
function _toArray(r) {
	return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest();
}
//#endregion
//#region node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { "default": e };
	}
	module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/extends.js
var require_extends = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _extends() {
		return module.exports = _extends = Object.assign ? Object.assign.bind() : function(n) {
			for (var e = 1; e < arguments.length; e++) {
				var t = arguments[e];
				for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
			}
			return n;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _extends.apply(null, arguments);
	}
	module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/typeof.js
var require_typeof = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/toPrimitive.js
var require_toPrimitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof = require_typeof()["default"];
	function toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/toPropertyKey.js
var require_toPropertyKey = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof = require_typeof()["default"];
	var toPrimitive = require_toPrimitive();
	function toPropertyKey(t) {
		var i = toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/defineProperty.js
var require_defineProperty = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperty(e, r, t) {
		return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js
var require_objectWithoutPropertiesLoose = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/objectWithoutProperties.js
var require_objectWithoutProperties = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var objectWithoutPropertiesLoose = require_objectWithoutPropertiesLoose();
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/classCallCheck.js
var require_classCallCheck = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _classCallCheck(a, n) {
		if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/createClass.js
var require_createClass = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toPropertyKey = require_toPropertyKey();
	function _defineProperties(e, r) {
		for (var t = 0; t < r.length; t++) {
			var o = r[t];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
		}
	}
	function _createClass(e, r, t) {
		return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/assertThisInitialized.js
var require_assertThisInitialized = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _assertThisInitialized(e) {
		if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return e;
	}
	module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var require_possibleConstructorReturn = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _typeof = require_typeof()["default"];
	var assertThisInitialized = require_assertThisInitialized();
	function _possibleConstructorReturn(t, e) {
		if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
		if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
		return assertThisInitialized(t);
	}
	module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/getPrototypeOf.js
var require_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _getPrototypeOf(t) {
		return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
			return t.__proto__ || Object.getPrototypeOf(t);
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
	}
	module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/setPrototypeOf.js
var require_setPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _setPrototypeOf(t, e) {
		return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
			return t.__proto__ = e, t;
		}, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
	}
	module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/inherits.js
var require_inherits = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var setPrototypeOf = require_setPrototypeOf();
	function _inherits(t, e) {
		if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
		t.prototype = Object.create(e && e.prototype, { constructor: {
			value: t,
			writable: !0,
			configurable: !0
		} }), Object.defineProperty(t, "prototype", { writable: !1 }), e && setPrototypeOf(t, e);
	}
	module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/arrayLikeToArray.js
var require_arrayLikeToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _arrayLikeToArray(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/arrayWithoutHoles.js
var require_arrayWithoutHoles = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayLikeToArray = require_arrayLikeToArray();
	function _arrayWithoutHoles(r) {
		if (Array.isArray(r)) return arrayLikeToArray(r);
	}
	module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/iterableToArray.js
var require_iterableToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _iterableToArray(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js
var require_unsupportedIterableToArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayLikeToArray = require_arrayLikeToArray();
	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if ("string" == typeof r) return arrayLikeToArray(r, a);
			var t = {}.toString.call(r).slice(8, -1);
			return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
		}
	}
	module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/nonIterableSpread.js
var require_nonIterableSpread = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _nonIterableSpread() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/toConsumableArray.js
var require_toConsumableArray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var arrayWithoutHoles = require_arrayWithoutHoles();
	var iterableToArray = require_iterableToArray();
	var unsupportedIterableToArray = require_unsupportedIterableToArray();
	var nonIterableSpread = require_nonIterableSpread();
	function _toConsumableArray(r) {
		return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
	}
	module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(n, t, e, r, o, a, c) {
	try {
		var i = n[a](c), u = i.value;
	} catch (n) {
		e(n);
		return;
	}
	i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
	return function() {
		var t = this, e = arguments;
		return new Promise(function(r, o) {
			var a = n.apply(t, e);
			function _next(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
			}
			function _throw(n) {
				asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
			}
			_next(void 0);
		});
	};
}
//#endregion
export { _objectWithoutPropertiesLoose as C, init_extends as D, _extends as E, _objectWithoutProperties as S, _typeof as T, _inherits as _, require_possibleConstructorReturn as a, _createClass as b, require_objectWithoutProperties as c, require_extends as d, require_interopRequireDefault as f, _slicedToArray as g, _inheritsLoose as h, require_getPrototypeOf as i, require_defineProperty as l, _toConsumableArray as m, require_toConsumableArray as n, require_createClass as o, _toArray as p, require_inherits as r, require_classCallCheck as s, _asyncToGenerator as t, require_typeof as u, _getPrototypeOf as v, _defineProperty as w, _classCallCheck as x, _possibleConstructorReturn as y };
