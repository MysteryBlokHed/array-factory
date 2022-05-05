// ==UserScript==
// @name        array-factory
// @descripton  Array methods that only evaluate for each element when they're needed.
// @version     0.2.0
// @author      Adam Thompson-Sharpe
// @license     MIT OR Apache-2.0
// @homepageURL https://gitlab.com/MysteryBlokHed/array-factory
// ==/UserScript==
(()=>{"use strict";var t={};(()=>{var r=t;Object.defineProperty(r,"__esModule",{value:!0}),r.factoryFlatMap=r.factoryFlat=r.factoryFilter=r.factoryMap=void 0;const o=Object.getPrototypeOf(Object.getPrototypeOf(function*(){}())),e=(t,r)=>{Object.defineProperty(Array.prototype,t,{value:r}),Object.defineProperty(o,t,{value:r})};function*a(t,r,o){o&&(r=r.bind(o));let e=0;for(const o of t)yield r(o,e,t),e++}r.factoryMap=a;function*n(t,r,o){o&&(r=r.bind(o));let e=0;for(const o of t)r(o,e,t)&&(yield o),e++}function*c(t,r){void 0===r&&(r=1);for(const o of t)Array.isArray(o)&&r>0?yield*c(o,r-1):yield o}function*f(t,r,o){o&&(r=r.bind(o));let e=0;for(const o of t){const a=r(o,e,t);e++,Array.isArray(a)?yield*a:yield a}}a([1,2,3],(t=>t)),e("factoryMap",(function(t,r){return a(this,t,r)})),r.factoryFilter=n,e("factoryFilter",(function(t,r){return n(this,t,r)})),r.factoryFlat=c,e("factoryFlat",(function(t){return c(this,t)})),r.factoryFlatMap=f,e("factoryFlatMap",(function(t,r){return f(this,t,r)}))})(),window.ArrayFactory=t})();