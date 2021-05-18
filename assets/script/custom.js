(function() {
  document.head.appendChild((function() {
    var style = document.createElement('style');
    style.innerHTML = `
      html, body {
        width: 100%;
        height: 100%;
      }
      .page-header .breadcrumb {
        font-size: 1.5rem;
        margin: 1rem 0 -2rem 0;
      }
      .page-header .breadcrumb a {
        color: white;
      }
      .page-header .breadcrumb span {
        text-decoration: overline;
      }
      .main-content.has-menu > .fixed-menu {
        position: fixed;
        z-index: 999;
        left: 0;
        top: 3rem;
        width: 28rem;
        max-width: 80%;
        padding: 0 1rem;
        box-sizing: border-box;
        overflow-y: scroll;
        border: solid transparent 20px;
        border-right: none;
        height: 100%;
        background: white;
      }
      .fixed-menu::-webkit-scrollbar {
        width: 5px;
      }
      .fixed-menu::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
      }
      .fixed-menu::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
        background-color: #159957;
      }
      .menu-anchor {
        position: fixed;
        left: 0;
        top: 0;
        width: 28rem;
        max-width: 80%;
        color: white;
        text-align: center;
        font-size: 2rem;
        line-height: 3rem;
        height: 3rem;
        background: #157c74;
        text-transform: uppercase;
      }
      .menu-anchor:before {
        content: "close";
      }
      .main-content.menu-closed .menu-anchor {
        max-width: 100px;
      }
      .main-content.menu-closed .menu-anchor:before {
        content: "open";
      }
      .main-content.menu-closed .fixed-menu {
        left: -100%;
      }
      `
    return style
  }()))
  function getMenu() {
    var ul = document.querySelector('.main-content > *:first-child')
    if (ul.tagName === 'UL') {
      return ul
    }
  }
  function getHeader() {
    return document.querySelector('.page-header')
  }
  function getContent() {
    return document.querySelector('.main-content')
  }
  function getAnchor() {
    return document.querySelector('.menu-anchor')
  }
  function setStyle(ele, prop, value) {
    let style = ele.getAttribute('style') || ''
    style = style.replace(new RegExp(prop+'\s*:.*?(;|$)', 'g'), '')
    if (value !== void 0) {
      style += prop + ':' + value + ';'
    }
    ele.setAttribute('style', style)
  }
  const isIndex = window.location.pathname[window.location.pathname.length-1] === '/'
  ;(function genBreadcrumb() {
    const div = document.createElement('div')
    div.classList.add('breadcrumb')
    const items = []
    let pathname = window.location.pathname
    while (pathname = pathname.match(/(.*\/)(.+?)(?=\/?$)/)) {
      if (items.length) {
        items.unshift(`<a href="${pathname[0]}">${pathname[2].toUpperCase()}</a>`)
      } else {
        items.unshift(`<span>${pathname[2].toUpperCase()}</span>`)
      }
      pathname = pathname[1]
    }
    items.splice(1, 1) // delete root src
    div.innerHTML = items.join(' / ')
    getHeader().appendChild(div)
  }())
  ;(function genAnchor() {
    const div = document.createElement('div')
    div.classList.add('menu-anchor')
    div.onclick = function() { getContent() && getContent().classList.toggle('menu-closed') }
    getContent() && getContent().appendChild(div)
  }())
  function onScroll() {
    var anchor = getAnchor()
    if (!anchor) return
    var rect = document.querySelector('.main-content').getBoundingClientRect()
    if (rect.y < 0) {
      anchor.setAttribute('style', '')
    } else {
      anchor.setAttribute('style', 'background: transparent')
    }
  }
  function onTouch(ele, cb) {
    const touch = {
      get offset() {
        const [x, y] = this.move
        const [sx, sy] = this.start
        return [x - sx, y - sy]
      },
      get offsetX() {
        const [x, y] = this.move
        const [sx, sy] = this.start
        const [ox, oy] = [x-sx, y-sy]
        return Math.atan(oy/ox)/Math.PI*180
      },
      get offsetY() {
        const [x, y] = this.move
        const [sx, sy] = this.start
        const [ox, oy] = [x-sx, y-sy]
        return Math.atan(ox/oy)/Math.PI*180
      },
      reset() {
        this.start = null
        this.move = null
      }
    }
    ele.addEventListener('touchstart', function(e) {
      e.stopPropagation()
      touch.start = [e.touches[0].screenX, e.touches[0].screenY]
      if (cb.onstart) cb.onstart.call(this, touch)
    })
    if (cb.onmove) {
      ele.addEventListener('touchmove', function(e) {
        e.stopPropagation()
        if (touch.start) {
          touch.move = [e.touches[0].screenX, e.touches[0].screenY]
          cb.onmove.call(this, touch)
        }
      })
    }
    ele.addEventListener('touchend', function(e) {
      e.stopPropagation()
      touch.reset()
      if (cb.reset) cb.reset()
      if (cb.onend) cb.onend.call(this, touch)
    })
  }
  if (!isIndex) {
    getContent() && getContent().classList.add('has-menu')
    getMenu() && getMenu().classList.add('fixed-menu')
    document.addEventListener('scroll', onScroll)

    onTouch(getMenu(), {
      reset() {
        setStyle(getMenu(), 'overflow-y')
        setStyle(document.body, 'overflow-y')
      },
      onmove(touch) {
        if (touch.offset[0] < 0 && !getContent().classList.contains('menu-closed')) {
          if (Math.abs(touch.offsetX) > 30) {
            setStyle(this, 'left')
            touch.reset()
          } else {
            setStyle(getMenu(), 'overflow-y', 'hidden')
            setStyle(document.body, 'overflow-y', 'hidden')
            const left = touch.offset[0]
            touch.triggered = -left > this.offsetWidth * 0.67
            setStyle(this, 'left', left + 'px')
          }
        }
      },
      onend(touch) {
        if (touch.triggered) {
          touch.triggered = false
          setStyle(this, 'left')
          getContent().classList.toggle('menu-closed')
        } else {
          setStyle(this, 'left')
        }
      }
    })
    onTouch(document.body, {
      reset() {
        setStyle(document.body, 'overflow-y')
      },
      onmove(touch) {
        if (touch.offset[0] > 0 && getContent().classList.contains('menu-closed')) {
          if (Math.abs(touch.offsetX) > 30) {
            touch.reset()
          } else {
            setStyle(document.body, 'overflow-y', 'hidden')
            const menu = getMenu()
            const left = touch.offset[0] - menu.offsetWidth
            touch.triggered = -left < menu.offsetWidth * 0.33
            setStyle(menu, 'left', left + 'px')
          }
        }
      },
      onend(touch) {
        if (touch.triggered) {
          touch.triggered = false
          setStyle(getMenu(), 'left')
          getContent().classList.toggle('menu-closed')
        } else {
          setStyle(getMenu(), 'left')
        }
      }
    })
  }
}())
