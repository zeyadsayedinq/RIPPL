import { n as __esmMin, r as __exportAll } from "../_runtime.mjs";
import { D as init_extends, E as _extends } from "./babel__runtime.mjs";
//#region node_modules/dom-helpers/esm/ownerDocument.js
/**
* Returns the owner document of a given element.
* 
* @param node the element
*/
function ownerDocument$1(node) {
	return node && node.ownerDocument || document;
}
var init_ownerDocument = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/ownerWindow.js
/**
* Returns the owner window of a given element.
* 
* @param node the element
*/
function ownerWindow(node) {
	var doc = ownerDocument$1(node);
	return doc && doc.defaultView || window;
}
var init_ownerWindow = __esmMin((() => {
	init_ownerDocument();
}));
//#endregion
//#region node_modules/dom-helpers/esm/getComputedStyle.js
/**
* Returns one or all computed style properties of an element.
* 
* @param node the element
* @param psuedoElement the style property
*/
function getComputedStyle(node, psuedoElement) {
	return ownerWindow(node).getComputedStyle(node, psuedoElement);
}
var init_getComputedStyle = __esmMin((() => {
	init_ownerWindow();
}));
//#endregion
//#region node_modules/dom-helpers/esm/hyphenate.js
function hyphenate(string) {
	return string.replace(rUpper, "-$1").toLowerCase();
}
var rUpper;
var init_hyphenate = __esmMin((() => {
	rUpper = /([A-Z])/g;
}));
//#endregion
//#region node_modules/dom-helpers/esm/hyphenateStyle.js
function hyphenateStyleName(string) {
	return hyphenate(string).replace(msPattern, "-ms-");
}
var msPattern;
var init_hyphenateStyle = __esmMin((() => {
	init_hyphenate();
	msPattern = /^ms-/;
}));
//#endregion
//#region node_modules/dom-helpers/esm/isTransform.js
function isTransform(value) {
	return !!(value && supportedTransforms.test(value));
}
var supportedTransforms;
var init_isTransform = __esmMin((() => {
	supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
}));
//#endregion
//#region node_modules/dom-helpers/esm/css.js
function style(node, property) {
	var css = "";
	var transforms = "";
	if (typeof property === "string") return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
	Object.keys(property).forEach(function(key) {
		var value = property[key];
		if (!value && value !== 0) node.style.removeProperty(hyphenateStyleName(key));
		else if (isTransform(key)) transforms += key + "(" + value + ") ";
		else css += hyphenateStyleName(key) + ": " + value + ";";
	});
	if (transforms) css += "transform: " + transforms + ";";
	node.style.cssText += ";" + css;
}
var init_css = __esmMin((() => {
	init_getComputedStyle();
	init_hyphenateStyle();
	init_isTransform();
}));
//#endregion
//#region node_modules/dom-helpers/esm/contains.js
var contains_exports = /* @__PURE__ */ __exportAll({ default: () => contains$1 });
/**
* Checks if an element contains another given element.
* 
* @param context the context element
* @param node the element to check
*/
function contains$1(context, node) {
	if (context.contains) return context.contains(node);
	if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}
