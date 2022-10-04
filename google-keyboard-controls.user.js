// ==UserScript==
// @name         Google keyboard controls
// @author       piouc
// @version      2.0.1
// @description  keyboard controls for Google search
// @updateURL    https://raw.githubusercontent.com/piouc/user-scripts/master/google-keyboard-controls.user.js
// @downloadURL  https://raw.githubusercontent.com/piouc/user-scripts/master/google-keyboard-controls.user.js
// @include      /^https?:\/\/www\.google\.(com|co\.jp)\/search/
// @grant        GM.openInTab
// @run-at       document-end
// ==/UserScript==

(() => {
  'use strict'

  const blackList = [
  ]

  const urlReplacers = [
    url => url.replace(/^https:\/\/www\.amazon\.co\.jp\/-\/en\//, 'https://www.amazon.co.jp/')
  ]

  const targetSelector = '[data-sokoban-container]'

  // inselt style
  const style = document.createElement('style')
  document.head.appendChild(style)
  style.sheet.insertRule(`${targetSelector}.focus a h3 {outline: 1px dashed #f84; color: #f84}`, 0)
  style.sheet.insertRule(`${targetSelector}.hide {display: none}`, 0)
  style.sheet.insertRule(`${targetSelector} {scroll-margin: 6rem 0 2rem}`, 0)


  // utils
  function loopIncrement(v, l){
    return v < l ? v + 1 : 0
  }

  function loopDecriment(v, l){
    return v > 0 ? v - 1 : l
  }


  // define variable
  let selectedIndex = null

  let results = Array.from(document.querySelectorAll(`#res ${targetSelector}`)).map(el => {
    const h3 = el.getElementsByTagName('h3')[0]
    if(h3){
      const a = h3.parentElement
      if(a.tagName !== 'A') return
      // replace url
      a.href = urlReplacers.reduce((url, replacer) => replacer(url), a.href)

      // hide blacklisted item
      if(blackList.some(reg => reg.test(a.href))) {
        el.classList.add('hide')
      } else {
        return {element: el, url: a.href}
      }
    }
  }).filter(obj => obj);

  console.log(results);

  const url = window.location.href



  document.addEventListener('keydown', e => {
    /**
     * [Tab] focus next link
     * [Tab + Shift] focus previous link
     */
    if(e.key === 'Tab' && !e.ctrlKey){
      e.preventDefault()

      if(selectedIndex === null){
        selectedIndex = 0
      } else {
        selectedIndex = (e.shiftKey ? loopDecriment : loopIncrement)(selectedIndex, results.length - 1)
      }

      const element = results[selectedIndex].element
      const pos = element.getBoundingClientRect()
      const viewportHeight = document.documentElement.clientHeight

      // unforcus all elements
      Array.from(document.getElementsByClassName('focus')).forEach(el => el.classList.remove('focus'))

      // forcus selected element
      element.classList.add('focus')

      // scroll as required
      element.scrollIntoView({block: 'nearest'})

      return
    }


    /**
     * [Enter] Open selected link in new tab
     * [Enter + Command] Open selected link in current Tab
     */
    if(e.key === 'Enter' && selectedIndex !== null && e.target.tagName !== 'INPUT') {

      e.preventDefault()
      if(e.metaKey){
        location.href = results[selectedIndex].url
      } else {
        GM.openInTab(results[selectedIndex].url, false)
      }

      return
    }


    /**
     * [Escape] Unfocus
     */
    if(e.key === 'Escape'){
      e.preventDefault()

      selectedIndex = null

      // unforcus all elements
      Array.from(document.getElementsByClassName('focus')).forEach(el => el.classList.remove('focus'))

      return
    }


    /**
     * [Control + E] Search English sites
     */
    if(e.key === 'e' && e.ctrlKey && !url.match('lr=lang_en')){
      e.preventDefault()

      const reg = /lr=lang_\w{2}/
      window.location.assign(url.match(reg) ? url.replace(reg, 'lr=lang_en') : url + '&lr=lang_en')

      return
    }


    /**
     * [Control + J] Search Japanese sites
     */
    if(e.key === 'j' && e.ctrlKey && !url.match('lr=lang_ja')){
      e.preventDefault()

      const reg = /lr=lang_\w{2}/
      window.location.assign(url.match(reg) ? url.replace(reg, 'lr=lang_ja') : url + '&lr=lang_ja')

      return
    }
  })

})()