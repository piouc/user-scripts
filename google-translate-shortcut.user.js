// ==UserScript==
// @name         Google tranlate shortcut
// @author       piouc
// @namespace    https://piou.dev
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/piouc/user-scripts/master/google-translate-shortcut.user.js
// @downloadURL  https://raw.githubusercontent.com/piouc/user-scripts/master/google-translate-shortcut.user.js
// @include      /^https?:\/\/*/
// @grant        GM_openInTab
// ==/UserScript==

document.addEventListener('keydown', e => {
  if(e.shiftKey && e.key === 'F1'){
    GM_openInTab(`https://translate.google.com/translate?sl=auto&tl=ja&hl=ja&u=${location.href}`, false)
  }
})