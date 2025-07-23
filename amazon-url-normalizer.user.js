// ==UserScript==
// @name         Amazon URL normalizer
// @author       piouc
// @namespace    https://piou.dev
// @version      3.0.1
// @updateURL    https://github.com/piouc/user-scripts/raw/main/amazon-url-normalizer.user.js
// @downloadURL  https://github.com/piouc/user-scripts/raw/main/amazon-url-normalizer.user.js
// @include      https://www.amazon.co.jp/*
// @include      https://amazon.co.jp/*
// @include      https://keepa.com/*
// @connect      keepa.com
// @grant        window.onurlchange
// @run-at       document-start
// ==/UserScript==

if(/(www\.)?amazon\.co\.jp/.test(location.hostname)){
  // Utility functions
  const getId = (url = location.href) => {
    const regex = /^https:\/\/www.amazon\.co\.jp\/(?:.+\/)?(?:dp|gp\/product)\/([a-zA-Z0-9]+?)(?:[?\/].*|$)/
    return url.match(regex)?.[1] ?? null
  }

  const insertAfter = (el, target) => {
    if(target){
      target.parentNode.insertBefore(el, target.nextElementSibling)
    }
  }

  const parseCookie = str => str.split(';').reduce((acc, record) => {
    const [key, value] = record.split('=')
    acc[decodeURIComponent(key.trim())] = decodeURIComponent(value.trim())
    return acc
  }, {})

  // Force language
  if(parseCookie(document.cookie)['lc-acbjp'] !== 'ja_JP'){
    document.cookie = 'lc-acbjp=ja_JP;path=/;max-age=31536000'
    location.reload()
  }

  // Add keepa iframe
  const id = getId()
  if(id !== null){
    // Normalize url
    history.replaceState(history.state, document.title, `https://www.amazon.co.jp/dp/${id}`)

    // Insert keepa
    document.addEventListener('DOMContentLoaded', () => {
      const iframe = document.createElement('iframe')
      iframe.setAttribute('style', 'width: 100%; height: 627px; border: 0 none')
      insertAfter(iframe, document.querySelector('#ppd, #bottomRow'))

      const updateUrl = () => {
        const id = getId()
        if(id !== null){
          iframe.src = `https://keepa.com/#!product/5-${id}`
        }
      }

      if('onurlchange' in window){
        window.addEventListener('urlchange', updateUrl)
      }

      updateUrl()
    })
  }
} else {
  if(top !== window){
    const style = document.createElement('style')
    style.innerHTML = `
      :root {
        background-color: transparent !important;
      }
      body:has(#productTableDescription) {
        *:not(:has(#productTableDescription)):not(#productTableDescription *, #productTableDescription) {
          display: none;
        }
        *:has(#productTableDescription) {
          all: unset;
        }
      }
      .productTableDescriptionTitle,
      .productTableDescriptionBrand {
        display: none;
      }
    `
    document.head.appendChild(style)
  }
}