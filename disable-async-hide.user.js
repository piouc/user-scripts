// ==UserScript==
// @name         Disable async-hide
// @author       piouc
// @namespace    https://piou.dev
// @version      2.0.3
// @updateURL    https://github.com/piouc/user-scripts/raw/main/disable-async-hide.user.js
// @downloadURL  https://github.com/piouc/user-scripts/raw/main/disable-async-hide.user.js
// @include      /^https?:\/\/*/
// @grant        none
// @noframes
// ==/UserScript==

document.documentElement.classList.remove('async-hide')