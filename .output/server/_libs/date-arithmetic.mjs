import { r as __exportAll } from "../_runtime.mjs";
//#region node_modules/date-arithmetic/index.js
var date_arithmetic_exports = /* @__PURE__ */ __exportAll({
	add: () => add,
	century: () => century,
	date: () => date,
	day: () => day,
	decade: () => decade,
	diff: () => diff,
	endOf: () => endOf,
	eq: () => eq,
	gt: () => gt,
	gte: () => gte,
	hours: () => hours,
	inRange: () => inRange,
	lt: () => lt,
	lte: () => lte,
	max: () => max,
	milliseconds: () => milliseconds,
	min: () => min,
	minutes: () => minutes,
	month: () => month,
	neq: () => neq,
	seconds: () => seconds,
	startOf: () => startOf,
	subtract: () => subtract,
	weekday: () => weekday,
	year: () => year
});
var MILI = "milliseconds";
var SECONDS = "seconds";
var MINUTES = "minutes";
var HOURS = "hours";
var DAY = "day";
var WEEK = "week";
var MONTH = "month";
var YEAR = "year";
var DECADE = "decade";
var CENTURY = "century";
var multiplierMilli = {
	"milliseconds": 1,
	"seconds": 1e3,
	"minutes": 60 * 1e3,
	"hours": 3600 * 1e3,
	"day": 1440 * 60 * 1e3,
	"week": 10080 * 60 * 1e3
};
var multiplierMonth = {
	"month": 1,
	"year": 12,
	"decade": 120,
	"century": 1200
};
function daysOf(year) {
	return [
		31,
		daysInFeb(year),
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
}
function daysInFeb(year) {
	return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? 29 : 28;
}
function add(d, num, unit) {
	d = new Date(d);
	switch (unit) {
		case MILI:
		case SECONDS:
		case MINUTES:
		case HOURS:
		case DAY:
		case WEEK: return addMillis(d, num * multiplierMilli[unit]);
		case MONTH:
		case YEAR:
		case DECADE:
		case CENTURY: return addMonths(d, num * multiplierMonth[unit]);
	}
	throw new TypeError("Invalid units: \"" + unit + "\"");
}
function addMillis(d, num) {
	return solveDST(d, new Date(+d + num));
}
function addMonths(d, num) {
	var year = d.getFullYear(), month = d.getMonth(), day = d.getDate(), totalMonths = year * 12 + month + num, nextYear = Math.trunc(totalMonths / 12), nextMonth = totalMonths % 12, nextDay = Math.min(day, daysOf(nextYear)[nextMonth]);
	var nextDate = new Date(d);
	nextDate.setFullYear(nextYear);
	nextDate.setDate(1);
	nextDate.setMonth(nextMonth);
	nextDate.setDate(nextDay);
	return nextDate;
}
function solveDST(currentDate, nextDate) {
	var currentOffset = currentDate.getTimezoneOffset();
	var diffMinutes = nextDate.getTimezoneOffset() - currentOffset;
	return new Date(+nextDate + diffMinutes * multiplierMilli["minutes"]);
}
function subtract(d, num, unit) {
	return add(d, -num, unit);
}
function startOf(d, unit, firstOfWeek) {
	d = new Date(d);
	switch (unit) {
		case CENTURY:
		case DECADE:
		case YEAR: d = month(d, 0);
		case MONTH: d = date(d, 1);
		case WEEK:
		case DAY: d = hours(d, 0);
		case HOURS: d = minutes(d, 0);
		case MINUTES: d = seconds(d, 0);
		case SECONDS: d = milliseconds(d, 0);
	}
	if (unit === DECADE) d = subtract(d, year(d) % 10, "year");
	if (unit === CENTURY) d = subtract(d, year(d) % 100, "year");
	if (unit === WEEK) d = weekday(d, 0, firstOfWeek);
	return d;
}
function endOf(d, unit, firstOfWeek) {
	d = new Date(d);
	d = startOf(d, unit, firstOfWeek);
	switch (unit) {
		case CENTURY:
		case DECADE:
		case YEAR:
		case MONTH:
		case WEEK:
			d = add(d, 1, unit);
			d = subtract(d, 1, DAY);
			d.setHours(23, 59, 59, 999);
			break;
		case DAY:
			d.setHours(23, 59, 59, 999);
			break;
		case HOURS:
		case MINUTES:
		case SECONDS:
			d = add(d, 1, unit);
			d = subtract(d, 1, MILI);
	}
	return d;
}
var eq = createComparer(function(a, b) {
	return a === b;
});
var neq = createComparer(function(a, b) {
	return a !== b;
});
var gt = createComparer(function(a, b) {
	return a > b;
});
var gte = createComparer(function(a, b) {
	return a >= b;
});
var lt = createComparer(function(a, b) {
	return a < b;
});
var lte = createComparer(function(a, b) {
	return a <= b;
});
function min() {
	return new Date(Math.min.apply(Math, arguments));
}
function max() {
	return new Date(Math.max.apply(Math, arguments));
}
function inRange(day, min, max, unit) {
	unit = unit || "day";
	return (!min || gte(day, min, unit)) && (!max || lte(day, max, unit));
}
var milliseconds = createAccessor("Milliseconds");
var seconds = createAccessor("Seconds");
var minutes = createAccessor("Minutes");
var hours = createAccessor("Hours");
var day = createAccessor("Day");
var date = createAccessor("Date");
var month = createAccessor("Month");
var year = createAccessor("FullYear");
function decade(d, val) {
	return val === void 0 ? year(startOf(d, DECADE)) : add(d, val + 10, YEAR);
}
function century(d, val) {
	return val === void 0 ? year(startOf(d, CENTURY)) : add(d, val + 100, YEAR);
}
function weekday(d, val, firstDay) {
	var w = (day(d) + 7 - (firstDay || 0)) % 7;
	return val === void 0 ? w : add(d, val - w, DAY);
}
function diff(date1, date2, unit, asFloat) {
	var dividend, divisor, result;
	switch (unit) {
		case MILI:
		case SECONDS:
		case MINUTES:
		case HOURS:
		case DAY:
		case WEEK:
			dividend = date2.getTime() - date1.getTime();
			break;
		case MONTH:
		case YEAR:
		case DECADE:
		case CENTURY:
			dividend = (year(date2) - year(date1)) * 12 + month(date2) - month(date1);
			break;
		default: throw new TypeError("Invalid units: \"" + unit + "\"");
	}
	switch (unit) {
		case MILI:
			divisor = 1;
			break;
		case SECONDS:
			divisor = 1e3;
			break;
		case MINUTES:
			divisor = 1e3 * 60;
			break;
		case HOURS:
			divisor = 1e3 * 60 * 60;
			break;
		case DAY:
			divisor = 1e3 * 60 * 60 * 24;
			break;
		case WEEK:
			divisor = 1e3 * 60 * 60 * 24 * 7;
			break;
		case MONTH:
			divisor = 1;
			break;
		case YEAR:
			divisor = 12;
			break;
		case DECADE:
			divisor = 120;
			break;
		case CENTURY:
			divisor = 1200;
			break;
		default: throw new TypeError("Invalid units: \"" + unit + "\"");
	}
	result = dividend / divisor;
	return asFloat ? result : Math.round(result);
}
function createAccessor(method) {
	var hourLength = (function(method) {
		switch (method) {
			case "Milliseconds": return 36e5;
			case "Seconds": return 3600;
			case "Minutes": return 60;
			case "Hours": return 1;
			default: return null;
		}
	})(method);
	return function(d, val) {
		if (val === void 0) return d["get" + method]();
		var dateOut = new Date(d);
		dateOut["set" + method](val);
		if (hourLength && dateOut["get" + method]() != val && (method === "Hours" || val >= hourLength && dateOut.getHours() - d.getHours() < Math.floor(val / hourLength))) dateOut["set" + method](val + hourLength);
		return dateOut;
	};
}
function createComparer(operator) {
	return function(a, b, unit) {
		return operator(+startOf(a, unit), +startOf(b, unit));
	};
}
//#endregion
export { startOf as _, gt as a, inRange as c, max as d, milliseconds as f, seconds as g, neq as h, eq as i, lt as l, minutes as m, date_arithmetic_exports as n, gte as o, min as p, endOf as r, hours as s, add as t, lte as u };
