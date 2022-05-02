// ==UserScript==
// @name        array-factory
// @descripton  Array methods that only evaluate for each element when they're needed.
// @version     0.1.0
// @author      Adam Thompson-Sharpe
// @license     MIT OR Apache-2.0
// @homepageURL https://gitlab.com/MysteryBlokHed/array-factory
// ==/UserScript==
(()=>{"use strict";var t={};(()=>{var r=t;Object.defineProperty(r,"__esModule",{value:!0}),r.factoryFlatMap=r.factoryFlat=r.factoryFilter=r.factoryMap=void 0;const o=(t,r)=>Object.defineProperty(Array.prototype,t,{value:r});function*a(t,r,o){o&&(r=r.bind(o));for(let o=0;o<t.length;o++)yield r(t[o],o,t)}function*e(t,r,o){o&&(r=r.bind(o));for(let o=0;o<t.length;o++){const a=t[o];r(a,o,t)&&(yield a)}}function*n(t,r){void 0===r&&(r=1);for(const o of t)Array.isArray(o)&&r>0?yield*n(o,r-1):yield o}function*i(t,r,o){o&&(r=r.bind(o));for(let o=0;o<t.length;o++){const a=r(t[o],o,t);Array.isArray(a)?yield*a:yield a}}r.factoryMap=a,o("factoryMap",(function(t,r){return a(this,t,r)})),r.factoryFilter=e,o("factoryFilter",(function(t,r){return e(this,t,r)})),r.factoryFlat=n,o("factoryFlat",(function(t){return n(this,t)})),r.factoryFlatMap=i,o("factoryFlatMap",(function(t,r){return i(this,t,r)}))})(),window.ArrayFactory=t})();