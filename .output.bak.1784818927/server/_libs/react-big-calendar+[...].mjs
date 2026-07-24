import { a as __toESM, i as __toCommonJS, t as __commonJSMin } from "../_runtime.mjs";
import { _ as require_react_dom } from "./@tanstack/react-router+[...].mjs";
import { a as require_react, i as useEventCallback, n as useSafeState, r as useCallbackRef, t as useMergedRefs } from "./react+restart__hooks.mjs";
import { C as _objectWithoutPropertiesLoose, D as init_extends, E as _extends, S as _objectWithoutProperties, T as _typeof, _ as _inherits, a as require_possibleConstructorReturn, b as _createClass, c as require_objectWithoutProperties, d as require_extends, f as require_interopRequireDefault, g as _slicedToArray, h as _inheritsLoose, i as require_getPrototypeOf, l as require_defineProperty, m as _toConsumableArray, n as require_toConsumableArray, o as require_createClass, p as _toArray, r as require_inherits, s as require_classCallCheck, u as require_typeof, v as _getPrototypeOf, w as _defineProperty, x as _classCallCheck, y as _possibleConstructorReturn } from "./babel__runtime.mjs";
import { n as require_clsx, r as clsx } from "./clsx.mjs";
import { t as require_prop_types } from "./prop-types.mjs";
import { t as require_invariant } from "./invariant.mjs";
import { _ as startOf, a as gt, c as inRange$1, d as max, f as milliseconds, g as seconds, h as neq, i as eq, l as lt, m as minutes, n as date_arithmetic_exports, o as gte, p as min, r as endOf, s as hours, t as add, u as lte } from "./date-arithmetic.mjs";
import { C as require_findIndex, D as require_chunk, E as require_isEqual, S as require_range, b as require_defaults, g as require_omit, h as require_transform, x as require_sortBy, y as require_mapValues } from "./lodash.mjs";
import { A as init_offset, C as listen, D as request, E as init_animationFrame, M as contains$1, N as contains_exports, O as init_position, P as init_contains, S as ownerDocument, T as cancel, _ as init_querySelectorAll, a as addClass, b as height, c as scrollbarSize, d as init_listen, f as listen$1, g as init_closest, h as closest_exports, i as removeClass, j as offset, k as position, l as getWidth, m as closest, n as init_esm, o as init_addClass, p as listen_exports, r as init_removeClass, s as init_scrollbarSize, t as esm_exports, u as init_width, v as qsa, w as contains, x as init_height, y as querySelectorAll_exports } from "./dom-helpers.mjs";
import { a as hide_default, c as computeStyles_default, i as offset_default, l as arrow_default, n as preventOverflow_default, o as flip_default, r as popperOffsets_default, s as eventListeners_default, t as popperGenerator, u as placements } from "./popperjs__core.mjs";
import { t as memoizeOne } from "./memoize-one.mjs";
import { a as require_localeData, c as require_isBetween, i as require_localizedFormat, n as require_utc, o as require_isSameOrBefore, r as require_minMax, s as require_isSameOrAfter, t as require_isLeapYear } from "./dayjs.mjs";
//#region node_modules/uncontrollable/lib/esm/utils.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_invariant = /* @__PURE__ */ __toESM(require_invariant());
var noop$1 = function noop() {};
function uncontrolledPropTypes(controlledValues, displayName) {
	var propTypes = {};
	Object.keys(controlledValues).forEach(function(prop) {
		propTypes[defaultKey(prop)] = noop$1;
	});
	return propTypes;
}
function isProp(props, prop) {
	return props[prop] !== void 0;
}
function defaultKey(key) {
	return "default" + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
* Copyright (c) 2013-present, Facebook, Inc.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree. An additional grant
* of patent rights can be found in the PATENTS file in the same directory.
*/
function canAcceptRef(component) {
	return !!component && (typeof component !== "function" || component.prototype && component.prototype.isReactComponent);
}
//#endregion
//#region node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
function componentWillMount() {
	var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
	if (state !== null && state !== void 0) this.setState(state);
}
function componentWillReceiveProps(nextProps) {
	function updater(prevState) {
		var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
		return state !== null && state !== void 0 ? state : null;
	}
	this.setState(updater.bind(this));
}
function componentWillUpdate(nextProps, nextState) {
	try {
		var prevProps = this.props;
		var prevState = this.state;
		this.props = nextProps;
		this.state = nextState;
		this.__reactInternalSnapshotFlag = true;
		this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
	} finally {
		this.props = prevProps;
		this.state = prevState;
	}
}
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;
function polyfill(Component) {
	var prototype = Component.prototype;
	if (!prototype || !prototype.isReactComponent) throw new Error("Can only polyfill class components");
	if (typeof Component.getDerivedStateFromProps !== "function" && typeof prototype.getSnapshotBeforeUpdate !== "function") return Component;
	var foundWillMountName = null;
	var foundWillReceivePropsName = null;
	var foundWillUpdateName = null;
	if (typeof prototype.componentWillMount === "function") foundWillMountName = "componentWillMount";
	else if (typeof prototype.UNSAFE_componentWillMount === "function") foundWillMountName = "UNSAFE_componentWillMount";
	if (typeof prototype.componentWillReceiveProps === "function") foundWillReceivePropsName = "componentWillReceiveProps";
	else if (typeof prototype.UNSAFE_componentWillReceiveProps === "function") foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
	if (typeof prototype.componentWillUpdate === "function") foundWillUpdateName = "componentWillUpdate";
	else if (typeof prototype.UNSAFE_componentWillUpdate === "function") foundWillUpdateName = "UNSAFE_componentWillUpdate";
	if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
		var componentName = Component.displayName || Component.name;
		var newApiName = typeof Component.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
		throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + componentName + " uses " + newApiName + " but also contains the following legacy lifecycles:" + (foundWillMountName !== null ? "\n  " + foundWillMountName : "") + (foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "") + (foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks");
	}
	if (typeof Component.getDerivedStateFromProps === "function") {
		prototype.componentWillMount = componentWillMount;
		prototype.componentWillReceiveProps = componentWillReceiveProps;
	}
	if (typeof prototype.getSnapshotBeforeUpdate === "function") {
		if (typeof prototype.componentDidUpdate !== "function") throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
		prototype.componentWillUpdate = componentWillUpdate;
		var componentDidUpdate = prototype.componentDidUpdate;
		prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
			var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
			componentDidUpdate.call(this, prevProps, prevState, snapshot);
		};
	}
	return Component;
}
//#endregion
//#region node_modules/uncontrollable/lib/esm/uncontrollable.js
init_extends();
var _jsxFileName = "/Users/jquense/src/uncontrollable/src/uncontrollable.js";
function uncontrollable(Component, controlledValues, methods) {
	if (methods === void 0) methods = [];
	var displayName = Component.displayName || Component.name || "Component";
	var canAcceptRef$1 = canAcceptRef(Component);
	var controlledProps = Object.keys(controlledValues);
	var PROPS_TO_OMIT = controlledProps.map(defaultKey);
	!(canAcceptRef$1 || !methods.length) && (0, import_invariant.default)(false);
	var UncontrolledComponent = /*#__PURE__*/ function(_React$Component) {
		_inheritsLoose(UncontrolledComponent, _React$Component);
		function UncontrolledComponent() {
			var _this;
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
			_this.handlers = Object.create(null);
			controlledProps.forEach(function(propName) {
				var handlerName = controlledValues[propName];
				var handleChange = function handleChange(value) {
					if (_this.props[handlerName]) {
						var _this$props;
						_this._notifying = true;
						for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
						(_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args));
						_this._notifying = false;
					}
					if (!_this.unmounted) _this.setState(function(_ref) {
						var _extends2;
						var values = _ref.values;
						return { values: _extends(Object.create(null), values, (_extends2 = {}, _extends2[propName] = value, _extends2)) };
					});
				};
				_this.handlers[handlerName] = handleChange;
			});
			if (methods.length) _this.attachRef = function(ref) {
				_this.inner = ref;
			};
			var values = Object.create(null);
			controlledProps.forEach(function(key) {
				values[key] = _this.props[defaultKey(key)];
			});
			_this.state = {
				values,
				prevProps: {}
			};
			return _this;
		}
		var _proto = UncontrolledComponent.prototype;
		_proto.shouldComponentUpdate = function shouldComponentUpdate() {
			return !this._notifying;
		};
		UncontrolledComponent.getDerivedStateFromProps = function getDerivedStateFromProps(props, _ref2) {
			var values = _ref2.values, prevProps = _ref2.prevProps;
			var nextState = {
				values: _extends(Object.create(null), values),
				prevProps: {}
			};
			controlledProps.forEach(function(key) {
				/**
				* If a prop switches from controlled to Uncontrolled
				* reset its value to the defaultValue
				*/
				nextState.prevProps[key] = props[key];
				if (!isProp(props, key) && isProp(prevProps, key)) nextState.values[key] = props[defaultKey(key)];
			});
			return nextState;
		};
		_proto.componentWillUnmount = function componentWillUnmount() {
			this.unmounted = true;
		};
		_proto.render = function render() {
			var _this2 = this;
			var _this$props2 = this.props, innerRef = _this$props2.innerRef, props = _objectWithoutPropertiesLoose(_this$props2, ["innerRef"]);
			PROPS_TO_OMIT.forEach(function(prop) {
				delete props[prop];
			});
			var newProps = {};
			controlledProps.forEach(function(propName) {
				var propValue = _this2.props[propName];
				newProps[propName] = propValue !== void 0 ? propValue : _this2.state.values[propName];
			});
			return import_react.createElement(Component, _extends({}, props, newProps, this.handlers, { ref: innerRef || this.attachRef }));
		};
		return UncontrolledComponent;
	}(import_react.Component);
	polyfill(UncontrolledComponent);
	UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
	UncontrolledComponent.propTypes = _extends({ innerRef: function innerRef() {} }, uncontrolledPropTypes(controlledValues, displayName));
	methods.forEach(function(method) {
		UncontrolledComponent.prototype[method] = function $proxiedMethod() {
			var _this$inner;
			return (_this$inner = this.inner)[method].apply(_this$inner, arguments);
		};
	});
	var WrappedComponent = UncontrolledComponent;
	if (import_react.forwardRef) {
		WrappedComponent = import_react.forwardRef(function(props, ref) {
			return import_react.createElement(UncontrolledComponent, _extends({}, props, {
				innerRef: ref,
				__source: {
					fileName: _jsxFileName,
					lineNumber: 128
				},
				__self: this
			}));
		});
		WrappedComponent.propTypes = UncontrolledComponent.propTypes;
	}
	WrappedComponent.ControlledComponent = Component;
	/**
	* useful when wrapping a Component and you want to control
	* everything
	*/
	WrappedComponent.deferControlTo = function(newComponent, additions, nextMethods) {
		if (additions === void 0) additions = {};
		return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
	};
	return WrappedComponent;
}
//#endregion
//#region node_modules/react-overlays/esm/popper.js
var createPopper = popperGenerator({ defaultModifiers: [
	hide_default,
	popperOffsets_default,
	computeStyles_default,
	eventListeners_default,
	offset_default,
	flip_default,
	preventOverflow_default,
	arrow_default
] });
//#endregion
//#region node_modules/react-overlays/esm/usePopper.js
init_extends();
var initialPopperStyles = function initialPopperStyles(position) {
	return {
		position,
		top: "0",
		left: "0",
		opacity: "0",
		pointerEvents: "none"
	};
};
var disabledApplyStylesModifier = {
	name: "applyStyles",
	enabled: false
};
var ariaDescribedByModifier = {
	name: "ariaDescribedBy",
	enabled: true,
	phase: "afterWrite",
	effect: function effect(_ref) {
		var state = _ref.state;
		return function() {
			var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
			if ("removeAttribute" in reference) {
				var ids = (reference.getAttribute("aria-describedby") || "").split(",").filter(function(id) {
					return id.trim() !== popper.id;
				});
				if (!ids.length) reference.removeAttribute("aria-describedby");
				else reference.setAttribute("aria-describedby", ids.join(","));
			}
		};
	},
	fn: function fn(_ref2) {
		var _popper$getAttribute;
		var _state$elements2 = _ref2.state.elements, popper = _state$elements2.popper, reference = _state$elements2.reference;
		var role = (_popper$getAttribute = popper.getAttribute("role")) == null ? void 0 : _popper$getAttribute.toLowerCase();
		if (popper.id && role === "tooltip" && "setAttribute" in reference) {
			var ids = reference.getAttribute("aria-describedby");
			if (ids && ids.split(",").indexOf(popper.id) !== -1) return;
			reference.setAttribute("aria-describedby", ids ? ids + "," + popper.id : popper.id);
		}
	}
};
var EMPTY_MODIFIERS = [];
/**
* Position an element relative some reference element using Popper.js
*
* @param referenceElement
* @param popperElement
* @param {object}      options
* @param {object=}     options.modifiers Popper.js modifiers
* @param {boolean=}    options.enabled toggle the popper functionality on/off
* @param {string=}     options.placement The popper element placement relative to the reference element
* @param {string=}     options.strategy the positioning strategy
* @param {boolean=}    options.eventsEnabled have Popper listen on window resize events to reposition the element
* @param {function=}   options.onCreate called when the popper is created
* @param {function=}   options.onUpdate called when the popper is updated
*
* @returns {UsePopperState} The popper state
*/
function usePopper(referenceElement, popperElement, _temp) {
	var _ref3 = _temp === void 0 ? {} : _temp, _ref3$enabled = _ref3.enabled, enabled = _ref3$enabled === void 0 ? true : _ref3$enabled, _ref3$placement = _ref3.placement, placement = _ref3$placement === void 0 ? "bottom" : _ref3$placement, _ref3$strategy = _ref3.strategy, strategy = _ref3$strategy === void 0 ? "absolute" : _ref3$strategy, _ref3$modifiers = _ref3.modifiers, modifiers = _ref3$modifiers === void 0 ? EMPTY_MODIFIERS : _ref3$modifiers, config = _objectWithoutPropertiesLoose(_ref3, [
		"enabled",
		"placement",
		"strategy",
		"modifiers"
	]);
	var popperInstanceRef = (0, import_react.useRef)();
	var update = (0, import_react.useCallback)(function() {
		var _popperInstanceRef$cu;
		(_popperInstanceRef$cu = popperInstanceRef.current) == null || _popperInstanceRef$cu.update();
	}, []);
	var forceUpdate = (0, import_react.useCallback)(function() {
		var _popperInstanceRef$cu2;
		(_popperInstanceRef$cu2 = popperInstanceRef.current) == null || _popperInstanceRef$cu2.forceUpdate();
	}, []);
	var _useSafeState = useSafeState((0, import_react.useState)({
		placement,
		update,
		forceUpdate,
		attributes: {},
		styles: {
			popper: initialPopperStyles(strategy),
			arrow: {}
		}
	})), popperState = _useSafeState[0], setState = _useSafeState[1];
	var updateModifier = (0, import_react.useMemo)(function() {
		return {
			name: "updateStateModifier",
			enabled: true,
			phase: "write",
			requires: ["computeStyles"],
			fn: function fn(_ref4) {
				var state = _ref4.state;
				var styles = {};
				var attributes = {};
				Object.keys(state.elements).forEach(function(element) {
					styles[element] = state.styles[element];
					attributes[element] = state.attributes[element];
				});
				setState({
					state,
					styles,
					attributes,
					update,
					forceUpdate,
					placement: state.placement
				});
			}
		};
	}, [
		update,
		forceUpdate,
		setState
	]);
	(0, import_react.useEffect)(function() {
		if (!popperInstanceRef.current || !enabled) return;
		popperInstanceRef.current.setOptions({
			placement,
			strategy,
			modifiers: [].concat(modifiers, [updateModifier, disabledApplyStylesModifier])
		});
	}, [
		strategy,
		placement,
		updateModifier,
		enabled
	]);
	(0, import_react.useEffect)(function() {
		if (!enabled || referenceElement == null || popperElement == null) return;
		popperInstanceRef.current = createPopper(referenceElement, popperElement, _extends({}, config, {
			placement,
			strategy,
			modifiers: [].concat(modifiers, [ariaDescribedByModifier, updateModifier])
		}));
		return function() {
			if (popperInstanceRef.current != null) {
				popperInstanceRef.current.destroy();
				popperInstanceRef.current = void 0;
				setState(function(s) {
					return _extends({}, s, {
						attributes: {},
						styles: { popper: initialPopperStyles(strategy) }
					});
				});
			}
		};
	}, [
		enabled,
		referenceElement,
		popperElement
	]);
	return popperState;
}
//#endregion
//#region node_modules/react-overlays/esm/safeFindDOMNode.js
var import_warning = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Similar to invariant but only logs a warning if the condition is not met.
	* This can be used to log issues in development environments in critical
	* paths. Removing the logging code for production environments will keep the
	* same logic and follow the same code paths.
	*/
	var __DEV__ = false;
	var warning = function() {};
	if (__DEV__) {
		var printWarning = function printWarning(format, args) {
			var len = arguments.length;
			args = new Array(len > 1 ? len - 1 : 0);
			for (var key = 1; key < len; key++) args[key - 1] = arguments[key];
			var argIndex = 0;
			var message = "Warning: " + format.replace(/%s/g, function() {
				return args[argIndex++];
			});
			if (typeof console !== "undefined") console.error(message);
			try {
				throw new Error(message);
			} catch (x) {}
		};
		warning = function(condition, format, args) {
			var len = arguments.length;
			args = new Array(len > 2 ? len - 2 : 0);
			for (var key = 2; key < len; key++) args[key - 2] = arguments[key];
			if (format === void 0) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
			if (!condition) printWarning.apply(null, [format].concat(args));
		};
	}
	module.exports = warning;
})))());
function safeFindDOMNode(componentOrElement) {
	if (componentOrElement && "setState" in componentOrElement) return import_react_dom.default.findDOMNode(componentOrElement);
	return componentOrElement != null ? componentOrElement : null;
}
//#endregion
//#region node_modules/react-overlays/esm/ownerDocument.js
var ownerDocument_default = (function(componentOrElement) {
	return ownerDocument(safeFindDOMNode(componentOrElement));
});
//#endregion
//#region node_modules/react-overlays/esm/useRootClose.js
var escapeKeyCode = 27;
var noop = function noop() {};
function isLeftClickEvent(event) {
	return event.button === 0;
}
function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var getRefTarget = function getRefTarget(ref) {
	return ref && ("current" in ref ? ref.current : ref);
};
/**
* The `useRootClose` hook registers your callback on the document
* when rendered. Powers the `<Overlay/>` component. This is used achieve modal
* style behavior where your callback is triggered when the user tries to
* interact with the rest of the document or hits the `esc` key.
*
* @param {Ref<HTMLElement>| HTMLElement} ref  The element boundary
* @param {function} onRootClose
* @param {object=}  options
* @param {boolean=} options.disabled
* @param {string=}  options.clickTrigger The DOM event name (click, mousedown, etc) to attach listeners on
*/
function useRootClose(ref, onRootClose, _temp) {
	var _ref = _temp === void 0 ? {} : _temp, disabled = _ref.disabled, _ref$clickTrigger = _ref.clickTrigger, clickTrigger = _ref$clickTrigger === void 0 ? "click" : _ref$clickTrigger;
	var preventMouseRootCloseRef = (0, import_react.useRef)(false);
	var onClose = onRootClose || noop;
	var handleMouseCapture = (0, import_react.useCallback)(function(e) {
		var _e$composedPath$;
		var currentTarget = getRefTarget(ref);
		(0, import_warning.default)(!!currentTarget, "RootClose captured a close event but does not have a ref to compare it to. useRootClose(), should be passed a ref that resolves to a DOM node");
		preventMouseRootCloseRef.current = !currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains(currentTarget, (_e$composedPath$ = e.composedPath == null ? void 0 : e.composedPath()[0]) != null ? _e$composedPath$ : e.target);
	}, [ref]);
	var handleMouse = useEventCallback(function(e) {
		if (!preventMouseRootCloseRef.current) onClose(e);
	});
	var handleKeyUp = useEventCallback(function(e) {
		if (e.keyCode === escapeKeyCode) onClose(e);
	});
	(0, import_react.useEffect)(function() {
		if (disabled || ref == null) return void 0;
		var currentEvent = window.event;
		var doc = ownerDocument_default(getRefTarget(ref));
		var removeMouseCaptureListener = listen(doc, clickTrigger, handleMouseCapture, true);
		var removeMouseListener = listen(doc, clickTrigger, function(e) {
			if (e === currentEvent) {
				currentEvent = void 0;
				return;
			}
			handleMouse(e);
		});
		var removeKeyupListener = listen(doc, "keyup", function(e) {
			if (e === currentEvent) {
				currentEvent = void 0;
				return;
			}
			handleKeyUp(e);
		});
		var mobileSafariHackListeners = [];
		if ("ontouchstart" in doc.documentElement) mobileSafariHackListeners = [].slice.call(doc.body.children).map(function(el) {
			return listen(el, "mousemove", noop);
		});
		return function() {
			removeMouseCaptureListener();
			removeMouseListener();
			removeKeyupListener();
			mobileSafariHackListeners.forEach(function(remove) {
				return remove();
			});
		};
	}, [
		ref,
		disabled,
		clickTrigger,
		handleMouseCapture,
		handleMouse,
		handleKeyUp
	]);
}
//#endregion
//#region node_modules/react-overlays/esm/mergeOptionsWithPopperConfig.js
init_extends();
function toModifierMap(modifiers) {
	var result = {};
	if (!Array.isArray(modifiers)) return modifiers || result;
	modifiers?.forEach(function(m) {
		result[m.name] = m;
	});
	return result;
}
function toModifierArray(map) {
	if (map === void 0) map = {};
	if (Array.isArray(map)) return map;
	return Object.keys(map).map(function(k) {
		map[k].name = k;
		return map[k];
	});
}
function mergeOptionsWithPopperConfig(_ref) {
	var _modifiers$preventOve, _modifiers$preventOve2, _modifiers$offset, _modifiers$arrow;
	var enabled = _ref.enabled, enableEvents = _ref.enableEvents, placement = _ref.placement, flip = _ref.flip, offset = _ref.offset, fixed = _ref.fixed, containerPadding = _ref.containerPadding, arrowElement = _ref.arrowElement, _ref$popperConfig = _ref.popperConfig, popperConfig = _ref$popperConfig === void 0 ? {} : _ref$popperConfig;
	var modifiers = toModifierMap(popperConfig.modifiers);
	return _extends({}, popperConfig, {
		placement,
		enabled,
		strategy: fixed ? "fixed" : popperConfig.strategy,
		modifiers: toModifierArray(_extends({}, modifiers, {
			eventListeners: { enabled: enableEvents },
			preventOverflow: _extends({}, modifiers.preventOverflow, { options: containerPadding ? _extends({ padding: containerPadding }, (_modifiers$preventOve = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve.options) : (_modifiers$preventOve2 = modifiers.preventOverflow) == null ? void 0 : _modifiers$preventOve2.options }),
			offset: { options: _extends({ offset }, (_modifiers$offset = modifiers.offset) == null ? void 0 : _modifiers$offset.options) },
			arrow: _extends({}, modifiers.arrow, {
				enabled: !!arrowElement,
				options: _extends({}, (_modifiers$arrow = modifiers.arrow) == null ? void 0 : _modifiers$arrow.options, { element: arrowElement })
			}),
			flip: _extends({ enabled: !!flip }, modifiers.flip)
		}))
	});
}
//#endregion
//#region node_modules/react-overlays/esm/useWaitForDOMRef.js
var resolveContainerRef = function resolveContainerRef(ref) {
	var _ref;
	if (typeof document === "undefined") return null;
	if (ref == null) return ownerDocument().body;
	if (typeof ref === "function") ref = ref();
	if (ref && "current" in ref) ref = ref.current;
	if ((_ref = ref) != null && _ref.nodeType) return ref || null;
	return null;
};
function useWaitForDOMRef(ref, onResolved) {
	var _useState = (0, import_react.useState)(function() {
		return resolveContainerRef(ref);
	}), resolvedRef = _useState[0], setRef = _useState[1];
	if (!resolvedRef) {
		var earlyRef = resolveContainerRef(ref);
		if (earlyRef) setRef(earlyRef);
	}
	(0, import_react.useEffect)(function() {
		if (onResolved && resolvedRef) onResolved(resolvedRef);
	}, [onResolved, resolvedRef]);
	(0, import_react.useEffect)(function() {
		var nextRef = resolveContainerRef(ref);
		if (nextRef !== resolvedRef) setRef(nextRef);
	}, [ref, resolvedRef]);
	return resolvedRef;
}
//#endregion
//#region node_modules/react-overlays/esm/Overlay.js
init_extends();
/**
* Built on top of `Popper.js`, the overlay component is
* great for custom tooltip overlays.
*/
var Overlay = /*#__PURE__*/ import_react.forwardRef(function(props, outerRef) {
	var flip = props.flip, offset = props.offset, placement = props.placement, _props$containerPaddi = props.containerPadding, containerPadding = _props$containerPaddi === void 0 ? 5 : _props$containerPaddi, _props$popperConfig = props.popperConfig, popperConfig = _props$popperConfig === void 0 ? {} : _props$popperConfig, Transition = props.transition;
	var _useCallbackRef = useCallbackRef(), rootElement = _useCallbackRef[0], attachRef = _useCallbackRef[1];
	var _useCallbackRef2 = useCallbackRef(), arrowElement = _useCallbackRef2[0], attachArrowRef = _useCallbackRef2[1];
	var mergedRef = useMergedRefs(attachRef, outerRef);
	var container = useWaitForDOMRef(props.container);
	var target = useWaitForDOMRef(props.target);
	var _useState = (0, import_react.useState)(!props.show), exited = _useState[0], setExited = _useState[1];
	var _usePopper = usePopper(target, rootElement, mergeOptionsWithPopperConfig({
		placement,
		enableEvents: !!props.show,
		containerPadding: containerPadding || 5,
		flip,
		offset,
		arrowElement,
		popperConfig
	})), styles = _usePopper.styles, attributes = _usePopper.attributes, popper = _objectWithoutPropertiesLoose(_usePopper, ["styles", "attributes"]);
	if (props.show) {
		if (exited) setExited(false);
	} else if (!props.transition && !exited) setExited(true);
	var handleHidden = function handleHidden() {
		setExited(true);
		if (props.onExited) props.onExited.apply(props, arguments);
	};
	var mountOverlay = props.show || Transition && !exited;
	useRootClose(rootElement, props.onHide, {
		disabled: !props.rootClose || props.rootCloseDisabled,
		clickTrigger: props.rootCloseEvent
	});
	if (!mountOverlay) return null;
	var child = props.children(_extends({}, popper, {
		show: !!props.show,
		props: _extends({}, attributes.popper, {
			style: styles.popper,
			ref: mergedRef
		}),
		arrowProps: _extends({}, attributes.arrow, {
			style: styles.arrow,
			ref: attachArrowRef
		})
	}));
	if (Transition) {
		var onExit = props.onExit, onExiting = props.onExiting, onEnter = props.onEnter, onEntering = props.onEntering, onEntered = props.onEntered;
		child = /*#__PURE__*/ import_react.createElement(Transition, {
			"in": props.show,
			appear: true,
			onExit,
			onExiting,
			onExited: handleHidden,
			onEnter,
			onEntering,
			onEntered
		}, child);
	}
	return container ? /*#__PURE__*/ import_react_dom.createPortal(child, container) : null;
});
Overlay.displayName = "Overlay";
Overlay.propTypes = {
	/**
	* Set the visibility of the Overlay
	*/
	show: import_prop_types.default.bool,
	/** Specify where the overlay element is positioned in relation to the target element */
	placement: import_prop_types.default.oneOf(placements),
	/**
	* A DOM Element, Ref to an element, or function that returns either. The `target` element is where
	* the overlay is positioned relative to.
	*/
	target: import_prop_types.default.any,
	/**
	* A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
	* appended to it.
	*/
	container: import_prop_types.default.any,
	/**
	* Enables the Popper.js `flip` modifier, allowing the Overlay to
	* automatically adjust it's placement in case of overlap with the viewport or toggle.
	* Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
	*/
	flip: import_prop_types.default.bool,
	/**
	* A render prop that returns an element to overlay and position. See
	* the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
	*
	* @type {Function ({
	*   show: boolean,
	*   placement: Placement,
	*   update: () => void,
	*   forceUpdate: () => void,
	*   props: {
	*     ref: (?HTMLElement) => void,
	*     style: { [string]: string | number },
	*     aria-labelledby: ?string
	*     [string]: string | number,
	*   },
	*   arrowProps: {
	*     ref: (?HTMLElement) => void,
	*     style: { [string]: string | number },
	*     [string]: string | number,
	*   },
	* }) => React.Element}
	*/
	children: import_prop_types.default.func.isRequired,
	/**
	* Control how much space there is between the edge of the boundary element and overlay.
	* A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
	*/
	containerPadding: import_prop_types.default.number,
	/**
	* A set of popper options and props passed directly to react-popper's Popper component.
	*/
	popperConfig: import_prop_types.default.object,
	/**
	* Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
	*/
	rootClose: import_prop_types.default.bool,
	/**
	* Specify event for toggling overlay
	*/
	rootCloseEvent: import_prop_types.default.oneOf(["click", "mousedown"]),
	/**
	* Specify disabled for disable RootCloseWrapper
	*/
	rootCloseDisabled: import_prop_types.default.bool,
	/**
	* A Callback fired by the Overlay when it wishes to be hidden.
	*
	* __required__ when `rootClose` is `true`.
	*
	* @type func
	*/
	onHide: function onHide(props) {
		for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
		if (props.rootClose) {
			var _PropTypes$func;
			return (_PropTypes$func = import_prop_types.default.func).isRequired.apply(_PropTypes$func, [props].concat(args));
		}
		return import_prop_types.default.func.apply(import_prop_types.default, [props].concat(args));
	},
	/**
	* A `react-transition-group@2.0.0` `<Transition/>` component
	* used to animate the overlay as it changes visibility.
	*/
	transition: import_prop_types.default.elementType,
	/**
	* Callback fired before the Overlay transitions in
	*/
	onEnter: import_prop_types.default.func,
	/**
	* Callback fired as the Overlay begins to transition in
	*/
	onEntering: import_prop_types.default.func,
	/**
	* Callback fired after the Overlay finishes transitioning in
	*/
	onEntered: import_prop_types.default.func,
	/**
	* Callback fired right before the Overlay transitions out
	*/
	onExit: import_prop_types.default.func,
	/**
	* Callback fired as the Overlay begins to transition out
	*/
	onExiting: import_prop_types.default.func,
	/**
	* Callback fired after the Overlay finishes transitioning out
	*/
	onExited: import_prop_types.default.func
};
//#endregion
//#region node_modules/react-big-calendar/dist/react-big-calendar.esm.js
init_extends();
var import_chunk = /* @__PURE__ */ __toESM(require_chunk());
init_position();
init_animationFrame();
init_offset();
var import_isEqual = /* @__PURE__ */ __toESM(require_isEqual());
init_height();
init_querySelectorAll();
init_contains();
init_closest();
init_listen();
var import_findIndex = /* @__PURE__ */ __toESM(require_findIndex());
var import_range = /* @__PURE__ */ __toESM(require_range());
init_width();
var import_sortBy = /* @__PURE__ */ __toESM(require_sortBy());
init_scrollbarSize();
init_addClass();
init_removeClass();
var import_defaults = /* @__PURE__ */ __toESM(require_defaults());
var import_mapValues = /* @__PURE__ */ __toESM(require_mapValues());
var import_omit = /* @__PURE__ */ __toESM(require_omit());
var import_transform = /* @__PURE__ */ __toESM(require_transform());
require_isBetween();
require_isSameOrAfter();
require_isSameOrBefore();
require_localeData();
require_localizedFormat();
require_minMax();
require_utc();
require_isLeapYear();
function NoopWrapper(props) {
	return props.children;
}
var navigate = {
	PREVIOUS: "PREV",
	NEXT: "NEXT",
	TODAY: "TODAY",
	DATE: "DATE"
};
var views$1 = {
	MONTH: "month",
	WEEK: "week",
	WORK_WEEK: "work_week",
	DAY: "day",
	AGENDA: "agenda"
};
var viewNames$1 = Object.keys(views$1).map(function(k) {
	return views$1[k];
});
import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]);
import_prop_types.default.any;
import_prop_types.default.func;
import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOf(viewNames$1)), import_prop_types.default.objectOf(function(prop, key) {
	if (viewNames$1.indexOf(key) !== -1 && typeof prop[key] === "boolean") return null;
	else {
		for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
		return import_prop_types.default.elementType.apply(import_prop_types.default, [prop, key].concat(args));
	}
})]);
import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["overlap", "no-overlap"]), import_prop_types.default.func]);
var MILLI = {
	seconds: 1e3,
	minutes: 1e3 * 60,
	hours: 1e3 * 60 * 60,
	day: 1e3 * 60 * 60 * 24
};
function firstVisibleDay(date, localizer) {
	return startOf(startOf(date, "month"), "week", localizer.startOfWeek());
}
function lastVisibleDay(date, localizer) {
	return endOf(endOf(date, "month"), "week", localizer.startOfWeek());
}
function visibleDays(date, localizer) {
	var current = firstVisibleDay(date, localizer), last = lastVisibleDay(date, localizer), days = [];
	while (lte(current, last, "day")) {
		days.push(current);
		current = add(current, 1, "day");
	}
	return days;
}
function ceil(date, unit) {
	var floor = startOf(date, unit);
	return eq(floor, date) ? floor : add(floor, 1, unit);
}
function range(start, end) {
	var unit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "day";
	var current = start, days = [];
	while (lte(current, end, unit)) {
		days.push(current);
		current = add(current, 1, unit);
	}
	return days;
}
function merge(date, time) {
	if (time == null && date == null) return null;
	if (time == null) time = /* @__PURE__ */ new Date();
	if (date == null) date = /* @__PURE__ */ new Date();
	date = startOf(date, "day");
	date = hours(date, hours(time));
	date = minutes(date, minutes(time));
	date = seconds(date, seconds(time));
	return milliseconds(date, milliseconds(time));
}
function isJustDate(date) {
	return hours(date) === 0 && minutes(date) === 0 && seconds(date) === 0 && milliseconds(date) === 0;
}
function duration(start, end, unit, firstOfWeek) {
	if (unit === "day") unit = "date";
	return Math.abs(date_arithmetic_exports[unit](start, void 0, firstOfWeek) - date_arithmetic_exports[unit](end, void 0, firstOfWeek));
}
function diff(dateA, dateB, unit) {
	if (!unit || unit === "milliseconds") return Math.abs(+dateA - +dateB);
	return Math.round(Math.abs(+startOf(dateA, unit) / MILLI[unit] - +startOf(dateB, unit) / MILLI[unit]));
}
function ownKeys$a(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$a(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$a(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var localePropType = import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]);
function _format(localizer, formatter, value, format, culture) {
	var result = typeof format === "function" ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);
	(0, import_invariant.default)(result == null || typeof result === "string", "`localizer format(..)` must return a string, null, or undefined");
	return result;
}
/**
* This date conversion was moved out of TimeSlots.js, to
* allow for localizer override
* @param {Date} dt - The date to start from
* @param {Number} minutesFromMidnight
* @param {Number} offset
* @returns {Date}
*/
function getSlotDate(dt, minutesFromMidnight, offset) {
	return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, minutesFromMidnight + offset, 0, 0);
}
function getDstOffset(start, end) {
	return start.getTimezoneOffset() - end.getTimezoneOffset();
}
function getTotalMin(start, end) {
	return diff(start, end, "minutes") + getDstOffset(start, end);
}
function getMinutesFromMidnight(start) {
	var daystart = startOf(start, "day");
	return diff(daystart, start, "minutes") + getDstOffset(daystart, start);
}
function continuesPrior(start, first) {
	return lt(start, first, "day");
}
function continuesAfter(start, end, last) {
	return eq(start, end, "minutes") ? gte(end, last, "minutes") : gt(end, last, "minutes");
}
function daySpan(start, end) {
	return duration(start, end, "day");
}
function sortEvents$1(_ref) {
	var _ref$evtA = _ref.evtA, aStart = _ref$evtA.start, aEnd = _ref$evtA.end, aAllDay = _ref$evtA.allDay, _ref$evtB = _ref.evtB, bStart = _ref$evtB.start, bEnd = _ref$evtB.end, bAllDay = _ref$evtB.allDay;
	var startSort = +startOf(aStart, "day") - +startOf(bStart, "day");
	var durA = daySpan(aStart, aEnd);
	var durB = daySpan(bStart, bEnd);
	return startSort || durB - durA || !!bAllDay - !!aAllDay || +aStart - +bStart || +aEnd - +bEnd;
}
function inEventRange(_ref2) {
	var _ref2$event = _ref2.event, start = _ref2$event.start, end = _ref2$event.end, _ref2$range = _ref2.range, rangeStart = _ref2$range.start, rangeEnd = _ref2$range.end;
	var eStart = startOf(start, "day");
	var startsBeforeEnd = lte(eStart, rangeEnd, "day");
	var endsAfterStart = neq(eStart, end, "minutes") ? gt(end, rangeStart, "minutes") : gte(end, rangeStart, "minutes");
	return startsBeforeEnd && endsAfterStart;
}
function isSameDate(date1, date2) {
	return eq(date1, date2, "day");
}
function startAndEndAreDateOnly(start, end) {
	return isJustDate(start) && isJustDate(end);
}
var DateLocalizer = /*#__PURE__*/ _createClass(function DateLocalizer(spec) {
	var _this = this;
	_classCallCheck(this, DateLocalizer);
	(0, import_invariant.default)(typeof spec.format === "function", "date localizer `format(..)` must be a function");
	(0, import_invariant.default)(typeof spec.firstOfWeek === "function", "date localizer `firstOfWeek(..)` must be a function");
	this.propType = spec.propType || localePropType;
	this.formats = spec.formats;
	this.format = function() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		return _format.apply(void 0, [_this, spec.format].concat(args));
	};
	this.startOfWeek = spec.firstOfWeek;
	this.merge = spec.merge || merge;
	this.inRange = spec.inRange || inRange$1;
	this.lt = spec.lt || lt;
	this.lte = spec.lte || lte;
	this.gt = spec.gt || gt;
	this.gte = spec.gte || gte;
	this.eq = spec.eq || eq;
	this.neq = spec.neq || neq;
	this.startOf = spec.startOf || startOf;
	this.endOf = spec.endOf || endOf;
	this.add = spec.add || add;
	this.range = spec.range || range;
	this.diff = spec.diff || diff;
	this.ceil = spec.ceil || ceil;
	this.min = spec.min || min;
	this.max = spec.max || max;
	this.minutes = spec.minutes || minutes;
	this.daySpan = spec.daySpan || daySpan;
	this.firstVisibleDay = spec.firstVisibleDay || firstVisibleDay;
	this.lastVisibleDay = spec.lastVisibleDay || lastVisibleDay;
	this.visibleDays = spec.visibleDays || visibleDays;
	this.getSlotDate = spec.getSlotDate || getSlotDate;
	this.getTimezoneOffset = spec.getTimezoneOffset || function(value) {
		return value.getTimezoneOffset();
	};
	this.getDstOffset = spec.getDstOffset || getDstOffset;
	this.getTotalMin = spec.getTotalMin || getTotalMin;
	this.getMinutesFromMidnight = spec.getMinutesFromMidnight || getMinutesFromMidnight;
	this.continuesPrior = spec.continuesPrior || continuesPrior;
	this.continuesAfter = spec.continuesAfter || continuesAfter;
	this.sortEvents = spec.sortEvents || sortEvents$1;
	this.inEventRange = spec.inEventRange || inEventRange;
	this.isSameDate = spec.isSameDate || isSameDate;
	this.startAndEndAreDateOnly = spec.startAndEndAreDateOnly || startAndEndAreDateOnly;
	this.segmentOffset = spec.browserTZOffset ? spec.browserTZOffset() : 0;
});
function mergeWithDefaults(localizer, culture, formatOverrides, messages) {
	var formats = _objectSpread$a(_objectSpread$a({}, localizer.formats), formatOverrides);
	return _objectSpread$a(_objectSpread$a({}, localizer), {}, {
		messages,
		startOfWeek: function startOfWeek() {
			return localizer.startOfWeek(culture);
		},
		format: function format(value, _format2) {
			return localizer.format(value, formats[_format2] || _format2, culture);
		}
	});
}
function _callSuper$f(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$f() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$f() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$f = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var Toolbar = /*#__PURE__*/ function(_React$Component) {
	function Toolbar() {
		var _this;
		_classCallCheck(this, Toolbar);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper$f(this, Toolbar, [].concat(args));
		_this.navigate = function(action) {
			_this.props.onNavigate(action);
		};
		_this.view = function(view) {
			_this.props.onView(view);
		};
		return _this;
	}
	_inherits(Toolbar, _React$Component);
	return _createClass(Toolbar, [{
		key: "render",
		value: function render() {
			var _this$props = this.props, messages = _this$props.localizer.messages, label = _this$props.label;
			return /*#__PURE__*/ import_react.createElement("div", { className: "rbc-toolbar" }, /*#__PURE__*/ import_react.createElement("span", { className: "rbc-btn-group" }, /*#__PURE__*/ import_react.createElement("button", {
				type: "button",
				onClick: this.navigate.bind(null, navigate.TODAY)
			}, messages.today), /*#__PURE__*/ import_react.createElement("button", {
				type: "button",
				onClick: this.navigate.bind(null, navigate.PREVIOUS)
			}, messages.previous), /*#__PURE__*/ import_react.createElement("button", {
				type: "button",
				onClick: this.navigate.bind(null, navigate.NEXT)
			}, messages.next)), /*#__PURE__*/ import_react.createElement("span", { className: "rbc-toolbar-label" }, label), /*#__PURE__*/ import_react.createElement("span", { className: "rbc-btn-group" }, this.viewNamesGroup(messages)));
		}
	}, {
		key: "viewNamesGroup",
		value: function viewNamesGroup(messages) {
			var _this2 = this;
			var viewNames = this.props.views;
			var view = this.props.view;
			if (viewNames.length > 1) return viewNames.map(function(name) {
				return /*#__PURE__*/ import_react.createElement("button", {
					type: "button",
					key: name,
					className: clsx({ "rbc-active": view === name }),
					onClick: _this2.view.bind(null, name)
				}, messages[name]);
			});
		}
	}]);
}(import_react.Component);
Toolbar.propTypes = {};
function notify(handler, args) {
	handler && handler.apply(null, [].concat(args));
}
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var defaultMessages = {
	date: "Date",
	time: "Time",
	event: "Event",
	allDay: "All Day",
	week: "Week",
	work_week: "Work Week",
	day: "Day",
	month: "Month",
	previous: "Back",
	next: "Next",
	yesterday: "Yesterday",
	tomorrow: "Tomorrow",
	today: "Today",
	agenda: "Agenda",
	noEventsInRange: "There are no events in this range.",
	showMore: function showMore(total) {
		return "+".concat(total, " more");
	}
};
function messages(msgs) {
	return _objectSpread$9(_objectSpread$9({}, defaultMessages), msgs);
}
function useClickOutside(_ref) {
	var ref = _ref.ref, callback = _ref.callback;
	(0, import_react.useEffect)(function() {
		var handleClickOutside = function handleClickOutside(e) {
			if (ref.current && !ref.current.contains(e.target)) callback();
		};
		document.addEventListener("mousedown", handleClickOutside);
		return function() {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
}
var _excluded$7 = [
	"style",
	"className",
	"event",
	"selected",
	"isAllDay",
	"onSelect",
	"onDoubleClick",
	"onKeyPress",
	"localizer",
	"continuesPrior",
	"continuesAfter",
	"accessors",
	"getters",
	"children",
	"components",
	"slotStart",
	"slotEnd"
];
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _callSuper$e(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$e() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$e() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$e = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var EventCell = /*#__PURE__*/ function(_React$Component) {
	function EventCell() {
		_classCallCheck(this, EventCell);
		return _callSuper$e(this, EventCell, arguments);
	}
	_inherits(EventCell, _React$Component);
	return _createClass(EventCell, [{
		key: "render",
		value: function render() {
			var _this$props = this.props, style = _this$props.style, className = _this$props.className, event = _this$props.event, selected = _this$props.selected, isAllDay = _this$props.isAllDay, onSelect = _this$props.onSelect, _onDoubleClick = _this$props.onDoubleClick, onKeyPress = _this$props.onKeyPress, localizer = _this$props.localizer, continuesPrior = _this$props.continuesPrior, continuesAfter = _this$props.continuesAfter, accessors = _this$props.accessors, getters = _this$props.getters, children = _this$props.children, _this$props$component = _this$props.components, Event = _this$props$component.event, EventWrapper = _this$props$component.eventWrapper, slotStart = _this$props.slotStart, slotEnd = _this$props.slotEnd, props = _objectWithoutProperties(_this$props, _excluded$7);
			delete props.resizable;
			var title = accessors.title(event);
			var tooltip = accessors.tooltip(event);
			var end = accessors.end(event);
			var start = accessors.start(event);
			var allDay = accessors.allDay(event);
			var showAsAllDay = isAllDay || allDay || localizer.diff(start, localizer.ceil(end, "day"), "day") > 1;
			var userProps = getters.eventProp(event, start, end, selected);
			var content = /*#__PURE__*/ import_react.createElement("div", {
				className: "rbc-event-content",
				title: tooltip || void 0
			}, Event ? /*#__PURE__*/ import_react.createElement(Event, {
				event,
				continuesPrior,
				continuesAfter,
				title,
				isAllDay: allDay,
				localizer,
				slotStart,
				slotEnd
			}) : title);
			return /*#__PURE__*/ import_react.createElement(EventWrapper, _extends({}, this.props, { type: "date" }), /*#__PURE__*/ import_react.createElement("div", _extends({}, props, {
				style: _objectSpread$8(_objectSpread$8({}, userProps.style), style),
				className: clsx("rbc-event", className, userProps.className, {
					"rbc-selected": selected,
					"rbc-event-allday": showAsAllDay,
					"rbc-event-continues-prior": continuesPrior,
					"rbc-event-continues-after": continuesAfter
				}),
				onClick: function onClick(e) {
					return onSelect && onSelect(event, e);
				},
				onDoubleClick: function onDoubleClick(e) {
					return _onDoubleClick && _onDoubleClick(event, e);
				},
				onKeyDown: function onKeyDown(e) {
					return onKeyPress && onKeyPress(event, e);
				}
			}), typeof children === "function" ? children(content) : content));
		}
	}]);
}(import_react.Component);
EventCell.propTypes = {};
function isSelected(event, selected) {
	if (!event || selected == null) return false;
	return (0, import_isEqual.default)(event, selected);
}
function slotWidth(rowBox, slots) {
	return (rowBox.right - rowBox.left) / slots;
}
function getSlotAtX(rowBox, x, rtl, slots) {
	var cellWidth = slotWidth(rowBox, slots);
	return rtl ? slots - 1 - Math.floor((x - rowBox.left) / cellWidth) : Math.floor((x - rowBox.left) / cellWidth);
}
function pointInBox(box, _ref) {
	var x = _ref.x, y = _ref.y;
	return y >= box.top && y <= box.bottom && x >= box.left && x <= box.right;
}
function dateCellSelection(start, rowBox, box, slots, rtl) {
	var startIdx = -1;
	var endIdx = -1;
	var lastSlotIdx = slots - 1;
	var cellWidth = slotWidth(rowBox, slots);
	var currentSlot = getSlotAtX(rowBox, box.x, rtl, slots);
	var isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y;
	var isStartRow = rowBox.top < start.y && rowBox.bottom > start.y;
	var isAboveStart = start.y > rowBox.bottom;
	var isBelowStart = rowBox.top > start.y;
	if (box.top < rowBox.top && box.bottom > rowBox.bottom) {
		startIdx = 0;
		endIdx = lastSlotIdx;
	}
	if (isCurrentRow) {
		if (isBelowStart) {
			startIdx = 0;
			endIdx = currentSlot;
		} else if (isAboveStart) {
			startIdx = currentSlot;
			endIdx = lastSlotIdx;
		}
	}
	if (isStartRow) {
		startIdx = endIdx = rtl ? lastSlotIdx - Math.floor((start.x - rowBox.left) / cellWidth) : Math.floor((start.x - rowBox.left) / cellWidth);
		if (isCurrentRow) if (currentSlot < startIdx) startIdx = currentSlot;
		else endIdx = currentSlot;
		else if (start.y < box.y) endIdx = lastSlotIdx;
		else startIdx = 0;
	}
	return {
		startIdx,
		endIdx
	};
}
/**
* Changes to react-overlays cause issue with auto positioning,
* so we need to manually calculate the position of the popper,
* and constrain it to the Month container.
*/
function getPosition(_ref) {
	var target = _ref.target, offset$1 = _ref.offset, container = _ref.container, box = _ref.box;
	var _getOffset = offset(target), top = _getOffset.top, left = _getOffset.left, width = _getOffset.width, height = _getOffset.height;
	var _getOffset2 = offset(container), cTop = _getOffset2.top, cLeft = _getOffset2.left, cWidth = _getOffset2.width, cHeight = _getOffset2.height;
	var _getOffset3 = offset(box), bWidth = _getOffset3.width, bHeight = _getOffset3.height;
	var viewBottom = cTop + cHeight;
	var viewRight = cLeft + cWidth;
	var bottom = top + bHeight;
	var right = left + bWidth;
	var x = offset$1.x, y = offset$1.y;
	return {
		topOffset: bottom > viewBottom ? top - bHeight - y : top + y + height,
		leftOffset: right > viewRight ? left + x - bWidth + width : left + x
	};
}
function Pop(_ref2) {
	var containerRef = _ref2.containerRef, accessors = _ref2.accessors, getters = _ref2.getters, selected = _ref2.selected, components = _ref2.components, localizer = _ref2.localizer, position = _ref2.position, show = _ref2.show, events = _ref2.events, slotStart = _ref2.slotStart, slotEnd = _ref2.slotEnd, onSelect = _ref2.onSelect, onDoubleClick = _ref2.onDoubleClick, onKeyPress = _ref2.onKeyPress, handleDragStart = _ref2.handleDragStart, popperRef = _ref2.popperRef, target = _ref2.target, offset = _ref2.offset;
	useClickOutside({
		ref: popperRef,
		callback: show
	});
	(0, import_react.useLayoutEffect)(function() {
		var _getPosition = getPosition({
			target,
			offset,
			container: containerRef.current,
			box: popperRef.current
		}), topOffset = _getPosition.topOffset, leftOffset = _getPosition.leftOffset;
		popperRef.current.style.top = "".concat(topOffset, "px");
		popperRef.current.style.left = "".concat(leftOffset, "px");
	}, [
		offset.x,
		offset.y,
		target
	]);
	var width = position.width;
	var style = { minWidth: width + width / 2 };
	return /*#__PURE__*/ import_react.createElement("div", {
		style,
		className: "rbc-overlay",
		ref: popperRef
	}, /*#__PURE__*/ import_react.createElement("div", { className: "rbc-overlay-header" }, localizer.format(slotStart, "dayHeaderFormat")), events.map(function(event, idx) {
		return /*#__PURE__*/ import_react.createElement(EventCell, {
			key: idx,
			type: "popup",
			localizer,
			event,
			getters,
			onSelect,
			accessors,
			components,
			onDoubleClick,
			onKeyPress,
			continuesPrior: localizer.lt(accessors.end(event), slotStart, "day"),
			continuesAfter: localizer.gte(accessors.start(event), slotEnd, "day"),
			slotStart,
			slotEnd,
			selected: isSelected(event, selected),
			draggable: true,
			onDragStart: function onDragStart() {
				return handleDragStart(event);
			},
			onDragEnd: function onDragEnd() {
				return show();
			}
		});
	}));
}
var Popup = /*#__PURE__*/ import_react.forwardRef(function(props, ref) {
	return /*#__PURE__*/ import_react.createElement(Pop, _extends({}, props, { popperRef: ref }));
});
Popup.propTypes = {
	accessors: import_prop_types.default.object.isRequired,
	getters: import_prop_types.default.object.isRequired,
	selected: import_prop_types.default.object,
	components: import_prop_types.default.object.isRequired,
	localizer: import_prop_types.default.object.isRequired,
	position: import_prop_types.default.object.isRequired,
	show: import_prop_types.default.func.isRequired,
	events: import_prop_types.default.array.isRequired,
	slotStart: import_prop_types.default.instanceOf(Date).isRequired,
	slotEnd: import_prop_types.default.instanceOf(Date),
	onSelect: import_prop_types.default.func,
	onDoubleClick: import_prop_types.default.func,
	onKeyPress: import_prop_types.default.func,
	handleDragStart: import_prop_types.default.func,
	style: import_prop_types.default.object,
	offset: import_prop_types.default.shape({
		x: import_prop_types.default.number,
		y: import_prop_types.default.number
	})
};
function CalOverlay(_ref) {
	var containerRef = _ref.containerRef, _ref$popupOffset = _ref.popupOffset, popupOffset = _ref$popupOffset === void 0 ? 5 : _ref$popupOffset, overlay = _ref.overlay, accessors = _ref.accessors, localizer = _ref.localizer, components = _ref.components, getters = _ref.getters, selected = _ref.selected, handleSelectEvent = _ref.handleSelectEvent, handleDoubleClickEvent = _ref.handleDoubleClickEvent, handleKeyPressEvent = _ref.handleKeyPressEvent, handleDragStart = _ref.handleDragStart, onHide = _ref.onHide, overlayDisplay = _ref.overlayDisplay;
	var popperRef = (0, import_react.useRef)(null);
	if (!overlay.position) return null;
	var offset = popupOffset;
	if (!isNaN(popupOffset)) offset = {
		x: popupOffset,
		y: popupOffset
	};
	var position = overlay.position, events = overlay.events, date = overlay.date, end = overlay.end;
	return /*#__PURE__*/ import_react.createElement(Overlay, {
		rootClose: true,
		flip: true,
		show: true,
		placement: "bottom",
		onHide,
		target: overlay.target
	}, function(_ref2) {
		var props = _ref2.props;
		return /*#__PURE__*/ import_react.createElement(Popup, _extends({}, props, {
			containerRef,
			ref: popperRef,
			target: overlay.target,
			offset,
			accessors,
			getters,
			selected,
			components,
			localizer,
			position,
			show: overlayDisplay,
			events,
			slotStart: date,
			slotEnd: end,
			onSelect: handleSelectEvent,
			onDoubleClick: handleDoubleClickEvent,
			onKeyPress: handleKeyPressEvent,
			handleDragStart
		}));
	});
}
var PopOverlay = /*#__PURE__*/ import_react.forwardRef(function(props, ref) {
	return /*#__PURE__*/ import_react.createElement(CalOverlay, _extends({}, props, { containerRef: ref }));
});
PopOverlay.propTypes = {
	popupOffset: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.shape({
		x: import_prop_types.default.number,
		y: import_prop_types.default.number
	})]),
	overlay: import_prop_types.default.shape({
		position: import_prop_types.default.object,
		events: import_prop_types.default.array,
		date: import_prop_types.default.instanceOf(Date),
		end: import_prop_types.default.instanceOf(Date)
	}),
	accessors: import_prop_types.default.object.isRequired,
	localizer: import_prop_types.default.object.isRequired,
	components: import_prop_types.default.object.isRequired,
	getters: import_prop_types.default.object.isRequired,
	selected: import_prop_types.default.object,
	handleSelectEvent: import_prop_types.default.func,
	handleDoubleClickEvent: import_prop_types.default.func,
	handleKeyPressEvent: import_prop_types.default.func,
	handleDragStart: import_prop_types.default.func,
	onHide: import_prop_types.default.func,
	overlayDisplay: import_prop_types.default.func
};
function addEventListener(type, handler) {
	return listen$1(arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : document, type, handler, { passive: false });
}
function isOverContainer(container, x, y) {
	return !container || contains$1(container, document.elementFromPoint(x, y));
}
function getEventNodeFromPoint(node, _ref) {
	var clientX = _ref.clientX, clientY = _ref.clientY;
	return closest(document.elementFromPoint(clientX, clientY), ".rbc-event", node);
}
function getShowMoreNodeFromPoint(node, _ref2) {
	var clientX = _ref2.clientX, clientY = _ref2.clientY;
	return closest(document.elementFromPoint(clientX, clientY), ".rbc-show-more", node);
}
function isEvent(node, bounds) {
	return !!getEventNodeFromPoint(node, bounds);
}
function isShowMore(node, bounds) {
	return !!getShowMoreNodeFromPoint(node, bounds);
}
function getEventCoordinates(e) {
	var target = e;
	if (e.touches && e.touches.length) target = e.touches[0];
	return {
		clientX: target.clientX,
		clientY: target.clientY,
		pageX: target.pageX,
		pageY: target.pageY
	};
}
var clickTolerance = 5;
var clickInterval = 250;
var Selection = /*#__PURE__*/ function() {
	function Selection(node) {
		var _ref3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref3$global = _ref3.global, global = _ref3$global === void 0 ? false : _ref3$global, _ref3$longPressThresh = _ref3.longPressThreshold, longPressThreshold = _ref3$longPressThresh === void 0 ? 250 : _ref3$longPressThresh, _ref3$validContainers = _ref3.validContainers, validContainers = _ref3$validContainers === void 0 ? [] : _ref3$validContainers;
		_classCallCheck(this, Selection);
		this._initialEvent = null;
		this.selecting = false;
		this.isDetached = false;
		this.container = node;
		this.globalMouse = !node || global;
		this.longPressThreshold = longPressThreshold;
		this.validContainers = validContainers;
		this._listeners = Object.create(null);
		this._handleInitialEvent = this._handleInitialEvent.bind(this);
		this._handleMoveEvent = this._handleMoveEvent.bind(this);
		this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
		this._keyListener = this._keyListener.bind(this);
		this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this);
		this._dragOverFromOutsideListener = this._dragOverFromOutsideListener.bind(this);
		this._removeTouchMoveWindowListener = addEventListener("touchmove", function() {}, window);
		this._removeKeyDownListener = addEventListener("keydown", this._keyListener);
		this._removeKeyUpListener = addEventListener("keyup", this._keyListener);
		this._removeDropFromOutsideListener = addEventListener("drop", this._dropFromOutsideListener);
		this._removeDragOverFromOutsideListener = addEventListener("dragover", this._dragOverFromOutsideListener);
		this._addInitialEventListener();
	}
	return _createClass(Selection, [
		{
			key: "on",
			value: function on(type, handler) {
				var handlers = this._listeners[type] || (this._listeners[type] = []);
				handlers.push(handler);
				return { remove: function remove() {
					var idx = handlers.indexOf(handler);
					if (idx !== -1) handlers.splice(idx, 1);
				} };
			}
		},
		{
			key: "emit",
			value: function emit(type) {
				for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
				var result;
				(this._listeners[type] || []).forEach(function(fn) {
					if (result === void 0) result = fn.apply(void 0, args);
				});
				return result;
			}
		},
		{
			key: "teardown",
			value: function teardown() {
				this._initialEvent = null;
				this._initialEventData = null;
				this._selectRect = null;
				this.selecting = false;
				this._lastClickData = null;
				this.isDetached = true;
				this._listeners = Object.create(null);
				this._removeTouchMoveWindowListener && this._removeTouchMoveWindowListener();
				this._removeInitialEventListener && this._removeInitialEventListener();
				this._removeEndListener && this._removeEndListener();
				this._onEscListener && this._onEscListener();
				this._removeMoveListener && this._removeMoveListener();
				this._removeKeyUpListener && this._removeKeyUpListener();
				this._removeKeyDownListener && this._removeKeyDownListener();
				this._removeDropFromOutsideListener && this._removeDropFromOutsideListener();
				this._removeDragOverFromOutsideListener && this._removeDragOverFromOutsideListener();
			}
		},
		{
			key: "isSelected",
			value: function isSelected(node) {
				var box = this._selectRect;
				if (!box || !this.selecting) return false;
				return objectsCollide(box, getBoundsForNode(node));
			}
		},
		{
			key: "filter",
			value: function filter(items) {
				if (!this._selectRect || !this.selecting) return [];
				return items.filter(this.isSelected, this);
			}
		},
		{
			key: "_addLongPressListener",
			value: function _addLongPressListener(handler, initialEvent) {
				var _this = this;
				var timer = null;
				var removeTouchMoveListener = null;
				var removeTouchEndListener = null;
				var handleTouchStart = function handleTouchStart(initialEvent) {
					timer = setTimeout(function() {
						cleanup();
						handler(initialEvent);
					}, _this.longPressThreshold);
					removeTouchMoveListener = addEventListener("touchmove", function() {
						return cleanup();
					});
					removeTouchEndListener = addEventListener("touchend", function() {
						return cleanup();
					});
				};
				var removeTouchStartListener = addEventListener("touchstart", handleTouchStart);
				var cleanup = function cleanup() {
					if (timer) clearTimeout(timer);
					if (removeTouchMoveListener) removeTouchMoveListener();
					if (removeTouchEndListener) removeTouchEndListener();
					timer = null;
					removeTouchMoveListener = null;
					removeTouchEndListener = null;
				};
				if (initialEvent) handleTouchStart(initialEvent);
				return function() {
					cleanup();
					removeTouchStartListener();
				};
			}
		},
		{
			key: "_addInitialEventListener",
			value: function _addInitialEventListener() {
				var _this2 = this;
				var removeMouseDownListener = addEventListener("mousedown", function(e) {
					_this2._removeInitialEventListener();
					_this2._handleInitialEvent(e);
					_this2._removeInitialEventListener = addEventListener("mousedown", _this2._handleInitialEvent);
				});
				var removeTouchStartListener = addEventListener("touchstart", function(e) {
					_this2._removeInitialEventListener();
					_this2._removeInitialEventListener = _this2._addLongPressListener(_this2._handleInitialEvent, e);
				});
				this._removeInitialEventListener = function() {
					removeMouseDownListener();
					removeTouchStartListener();
				};
			}
		},
		{
			key: "_dropFromOutsideListener",
			value: function _dropFromOutsideListener(e) {
				var _getEventCoordinates = getEventCoordinates(e), pageX = _getEventCoordinates.pageX, pageY = _getEventCoordinates.pageY, clientX = _getEventCoordinates.clientX, clientY = _getEventCoordinates.clientY;
				this.emit("dropFromOutside", {
					x: pageX,
					y: pageY,
					clientX,
					clientY
				});
				e.preventDefault();
			}
		},
		{
			key: "_dragOverFromOutsideListener",
			value: function _dragOverFromOutsideListener(e) {
				var _getEventCoordinates2 = getEventCoordinates(e), pageX = _getEventCoordinates2.pageX, pageY = _getEventCoordinates2.pageY, clientX = _getEventCoordinates2.clientX, clientY = _getEventCoordinates2.clientY;
				this.emit("dragOverFromOutside", {
					x: pageX,
					y: pageY,
					clientX,
					clientY
				});
				e.preventDefault();
			}
		},
		{
			key: "_handleInitialEvent",
			value: function _handleInitialEvent(e) {
				this._initialEvent = e;
				if (this.isDetached) return;
				var _getEventCoordinates3 = getEventCoordinates(e), clientX = _getEventCoordinates3.clientX, clientY = _getEventCoordinates3.clientY, pageX = _getEventCoordinates3.pageX, pageY = _getEventCoordinates3.pageY;
				var node = this.container(), collides, offsetData;
				if (e.which === 3 || e.button === 2 || !isOverContainer(node, clientX, clientY)) return;
				if (!this.globalMouse && node && !contains$1(node, e.target)) {
					var _normalizeDistance = normalizeDistance(0), top = _normalizeDistance.top, left = _normalizeDistance.left, bottom = _normalizeDistance.bottom, right = _normalizeDistance.right;
					offsetData = getBoundsForNode(node);
					collides = objectsCollide({
						top: offsetData.top - top,
						left: offsetData.left - left,
						bottom: offsetData.bottom + bottom,
						right: offsetData.right + right
					}, {
						top: pageY,
						left: pageX
					});
					if (!collides) return;
				}
				if (this.emit("beforeSelect", this._initialEventData = {
					isTouch: /^touch/.test(e.type),
					x: pageX,
					y: pageY,
					clientX,
					clientY
				}) === false) return;
				switch (e.type) {
					case "mousedown":
						this._removeEndListener = addEventListener("mouseup", this._handleTerminatingEvent);
						this._onEscListener = addEventListener("keydown", this._handleTerminatingEvent);
						this._removeMoveListener = addEventListener("mousemove", this._handleMoveEvent);
						break;
					case "touchstart":
						this._handleMoveEvent(e);
						this._removeEndListener = addEventListener("touchend", this._handleTerminatingEvent);
						this._removeMoveListener = addEventListener("touchmove", this._handleMoveEvent);
						break;
				}
			}
		},
		{
			key: "_isWithinValidContainer",
			value: function _isWithinValidContainer(e) {
				var eventTarget = e.target;
				var containers = this.validContainers;
				if (!containers || !containers.length || !eventTarget) return true;
				return containers.some(function(target) {
					return !!eventTarget.closest(target);
				});
			}
		},
		{
			key: "_handleTerminatingEvent",
			value: function _handleTerminatingEvent(e) {
				var selecting = this.selecting;
				var bounds = this._selectRect;
				if (!selecting && e.type.includes("key")) e = this._initialEvent;
				this.selecting = false;
				this._removeEndListener && this._removeEndListener();
				this._removeMoveListener && this._removeMoveListener();
				this._selectRect = null;
				this._initialEvent = null;
				this._initialEventData = null;
				if (!e) return;
				var inRoot = !this.container || contains$1(this.container(), e.target);
				var isWithinValidContainer = this._isWithinValidContainer(e);
				if (e.key === "Escape" || !isWithinValidContainer) return this.emit("reset");
				if (!selecting && inRoot) return this._handleClickEvent(e);
				if (selecting) return this.emit("select", bounds);
				return this.emit("reset");
			}
		},
		{
			key: "_handleClickEvent",
			value: function _handleClickEvent(e) {
				var _getEventCoordinates4 = getEventCoordinates(e), pageX = _getEventCoordinates4.pageX, pageY = _getEventCoordinates4.pageY, clientX = _getEventCoordinates4.clientX, clientY = _getEventCoordinates4.clientY;
				var now = (/* @__PURE__ */ new Date()).getTime();
				if (this._lastClickData && now - this._lastClickData.timestamp < clickInterval) {
					this._lastClickData = null;
					return this.emit("doubleClick", {
						x: pageX,
						y: pageY,
						clientX,
						clientY
					});
				}
				this._lastClickData = { timestamp: now };
				return this.emit("click", {
					x: pageX,
					y: pageY,
					clientX,
					clientY
				});
			}
		},
		{
			key: "_handleMoveEvent",
			value: function _handleMoveEvent(e) {
				if (this._initialEventData === null || this.isDetached) return;
				var _this$_initialEventDa = this._initialEventData, x = _this$_initialEventDa.x, y = _this$_initialEventDa.y;
				var _getEventCoordinates5 = getEventCoordinates(e), pageX = _getEventCoordinates5.pageX, pageY = _getEventCoordinates5.pageY;
				var w = Math.abs(x - pageX);
				var h = Math.abs(y - pageY);
				var left = Math.min(pageX, x), top = Math.min(pageY, y), old = this.selecting;
				var click = this.isClick(pageX, pageY);
				if (click && !old && !(w || h)) return;
				if (!old && !click) this.emit("selectStart", this._initialEventData);
				if (!click) {
					this.selecting = true;
					this._selectRect = {
						top,
						left,
						x: pageX,
						y: pageY,
						right: left + w,
						bottom: top + h
					};
					this.emit("selecting", this._selectRect);
				}
				e.preventDefault();
			}
		},
		{
			key: "_keyListener",
			value: function _keyListener(e) {
				this.ctrl = e.metaKey || e.ctrlKey;
			}
		},
		{
			key: "isClick",
			value: function isClick(pageX, pageY) {
				var _this$_initialEventDa2 = this._initialEventData, x = _this$_initialEventDa2.x, y = _this$_initialEventDa2.y;
				return !_this$_initialEventDa2.isTouch && Math.abs(pageX - x) <= clickTolerance && Math.abs(pageY - y) <= clickTolerance;
			}
		}
	]);
}();
/**
* Resolve the disance prop from either an Int or an Object
* @return {Object}
*/
function normalizeDistance() {
	var distance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
	if (_typeof(distance) !== "object") distance = {
		top: distance,
		left: distance,
		right: distance,
		bottom: distance
	};
	return distance;
}
/**
* Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
* properties, determine if they collide.
* @param  {Object|HTMLElement} a
* @param  {Object|HTMLElement} b
* @return {bool}
*/
function objectsCollide(nodeA, nodeB) {
	var tolerance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
	var _getBoundsForNode = getBoundsForNode(nodeA), aTop = _getBoundsForNode.top, aLeft = _getBoundsForNode.left, _getBoundsForNode$rig = _getBoundsForNode.right, aRight = _getBoundsForNode$rig === void 0 ? aLeft : _getBoundsForNode$rig, _getBoundsForNode$bot = _getBoundsForNode.bottom, aBottom = _getBoundsForNode$bot === void 0 ? aTop : _getBoundsForNode$bot;
	var _getBoundsForNode2 = getBoundsForNode(nodeB), bTop = _getBoundsForNode2.top, bLeft = _getBoundsForNode2.left, _getBoundsForNode2$ri = _getBoundsForNode2.right, bRight = _getBoundsForNode2$ri === void 0 ? bLeft : _getBoundsForNode2$ri, _getBoundsForNode2$bo = _getBoundsForNode2.bottom, bBottom = _getBoundsForNode2$bo === void 0 ? bTop : _getBoundsForNode2$bo;
	return !(aBottom - tolerance < bTop || aTop + tolerance > bBottom || aRight - tolerance < bLeft || aLeft + tolerance > bRight);
}
/**
* Given a node, get everything needed to calculate its boundaries
* @param  {HTMLElement} node
* @return {Object}
*/
function getBoundsForNode(node) {
	if (!node.getBoundingClientRect) return node;
	var rect = node.getBoundingClientRect(), left = rect.left + pageOffset("left"), top = rect.top + pageOffset("top");
	return {
		top,
		left,
		right: (node.offsetWidth || 0) + left,
		bottom: (node.offsetHeight || 0) + top
	};
}
function pageOffset(dir) {
	if (dir === "left") return window.pageXOffset || document.body.scrollLeft || 0;
	if (dir === "top") return window.pageYOffset || document.body.scrollTop || 0;
}
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _callSuper$d(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$d() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$d() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$d = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var BackgroundCells = /*#__PURE__*/ function(_React$Component) {
	function BackgroundCells(props, context) {
		var _this;
		_classCallCheck(this, BackgroundCells);
		_this = _callSuper$d(this, BackgroundCells, [props, context]);
		_this.state = { selecting: false };
		_this.containerRef = /*#__PURE__*/ (0, import_react.createRef)();
		return _this;
	}
	_inherits(BackgroundCells, _React$Component);
	return _createClass(BackgroundCells, [
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				this.props.selectable && this._selectable();
			}
		},
		{
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this._teardownSelectable();
			}
		},
		{
			key: "componentDidUpdate",
			value: function componentDidUpdate(prevProps) {
				if (!prevProps.selectable && this.props.selectable) this._selectable();
				if (prevProps.selectable && !this.props.selectable) this._teardownSelectable();
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props = this.props, range = _this$props.range, getNow = _this$props.getNow, getters = _this$props.getters, currentDate = _this$props.date, Wrapper = _this$props.components.dateCellWrapper, localizer = _this$props.localizer;
				var _this$state = this.state, selecting = _this$state.selecting, startIdx = _this$state.startIdx, endIdx = _this$state.endIdx;
				var current = getNow();
				return /*#__PURE__*/ import_react.createElement("div", {
					className: "rbc-row-bg",
					ref: this.containerRef
				}, range.map(function(date, index) {
					var selected = selecting && index >= startIdx && index <= endIdx;
					var _getters$dayProp = getters.dayProp(date), className = _getters$dayProp.className, style = _getters$dayProp.style;
					return /*#__PURE__*/ import_react.createElement(Wrapper, {
						key: index,
						value: date,
						range
					}, /*#__PURE__*/ import_react.createElement("div", {
						style,
						className: clsx("rbc-day-bg", className, selected && "rbc-selected-cell", localizer.isSameDate(date, current) && "rbc-today", currentDate && localizer.neq(currentDate, date, "month") && "rbc-off-range-bg")
					}));
				}));
			}
		},
		{
			key: "_selectable",
			value: function _selectable() {
				var _this2 = this;
				var node = this.containerRef.current;
				var selector = this._selector = new Selection(this.props.container, { longPressThreshold: this.props.longPressThreshold });
				var selectorClicksHandler = function selectorClicksHandler(point, actionType) {
					if (!isEvent(node, point) && !isShowMore(node, point)) {
						var rowBox = getBoundsForNode(node);
						var _this2$props = _this2.props, range = _this2$props.range, rtl = _this2$props.rtl;
						if (pointInBox(rowBox, point)) {
							var currentCell = getSlotAtX(rowBox, point.x, rtl, range.length);
							_this2._selectSlot({
								startIdx: currentCell,
								endIdx: currentCell,
								action: actionType,
								box: point
							});
						}
					}
					_this2._initial = {};
					_this2.setState({ selecting: false });
				};
				selector.on("selecting", function(box) {
					var _this2$props2 = _this2.props, range = _this2$props2.range, rtl = _this2$props2.rtl;
					var startIdx = -1;
					var endIdx = -1;
					if (!_this2.state.selecting) {
						notify(_this2.props.onSelectStart, [box]);
						_this2._initial = {
							x: box.x,
							y: box.y
						};
					}
					if (selector.isSelected(node)) {
						var nodeBox = getBoundsForNode(node);
						var _dateCellSelection = dateCellSelection(_this2._initial, nodeBox, box, range.length, rtl);
						startIdx = _dateCellSelection.startIdx;
						endIdx = _dateCellSelection.endIdx;
					}
					_this2.setState({
						selecting: true,
						startIdx,
						endIdx
					});
				});
				selector.on("beforeSelect", function(box) {
					if (_this2.props.selectable !== "ignoreEvents") return;
					return !isEvent(_this2.containerRef.current, box);
				});
				selector.on("click", function(point) {
					return selectorClicksHandler(point, "click");
				});
				selector.on("doubleClick", function(point) {
					return selectorClicksHandler(point, "doubleClick");
				});
				selector.on("select", function(bounds) {
					_this2._selectSlot(_objectSpread$7(_objectSpread$7({}, _this2.state), {}, {
						action: "select",
						bounds
					}));
					_this2._initial = {};
					_this2.setState({ selecting: false });
					notify(_this2.props.onSelectEnd, [_this2.state]);
				});
			}
		},
		{
			key: "_teardownSelectable",
			value: function _teardownSelectable() {
				if (!this._selector) return;
				this._selector.teardown();
				this._selector = null;
			}
		},
		{
			key: "_selectSlot",
			value: function _selectSlot(_ref) {
				var endIdx = _ref.endIdx, startIdx = _ref.startIdx, action = _ref.action, bounds = _ref.bounds, box = _ref.box;
				if (endIdx !== -1 && startIdx !== -1) this.props.onSelectSlot && this.props.onSelectSlot({
					start: startIdx,
					end: endIdx,
					action,
					bounds,
					box,
					resourceId: this.props.resourceId
				});
			}
		}
	]);
}(import_react.Component);
BackgroundCells.propTypes = {};
var EventRowMixin = {
	propTypes: {
		slotMetrics: import_prop_types.default.object.isRequired,
		selected: import_prop_types.default.object,
		isAllDay: import_prop_types.default.bool,
		accessors: import_prop_types.default.object.isRequired,
		localizer: import_prop_types.default.object.isRequired,
		components: import_prop_types.default.object.isRequired,
		getters: import_prop_types.default.object.isRequired,
		onSelect: import_prop_types.default.func,
		onDoubleClick: import_prop_types.default.func,
		onKeyPress: import_prop_types.default.func
	},
	defaultProps: {
		segments: [],
		selected: {}
	},
	renderEvent: function renderEvent(props, event) {
		var selected = props.selected;
		props.isAllDay;
		var accessors = props.accessors, getters = props.getters, onSelect = props.onSelect, onDoubleClick = props.onDoubleClick, onKeyPress = props.onKeyPress, localizer = props.localizer, slotMetrics = props.slotMetrics, components = props.components, resizable = props.resizable;
		var continuesPrior = slotMetrics.continuesPrior(event);
		var continuesAfter = slotMetrics.continuesAfter(event);
		return /*#__PURE__*/ import_react.createElement(EventCell, {
			event,
			getters,
			localizer,
			accessors,
			components,
			onSelect,
			onDoubleClick,
			onKeyPress,
			continuesPrior,
			continuesAfter,
			slotStart: slotMetrics.first,
			slotEnd: slotMetrics.last,
			selected: isSelected(event, selected),
			resizable
		});
	},
	renderSpan: function renderSpan(slots, len, key) {
		var content = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ";
		var per = Math.abs(len) / slots * 100 + "%";
		return /*#__PURE__*/ import_react.createElement("div", {
			key,
			className: "rbc-row-segment",
			style: {
				WebkitFlexBasis: per,
				flexBasis: per,
				maxWidth: per
			}
		}, content);
	}
};
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _callSuper$c(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$c() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$c() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$c = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var EventRow = /*#__PURE__*/ function(_React$Component) {
	function EventRow() {
		_classCallCheck(this, EventRow);
		return _callSuper$c(this, EventRow, arguments);
	}
	_inherits(EventRow, _React$Component);
	return _createClass(EventRow, [{
		key: "render",
		value: function render() {
			var _this = this;
			var _this$props = this.props, segments = _this$props.segments, slots = _this$props.slotMetrics.slots, className = _this$props.className;
			var lastEnd = 1;
			return /*#__PURE__*/ import_react.createElement("div", { className: clsx(className, "rbc-row") }, segments.reduce(function(row, _ref, li) {
				var event = _ref.event, left = _ref.left, right = _ref.right, span = _ref.span;
				var key = "_lvl_" + li;
				var gap = left - lastEnd;
				var content = EventRowMixin.renderEvent(_this.props, event);
				if (gap) row.push(EventRowMixin.renderSpan(slots, gap, "".concat(key, "_gap")));
				row.push(EventRowMixin.renderSpan(slots, span, key, content));
				lastEnd = right + 1;
				return row;
			}, []));
		}
	}]);
}(import_react.Component);
EventRow.propTypes = {};
EventRow.defaultProps = _objectSpread$6({}, EventRowMixin.defaultProps);
function endOfRange(_ref) {
	var dateRange = _ref.dateRange, _ref$unit = _ref.unit, unit = _ref$unit === void 0 ? "day" : _ref$unit, localizer = _ref.localizer;
	return {
		first: dateRange[0],
		last: localizer.add(dateRange[dateRange.length - 1], 1, unit)
	};
}
function eventSegments(event, range, accessors, localizer) {
	var _endOfRange = endOfRange({
		dateRange: range,
		localizer
	}), first = _endOfRange.first, last = _endOfRange.last;
	var slots = localizer.diff(first, last, "day");
	var start = localizer.max(localizer.startOf(accessors.start(event), "day"), first);
	var end = localizer.min(localizer.ceil(accessors.end(event), "day"), last);
	var padding = (0, import_findIndex.default)(range, function(x) {
		return localizer.isSameDate(x, start);
	});
	var span = localizer.diff(start, end, "day");
	span = Math.min(span, slots);
	span = Math.max(span - localizer.segmentOffset, 1);
	return {
		event,
		span,
		left: padding + 1,
		right: Math.max(padding + span, 1)
	};
}
function eventLevels(rowSegments) {
	var limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Infinity;
	var i, j, seg, levels = [], extra = [];
	for (i = 0; i < rowSegments.length; i++) {
		seg = rowSegments[i];
		for (j = 0; j < levels.length; j++) if (!segsOverlap(seg, levels[j])) break;
		if (j >= limit) extra.push(seg);
		else (levels[j] || (levels[j] = [])).push(seg);
	}
	for (i = 0; i < levels.length; i++) levels[i].sort(function(a, b) {
		return a.left - b.left;
	});
	return {
		levels,
		extra
	};
}
function inRange(e, start, end, accessors, localizer) {
	var event = {
		start: accessors.start(e),
		end: accessors.end(e)
	};
	var range = {
		start,
		end
	};
	return localizer.inEventRange({
		event,
		range
	});
}
function segsOverlap(seg, otherSegs) {
	return otherSegs.some(function(otherSeg) {
		return otherSeg.left <= seg.right && otherSeg.right >= seg.left;
	});
}
function sortWeekEvents(events, accessors, localizer) {
	var base = _toConsumableArray(events);
	var multiDayEvents = [];
	var standardEvents = [];
	base.forEach(function(event) {
		var startCheck = accessors.start(event);
		var endCheck = accessors.end(event);
		if (localizer.daySpan(startCheck, endCheck) > 1) multiDayEvents.push(event);
		else standardEvents.push(event);
	});
	var multiSorted = multiDayEvents.sort(function(a, b) {
		return sortEvents(a, b, accessors, localizer);
	});
	var standardSorted = standardEvents.sort(function(a, b) {
		return sortEvents(a, b, accessors, localizer);
	});
	return [].concat(_toConsumableArray(multiSorted), _toConsumableArray(standardSorted));
}
function sortEvents(eventA, eventB, accessors, localizer) {
	var evtA = {
		start: accessors.start(eventA),
		end: accessors.end(eventA),
		allDay: accessors.allDay(eventA)
	};
	var evtB = {
		start: accessors.start(eventB),
		end: accessors.end(eventB),
		allDay: accessors.allDay(eventB)
	};
	return localizer.sortEvents({
		evtA,
		evtB
	});
}
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _callSuper$b(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$b() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$b() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$b = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var isSegmentInSlot$1 = function isSegmentInSlot(seg, slot) {
	return seg.left <= slot && seg.right >= slot;
};
var eventsInSlot = function eventsInSlot(segments, slot) {
	return segments.filter(function(seg) {
		return isSegmentInSlot$1(seg, slot);
	}).map(function(seg) {
		return seg.event;
	});
};
var EventEndingRow = /*#__PURE__*/ function(_React$Component) {
	function EventEndingRow() {
		_classCallCheck(this, EventEndingRow);
		return _callSuper$b(this, EventEndingRow, arguments);
	}
	_inherits(EventEndingRow, _React$Component);
	return _createClass(EventEndingRow, [
		{
			key: "render",
			value: function render() {
				var _this$props = this.props, segments = _this$props.segments, slots = _this$props.slotMetrics.slots;
				var rowSegments = eventLevels(segments).levels[0];
				var current = 1, lastEnd = 1, row = [];
				while (current <= slots) {
					var key = "_lvl_" + current;
					var _ref = rowSegments.filter(function(seg) {
						return isSegmentInSlot$1(seg, current);
					})[0] || {}, event = _ref.event, left = _ref.left, right = _ref.right, span = _ref.span;
					if (!event) {
						if (this.getHiddenEventsForSlot(segments, current).length > 0) {
							var _gap = current - lastEnd;
							if (_gap) row.push(EventRowMixin.renderSpan(slots, _gap, key + "_gap"));
							row.push(EventRowMixin.renderSpan(slots, 1, key, this.renderShowMore(segments, current)));
							lastEnd = current = current + 1;
							continue;
						}
						current++;
						continue;
					}
					var gap = Math.max(0, left - lastEnd);
					if (this.canRenderSlotEvent(left, span)) {
						var content = EventRowMixin.renderEvent(this.props, event);
						if (gap) row.push(EventRowMixin.renderSpan(slots, gap, key + "_gap"));
						row.push(EventRowMixin.renderSpan(slots, span, key, content));
						lastEnd = current = right + 1;
					} else {
						if (gap) row.push(EventRowMixin.renderSpan(slots, gap, key + "_gap"));
						row.push(EventRowMixin.renderSpan(slots, 1, key, this.renderShowMore(segments, current)));
						lastEnd = current = current + 1;
					}
				}
				return /*#__PURE__*/ import_react.createElement("div", { className: "rbc-row" }, row);
			}
		},
		{
			key: "getHiddenEventsForSlot",
			value: function getHiddenEventsForSlot(segments, slot) {
				var allEventsInSlot = eventsInSlot(segments, slot);
				var visibleEventsInSlot = eventLevels(segments).levels[0].filter(function(seg) {
					return isSegmentInSlot$1(seg, slot);
				}).map(function(seg) {
					return seg.event;
				});
				return allEventsInSlot.filter(function(event) {
					return !visibleEventsInSlot.some(function(visEvent) {
						return visEvent === event;
					});
				});
			}
		},
		{
			key: "canRenderSlotEvent",
			value: function canRenderSlotEvent(slot, span) {
				var segments = this.props.segments;
				return (0, import_range.default)(slot, slot + span).every(function(s) {
					return eventsInSlot(segments, s).length === 1;
				});
			}
		},
		{
			key: "renderShowMore",
			value: function renderShowMore(segments, slot) {
				var _this = this;
				var _this$props2 = this.props, localizer = _this$props2.localizer, slotMetrics = _this$props2.slotMetrics, components = _this$props2.components;
				var events = slotMetrics.getEventsForSlot(slot);
				var remainingEvents = eventsInSlot(segments, slot);
				var count = remainingEvents.length;
				if (components !== null && components !== void 0 && components.showMore) {
					var ShowMore = components.showMore;
					var slotDate = slotMetrics.getDateForSlot(slot - 1);
					return count ? /*#__PURE__*/ import_react.createElement(ShowMore, {
						localizer,
						slotDate,
						slot,
						count,
						events,
						remainingEvents
					}) : false;
				}
				return count ? /*#__PURE__*/ import_react.createElement("button", {
					type: "button",
					key: "sm_" + slot,
					className: clsx("rbc-button-link", "rbc-show-more"),
					onClick: function onClick(e) {
						return _this.showMore(slot, e);
					}
				}, localizer.messages.showMore(count, remainingEvents, events)) : false;
			}
		},
		{
			key: "showMore",
			value: function showMore(slot, e) {
				e.preventDefault();
				e.stopPropagation();
				this.props.onShowMore(slot, e.target);
			}
		}
	]);
}(import_react.Component);
EventEndingRow.propTypes = {};
EventEndingRow.defaultProps = _objectSpread$5({}, EventRowMixin.defaultProps);
var ScrollableWeekWrapper = function ScrollableWeekWrapper(_ref) {
	var children = _ref.children;
	return /*#__PURE__*/ import_react.createElement("div", { className: "rbc-row-content-scroll-container" }, children);
};
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
	return seg.left <= slot && seg.right >= slot;
};
var isEqual = function isEqual(a, b) {
	return a[0].range === b[0].range && a[0].events === b[0].events;
};
function getSlotMetrics$1() {
	return memoizeOne(function(options) {
		var range = options.range, events = options.events, maxRows = options.maxRows, minRows = options.minRows, accessors = options.accessors, localizer = options.localizer;
		var _endOfRange = endOfRange({
			dateRange: range,
			localizer
		}), first = _endOfRange.first, last = _endOfRange.last;
		var segments = events.map(function(evt) {
			return eventSegments(evt, range, accessors, localizer);
		});
		var _eventLevels = eventLevels(segments, Math.max(maxRows - 1, 1)), levels = _eventLevels.levels, extra = _eventLevels.extra;
		var minEventRows = extra.length > 0 ? minRows - 1 : minRows;
		while (levels.length < minEventRows) levels.push([]);
		return {
			first,
			last,
			levels,
			extra,
			range,
			slots: range.length,
			clone: function clone(args) {
				return getSlotMetrics$1()(_objectSpread$4(_objectSpread$4({}, options), args));
			},
			getDateForSlot: function getDateForSlot(slotNumber) {
				return range[slotNumber];
			},
			getSlotForDate: function getSlotForDate(date) {
				return range.find(function(r) {
					return localizer.isSameDate(r, date);
				});
			},
			getEventsForSlot: function getEventsForSlot(slot) {
				return segments.filter(function(seg) {
					return isSegmentInSlot(seg, slot);
				}).map(function(seg) {
					return seg.event;
				});
			},
			continuesPrior: function continuesPrior(event) {
				return localizer.continuesPrior(accessors.start(event), first);
			},
			continuesAfter: function continuesAfter(event) {
				var start = accessors.start(event);
				var end = accessors.end(event);
				return localizer.continuesAfter(start, end, last);
			}
		};
	}, isEqual);
}
function _callSuper$a(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$a() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$a() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$a = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var DateContentRow = /*#__PURE__*/ function(_React$Component) {
	function DateContentRow() {
		var _this;
		_classCallCheck(this, DateContentRow);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper$a(this, DateContentRow, [].concat(args));
		_this.handleSelectSlot = function(slot) {
			var _this$props = _this.props, range = _this$props.range, onSelectSlot = _this$props.onSelectSlot;
			onSelectSlot(range.slice(slot.start, slot.end + 1), slot);
		};
		_this.handleShowMore = function(slot, target) {
			var _this$props2 = _this.props, range = _this$props2.range, onShowMore = _this$props2.onShowMore;
			var metrics = _this.slotMetrics(_this.props);
			var row = qsa(_this.containerRef.current, ".rbc-row-bg")[0];
			var cell;
			if (row) cell = row.children[slot - 1];
			onShowMore(metrics.getEventsForSlot(slot), range[slot - 1], cell, slot, target);
		};
		_this.getContainer = function() {
			var container = _this.props.container;
			return container ? container() : _this.containerRef.current;
		};
		_this.renderHeadingCell = function(date, index) {
			var _this$props3 = _this.props, renderHeader = _this$props3.renderHeader, getNow = _this$props3.getNow, localizer = _this$props3.localizer;
			return renderHeader({
				date,
				key: "header_".concat(index),
				className: clsx("rbc-date-cell", localizer.isSameDate(date, getNow()) && "rbc-now")
			});
		};
		_this.renderDummy = function() {
			var _this$props4 = _this.props, className = _this$props4.className, range = _this$props4.range, renderHeader = _this$props4.renderHeader, showAllEvents = _this$props4.showAllEvents;
			return /*#__PURE__*/ import_react.createElement("div", {
				className,
				ref: _this.containerRef
			}, /*#__PURE__*/ import_react.createElement("div", { className: clsx("rbc-row-content", showAllEvents && "rbc-row-content-scrollable") }, renderHeader && /*#__PURE__*/ import_react.createElement("div", {
				className: "rbc-row",
				ref: _this.headingRowRef
			}, range.map(_this.renderHeadingCell)), /*#__PURE__*/ import_react.createElement("div", {
				className: "rbc-row",
				ref: _this.eventRowRef
			}, /*#__PURE__*/ import_react.createElement("div", { className: "rbc-row-segment" }, /*#__PURE__*/ import_react.createElement("div", { className: "rbc-event" }, /*#__PURE__*/ import_react.createElement("div", { className: "rbc-event-content" }, "\xA0"))))));
		};
		_this.containerRef = /*#__PURE__*/ (0, import_react.createRef)();
		_this.headingRowRef = /*#__PURE__*/ (0, import_react.createRef)();
		_this.eventRowRef = /*#__PURE__*/ (0, import_react.createRef)();
		_this.slotMetrics = getSlotMetrics$1();
		return _this;
	}
	_inherits(DateContentRow, _React$Component);
	return _createClass(DateContentRow, [{
		key: "getRowLimit",
		value: function getRowLimit() {
			var _this$headingRowRef;
			var eventHeight = height(this.eventRowRef.current);
			var headingHeight = (_this$headingRowRef = this.headingRowRef) !== null && _this$headingRowRef !== void 0 && _this$headingRowRef.current ? height(this.headingRowRef.current) : 0;
			var eventSpace = height(this.containerRef.current) - headingHeight;
			return Math.max(Math.floor(eventSpace / eventHeight), 1);
		}
	}, {
		key: "render",
		value: function render() {
			var _this$props5 = this.props, date = _this$props5.date, rtl = _this$props5.rtl, range = _this$props5.range, className = _this$props5.className, selected = _this$props5.selected, selectable = _this$props5.selectable, renderForMeasure = _this$props5.renderForMeasure, accessors = _this$props5.accessors, getters = _this$props5.getters, components = _this$props5.components, getNow = _this$props5.getNow, renderHeader = _this$props5.renderHeader, onSelect = _this$props5.onSelect, localizer = _this$props5.localizer, onSelectStart = _this$props5.onSelectStart, onSelectEnd = _this$props5.onSelectEnd, onDoubleClick = _this$props5.onDoubleClick, onKeyPress = _this$props5.onKeyPress, resourceId = _this$props5.resourceId, longPressThreshold = _this$props5.longPressThreshold, isAllDay = _this$props5.isAllDay, resizable = _this$props5.resizable, showAllEvents = _this$props5.showAllEvents;
			if (renderForMeasure) return this.renderDummy();
			var metrics = this.slotMetrics(this.props);
			var levels = metrics.levels, extra = metrics.extra;
			var ScrollableWeekComponent = showAllEvents ? ScrollableWeekWrapper : NoopWrapper;
			var WeekWrapper = components.weekWrapper;
			var eventRowProps = {
				selected,
				accessors,
				getters,
				localizer,
				components,
				onSelect,
				onDoubleClick,
				onKeyPress,
				resourceId,
				slotMetrics: metrics,
				resizable
			};
			return /*#__PURE__*/ import_react.createElement("div", {
				className,
				role: "rowgroup",
				ref: this.containerRef
			}, /*#__PURE__*/ import_react.createElement(BackgroundCells, {
				localizer,
				date,
				getNow,
				rtl,
				range,
				selectable,
				container: this.getContainer,
				getters,
				onSelectStart,
				onSelectEnd,
				onSelectSlot: this.handleSelectSlot,
				components,
				longPressThreshold,
				resourceId
			}), /*#__PURE__*/ import_react.createElement("div", {
				className: clsx("rbc-row-content", showAllEvents && "rbc-row-content-scrollable"),
				role: "row"
			}, renderHeader && /*#__PURE__*/ import_react.createElement("div", {
				className: "rbc-row ",
				ref: this.headingRowRef
			}, range.map(this.renderHeadingCell)), /*#__PURE__*/ import_react.createElement(ScrollableWeekComponent, null, /*#__PURE__*/ import_react.createElement(WeekWrapper, _extends({ isAllDay }, eventRowProps, { rtl: this.props.rtl }), levels.map(function(segs, idx) {
				return /*#__PURE__*/ import_react.createElement(EventRow, _extends({
					key: idx,
					segments: segs
				}, eventRowProps));
			}), !!extra.length && /*#__PURE__*/ import_react.createElement(EventEndingRow, _extends({
				segments: extra,
				onShowMore: this.handleShowMore
			}, eventRowProps))))));
		}
	}]);
}(import_react.Component);
DateContentRow.propTypes = {};
DateContentRow.defaultProps = {
	minRows: 0,
	maxRows: Infinity
};
var Header = function Header(_ref) {
	var label = _ref.label;
	return /*#__PURE__*/ import_react.createElement("span", {
		role: "columnheader",
		"aria-sort": "none"
	}, label);
};
Header.propTypes = {};
var DateHeader = function DateHeader(_ref) {
	var label = _ref.label, drilldownView = _ref.drilldownView, onDrillDown = _ref.onDrillDown;
	if (!drilldownView) return /*#__PURE__*/ import_react.createElement("span", null, label);
	return /*#__PURE__*/ import_react.createElement("button", {
		type: "button",
		className: "rbc-button-link",
		onClick: onDrillDown
	}, label);
};
DateHeader.propTypes = {};
var _excluded$6 = ["date", "className"];
function _callSuper$9(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$9() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$9() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$9 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var eventsForWeek = function eventsForWeek(evts, start, end, accessors, localizer) {
	return evts.filter(function(e) {
		return inRange(e, start, end, accessors, localizer);
	});
};
var MonthView = /*#__PURE__*/ function(_React$Component) {
	function MonthView() {
		var _this;
		_classCallCheck(this, MonthView);
		for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) _args[_key] = arguments[_key];
		_this = _callSuper$9(this, MonthView, [].concat(_args));
		_this.getContainer = function() {
			return _this.containerRef.current;
		};
		_this.renderWeek = function(week, weekIdx) {
			var _this$props = _this.props, events = _this$props.events, components = _this$props.components, selectable = _this$props.selectable, getNow = _this$props.getNow, selected = _this$props.selected, date = _this$props.date, localizer = _this$props.localizer, longPressThreshold = _this$props.longPressThreshold, accessors = _this$props.accessors, getters = _this$props.getters, showAllEvents = _this$props.showAllEvents;
			var _this$state = _this.state, needLimitMeasure = _this$state.needLimitMeasure, rowLimit = _this$state.rowLimit;
			var sorted = sortWeekEvents(eventsForWeek(_toConsumableArray(events), week[0], week[week.length - 1], accessors, localizer), accessors, localizer);
			return /*#__PURE__*/ import_react.createElement(DateContentRow, {
				key: weekIdx,
				ref: weekIdx === 0 ? _this.slotRowRef : void 0,
				container: _this.getContainer,
				className: "rbc-month-row",
				getNow,
				date,
				range: week,
				events: sorted,
				maxRows: showAllEvents ? Infinity : rowLimit,
				selected,
				selectable,
				components,
				accessors,
				getters,
				localizer,
				renderHeader: _this.readerDateHeading,
				renderForMeasure: needLimitMeasure,
				onShowMore: _this.handleShowMore,
				onSelect: _this.handleSelectEvent,
				onDoubleClick: _this.handleDoubleClickEvent,
				onKeyPress: _this.handleKeyPressEvent,
				onSelectSlot: _this.handleSelectSlot,
				longPressThreshold,
				rtl: _this.props.rtl,
				resizable: _this.props.resizable,
				showAllEvents
			});
		};
		_this.readerDateHeading = function(_ref) {
			var date = _ref.date, className = _ref.className, props = _objectWithoutProperties(_ref, _excluded$6);
			var _this$props2 = _this.props, currentDate = _this$props2.date, getDrilldownView = _this$props2.getDrilldownView, localizer = _this$props2.localizer;
			var isOffRange = localizer.neq(currentDate, date, "month");
			var isCurrent = localizer.isSameDate(date, currentDate);
			var drilldownView = getDrilldownView(date);
			var label = localizer.format(date, "dateFormat");
			var DateHeaderComponent = _this.props.components.dateHeader || DateHeader;
			return /*#__PURE__*/ import_react.createElement("div", _extends({}, props, {
				className: clsx(className, isOffRange && "rbc-off-range", isCurrent && "rbc-current"),
				role: "cell"
			}), /*#__PURE__*/ import_react.createElement(DateHeaderComponent, {
				label,
				date,
				drilldownView,
				isOffRange,
				onDrillDown: function onDrillDown(e) {
					return _this.handleHeadingClick(date, drilldownView, e);
				}
			}));
		};
		_this.handleSelectSlot = function(range, slotInfo) {
			_this._pendingSelection = _this._pendingSelection.concat(range);
			clearTimeout(_this._selectTimer);
			_this._selectTimer = setTimeout(function() {
				return _this.selectDates(slotInfo);
			});
		};
		_this.handleHeadingClick = function(date, view, e) {
			e.preventDefault();
			_this.clearSelection();
			notify(_this.props.onDrillDown, [date, view]);
		};
		_this.handleSelectEvent = function() {
			_this.clearSelection();
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
			notify(_this.props.onSelectEvent, args);
		};
		_this.handleDoubleClickEvent = function() {
			_this.clearSelection();
			for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
			notify(_this.props.onDoubleClickEvent, args);
		};
		_this.handleKeyPressEvent = function() {
			_this.clearSelection();
			for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
			notify(_this.props.onKeyPressEvent, args);
		};
		_this.handleShowMore = function(events, date, cell, slot, target) {
			var _this$props3 = _this.props, popup = _this$props3.popup, onDrillDown = _this$props3.onDrillDown, onShowMore = _this$props3.onShowMore, getDrilldownView = _this$props3.getDrilldownView, doShowMoreDrillDown = _this$props3.doShowMoreDrillDown;
			_this.clearSelection();
			if (popup) {
				var position$1 = position(cell, _this.containerRef.current);
				_this.setState({ overlay: {
					date,
					events,
					position: position$1,
					target
				} });
			} else if (doShowMoreDrillDown) notify(onDrillDown, [date, getDrilldownView(date) || views$1.DAY]);
			notify(onShowMore, [
				events,
				date,
				slot
			]);
		};
		_this.overlayDisplay = function() {
			_this.setState({ overlay: null });
		};
		_this.state = {
			rowLimit: 5,
			needLimitMeasure: true,
			date: null
		};
		_this.containerRef = /*#__PURE__*/ (0, import_react.createRef)();
		_this.slotRowRef = /*#__PURE__*/ (0, import_react.createRef)();
		_this._bgRows = [];
		_this._pendingSelection = [];
		return _this;
	}
	_inherits(MonthView, _React$Component);
	return _createClass(MonthView, [
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				var _this2 = this;
				var running;
				if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
				window.addEventListener("resize", this._resizeListener = function() {
					if (!running) request(function() {
						running = false;
						_this2.setState({ needLimitMeasure: true });
					});
				}, false);
			}
		},
		{
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				if (this.state.needLimitMeasure) this.measureRowLimit(this.props);
			}
		},
		{
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				window.removeEventListener("resize", this._resizeListener, false);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props4 = this.props, date = _this$props4.date, localizer = _this$props4.localizer, className = _this$props4.className, weeks = (0, import_chunk.default)(localizer.visibleDays(date, localizer), 7);
				this._weekCount = weeks.length;
				return /*#__PURE__*/ import_react.createElement("div", {
					className: clsx("rbc-month-view", className),
					role: "table",
					"aria-label": "Month View",
					ref: this.containerRef
				}, /*#__PURE__*/ import_react.createElement("div", {
					className: "rbc-row rbc-month-header",
					role: "row"
				}, this.renderHeaders(weeks[0])), weeks.map(this.renderWeek), this.props.popup && this.renderOverlay());
			}
		},
		{
			key: "renderHeaders",
			value: function renderHeaders(row) {
				var _this$props5 = this.props, localizer = _this$props5.localizer, components = _this$props5.components;
				var first = row[0];
				var last = row[row.length - 1];
				var HeaderComponent = components.header || Header;
				return localizer.range(first, last, "day").map(function(day, idx) {
					return /*#__PURE__*/ import_react.createElement("div", {
						key: "header_" + idx,
						className: "rbc-header"
					}, /*#__PURE__*/ import_react.createElement(HeaderComponent, {
						date: day,
						localizer,
						label: localizer.format(day, "weekdayFormat")
					}));
				});
			}
		},
		{
			key: "renderOverlay",
			value: function renderOverlay() {
				var _this$state$overlay, _this$state2, _this3 = this;
				var overlay = (_this$state$overlay = (_this$state2 = this.state) === null || _this$state2 === void 0 ? void 0 : _this$state2.overlay) !== null && _this$state$overlay !== void 0 ? _this$state$overlay : {};
				var _this$props6 = this.props, accessors = _this$props6.accessors, localizer = _this$props6.localizer, components = _this$props6.components, getters = _this$props6.getters, selected = _this$props6.selected, popupOffset = _this$props6.popupOffset, handleDragStart = _this$props6.handleDragStart;
				return /*#__PURE__*/ import_react.createElement(PopOverlay, {
					overlay,
					accessors,
					localizer,
					components,
					getters,
					selected,
					popupOffset,
					ref: this.containerRef,
					handleKeyPressEvent: this.handleKeyPressEvent,
					handleSelectEvent: this.handleSelectEvent,
					handleDoubleClickEvent: this.handleDoubleClickEvent,
					handleDragStart,
					show: !!overlay.position,
					overlayDisplay: this.overlayDisplay,
					onHide: function onHide() {
						return _this3.setState({ overlay: null });
					}
				});
			}
		},
		{
			key: "measureRowLimit",
			value: function measureRowLimit() {
				this.setState({
					needLimitMeasure: false,
					rowLimit: this.slotRowRef.current.getRowLimit()
				});
			}
		},
		{
			key: "selectDates",
			value: function selectDates(slotInfo) {
				var slots = this._pendingSelection.slice();
				this._pendingSelection = [];
				slots.sort(function(a, b) {
					return +a - +b;
				});
				var start = new Date(slots[0]);
				var end = new Date(slots[slots.length - 1]);
				end.setDate(slots[slots.length - 1].getDate() + 1);
				notify(this.props.onSelectSlot, {
					slots,
					start,
					end,
					action: slotInfo.action,
					bounds: slotInfo.bounds,
					box: slotInfo.box
				});
			}
		},
		{
			key: "clearSelection",
			value: function clearSelection() {
				clearTimeout(this._selectTimer);
				this._pendingSelection = [];
			}
		}
	], [{
		key: "getDerivedStateFromProps",
		value: function getDerivedStateFromProps(_ref2, state) {
			var date = _ref2.date, localizer = _ref2.localizer;
			return {
				date,
				needLimitMeasure: state.needLimitMeasure || localizer.neq(date, state.date, "month")
			};
		}
	}]);
}(import_react.Component);
MonthView.propTypes = {};
MonthView.range = function(date, _ref3) {
	var localizer = _ref3.localizer;
	return {
		start: localizer.firstVisibleDay(date, localizer),
		end: localizer.lastVisibleDay(date, localizer)
	};
};
MonthView.navigate = function(date, action, _ref4) {
	var localizer = _ref4.localizer;
	switch (action) {
		case navigate.PREVIOUS: return localizer.add(date, -1, "month");
		case navigate.NEXT: return localizer.add(date, 1, "month");
		default: return date;
	}
};
MonthView.title = function(date, _ref5) {
	return _ref5.localizer.format(date, "monthHeaderFormat");
};
var getKey = function getKey(_ref) {
	var min = _ref.min, max = _ref.max, step = _ref.step, slots = _ref.slots, localizer = _ref.localizer;
	return "".concat(+localizer.startOf(min, "minutes")) + "".concat(+localizer.startOf(max, "minutes")) + "".concat(step, "-").concat(slots);
};
function getSlotMetrics(_ref2) {
	var start = _ref2.min, end = _ref2.max, step = _ref2.step, timeslots = _ref2.timeslots, localizer = _ref2.localizer;
	var key = getKey({
		step,
		localizer
	});
	var totalMin = 1 + localizer.getTotalMin(start, end);
	var minutesFromMidnight = localizer.getMinutesFromMidnight(start);
	var numGroups = Math.ceil((totalMin - 1) / (step * timeslots));
	var numSlots = numGroups * timeslots;
	var groups = new Array(numGroups);
	var slots = new Array(numSlots);
	for (var grp = 0; grp < numGroups; grp++) {
		groups[grp] = new Array(timeslots);
		for (var slot = 0; slot < timeslots; slot++) {
			var slotIdx = grp * timeslots + slot;
			var minFromStart = slotIdx * step;
			slots[slotIdx] = groups[grp][slot] = localizer.getSlotDate(start, minutesFromMidnight, minFromStart);
		}
	}
	var lastSlotMinFromStart = slots.length * step;
	slots.push(localizer.getSlotDate(start, minutesFromMidnight, lastSlotMinFromStart));
	function positionFromDate(date) {
		var diff = localizer.diff(start, date, "minutes") + localizer.getDstOffset(start, date);
		return Math.min(diff, totalMin);
	}
	return {
		groups,
		update: function update(args) {
			if (getKey(args) !== key) return getSlotMetrics(args);
			return this;
		},
		dateIsInGroup: function dateIsInGroup(date, groupIndex) {
			var nextGroup = groups[groupIndex + 1];
			return localizer.inRange(date, groups[groupIndex][0], nextGroup ? nextGroup[0] : end, "minutes");
		},
		nextSlot: function nextSlot(slot) {
			var next = slots[Math.min(slots.findIndex(function(s) {
				return s === slot || localizer.eq(s, slot);
			}) + 1, slots.length - 1)];
			if (localizer.eq(next, slot)) next = localizer.add(slot, step, "minutes");
			return next;
		},
		closestSlotToPosition: function closestSlotToPosition(percent) {
			return slots[Math.min(slots.length - 1, Math.max(0, Math.floor(percent * numSlots)))];
		},
		closestSlotFromPoint: function closestSlotFromPoint(point, boundaryRect) {
			var range = Math.abs(boundaryRect.top - boundaryRect.bottom);
			return this.closestSlotToPosition((point.y - boundaryRect.top) / range);
		},
		closestSlotFromDate: function closestSlotFromDate(date) {
			var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
			if (localizer.lt(date, start, "minutes")) return slots[0];
			if (localizer.gt(date, end, "minutes")) return slots[slots.length - 1];
			var diffMins = localizer.diff(start, date, "minutes");
			return slots[(diffMins - diffMins % step) / step + offset];
		},
		startsBeforeDay: function startsBeforeDay(date) {
			return localizer.lt(date, start, "day");
		},
		startsAfterDay: function startsAfterDay(date) {
			return localizer.gt(date, end, "day");
		},
		startsBefore: function startsBefore(date) {
			return localizer.lt(localizer.merge(start, date), start, "minutes");
		},
		startsAfter: function startsAfter(date) {
			return localizer.gt(localizer.merge(end, date), end, "minutes");
		},
		getRange: function getRange(rangeStart, rangeEnd, ignoreMin, ignoreMax) {
			if (!ignoreMin) rangeStart = localizer.min(end, localizer.max(start, rangeStart));
			if (!ignoreMax) rangeEnd = localizer.min(end, localizer.max(start, rangeEnd));
			var rangeStartMin = positionFromDate(rangeStart);
			var rangeEndMin = positionFromDate(rangeEnd);
			var top = rangeEndMin > step * numSlots && !localizer.eq(end, rangeEnd) ? (rangeStartMin - step) / (step * numSlots) * 100 : rangeStartMin / (step * numSlots) * 100;
			return {
				top,
				height: rangeEndMin / (step * numSlots) * 100 - top,
				start: positionFromDate(rangeStart),
				startDate: rangeStart,
				end: positionFromDate(rangeEnd),
				endDate: rangeEnd
			};
		},
		getCurrentTimePosition: function getCurrentTimePosition(rangeStart) {
			return positionFromDate(rangeStart) / (step * numSlots) * 100;
		}
	};
}
var Event = /*#__PURE__*/ function() {
	function Event(data, _ref) {
		var accessors = _ref.accessors, slotMetrics = _ref.slotMetrics;
		_classCallCheck(this, Event);
		var _slotMetrics$getRange = slotMetrics.getRange(accessors.start(data), accessors.end(data)), start = _slotMetrics$getRange.start, startDate = _slotMetrics$getRange.startDate, end = _slotMetrics$getRange.end, endDate = _slotMetrics$getRange.endDate, top = _slotMetrics$getRange.top, height = _slotMetrics$getRange.height;
		this.start = start;
		this.end = end;
		this.startMs = +startDate;
		this.endMs = +endDate;
		this.top = top;
		this.height = height;
		this.data = data;
	}
	/**
	* The event's width without any overlap.
	*/
	return _createClass(Event, [
		{
			key: "_width",
			get: function get() {
				if (this.rows) return 100 / (this.rows.reduce(function(max, row) {
					return Math.max(max, row.leaves.length + 1);
				}, 0) + 1);
				if (this.leaves) return (100 - this.container._width) / (this.leaves.length + 1);
				return this.row._width;
			}
		},
		{
			key: "width",
			get: function get() {
				var noOverlap = this._width;
				var overlap = Math.min(100, this._width * 1.7);
				if (this.rows) return overlap;
				if (this.leaves) return this.leaves.length > 0 ? overlap : noOverlap;
				var leaves = this.row.leaves;
				return leaves.indexOf(this) === leaves.length - 1 ? noOverlap : overlap;
			}
		},
		{
			key: "xOffset",
			get: function get() {
				if (this.rows) return 0;
				if (this.leaves) return this.container._width;
				var _this$row = this.row, leaves = _this$row.leaves, xOffset = _this$row.xOffset, _width = _this$row._width;
				return xOffset + (leaves.indexOf(this) + 1) * _width;
			}
		}
	]);
}();
/**
* Return true if event a and b is considered to be on the same row.
*/
function onSameRow(a, b, minimumStartDifference) {
	return Math.abs(b.start - a.start) < minimumStartDifference || b.start > a.start && b.start < a.end;
}
function sortByRender(events) {
	var sortedByTime = (0, import_sortBy.default)(events, ["startMs", function(e) {
		return -e.endMs;
	}]);
	var sorted = [];
	while (sortedByTime.length > 0) {
		var event = sortedByTime.shift();
		sorted.push(event);
		for (var i = 0; i < sortedByTime.length; i++) {
			var test = sortedByTime[i];
			if (event.endMs > test.startMs) continue;
			if (i > 0) {
				var _event = sortedByTime.splice(i, 1)[0];
				sorted.push(_event);
			}
			break;
		}
	}
	return sorted;
}
function getStyledEvents$1(_ref2) {
	var events = _ref2.events, minimumStartDifference = _ref2.minimumStartDifference, slotMetrics = _ref2.slotMetrics, accessors = _ref2.accessors;
	var eventsInRenderOrder = sortByRender(events.map(function(event) {
		return new Event(event, {
			slotMetrics,
			accessors
		});
	}));
	var containerEvents = [];
	var _loop = function _loop() {
		var event = eventsInRenderOrder[i];
		var container = containerEvents.find(function(c) {
			return c.end > event.start || Math.abs(event.start - c.start) < minimumStartDifference;
		});
		if (!container) {
			event.rows = [];
			containerEvents.push(event);
			return 1;
		}
		event.container = container;
		var row = null;
		for (var j = container.rows.length - 1; !row && j >= 0; j--) if (onSameRow(container.rows[j], event, minimumStartDifference)) row = container.rows[j];
		if (row) {
			row.leaves.push(event);
			event.row = row;
		} else {
			event.leaves = [];
			container.rows.push(event);
		}
	};
	for (var i = 0; i < eventsInRenderOrder.length; i++) if (_loop()) continue;
	return eventsInRenderOrder.map(function(event) {
		return {
			event: event.data,
			style: {
				top: event.top,
				height: event.height,
				width: event.width,
				xOffset: Math.max(0, event.xOffset)
			}
		};
	});
}
function getMaxIdxDFS(node, maxIdx, visited) {
	for (var i = 0; i < node.friends.length; ++i) {
		if (visited.indexOf(node.friends[i]) > -1) continue;
		maxIdx = maxIdx > node.friends[i].idx ? maxIdx : node.friends[i].idx;
		visited.push(node.friends[i]);
		var newIdx = getMaxIdxDFS(node.friends[i], maxIdx, visited);
		maxIdx = maxIdx > newIdx ? maxIdx : newIdx;
	}
	return maxIdx;
}
function noOverlap(_ref) {
	var events = _ref.events, minimumStartDifference = _ref.minimumStartDifference, slotMetrics = _ref.slotMetrics, accessors = _ref.accessors;
	var styledEvents = getStyledEvents$1({
		events,
		minimumStartDifference,
		slotMetrics,
		accessors
	});
	styledEvents.sort(function(a, b) {
		a = a.style;
		b = b.style;
		if (a.top !== b.top) return a.top > b.top ? 1 : -1;
		else if (a.height !== b.height) return a.top + a.height < b.top + b.height ? 1 : -1;
		else return 0;
	});
	for (var i = 0; i < styledEvents.length; ++i) {
		styledEvents[i].friends = [];
		delete styledEvents[i].style.left;
		delete styledEvents[i].style.left;
		delete styledEvents[i].idx;
		delete styledEvents[i].size;
	}
	for (var _i = 0; _i < styledEvents.length - 1; ++_i) {
		var se1 = styledEvents[_i];
		var y1 = se1.style.top;
		var y2 = se1.style.top + se1.style.height;
		for (var j = _i + 1; j < styledEvents.length; ++j) {
			var se2 = styledEvents[j];
			var y3 = se2.style.top;
			var y4 = se2.style.top + se2.style.height;
			if (y3 >= y1 && y4 <= y2 || y4 > y1 && y4 <= y2 || y3 >= y1 && y3 < y2) {
				se1.friends.push(se2);
				se2.friends.push(se1);
			}
		}
	}
	for (var _i2 = 0; _i2 < styledEvents.length; ++_i2) {
		var se = styledEvents[_i2];
		var bitmap = [];
		for (var _j = 0; _j < 100; ++_j) bitmap.push(1);
		for (var _j2 = 0; _j2 < se.friends.length; ++_j2) if (se.friends[_j2].idx !== void 0) bitmap[se.friends[_j2].idx] = 0;
		se.idx = bitmap.indexOf(1);
	}
	for (var _i3 = 0; _i3 < styledEvents.length; ++_i3) {
		var size = 0;
		if (styledEvents[_i3].size) continue;
		var allFriends = [];
		size = 100 / (getMaxIdxDFS(styledEvents[_i3], 0, allFriends) + 1);
		styledEvents[_i3].size = size;
		for (var _j3 = 0; _j3 < allFriends.length; ++_j3) allFriends[_j3].size = size;
	}
	for (var _i4 = 0; _i4 < styledEvents.length; ++_i4) {
		var e = styledEvents[_i4];
		e.style.left = e.idx * e.size;
		var _maxIdx = 0;
		for (var _j4 = 0; _j4 < e.friends.length; ++_j4) {
			var idx = e.friends[_j4].idx;
			_maxIdx = _maxIdx > idx ? _maxIdx : idx;
		}
		if (_maxIdx <= e.idx) e.size = 100 - e.idx * e.size;
		var padding = e.idx === 0 ? 0 : 3;
		e.style.width = "calc(".concat(e.size, "% - ").concat(padding, "px)");
		e.style.height = "calc(".concat(e.style.height, "% - 2px)");
		e.style.xOffset = "calc(".concat(e.style.left, "% + ").concat(padding, "px)");
	}
	return styledEvents;
}
var DefaultAlgorithms = {
	overlap: getStyledEvents$1,
	"no-overlap": noOverlap
};
function isFunction(a) {
	return !!(a && a.constructor && a.call && a.apply);
}
function getStyledEvents(_ref) {
	_ref.events;
	_ref.minimumStartDifference;
	_ref.slotMetrics;
	_ref.accessors;
	var dayLayoutAlgorithm = _ref.dayLayoutAlgorithm;
	var algorithm = dayLayoutAlgorithm;
	if (dayLayoutAlgorithm in DefaultAlgorithms) algorithm = DefaultAlgorithms[dayLayoutAlgorithm];
	if (!isFunction(algorithm)) return [];
	return algorithm.apply(this, arguments);
}
function _callSuper$8(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$8() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$8() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$8 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var TimeSlotGroup = /*#__PURE__*/ function(_Component) {
	function TimeSlotGroup() {
		_classCallCheck(this, TimeSlotGroup);
		return _callSuper$8(this, TimeSlotGroup, arguments);
	}
	_inherits(TimeSlotGroup, _Component);
	return _createClass(TimeSlotGroup, [{
		key: "render",
		value: function render() {
			var _this$props = this.props, renderSlot = _this$props.renderSlot, resource = _this$props.resource, group = _this$props.group, getters = _this$props.getters, _this$props$component = _this$props.components, _this$props$component3 = (_this$props$component === void 0 ? {} : _this$props$component).timeSlotWrapper, Wrapper = _this$props$component3 === void 0 ? NoopWrapper : _this$props$component3;
			var groupProps = getters ? getters.slotGroupProp(group) : {};
			return /*#__PURE__*/ import_react.createElement("div", _extends({ className: "rbc-timeslot-group" }, groupProps), group.map(function(value, idx) {
				var slotProps = getters ? getters.slotProp(value, resource) : {};
				return /*#__PURE__*/ import_react.createElement(Wrapper, {
					key: idx,
					value,
					resource
				}, /*#__PURE__*/ import_react.createElement("div", _extends({}, slotProps, { className: clsx("rbc-time-slot", slotProps.className) }), renderSlot && renderSlot(value, idx)));
			}));
		}
	}]);
}(import_react.Component);
TimeSlotGroup.propTypes = {};
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function stringifyPercent(v) {
	return typeof v === "string" ? v : v + "%";
}
function TimeGridEvent(props) {
	var style = props.style, className = props.className, event = props.event, accessors = props.accessors, rtl = props.rtl, selected = props.selected, label = props.label, continuesPrior = props.continuesPrior, continuesAfter = props.continuesAfter, getters = props.getters, onClick = props.onClick, onDoubleClick = props.onDoubleClick, isBackgroundEvent = props.isBackgroundEvent, onKeyPress = props.onKeyPress, _props$components = props.components, Event = _props$components.event, EventWrapper = _props$components.eventWrapper;
	var title = accessors.title(event);
	var tooltip = accessors.tooltip(event);
	var end = accessors.end(event);
	var start = accessors.start(event);
	var userProps = getters.eventProp(event, start, end, selected);
	var inner = [/*#__PURE__*/ import_react.createElement("div", {
		key: "1",
		className: "rbc-event-label"
	}, label), /*#__PURE__*/ import_react.createElement("div", {
		key: "2",
		className: "rbc-event-content"
	}, Event ? /*#__PURE__*/ import_react.createElement(Event, {
		event,
		title
	}) : title)];
	var height = style.height, top = style.top, width = style.width, xOffset = style.xOffset;
	var eventStyle = _objectSpread$3(_objectSpread$3({}, userProps.style), {}, _defineProperty({
		top: stringifyPercent(top),
		height: stringifyPercent(height),
		width: stringifyPercent(width)
	}, rtl ? "right" : "left", stringifyPercent(xOffset)));
	return /*#__PURE__*/ import_react.createElement(EventWrapper, _extends({ type: "time" }, props), /*#__PURE__*/ import_react.createElement("div", {
		role: "button",
		tabIndex: 0,
		onClick,
		onDoubleClick,
		style: eventStyle,
		onKeyDown: onKeyPress,
		title: tooltip ? (typeof label === "string" ? label + ": " : "") + tooltip : void 0,
		className: clsx(isBackgroundEvent ? "rbc-background-event" : "rbc-event", className, userProps.className, {
			"rbc-selected": selected,
			"rbc-event-continues-earlier": continuesPrior,
			"rbc-event-continues-later": continuesAfter
		})
	}, inner));
}
var DayColumnWrapper = function DayColumnWrapper(_ref) {
	var children = _ref.children, className = _ref.className, style = _ref.style, innerRef = _ref.innerRef;
	return /*#__PURE__*/ import_react.createElement("div", {
		className,
		style,
		ref: innerRef
	}, children);
};
var DayColumnWrapper$1 = /*#__PURE__*/ import_react.forwardRef(function(props, ref) {
	return /*#__PURE__*/ import_react.createElement(DayColumnWrapper, _extends({}, props, { innerRef: ref }));
});
var _excluded$5 = ["dayProp"];
var _excluded2$1 = ["eventContainerWrapper", "timeIndicatorWrapper"];
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _callSuper$7(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$7() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$7() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$7 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var DayColumn = /*#__PURE__*/ function(_React$Component) {
	function DayColumn() {
		var _this;
		_classCallCheck(this, DayColumn);
		for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) _args[_key] = arguments[_key];
		_this = _callSuper$7(this, DayColumn, [].concat(_args));
		_this.state = {
			selecting: false,
			timeIndicatorPosition: null
		};
		_this.intervalTriggered = false;
		_this.renderEvents = function(_ref) {
			var events = _ref.events, isBackgroundEvent = _ref.isBackgroundEvent;
			var _this$props = _this.props, rtl = _this$props.rtl, selected = _this$props.selected, accessors = _this$props.accessors, localizer = _this$props.localizer, getters = _this$props.getters, components = _this$props.components, step = _this$props.step, timeslots = _this$props.timeslots, dayLayoutAlgorithm = _this$props.dayLayoutAlgorithm, resizable = _this$props.resizable;
			var slotMetrics = _this.slotMetrics;
			var messages = localizer.messages;
			return getStyledEvents({
				events,
				accessors,
				slotMetrics,
				minimumStartDifference: Math.ceil(step * timeslots / 2),
				dayLayoutAlgorithm
			}).map(function(_ref2, idx) {
				var _accessors$eventId;
				var event = _ref2.event, style = _ref2.style;
				var end = accessors.end(event);
				var start = accessors.start(event);
				var key = (_accessors$eventId = accessors.eventId(event)) !== null && _accessors$eventId !== void 0 ? _accessors$eventId : "evt_" + idx;
				var format = "eventTimeRangeFormat";
				var label;
				var startsBeforeDay = slotMetrics.startsBeforeDay(start);
				var startsAfterDay = slotMetrics.startsAfterDay(end);
				if (startsBeforeDay) format = "eventTimeRangeEndFormat";
				else if (startsAfterDay) format = "eventTimeRangeStartFormat";
				if (startsBeforeDay && startsAfterDay) label = messages.allDay;
				else label = localizer.format({
					start,
					end
				}, format);
				var continuesPrior = startsBeforeDay || slotMetrics.startsBefore(start);
				var continuesAfter = startsAfterDay || slotMetrics.startsAfter(end);
				return /*#__PURE__*/ import_react.createElement(TimeGridEvent, {
					style,
					event,
					label,
					key,
					getters,
					rtl,
					components,
					continuesPrior,
					continuesAfter,
					accessors,
					resource: _this.props.resource,
					selected: isSelected(event, selected),
					onClick: function onClick(e) {
						return _this._select(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, event), _this.props.resource && { sourceResource: _this.props.resource }), isBackgroundEvent && { isBackgroundEvent: true }), e);
					},
					onDoubleClick: function onDoubleClick(e) {
						return _this._doubleClick(event, e);
					},
					isBackgroundEvent,
					onKeyPress: function onKeyPress(e) {
						return _this._keyPress(event, e);
					},
					resizable
				});
			});
		};
		_this._selectable = function() {
			var node = _this.containerRef.current;
			var _this$props2 = _this.props, longPressThreshold = _this$props2.longPressThreshold, localizer = _this$props2.localizer;
			var selector = _this._selector = new Selection(function() {
				return node;
			}, { longPressThreshold });
			var maybeSelect = function maybeSelect(box) {
				var onSelecting = _this.props.onSelecting;
				var current = _this.state || {};
				var state = selectionState(box);
				var start = state.startDate, end = state.endDate;
				if (onSelecting) {
					if (localizer.eq(current.startDate, start, "minutes") && localizer.eq(current.endDate, end, "minutes") || onSelecting({
						start,
						end,
						resourceId: _this.props.resource
					}) === false) return;
				}
				if (_this.state.start !== state.start || _this.state.end !== state.end || _this.state.selecting !== state.selecting) _this.setState(state);
			};
			var selectionState = function selectionState(point) {
				var currentSlot = _this.slotMetrics.closestSlotFromPoint(point, getBoundsForNode(node));
				if (!_this.state.selecting) _this._initialSlot = currentSlot;
				var initialSlot = _this._initialSlot;
				if (localizer.lte(initialSlot, currentSlot)) currentSlot = _this.slotMetrics.nextSlot(currentSlot);
				else if (localizer.gt(initialSlot, currentSlot)) initialSlot = _this.slotMetrics.nextSlot(initialSlot);
				var selectRange = _this.slotMetrics.getRange(localizer.min(initialSlot, currentSlot), localizer.max(initialSlot, currentSlot));
				return _objectSpread$2(_objectSpread$2({}, selectRange), {}, {
					selecting: true,
					top: "".concat(selectRange.top, "%"),
					height: "".concat(selectRange.height, "%")
				});
			};
			var selectorClicksHandler = function selectorClicksHandler(box, actionType) {
				if (!isEvent(_this.containerRef.current, box)) {
					var _selectionState = selectionState(box), startDate = _selectionState.startDate, endDate = _selectionState.endDate;
					_this._selectSlot({
						startDate,
						endDate,
						action: actionType,
						box
					});
				}
				_this.setState({ selecting: false });
			};
			selector.on("selecting", maybeSelect);
			selector.on("selectStart", maybeSelect);
			selector.on("beforeSelect", function(box) {
				if (_this.props.selectable !== "ignoreEvents") return;
				return !isEvent(_this.containerRef.current, box);
			});
			selector.on("click", function(box) {
				return selectorClicksHandler(box, "click");
			});
			selector.on("doubleClick", function(box) {
				return selectorClicksHandler(box, "doubleClick");
			});
			selector.on("select", function(bounds) {
				if (_this.state.selecting) {
					_this._selectSlot(_objectSpread$2(_objectSpread$2({}, _this.state), {}, {
						action: "select",
						bounds
					}));
					_this.setState({ selecting: false });
				}
			});
			selector.on("reset", function() {
				if (_this.state.selecting) _this.setState({ selecting: false });
			});
		};
		_this._teardownSelectable = function() {
			if (!_this._selector) return;
			_this._selector.teardown();
			_this._selector = null;
		};
		_this._selectSlot = function(_ref3) {
			var startDate = _ref3.startDate, endDate = _ref3.endDate, action = _ref3.action, bounds = _ref3.bounds, box = _ref3.box;
			var current = startDate, slots = [];
			while (_this.props.localizer.lte(current, endDate)) {
				slots.push(current);
				current = /* @__PURE__ */ new Date(+current + _this.props.step * 60 * 1e3);
			}
			notify(_this.props.onSelectSlot, {
				slots,
				start: startDate,
				end: endDate,
				resourceId: _this.props.resource,
				action,
				bounds,
				box
			});
		};
		_this._select = function() {
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
			notify(_this.props.onSelectEvent, args);
		};
		_this._doubleClick = function() {
			for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
			notify(_this.props.onDoubleClickEvent, args);
		};
		_this._keyPress = function() {
			for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
			notify(_this.props.onKeyPressEvent, args);
		};
		_this.slotMetrics = getSlotMetrics(_this.props);
		_this.containerRef = /*#__PURE__*/ (0, import_react.createRef)();
		return _this;
	}
	_inherits(DayColumn, _React$Component);
	return _createClass(DayColumn, [
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				this.props.selectable && this._selectable();
				if (this.props.isNow) this.setTimeIndicatorPositionUpdateInterval();
			}
		},
		{
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this._teardownSelectable();
				this.clearTimeIndicatorInterval();
			}
		},
		{
			key: "componentDidUpdate",
			value: function componentDidUpdate(prevProps, prevState) {
				if (this.props.selectable && !prevProps.selectable) this._selectable();
				if (!this.props.selectable && prevProps.selectable) this._teardownSelectable();
				var _this$props3 = this.props, getNow = _this$props3.getNow, isNow = _this$props3.isNow, localizer = _this$props3.localizer, date = _this$props3.date, min = _this$props3.min, max = _this$props3.max;
				var getNowChanged = localizer.neq(prevProps.getNow(), getNow(), "minutes");
				if (prevProps.isNow !== isNow || getNowChanged) {
					this.clearTimeIndicatorInterval();
					if (isNow) {
						var tail = !getNowChanged && localizer.eq(prevProps.date, date, "minutes") && prevState.timeIndicatorPosition === this.state.timeIndicatorPosition;
						this.setTimeIndicatorPositionUpdateInterval(tail);
					}
				} else if (isNow && (localizer.neq(prevProps.min, min, "minutes") || localizer.neq(prevProps.max, max, "minutes"))) this.positionTimeIndicator();
			}
		},
		{
			key: "setTimeIndicatorPositionUpdateInterval",
			value: function setTimeIndicatorPositionUpdateInterval() {
				var _this3 = this;
				var tail = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
				if (!this.intervalTriggered && !tail) this.positionTimeIndicator();
				this._timeIndicatorTimeout = window.setTimeout(function() {
					_this3.intervalTriggered = true;
					_this3.positionTimeIndicator();
					_this3.setTimeIndicatorPositionUpdateInterval();
				}, 6e4);
			}
		},
		{
			key: "clearTimeIndicatorInterval",
			value: function clearTimeIndicatorInterval() {
				this.intervalTriggered = false;
				window.clearTimeout(this._timeIndicatorTimeout);
			}
		},
		{
			key: "positionTimeIndicator",
			value: function positionTimeIndicator() {
				var _this$props4 = this.props, min = _this$props4.min, max = _this$props4.max, getNow = _this$props4.getNow;
				var current = getNow();
				if (current >= min && current <= max) {
					var top = this.slotMetrics.getCurrentTimePosition(current);
					this.intervalTriggered = true;
					this.setState({ timeIndicatorPosition: top });
				} else this.clearTimeIndicatorInterval();
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props5 = this.props, date = _this$props5.date, max = _this$props5.max, rtl = _this$props5.rtl, isNow = _this$props5.isNow, resource = _this$props5.resource, accessors = _this$props5.accessors, localizer = _this$props5.localizer, _this$props5$getters = _this$props5.getters, dayProp = _this$props5$getters.dayProp, getters = _objectWithoutProperties(_this$props5$getters, _excluded$5), _this$props5$componen = _this$props5.components, EventContainer = _this$props5$componen.eventContainerWrapper, TimeIndicatorWrapper = _this$props5$componen.timeIndicatorWrapper, components = _objectWithoutProperties(_this$props5$componen, _excluded2$1);
				this.slotMetrics = this.slotMetrics.update(this.props);
				var slotMetrics = this.slotMetrics;
				var _this$state = this.state, selecting = _this$state.selecting, top = _this$state.top, height = _this$state.height;
				var selectDates = {
					start: _this$state.startDate,
					end: _this$state.endDate
				};
				var _dayProp = dayProp(max, resource), className = _dayProp.className, style = _dayProp.style;
				var timeIndicatorProps = {
					className: "rbc-current-time-indicator",
					style: { top: "".concat(this.state.timeIndicatorPosition, "%") }
				};
				var DayColumnWrapperComponent = components.dayColumnWrapper || DayColumnWrapper$1;
				return /*#__PURE__*/ import_react.createElement(DayColumnWrapperComponent, {
					ref: this.containerRef,
					date,
					style,
					className: clsx(className, "rbc-day-slot", "rbc-time-column", isNow && "rbc-now", isNow && "rbc-today", selecting && "rbc-slot-selecting"),
					slotMetrics,
					resource
				}, slotMetrics.groups.map(function(grp, idx) {
					return /*#__PURE__*/ import_react.createElement(TimeSlotGroup, {
						key: idx,
						group: grp,
						resource,
						getters,
						components
					});
				}), /*#__PURE__*/ import_react.createElement(EventContainer, {
					localizer,
					resource,
					accessors,
					getters,
					components,
					slotMetrics
				}, /*#__PURE__*/ import_react.createElement("div", { className: clsx("rbc-events-container", rtl && "rtl") }, this.renderEvents({
					events: this.props.backgroundEvents,
					isBackgroundEvent: true
				}), this.renderEvents({ events: this.props.events }))), selecting && /*#__PURE__*/ import_react.createElement("div", {
					className: "rbc-slot-selection",
					style: {
						top,
						height
					}
				}, /*#__PURE__*/ import_react.createElement("span", null, localizer.format(selectDates, "selectRangeFormat"))), isNow && this.intervalTriggered && /*#__PURE__*/ import_react.createElement(TimeIndicatorWrapper, timeIndicatorProps, /*#__PURE__*/ import_react.createElement("div", timeIndicatorProps)));
			}
		}
	]);
}(import_react.Component);
DayColumn.propTypes = {};
DayColumn.defaultProps = {
	dragThroughEvents: true,
	timeslots: 2
};
var ResourceHeader = function ResourceHeader(_ref) {
	var label = _ref.label;
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, label);
};
ResourceHeader.propTypes = {};
function _callSuper$6(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$6() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$6() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$6 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var TimeGridHeader = /*#__PURE__*/ function(_React$Component) {
	function TimeGridHeader() {
		var _this;
		_classCallCheck(this, TimeGridHeader);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper$6(this, TimeGridHeader, [].concat(args));
		_this.handleHeaderClick = function(date, view, e) {
			e.preventDefault();
			notify(_this.props.onDrillDown, [date, view]);
		};
		_this.renderRow = function(resource) {
			var _this$props = _this.props, events = _this$props.events, rtl = _this$props.rtl, selectable = _this$props.selectable, getNow = _this$props.getNow, range = _this$props.range, getters = _this$props.getters, localizer = _this$props.localizer, accessors = _this$props.accessors, components = _this$props.components, resizable = _this$props.resizable;
			var resourceId = accessors.resourceId(resource);
			var eventsToDisplay = resource ? events.filter(function(event) {
				return accessors.resource(event) === resourceId;
			}) : events;
			return /*#__PURE__*/ import_react.createElement(DateContentRow, {
				isAllDay: true,
				rtl,
				getNow,
				minRows: 2,
				maxRows: _this.props.allDayMaxRows + 1,
				range,
				events: eventsToDisplay,
				resourceId,
				className: "rbc-allday-cell",
				selectable,
				selected: _this.props.selected,
				components,
				accessors,
				getters,
				localizer,
				onSelect: _this.props.onSelectEvent,
				onShowMore: _this.props.onShowMore,
				onDoubleClick: _this.props.onDoubleClickEvent,
				onKeyPress: _this.props.onKeyPressEvent,
				onSelectSlot: _this.props.onSelectSlot,
				longPressThreshold: _this.props.longPressThreshold,
				resizable
			});
		};
		return _this;
	}
	_inherits(TimeGridHeader, _React$Component);
	return _createClass(TimeGridHeader, [{
		key: "renderHeaderCells",
		value: function renderHeaderCells(range) {
			var _this2 = this;
			var _this$props2 = this.props, localizer = _this$props2.localizer, getDrilldownView = _this$props2.getDrilldownView, getNow = _this$props2.getNow, dayProp = _this$props2.getters.dayProp, _this$props2$componen = _this$props2.components.header, HeaderComponent = _this$props2$componen === void 0 ? Header : _this$props2$componen;
			var today = getNow();
			return range.map(function(date, i) {
				var drilldownView = getDrilldownView(date);
				var label = localizer.format(date, "dayFormat");
				var _dayProp = dayProp(date), className = _dayProp.className, style = _dayProp.style;
				var header = /*#__PURE__*/ import_react.createElement(HeaderComponent, {
					date,
					label,
					localizer
				});
				return /*#__PURE__*/ import_react.createElement("div", {
					key: i,
					style,
					className: clsx("rbc-header", className, localizer.isSameDate(date, today) && "rbc-today")
				}, drilldownView ? /*#__PURE__*/ import_react.createElement("button", {
					type: "button",
					className: "rbc-button-link",
					onClick: function onClick(e) {
						return _this2.handleHeaderClick(date, drilldownView, e);
					}
				}, header) : /*#__PURE__*/ import_react.createElement("span", null, header));
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;
			var _this$props3 = this.props, width = _this$props3.width, rtl = _this$props3.rtl, resources = _this$props3.resources, range = _this$props3.range, events = _this$props3.events, getNow = _this$props3.getNow, accessors = _this$props3.accessors, selectable = _this$props3.selectable, components = _this$props3.components, getters = _this$props3.getters, scrollRef = _this$props3.scrollRef, localizer = _this$props3.localizer, isOverflowing = _this$props3.isOverflowing, _this$props3$componen = _this$props3.components, TimeGutterHeader = _this$props3$componen.timeGutterHeader, _this$props3$componen2 = _this$props3$componen.resourceHeader, ResourceHeaderComponent = _this$props3$componen2 === void 0 ? ResourceHeader : _this$props3$componen2, resizable = _this$props3.resizable;
			var style = {};
			if (isOverflowing) style[rtl ? "marginLeft" : "marginRight"] = "".concat(scrollbarSize() - 1, "px");
			var groupedEvents = resources.groupEvents(events);
			return /*#__PURE__*/ import_react.createElement("div", {
				style,
				ref: scrollRef,
				className: clsx("rbc-time-header", isOverflowing && "rbc-overflowing")
			}, /*#__PURE__*/ import_react.createElement("div", {
				className: "rbc-label rbc-time-header-gutter",
				style: {
					width,
					minWidth: width,
					maxWidth: width
				}
			}, TimeGutterHeader && /*#__PURE__*/ import_react.createElement(TimeGutterHeader, null)), resources.map(function(_ref, idx) {
				var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], resource = _ref2[1];
				return /*#__PURE__*/ import_react.createElement("div", {
					className: "rbc-time-header-content",
					key: id || idx
				}, resource && /*#__PURE__*/ import_react.createElement("div", {
					className: "rbc-row rbc-row-resource",
					key: "resource_".concat(idx)
				}, /*#__PURE__*/ import_react.createElement("div", { className: "rbc-header" }, /*#__PURE__*/ import_react.createElement(ResourceHeaderComponent, {
					index: idx,
					label: accessors.resourceTitle(resource),
					resource
				}))), /*#__PURE__*/ import_react.createElement("div", { className: "rbc-row rbc-time-header-cell".concat(range.length <= 1 ? " rbc-time-header-cell-single-day" : "") }, _this3.renderHeaderCells(range)), /*#__PURE__*/ import_react.createElement(DateContentRow, {
					isAllDay: true,
					rtl,
					getNow,
					minRows: 2,
					maxRows: _this3.props.allDayMaxRows + 1,
					range,
					events: groupedEvents.get(id) || [],
					resourceId: resource && id,
					className: "rbc-allday-cell",
					selectable,
					selected: _this3.props.selected,
					components,
					accessors,
					getters,
					localizer,
					onSelect: _this3.props.onSelectEvent,
					onShowMore: _this3.props.onShowMore,
					onDoubleClick: _this3.props.onDoubleClickEvent,
					onKeyDown: _this3.props.onKeyPressEvent,
					onSelectSlot: _this3.props.onSelectSlot,
					longPressThreshold: _this3.props.longPressThreshold,
					resizable
				}));
			}));
		}
	}]);
}(import_react.Component);
TimeGridHeader.propTypes = {};
function _callSuper$5(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$5() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$5() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$5 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var TimeGridHeaderResources = /*#__PURE__*/ function(_React$Component) {
	function TimeGridHeaderResources() {
		var _this;
		_classCallCheck(this, TimeGridHeaderResources);
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		_this = _callSuper$5(this, TimeGridHeaderResources, [].concat(args));
		_this.handleHeaderClick = function(date, view, e) {
			e.preventDefault();
			notify(_this.props.onDrillDown, [date, view]);
		};
		return _this;
	}
	_inherits(TimeGridHeaderResources, _React$Component);
	return _createClass(TimeGridHeaderResources, [{
		key: "renderHeaderCells",
		value: function renderHeaderCells(range) {
			var _this2 = this;
			var _this$props = this.props, localizer = _this$props.localizer, getDrilldownView = _this$props.getDrilldownView, getNow = _this$props.getNow, dayProp = _this$props.getters.dayProp, _this$props$component = _this$props.components, _this$props$component2 = _this$props$component.header, HeaderComponent = _this$props$component2 === void 0 ? Header : _this$props$component2, _this$props$component3 = _this$props$component.resourceHeader, ResourceHeaderComponent = _this$props$component3 === void 0 ? ResourceHeader : _this$props$component3, resources = _this$props.resources, accessors = _this$props.accessors, events = _this$props.events, rtl = _this$props.rtl, selectable = _this$props.selectable, components = _this$props.components, getters = _this$props.getters, resizable = _this$props.resizable;
			var today = getNow();
			var groupedEvents = resources.groupEvents(events);
			return range.map(function(date, idx) {
				var drilldownView = getDrilldownView(date);
				var label = localizer.format(date, "dayFormat");
				var _dayProp = dayProp(date), className = _dayProp.className, style = _dayProp.style;
				var header = /*#__PURE__*/ import_react.createElement(HeaderComponent, {
					date,
					label,
					localizer
				});
				return /*#__PURE__*/ import_react.createElement("div", {
					key: idx,
					className: "rbc-time-header-content rbc-resource-grouping"
				}, /*#__PURE__*/ import_react.createElement("div", { className: "rbc-row rbc-time-header-cell".concat(range.length <= 1 ? " rbc-time-header-cell-single-day" : "") }, /*#__PURE__*/ import_react.createElement("div", {
					style,
					className: clsx("rbc-header", className, localizer.isSameDate(date, today) && "rbc-today")
				}, drilldownView ? /*#__PURE__*/ import_react.createElement("button", {
					type: "button",
					className: "rbc-button-link",
					onClick: function onClick(e) {
						return _this2.handleHeaderClick(date, drilldownView, e);
					}
				}, header) : /*#__PURE__*/ import_react.createElement("span", null, header))), /*#__PURE__*/ import_react.createElement("div", { className: "rbc-row" }, resources.map(function(_ref, idx) {
					var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], resource = _ref2[1];
					return /*#__PURE__*/ import_react.createElement("div", {
						key: "resource_".concat(id, "_").concat(idx),
						className: clsx("rbc-header", className, localizer.isSameDate(date, today) && "rbc-today")
					}, /*#__PURE__*/ import_react.createElement(ResourceHeaderComponent, {
						index: idx,
						label: accessors.resourceTitle(resource),
						resource
					}));
				})), /*#__PURE__*/ import_react.createElement("div", { className: "rbc-row rbc-m-b-negative-3 rbc-h-full" }, resources.map(function(_ref3, idx) {
					var _ref4 = _slicedToArray(_ref3, 2), id = _ref4[0], resource = _ref4[1];
					var filteredEvents = (groupedEvents.get(id) || []).filter(function(event) {
						return localizer.isSameDate(event.start, date) || localizer.isSameDate(event.end, date);
					});
					return /*#__PURE__*/ import_react.createElement(DateContentRow, {
						key: "resource_".concat(id, "_").concat(idx),
						isAllDay: true,
						rtl,
						getNow,
						minRows: 2,
						maxRows: _this2.props.allDayMaxRows + 1,
						range: [date],
						events: filteredEvents,
						resourceId: resource && id,
						className: "rbc-allday-cell",
						selectable,
						selected: _this2.props.selected,
						components,
						accessors,
						getters,
						localizer,
						onSelect: _this2.props.onSelectEvent,
						onShowMore: _this2.props.onShowMore,
						onDoubleClick: _this2.props.onDoubleClickEvent,
						onKeyDown: _this2.props.onKeyPressEvent,
						onSelectSlot: _this2.props.onSelectSlot,
						longPressThreshold: _this2.props.longPressThreshold,
						resizable
					});
				})));
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this$props2 = this.props, width = _this$props2.width, rtl = _this$props2.rtl, range = _this$props2.range, scrollRef = _this$props2.scrollRef, isOverflowing = _this$props2.isOverflowing, TimeGutterHeader = _this$props2.components.timeGutterHeader;
			var style = {};
			if (isOverflowing) style[rtl ? "marginLeft" : "marginRight"] = "".concat(scrollbarSize() - 1, "px");
			return /*#__PURE__*/ import_react.createElement("div", {
				style,
				ref: scrollRef,
				className: clsx("rbc-time-header", isOverflowing && "rbc-overflowing")
			}, /*#__PURE__*/ import_react.createElement("div", {
				className: "rbc-label rbc-time-header-gutter",
				style: {
					width,
					minWidth: width,
					maxWidth: width
				}
			}, TimeGutterHeader && /*#__PURE__*/ import_react.createElement(TimeGutterHeader, null)), this.renderHeaderCells(range));
		}
	}]);
}(import_react.Component);
TimeGridHeaderResources.propTypes = {};
/**
* Since the TimeGutter only displays the 'times' of slots in a day, and is separate
* from the Day Columns themselves, we check to see if the range contains an offset difference
* and, if so, change the beginning and end 'date' by a day to properly display the slots times
* used.
*/
function adjustForDST(_ref) {
	var min = _ref.min, max = _ref.max, localizer = _ref.localizer;
	if (localizer.getTimezoneOffset(min) !== localizer.getTimezoneOffset(max)) return {
		start: localizer.add(min, -1, "day"),
		end: localizer.add(max, -1, "day")
	};
	return {
		start: min,
		end: max
	};
}
var TimeGutter = function TimeGutter(_ref2) {
	var min = _ref2.min, max = _ref2.max, timeslots = _ref2.timeslots, step = _ref2.step, localizer = _ref2.localizer, getNow = _ref2.getNow, resource = _ref2.resource, components = _ref2.components, getters = _ref2.getters, gutterRef = _ref2.gutterRef;
	var TimeGutterWrapper = components.timeGutterWrapper;
	var _useMemo = (0, import_react.useMemo)(function() {
		return adjustForDST({
			min,
			max,
			localizer
		});
	}, [
		min === null || min === void 0 ? void 0 : min.toISOString(),
		max === null || max === void 0 ? void 0 : max.toISOString(),
		localizer
	]), start = _useMemo.start, end = _useMemo.end;
	var _useState2 = _slicedToArray((0, import_react.useState)(getSlotMetrics({
		min: start,
		max: end,
		timeslots,
		step,
		localizer
	})), 2), slotMetrics = _useState2[0], setSlotMetrics = _useState2[1];
	(0, import_react.useEffect)(function() {
		if (slotMetrics) setSlotMetrics(slotMetrics.update({
			min: start,
			max: end,
			timeslots,
			step,
			localizer
		}));
		/**
		* We don't want this to fire when slotMetrics is updated as it would recursively bomb
		*/
	}, [
		start === null || start === void 0 ? void 0 : start.toISOString(),
		end === null || end === void 0 ? void 0 : end.toISOString(),
		timeslots,
		step
	]);
	var renderSlot = (0, import_react.useCallback)(function(value, idx) {
		if (idx) return null;
		var isNow = slotMetrics.dateIsInGroup(getNow(), idx);
		return /*#__PURE__*/ import_react.createElement("span", { className: clsx("rbc-label", isNow && "rbc-now") }, localizer.format(value, "timeGutterFormat"));
	}, [
		slotMetrics,
		localizer,
		getNow
	]);
	return /*#__PURE__*/ import_react.createElement(TimeGutterWrapper, { slotMetrics }, /*#__PURE__*/ import_react.createElement("div", {
		className: "rbc-time-gutter rbc-time-column",
		ref: gutterRef
	}, slotMetrics.groups.map(function(grp, idx) {
		return /*#__PURE__*/ import_react.createElement(TimeSlotGroup, {
			key: idx,
			group: grp,
			resource,
			components,
			renderSlot,
			getters
		});
	})));
};
TimeGutter.propTypes = {};
var TimeGutter$1 = /*#__PURE__*/ import_react.forwardRef(function(props, ref) {
	return /*#__PURE__*/ import_react.createElement(TimeGutter, _extends({ gutterRef: ref }, props));
});
var NONE = {};
function Resources(resources, accessors) {
	return {
		map: function map(fn) {
			if (!resources) return [fn([NONE, null], 0)];
			return resources.map(function(resource, idx) {
				return fn([accessors.resourceId(resource), resource], idx);
			});
		},
		groupEvents: function groupEvents(events) {
			var eventsByResource = /* @__PURE__ */ new Map();
			if (!resources) {
				eventsByResource.set(NONE, events);
				return eventsByResource;
			}
			events.forEach(function(event) {
				var id = accessors.resource(event) || NONE;
				if (Array.isArray(id)) id.forEach(function(item) {
					var resourceEvents = eventsByResource.get(item) || [];
					resourceEvents.push(event);
					eventsByResource.set(item, resourceEvents);
				});
				else {
					var resourceEvents = eventsByResource.get(id) || [];
					resourceEvents.push(event);
					eventsByResource.set(id, resourceEvents);
				}
			});
			return eventsByResource;
		}
	};
}
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _callSuper$4(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$4() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$4() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$4 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var TimeGrid = /*#__PURE__*/ function(_Component) {
	function TimeGrid(props) {
		var _this;
		_classCallCheck(this, TimeGrid);
		_this = _callSuper$4(this, TimeGrid, [props]);
		_this.handleScroll = function(e) {
			if (_this.scrollRef.current) _this.scrollRef.current.scrollLeft = e.target.scrollLeft;
		};
		_this.handleResize = function() {
			cancel(_this.rafHandle);
			_this.rafHandle = request(_this.checkOverflow);
		};
		_this.handleKeyPressEvent = function() {
			_this.clearSelection();
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			notify(_this.props.onKeyPressEvent, args);
		};
		_this.handleSelectEvent = function() {
			_this.clearSelection();
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
			notify(_this.props.onSelectEvent, args);
		};
		_this.handleDoubleClickEvent = function() {
			_this.clearSelection();
			for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
			notify(_this.props.onDoubleClickEvent, args);
		};
		_this.handleShowMore = function(events, date, cell, slot, target) {
			var _this$props = _this.props, popup = _this$props.popup, onDrillDown = _this$props.onDrillDown, onShowMore = _this$props.onShowMore, getDrilldownView = _this$props.getDrilldownView, doShowMoreDrillDown = _this$props.doShowMoreDrillDown;
			_this.clearSelection();
			if (popup) {
				var position$2 = position(cell, _this.containerRef.current);
				_this.setState({ overlay: {
					date,
					events,
					position: _objectSpread$1(_objectSpread$1({}, position$2), {}, { width: "200px" }),
					target
				} });
			} else if (doShowMoreDrillDown) notify(onDrillDown, [date, getDrilldownView(date) || views$1.DAY]);
			notify(onShowMore, [
				events,
				date,
				slot
			]);
		};
		_this.handleSelectAllDaySlot = function(slots, slotInfo) {
			var onSelectSlot = _this.props.onSelectSlot;
			var start = new Date(slots[0]);
			var end = new Date(slots[slots.length - 1]);
			end.setDate(slots[slots.length - 1].getDate() + 1);
			notify(onSelectSlot, {
				slots,
				start,
				end,
				action: slotInfo.action,
				resourceId: slotInfo.resourceId
			});
		};
		_this.overlayDisplay = function() {
			_this.setState({ overlay: null });
		};
		_this.checkOverflow = function() {
			if (_this._updatingOverflow) return;
			var content = _this.contentRef.current;
			if (!(content !== null && content !== void 0 && content.scrollHeight)) return;
			var isOverflowing = content.scrollHeight > content.clientHeight;
			if (_this.state.isOverflowing !== isOverflowing) {
				_this._updatingOverflow = true;
				_this.setState({ isOverflowing }, function() {
					_this._updatingOverflow = false;
				});
			}
		};
		_this.memoizedResources = memoizeOne(function(resources, accessors) {
			return Resources(resources, accessors);
		});
		_this.state = {
			gutterWidth: void 0,
			isOverflowing: null
		};
		_this.scrollRef = /*#__PURE__*/ import_react.createRef();
		_this.contentRef = /*#__PURE__*/ import_react.createRef();
		_this.containerRef = /*#__PURE__*/ import_react.createRef();
		_this._scrollRatio = null;
		_this.gutterRef = /*#__PURE__*/ (0, import_react.createRef)();
		return _this;
	}
	_inherits(TimeGrid, _Component);
	return _createClass(TimeGrid, [
		{
			key: "getSnapshotBeforeUpdate",
			value: function getSnapshotBeforeUpdate() {
				this.checkOverflow();
				return null;
			}
		},
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				if (this.props.width == null) this.measureGutter();
				this.calculateScroll();
				this.applyScroll();
				window.addEventListener("resize", this.handleResize);
			}
		},
		{
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				window.removeEventListener("resize", this.handleResize);
				cancel(this.rafHandle);
				if (this.measureGutterAnimationFrameRequest) window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
			}
		},
		{
			key: "componentDidUpdate",
			value: function componentDidUpdate() {
				this.applyScroll();
			}
		},
		{
			key: "renderDayColumn",
			value: function renderDayColumn(date, id, resource, groupedEvents, groupedBackgroundEvents, localizer, accessors, components, dayLayoutAlgorithm, now) {
				var _this$props2 = this.props, min = _this$props2.min, max = _this$props2.max;
				var daysEvents = (groupedEvents.get(id) || []).filter(function(event) {
					return localizer.inRange(date, accessors.start(event), accessors.end(event), "day");
				});
				var daysBackgroundEvents = (groupedBackgroundEvents.get(id) || []).filter(function(event) {
					return localizer.inRange(date, accessors.start(event), accessors.end(event), "day");
				});
				return /*#__PURE__*/ import_react.createElement(DayColumn, _extends({}, this.props, {
					localizer,
					min: localizer.merge(date, min),
					max: localizer.merge(date, max),
					resource: resource && id,
					components,
					isNow: localizer.isSameDate(date, now),
					key: "".concat(id, "-").concat(date),
					date,
					events: daysEvents,
					backgroundEvents: daysBackgroundEvents,
					dayLayoutAlgorithm
				}));
			}
		},
		{
			key: "renderResourcesFirst",
			value: function renderResourcesFirst(range, resources, groupedEvents, groupedBackgroundEvents, localizer, accessors, now, components, dayLayoutAlgorithm) {
				var _this2 = this;
				return resources.map(function(_ref) {
					var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], resource = _ref2[1];
					return range.map(function(date) {
						return _this2.renderDayColumn(date, id, resource, groupedEvents, groupedBackgroundEvents, localizer, accessors, components, dayLayoutAlgorithm, now);
					});
				});
			}
		},
		{
			key: "renderRangeFirst",
			value: function renderRangeFirst(range, resources, groupedEvents, groupedBackgroundEvents, localizer, accessors, now, components, dayLayoutAlgorithm) {
				var _this3 = this;
				return range.map(function(date) {
					return /*#__PURE__*/ import_react.createElement("div", {
						style: {
							display: "flex",
							minHeight: "100%",
							flex: 1
						},
						key: date
					}, resources.map(function(_ref3) {
						var _ref4 = _slicedToArray(_ref3, 2), id = _ref4[0], resource = _ref4[1];
						return /*#__PURE__*/ import_react.createElement("div", {
							style: { flex: 1 },
							key: accessors.resourceId(resource)
						}, _this3.renderDayColumn(date, id, resource, groupedEvents, groupedBackgroundEvents, localizer, accessors, components, dayLayoutAlgorithm, now));
					}));
				});
			}
		},
		{
			key: "renderEvents",
			value: function renderEvents(range, events, backgroundEvents, now) {
				var _this$props3 = this.props, accessors = _this$props3.accessors, localizer = _this$props3.localizer, resourceGroupingLayout = _this$props3.resourceGroupingLayout, components = _this$props3.components, dayLayoutAlgorithm = _this$props3.dayLayoutAlgorithm;
				var resources = this.memoizedResources(this.props.resources, accessors);
				var groupedEvents = resources.groupEvents(events);
				var groupedBackgroundEvents = resources.groupEvents(backgroundEvents);
				if (!resourceGroupingLayout) return this.renderResourcesFirst(range, resources, groupedEvents, groupedBackgroundEvents, localizer, accessors, now, components, dayLayoutAlgorithm);
				else return this.renderRangeFirst(range, resources, groupedEvents, groupedBackgroundEvents, localizer, accessors, now, components, dayLayoutAlgorithm);
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$props$allDayMax;
				var _this$props4 = this.props, events = _this$props4.events, backgroundEvents = _this$props4.backgroundEvents, range = _this$props4.range, width = _this$props4.width, rtl = _this$props4.rtl, selected = _this$props4.selected, getNow = _this$props4.getNow, resources = _this$props4.resources, components = _this$props4.components, accessors = _this$props4.accessors, getters = _this$props4.getters, localizer = _this$props4.localizer, min = _this$props4.min, max = _this$props4.max, showMultiDayTimes = _this$props4.showMultiDayTimes, longPressThreshold = _this$props4.longPressThreshold, resizable = _this$props4.resizable, resourceGroupingLayout = _this$props4.resourceGroupingLayout;
				width = width || this.state.gutterWidth;
				var start = range[0], end = range[range.length - 1];
				this.slots = range.length;
				var allDayEvents = [], rangeEvents = [], rangeBackgroundEvents = [];
				events.forEach(function(event) {
					if (inRange(event, start, end, accessors, localizer)) {
						var eStart = accessors.start(event), eEnd = accessors.end(event);
						if (accessors.allDay(event) || localizer.startAndEndAreDateOnly(eStart, eEnd) || !showMultiDayTimes && !localizer.isSameDate(eStart, eEnd)) allDayEvents.push(event);
						else rangeEvents.push(event);
					}
				});
				backgroundEvents.forEach(function(event) {
					if (inRange(event, start, end, accessors, localizer)) rangeBackgroundEvents.push(event);
				});
				allDayEvents.sort(function(a, b) {
					return sortEvents(a, b, accessors, localizer);
				});
				var headerProps = {
					range,
					events: allDayEvents,
					width,
					rtl,
					getNow,
					localizer,
					selected,
					allDayMaxRows: this.props.showAllEvents ? Infinity : (_this$props$allDayMax = this.props.allDayMaxRows) !== null && _this$props$allDayMax !== void 0 ? _this$props$allDayMax : Infinity,
					resources: this.memoizedResources(resources, accessors),
					selectable: this.props.selectable,
					accessors,
					getters,
					components,
					scrollRef: this.scrollRef,
					isOverflowing: this.state.isOverflowing,
					longPressThreshold,
					onSelectSlot: this.handleSelectAllDaySlot,
					onSelectEvent: this.handleSelectEvent,
					onShowMore: this.handleShowMore,
					onDoubleClickEvent: this.props.onDoubleClickEvent,
					onKeyPressEvent: this.props.onKeyPressEvent,
					onDrillDown: this.props.onDrillDown,
					getDrilldownView: this.props.getDrilldownView,
					resizable
				};
				return /*#__PURE__*/ import_react.createElement("div", {
					className: clsx("rbc-time-view", resources && "rbc-time-view-resources"),
					ref: this.containerRef
				}, resources && resources.length > 1 && resourceGroupingLayout ? /*#__PURE__*/ import_react.createElement(TimeGridHeaderResources, headerProps) : /*#__PURE__*/ import_react.createElement(TimeGridHeader, headerProps), this.props.popup && this.renderOverlay(), /*#__PURE__*/ import_react.createElement("div", {
					ref: this.contentRef,
					className: "rbc-time-content",
					onScroll: this.handleScroll
				}, /*#__PURE__*/ import_react.createElement(TimeGutter$1, {
					date: start,
					ref: this.gutterRef,
					localizer,
					min: localizer.merge(start, min),
					max: localizer.merge(start, max),
					step: this.props.step,
					getNow: this.props.getNow,
					timeslots: this.props.timeslots,
					components,
					className: "rbc-time-gutter",
					getters
				}), this.renderEvents(range, rangeEvents, rangeBackgroundEvents, getNow())));
			}
		},
		{
			key: "renderOverlay",
			value: function renderOverlay() {
				var _this$state$overlay, _this$state, _this4 = this;
				var overlay = (_this$state$overlay = (_this$state = this.state) === null || _this$state === void 0 ? void 0 : _this$state.overlay) !== null && _this$state$overlay !== void 0 ? _this$state$overlay : {};
				var _this$props5 = this.props, accessors = _this$props5.accessors, localizer = _this$props5.localizer, components = _this$props5.components, getters = _this$props5.getters, selected = _this$props5.selected, popupOffset = _this$props5.popupOffset, handleDragStart = _this$props5.handleDragStart;
				return /*#__PURE__*/ import_react.createElement(PopOverlay, {
					overlay,
					accessors,
					localizer,
					components,
					getters,
					selected,
					popupOffset,
					ref: this.containerRef,
					handleKeyPressEvent: this.handleKeyPressEvent,
					handleSelectEvent: this.handleSelectEvent,
					handleDoubleClickEvent: this.handleDoubleClickEvent,
					handleDragStart,
					show: !!overlay.position,
					overlayDisplay: this.overlayDisplay,
					onHide: function onHide() {
						return _this4.setState({ overlay: null });
					}
				});
			}
		},
		{
			key: "clearSelection",
			value: function clearSelection() {
				clearTimeout(this._selectTimer);
				this._pendingSelection = [];
			}
		},
		{
			key: "measureGutter",
			value: function measureGutter() {
				var _this5 = this;
				if (this.measureGutterAnimationFrameRequest) window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
				this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(function() {
					var _this5$gutterRef;
					var width = (_this5$gutterRef = _this5.gutterRef) !== null && _this5$gutterRef !== void 0 && _this5$gutterRef.current ? getWidth(_this5.gutterRef.current) : void 0;
					if (width && _this5.state.gutterWidth !== width) _this5.setState({ gutterWidth: width });
				});
			}
		},
		{
			key: "applyScroll",
			value: function applyScroll() {
				if (this._scrollRatio != null && this.props.enableAutoScroll === true) {
					var content = this.contentRef.current;
					content.scrollTop = content.scrollHeight * this._scrollRatio;
					this._scrollRatio = null;
				}
			}
		},
		{
			key: "calculateScroll",
			value: function calculateScroll() {
				var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
				var min = props.min, max = props.max, scrollToTime = props.scrollToTime, localizer = props.localizer;
				var diffMillis = localizer.diff(localizer.merge(scrollToTime, min), scrollToTime, "milliseconds");
				var totalMillis = localizer.diff(min, max, "milliseconds");
				this._scrollRatio = diffMillis / totalMillis;
			}
		}
	]);
}(import_react.Component);
TimeGrid.propTypes = {};
TimeGrid.defaultProps = {
	step: 30,
	timeslots: 2,
	resourceGroupingLayout: false
};
var _excluded$4 = [
	"date",
	"localizer",
	"min",
	"max",
	"scrollToTime",
	"enableAutoScroll"
];
function _callSuper$3(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$3() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var Day = /*#__PURE__*/ function(_React$Component) {
	function Day() {
		_classCallCheck(this, Day);
		return _callSuper$3(this, Day, arguments);
	}
	_inherits(Day, _React$Component);
	return _createClass(Day, [{
		key: "render",
		value: function render() {
			/**
			* This allows us to default min, max, and scrollToTime
			* using our localizer. This is necessary until such time
			* as TODO: TimeGrid is converted to a functional component.
			*/
			var _this$props = this.props, date = _this$props.date, localizer = _this$props.localizer, _this$props$min = _this$props.min, min = _this$props$min === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$min, _this$props$max = _this$props.max, max = _this$props$max === void 0 ? localizer.endOf(/* @__PURE__ */ new Date(), "day") : _this$props$max, _this$props$scrollToT = _this$props.scrollToTime, scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$scrollToT, _this$props$enableAut = _this$props.enableAutoScroll, enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut, props = _objectWithoutProperties(_this$props, _excluded$4);
			var range = Day.range(date, { localizer });
			return /*#__PURE__*/ import_react.createElement(TimeGrid, _extends({}, props, {
				range,
				eventOffset: 10,
				localizer,
				min,
				max,
				scrollToTime,
				enableAutoScroll
			}));
		}
	}]);
}(import_react.Component);
Day.propTypes = {};
Day.range = function(date, _ref) {
	return [_ref.localizer.startOf(date, "day")];
};
Day.navigate = function(date, action, _ref2) {
	var localizer = _ref2.localizer;
	switch (action) {
		case navigate.PREVIOUS: return localizer.add(date, -1, "day");
		case navigate.NEXT: return localizer.add(date, 1, "day");
		default: return date;
	}
};
Day.title = function(date, _ref3) {
	return _ref3.localizer.format(date, "dayHeaderFormat");
};
var _excluded$3 = [
	"date",
	"localizer",
	"min",
	"max",
	"scrollToTime",
	"enableAutoScroll"
];
function _arrayLikeToArray$1(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _callSuper$2(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$2() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
var Week = /*#__PURE__*/ function(_React$Component) {
	function Week() {
		_classCallCheck(this, Week);
		return _callSuper$2(this, Week, arguments);
	}
	_inherits(Week, _React$Component);
	return _createClass(Week, [{
		key: "render",
		value: function render() {
			/**
			* This allows us to default min, max, and scrollToTime
			* using our localizer. This is necessary until such time
			* as TimeGrid is converted to a functional component.
			*/
			var _this$props = this.props, date = _this$props.date, localizer = _this$props.localizer, _this$props$min = _this$props.min, min = _this$props$min === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$min, _this$props$max = _this$props.max, max = _this$props$max === void 0 ? localizer.endOf(/* @__PURE__ */ new Date(), "day") : _this$props$max, _this$props$scrollToT = _this$props.scrollToTime, scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$scrollToT, _this$props$enableAut = _this$props.enableAutoScroll, enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut, props = _objectWithoutProperties(_this$props, _excluded$3);
			var range = Week.range(date, this.props);
			return /*#__PURE__*/ import_react.createElement(TimeGrid, _extends({}, props, {
				range,
				eventOffset: 15,
				localizer,
				min,
				max,
				scrollToTime,
				enableAutoScroll
			}));
		}
	}]);
}(import_react.Component);
Week.propTypes = {};
Week.defaultProps = TimeGrid.defaultProps;
Week.navigate = function(date, action, _ref) {
	var localizer = _ref.localizer;
	switch (action) {
		case navigate.PREVIOUS: return localizer.add(date, -1, "week");
		case navigate.NEXT: return localizer.add(date, 1, "week");
		default: return date;
	}
};
Week.range = function(date, _ref2) {
	var localizer = _ref2.localizer;
	var firstOfWeek = localizer.startOfWeek();
	var start = localizer.startOf(date, "week", firstOfWeek);
	var end = localizer.endOf(date, "week", firstOfWeek);
	return localizer.range(start, end);
};
Week.title = function(date, _ref3) {
	var localizer = _ref3.localizer;
	var _Week$range2 = _toArray(Week.range(date, { localizer })), start = _Week$range2[0], rest = _arrayLikeToArray$1(_Week$range2).slice(1);
	return localizer.format({
		start,
		end: rest.pop()
	}, "dayRangeHeaderFormat");
};
var _excluded$2 = [
	"date",
	"localizer",
	"min",
	"max",
	"scrollToTime",
	"enableAutoScroll"
];
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _callSuper$1(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct$1() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function workWeekRange(date, options) {
	return Week.range(date, options).filter(function(d) {
		return [6, 0].indexOf(d.getDay()) === -1;
	});
}
var WorkWeek = /*#__PURE__*/ function(_React$Component) {
	function WorkWeek() {
		_classCallCheck(this, WorkWeek);
		return _callSuper$1(this, WorkWeek, arguments);
	}
	_inherits(WorkWeek, _React$Component);
	return _createClass(WorkWeek, [{
		key: "render",
		value: function render() {
			/**
			* This allows us to default min, max, and scrollToTime
			* using our localizer. This is necessary until such time
			* as TimeGrid is converted to a functional component.
			*/
			var _this$props = this.props, date = _this$props.date, localizer = _this$props.localizer, _this$props$min = _this$props.min, min = _this$props$min === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$min, _this$props$max = _this$props.max, max = _this$props$max === void 0 ? localizer.endOf(/* @__PURE__ */ new Date(), "day") : _this$props$max, _this$props$scrollToT = _this$props.scrollToTime, scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(/* @__PURE__ */ new Date(), "day") : _this$props$scrollToT, _this$props$enableAut = _this$props.enableAutoScroll, enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut, props = _objectWithoutProperties(_this$props, _excluded$2);
			var range = workWeekRange(date, this.props);
			return /*#__PURE__*/ import_react.createElement(TimeGrid, _extends({}, props, {
				range,
				eventOffset: 15,
				localizer,
				min,
				max,
				scrollToTime,
				enableAutoScroll
			}));
		}
	}]);
}(import_react.Component);
WorkWeek.propTypes = {};
WorkWeek.defaultProps = TimeGrid.defaultProps;
WorkWeek.range = workWeekRange;
WorkWeek.navigate = Week.navigate;
WorkWeek.title = function(date, _ref) {
	var localizer = _ref.localizer;
	var _workWeekRange2 = _toArray(workWeekRange(date, { localizer })), start = _workWeekRange2[0], rest = _arrayLikeToArray(_workWeekRange2).slice(1);
	return localizer.format({
		start,
		end: rest.pop()
	}, "dayRangeHeaderFormat");
};
var DEFAULT_LENGTH = 30;
function Agenda(_ref) {
	var accessors = _ref.accessors, components = _ref.components, date = _ref.date, events = _ref.events, getters = _ref.getters, _ref$length = _ref.length, length = _ref$length === void 0 ? DEFAULT_LENGTH : _ref$length, localizer = _ref.localizer, onDoubleClickEvent = _ref.onDoubleClickEvent, onSelectEvent = _ref.onSelectEvent, selected = _ref.selected;
	var headerRef = (0, import_react.useRef)(null);
	var dateColRef = (0, import_react.useRef)(null);
	var timeColRef = (0, import_react.useRef)(null);
	var contentRef = (0, import_react.useRef)(null);
	var tbodyRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(function() {
		_adjustHeader();
	});
	var renderDay = function renderDay(day, events, dayKey) {
		var Event = components.event, AgendaDate = components.date;
		events = events.filter(function(e) {
			return inRange(e, localizer.startOf(day, "day"), localizer.endOf(day, "day"), accessors, localizer);
		});
		return events.map(function(event, idx) {
			var title = accessors.title(event);
			var end = accessors.end(event);
			var start = accessors.start(event);
			var userProps = getters.eventProp(event, start, end, isSelected(event, selected));
			var dateLabel = idx === 0 && localizer.format(day, "agendaDateFormat");
			var first = idx === 0 ? /*#__PURE__*/ import_react.createElement("td", {
				rowSpan: events.length,
				className: "rbc-agenda-date-cell"
			}, AgendaDate ? /*#__PURE__*/ import_react.createElement(AgendaDate, {
				day,
				label: dateLabel
			}) : dateLabel) : false;
			return /*#__PURE__*/ import_react.createElement("tr", {
				key: dayKey + "_" + idx,
				className: userProps.className,
				style: userProps.style
			}, first, /*#__PURE__*/ import_react.createElement("td", { className: "rbc-agenda-time-cell" }, timeRangeLabel(day, event)), /*#__PURE__*/ import_react.createElement("td", {
				className: "rbc-agenda-event-cell",
				onClick: function onClick(e) {
					return onSelectEvent && onSelectEvent(event, e);
				},
				onDoubleClick: function onDoubleClick(e) {
					return onDoubleClickEvent && onDoubleClickEvent(event, e);
				}
			}, Event ? /*#__PURE__*/ import_react.createElement(Event, {
				event,
				title
			}) : title));
		}, []);
	};
	var timeRangeLabel = function timeRangeLabel(day, event) {
		var labelClass = "", TimeComponent = components.time, label = localizer.messages.allDay;
		var end = accessors.end(event);
		var start = accessors.start(event);
		if (!accessors.allDay(event)) {
			if (localizer.eq(start, end)) label = localizer.format(start, "agendaTimeFormat");
			else if (localizer.isSameDate(start, end)) label = localizer.format({
				start,
				end
			}, "agendaTimeRangeFormat");
			else if (localizer.isSameDate(day, start)) label = localizer.format(start, "agendaTimeFormat");
			else if (localizer.isSameDate(day, end)) label = localizer.format(end, "agendaTimeFormat");
		}
		if (localizer.gt(day, start, "day")) labelClass = "rbc-continues-prior";
		if (localizer.lt(day, end, "day")) labelClass += " rbc-continues-after";
		return /*#__PURE__*/ import_react.createElement("span", { className: labelClass.trim() }, TimeComponent ? /*#__PURE__*/ import_react.createElement(TimeComponent, {
			event,
			day,
			label
		}) : label);
	};
	var _adjustHeader = function _adjustHeader() {
		if (!tbodyRef.current) return;
		var header = headerRef.current;
		var firstRow = tbodyRef.current.firstChild;
		if (!firstRow) return;
		var isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
		var _widths = [];
		var widths = _widths;
		_widths = [getWidth(firstRow.children[0]), getWidth(firstRow.children[1])];
		if (widths[0] !== _widths[0] || widths[1] !== _widths[1]) {
			dateColRef.current.style.width = _widths[0] + "px";
			timeColRef.current.style.width = _widths[1] + "px";
		}
		if (isOverflowing) {
			addClass(header, "rbc-header-overflowing");
			header.style.marginRight = scrollbarSize() + "px";
		} else removeClass(header, "rbc-header-overflowing");
	};
	var messages = localizer.messages;
	var end = localizer.add(date, length, "day");
	var range = localizer.range(date, end, "day");
	events = events.filter(function(event) {
		return inRange(event, localizer.startOf(date, "day"), localizer.endOf(end, "day"), accessors, localizer);
	});
	events.sort(function(a, b) {
		return +accessors.start(a) - +accessors.start(b);
	});
	return /*#__PURE__*/ import_react.createElement("div", { className: "rbc-agenda-view" }, events.length !== 0 ? /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement("table", {
		ref: headerRef,
		className: "rbc-agenda-table"
	}, /*#__PURE__*/ import_react.createElement("thead", null, /*#__PURE__*/ import_react.createElement("tr", null, /*#__PURE__*/ import_react.createElement("th", {
		className: "rbc-header",
		ref: dateColRef
	}, messages.date), /*#__PURE__*/ import_react.createElement("th", {
		className: "rbc-header",
		ref: timeColRef
	}, messages.time), /*#__PURE__*/ import_react.createElement("th", { className: "rbc-header" }, messages.event)))), /*#__PURE__*/ import_react.createElement("div", {
		className: "rbc-agenda-content",
		ref: contentRef
	}, /*#__PURE__*/ import_react.createElement("table", { className: "rbc-agenda-table" }, /*#__PURE__*/ import_react.createElement("tbody", { ref: tbodyRef }, range.map(function(day, idx) {
		return renderDay(day, events, idx);
	}))))) : /*#__PURE__*/ import_react.createElement("span", { className: "rbc-agenda-empty" }, messages.noEventsInRange));
}
Agenda.propTypes = {};
Agenda.range = function(start, _ref2) {
	var _ref2$length = _ref2.length, length = _ref2$length === void 0 ? DEFAULT_LENGTH : _ref2$length;
	return {
		start,
		end: _ref2.localizer.add(start, length, "day")
	};
};
Agenda.navigate = function(date, action, _ref3) {
	var _ref3$length = _ref3.length, length = _ref3$length === void 0 ? DEFAULT_LENGTH : _ref3$length, localizer = _ref3.localizer;
	switch (action) {
		case navigate.PREVIOUS: return localizer.add(date, -length, "day");
		case navigate.NEXT: return localizer.add(date, length, "day");
		default: return date;
	}
};
Agenda.title = function(start, _ref4) {
	var _ref4$length = _ref4.length, length = _ref4$length === void 0 ? DEFAULT_LENGTH : _ref4$length, localizer = _ref4.localizer;
	var end = localizer.add(start, length, "day");
	return localizer.format({
		start,
		end
	}, "agendaHeaderFormat");
};
var VIEWS = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, views$1.MONTH, MonthView), views$1.WEEK, Week), views$1.WORK_WEEK, WorkWeek), views$1.DAY, Day), views$1.AGENDA, Agenda);
var _excluded$1 = [
	"action",
	"date",
	"today"
];
function moveDate(View, _ref) {
	var action = _ref.action, date = _ref.date, today = _ref.today, props = _objectWithoutProperties(_ref, _excluded$1);
	View = typeof View === "string" ? VIEWS[View] : View;
	switch (action) {
		case navigate.TODAY:
			date = today || /* @__PURE__ */ new Date();
			break;
		case navigate.DATE: break;
		default:
			(0, import_invariant.default)(View && typeof View.navigate === "function", "Calendar View components must implement a static `.navigate(date, action)` method.s");
			date = View.navigate(date, action, props);
	}
	return date;
}
/**
* Retrieve via an accessor-like property
*
*    accessor(obj, 'name')   // => retrieves obj['name']
*    accessor(data, func)    // => retrieves func(data)
*    ... otherwise null
*/
function accessor(data, field) {
	var value = null;
	if (typeof field === "function") value = field(data);
	else if (typeof field === "string" && _typeof(data) === "object" && data != null && field in data) value = data[field];
	return value;
}
var wrapAccessor = function wrapAccessor(acc) {
	return function(data) {
		return accessor(data, acc);
	};
};
var _excluded = [
	"view",
	"date",
	"getNow",
	"onNavigate"
];
var _excluded2 = [
	"view",
	"toolbar",
	"events",
	"backgroundEvents",
	"resourceGroupingLayout",
	"style",
	"className",
	"elementProps",
	"date",
	"getNow",
	"length",
	"showMultiDayTimes",
	"onShowMore",
	"doShowMoreDrillDown",
	"components",
	"formats",
	"messages",
	"culture"
];
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), true).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _callSuper(t, o, e) {
	return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
	} catch (t) {}
	return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
		return !!t;
	})();
}
function viewNames(_views) {
	if (Array.isArray(_views)) return _views;
	var views = [];
	for (var _i = 0, _Object$entries = Object.entries(_views); _i < _Object$entries.length; _i++) {
		var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0];
		if (_Object$entries$_i[1]) views.push(key);
	}
	return views;
}
function isValidView(view, _ref) {
	var _views = _ref.views;
	return viewNames(_views).indexOf(view) !== -1;
}
var Calendar = /*#__PURE__*/ function(_React$Component) {
	function Calendar() {
		var _this;
		_classCallCheck(this, Calendar);
		for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) _args[_key] = arguments[_key];
		_this = _callSuper(this, Calendar, [].concat(_args));
		_this.getViews = function() {
			var views = _this.props.views;
			if (Array.isArray(views)) return (0, import_transform.default)(views, function(obj, name) {
				return obj[name] = VIEWS[name];
			}, {});
			if (_typeof(views) === "object") return (0, import_mapValues.default)(views, function(value, key) {
				if (value === true) return VIEWS[key];
				return value;
			});
			return VIEWS;
		};
		_this.getView = function() {
			return _this.getViews()[_this.props.view];
		};
		_this.getDrilldownView = function(date) {
			var _this$props = _this.props, view = _this$props.view, drilldownView = _this$props.drilldownView, getDrilldownView = _this$props.getDrilldownView;
			if (!getDrilldownView) return drilldownView;
			return getDrilldownView(date, view, Object.keys(_this.getViews()));
		};
		/**
		*
		* @param date
		* @param viewComponent
		* @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
		* parameter. It appears when range change on view changing. It could be handy
		* when you need to have both: range and view type at once, i.e. for manage rbc
		* state via url
		*/
		_this.handleRangeChange = function(date, viewComponent, view) {
			var _this$props2 = _this.props, onRangeChange = _this$props2.onRangeChange, localizer = _this$props2.localizer;
			if (onRangeChange) {
				if (viewComponent.range) onRangeChange(viewComponent.range(date, { localizer }), view);
			}
		};
		_this.handleNavigate = function(action, newDate) {
			var _this$props3 = _this.props, view = _this$props3.view, date = _this$props3.date, getNow = _this$props3.getNow, onNavigate = _this$props3.onNavigate, props = _objectWithoutProperties(_this$props3, _excluded);
			var ViewComponent = _this.getView();
			var today = getNow();
			date = moveDate(ViewComponent, _objectSpread(_objectSpread({}, props), {}, {
				action,
				date: newDate || date || today,
				today
			}));
			onNavigate(date, view, action);
			_this.handleRangeChange(date, ViewComponent);
		};
		_this.handleViewChange = function(view) {
			if (view !== _this.props.view && isValidView(view, _this.props)) _this.props.onView(view);
			var views = _this.getViews();
			_this.handleRangeChange(_this.props.date || _this.props.getNow(), views[view], view);
		};
		_this.handleSelectEvent = function() {
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
			notify(_this.props.onSelectEvent, args);
		};
		_this.handleDoubleClickEvent = function() {
			for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
			notify(_this.props.onDoubleClickEvent, args);
		};
		_this.handleKeyPressEvent = function() {
			for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
			notify(_this.props.onKeyPressEvent, args);
		};
		_this.handleSelectSlot = function(slotInfo) {
			notify(_this.props.onSelectSlot, slotInfo);
		};
		_this.handleDrillDown = function(date, view) {
			var onDrillDown = _this.props.onDrillDown;
			if (onDrillDown) {
				onDrillDown(date, view, _this.drilldownView);
				return;
			}
			if (view) _this.handleViewChange(view);
			_this.handleNavigate(navigate.DATE, date);
		};
		_this.state = { context: Calendar.getContext(_this.props) };
		return _this;
	}
	_inherits(Calendar, _React$Component);
	return _createClass(Calendar, [{
		key: "render",
		value: function render() {
			var _this$props4 = this.props, view = _this$props4.view, toolbar = _this$props4.toolbar, events = _this$props4.events, backgroundEvents = _this$props4.backgroundEvents, resourceGroupingLayout = _this$props4.resourceGroupingLayout, style = _this$props4.style, className = _this$props4.className, elementProps = _this$props4.elementProps, current = _this$props4.date, getNow = _this$props4.getNow, length = _this$props4.length, showMultiDayTimes = _this$props4.showMultiDayTimes, onShowMore = _this$props4.onShowMore, doShowMoreDrillDown = _this$props4.doShowMoreDrillDown;
			_this$props4.components;
			_this$props4.formats;
			_this$props4.messages;
			_this$props4.culture;
			var props = _objectWithoutProperties(_this$props4, _excluded2);
			current = current || getNow();
			var View = this.getView();
			var _this$state$context = this.state.context, accessors = _this$state$context.accessors, components = _this$state$context.components, getters = _this$state$context.getters, localizer = _this$state$context.localizer, viewNames = _this$state$context.viewNames;
			var CalToolbar = components.toolbar || Toolbar;
			var label = View.title(current, {
				localizer,
				length
			});
			return /*#__PURE__*/ import_react.createElement("div", _extends({}, elementProps, {
				className: clsx(className, "rbc-calendar", props.rtl && "rbc-rtl"),
				style
			}), toolbar && /*#__PURE__*/ import_react.createElement(CalToolbar, {
				date: current,
				view,
				views: viewNames,
				label,
				onView: this.handleViewChange,
				onNavigate: this.handleNavigate,
				localizer
			}), /*#__PURE__*/ import_react.createElement(View, _extends({}, props, {
				events,
				backgroundEvents,
				date: current,
				getNow,
				length,
				localizer,
				getters,
				components,
				accessors,
				showMultiDayTimes,
				getDrilldownView: this.getDrilldownView,
				onNavigate: this.handleNavigate,
				onDrillDown: this.handleDrillDown,
				onSelectEvent: this.handleSelectEvent,
				onDoubleClickEvent: this.handleDoubleClickEvent,
				onKeyPressEvent: this.handleKeyPressEvent,
				onSelectSlot: this.handleSelectSlot,
				onShowMore,
				doShowMoreDrillDown,
				resourceGroupingLayout
			})));
		}
	}], [{
		key: "getDerivedStateFromProps",
		value: function getDerivedStateFromProps(nextProps) {
			return { context: Calendar.getContext(nextProps) };
		}
	}, {
		key: "getContext",
		value: function getContext(_ref2) {
			var startAccessor = _ref2.startAccessor, endAccessor = _ref2.endAccessor, allDayAccessor = _ref2.allDayAccessor, tooltipAccessor = _ref2.tooltipAccessor, titleAccessor = _ref2.titleAccessor, resourceAccessor = _ref2.resourceAccessor, resourceIdAccessor = _ref2.resourceIdAccessor, resourceTitleAccessor = _ref2.resourceTitleAccessor, eventIdAccessor = _ref2.eventIdAccessor, eventPropGetter = _ref2.eventPropGetter, backgroundEventPropGetter = _ref2.backgroundEventPropGetter, slotPropGetter = _ref2.slotPropGetter, slotGroupPropGetter = _ref2.slotGroupPropGetter, dayPropGetter = _ref2.dayPropGetter, view = _ref2.view, views = _ref2.views, localizer = _ref2.localizer, culture = _ref2.culture, _ref2$messages = _ref2.messages, messages$1 = _ref2$messages === void 0 ? {} : _ref2$messages, _ref2$components = _ref2.components, components = _ref2$components === void 0 ? {} : _ref2$components, _ref2$formats = _ref2.formats, formats = _ref2$formats === void 0 ? {} : _ref2$formats;
			var names = viewNames(views);
			return {
				viewNames: names,
				localizer: mergeWithDefaults(localizer, culture, formats, messages(messages$1)),
				getters: {
					eventProp: function eventProp() {
						return eventPropGetter && eventPropGetter.apply(void 0, arguments) || {};
					},
					backgroundEventProp: function backgroundEventProp() {
						return backgroundEventPropGetter && backgroundEventPropGetter.apply(void 0, arguments) || {};
					},
					slotProp: function slotProp() {
						return slotPropGetter && slotPropGetter.apply(void 0, arguments) || {};
					},
					slotGroupProp: function slotGroupProp() {
						return slotGroupPropGetter && slotGroupPropGetter.apply(void 0, arguments) || {};
					},
					dayProp: function dayProp() {
						return dayPropGetter && dayPropGetter.apply(void 0, arguments) || {};
					}
				},
				components: (0, import_defaults.default)(components[view] || {}, (0, import_omit.default)(components, names), {
					eventWrapper: NoopWrapper,
					backgroundEventWrapper: NoopWrapper,
					eventContainerWrapper: NoopWrapper,
					dateCellWrapper: NoopWrapper,
					weekWrapper: NoopWrapper,
					timeSlotWrapper: NoopWrapper,
					timeGutterWrapper: NoopWrapper,
					timeIndicatorWrapper: NoopWrapper
				}),
				accessors: {
					start: wrapAccessor(startAccessor),
					end: wrapAccessor(endAccessor),
					allDay: wrapAccessor(allDayAccessor),
					tooltip: wrapAccessor(tooltipAccessor),
					title: wrapAccessor(titleAccessor),
					resource: wrapAccessor(resourceAccessor),
					resourceId: wrapAccessor(resourceIdAccessor),
					resourceTitle: wrapAccessor(resourceTitleAccessor),
					eventId: wrapAccessor(eventIdAccessor)
				}
			};
		}
	}]);
}(import_react.Component);
Calendar.defaultProps = {
	events: [],
	backgroundEvents: [],
	elementProps: {},
	popup: false,
	toolbar: true,
	view: views$1.MONTH,
	views: [
		views$1.MONTH,
		views$1.WEEK,
		views$1.DAY,
		views$1.AGENDA
	],
	step: 30,
	length: 30,
	allDayMaxRows: Infinity,
	doShowMoreDrillDown: true,
	drilldownView: views$1.DAY,
	titleAccessor: "title",
	tooltipAccessor: "title",
	allDayAccessor: "allDay",
	startAccessor: "start",
	endAccessor: "end",
	resourceAccessor: "resourceId",
	resourceIdAccessor: "id",
	resourceTitleAccessor: "title",
	eventIdAccessor: "id",
	longPressThreshold: 250,
	getNow: function getNow() {
		return /* @__PURE__ */ new Date();
	},
	dayLayoutAlgorithm: "overlap"
};
Calendar.propTypes = {};
var Calendar_default = uncontrollable(Calendar, {
	view: "onView",
	date: "onNavigate",
	selected: "onSelectEvent"
});
var dateRangeFormat$1 = function dateRangeFormat(_ref, culture, local) {
	var start = _ref.start, end = _ref.end;
	return "".concat(local.format(start, "P", culture), " – ").concat(local.format(end, "P", culture));
};
var timeRangeFormat$1 = function timeRangeFormat(_ref2, culture, local) {
	var start = _ref2.start, end = _ref2.end;
	return "".concat(local.format(start, "p", culture), " – ").concat(local.format(end, "p", culture));
};
var formats$1 = {
	dateFormat: "dd",
	dayFormat: "dd eee",
	weekdayFormat: "ccc",
	selectRangeFormat: timeRangeFormat$1,
	eventTimeRangeFormat: timeRangeFormat$1,
	eventTimeRangeStartFormat: function timeRangeStartFormat(_ref3, culture, local) {
		var start = _ref3.start;
		return "".concat(local.format(start, "h:mma", culture), " – ");
	},
	eventTimeRangeEndFormat: function timeRangeEndFormat(_ref4, culture, local) {
		var end = _ref4.end;
		return " – ".concat(local.format(end, "h:mma", culture));
	},
	timeGutterFormat: "p",
	monthHeaderFormat: "MMMM yyyy",
	dayHeaderFormat: "cccc MMM dd",
	dayRangeHeaderFormat: function weekRangeFormat(_ref5, culture, local) {
		var start = _ref5.start, end = _ref5.end;
		return "".concat(local.format(start, "MMMM dd", culture), " – ").concat(local.format(end, eq(start, end, "month") ? "dd" : "MMMM dd", culture));
	},
	agendaHeaderFormat: dateRangeFormat$1,
	agendaDateFormat: "ccc MMM dd",
	agendaTimeFormat: "p",
	agendaTimeRangeFormat: timeRangeFormat$1
};
var dateFnsLocalizer = function dateFnsLocalizer(_ref6) {
	var startOfWeek = _ref6.startOfWeek, getDay = _ref6.getDay, _format = _ref6.format, locales = _ref6.locales;
	return new DateLocalizer({
		formats: formats$1,
		firstOfWeek: function firstOfWeek(culture) {
			return getDay(startOfWeek(/* @__PURE__ */ new Date(), { locale: locales[culture] }));
		},
		format: function format(value, formatString, culture) {
			return _format(new Date(value), formatString, { locale: locales[culture] });
		}
	});
};
//#endregion
//#region node_modules/react-big-calendar/lib/utils/constants.js
var require_constants = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.views = exports.navigate = void 0;
	exports.navigate = {
		PREVIOUS: "PREV",
		NEXT: "NEXT",
		TODAY: "TODAY",
		DATE: "DATE"
	};
	exports.views = {
		MONTH: "month",
		WEEK: "week",
		WORK_WEEK: "work_week",
		DAY: "day",
		AGENDA: "agenda"
	};
}));
//#endregion
//#region node_modules/react-big-calendar/lib/utils/propTypes.js
var require_propTypes = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.views = exports.dateRangeFormat = exports.dateFormat = exports.accessor = exports.DayLayoutAlgorithmPropType = void 0;
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _constants = require_constants();
	var viewNames = Object.keys(_constants.views).map(function(k) {
		return _constants.views[k];
	});
	exports.accessor = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]);
	exports.dateFormat = _propTypes.default.any;
	exports.dateRangeFormat = _propTypes.default.func;
	exports.views = _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOf(viewNames)), _propTypes.default.objectOf(function(prop, key) {
		if (viewNames.indexOf(key) !== -1 && typeof prop[key] === "boolean") return null;
		else {
			for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
			return _propTypes.default.elementType.apply(_propTypes.default, [prop, key].concat(args));
		}
	})]);
	exports.DayLayoutAlgorithmPropType = _propTypes.default.oneOfType([_propTypes.default.oneOf(["overlap", "no-overlap"]), _propTypes.default.func]);
}));
//#endregion
//#region node_modules/react-big-calendar/lib/utils/accessors.js
var require_accessors = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.accessor = accessor;
	exports.wrapAccessor = void 0;
	var _typeof2 = _interopRequireDefault(require_typeof());
	/**
	* Retrieve via an accessor-like property
	*
	*    accessor(obj, 'name')   // => retrieves obj['name']
	*    accessor(data, func)    // => retrieves func(data)
	*    ... otherwise null
	*/
	function accessor(data, field) {
		var value = null;
		if (typeof field === "function") value = field(data);
		else if (typeof field === "string" && (0, _typeof2.default)(data) === "object" && data != null && field in data) value = data[field];
		return value;
	}
	exports.wrapAccessor = function wrapAccessor(acc) {
		return function(data) {
			return accessor(data, acc);
		};
	};
}));
//#endregion
//#region node_modules/react-big-calendar/lib/addons/dragAndDrop/DnDContext.js
var require_DnDContext = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DnDContext = void 0;
	exports.DnDContext = /*#__PURE__*/ _interopRequireDefault(require_react()).default.createContext();
}));
//#endregion
//#region node_modules/react-big-calendar/lib/addons/dragAndDrop/EventWrapper.js
var require_EventWrapper = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
	var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
	var _inherits2 = _interopRequireDefault(require_inherits());
	_interopRequireDefault(require_prop_types());
	var _react = _interopRequireDefault(require_react());
	var _clsx = _interopRequireDefault(require_clsx());
	var _accessors = require_accessors();
	var _DnDContext = require_DnDContext();
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				(0, _defineProperty2.default)(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _callSuper(t, o, e) {
		return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e));
	}
	function _isNativeReflectConstruct() {
		try {
			var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
		} catch (t) {}
		return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
			return !!t;
		})();
	}
	var EventWrapper = /*#__PURE__*/ function(_React$Component) {
		function EventWrapper() {
			var _this;
			(0, _classCallCheck2.default)(this, EventWrapper);
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _callSuper(this, EventWrapper, [].concat(args));
			_this.handleResizeUp = function(e) {
				if (e.button !== 0) return;
				_this.context.draggable.onBeginAction(_this.props.event, "resize", "UP");
			};
			_this.handleResizeDown = function(e) {
				if (e.button !== 0) return;
				_this.context.draggable.onBeginAction(_this.props.event, "resize", "DOWN");
			};
			_this.handleResizeLeft = function(e) {
				if (e.button !== 0) return;
				_this.context.draggable.onBeginAction(_this.props.event, "resize", "LEFT");
			};
			_this.handleResizeRight = function(e) {
				if (e.button !== 0) return;
				_this.context.draggable.onBeginAction(_this.props.event, "resize", "RIGHT");
			};
			_this.handleStartDragging = function(e) {
				var _e$target$getAttribut;
				if (e.button !== 0) return;
				if (!((_e$target$getAttribut = e.target.getAttribute("class")) === null || _e$target$getAttribut === void 0 ? void 0 : _e$target$getAttribut.includes("rbc-addons-dnd-resize"))) {
					var extendedEvent = _objectSpread({}, _this.props.event);
					extendedEvent.sourceResource = _this.props.resource;
					_this.context.draggable.onBeginAction(_this.props.event, "move");
				}
			};
			return _this;
		}
		(0, _inherits2.default)(EventWrapper, _React$Component);
		return (0, _createClass2.default)(EventWrapper, [{
			key: "renderAnchor",
			value: function renderAnchor(direction) {
				var cls = direction === "Up" || direction === "Down" ? "ns" : "ew";
				return /*#__PURE__*/ _react.default.createElement("div", {
					className: "rbc-addons-dnd-resize-".concat(cls, "-anchor"),
					onMouseDown: this["handleResize".concat(direction)]
				}, /*#__PURE__*/ _react.default.createElement("div", { className: "rbc-addons-dnd-resize-".concat(cls, "-icon") }));
			}
		}, {
			key: "render",
			value: function render() {
				var _this$props = this.props, event = _this$props.event, type = _this$props.type, continuesPrior = _this$props.continuesPrior, continuesAfter = _this$props.continuesAfter, resizable = _this$props.resizable;
				var children = this.props.children;
				if (event.__isPreview) return /*#__PURE__*/ _react.default.cloneElement(children, { className: (0, _clsx.default)(children.props.className, "rbc-addons-dnd-drag-preview") });
				var draggable = this.context.draggable;
				var draggableAccessor = draggable.draggableAccessor, resizableAccessor = draggable.resizableAccessor;
				var isDraggable = draggableAccessor ? !!(0, _accessors.accessor)(event, draggableAccessor) : true;
				if (!isDraggable) return children;
				var isResizable = resizable && (resizableAccessor ? !!(0, _accessors.accessor)(event, resizableAccessor) : true);
				if (isResizable || isDraggable) {
					var newProps = {
						onMouseDown: this.handleStartDragging,
						onTouchStart: this.handleStartDragging
					};
					if (isResizable) {
						var StartAnchor = null;
						var EndAnchor = null;
						if (type === "date") {
							StartAnchor = !continuesPrior && this.renderAnchor("Left");
							EndAnchor = !continuesAfter && this.renderAnchor("Right");
						} else {
							StartAnchor = !continuesPrior && this.renderAnchor("Up");
							EndAnchor = !continuesAfter && this.renderAnchor("Down");
						}
						newProps.children = /*#__PURE__*/ _react.default.createElement("div", { className: "rbc-addons-dnd-resizable" }, StartAnchor, children.props.children, EndAnchor);
					}
					if (draggable.dragAndDropAction.interacting && draggable.dragAndDropAction.event === event) newProps.className = (0, _clsx.default)(children.props.className, "rbc-addons-dnd-dragged-event");
					children = /*#__PURE__*/ _react.default.cloneElement(children, newProps);
				}
				return children;
			}
		}]);
	}(_react.default.Component);
	EventWrapper.contextType = _DnDContext.DnDContext;
	EventWrapper.propTypes = {};
	exports.default = EventWrapper;
}));
//#endregion
//#region node_modules/react-big-calendar/lib/Selection.js
var require_Selection = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.getBoundsForNode = getBoundsForNode;
	exports.getEventNodeFromPoint = getEventNodeFromPoint;
	exports.getShowMoreNodeFromPoint = getShowMoreNodeFromPoint;
	exports.isEvent = isEvent;
	exports.isShowMore = isShowMore;
	exports.objectsCollide = objectsCollide;
	var _typeof2 = _interopRequireDefault(require_typeof());
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var _contains = _interopRequireDefault((init_contains(), __toCommonJS(contains_exports)));
	var _closest = _interopRequireDefault((init_closest(), __toCommonJS(closest_exports)));
	var _listen = _interopRequireDefault((init_listen(), __toCommonJS(listen_exports)));
	function addEventListener(type, handler) {
		var target = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : document;
		return (0, _listen.default)(target, type, handler, { passive: false });
	}
	function isOverContainer(container, x, y) {
		return !container || (0, _contains.default)(container, document.elementFromPoint(x, y));
	}
	function getEventNodeFromPoint(node, _ref) {
		var clientX = _ref.clientX, clientY = _ref.clientY;
		var target = document.elementFromPoint(clientX, clientY);
		return (0, _closest.default)(target, ".rbc-event", node);
	}
	function getShowMoreNodeFromPoint(node, _ref2) {
		var clientX = _ref2.clientX, clientY = _ref2.clientY;
		var target = document.elementFromPoint(clientX, clientY);
		return (0, _closest.default)(target, ".rbc-show-more", node);
	}
	function isEvent(node, bounds) {
		return !!getEventNodeFromPoint(node, bounds);
	}
	function isShowMore(node, bounds) {
		return !!getShowMoreNodeFromPoint(node, bounds);
	}
	function getEventCoordinates(e) {
		var target = e;
		if (e.touches && e.touches.length) target = e.touches[0];
		return {
			clientX: target.clientX,
			clientY: target.clientY,
			pageX: target.pageX,
			pageY: target.pageY
		};
	}
	var clickTolerance = 5;
	var clickInterval = 250;
	var Selection = /*#__PURE__*/ function() {
		function Selection(node) {
			var _ref3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref3$global = _ref3.global, global = _ref3$global === void 0 ? false : _ref3$global, _ref3$longPressThresh = _ref3.longPressThreshold, longPressThreshold = _ref3$longPressThresh === void 0 ? 250 : _ref3$longPressThresh, _ref3$validContainers = _ref3.validContainers, validContainers = _ref3$validContainers === void 0 ? [] : _ref3$validContainers;
			(0, _classCallCheck2.default)(this, Selection);
			this._initialEvent = null;
			this.selecting = false;
			this.isDetached = false;
			this.container = node;
			this.globalMouse = !node || global;
			this.longPressThreshold = longPressThreshold;
			this.validContainers = validContainers;
			this._listeners = Object.create(null);
			this._handleInitialEvent = this._handleInitialEvent.bind(this);
			this._handleMoveEvent = this._handleMoveEvent.bind(this);
			this._handleTerminatingEvent = this._handleTerminatingEvent.bind(this);
			this._keyListener = this._keyListener.bind(this);
			this._dropFromOutsideListener = this._dropFromOutsideListener.bind(this);
			this._dragOverFromOutsideListener = this._dragOverFromOutsideListener.bind(this);
			this._removeTouchMoveWindowListener = addEventListener("touchmove", function() {}, window);
			this._removeKeyDownListener = addEventListener("keydown", this._keyListener);
			this._removeKeyUpListener = addEventListener("keyup", this._keyListener);
			this._removeDropFromOutsideListener = addEventListener("drop", this._dropFromOutsideListener);
			this._removeDragOverFromOutsideListener = addEventListener("dragover", this._dragOverFromOutsideListener);
			this._addInitialEventListener();
		}
		return (0, _createClass2.default)(Selection, [
			{
				key: "on",
				value: function on(type, handler) {
					var handlers = this._listeners[type] || (this._listeners[type] = []);
					handlers.push(handler);
					return { remove: function remove() {
						var idx = handlers.indexOf(handler);
						if (idx !== -1) handlers.splice(idx, 1);
					} };
				}
			},
			{
				key: "emit",
				value: function emit(type) {
					for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
					var result;
					(this._listeners[type] || []).forEach(function(fn) {
						if (result === void 0) result = fn.apply(void 0, args);
					});
					return result;
				}
			},
			{
				key: "teardown",
				value: function teardown() {
					this._initialEvent = null;
					this._initialEventData = null;
					this._selectRect = null;
					this.selecting = false;
					this._lastClickData = null;
					this.isDetached = true;
					this._listeners = Object.create(null);
					this._removeTouchMoveWindowListener && this._removeTouchMoveWindowListener();
					this._removeInitialEventListener && this._removeInitialEventListener();
					this._removeEndListener && this._removeEndListener();
					this._onEscListener && this._onEscListener();
					this._removeMoveListener && this._removeMoveListener();
					this._removeKeyUpListener && this._removeKeyUpListener();
					this._removeKeyDownListener && this._removeKeyDownListener();
					this._removeDropFromOutsideListener && this._removeDropFromOutsideListener();
					this._removeDragOverFromOutsideListener && this._removeDragOverFromOutsideListener();
				}
			},
			{
				key: "isSelected",
				value: function isSelected(node) {
					var box = this._selectRect;
					if (!box || !this.selecting) return false;
					return objectsCollide(box, getBoundsForNode(node));
				}
			},
			{
				key: "filter",
				value: function filter(items) {
					if (!this._selectRect || !this.selecting) return [];
					return items.filter(this.isSelected, this);
				}
			},
			{
				key: "_addLongPressListener",
				value: function _addLongPressListener(handler, initialEvent) {
					var _this = this;
					var timer = null;
					var removeTouchMoveListener = null;
					var removeTouchEndListener = null;
					var handleTouchStart = function handleTouchStart(initialEvent) {
						timer = setTimeout(function() {
							cleanup();
							handler(initialEvent);
						}, _this.longPressThreshold);
						removeTouchMoveListener = addEventListener("touchmove", function() {
							return cleanup();
						});
						removeTouchEndListener = addEventListener("touchend", function() {
							return cleanup();
						});
					};
					var removeTouchStartListener = addEventListener("touchstart", handleTouchStart);
					var cleanup = function cleanup() {
						if (timer) clearTimeout(timer);
						if (removeTouchMoveListener) removeTouchMoveListener();
						if (removeTouchEndListener) removeTouchEndListener();
						timer = null;
						removeTouchMoveListener = null;
						removeTouchEndListener = null;
					};
					if (initialEvent) handleTouchStart(initialEvent);
					return function() {
						cleanup();
						removeTouchStartListener();
					};
				}
			},
			{
				key: "_addInitialEventListener",
				value: function _addInitialEventListener() {
					var _this2 = this;
					var removeMouseDownListener = addEventListener("mousedown", function(e) {
						_this2._removeInitialEventListener();
						_this2._handleInitialEvent(e);
						_this2._removeInitialEventListener = addEventListener("mousedown", _this2._handleInitialEvent);
					});
					var removeTouchStartListener = addEventListener("touchstart", function(e) {
						_this2._removeInitialEventListener();
						_this2._removeInitialEventListener = _this2._addLongPressListener(_this2._handleInitialEvent, e);
					});
					this._removeInitialEventListener = function() {
						removeMouseDownListener();
						removeTouchStartListener();
					};
				}
			},
			{
				key: "_dropFromOutsideListener",
				value: function _dropFromOutsideListener(e) {
					var _getEventCoordinates = getEventCoordinates(e), pageX = _getEventCoordinates.pageX, pageY = _getEventCoordinates.pageY, clientX = _getEventCoordinates.clientX, clientY = _getEventCoordinates.clientY;
					this.emit("dropFromOutside", {
						x: pageX,
						y: pageY,
						clientX,
						clientY
					});
					e.preventDefault();
				}
			},
			{
				key: "_dragOverFromOutsideListener",
				value: function _dragOverFromOutsideListener(e) {
					var _getEventCoordinates2 = getEventCoordinates(e), pageX = _getEventCoordinates2.pageX, pageY = _getEventCoordinates2.pageY, clientX = _getEventCoordinates2.clientX, clientY = _getEventCoordinates2.clientY;
					this.emit("dragOverFromOutside", {
						x: pageX,
						y: pageY,
						clientX,
						clientY
					});
					e.preventDefault();
				}
			},
			{
				key: "_handleInitialEvent",
				value: function _handleInitialEvent(e) {
					this._initialEvent = e;
					if (this.isDetached) return;
					var _getEventCoordinates3 = getEventCoordinates(e), clientX = _getEventCoordinates3.clientX, clientY = _getEventCoordinates3.clientY, pageX = _getEventCoordinates3.pageX, pageY = _getEventCoordinates3.pageY;
					var node = this.container(), collides, offsetData;
					if (e.which === 3 || e.button === 2 || !isOverContainer(node, clientX, clientY)) return;
					if (!this.globalMouse && node && !(0, _contains.default)(node, e.target)) {
						var _normalizeDistance = normalizeDistance(0), top = _normalizeDistance.top, left = _normalizeDistance.left, bottom = _normalizeDistance.bottom, right = _normalizeDistance.right;
						offsetData = getBoundsForNode(node);
						collides = objectsCollide({
							top: offsetData.top - top,
							left: offsetData.left - left,
							bottom: offsetData.bottom + bottom,
							right: offsetData.right + right
						}, {
							top: pageY,
							left: pageX
						});
						if (!collides) return;
					}
					if (this.emit("beforeSelect", this._initialEventData = {
						isTouch: /^touch/.test(e.type),
						x: pageX,
						y: pageY,
						clientX,
						clientY
					}) === false) return;
					switch (e.type) {
						case "mousedown":
							this._removeEndListener = addEventListener("mouseup", this._handleTerminatingEvent);
							this._onEscListener = addEventListener("keydown", this._handleTerminatingEvent);
							this._removeMoveListener = addEventListener("mousemove", this._handleMoveEvent);
							break;
						case "touchstart":
							this._handleMoveEvent(e);
							this._removeEndListener = addEventListener("touchend", this._handleTerminatingEvent);
							this._removeMoveListener = addEventListener("touchmove", this._handleMoveEvent);
							break;
						default: break;
					}
				}
			},
			{
				key: "_isWithinValidContainer",
				value: function _isWithinValidContainer(e) {
					var eventTarget = e.target;
					var containers = this.validContainers;
					if (!containers || !containers.length || !eventTarget) return true;
					return containers.some(function(target) {
						return !!eventTarget.closest(target);
					});
				}
			},
			{
				key: "_handleTerminatingEvent",
				value: function _handleTerminatingEvent(e) {
					var selecting = this.selecting;
					var bounds = this._selectRect;
					if (!selecting && e.type.includes("key")) e = this._initialEvent;
					this.selecting = false;
					this._removeEndListener && this._removeEndListener();
					this._removeMoveListener && this._removeMoveListener();
					this._selectRect = null;
					this._initialEvent = null;
					this._initialEventData = null;
					if (!e) return;
					var inRoot = !this.container || (0, _contains.default)(this.container(), e.target);
					var isWithinValidContainer = this._isWithinValidContainer(e);
					if (e.key === "Escape" || !isWithinValidContainer) return this.emit("reset");
					if (!selecting && inRoot) return this._handleClickEvent(e);
					if (selecting) return this.emit("select", bounds);
					return this.emit("reset");
				}
			},
			{
				key: "_handleClickEvent",
				value: function _handleClickEvent(e) {
					var _getEventCoordinates4 = getEventCoordinates(e), pageX = _getEventCoordinates4.pageX, pageY = _getEventCoordinates4.pageY, clientX = _getEventCoordinates4.clientX, clientY = _getEventCoordinates4.clientY;
					var now = (/* @__PURE__ */ new Date()).getTime();
					if (this._lastClickData && now - this._lastClickData.timestamp < clickInterval) {
						this._lastClickData = null;
						return this.emit("doubleClick", {
							x: pageX,
							y: pageY,
							clientX,
							clientY
						});
					}
					this._lastClickData = { timestamp: now };
					return this.emit("click", {
						x: pageX,
						y: pageY,
						clientX,
						clientY
					});
				}
			},
			{
				key: "_handleMoveEvent",
				value: function _handleMoveEvent(e) {
					if (this._initialEventData === null || this.isDetached) return;
					var _this$_initialEventDa = this._initialEventData, x = _this$_initialEventDa.x, y = _this$_initialEventDa.y;
					var _getEventCoordinates5 = getEventCoordinates(e), pageX = _getEventCoordinates5.pageX, pageY = _getEventCoordinates5.pageY;
					var w = Math.abs(x - pageX);
					var h = Math.abs(y - pageY);
					var left = Math.min(pageX, x), top = Math.min(pageY, y), old = this.selecting;
					var click = this.isClick(pageX, pageY);
					if (click && !old && !(w || h)) return;
					if (!old && !click) this.emit("selectStart", this._initialEventData);
					if (!click) {
						this.selecting = true;
						this._selectRect = {
							top,
							left,
							x: pageX,
							y: pageY,
							right: left + w,
							bottom: top + h
						};
						this.emit("selecting", this._selectRect);
					}
					e.preventDefault();
				}
			},
			{
				key: "_keyListener",
				value: function _keyListener(e) {
					this.ctrl = e.metaKey || e.ctrlKey;
				}
			},
			{
				key: "isClick",
				value: function isClick(pageX, pageY) {
					var _this$_initialEventDa2 = this._initialEventData, x = _this$_initialEventDa2.x, y = _this$_initialEventDa2.y;
					return !_this$_initialEventDa2.isTouch && Math.abs(pageX - x) <= clickTolerance && Math.abs(pageY - y) <= clickTolerance;
				}
			}
		]);
	}();
	/**
	* Resolve the disance prop from either an Int or an Object
	* @return {Object}
	*/
	function normalizeDistance() {
		var distance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
		if ((0, _typeof2.default)(distance) !== "object") distance = {
			top: distance,
			left: distance,
			right: distance,
			bottom: distance
		};
		return distance;
	}
	/**
	* Given two objects containing "top", "left", "offsetWidth" and "offsetHeight"
	* properties, determine if they collide.
	* @param  {Object|HTMLElement} a
	* @param  {Object|HTMLElement} b
	* @return {bool}
	*/
	function objectsCollide(nodeA, nodeB) {
		var tolerance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
		var _getBoundsForNode = getBoundsForNode(nodeA), aTop = _getBoundsForNode.top, aLeft = _getBoundsForNode.left, _getBoundsForNode$rig = _getBoundsForNode.right, aRight = _getBoundsForNode$rig === void 0 ? aLeft : _getBoundsForNode$rig, _getBoundsForNode$bot = _getBoundsForNode.bottom, aBottom = _getBoundsForNode$bot === void 0 ? aTop : _getBoundsForNode$bot;
		var _getBoundsForNode2 = getBoundsForNode(nodeB), bTop = _getBoundsForNode2.top, bLeft = _getBoundsForNode2.left, _getBoundsForNode2$ri = _getBoundsForNode2.right, bRight = _getBoundsForNode2$ri === void 0 ? bLeft : _getBoundsForNode2$ri, _getBoundsForNode2$bo = _getBoundsForNode2.bottom, bBottom = _getBoundsForNode2$bo === void 0 ? bTop : _getBoundsForNode2$bo;
		return !(aBottom - tolerance < bTop || aTop + tolerance > bBottom || aRight - tolerance < bLeft || aLeft + tolerance > bRight);
	}
	/**
	* Given a node, get everything needed to calculate its boundaries
	* @param  {HTMLElement} node
	* @return {Object}
	*/
	function getBoundsForNode(node) {
		if (!node.getBoundingClientRect) return node;
		var rect = node.getBoundingClientRect(), left = rect.left + pageOffset("left"), top = rect.top + pageOffset("top");
		return {
			top,
			left,
			right: (node.offsetWidth || 0) + left,
			bottom: (node.offsetHeight || 0) + top
		};
	}
	function pageOffset(dir) {
		if (dir === "left") return window.pageXOffset || document.body.scrollLeft || 0;
		if (dir === "top") return window.pageYOffset || document.body.scrollTop || 0;
	}
	exports.default = Selection;
}));
//#endregion
//#region node_modules/react-big-calendar/lib/TimeGridEvent.js
var require_TimeGridEvent = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _extends2 = _interopRequireDefault(require_extends());
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _clsx = _interopRequireDefault(require_clsx());
	var _react = _interopRequireDefault(require_react());
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				(0, _defineProperty2.default)(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function stringifyPercent(v) {
		return typeof v === "string" ? v : v + "%";
	}
	function TimeGridEvent(props) {
		var style = props.style, className = props.className, event = props.event, accessors = props.accessors, rtl = props.rtl, selected = props.selected, label = props.label, continuesPrior = props.continuesPrior, continuesAfter = props.continuesAfter, getters = props.getters, onClick = props.onClick, onDoubleClick = props.onDoubleClick, isBackgroundEvent = props.isBackgroundEvent, onKeyPress = props.onKeyPress, _props$components = props.components, Event = _props$components.event, EventWrapper = _props$components.eventWrapper;
		var title = accessors.title(event);
		var tooltip = accessors.tooltip(event);
		var end = accessors.end(event);
		var start = accessors.start(event);
		var userProps = getters.eventProp(event, start, end, selected);
		var inner = [/*#__PURE__*/ _react.default.createElement("div", {
			key: "1",
			className: "rbc-event-label"
		}, label), /*#__PURE__*/ _react.default.createElement("div", {
			key: "2",
			className: "rbc-event-content"
		}, Event ? /*#__PURE__*/ _react.default.createElement(Event, {
			event,
			title
		}) : title)];
		var height = style.height, top = style.top, width = style.width, xOffset = style.xOffset;
		var eventStyle = _objectSpread(_objectSpread({}, userProps.style), {}, (0, _defineProperty2.default)({
			top: stringifyPercent(top),
			height: stringifyPercent(height),
			width: stringifyPercent(width)
		}, rtl ? "right" : "left", stringifyPercent(xOffset)));
		return /*#__PURE__*/ _react.default.createElement(EventWrapper, (0, _extends2.default)({ type: "time" }, props), /*#__PURE__*/ _react.default.createElement("div", {
			role: "button",
			tabIndex: 0,
			onClick,
			onDoubleClick,
			style: eventStyle,
			onKeyDown: onKeyPress,
			title: tooltip ? (typeof label === "string" ? label + ": " : "") + tooltip : void 0,
			className: (0, _clsx.default)(isBackgroundEvent ? "rbc-background-event" : "rbc-event", className, userProps.className, {
				"rbc-selected": selected,
				"rbc-event-continues-earlier": continuesPrior,
				"rbc-event-continues-later": continuesAfter
			})
		}, inner));
	}
	exports.default = TimeGridEvent;
}));
//#endregion
//#region node_modules/react-big-calendar/lib/addons/dragAndDrop/common.js
var require_common = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.dragAccessors = void 0;
	exports.eventTimes = eventTimes;
	exports.mergeComponents = mergeComponents;
	exports.pointInColumn = pointInColumn;
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _objectWithoutProperties2 = _interopRequireDefault(require_objectWithoutProperties());
	var _accessors = require_accessors();
	var _react = require_react();
	var _excluded = ["children"];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				(0, _defineProperty2.default)(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	exports.dragAccessors = {
		start: (0, _accessors.wrapAccessor)(function(e) {
			return e.start;
		}),
		end: (0, _accessors.wrapAccessor)(function(e) {
			return e.end;
		})
	};
	function nest() {
		for (var _len = arguments.length, Components = new Array(_len), _key = 0; _key < _len; _key++) Components[_key] = arguments[_key];
		return function Nest(_ref) {
			var children = _ref.children, props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
			return Components.filter(Boolean).reduceRight(function(child, Component) {
				return /*#__PURE__*/ (0, _react.createElement)(Component, props, child);
			}, children);
		};
	}
	function mergeComponents() {
		var components = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var addons = arguments.length > 1 ? arguments[1] : void 0;
		var keys = Object.keys(addons);
		var result = _objectSpread({}, components);
		keys.forEach(function(key) {
			result[key] = components[key] ? nest(components[key], addons[key]) : addons[key];
		});
		return result;
	}
	function pointInColumn(bounds, point) {
		var left = bounds.left, right = bounds.right, top = bounds.top;
		var x = point.x, y = point.y;
		return x < right + 10 && x > left && y > top;
	}
	function eventTimes(event, accessors, localizer) {
		var start = accessors.start(event);
		var end = accessors.end(event);
		if (localizer.eq(start, end, "minutes") && localizer.diff(start, end, "minutes") === 0) end = localizer.add(end, 1, "day");
		var duration = localizer.diff(start, end, "milliseconds");
		return {
			start,
			end,
			duration
		};
	}
}));
//#endregion
//#region node_modules/react-big-calendar/lib/addons/dragAndDrop/EventContainerWrapper.js
var require_EventContainerWrapper = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	var _typeof = require_typeof();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
	var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
	var _inherits2 = _interopRequireDefault(require_inherits());
	var _domHelpers = (init_esm(), __toCommonJS(esm_exports));
	var _querySelectorAll = _interopRequireDefault((init_querySelectorAll(), __toCommonJS(querySelectorAll_exports)));
	_interopRequireDefault(require_prop_types());
	var _react = _interopRequireDefault(require_react());
	var _DnDContext = require_DnDContext();
	var _Selection = _interopRequireWildcard(require_Selection());
	var _TimeGridEvent = _interopRequireDefault(require_TimeGridEvent());
	var _common = require_common();
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != _typeof(e) && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]);
			return f;
		})(e, t);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				(0, _defineProperty2.default)(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _callSuper(t, o, e) {
		return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e));
	}
	function _isNativeReflectConstruct() {
		try {
			var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
		} catch (t) {}
		return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
			return !!t;
		})();
	}
	var EventContainerWrapper = /*#__PURE__*/ function(_React$Component) {
		function EventContainerWrapper() {
			var _this;
			(0, _classCallCheck2.default)(this, EventContainerWrapper);
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _callSuper(this, EventContainerWrapper, [].concat(args));
			_this.handleMove = function(point, bounds) {
				if (!(0, _common.pointInColumn)(bounds, point)) return _this.reset();
				var event = _this.context.draggable.dragAndDropAction.event;
				var _this$props = _this.props, accessors = _this$props.accessors, slotMetrics = _this$props.slotMetrics;
				var newSlot = slotMetrics.closestSlotFromPoint({
					y: point.y - _this.eventOffsetTop,
					x: point.x
				}, bounds);
				var duration = (0, _common.eventTimes)(event, accessors, _this.props.localizer).duration;
				var newEnd = _this.props.localizer.add(newSlot, duration, "milliseconds");
				_this.update(event, slotMetrics.getRange(newSlot, newEnd, false, true));
			};
			_this.handleDropFromOutside = function(point, boundaryBox) {
				var _this$props2 = _this.props, slotMetrics = _this$props2.slotMetrics, resource = _this$props2.resource;
				var start = slotMetrics.closestSlotFromPoint({
					y: point.y,
					x: point.x
				}, boundaryBox);
				var end = _this._calculateDnDEnd(start);
				_this.context.draggable.onDropFromOutside({
					start,
					end,
					allDay: false,
					resource
				});
				_this.reset();
			};
			_this.handleDragOverFromOutside = function(point, bounds) {
				var slotMetrics = _this.props.slotMetrics;
				var start = slotMetrics.closestSlotFromPoint({
					y: point.y,
					x: point.x
				}, bounds);
				var end = _this._calculateDnDEnd(start);
				var event = _this.context.draggable.dragFromOutsideItem();
				_this.update(event, slotMetrics.getRange(start, end, false, true));
			};
			_this._calculateDnDEnd = function(start) {
				var _this$props3 = _this.props, accessors = _this$props3.accessors, slotMetrics = _this$props3.slotMetrics, localizer = _this$props3.localizer;
				var event = _this.context.draggable.dragFromOutsideItem();
				var eventDuration = (0, _common.eventTimes)(event, accessors, localizer).duration;
				var end = slotMetrics.nextSlot(start);
				if (!isNaN(eventDuration)) {
					var eventEndSlot = localizer.add(start, eventDuration, "milliseconds");
					end = new Date(Math.max(eventEndSlot, end));
				}
				return end;
			};
			_this.updateParentScroll = function(parent, node) {
				setTimeout(function() {
					var draggedEl = (0, _querySelectorAll.default)(node, ".rbc-addons-dnd-drag-preview")[0];
					if (draggedEl) {
						if (draggedEl.offsetTop < parent.scrollTop) (0, _domHelpers.scrollTop)(parent, Math.max(draggedEl.offsetTop, 0));
						else if (draggedEl.offsetTop + draggedEl.offsetHeight > parent.scrollTop + parent.clientHeight) (0, _domHelpers.scrollTop)(parent, Math.min(draggedEl.offsetTop - parent.offsetHeight + draggedEl.offsetHeight, parent.scrollHeight));
					}
				});
			};
			_this._selectable = function() {
				var wrapper = _this.ref.current;
				var node = wrapper.children[0];
				var isBeingDragged = false;
				var selector = _this._selector = new _Selection.default(function() {
					return wrapper.closest(".rbc-time-view");
				});
				var parent = (0, _domHelpers.scrollParent)(wrapper);
				selector.on("beforeSelect", function(point) {
					var dragAndDropAction = _this.context.draggable.dragAndDropAction;
					if (!dragAndDropAction.action) return false;
					if (dragAndDropAction.action === "resize") return (0, _common.pointInColumn)((0, _Selection.getBoundsForNode)(node), point);
					var eventNode = (0, _Selection.getEventNodeFromPoint)(node, point);
					if (!eventNode) return false;
					_this.eventOffsetTop = point.y - (0, _Selection.getBoundsForNode)(eventNode).top;
				});
				selector.on("selecting", function(box) {
					var bounds = (0, _Selection.getBoundsForNode)(node);
					var dragAndDropAction = _this.context.draggable.dragAndDropAction;
					if (dragAndDropAction.action === "move") {
						_this.updateParentScroll(parent, node);
						_this.handleMove(box, bounds);
					}
					if (dragAndDropAction.action === "resize") {
						_this.updateParentScroll(parent, node);
						_this.handleResize(box, bounds);
					}
				});
				selector.on("dropFromOutside", function(point) {
					if (!_this.context.draggable.onDropFromOutside) return;
					var bounds = (0, _Selection.getBoundsForNode)(node);
					if (!(0, _common.pointInColumn)(bounds, point)) return;
					_this.handleDropFromOutside(point, bounds);
				});
				selector.on("dragOverFromOutside", function(point) {
					if (!(_this.context.draggable.dragFromOutsideItem ? _this.context.draggable.dragFromOutsideItem() : null)) return;
					var bounds = (0, _Selection.getBoundsForNode)(node);
					if (!(0, _common.pointInColumn)(bounds, point)) return _this.reset();
					_this.handleDragOverFromOutside(point, bounds);
				});
				selector.on("selectStart", function() {
					isBeingDragged = true;
					_this.context.draggable.onStart();
				});
				selector.on("select", function(point) {
					var bounds = (0, _Selection.getBoundsForNode)(node);
					isBeingDragged = false;
					if (_this.context.draggable.dragAndDropAction.action === "resize") _this.handleInteractionEnd();
					else if (!_this.state.event || !(0, _common.pointInColumn)(bounds, point)) return;
					else _this.handleInteractionEnd();
				});
				selector.on("click", function() {
					if (isBeingDragged) _this.reset();
					_this.context.draggable.onEnd(null);
				});
				selector.on("reset", function() {
					_this.reset();
					_this.context.draggable.onEnd(null);
				});
			};
			_this.handleInteractionEnd = function() {
				var resource = _this.props.resource;
				var event = _this.state.event;
				_this.reset();
				_this.context.draggable.onEnd({
					start: event.start,
					end: event.end,
					resourceId: resource
				});
			};
			_this._teardownSelectable = function() {
				if (!_this._selector) return;
				_this._selector.teardown();
				_this._selector = null;
			};
			_this.state = {};
			_this.ref = /*#__PURE__*/ _react.default.createRef();
			return _this;
		}
		(0, _inherits2.default)(EventContainerWrapper, _React$Component);
		return (0, _createClass2.default)(EventContainerWrapper, [
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					this._selectable();
				}
			},
			{
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					this._teardownSelectable();
				}
			},
			{
				key: "reset",
				value: function reset() {
					if (this.state.event) this.setState({
						event: null,
						top: null,
						height: null
					});
				}
			},
			{
				key: "update",
				value: function update(event, _ref) {
					var startDate = _ref.startDate, endDate = _ref.endDate, top = _ref.top, height = _ref.height;
					var lastEvent = this.state.event;
					if (lastEvent && startDate === lastEvent.start && endDate === lastEvent.end) return;
					this.setState({
						top,
						height,
						event: _objectSpread(_objectSpread({}, event), {}, {
							start: startDate,
							end: endDate
						})
					});
				}
			},
			{
				key: "handleResize",
				value: function handleResize(point, bounds) {
					var _this$props4 = this.props, accessors = _this$props4.accessors, slotMetrics = _this$props4.slotMetrics, localizer = _this$props4.localizer;
					var _this$context$draggab = this.context.draggable.dragAndDropAction, event = _this$context$draggab.event, direction = _this$context$draggab.direction;
					var newTime = slotMetrics.closestSlotFromPoint(point, bounds);
					var _eventTimes3 = (0, _common.eventTimes)(event, accessors, localizer), start = _eventTimes3.start, end = _eventTimes3.end;
					var newRange;
					if (direction === "UP") {
						var newStart = localizer.min(newTime, slotMetrics.closestSlotFromDate(end, -1));
						newRange = slotMetrics.getRange(newStart, end);
						newRange = _objectSpread(_objectSpread({}, newRange), {}, { endDate: end });
					} else if (direction === "DOWN") {
						var newEnd = localizer.max(newTime, slotMetrics.closestSlotFromDate(start));
						newRange = slotMetrics.getRange(start, newEnd);
						newRange = _objectSpread(_objectSpread({}, newRange), {}, { startDate: start });
					}
					this.update(event, newRange);
				}
			},
			{
				key: "renderContent",
				value: function renderContent() {
					var _this$props5 = this.props, children = _this$props5.children, accessors = _this$props5.accessors, components = _this$props5.components, getters = _this$props5.getters, slotMetrics = _this$props5.slotMetrics, localizer = _this$props5.localizer;
					var _this$state = this.state, event = _this$state.event, top = _this$state.top, height = _this$state.height;
					if (!event) return children;
					var events = children.props.children;
					var start = event.start, end = event.end;
					var label;
					var format = "eventTimeRangeFormat";
					var startsBeforeDay = slotMetrics.startsBeforeDay(start);
					var startsAfterDay = slotMetrics.startsAfterDay(end);
					if (startsBeforeDay) format = "eventTimeRangeEndFormat";
					else if (startsAfterDay) format = "eventTimeRangeStartFormat";
					if (startsBeforeDay && startsAfterDay) label = localizer.messages.allDay;
					else label = localizer.format({
						start,
						end
					}, format);
					return /*#__PURE__*/ _react.default.cloneElement(children, { children: /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, events, event && /*#__PURE__*/ _react.default.createElement(_TimeGridEvent.default, {
						event,
						label,
						className: "rbc-addons-dnd-drag-preview",
						style: {
							top,
							height,
							width: 100
						},
						getters,
						components,
						accessors: _objectSpread(_objectSpread({}, accessors), _common.dragAccessors),
						continuesPrior: startsBeforeDay,
						continuesAfter: startsAfterDay
					})) });
				}
			},
			{
				key: "render",
				value: function render() {
					return /*#__PURE__*/ _react.default.createElement("div", { ref: this.ref }, this.renderContent());
				}
			}
		]);
	}(_react.default.Component);
	EventContainerWrapper.contextType = _DnDContext.DnDContext;
	EventContainerWrapper.propTypes = {};
	exports.default = EventContainerWrapper;
}));
//#endregion
//#region node_modules/react-big-calendar/lib/EventCell.js
var require_EventCell = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _extends2 = _interopRequireDefault(require_extends());
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _objectWithoutProperties2 = _interopRequireDefault(require_objectWithoutProperties());
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
	var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
	var _inherits2 = _interopRequireDefault(require_inherits());
	_interopRequireDefault(require_prop_types());
	var _react = _interopRequireDefault(require_react());
	var _clsx = _interopRequireDefault(require_clsx());
	var _excluded = [
		"style",
		"className",
		"event",
		"selected",
		"isAllDay",
		"onSelect",
		"onDoubleClick",
		"onKeyPress",
		"localizer",
		"continuesPrior",
		"continuesAfter",
		"accessors",
		"getters",
		"children",
		"components",
		"slotStart",
		"slotEnd"
	];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				(0, _defineProperty2.default)(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _callSuper(t, o, e) {
		return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e));
	}
	function _isNativeReflectConstruct() {
		try {
			var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
		} catch (t) {}
		return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
			return !!t;
		})();
	}
	var EventCell = /*#__PURE__*/ function(_React$Component) {
		function EventCell() {
			(0, _classCallCheck2.default)(this, EventCell);
			return _callSuper(this, EventCell, arguments);
		}
		(0, _inherits2.default)(EventCell, _React$Component);
		return (0, _createClass2.default)(EventCell, [{
			key: "render",
			value: function render() {
				var _this$props = this.props, style = _this$props.style, className = _this$props.className, event = _this$props.event, selected = _this$props.selected, isAllDay = _this$props.isAllDay, onSelect = _this$props.onSelect, _onDoubleClick = _this$props.onDoubleClick, onKeyPress = _this$props.onKeyPress, localizer = _this$props.localizer, continuesPrior = _this$props.continuesPrior, continuesAfter = _this$props.continuesAfter, accessors = _this$props.accessors, getters = _this$props.getters, children = _this$props.children, _this$props$component = _this$props.components, Event = _this$props$component.event, EventWrapper = _this$props$component.eventWrapper, slotStart = _this$props.slotStart, slotEnd = _this$props.slotEnd, props = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
				delete props.resizable;
				var title = accessors.title(event);
				var tooltip = accessors.tooltip(event);
				var end = accessors.end(event);
				var start = accessors.start(event);
				var allDay = accessors.allDay(event);
				var showAsAllDay = isAllDay || allDay || localizer.diff(start, localizer.ceil(end, "day"), "day") > 1;
				var userProps = getters.eventProp(event, start, end, selected);
				var content = /*#__PURE__*/ _react.default.createElement("div", {
					className: "rbc-event-content",
					title: tooltip || void 0
				}, Event ? /*#__PURE__*/ _react.default.createElement(Event, {
					event,
					continuesPrior,
					continuesAfter,
					title,
					isAllDay: allDay,
					localizer,
					slotStart,
					slotEnd
				}) : title);
				return /*#__PURE__*/ _react.default.createElement(EventWrapper, (0, _extends2.default)({}, this.props, { type: "date" }), /*#__PURE__*/ _react.default.createElement("div", (0, _extends2.default)({}, props, {
					style: _objectSpread(_objectSpread({}, userProps.style), style),
					className: (0, _clsx.default)("rbc-event", className, userProps.className, {
						"rbc-selected": selected,
						"rbc-event-allday": showAsAllDay,
						"rbc-event-continues-prior": continuesPrior,
						"rbc-event-continues-after": continuesAfter
					}),
					onClick: function onClick(e) {
						return onSelect && onSelect(event, e);
					},
					onDoubleClick: function onDoubleClick(e) {
						return _onDoubleClick && _onDoubleClick(event, e);
					},
					onKeyDown: function onKeyDown(e) {
						return onKeyPress && onKeyPress(event, e);
					}
				}), typeof children === "function" ? children(content) : content));
			}
		}]);
	}(_react.default.Component);
	EventCell.propTypes = {};
	exports.default = EventCell;
}));
//#endregion
//#region node_modules/react-big-calendar/lib/utils/selection.js
var require_selection = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.dateCellSelection = dateCellSelection;
	exports.getSlotAtX = getSlotAtX;
	exports.isSelected = isSelected;
	exports.pointInBox = pointInBox;
	exports.slotWidth = slotWidth;
	var _isEqual = _interopRequireDefault(require_isEqual());
	function isSelected(event, selected) {
		if (!event || selected == null) return false;
		return (0, _isEqual.default)(event, selected);
	}
	function slotWidth(rowBox, slots) {
		return (rowBox.right - rowBox.left) / slots;
	}
	function getSlotAtX(rowBox, x, rtl, slots) {
		var cellWidth = slotWidth(rowBox, slots);
		return rtl ? slots - 1 - Math.floor((x - rowBox.left) / cellWidth) : Math.floor((x - rowBox.left) / cellWidth);
	}
	function pointInBox(box, _ref) {
		var x = _ref.x, y = _ref.y;
		return y >= box.top && y <= box.bottom && x >= box.left && x <= box.right;
	}
	function dateCellSelection(start, rowBox, box, slots, rtl) {
		var startIdx = -1;
		var endIdx = -1;
		var lastSlotIdx = slots - 1;
		var cellWidth = slotWidth(rowBox, slots);
		var currentSlot = getSlotAtX(rowBox, box.x, rtl, slots);
		var isCurrentRow = rowBox.top < box.y && rowBox.bottom > box.y;
		var isStartRow = rowBox.top < start.y && rowBox.bottom > start.y;
		var isAboveStart = start.y > rowBox.bottom;
		var isBelowStart = rowBox.top > start.y;
		if (box.top < rowBox.top && box.bottom > rowBox.bottom) {
			startIdx = 0;
			endIdx = lastSlotIdx;
		}
		if (isCurrentRow) {
			if (isBelowStart) {
				startIdx = 0;
				endIdx = currentSlot;
			} else if (isAboveStart) {
				startIdx = currentSlot;
				endIdx = lastSlotIdx;
			}
		}
		if (isStartRow) {
			startIdx = endIdx = rtl ? lastSlotIdx - Math.floor((start.x - rowBox.left) / cellWidth) : Math.floor((start.x - rowBox.left) / cellWidth);
			if (isCurrentRow) if (currentSlot < startIdx) startIdx = currentSlot;
			else endIdx = currentSlot;
			else if (start.y < box.y) endIdx = lastSlotIdx;
			else startIdx = 0;
		}
		return {
			startIdx,
			endIdx
		};
	}
}));
//#endregion
//#region node_modules/react-big-calendar/lib/EventRowMixin.js
var require_EventRowMixin = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _propTypes = _interopRequireDefault(require_prop_types());
	var _react = _interopRequireDefault(require_react());
	var _EventCell = _interopRequireDefault(require_EventCell());
	var _selection = require_selection();
	exports.default = {
		propTypes: {
			slotMetrics: _propTypes.default.object.isRequired,
			selected: _propTypes.default.object,
			isAllDay: _propTypes.default.bool,
			accessors: _propTypes.default.object.isRequired,
			localizer: _propTypes.default.object.isRequired,
			components: _propTypes.default.object.isRequired,
			getters: _propTypes.default.object.isRequired,
			onSelect: _propTypes.default.func,
			onDoubleClick: _propTypes.default.func,
			onKeyPress: _propTypes.default.func
		},
		defaultProps: {
			segments: [],
			selected: {}
		},
		renderEvent: function renderEvent(props, event) {
			var selected = props.selected;
			props.isAllDay;
			var accessors = props.accessors, getters = props.getters, onSelect = props.onSelect, onDoubleClick = props.onDoubleClick, onKeyPress = props.onKeyPress, localizer = props.localizer, slotMetrics = props.slotMetrics, components = props.components, resizable = props.resizable;
			var continuesPrior = slotMetrics.continuesPrior(event);
			var continuesAfter = slotMetrics.continuesAfter(event);
			return /*#__PURE__*/ _react.default.createElement(_EventCell.default, {
				event,
				getters,
				localizer,
				accessors,
				components,
				onSelect,
				onDoubleClick,
				onKeyPress,
				continuesPrior,
				continuesAfter,
				slotStart: slotMetrics.first,
				slotEnd: slotMetrics.last,
				selected: (0, _selection.isSelected)(event, selected),
				resizable
			});
		},
		renderSpan: function renderSpan(slots, len, key) {
			var content = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ";
			var per = Math.abs(len) / slots * 100 + "%";
			return /*#__PURE__*/ _react.default.createElement("div", {
				key,
				className: "rbc-row-segment",
				style: {
					WebkitFlexBasis: per,
					flexBasis: per,
					maxWidth: per
				}
			}, content);
		}
	};
}));
//#endregion
//#region node_modules/react-big-calendar/lib/EventRow.js
var require_EventRow = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
	var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
	var _inherits2 = _interopRequireDefault(require_inherits());
	_interopRequireDefault(require_prop_types());
	var _clsx = _interopRequireDefault(require_clsx());
	var _react = _interopRequireDefault(require_react());
	var _EventRowMixin = _interopRequireDefault(require_EventRowMixin());
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				(0, _defineProperty2.default)(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _callSuper(t, o, e) {
		return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e));
	}
	function _isNativeReflectConstruct() {
		try {
			var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
		} catch (t) {}
		return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
			return !!t;
		})();
	}
	var EventRow = /*#__PURE__*/ function(_React$Component) {
		function EventRow() {
			(0, _classCallCheck2.default)(this, EventRow);
			return _callSuper(this, EventRow, arguments);
		}
		(0, _inherits2.default)(EventRow, _React$Component);
		return (0, _createClass2.default)(EventRow, [{
			key: "render",
			value: function render() {
				var _this = this;
				var _this$props = this.props, segments = _this$props.segments, slots = _this$props.slotMetrics.slots, className = _this$props.className;
				var lastEnd = 1;
				return /*#__PURE__*/ _react.default.createElement("div", { className: (0, _clsx.default)(className, "rbc-row") }, segments.reduce(function(row, _ref, li) {
					var event = _ref.event, left = _ref.left, right = _ref.right, span = _ref.span;
					var key = "_lvl_" + li;
					var gap = left - lastEnd;
					var content = _EventRowMixin.default.renderEvent(_this.props, event);
					if (gap) row.push(_EventRowMixin.default.renderSpan(slots, gap, "".concat(key, "_gap")));
					row.push(_EventRowMixin.default.renderSpan(slots, span, key, content));
					lastEnd = right + 1;
					return row;
				}, []));
			}
		}]);
	}(_react.default.Component);
	EventRow.propTypes = {};
	EventRow.defaultProps = _objectSpread({}, _EventRowMixin.default.defaultProps);
	exports.default = EventRow;
}));
//#endregion
//#region node_modules/react-big-calendar/lib/utils/eventLevels.js
var require_eventLevels = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.endOfRange = endOfRange;
	exports.eventLevels = eventLevels;
	exports.eventSegments = eventSegments;
	exports.inRange = inRange;
	exports.segsOverlap = segsOverlap;
	exports.sortEvents = sortEvents;
	exports.sortWeekEvents = sortWeekEvents;
	var _toConsumableArray2 = _interopRequireDefault(require_toConsumableArray());
	var _findIndex = _interopRequireDefault(require_findIndex());
	function endOfRange(_ref) {
		var dateRange = _ref.dateRange, _ref$unit = _ref.unit, unit = _ref$unit === void 0 ? "day" : _ref$unit, localizer = _ref.localizer;
		return {
			first: dateRange[0],
			last: localizer.add(dateRange[dateRange.length - 1], 1, unit)
		};
	}
	function eventSegments(event, range, accessors, localizer) {
		var _endOfRange = endOfRange({
			dateRange: range,
			localizer
		}), first = _endOfRange.first, last = _endOfRange.last;
		var slots = localizer.diff(first, last, "day");
		var start = localizer.max(localizer.startOf(accessors.start(event), "day"), first);
		var end = localizer.min(localizer.ceil(accessors.end(event), "day"), last);
		var padding = (0, _findIndex.default)(range, function(x) {
			return localizer.isSameDate(x, start);
		});
		var span = localizer.diff(start, end, "day");
		span = Math.min(span, slots);
		span = Math.max(span - localizer.segmentOffset, 1);
		return {
			event,
			span,
			left: padding + 1,
			right: Math.max(padding + span, 1)
		};
	}
	function eventLevels(rowSegments) {
		var limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Infinity;
		var i, j, seg, levels = [], extra = [];
		for (i = 0; i < rowSegments.length; i++) {
			seg = rowSegments[i];
			for (j = 0; j < levels.length; j++) if (!segsOverlap(seg, levels[j])) break;
			if (j >= limit) extra.push(seg);
			else (levels[j] || (levels[j] = [])).push(seg);
		}
		for (i = 0; i < levels.length; i++) levels[i].sort(function(a, b) {
			return a.left - b.left;
		});
		return {
			levels,
			extra
		};
	}
	function inRange(e, start, end, accessors, localizer) {
		var event = {
			start: accessors.start(e),
			end: accessors.end(e)
		};
		var range = {
			start,
			end
		};
		return localizer.inEventRange({
			event,
			range
		});
	}
	function segsOverlap(seg, otherSegs) {
		return otherSegs.some(function(otherSeg) {
			return otherSeg.left <= seg.right && otherSeg.right >= seg.left;
		});
	}
	function sortWeekEvents(events, accessors, localizer) {
		var base = (0, _toConsumableArray2.default)(events);
		var multiDayEvents = [];
		var standardEvents = [];
		base.forEach(function(event) {
			var startCheck = accessors.start(event);
			var endCheck = accessors.end(event);
			if (localizer.daySpan(startCheck, endCheck) > 1) multiDayEvents.push(event);
			else standardEvents.push(event);
		});
		var multiSorted = multiDayEvents.sort(function(a, b) {
			return sortEvents(a, b, accessors, localizer);
		});
		var standardSorted = standardEvents.sort(function(a, b) {
			return sortEvents(a, b, accessors, localizer);
		});
		return [].concat((0, _toConsumableArray2.default)(multiSorted), (0, _toConsumableArray2.default)(standardSorted));
	}
	function sortEvents(eventA, eventB, accessors, localizer) {
		var evtA = {
			start: accessors.start(eventA),
			end: accessors.end(eventA),
			allDay: accessors.allDay(eventA)
		};
		var evtB = {
			start: accessors.start(eventB),
			end: accessors.end(eventB),
			allDay: accessors.allDay(eventB)
		};
		return localizer.sortEvents({
			evtA,
			evtB
		});
	}
}));
//#endregion
//#region node_modules/react-big-calendar/lib/addons/dragAndDrop/WeekWrapper.js
var require_WeekWrapper = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	var _typeof = require_typeof();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _extends2 = _interopRequireDefault(require_extends());
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _toConsumableArray2 = _interopRequireDefault(require_toConsumableArray());
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
	var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
	var _inherits2 = _interopRequireDefault(require_inherits());
	_interopRequireDefault(require_prop_types());
	var _react = _interopRequireDefault(require_react());
	var _EventRow = _interopRequireDefault(require_EventRow());
	var _Selection = _interopRequireWildcard(require_Selection());
	var _eventLevels = require_eventLevels();
	var _selection = require_selection();
	var _common = require_common();
	var _DnDContext = require_DnDContext();
	function _interopRequireWildcard(e, t) {
		if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
		return (_interopRequireWildcard = function _interopRequireWildcard(e, t) {
			if (!t && e && e.__esModule) return e;
			var o, i, f = {
				__proto__: null,
				default: e
			};
			if (null === e || "object" != _typeof(e) && "function" != typeof e) return f;
			if (o = t ? n : r) {
				if (o.has(e)) return o.get(e);
				o.set(e, f);
			}
			for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]);
			return f;
		})(e, t);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				(0, _defineProperty2.default)(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _callSuper(t, o, e) {
		return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e));
	}
	function _isNativeReflectConstruct() {
		try {
			var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
		} catch (t) {}
		return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
			return !!t;
		})();
	}
	var WeekWrapper = /*#__PURE__*/ function(_React$Component) {
		function WeekWrapper() {
			var _this;
			(0, _classCallCheck2.default)(this, WeekWrapper);
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			_this = _callSuper(this, WeekWrapper, [].concat(args));
			_this.handleMove = function(point, bounds, draggedEvent) {
				if (!(0, _selection.pointInBox)(bounds, point)) return _this.reset();
				var event = _this.context.draggable.dragAndDropAction.event || draggedEvent;
				var _this$props = _this.props, accessors = _this$props.accessors, slotMetrics = _this$props.slotMetrics, rtl = _this$props.rtl, localizer = _this$props.localizer;
				var slot = (0, _selection.getSlotAtX)(bounds, point.x, rtl, slotMetrics.slots);
				var date = slotMetrics.getDateForSlot(slot);
				var _eventTimes = (0, _common.eventTimes)(event, accessors, localizer), start = _eventTimes.start, duration = _eventTimes.duration;
				start = localizer.merge(date, start);
				var end = localizer.add(start, duration, "milliseconds");
				_this.update(event, start, end);
			};
			_this.handleDropFromOutside = function(point, bounds) {
				if (!_this.context.draggable.onDropFromOutside) return;
				var _this$props2 = _this.props, slotMetrics = _this$props2.slotMetrics, rtl = _this$props2.rtl, localizer = _this$props2.localizer;
				var slot = (0, _selection.getSlotAtX)(bounds, point.x, rtl, slotMetrics.slots);
				var start = slotMetrics.getDateForSlot(slot);
				_this.context.draggable.onDropFromOutside({
					start,
					end: localizer.add(start, 1, "day"),
					allDay: false
				});
			};
			_this.handleDragOverFromOutside = function(point, node) {
				var item = _this.context.draggable.dragFromOutsideItem ? _this.context.draggable.dragFromOutsideItem() : null;
				if (!item) return;
				_this.handleMove(point, node, item);
			};
			_this._selectable = function() {
				var node = _this.ref.current.closest(".rbc-month-row, .rbc-allday-cell");
				var container = node.closest(".rbc-month-view, .rbc-time-view");
				var isMonthRow = node.classList.contains("rbc-month-row");
				var selector = _this._selector = new _Selection.default(function() {
					return container;
				}, { validContainers: (0, _toConsumableArray2.default)(!isMonthRow ? [".rbc-day-slot", ".rbc-allday-cell"] : []) });
				selector.on("beforeSelect", function(point) {
					var isAllDay = _this.props.isAllDay;
					var action = _this.context.draggable.dragAndDropAction.action;
					var bounds = (0, _Selection.getBoundsForNode)(node);
					var isInBox = (0, _selection.pointInBox)(bounds, point);
					return action === "move" || action === "resize" && (!isAllDay || isInBox);
				});
				selector.on("selecting", function(box) {
					var bounds = (0, _Selection.getBoundsForNode)(node);
					var dragAndDropAction = _this.context.draggable.dragAndDropAction;
					if (dragAndDropAction.action === "move") _this.handleMove(box, bounds);
					if (dragAndDropAction.action === "resize") _this.handleResize(box, bounds);
				});
				selector.on("selectStart", function() {
					return _this.context.draggable.onStart();
				});
				selector.on("select", function(point) {
					var bounds = (0, _Selection.getBoundsForNode)(node);
					if (!_this.state.segment) return;
					if (!(0, _selection.pointInBox)(bounds, point)) _this.reset();
					else _this.handleInteractionEnd();
				});
				selector.on("dropFromOutside", function(point) {
					if (!_this.context.draggable.onDropFromOutside) return;
					var bounds = (0, _Selection.getBoundsForNode)(node);
					if (!(0, _selection.pointInBox)(bounds, point)) return;
					_this.handleDropFromOutside(point, bounds);
				});
				selector.on("dragOverFromOutside", function(point) {
					if (!_this.context.draggable.dragFromOutsideItem) return;
					var bounds = (0, _Selection.getBoundsForNode)(node);
					_this.handleDragOverFromOutside(point, bounds);
				});
				selector.on("click", function() {
					return _this.context.draggable.onEnd(null);
				});
				selector.on("reset", function() {
					_this.reset();
					_this.context.draggable.onEnd(null);
				});
			};
			_this.handleInteractionEnd = function() {
				var _this$props3 = _this.props, resourceId = _this$props3.resourceId, isAllDay = _this$props3.isAllDay;
				var event = _this.state.segment.event;
				_this.reset();
				_this.context.draggable.onEnd({
					start: event.start,
					end: event.end,
					resourceId,
					isAllDay
				});
			};
			_this._teardownSelectable = function() {
				if (!_this._selector) return;
				_this._selector.teardown();
				_this._selector = null;
			};
			_this.state = {};
			_this.ref = /*#__PURE__*/ _react.default.createRef();
			return _this;
		}
		(0, _inherits2.default)(WeekWrapper, _React$Component);
		return (0, _createClass2.default)(WeekWrapper, [
			{
				key: "componentDidMount",
				value: function componentDidMount() {
					this._selectable();
				}
			},
			{
				key: "componentWillUnmount",
				value: function componentWillUnmount() {
					this._teardownSelectable();
				}
			},
			{
				key: "reset",
				value: function reset() {
					if (this.state.segment) this.setState({ segment: null });
				}
			},
			{
				key: "update",
				value: function update(event, start, end) {
					var segment = (0, _eventLevels.eventSegments)(_objectSpread(_objectSpread({}, event), {}, {
						end,
						start,
						__isPreview: true
					}), this.props.slotMetrics.range, _common.dragAccessors, this.props.localizer);
					var lastSegment = this.state.segment;
					if (lastSegment && segment.span === lastSegment.span && segment.left === lastSegment.left && segment.right === lastSegment.right) return;
					this.setState({ segment });
				}
			},
			{
				key: "handleResize",
				value: function handleResize(point, bounds) {
					var _this$context$draggab = this.context.draggable.dragAndDropAction, event = _this$context$draggab.event, direction = _this$context$draggab.direction;
					var _this$props4 = this.props, accessors = _this$props4.accessors, slotMetrics = _this$props4.slotMetrics, rtl = _this$props4.rtl, localizer = _this$props4.localizer;
					var _eventTimes2 = (0, _common.eventTimes)(event, accessors, localizer), start = _eventTimes2.start, end = _eventTimes2.end;
					var slot = (0, _selection.getSlotAtX)(bounds, point.x, rtl, slotMetrics.slots);
					var date = slotMetrics.getDateForSlot(slot);
					var cursorInRow = (0, _selection.pointInBox)(bounds, point);
					if (direction === "RIGHT") {
						if (cursorInRow) {
							if (slotMetrics.last < start) return this.reset();
							if (localizer.eq(localizer.startOf(end, "day"), end)) end = localizer.add(date, 1, "day");
							else end = date;
						} else if (localizer.inRange(start, slotMetrics.first, slotMetrics.last) || bounds.bottom < point.y && +slotMetrics.first > +start) end = localizer.add(slotMetrics.last, 1, "milliseconds");
						else {
							this.setState({ segment: null });
							return;
						}
						var originalEnd = accessors.end(event);
						end = localizer.merge(end, originalEnd);
						if (localizer.lt(end, start)) end = originalEnd;
					} else if (direction === "LEFT") {
						if (cursorInRow) {
							if (slotMetrics.first > end) return this.reset();
							start = date;
						} else if (localizer.inRange(end, slotMetrics.first, slotMetrics.last) || bounds.top > point.y && localizer.lt(slotMetrics.last, end)) start = localizer.add(slotMetrics.first, -1, "milliseconds");
						else {
							this.reset();
							return;
						}
						var originalStart = accessors.start(event);
						start = localizer.merge(start, originalStart);
						if (localizer.gt(start, end)) start = originalStart;
					}
					this.update(event, start, end);
				}
			},
			{
				key: "render",
				value: function render() {
					var _this$props5 = this.props, children = _this$props5.children, accessors = _this$props5.accessors;
					var segment = this.state.segment;
					return /*#__PURE__*/ _react.default.createElement("div", {
						ref: this.ref,
						className: "rbc-addons-dnd-row-body"
					}, children, segment && /*#__PURE__*/ _react.default.createElement(_EventRow.default, (0, _extends2.default)({}, this.props, {
						selected: null,
						className: "rbc-addons-dnd-drag-row",
						segments: [segment],
						accessors: _objectSpread(_objectSpread({}, accessors), _common.dragAccessors)
					})));
				}
			}
		]);
	}(_react.default.Component);
	WeekWrapper.contextType = _DnDContext.DnDContext;
	WeekWrapper.propTypes = {};
	exports.default = WeekWrapper;
}));
//#endregion
//#region node_modules/react-big-calendar/lib/addons/dragAndDrop/withDragAndDrop.js
var require_withDragAndDrop = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = withDragAndDrop;
	var _extends2 = _interopRequireDefault(require_extends());
	var _defineProperty2 = _interopRequireDefault(require_defineProperty());
	var _objectWithoutProperties2 = _interopRequireDefault(require_objectWithoutProperties());
	var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
	var _createClass2 = _interopRequireDefault(require_createClass());
	var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
	var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
	var _inherits2 = _interopRequireDefault(require_inherits());
	_interopRequireDefault(require_prop_types());
	var _react = _interopRequireDefault(require_react());
	var _clsx = _interopRequireDefault(require_clsx());
	require_propTypes();
	var _EventWrapper = _interopRequireDefault(require_EventWrapper());
	var _EventContainerWrapper = _interopRequireDefault(require_EventContainerWrapper());
	var _WeekWrapper = _interopRequireDefault(require_WeekWrapper());
	var _common = require_common();
	var _DnDContext = require_DnDContext();
	var _excluded = [
		"selectable",
		"elementProps",
		"components"
	];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				(0, _defineProperty2.default)(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _callSuper(t, o, e) {
		return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e));
	}
	function _isNativeReflectConstruct() {
		try {
			var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
		} catch (t) {}
		return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
			return !!t;
		})();
	}
	function withDragAndDrop(Calendar) {
		var DragAndDropCalendar = /*#__PURE__*/ function(_React$Component) {
			function DragAndDropCalendar() {
				var _this;
				(0, _classCallCheck2.default)(this, DragAndDropCalendar);
				for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
				_this = _callSuper(this, DragAndDropCalendar, [].concat(args));
				_this.defaultOnDragOver = function(event) {
					event.preventDefault();
				};
				_this.handleBeginAction = function(event, action, direction) {
					_this.setState({
						event,
						action,
						direction
					});
					var onDragStart = _this.props.onDragStart;
					if (onDragStart) onDragStart({
						event,
						action,
						direction
					});
				};
				_this.handleInteractionStart = function() {
					if (_this.state.interacting === false) _this.setState({ interacting: true });
				};
				_this.handleInteractionEnd = function(interactionInfo) {
					var _this$state = _this.state, action = _this$state.action, event = _this$state.event;
					if (!action) return;
					_this.setState({
						action: null,
						event: null,
						interacting: false,
						direction: null
					});
					if (interactionInfo == null) return;
					interactionInfo.event = event;
					var _this$props = _this.props, onEventDrop = _this$props.onEventDrop, onEventResize = _this$props.onEventResize;
					if (action === "move" && onEventDrop) onEventDrop(interactionInfo);
					if (action === "resize" && onEventResize) onEventResize(interactionInfo);
				};
				_this.state = { interacting: false };
				return _this;
			}
			(0, _inherits2.default)(DragAndDropCalendar, _React$Component);
			return (0, _createClass2.default)(DragAndDropCalendar, [{
				key: "getDnDContextValue",
				value: function getDnDContextValue() {
					return { draggable: {
						onStart: this.handleInteractionStart,
						onEnd: this.handleInteractionEnd,
						onBeginAction: this.handleBeginAction,
						onDropFromOutside: this.props.onDropFromOutside,
						dragFromOutsideItem: this.props.dragFromOutsideItem,
						draggableAccessor: this.props.draggableAccessor,
						resizableAccessor: this.props.resizableAccessor,
						dragAndDropAction: this.state
					} };
				}
			}, {
				key: "render",
				value: function render() {
					var _this$props2 = this.props, selectable = _this$props2.selectable, elementProps = _this$props2.elementProps, components = _this$props2.components, props = (0, _objectWithoutProperties2.default)(_this$props2, _excluded);
					var interacting = this.state.interacting;
					delete props.onEventDrop;
					delete props.onEventResize;
					props.selectable = selectable ? "ignoreEvents" : false;
					this.components = (0, _common.mergeComponents)(components, {
						eventWrapper: _EventWrapper.default,
						eventContainerWrapper: _EventContainerWrapper.default,
						weekWrapper: _WeekWrapper.default
					});
					var elementPropsWithDropFromOutside = this.props.onDropFromOutside ? _objectSpread(_objectSpread({}, elementProps), {}, { onDragOver: this.props.onDragOver || this.defaultOnDragOver }) : elementProps;
					props.className = (0, _clsx.default)(props.className, "rbc-addons-dnd", !!interacting && "rbc-addons-dnd-is-dragging");
					var context = this.getDnDContextValue();
					return /*#__PURE__*/ _react.default.createElement(_DnDContext.DnDContext.Provider, { value: context }, /*#__PURE__*/ _react.default.createElement(Calendar, (0, _extends2.default)({}, props, {
						elementProps: elementPropsWithDropFromOutside,
						components: this.components
					})));
				}
			}]);
		}(_react.default.Component);
		DragAndDropCalendar.defaultProps = _objectSpread(_objectSpread({}, Calendar.defaultProps), {}, {
			draggableAccessor: null,
			resizableAccessor: null,
			resizable: true
		});
		DragAndDropCalendar.propTypes = {};
		return DragAndDropCalendar;
	}
}));
//#endregion
//#region node_modules/react-big-calendar/lib/addons/dragAndDrop/index.js
var require_dragAndDrop = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _interopRequireDefault = require_interopRequireDefault();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.default = _interopRequireDefault(require_withDragAndDrop()).default;
}));
//#endregion
export { Calendar_default as n, dateFnsLocalizer as r, require_dragAndDrop as t };
