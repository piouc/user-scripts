// ==UserScript==
// @name         nicovideo fake premium
// @author       piouc
// @namespace    https://piou.dev
// @version      2.0.0
// @updateURL    https://raw.githubusercontent.com/piouc/user-scripts/master/nicovideo-fake-premium.user.js 
// @downloadURL  https://raw.githubusercontent.com/piouc/user-scripts/master/nicovideo-fake-premium.user.js 
// @include      https://www.nicovideo.jp/watch/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

const observer = new MutationObserver((mutations) => {
  for(const mutation of mutations){
    for(const node of mutation.addedNodes){
      if(node.nodeName !== 'SCRIPT') break

      const dataElement = document.getElementById('js-initial-watch-data')
      const data = JSON.parse(dataElement.dataset.apiData)
      if(data?.viewer){
        data.viewer.isPremium = true
        dataElement.dataset.apiData = JSON.stringify(data)
      }
      
      const headerDataElement = document.getElementById('CommonHeader')
      const headerData = JSON.parse(headerDataElement.dataset.commonHeader)
      if(headerData?.initConfig?.user){
        headerData.initConfig.user.isPremium = true
        headerDataElement.dataset.commonHeader = JSON.stringify(headerData)
      }

      observer.disconnect()

      return
    }
  }
})
observer.observe(document, {childList: true, subtree: true})