var init_contains = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/isDocument.js
function isDocument(element) {
	return "nodeType" in element && element.nodeType === document.DOCUMENT_NODE;
}
var init_isDocument = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/isWindow.js
function isWindow(node) {
	if ("window" in node && node.window === node) return node;
	if (isDocument(node)) return node.defaultView || false;
	return false;
}
var init_isWindow = __esmMin((() => {
	init_isDocument();
}));
//#endregion
//#region node_modules/dom-helpers/esm/getScrollAccessor.js
function getscrollAccessor(offset) {
	var prop = offset === "pageXOffset" ? "scrollLeft" : "scrollTop";
	function scrollAccessor(node, val) {
		var win = isWindow(node);
		if (val === void 0) return win ? win[offset] : node[prop];
		if (win) win.scrollTo(win[offset], val);
		else node[prop] = val;
	}
	return scrollAccessor;
}
var init_getScrollAccessor = __esmMin((() => {
	init_isWindow();
}));
//#endregion
//#region node_modules/dom-helpers/esm/scrollLeft.js
var scrollLeft_default;
var init_scrollLeft = __esmMin((() => {
	init_getScrollAccessor();
	scrollLeft_default = getscrollAccessor("pageXOffset");
}));
//#endregion
//#region node_modules/dom-helpers/esm/scrollTop.js
var scrollTop_default;
var init_scrollTop = __esmMin((() => {
	init_getScrollAccessor();
	scrollTop_default = getscrollAccessor("pageYOffset");
}));
//#endregion
//#region node_modules/dom-helpers/esm/offset.js
/**
* Returns the offset of a given element, including top and left positions, width and height.
* 
* @param node the element
*/
function offset(node) {
	var doc = ownerDocument$1(node);
	var box = {
		top: 0,
		left: 0,
		height: 0,
		width: 0
	};
	var docElem = doc && doc.documentElement;
	if (!docElem || !contains$1(docElem, node)) return box;
	if (node.getBoundingClientRect !== void 0) box = node.getBoundingClientRect();
	box = {
		top: box.top + scrollTop_default(docElem) - (docElem.clientTop || 0),
		left: box.left + scrollLeft_default(docElem) - (docElem.clientLeft || 0),
		width: box.width,
		height: box.height
	};
	return box;
}
var init_offset = __esmMin((() => {
	init_contains();
	init_ownerDocument();
	init_scrollLeft();
	init_scrollTop();
}));
//#endregion
//#region node_modules/dom-helpers/esm/offsetParent.js
function offsetParent(node) {
	var doc = ownerDocument$1(node);
	var parent = node && node.offsetParent;
	while (isHTMLElement(parent) && parent.nodeName !== "HTML" && style(parent, "position") === "static") parent = parent.offsetParent;
	return parent || doc.documentElement;
}
var isHTMLElement;
var init_offsetParent = __esmMin((() => {
	init_css();
	init_ownerDocument();
	isHTMLElement = function isHTMLElement(e) {
		return !!e && "offsetParent" in e;
	};
}));
//#endregion
//#region node_modules/dom-helpers/esm/position.js
/**
* Returns the relative position of a given element.
* 
* @param node the element
* @param offsetParent the offset parent
*/
function position(node, offsetParent$1) {
	var parentOffset = {
		top: 0,
		left: 0
	};
	var offset$2;
	if (style(node, "position") === "fixed") offset$2 = node.getBoundingClientRect();
	else {
		var parent = offsetParent$1 || offsetParent(node);
		offset$2 = offset(node);
		if (nodeName(parent) !== "html") parentOffset = offset(parent);
		var borderTop = String(style(parent, "borderTopWidth") || 0);
		parentOffset.top += parseInt(borderTop, 10) - scrollTop_default(parent) || 0;
		var borderLeft = String(style(parent, "borderLeftWidth") || 0);
		parentOffset.left += parseInt(borderLeft, 10) - scrollLeft_default(parent) || 0;
	}
	var marginTop = String(style(node, "marginTop") || 0);
	var marginLeft = String(style(node, "marginLeft") || 0);
	return _extends({}, offset$2, {
		top: offset$2.top - parentOffset.top - (parseInt(marginTop, 10) || 0),
		left: offset$2.left - parentOffset.left - (parseInt(marginLeft, 10) || 0)
	});
}
var nodeName;
var init_position = __esmMin((() => {
	init_extends();
	init_css();
	init_offset();
	init_offsetParent();
	init_scrollLeft();
	init_scrollTop();
	nodeName = function nodeName(node) {
		return node.nodeName && node.nodeName.toLowerCase();
	};
}));
//#endregion
//#region node_modules/dom-helpers/esm/canUseDOM.js
var canUseDOM_default$1;
var init_canUseDOM = __esmMin((() => {
	canUseDOM_default$1 = !!(typeof window !== "undefined" && window.document && window.document.createElement);
}));
//#endregion
//#region node_modules/dom-helpers/esm/animationFrame.js
function fallback(fn) {
	var curr = (/* @__PURE__ */ new Date()).getTime();
	var ms = Math.max(0, 16 - (curr - prev));
	var handle = setTimeout(fn, ms);
	prev = curr;
	return handle;
}
var prev, vendors, cancelMethod, rafImpl, getKey, cancel, request;
var init_animationFrame = __esmMin((() => {
	init_canUseDOM();
	prev = (/* @__PURE__ */ new Date()).getTime();
	vendors = [
		"",
		"webkit",
		"moz",
		"o",
		"ms"
	];
	cancelMethod = "clearTimeout";
	rafImpl = fallback;
	getKey = function getKey(vendor, k) {
		return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + "AnimationFrame";
	};
	if (canUseDOM_default$1) vendors.some(function(vendor) {
		var rafMethod = getKey(vendor, "request");
		if (rafMethod in window) {
			cancelMethod = getKey(vendor, "cancel");
			rafImpl = function rafImpl(cb) {
				return window[rafMethod](cb);
			};
		}
		return !!rafImpl;
	});
	cancel = function cancel(id) {
		if (typeof window[cancelMethod] === "function") window[cancelMethod](id);
	};
	request = rafImpl;
}));
//#endregion
//#region node_modules/react-overlays/node_modules/dom-helpers/esm/canUseDOM.js
var canUseDOM_default = !!(typeof window !== "undefined" && window.document && window.document.createElement);
//#endregion
//#region node_modules/react-overlays/node_modules/dom-helpers/esm/addEventListener.js
var optionsSupported$1 = false;
var onceSupported$1 = false;
try {
	var options$1 = {
		get passive() {
			return optionsSupported$1 = true;
		},
		get once() {
			return onceSupported$1 = optionsSupported$1 = true;
		}
	};
	if (canUseDOM_default) {
		window.addEventListener("test", options$1, options$1);
		window.removeEventListener("test", options$1, true);
	}
} catch (e) {}
/**
* An `addEventListener` ponyfill, supports the `once` option
* 
* @param node the element
* @param eventName the event name
* @param handle the handler
* @param options event options
*/
function addEventListener$1(node, eventName, handler, options) {
	if (options && typeof options !== "boolean" && !onceSupported$1) {
		var once = options.once, capture = options.capture;
		var wrappedHandler = handler;
		if (!onceSupported$1 && once) {
			wrappedHandler = handler.__once || function onceHandler(event) {
				this.removeEventListener(eventName, onceHandler, capture);
				handler.call(this, event);
			};
			handler.__once = wrappedHandler;
		}
		node.addEventListener(eventName, wrappedHandler, optionsSupported$1 ? options : capture);
	}
	node.addEventListener(eventName, handler, options);
}
//#endregion
//#region node_modules/react-overlays/node_modules/dom-helpers/esm/contains.js
/**
* Checks if an element contains another given element.
* 
* @param context the context element
* @param node the element to check
*/
function contains(context, node) {
	if (context.contains) return context.contains(node);
	if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}
