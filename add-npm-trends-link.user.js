// ==UserScript==
// @name         Add npm trends link
// @namespace    https://piou.dev
// @version      0.0.1
// @updateURL    https://github.com/piouc/user-scripts/raw/main/add-npm-trends-link.user.js
// @downloadURL  https://github.com/piouc/user-scripts/raw/main/add-npm-trends-link.user.js
// @description  Add npm trends to npmjs.com
// @author       You
// @match        https://www.npmjs.com/package/*
// @grant        none
// ==/UserScript==

(function() {
  const titleOuter = document.querySelector('#top > div:first-child > h1')
  const template = document.createElement('template')
  const packageName = location.pathname.match(/(?<=\/)[^\/]*?$/)[0]
  template.innerHTML = `
    <a href="https://npmtrends.com/${packageName}" target="_blank">
      <img src="https://npmtrends.com/favicon.ico" width="20" height="20" style="margin-left: 1rem;" title="Open npm trends">
    </div>
  `
  titleOuter.appendChild(template.content)
})();