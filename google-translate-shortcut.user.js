// ==UserScript==
// @name         Google tranlate shortcut
// @author       piouc
// @namespace    https://piou.dev
// @version      1.0.4
// @updateURL    https://github.com/piouc/user-scripts/raw/main/google-translate-shortcut.user.js
// @downloadURL  https://github.com/piouc/user-scripts/raw/main/google-translate-shortcut.user.js
// @include      /^https?:\/\/*/
// @grant        GM_openInTab
// @noframes
// ==/UserScript==

document.addEventListener('keydown', e => {
  if(e.shiftKey && e.key === 'F1'){
    const selectedText = window.getSelection().toString()

    if(selectedText.length > 0){
      GM_openInTab(`https://translate.google.com/?sl=auto&tl=ja&text=${encodeURIComponent(selectedText)}`, false)
    } else {
      GM_openInTab(`https://translate.google.com/translate?sl=auto&tl=ja&u=${location.href}`, false)
    }
  }
})