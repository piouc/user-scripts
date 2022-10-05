// ==UserScript==
// @name         Disable async-hide
// @author       piouc
// @namespace    https://piou.dev
// @version      2.0.2
// @updateURL    https://github.com/piouc/user-scripts/raw/main/disable-async-hide.user.js
// @downloadURL  https://github.com/piouc/user-scripts/raw/main/disable-async-hide.user.js
// @include      /^https?:\/\/*/
// @grant        none
// ==/UserScript==

document.documentElement.classList.remove('async-hide')