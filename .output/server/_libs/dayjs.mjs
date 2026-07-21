import { t as __commonJSMin } from "../_runtime.mjs";
//#region node_modules/dayjs/plugin/isBetween.js
var require_isBetween = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, i) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isBetween = i();
	})(exports, (function() {
		"use strict";
		return function(e, i, t) {
			i.prototype.isBetween = function(e, i, s, f) {
				var n = t(e), o = t(i), r = "(" === (f = f || "()")[0], u = ")" === f[1];
				return (r ? this.isAfter(n, s) : !this.isBefore(n, s)) && (u ? this.isBefore(o, s) : !this.isAfter(o, s)) || (r ? this.isBefore(n, s) : !this.isAfter(n, s)) && (u ? this.isAfter(o, s) : !this.isBefore(o, s));
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/isSameOrAfter.js
var require_isSameOrAfter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrAfter = t();
	})(exports, (function() {
		"use strict";
		return function(e, t) {
			t.prototype.isSameOrAfter = function(e, t) {
				return this.isSame(e, t) || this.isAfter(e, t);
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/isSameOrBefore.js
var require_isSameOrBefore = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, i) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isSameOrBefore = i();
	})(exports, (function() {
		"use strict";
		return function(e, i) {
			i.prototype.isSameOrBefore = function(e, i) {
				return this.isSame(e, i) || this.isBefore(e, i);
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/localeData.js
var require_localeData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(n, e) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (n = "undefined" != typeof globalThis ? globalThis : n || self).dayjs_plugin_localeData = e();
	})(exports, (function() {
		"use strict";
		return function(n, e, t) {
			var r = e.prototype, o = function(n) {
				return n && (n.indexOf ? n : n.s);
			}, u = function(n, e, t, r, u) {
				var i = n.name ? n : n.$locale(), a = o(i[e]), s = o(i[t]), f = a || s.map((function(n) {
					return n.slice(0, r);
				}));
				if (!u) return f;
				var d = i.weekStart;
				return f.map((function(n, e) {
					return f[(e + (d || 0)) % 7];
				}));
			}, i = function() {
				return t.Ls[t.locale()];
			}, a = function(n, e) {
				return n.formats[e] || function(n) {
					return n.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(n, e, t) {
						return e || t.slice(1);
					}));
				}(n.formats[e.toUpperCase()]);
			}, s = function() {
				var n = this;
				return {
					months: function(e) {
						return e ? e.format("MMMM") : u(n, "months");
					},
					monthsShort: function(e) {
						return e ? e.format("MMM") : u(n, "monthsShort", "months", 3);
					},
					firstDayOfWeek: function() {
						return n.$locale().weekStart || 0;
					},
					weekdays: function(e) {
						return e ? e.format("dddd") : u(n, "weekdays");
					},
					weekdaysMin: function(e) {
						return e ? e.format("dd") : u(n, "weekdaysMin", "weekdays", 2);
					},
					weekdaysShort: function(e) {
						return e ? e.format("ddd") : u(n, "weekdaysShort", "weekdays", 3);
					},
					longDateFormat: function(e) {
						return a(n.$locale(), e);
					},
					meridiem: this.$locale().meridiem,
					ordinal: this.$locale().ordinal
				};
			};
			r.localeData = function() {
				return s.bind(this)();
			}, t.localeData = function() {
				var n = i();
				return {
					firstDayOfWeek: function() {
						return n.weekStart || 0;
					},
					weekdays: function() {
						return t.weekdays();
					},
					weekdaysShort: function() {
						return t.weekdaysShort();
					},
					weekdaysMin: function() {
						return t.weekdaysMin();
					},
					months: function() {
						return t.months();
					},
					monthsShort: function() {
						return t.monthsShort();
					},
					longDateFormat: function(e) {
						return a(n, e);
					},
					meridiem: n.meridiem,
					ordinal: n.ordinal
				};
			}, t.months = function() {
				return u(i(), "months");
			}, t.monthsShort = function() {
				return u(i(), "monthsShort", "months", 3);
			}, t.weekdays = function(n) {
				return u(i(), "weekdays", null, null, n);
			}, t.weekdaysShort = function(n) {
				return u(i(), "weekdaysShort", "weekdays", 3, n);
			}, t.weekdaysMin = function(n) {
				return u(i(), "weekdaysMin", "weekdays", 2, n);
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/localizedFormat.js
var require_localizedFormat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_localizedFormat = t();
	})(exports, (function() {
		"use strict";
		var e = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		};
		return function(t, o, n) {
			var r = o.prototype, i = r.format;
			n.en.formats = e, r.format = function(t) {
				void 0 === t && (t = "YYYY-MM-DDTHH:mm:ssZ");
				var o = this.$locale().formats, n = function(t, o) {
					return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, (function(t, n, r) {
						var i = r && r.toUpperCase();
						return n || o[r] || e[r] || o[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, (function(e, t, o) {
							return t || o.slice(1);
						}));
					}));
				}(t, void 0 === o ? {} : o);
				return i.call(this, n);
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/minMax.js
var require_minMax = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, n) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_minMax = n();
	})(exports, (function() {
		"use strict";
		return function(e, n, t) {
			var i = function(e, n) {
				if (!n || !n.length || 1 === n.length && !n[0] || 1 === n.length && Array.isArray(n[0]) && !n[0].length) return null;
				var t;
				1 === n.length && n[0].length > 0 && (n = n[0]);
				t = (n = n.filter((function(e) {
					return e;
				})))[0];
				for (var i = 1; i < n.length; i += 1) n[i].isValid() && !n[i][e](t) || (t = n[i]);
				return t;
			};
			t.max = function() {
				return i("isAfter", [].slice.call(arguments, 0));
			}, t.min = function() {
				return i("isBefore", [].slice.call(arguments, 0));
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/utc.js
var require_utc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(t, i) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_utc = i();
	})(exports, (function() {
		"use strict";
		var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
		return function(s, f, n) {
			var u = f.prototype;
			n.utc = function(t) {
				return new f({
					date: t,
					utc: !0,
					args: arguments
				});
			}, u.utc = function(i) {
				var e = n(this.toDate(), {
					locale: this.$L,
					utc: !0
				});
				return i ? e.add(this.utcOffset(), t) : e;
			}, u.local = function() {
				return n(this.toDate(), {
					locale: this.$L,
					utc: !1
				});
			};
			var r = u.parse;
			u.parse = function(t) {
				t.utc && (this.$u = !0), this.$utils().u(t.$offset) || (this.$offset = t.$offset), r.call(this, t);
			};
			var o = u.init;
			u.init = function() {
				if (this.$u) {
					var t = this.$d;
					this.$y = t.getUTCFullYear(), this.$M = t.getUTCMonth(), this.$D = t.getUTCDate(), this.$W = t.getUTCDay(), this.$H = t.getUTCHours(), this.$m = t.getUTCMinutes(), this.$s = t.getUTCSeconds(), this.$ms = t.getUTCMilliseconds();
				} else o.call(this);
			};
			var a = u.utcOffset;
			u.utcOffset = function(s, f) {
				var n = this.$utils().u;
				if (n(s)) return this.$u ? 0 : n(this.$offset) ? a.call(this) : this.$offset;
				if ("string" == typeof s && (s = function(t) {
					void 0 === t && (t = "");
					var s = t.match(i);
					if (!s) return null;
					var f = ("" + s[0]).match(e) || [
						"-",
						0,
						0
					], n = f[0], u = 60 * +f[1] + +f[2];
					return 0 === u ? 0 : "+" === n ? u : -u;
				}(s), null === s)) return this;
				var u = Math.abs(s) <= 16 ? 60 * s : s;
				if (0 === u) return this.utc(f);
				var r = this.clone();
				if (f) return r.$offset = u, r.$u = !1, r;
				var o = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
				return (r = this.local().add(u + o, t)).$offset = u, r.$x.$localOffset = o, r;
			};
			var h = u.format;
			u.format = function(t) {
				var i = t || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
				return h.call(this, i);
			}, u.valueOf = function() {
				var t = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
				return this.$d.valueOf() - 6e4 * t;
			}, u.isUTC = function() {
				return !!this.$u;
			}, u.toISOString = function() {
				return this.toDate().toISOString();
			}, u.toString = function() {
				return this.toDate().toUTCString();
			};
			var l = u.toDate;
			u.toDate = function(t) {
				return "s" === t && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
			};
			var c = u.diff;
			u.diff = function(t, i, e) {
				if (t && this.$u === t.$u) return c.call(this, t, i, e);
				var s = this.local(), f = n(t).local();
				return c.call(s, f, i, e);
			};
		};
	}));
}));
//#endregion
//#region node_modules/dayjs/plugin/isLeapYear.js
var require_isLeapYear = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isLeapYear = t();
	})(exports, (function() {
		"use strict";
		return function(e, t) {
			t.prototype.isLeapYear = function() {
				return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
			};
		};
	}));
}));
//#endregion
export { require_localeData as a, require_isBetween as c, require_localizedFormat as i, require_utc as n, require_isSameOrBefore as o, require_minMax as r, require_isSameOrAfter as s, require_isLeapYear as t };
