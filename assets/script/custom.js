// @ts-nocheck
(function () {
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
        style = style.replace(new RegExp(prop + '\s*:.*?(;|$)', 'g'), '')
        if (value !== void 0) {
          style += prop + ':' + value + ';'
        }
        el.setAttribute('style', style)
        return this
      },
      attr(k, v) {
        el.setAttribute(k, v)
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
      append(e) {
        el.appendChild(e.el || e)
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
    ele.addEventListener('touchstart', function (e) {
      e.stopPropagation()
      if (touch.start) return
      touch.start = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      cb.onstart && cb.onstart.call(this, touch, e)
    }, { passive: false })
    if (cb.onmove)
      ele.addEventListener('touchmove', function (e) {
        e.stopPropagation()
        if (touch.start) {
          touch.move = { x: e.touches[0].clientX, y: e.touches[0].clientY }
          cb.onmove.call(this, touch, e)
        }
      }, { passive: false })
    ele.addEventListener('touchend', function (e) {
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
    ele.addEventListener('dragstart', function (e) {
      if (drag.start) return
      drag.start = { x: e.clientX, y: e.clientY }
      cb.onstart && cb.onstart.call(this, drag, e)
    }, { passive: false })
    ele.addEventListener('dragover', function (e) {
      cb.ondragover ? cb.ondragover.call(this, drag, e) : e.preventDefault()
    })
    if (cb.ondrag)
      ele.addEventListener('drag', function (e) {
        cb.ondrag ? cb.ondrag.call(this, drag, e) : e.preventDefault()
        if (drag.start) {
          drag.move = { x: e.clientX, y: e.clientY }
        }
      }, { passive: false })
    ele.addEventListener('dragend', function (e) {
      drag.move = { x: e.clientX, y: e.clientY }
      cb.reset && cb.reset()
      cb.onend && cb.onend.call(this, drag, e)
      drag.reset()
    }, { passive: false })
  }

  function rem(n = 1) {
    return parseInt(getComputedStyle(document.documentElement).fontSize) * n
  }

  ;(function menu() {
    const menu = {
      id: '1fc7ed35',
      ident(str) {
        return `${str}-${this.id}`
      },
      get themes() {
        return [['light', '🌔'], ['dark', '🌘']]
      },
      get levels() {
        return [[1, '1️⃣'], [2, '2️⃣'], [3, '3️⃣'], [4, '4️⃣'], [5, '5️⃣'], [6, '6️⃣']]
      },
      get style() {
        return `
          html, body {
            min-width: 100%;
            min-height: 100%;
          }
          .${this.ident('breadcrumb')} a {
            color: white;
            font-size: 1.5rem;
          }
          .${this.ident('breadcrumb')} .btn:hover {
            background: unset;
          }
          .${this.ident('breadcrumb')} .btn.current {
            color: white;
            background: unset;
            font-weight: bold;
          }
          @media (max-width: 104rem) {
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
          .${this.ident('custom')}.${this.ident('closed')} .${this.ident('menu')}{
            left: -30rem;
          }
          .${this.ident('h1')} {
            font-size: 1.1em;
          }
          .${this.ident('menu')} {
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
            width: 25rem;
            max-width: 90%;
            border: solid 1em transparent;
            border-bottom-width: 70px;
            margin: 0;
            box-sizing: border-box;
            overflow-y: scroll;
            height: 100%;
            background: white;
            box-shadow: 0 0 1px #999;
            padding-inline-start: 1.2em;
          }
          .${this.ident('menu')}.${this.ident('transitionable')}  {
            transition: left .3s;
          }
          .${this.ident('menu')} ul {
            padding-inline-start: 1em;
          }
          .${this.ident('menu')} li {
            list-style: none;
            margin: 6px 0;
            padding: 0;
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
            transform: rotate(90deg);
            transition: .2s;
          }
          .${this.ident('menu')} li.${this.ident('close')} > ul {
            height: 0;
            margin: 0;
            overflow: hidden;
          }
          .${this.ident('menu')} li.${this.ident('close')} > .${this.ident('handle')} {
            transform: rotate(0);
          }
          .${this.ident('bar')} {
            position: fixed;
            z-index: 999;
            left: 20px;
            bottom: 20px;
            color: #006bff;
            display: flex;
          }
          .${this.ident('bar')} > * {
            height: 40px;
            outline: none;
            border: none;
            appearance: none;
            border-radius: 50%;
            box-shadow: 0 0 5px #b1b1b1, 0 0 30px #b1b1b1;
            width: 40px;
            margin-right: 5px;
            text-align: center;
            line-height: 40px;
            user-select: none;
            -webkit-user-select: none;
          }
          .${this.ident('bar')} .handle:before {
            content: "🐵";
          }
          .${this.ident('custom')}.${this.ident('closed')} .${this.ident('bar')} .handle:before {
            content: "🙈";
          }
          .${this.ident('custom')}.${this.ident('closed')} .${this.ident('bar')} .level {
            display: none;
          }
          .${this.ident('global-nav')} {
            position: relative;
          }
          .${this.ident('global-nav')}:before, .${this.ident('global-nav')}:after {
            content: '';
            width: 40%;
            height: 40%;
            border-radius: 50%;
            background-color: #006bff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s;
          }
          .${this.ident('global-nav')}:after {
            width: 0%;
            height: 0%;
            background-color: white;
          }
          .${this.ident('global-nav')}:hover:before {
            width: 100%;
            height: 100%;
          }
          .${this.ident('global-nav')}:hover:after {
            width: 40%;
            height: 40%;
          }
          .${this.ident('global-nav')} > div > div {
            display: flex;
            align-items: center;
          }
          .${this.ident('global-nav')} > div > div > div {
            margin-right: 10px;
          }
          .${this.ident('global-nav')} input {
            outline: none;
            border-radius: 2px;
            padding: 2px;
            text-align: center;
            border: none;
            border-bottom: solid 1px;
            color: #006bff;
            font-weight: bold;
            font-family: Optima;
            font-size: 1.4em;
          }
          .${this.ident('global-nav')} ul {
            transition: 0.3s;
            list-style: none;
            padding: 0px 20px;
            text-align: left;
            line-height: normal;
          }
          .${this.ident('global-nav')}:hover > div {
            transform: scale(1);
          }
          .${this.ident('global-nav')} > div {
            position: absolute;
            left: 100%;
            bottom: 0;
            transform-origin: left bottom;
            transform: scale(0);
            background: white;
            border-radius: 10px;
            box-shadow: 0 0 5px #b1b1b1, 0 0 30px #b1b1b1;
            border: solid 10px transparent;
            border-width: 20px 10px;
          }
          .${this.ident('global-nav')} > div > ul {
            max-height: 80vh;
            overflow-y: auto;
          }
          .${this.ident('global-nav')} li {
            white-space: nowrap;
            transition: .3s;
          }
          .${this.ident('menu')}::-webkit-scrollbar-thumb,
          .${this.ident('global-nav')} > div > ul ::-webkit-scrollbar-thumb {
            background-image: linear-gradient(180deg, #00f2ff, #006bff);
          }
          .${this.ident('menu')}::-webkit-scrollbar,
          .${this.ident('global-nav')} > div > ul ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
            border-radius: 2px;
          }
          .${this.ident('menu')}::-webkit-scrollbar-track,
          .${this.ident('global-nav')} > div > ul ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
            border-radius: 2px;
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
      clickBar(e) {
        const btn = e.target.getAttribute('data-btn')
        switch (btn) {
          case 'switch':
            this.toggle()
            break
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
            for (const ul of this.menu.querySelectorAll('ul')) {
              const lv = ul.getAttribute('data-lv')
              if (lv > btn) {
                ul.parentElement.classList.add(this.ident('close'))
              } else {
                ul.parentElement.classList.remove(this.ident('close'))
              }
            }
            break
          default:
        }
      },
      collapse(level) {
        for (const ul of this.menu.querySelectorAll('ul')) {
          const lv = ul.getAttribute('data-lv')
          if (lv > level) {
            ul.parentElement.classList.add(this.ident('close'))
          } else {
            ul.parentElement.classList.remove(this.ident('close'))
          }
        }
      },
      onClickMenu(e) {
        const classes = e.target.classList
        if (classes.contains(this.ident('handle'))) {
          e.target.parentElement.classList.toggle(this.ident('close'))
        }
        if (e.target.tagName === 'A') {
          if (document.body.offsetWidth < rem(64)) {
            this.close()
          }
        }
      },
      onScroll() {
        const headers = this.content.querySelectorAll('h1,h2,h3,h4,h5,h6')
        const menus = this.menu.querySelectorAll('a[data-id]')
        let scrollTop = document.documentElement.scrollTop
        let hoveredMenu = null
        const onFrame = function () {
          if (Math.abs(document.documentElement.scrollTop - scrollTop) > 40) {
            scrollTop = document.documentElement.scrollTop
            let last = headers[0]
            for (const header of headers) {
              const top = header.getBoundingClientRect().top
              if (top < 200) {
                last = header
              } else {
                break
              }
            }
            if (!hoveredMenu || hoveredMenu.getAttribute('data-id') !== last.getAttribute('data-id')) {
              for (const menu of menus) {
                if (menu.getAttribute('data-id') === last.getAttribute('data-id')) {
                  menu.classList.add('hover')
                  menu.scrollIntoView()
                  hoveredMenu = menu
                } else {
                  menu.classList.remove('hover')
                }
              }
            }
          }
          window.requestAnimationFrame(onFrame)
        }
        window.requestAnimationFrame(onFrame)
      },
      mountStyle() {
        el('style').html(this.style).mount(document.head)
      },
      mountBreadcrumb() {
        const items = []
        let pathname = window.location.pathname
        // @ts-ignore
        while (pathname = pathname.match(/(.*\/)(.+?)(?=\/?$)/)) {
          const name = decodeURIComponent(pathname[2]).toUpperCase()
          if (items.length) {
            items.unshift(`<a href="${pathname[0]}">${name}</a>`)
          } else {
            items.unshift(`<span class="current">${name}</span>`)
          }
          pathname = pathname[1]
        }
        items.splice(1, 1) // delete root src
        el().class(this.ident('breadcrumb'))
          .html(items.join(' / '))
          .mount(this.header)
      },
      renderMenu() {
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
            closeLast(end - 1, `<ul data-lv="${end}" class="${it.ident('h' + end)}">${chain[end].join('')}</ul>`)
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
        const indexes = []
        for (const h of headers) {
          const lv = +h.tagName[1]

          indexes[lv - 1] = 1 + (indexes[lv - 1] || 0)
          if (plv > lv) indexes.length = lv
          const id = indexes.join('.')

          const html = [`<li>`, `<a data-id="${id}" href="#${h.id}"><span style="font-size:0.5em">${id}</span> ${h.innerHTML}</a>`, '</li>']

          const span = document.createElement('a')
          span.textContent = id + '. '
          span.href = '#' + h.id
          span.setAttribute('data-id', id)
          span.setAttribute('style', 'margin-right:.5rem')
          h.setAttribute('data-id', id)
          h.insertBefore(span, h.childNodes[0])

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
          .html(this.renderMenu())
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
      mountBar() {
        if (TOUCH_SUPPORT) return
        const bar = el()
          .class(this.ident('bar'))
          .append(el('div')
            .class('handle')
            .on('click', e => this.toggle())
          )
          .append(el('select')
            .class('level')
            .html(this.levels.map(level => `<option value="${level[0]}">${level[1]}</option>`))
            .on('change', e => this.collapse(e.target.value))
          )
          .append(el('select')
            .class('theme')
            .html(this.themes.map(theme => `<option value="${theme[0]}">${theme[1]}</option>`))
            .on('change', (e) => document.documentElement.setAttribute('theme', e.target.value))
          )
          .append(el('div')
            .class(this.ident('global-nav'))
            .append(this.renderGlobalNav())
          )
          .on('click', e => this.clickBar(e))
          .mount(document.body)
          .el

        // bar.draggable = true

        // ondrag(bar, {
        //   onend(drag) {
        //     const h = document.documentElement.clientHeight
        //     const ah = bar.offsetHeight
        //     const y = Math.min(Math.max(drag.move.y, ah), h)
        //     el(bar).style('bottom', 100 * (h - y) / h + '%')
        //   }
        // })
      },
      renderGlobalNav() {
        const files = window?.site_data?.files || []
        const nav = { el: document.createDocumentFragment(), children: {} }
        const baseUrl = '/notes'
        for (file of files) {
          let parent = nav
          const last = file.segments[file.segments.length - 1]
          let path = [baseUrl]
          for (const name of file.segments) {
            path.push(name)
            if (parent.children[name]) {
              parent = parent.children[name]
            } else {
              if (!parent.wrap) {
                parent.wrap = document.createElement('ul')
                parent.el.appendChild(parent.wrap)
              }
              const item = { el: document.createElement('li'), children: {} }
              const link = document.createElement('a')
              link.href = path.join('/').replace(/\.md$/, '')
              link.textContent = last === name ? file.title : name
              item.el.appendChild(link)
              parent.wrap.appendChild(item.el)
              parent.children[name] = item
              parent = item
            }
          }
        }
        const list = Array.from(nav.el.querySelectorAll('a')).filter(e => !e.nextElementSibling)
        const wrap = el('div')
          .append(el('div')
            .append(el('div').append(document.createTextNode('🔍')))
            .append(el('input')
            // .attr('placeholder', '搜索文章')
            .on('input', (event) => {
              const val = event.target.value.toLowerCase()
              list.forEach(el => {
                if (el.textContent.toLowerCase().indexOf(val) > -1) {
                  el.parentElement.style.maxHeight = '2em'
                } else {
                  el.parentElement.style.maxHeight = '0'
                }
              })
            }))
          )
          .append(nav.el).el

        document.querySelector('.bar-1fc7ed35')?.querySelector('.global-nav-1fc7ed35')?.remove()
        document.querySelector('.bar-1fc7ed35').appendChild(
          el('div').class('global-nav-1fc7ed35').append(wrap).el)
        return wrap
      },
      mount() {
        const params = new URLSearchParams(window.location.search)
        this.themes.forEach(theme => params.has(theme) && document.documentElement.setAttribute('theme', theme))
        document.body.addEventListener('keyup', e => (e.key === 'Escape') && this.toggle())
        if (!this._mounted) {
          TOUCH_SUPPORT && el(document.body).class(this.ident('touch-support'))
          el(document.body).class(this.ident('custom'))
          this.mountStyle()
          this.mountBreadcrumb()
          const isCatalog = window.location.pathname[window.location.pathname.length - 1] === '/'
          if (!isCatalog) {
            this.mountMenu()
            this.mountBar()
          }
          this.onScroll()
          return this._mounted = true
        } return false
      },
    }
    if (document.body.classList.contains('page') || document.body.classList.contains('post')) {
      menu.mount()
    }
  }());

  ;(function mermaid() {
    function initMermaid() {
      window.mermaid.initialize({
        startOnLoad: true,
        theme: "forest",
        flowchart: {
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
  }());

  ;(function copy() {
    document.body.addEventListener('click', async e => {
      if (['EM', 'B', 'STRONG'].includes(e.target.tagName) || (e.target.tagName === 'CODE' && e.target.parentElement.tagName !== 'PRE')) {
        await navigator.clipboard.writeText(e.target.textContent)
        window.toastr && window.toastr.success(e.target.textContent, 'Copied!')
      } else if (e.target.classList.contains('fa-copy') && e.target.parentElement.classList.contains('highlight')) {
        await navigator.clipboard.writeText(e.target.parentElement.querySelector('pre').textContent)
        window.toastr && window.toastr.success('Copied!')
      }
    })
    // code block
    Array.from(document.body.querySelectorAll('pre.highlight')).forEach(e => {
      if (e.parentElement.classList.contains('highlight')) {
        const icon = document.createElement('div')
        icon.classList.add('fa', 'fa-copy')
        e.parentElement.appendChild(icon)
      }
    })
  }());

  window.toastr.options = {
    escapeHtml: true,
    positionClass: 'toast-bottom-right',
    timeOut: 1500,
    extendedTimeOut: 1000,
    showMethod: 'slideDown',
    hideMethod: 'slideUp',
    closeMethod: 'fadeOut',
    showDuration: 100,
    hideDuration: 300,
    closeDuration: 300,
    closeEasing: 'swing',
  }
}())
