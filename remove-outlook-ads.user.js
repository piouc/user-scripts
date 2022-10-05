// ==UserScript==
// @name         Remove outlook ads
// @author       piouc
// @namespace    https://piou.dev
// @version      2.0.2
// @updateURL    https://github.com/piouc/user-scripts/raw/main/remove-outlook-ads.user.js
// @downloadURL  https://github.com/piouc/user-scripts/raw/main/remove-outlook-ads.user.js
// @include      https://outlook.live.com/mail/*
// @grant        none
// ==/UserScript==

const style = document.createElement('style')
document.head.appendChild(style)

style.sheet.insertRule(`
  [aria-label="Message list"] .full,
  [aria-label="Navigation pane"] button,
  #MainModule div[data-max-width="2400"] + div,
  #MainModule + div {
    display: none !important;
  }
`)