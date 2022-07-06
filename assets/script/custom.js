(function() {

  const TOUCH_SUPPORT = !!(window.DocumentTouch && document instanceof window.DocumentTouch || window.ontouchstart === null)

  function el(tag) {
    const el = (!tag || typeof tag === 'string') ? document.createElement(tag || 'div') : tag
    return {
      get el() {
        return el
      },
      html(html) {
        el.innerHTML = html
        return this
      },
      class(cls) {
        const prefix = cls.replace(/[^~?+-].*$/, v => { cls = v; return '' })
        if (prefix === '~') el.classList.toggle(cls)
        else if (prefix === '-') el.classList.remove(cls)
        else if (prefix === '?') return el.classList.contains(cls)
        else el.classList.add(cls)
        return this
      },
      style(prop, value) {
        let style = el.getAttribute('style') || ''
        style = style.replace(new RegExp(prop+'\s*:.*?(;|$)', 'g'), '')
        if (value !== void 0) {
          style += prop + ':' + value + ';'
        }
        el.setAttribute('style', style)
        return this
      },
      on(event, listener, options) {
        el.addEventListener(event, listener, options)
        return this
      },
      mount(ele) {
        ele.appendChild(el)
        return this
      },
    }
  }

  function onTouch(ele, cb) {
    if (!ele) return
    const touch = {
      get offset() {
        return { x: this.move.x - this.start.x, y: this.move.y - this.start.y }
      },
      get rotate() {
        const offset = this.offset
        return Math.atan(offset.y / offset.x) / Math.PI * 180
      },
      reset() {
        this.start = null
        this.move = null
      }
    }
    ele.addEventListener('touchstart', function(e) {
      e.stopPropagation()
      if (touch.start) return
      touch.start = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      cb.onstart && cb.onstart.call(this, touch, e)
    }, { passive: false })
    if (cb.onmove)
    ele.addEventListener('touchmove', function(e) {
      e.stopPropagation()
      if (touch.start) {
        touch.move = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        cb.onmove.call(this, touch, e)
      }
    }, { passive: false })
    ele.addEventListener('touchend', function(e) {
      e.stopPropagation()
      cb.onend && cb.onend.call(this, touch, e)
      cb.reset && cb.reset()
      touch.reset()
    }, { passive: false })
  }

  function ondrag(ele, cb) {
    const drag = {
      get offset() {
        return { x: this.move.x - this.start.x, y: this.move.y - this.start.y }
      },
      reset() {
        this.start = null
        this.move = null
      }
    }
    ele.addEventListener('dragstart', function(e) {
      if (drag.start) return
      drag.start = { x: e.clientX, y: e.clientY }
      cb.onstart && cb.onstart.call(this, drag, e)
    }, { passive: false })
    ele.addEventListener('dragover', function(e) {
      cb.ondragover ? cb.ondragover.call(this, drag, e) : e.preventDefault()
    })
    if (cb.ondrag)
    ele.addEventListener('drag', function(e) {
      cb.ondrag ? cb.ondrag.call(this, drag, e) : e.preventDefault()
      if (drag.start) {
        drag.move = { x: e.clientX, y: e.clientY }
      }
    }, { passive: false })
    ele.addEventListener('dragend', function(e) {
      drag.move = { x: e.clientX, y: e.clientY }
      cb.reset && cb.reset()
      cb.onend && cb.onend.call(this, drag, e)
      drag.reset()
    }, { passive: false })
  }

  function rem(n = 1) {
    return parseInt(getComputedStyle(document.documentElement).fontSize) * n
  }

  const menu = {
    id: '1fc7ed35',
    ident(str) {
      return `${str}-${this.id}`
    },
    get style() {
      return `
        html, body {
          min-width: 100%;
          min-height: 100%;
        }
        .page-header .${this.ident('breadcrumb')} {
          font-size: 1.5rem;
          margin: 1rem 0 -1rem 0;
        }
        .page-header .${this.ident('breadcrumb')} a {
          color: white;
        }
        .page-header .${this.ident('breadcrumb')} span {
          text-decoration: overline;
        }
        .${this.ident('custom')} code {
          color: #f72585;
        }
        .${this.ident('menu')} {
          position: fixed;
          z-index: 999;
          left: 0;
          top: 0;
          width: 25rem;
          max-width: 90%;
          border: solid 1em transparent;
          margin: 0;
          box-sizing: border-box;
          overflow-y: scroll;
          height: 100%;
          background: white;
          bax-shadow: 0 0 1px #999;
        }
        @media (min-width: 64rem) {
          .${this.ident('custom')}.${this.ident('has-menu')} {
            padding-left: 25rem;
          }
          .${this.ident('custom')} {
            transition: padding-left .3s;
          }
          .${this.ident('custom')}.${this.ident('closed')}{
            padding-left: 0;
          }
        }
        .${this.ident('custom')} .main-content h1,
        .${this.ident('custom')} .main-content h2,
        .${this.ident('custom')} .main-content h3,
        .${this.ident('custom')} .main-content h4,
        .${this.ident('custom')} .main-content h5,
        .${this.ident('custom')} .main-content h6 {
          padding-top: 3rem;
          margin-top: -1rem;
        }
        .${this.ident('custom')}.${this.ident('closed')} .${this.ident('menu')}{
          left: -30rem;
        }
        .${this.ident('menu')}.${this.ident('transitionable')}  {
          transition: left .3s;
        }
        .${this.ident('h1')} {
          font-size: 1.2em;
        }
        .${this.ident('h2')}, .${this.ident('h3')},
        .${this.ident('h4')}, .${this.ident('h5')}, .${this.ident('h6')} {
          font-size: .9em;
        }
        .${this.ident('menu')} {
          padding-inline-start: 1em;
        }
        .${this.ident('menu')} ul {
          margin: .5em;
          padding-inline-start: 1em;
        }
        .${this.ident('menu')} li {
          list-style: none;
        }
        .${this.ident('menu')}::-webkit-scrollbar {
          width: 5px;
        }
        .${this.ident('menu')}::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }
        .${this.ident('menu')}::-webkit-scrollbar-thumb {
          background-color: darkgrey;
          outline: 1px solid slategrey;
          background-color: #159957;
        }
        .${this.ident('anchor')} {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 3rem;
          height: 3rem;
          line-height: 3rem;
          font-size: 2rem;
          color: white;
          text-align: center;
          background: #157c74;
          border-radius: 50%;
          z-index: 999999;
          cursor: pointer;
          transition: .3s;
          user-select: none;
        }
        .${this.ident('anchor')}:hover {
          box-shadow: 0 0 22px #157c74;
        }
        .${this.ident('anchor')}:before {
          content: "S";
        }
        .${this.ident('custom')}.${this.ident('closed')} .${this.ident('anchor')}:before {
          content: "O";
        }
        .${this.ident('menu')} .${this.ident('handle')} {
          display: inline-block;
          vertical-align: middle;
          margin: -5px 12px 0 -20px;
          border-width: 5px 0 5px 8px;
          border-style: solid;
          border-color: transparent transparent transparent lightgray;
          cursor: pointer;
          transform-origin: center;
          transition: .2s;
        }
        .${this.ident('menu')} .${this.ident('handle')}.${this.ident('active')} {
          transform: rotate(90deg);
        }
        .${this.ident('menu')} .${this.ident('handle')} ~ ul {
          height: 0;
          margin: 0;
          overflow: hidden;
        }
        .${this.ident('menu')} .${this.ident('handle')}.${this.ident('active')} ~ ul {
          height: auto;
          margin: 0.5em;
          overflow: visible;
        }
      `
    },
    get menu() {
      return document.querySelector('.' + this.ident('menu'))
    },
    get header() {
      return document.querySelector('.page-header')
    },
    get content() {
      return document.querySelector('.main-content')
    },
    toggle() {
      el(this.menu).style('left')
      el(document.body).class('~' + this.ident('closed'))
    },
    close() {
      el(this.menu).style('left')
      el(document.body).class('+' + this.ident('closed'))
    },
    open() {
      el(this.menu).style('left')
      el(document.body).class('-' + this.ident('closed'))
    },
    onClickMenu(evt) {
      const classes = evt.target.classList
      if (classes.contains(this.ident('handle'))) {
        classes.toggle(this.ident('active'))
      }
    },
    mountStyle() {
      el('style').html(this.style).mount(document.head)
    },
    mountBreadcrumb() {
      const items = []
      let pathname = window.location.pathname
      // @ts-ignore
      while (pathname = pathname.match(/(.*\/)(.+?)(?=\/?$)/)) {
        if (items.length) {
          items.unshift(`<a href="${pathname[0]}">${pathname[2].toUpperCase()}</a>`)
        } else {
          items.unshift(`<span>${pathname[2].toUpperCase()}</span>`)
        }
        pathname = pathname[1]
      }
      items.splice(1, 1) // delete root src
      el().class(this.ident('breadcrumb'))
      .html(items.join(' / '))
      .mount(this.header)
    },
    generateMenu() {
      const it = this
      if (!this.content) return ''
      const headers = this.content.querySelectorAll('h1,h2,h3,h4,h5,h6')
      let plv = 0
      const chain = []
      function closeLast(lv, withContent = '') {
        if (!chain[lv]) return
        const last = chain[lv][chain[lv].length - 1]
        if (last) {
          if (typeof last === 'string') {
            chain[lv][chain[lv].length - 1] = last + withContent
          } else {
            chain[lv][chain[lv].length - 1] = last[0] + (withContent && `<div class="${it.ident('handle')}"></div>`) + last.slice(1, -1).join('') + withContent + last.pop()
          }
        }
      }
      function close(start = 0) {
        let end = chain.length - 1
        while (end > start) {
          closeLast(end)
          closeLast(end - 1, `<ul class="${it.ident('h' + end)}">${chain[end].join('')}</ul>`)
          end > 1 && chain.pop()
          end--
        }
      }
      function skipBetween(start, end) {
        let skip = end - start - 1
        while (skip) {
          chain[start + skip] = [['<li>', '</li>']]
          skip--
        }
      }
      for (const h of headers) {
        const lv = +h.tagName[1]
        const html = [`<li>`, `<a href="#${h.id}">${h.innerHTML}</a>`, '</li>']
        if (plv === lv) {
          closeLast(lv)
          chain[lv].push(html)
        } else if (plv < lv) {
          skipBetween(plv, lv)
          chain[lv] = [html]
        } else if (plv > lv) {
          close(lv)
          chain[lv].push(html)
        }
        plv = lv
      }
      close()
      return chain.find(e => e).join('')
    },
    mountMenu() {

      el('ul').class(this.ident('menu'))
        .class(this.ident('h1'))
        .class(this.ident('transitionable'))
        .html(this.generateMenu())
        .mount(document.body)
        .on('click', (e) => this.onClickMenu(e))

      el(document.body).class(this.ident('has-menu'))

      const it = this
      onTouch(it.menu, {
        onstart() {
          el(it.menu).class(it.ident('-transitionable'))
        },
        reset() {
          el(it.menu).style('overflow-y')
          el(document.body).style('overflow-y')
          el(it.menu).class(it.ident('transitionable'))
        },
        onmove(touch, e) {
          if (touch.offset.x < 0 && !el(document.body).class('?' + it.ident('closed'))) {
            if (Math.abs(touch.rotate) > 30) {
              el(this).style('left')
              touch.reset()
            } else {
              e.preventDefault()
              el(it.menu).style('overflow-y', 'hidden')
              el(document.body).style('overflow-y', 'hidden')
              const left = touch.offset.x
              touch.triggered = -left > this.offsetWidth * 0.2
              el(this).style('left', left + 'px')
            }
          }
        },
        onend(touch) {
          el(it.menu).class(it.ident('transitionable'))
          if (touch.triggered) {
            touch.triggered = false
            it.close()
          } else {
            el(it.menu).style('left')
          }
        }
      })
      onTouch(document.body, {
        onstart() {
          el(it.menu).class(it.ident('-transitionable'))
        },
        reset() {
          el(document.body).style('overflow-y')
          el(it.menu).class(it.ident('transitionable'))
        },
        onmove(touch, e) {
          if (touch.offset.x > 0 && el(document.body).class('?' + it.ident('closed'))) {
            if (Math.abs(touch.rotate) > 30) {
              touch.reset()
            } else {
              e.preventDefault()
              el(document.body).style('overflow-y', 'hidden')
              const right = touch.offset.x
              // @ts-ignore
              const menuWidth = it.menu.offsetWidth
              touch.triggered = right > menuWidth * 0.2
              el(it.menu).style('left', right - menuWidth + 'px')
            }
          }
        },
        onend(touch) {
          el(it.menu).class(it.ident('transitionable'))
          if (touch.triggered) {
            touch.triggered = false
            it.open()
          } else {
            el(it.menu).style('left')
          }
        }
      })
    },
    mountAnchor() {
      if (TOUCH_SUPPORT) return
      const anchor = el()
      .class(this.ident('anchor'))
      .on('click', () => this.toggle())
      .mount(document.body)
      .el

      anchor.draggable = true

      ondrag(anchor, {
        onend(drag) {
          const h = document.documentElement.clientHeight
          const ah = anchor.offsetHeight
          const y = Math.min(Math.max(drag.move.y, ah), h)
          el(anchor).style('bottom', 100 * (h - y) / h + '%')
        }
      })
    },
    mount() {
      if (!this._mounted) {
        TOUCH_SUPPORT && el(document.body).class(this.ident('touch-support'))
        el(document.body).class(this.ident('custom'))
        this.mountStyle()
        this.mountBreadcrumb()
        const isCatalog = window.location.pathname[window.location.pathname.length-1] === '/'
        if (!isCatalog) {
          this.mountMenu()
          this.mountAnchor()
        }
        return this._mounted = true
      } return false
    },
  }

  menu.mount()

  menu.menu.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      if (document.body.offsetWidth < rem(64)) {
        menu.close()
      }
    }
  })
}())

;(function() {
  // @ts-ignore
  function initMermaid() {
    window.mermaid.initialize({
      startOnLoad: true,
      theme: "forest",
      flowchart:{
        useMaxWidth: true,
        htmlLabels: true
      }
    })
    window.mermaid.init(undefined, document.querySelectorAll('.language-mermaid'))
  }
  if (window.mermaid) {
    initMermaid()
  } else {
    for (const script of document.scripts) {
      if (/mermaid/.test(script.src)) {
        script.onload = initMermaid
      }
    }
  }
}())
