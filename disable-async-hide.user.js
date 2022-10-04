// ==UserScript==
// @name         Disable async-hide
// @author       piouc
// @namespace    https://piou.dev
// @version      2.0.0
// @updateURL    https://raw.githubusercontent.com/piouc/user-scripts/master/disable-async-hide.user.js
// @downloadURL  https://raw.githubusercontent.com/piouc/user-scripts/master/disable-async-hide.user.js
// @include      /^https?:\/\/*/
// @grant        none
// ==/UserScript==

document.documentElement.classList.remove('async-hide')