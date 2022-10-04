// ==UserScript==
// @name         Amazon URL normalizer
// @author       piouc
// @namespace    https://piou.dev
// @version      2.0.2
// @updateURL    https://raw.githubusercontent.com/piouc/user-scripts/master/amazon-url-normalizer.user.js
// @downloadURL  https://raw.githubusercontent.com/piouc/user-scripts/master/amazon-url-normalizer.user.js
// @include      https://www.amazon.co.jp/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

// Adding URL change hook
history.pushState = (f => function pushState(){
  var res = f.apply(this, arguments)
  window.dispatchEvent(new Event('pushstate'))
  window.dispatchEvent(new Event('locationchange'))
  return res
})(history.pushState)

history.replaceState = (f => function replaceState(){
  var res = f.apply(this, arguments)
  window.dispatchEvent(new Event('replacestate'))
  window.dispatchEvent(new Event('locationchange'))
  return res
})(history.replaceState)

window.addEventListener('popstate',()=>{
  window.dispatchEvent(new Event('locationchange'))
})

// Utility functions
const getId = (url = location.href) => {
  const regex = /^https:\/\/www.amazon.co.jp\/(?:.+\/)?(?:dp|gp\/product)\/([a-zA-Z0-9]+?)(?:[?\/].*|$)/
  return url.match(regex)?.[1] ?? null
}

const id = getId()
if(id !== null){
// Normalize url
  history.replaceState(history.state, document.title, `https://www.amazon.co.jp/dp/${id}`)

// Insert keepa
  document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.createElement('iframe')
    iframe.style = 'width: 100%; height: 491px; border: 0 none'
    const prevElement = document.getElementById('hover-zoom-end')
    if(prevElement){
      prevElement.parentNode.insertBefore(iframe, prevElement.nextElementSibling)
    }
    const updateUrl = () => {
      const id = getId()
      if(id !==null){
        iframe.src = `https://keepa.com/iframe_addon.html#5-0-${id}`
      }
    }
    window.addEventListener('locationchange', updateUrl)
    updateUrl()
  })
}