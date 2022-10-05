// ==UserScript==
// @name         Google tranlate shortcut
// @author       piouc
// @namespace    https://piou.dev
// @version      1.0.2
// @updateURL    https://github.com/piouc/user-scripts/raw/main/google-translate-shortcut.user.js
// @downloadURL  https://github.com/piouc/user-scripts/raw/main/google-translate-shortcut.user.js
// @include      /^https?:\/\/*/
// @grant        GM_openInTab
// ==/UserScript==

document.addEventListener('keydown', e => {
  if(e.shiftKey && e.key === 'F1'){
    GM_openInTab(`https://translate.google.com/translate?sl=auto&tl=ja&hl=ja&u=${location.href}`, false)
  }
})