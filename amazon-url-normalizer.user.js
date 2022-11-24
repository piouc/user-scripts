// ==UserScript==
// @name         Amazon URL normalizer
// @author       piouc
// @namespace    https://piou.dev
// @version      2.0.6
// @updateURL    https://github.com/piouc/user-scripts/raw/main/amazon-url-normalizer.user.js
// @downloadURL  https://github.com/piouc/user-scripts/raw/main/amazon-url-normalizer.user.js
// @include      https://www.amazon.co.jp/*
// @grant        window.onurlchange
// @run-at       document-start
// @noframes
// ==/UserScript==

// Utility functions
const getId = (url = location.href) => {
  const regex = /^https:\/\/www.amazon.co.jp\/(?:.+\/)?(?:dp|gp\/product)\/([a-zA-Z0-9]+?)(?:[?\/].*|$)/
  return url.match(regex)?.[1] ?? null
}

const insertBefore = (el, target) => {
  const prevElement = target
  if(prevElement){
    prevElement.parentNode.insertBefore(el, prevElement.nextElementSibling)
  }
}

const id = getId()
if(id !== null){
  // Normalize url
  history.replaceState(history.state, document.title, `https://www.amazon.co.jp/dp/${id}`)

  // Insert keepa
  document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.createElement('iframe')
    iframe.style = 'width: 100%; height: 491px; border: 0 none'
    insertBefore(iframe, document.getElementById('hover-zoom-end'))

    const updateUrl = () => {
      const id = getId()
      if(id !== null){
        iframe.src = `https://keepa.com/iframe_addon.html#5-0-${id}`
      }
    }

    if('onurlchange' in window){
      window.addEventListener('urlchange', updateUrl)
    }

    updateUrl()
  })
}