//#endregion
//#region node_modules/react-overlays/node_modules/dom-helpers/esm/removeEventListener.js
/**
* A `removeEventListener` ponyfill
* 
* @param node the element
* @param eventName the event name
* @param handle the handler
* @param options event options
*/
function removeEventListener$1(node, eventName, handler, options) {
	var capture = options && typeof options !== "boolean" ? options.capture : options;
	node.removeEventListener(eventName, handler, capture);
	if (handler.__once) node.removeEventListener(eventName, handler.__once, capture);
}
//#endregion
//#region node_modules/react-overlays/node_modules/dom-helpers/esm/listen.js
function listen$1(node, eventName, handler, options) {
	addEventListener$1(node, eventName, handler, options);
	return function() {
		removeEventListener$1(node, eventName, handler, options);
	};
}
//#endregion
//#region node_modules/react-overlays/node_modules/dom-helpers/esm/ownerDocument.js
/**
* Returns the owner document of a given element.
* 
* @param node the element
*/
function ownerDocument(node) {
	return node && node.ownerDocument || document;
}
//#endregion
//#region node_modules/dom-helpers/esm/height.js
/**
* Returns the height of a given element.
* 
* @param node the element
* @param client whether to use `clientHeight` if possible
*/
function height(node, client) {
	var win = isWindow(node);
	return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
}
var init_height = __esmMin((() => {
	init_isWindow();
	init_offset();
}));
//#endregion
//#region node_modules/dom-helpers/esm/querySelectorAll.js
var querySelectorAll_exports = /* @__PURE__ */ __exportAll({ default: () => qsa });
/**
* Runs `querySelectorAll` on a given element.
* 
* @param element the element
* @param selector the selector
*/
function qsa(element, selector) {
	return toArray$1(element.querySelectorAll(selector));
}
var toArray$1;
var init_querySelectorAll = __esmMin((() => {
	toArray$1 = Function.prototype.bind.call(Function.prototype.call, [].slice);
}));
//#endregion
//#region node_modules/dom-helpers/esm/matches.js
/**
* Checks if a given element matches a selector.
* 
* @param node the element
* @param selector the selector
*/
function matches(node, selector) {
	if (!matchesImpl) {
		var body = document.body;
		var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;
		matchesImpl = function matchesImpl(n, s) {
			return nativeMatch.call(n, s);
		};
	}
	return matchesImpl(node, selector);
}
var matchesImpl;
var init_matches = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/closest.js
var closest_exports = /* @__PURE__ */ __exportAll({ default: () => closest });
/**
* Returns the closest parent element that matches a given selector.
* 
* @param node the reference element
* @param selector the selector to match
* @param stopAt stop traversing when this element is found
*/
function closest(node, selector, stopAt) {
	if (node.closest && !stopAt) node.closest(selector);
	var nextNode = node;
	do {
		if (matches(nextNode, selector)) return nextNode;
		nextNode = nextNode.parentElement;
	} while (nextNode && nextNode !== stopAt && nextNode.nodeType === document.ELEMENT_NODE);
	return null;
}
var init_closest = __esmMin((() => {
	init_matches();
}));
//#endregion
//#region node_modules/dom-helpers/esm/addEventListener.js
/**
* An `addEventListener` ponyfill, supports the `once` option
* 
* @param node the element
* @param eventName the event name
* @param handle the handler
* @param options event options
*/
function addEventListener(node, eventName, handler, options) {
	if (options && typeof options !== "boolean" && !onceSupported) {
		var once = options.once, capture = options.capture;
		var wrappedHandler = handler;
		if (!onceSupported && once) {
			wrappedHandler = handler.__once || function onceHandler(event) {
				this.removeEventListener(eventName, onceHandler, capture);
				handler.call(this, event);
			};
			handler.__once = wrappedHandler;
		}
		node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
	}
	node.addEventListener(eventName, handler, options);
}
var optionsSupported, onceSupported, options;
var init_addEventListener = __esmMin((() => {
	init_canUseDOM();
	optionsSupported = false;
	onceSupported = false;
	try {
		options = {
			get passive() {
				return optionsSupported = true;
			},
			get once() {
				return onceSupported = optionsSupported = true;
			}
		};
		if (canUseDOM_default$1) {
			window.addEventListener("test", options, options);
			window.removeEventListener("test", options, true);
		}
	} catch (e) {}
}));
//#endregion
//#region node_modules/dom-helpers/esm/removeEventListener.js
/**
* A `removeEventListener` ponyfill
* 
* @param node the element
* @param eventName the event name
* @param handle the handler
* @param options event options
*/
function removeEventListener(node, eventName, handler, options) {
	var capture = options && typeof options !== "boolean" ? options.capture : options;
	node.removeEventListener(eventName, handler, capture);
	if (handler.__once) node.removeEventListener(eventName, handler.__once, capture);
}
var init_removeEventListener = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/listen.js
var listen_exports = /* @__PURE__ */ __exportAll({ default: () => listen });
function listen(node, eventName, handler, options) {
	addEventListener(node, eventName, handler, options);
	return function() {
		removeEventListener(node, eventName, handler, options);
	};
}
var init_listen = __esmMin((() => {
	init_addEventListener();
	init_removeEventListener();
}));
//#endregion
//#region node_modules/dom-helpers/esm/width.js
/**
* Returns the width of a given element.
* 
* @param node the element
* @param client whether to use `clientWidth` if possible
*/
function getWidth(node, client) {
	var win = isWindow(node);
	return win ? win.innerWidth : client ? node.clientWidth : offset(node).width;
}
var init_width = __esmMin((() => {
	init_isWindow();
	init_offset();
}));
//#endregion
//#region node_modules/dom-helpers/esm/scrollbarSize.js
function scrollbarSize(recalc) {
	if (!size && size !== 0 || recalc) {
		if (canUseDOM_default$1) {
			var scrollDiv = document.createElement("div");
			scrollDiv.style.position = "absolute";
			scrollDiv.style.top = "-9999px";
			scrollDiv.style.width = "50px";
			scrollDiv.style.height = "50px";
			scrollDiv.style.overflow = "scroll";
			document.body.appendChild(scrollDiv);
			size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
	}
	return size;
}
var size;
var init_scrollbarSize = __esmMin((() => {
	init_canUseDOM();
}));
//#endregion
//#region node_modules/dom-helpers/esm/hasClass.js
/**
* Checks if a given element has a CSS class.
* 
* @param element the element
* @param className the CSS class name
*/
function hasClass(element, className) {
	if (element.classList) return !!className && element.classList.contains(className);
	return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
var init_hasClass = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/addClass.js
/**
* Adds a CSS class to a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function addClass(element, className) {
	if (element.classList) element.classList.add(className);
	else if (!hasClass(element, className)) if (typeof element.className === "string") element.className = element.className + " " + className;
	else element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}
var init_addClass = __esmMin((() => {
	init_hasClass();
}));
//#endregion
//#region node_modules/dom-helpers/esm/removeClass.js
function replaceClassName(origClass, classToRemove) {
	return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
/**
* Removes a CSS class from a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function removeClass(element, className) {
	if (element.classList) element.classList.remove(className);
	else if (typeof element.className === "string") element.className = replaceClassName(element.className, className);
	else element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
}
var init_removeClass = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/activeElement.js
/**
* Returns the actively focused element safely.
*
* @param doc the document to check
*/
function activeElement(doc) {
	if (doc === void 0) doc = ownerDocument$1();
	try {
		var active = doc.activeElement;
		if (!active || !active.nodeName) return null;
		return active;
	} catch (e) {
		return doc.body;
	}
}
var init_activeElement = __esmMin((() => {
	init_ownerDocument();
}));
//#endregion
//#region node_modules/dom-helpers/esm/triggerEvent.js
/**
* Triggers an event on a given element.
* 
* @param node the element
* @param eventName the event name to trigger
* @param bubbles whether the event should bubble up
* @param cancelable whether the event should be cancelable
*/
function triggerEvent(node, eventName, bubbles, cancelable) {
	if (bubbles === void 0) bubbles = false;
	if (cancelable === void 0) cancelable = true;
	if (node) {
		var event = document.createEvent("HTMLEvents");
		event.initEvent(eventName, bubbles, cancelable);
		node.dispatchEvent(event);
	}
}
var init_triggerEvent = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/transitionEnd.js
function parseDuration(node) {
	var str = style(node, "transitionDuration") || "";
	var mult = str.indexOf("ms") === -1 ? 1e3 : 1;
	return parseFloat(str) * mult;
}
function emulateTransitionEnd(element, duration, padding) {
	if (padding === void 0) padding = 5;
	var called = false;
	var handle = setTimeout(function() {
		if (!called) triggerEvent(element, "transitionend", true);
	}, duration + padding);
	var remove = listen(element, "transitionend", function() {
		called = true;
	}, { once: true });
	return function() {
		clearTimeout(handle);
		remove();
	};
}
function transitionEnd(element, handler, duration, padding) {
	if (duration == null) duration = parseDuration(element) || 0;
	var removeEmulate = emulateTransitionEnd(element, duration, padding);
	var remove = listen(element, "transitionend", handler);
	return function() {
		removeEmulate();
		remove();
	};
}
var init_transitionEnd = __esmMin((() => {
	init_css();
	init_listen();
	init_triggerEvent();
}));
//#endregion
//#region node_modules/dom-helpers/esm/animate.js
/**
* code in part from: Zepto 1.1.4 | zeptojs.com/license
*/
function _animate(_ref) {
	var node = _ref.node, properties = _ref.properties, _ref$duration = _ref.duration, duration = _ref$duration === void 0 ? 200 : _ref$duration, easing = _ref.easing, callback = _ref.callback;
	var cssProperties = [];
	var cssValues = {};
	var transforms = "";
	Object.keys(properties).forEach(function(key) {
		var value = properties[key];
		if (isTransform(key)) transforms += key + "(" + value + ") ";
		else {
			cssValues[key] = value;
			cssProperties.push(hyphenate(key));
		}
	});
	if (transforms) {
		cssValues.transform = transforms;
		cssProperties.push("transform");
	}
	function done(event) {
		if (event.target !== event.currentTarget) return;
		style(node, reset);
		if (callback) callback.call(this, event);
	}
	if (duration > 0) {
		cssValues.transition = cssProperties.join(", ");
		cssValues["transition-duration"] = duration / 1e3 + "s";
		cssValues["transition-delay"] = "0s";
		cssValues["transition-timing-function"] = easing || "linear";
	}
	var removeListener = transitionEnd(node, done, duration);
	node.clientLeft;
	style(node, cssValues);
	return { cancel: function cancel() {
		removeListener();
		style(node, reset);
	} };
}
function animate(nodeOrOptions, properties, duration, easing, callback) {
	if (!("nodeType" in nodeOrOptions)) return _animate(nodeOrOptions);
	if (!properties) throw new Error("must include properties to animate");
	if (typeof easing === "function") {
		callback = easing;
		easing = "";
	}
	return _animate({
		node: nodeOrOptions,
		properties,
		duration,
		easing,
		callback
	});
}
var reset;
var init_animate = __esmMin((() => {
	init_css();
	init_hyphenate();
	init_isTransform();
	init_transitionEnd();
	reset = {
		transition: "",
		"transition-duration": "",
		"transition-delay": "",
		"transition-timing-function": ""
	};
}));
//#endregion
//#region node_modules/dom-helpers/esm/attribute.js
/**
* Gets or sets an attribute of a given element.
* 
* @param node the element
* @param attr the attribute to get or set
* @param val the attribute value
*/
function attribute(node, attr, val) {
	if (node) {
		if (typeof val === "undefined") return node.getAttribute(attr);
		if (!val && val !== "") node.removeAttribute(attr);
		else node.setAttribute(attr, String(val));
	}
}
var init_attribute = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/childElements.js
/**
* Collects all child elements of an element.
* 
* @param node the element
*/
function childElements(node) {
	return node ? Array.from(node.children) : [];
}
var init_childElements = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/clear.js
/**
* Removes all child nodes from a given node.
* 
* @param node the node to clear
*/
function clear(node) {
	if (node) {
		while (node.firstChild) node.removeChild(node.firstChild);
		return node;
	}
	return null;
}
var init_clear = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/childNodes.js
/**
* Collects all child nodes of an element.
* 
* @param node the node
*/
function childNodes(node) {
	return node ? toArray(node.childNodes) : [];
}
var toArray;
var init_childNodes = __esmMin((() => {
	toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
}));
//#endregion
//#region node_modules/dom-helpers/esm/filterEventHandler.js
function filterEvents(selector, handler) {
	return function filterHandler(e) {
		var top = e.currentTarget;
		var target = e.target;
		if (qsa(top, selector).some(function(match) {
			return contains$1(match, target);
		})) handler.call(this, e);
	};
}
var init_filterEventHandler = __esmMin((() => {
	init_contains();
	init_querySelectorAll();
}));
//#endregion
//#region node_modules/dom-helpers/esm/insertAfter.js
/**
* Inserts a node after a given reference node.
* 
* @param node the node to insert
* @param refNode the reference node
*/
function insertAfter(node, refNode) {
	if (node && refNode && refNode.parentNode) {
		if (refNode.nextSibling) refNode.parentNode.insertBefore(node, refNode.nextSibling);
		else refNode.parentNode.appendChild(node);
		return node;
	}
	return null;
}
var init_insertAfter = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/isInput.js
/**
* Checks if a given element is an input (input, select, textarea or button).
* 
* @param node the element to check
*/
function isInput(node) {
	return node ? regExpInputs.test(node.nodeName) : false;
}
var regExpInputs;
var init_isInput = __esmMin((() => {
	regExpInputs = /^(?:input|select|textarea|button)$/i;
}));
//#endregion
//#region node_modules/dom-helpers/esm/isVisible.js
/**
* Checks if a given element is currently visible.
* 
* @param node the element to check
*/
function isVisible(node) {
	return node ? !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length) : false;
}
var init_isVisible = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/collectSiblings.js
function collectSiblings(node, refNode, selector) {
	if (refNode === void 0) refNode = null;
	if (selector === void 0) selector = null;
	var siblings = [];
	for (; node; node = node.nextElementSibling) if (node !== refNode) {
		if (selector && matches(node, selector)) break;
		siblings.push(node);
	}
	return siblings;
}
var init_collectSiblings = __esmMin((() => {
	init_matches();
}));
//#endregion
//#region node_modules/dom-helpers/esm/nextUntil.js
/**
* Collects all next sibling elements of an element until a given selector is matched.
* 
* @param node the referene node
* @param selector the selector to match
*/
function nextUntil(node, selector) {
	return collectSiblings(node, node, selector);
}
var init_nextUntil = __esmMin((() => {
	init_collectSiblings();
}));
//#endregion
//#region node_modules/dom-helpers/esm/collectElements.js
function collectElements(node, direction) {
	var nextNode = null;
	var nodes = [];
	nextNode = node ? node[direction] : null;
	while (nextNode && nextNode.nodeType !== 9) {
		nodes.push(nextNode);
		nextNode = nextNode[direction] || null;
	}
	return nodes;
}
var init_collectElements = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/parents.js
/**
* Collects all parent elements of a given element.
* 
* @param node the element
*/
function parents(node) {
	return collectElements(node, "parentElement");
}
var init_parents = __esmMin((() => {
	init_collectElements();
}));
//#endregion
//#region node_modules/dom-helpers/esm/prepend.js
/**
* Insert a given element as the first child of a parent element.
* 
* @param node the element to prepend
* @param parent the parent element
*/
function prepend(node, parent) {
	if (node && parent) {
		if (parent.firstElementChild) parent.insertBefore(node, parent.firstElementChild);
		else parent.appendChild(node);
		return node;
	}
	return null;
}
var init_prepend = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/remove.js
/**
* Removes a given node from the DOM.
* 
* @param node the node to remove
*/
function remove(node) {
	if (node && node.parentNode) {
		node.parentNode.removeChild(node);
		return node;
	}
	return null;
}
var init_remove = __esmMin((() => {}));
//#endregion
//#region node_modules/dom-helpers/esm/scrollParent.js
/**
* Find the first scrollable parent of an element.
*
* @param element Starting element
* @param firstPossible Stop at the first scrollable parent, even if it's not currently scrollable
*/
function scrollParent(element, firstPossible) {
	var position = style(element, "position");
	var excludeStatic = position === "absolute";
	var ownerDoc = element.ownerDocument;
	if (position === "fixed") return ownerDoc || document;
	while ((element = element.parentNode) && !isDocument(element)) {
		var isStatic = excludeStatic && style(element, "position") === "static";
		var style$1 = (style(element, "overflow") || "") + (style(element, "overflow-y") || "") + style(element, "overflow-x");
		if (isStatic) continue;
		if (/(auto|scroll)/.test(style$1) && (firstPossible || height(element) < element.scrollHeight)) return element;
	}
	return ownerDoc || document;
}
var init_scrollParent = __esmMin((() => {
	init_css();
	init_height();
	init_isDocument();
}));
//#endregion
//#region node_modules/dom-helpers/esm/scrollTo.js
function scrollTo(selected, scrollParent$1) {
	var offset$1 = offset(selected);
	var poff = {
		top: 0,
		left: 0
	};
	if (!selected) return void 0;
	var list = scrollParent$1 || scrollParent(selected);
	var isWin = isWindow(list);
	var listScrollTop = scrollTop_default(list);
	var listHeight = height(list, true);
	if (!isWin) poff = offset(list);
	offset$1 = {
		top: offset$1.top - poff.top,
		left: offset$1.left - poff.left,
		height: offset$1.height,
		width: offset$1.width
	};
	var selectedHeight = offset$1.height;
	var selectedTop = offset$1.top + (isWin ? 0 : listScrollTop);
	var bottom = selectedTop + selectedHeight;
	listScrollTop = listScrollTop > selectedTop ? selectedTop : bottom > listScrollTop + listHeight ? bottom - listHeight : listScrollTop;
	var id = request(function() {
		return scrollTop_default(list, listScrollTop);
	});
	return function() {
		return cancel(id);
	};
}
var init_scrollTo = __esmMin((() => {
	init_animationFrame();
	init_height();
	init_isWindow();
	init_offset();
	init_scrollParent();
	init_scrollTop();
}));
//#endregion
//#region node_modules/dom-helpers/esm/siblings.js
/**
* Collects all previous and next sibling elements of a given element.
* 
* @param node the element
*/
function siblings(node) {
	return collectSiblings(node && node.parentElement ? node.parentElement.firstElementChild : null, node);
}
var init_siblings = __esmMin((() => {
	init_collectSiblings();
}));
//#endregion
//#region node_modules/dom-helpers/esm/text.js
/**
* Collects the text content of a given element.
* 
* @param node the element
* @param trim whether to remove trailing whitespace chars
* @param singleSpaces whether to convert multiple whitespace chars into a single space character
*/
function text(node, trim, singleSpaces) {
	if (trim === void 0) trim = true;
	if (singleSpaces === void 0) singleSpaces = true;
	var elementText = "";
	if (node) {
		elementText = (node.textContent || "").replace(regExpNbspEntity, " ").replace(regExpNbspHex, " ");
		if (trim) elementText = elementText.trim();
		if (singleSpaces) elementText = elementText.replace(regExpSpaces, " $1");
	}
	return elementText;
}
var regExpNbspEntity, regExpNbspHex, regExpSpaces;
var init_text = __esmMin((() => {
	regExpNbspEntity = /&nbsp;/gi;
	regExpNbspHex = /\xA0/g;
	regExpSpaces = /\s+([^\s])/gm;
}));
//#endregion
//#region node_modules/dom-helpers/esm/toggleClass.js
/**
* Toggles a CSS class on a given element.
* 
* @param element the element
* @param className the CSS class name
*/
function toggleClass(element, className) {
	if (element.classList) element.classList.toggle(className);
	else if (hasClass(element, className)) removeClass(element, className);
	else addClass(element, className);
}
var init_toggleClass = __esmMin((() => {
	init_addClass();
	init_hasClass();
	init_removeClass();
}));
//#endregion
//#region node_modules/dom-helpers/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({
	activeElement: () => activeElement,
	addClass: () => addClass,
	addEventListener: () => addEventListener,
	animate: () => animate,
	attribute: () => attribute,
	cancelAnimationFrame: () => cancel,
	childElements: () => childElements,
	childNodes: () => childNodes,
	clear: () => clear,
	closest: () => closest,
	contains: () => contains$1,
	default: () => esm_default,
	filter: () => filterEvents,
	getComputedStyle: () => getComputedStyle,
	hasClass: () => hasClass,
	height: () => height,
	insertAfter: () => insertAfter,
	isInput: () => isInput,
	isVisible: () => isVisible,
	listen: () => listen,
	matches: () => matches,
	nextUntil: () => nextUntil,
	offset: () => offset,
	offsetParent: () => offsetParent,
	ownerDocument: () => ownerDocument$1,
	ownerWindow: () => ownerWindow,
	parents: () => parents,
	position: () => position,
	prepend: () => prepend,
	querySelectorAll: () => qsa,
	remove: () => remove,
	removeClass: () => removeClass,
	removeEventListener: () => removeEventListener,
	requestAnimationFrame: () => request,
	scrollLeft: () => scrollLeft_default,
	scrollParent: () => scrollParent,
	scrollTo: () => scrollTo,
	scrollTop: () => scrollTop_default,
	scrollbarSize: () => scrollbarSize,
	siblings: () => siblings,
	style: () => style,
	text: () => text,
	toggleClass: () => toggleClass,
	transitionEnd: () => transitionEnd,
	triggerEvent: () => triggerEvent,
	width: () => getWidth
});
var esm_default;
var init_esm = __esmMin((() => {
	init_activeElement();
	init_addClass();
	init_addEventListener();
	init_animate();
	init_animationFrame();
	init_attribute();
	init_childElements();
	init_clear();
	init_closest();
	init_contains();
	init_childNodes();
	init_css();
	init_filterEventHandler();
	init_getComputedStyle();
	init_hasClass();
	init_height();
	init_insertAfter();
	init_isInput();
	init_isVisible();
	init_listen();
	init_matches();
	init_nextUntil();
	init_offset();
	init_offsetParent();
	init_ownerDocument();
	init_ownerWindow();
	init_parents();
	init_position();
	init_prepend();
	init_querySelectorAll();
	init_remove();
	init_removeClass();
	init_removeEventListener();
	init_scrollbarSize();
	init_scrollLeft();
	init_scrollParent();
	init_scrollTo();
	init_scrollTop();
	init_siblings();
	init_text();
	init_toggleClass();
	init_transitionEnd();
	init_triggerEvent();
	init_width();
	esm_default = {
		addEventListener,
		removeEventListener,
		triggerEvent,
		animate,
		filter: filterEvents,
		listen,
		style,
		getComputedStyle,
		attribute,
		activeElement,
		ownerDocument: ownerDocument$1,
		ownerWindow,
		requestAnimationFrame: request,
		cancelAnimationFrame: cancel,
		matches,
		height,
		width: getWidth,
		offset,
		offsetParent,
		position,
		contains: contains$1,
		scrollbarSize,
		scrollLeft: scrollLeft_default,
		scrollParent,
		scrollTo,
		scrollTop: scrollTop_default,
		querySelectorAll: qsa,
		closest,
		addClass,
		removeClass,
		hasClass,
		toggleClass,
		transitionEnd,
		childNodes,
		childElements,
		nextUntil,
		parents,
		siblings,
		clear,
		insertAfter,
		isInput,
		isVisible,
		prepend,
		remove,
		text
	};
}));
//#endregion
export { init_offset as A, listen$1 as C, request as D, init_animationFrame as E, contains$1 as M, contains_exports as N, init_position as O, init_contains as P, ownerDocument as S, cancel as T, init_querySelectorAll as _, addClass as a, height as b, scrollbarSize as c, init_listen as d, listen as f, init_closest as g, closest_exports as h, removeClass as i, offset as j, position as k, getWidth as l, closest as m, init_esm as n, init_addClass as o, listen_exports as p, init_removeClass as r, init_scrollbarSize as s, esm_exports as t, init_width as u, qsa as v, contains as w, init_height as x, querySelectorAll_exports as y };
