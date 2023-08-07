// @ts-nocheck
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
        style = style.replace(new RegExp(prop + '\\s*:.*?(;|$)', 'g'), '')
        if (value !== undefined) {
          style += prop + ':' + value + ';'
        }
        el.setAttribute('style', style)
        return this
      },
      attr(k, v) {
        if (typeof v === 'boolean') {
          el.toggleAttribute(k, v)
        } else {
          el.setAttribute(k, v)
        }
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
      }
    }
  }

  function touchOn(ele, cb) {
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
    if (cb.onmove) {
      ele.addEventListener('touchmove', function(e) {
        e.stopPropagation()
        if (touch.start) {
          touch.move = { x: e.touches[0].clientX, y: e.touches[0].clientY }
          cb.onmove.call(this, touch, e)
        }
      }, { passive: false })
    }
    ele.addEventListener('touchend', function(e) {
      e.stopPropagation()
      cb.onend && cb.onend.call(this, touch, e)
      cb.reset && cb.reset()
      touch.reset()
    }, { passive: false })
  }

  const ID = Math.random().toString(32).slice(2)

  function ident(name) {
    return `${name}-${ID}`
  }

  function rem(n = 1) {
    return parseInt(getComputedStyle(document.documentElement).fontSize) * n
  }

  function setRelative(target) {
    if (window.getComputedStyle(target).position === 'static') {
      target.classList.add(ident('position-relative'))
    }
    return function unsetRelative() {
      target.classList.remove(ident('position-relative'))
    }
  }

  function createLoading(target) {
    const loading = document.createElement('div')
    loading.classList.add(ident('loading'))
    loading.innerHTML = `<!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
    <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <circle cx="15" cy="15" r="15">
            <animate attributeName="r" from="15" to="15"
                     begin="0s" dur="0.8s"
                     values="15;9;15" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="1" to="1"
                     begin="0s" dur="0.8s"
                     values="1;.5;1" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity="0.3">
            <animate attributeName="r" from="9" to="9"
                     begin="0s" dur="0.8s"
                     values="9;15;9" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="0.5" to="0.5"
                     begin="0s" dur="0.8s"
                     values=".5;1;.5" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
        <circle cx="105" cy="15" r="15">
            <animate attributeName="r" from="15" to="15"
                     begin="0s" dur="0.8s"
                     values="15;9;15" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="1" to="1"
                     begin="0s" dur="0.8s"
                     values="1;.5;1" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
    </svg>`
    target.appendChild(loading)
    const unsetRelative = setRelative(target)
    loading.destroy = function() {
      console.log('destroy')
      loading.remove()
      unsetRelative()
    }
    return loading
  }

  function createCloseButton(target, cb) {
    const closeBtn = document.createElement('div')
    cb && (closeBtn.onclick = cb)
    closeBtn.classList.add(ident('button-close'))
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z" fill="currentColor"></path></svg>'
    target.appendChild(closeBtn)
    const unsetRelative = setRelative(target)
    closeBtn.destroy = function() {
      closeBtn.remove()
      unsetRelative()
    }
    return closeBtn
  }

  function createModal(fullscreen) {
    let loading = null
    const modal = document.createElement('div')
    fullscreen && modal.classList.add(ident('fullscreen'))
    modal.id = ident('modal')
    const wrap = document.createElement('div')
    wrap.classList.add(ident('wrap'))
    modal.appendChild(wrap)
    const overlay = document.createElement('div')
    overlay.classList.add(ident('overlay'))
    modal.appendChild(overlay)

    document.body.appendChild(modal)
    document.body.classList.add(ident('overflow-hidden'))
    createCloseButton(modal, function() {
      modal.remove()
      document.body.classList.remove(ident('overflow-hidden'))
    })

    modal.wrap = wrap
    modal.loading = function(force) {
      if (force === false) {
        if (loading) {
          loading.destroy()
          loading = null
        }
      } else if (!loading) {
        loading = createLoading(modal)
      }
    }
    return modal
  }

  // 导航菜单
  const menu = {
    get themes() {
      return [['light', '🌔'], ['dark', '🌘']]
    },
    get levels() {
      return [[1, '1️⃣'], [2, '2️⃣'], [3, '3️⃣'], [4, '4️⃣'], [5, '5️⃣'], [6, '6️⃣']]
    },
    get menu() {
      return document.querySelector('.' + ident('menu'))
    },
    get header() {
      return document.querySelector('.page-header')
    },
    get content() {
      return document.querySelector('.main-content')
    },
    toggle() {
      el(this.menu).style('left')
      el(document.body).class('~' + ident('closed'))
    },
    close() {
      el(this.menu).style('left')
      el(document.body).class('+' + ident('closed'))
    },
    open() {
      el(this.menu).style('left')
      el(document.body).class('-' + ident('closed'))
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
              ul.parentElement.classList.add(ident('close'))
            } else {
              ul.parentElement.classList.remove(ident('close'))
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
          ul.parentElement.classList.add(ident('close'))
        } else {
          ul.parentElement.classList.remove(ident('close'))
        }
      }
    },
    onClickMenu(e) {
      const classes = e.target.classList
      if (classes.contains(ident('handle'))) {
        e.target.parentElement.classList.toggle(ident('close'))
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
      const onFrame = function() {
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
    mountBreadcrumb() {
      const items = []
      let pathname = window.location.pathname
      // @ts-ignore
      while ((pathname = pathname.match(/(.*\/)(.+?)(?=\/?$)/))) {
        const name = decodeURIComponent(pathname[2]).toUpperCase()
        if (items.length) {
          items.unshift(`<a href="${pathname[0]}">${name}</a>`)
        } else {
          items.unshift(`<span class="current">${name}</span>`)
        }
        pathname = pathname[1]
      }
      items.splice(1, 1) // delete root src
      el().class(ident('breadcrumb'))
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
            chain[lv][chain[lv].length - 1] = last[0] + (withContent && `<div class="${ident('handle')}"></div>`) + last.slice(1, -1).join('') + withContent + last.pop()
          }
        }
      }
      function close(start = 0) {
        let end = chain.length - 1
        while (end > start) {
          closeLast(end)
          closeLast(end - 1, `<ul data-lv="${end}" class="${ident('h' + end)}">${chain[end].join('')}</ul>`)
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

        const html = ['<li>', `<a data-id="${id}" class="effect-bg" href="#${h.id}"><span style="font-size:0.5em">${id}</span> ${h.innerHTML}</a>`, '</li>']

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
      return chain.find(e => e)?.join('')
    },
    mountMenu() {
      el('ul').class(ident('menu'))
        .class(ident('h1'))
        .class(ident('transitionable'))
        .html(this.renderMenu())
        .mount(document.body)
        .on('click', (e) => this.onClickMenu(e))

      el(document.body).class(ident('has-menu'))

      const it = this
      touchOn(it.menu, {
        onstart() {
          el(it.menu).class(ident('-transitionable'))
        },
        reset() {
          el(it.menu).style('overflow-y')
          el(document.body).style('overflow-y')
          el(it.menu).class(ident('transitionable'))
        },
        onmove(touch, e) {
          if (touch.offset.x < 0 && !el(document.body).class('?' + ident('closed'))) {
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
          el(it.menu).class(ident('transitionable'))
          if (touch.triggered) {
            touch.triggered = false
            it.close()
          } else {
            el(it.menu).style('left')
          }
        }
      })
      touchOn(document.body, {
        onstart() {
          el(it.menu).class(ident('-transitionable'))
        },
        reset() {
          el(document.body).style('overflow-y')
          el(it.menu).class(ident('transitionable'))
        },
        onmove(touch, e) {
          if (touch.offset.x > 0 && el(document.body).class('?' + ident('closed'))) {
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
          el(it.menu).class(ident('transitionable'))
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
        .class(ident('bar'))
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
          .class(ident('global-nav'))
          .append(this.renderGlobalNav())
        )
        .on('click', e => this.clickBar(e))
        .mount(document.body)
        .el
    },
    renderGlobalNav() {
      const files = window?.site_data?.files || []
      const nav = { el: document.createDocumentFragment(), children: {} }
      const baseUrl = '/notes'
      for (const file of files) {
        let parent = nav
        const last = file.segments[file.segments.length - 1]
        const path = [baseUrl]
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
        .append(nav.el)
        .append(el('div')
          .append(el('div').append(document.createTextNode('🔍')))
          .append(el('input')
            // .attr('placeholder', '搜索文章')
            .on('input', (event) => {
              const val = event.target.value.toLowerCase()
              list.forEach(el => {
                if (el.textContent.toLowerCase().indexOf(val) > -1) {
                  el.parentElement.style.maxHeight = '2em'
                  el.parentElement.style.overflowY = ''
                } else {
                  el.parentElement.style.maxHeight = '0'
                  el.parentElement.style.overflowY = 'hidden'
                }
              })
            }))
        ).el

      document.querySelector('.bar-1fc7ed35')?.querySelector('.global-nav-1fc7ed35')?.remove()
      document.querySelector('.bar-1fc7ed35')?.appendChild(el('div').class('global-nav-1fc7ed35').append(wrap).el)
      return wrap
    },
    mount() {
      const params = new URLSearchParams(window.location.search)
      this.themes.forEach(theme => params.has(theme) && document.documentElement.setAttribute('theme', theme))
      document.body.addEventListener('keyup', e => (e.key === 'Escape') && this.toggle())
      if (!this._mounted) {
        TOUCH_SUPPORT && el(document.body).class(ident('touch-support'))
        el(document.body).class(ident('custom'))
        this.mountBreadcrumb()
        const isCatalog = window.location.pathname[window.location.pathname.length - 1] === '/'
        if (!isCatalog) {
          this.mountMenu()
          this.mountBar()
          this.collapse(1)
        }
        this.onScroll()
        this._mounted = true
        return true
      } return false
    }
  }
  if (document.body.classList.contains('page') || document.body.classList.contains('post')) {
    menu.mount()
  }

  function previewSvg(svg) {
    const modal = createModal()
    svg = svg.cloneNode(true)
    el(svg)
      .style('min-width', '100vw')
      .style('min-height', '100vh')
      .style('max-width', '100vw')
      .style('max-height', '100vh')
      .style('background', 'white')
    modal.wrap.appendChild(svg)
  }

  function previewImage(_img) {
    if (_img.hasAttribute(ident('previewing'))) return
    const modal = createModal()
    const img = el('img')
      .attr('src', _img.src)
      .attr(ident('previewing'), true)
      .on('load', () => modal.loading(false))
    if (_img.src.indexOf('.svg') > -1) {
      img
        .style('min-width', '100vw')
        .style('min-height', '100vh')
        .style('max-width', '100vw')
        .style('max-height', '100vh')
        .style('background', 'white')
    } else {
      img
        .style('min-width', '100%')
        .style('min-height', '100%')
        .style('max-width', '100%')
        .style('max-height', '100%')
    }
    modal.wrap.appendChild(img.el)
    modal.loading()
    if (img.el.complete) {
      modal.loading(false)
    }
  }

  // click event
  document.body.addEventListener('click', async e => {
    // 复制文本
    if (['EM', 'B', 'STRONG'].includes(e.target.tagName) || (e.target.tagName === 'CODE' && e.target.parentElement.tagName !== 'PRE')) {
      await navigator.clipboard.writeText(e.target.textContent)
      window.toastr && window.toastr.success(e.target.textContent, 'Copied!')
    } else if (e.target.classList.contains('fa-copy') && e.target.parentElement.hasAttribute('coder-header')) {
      await navigator.clipboard.writeText(e.target.closest('[coder]').querySelector('code').textContent)
      window.toastr && window.toastr.success('Copied!')
    }
    // 浏览图片
    const mermaid = e.target.closest('.language-mermaid')
    if (mermaid) {
      previewSvg(mermaid.querySelector('svg'))
    }
    if (e.target.tagName === 'IMG' && e.target.parentElement.tagName !== 'A') {
      previewImage(e.target)
    }
  })

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
    closeEasing: 'swing'
  }

  function buildCoder(/** @type {Element} */code) {
    const pre = code.parentElement
    pre.setAttribute('coder-main', '')
    let coder = pre.parentElement
    if (!coder || !coder.classList.contains('coder')) {
      coder = document.createElement('div')
      coder.setAttribute('coder', '')
      pre.replaceWith(coder)
      coder.appendChild(pre)
    }
    return coder
  }

  function ensureCoderHeader(/** @type {Element} */coder, options) {
    let header = coder.firstElementChild
    let lang, copy
    if (!coder.firstElementChild || !coder.firstElementChild.hasAttribute('coder-header')) {
      header = document.createElement('div')
      header.setAttribute('coder-header', '')
      coder.firstElementChild ? coder.insertBefore(header, coder.firstElementChild) : coder.appendChild(header)
    }
    if (!header.querySelector('[code-lang]')) {
      lang = document.createElement('span')
      lang.setAttribute('code-lang', '')
      header.appendChild(lang)
    }
    if (!header.querySelector('.fa.fa-copy')) {
      copy = document.createElement('span')
      copy.classList.add('fa', 'fa-copy')
      header.appendChild(copy)
    }
    if (options) {
      if (options.language) {
        lang.textContent = options.language.toUpperCase()
      }
    }
  }
  // 后端渲染的代码高亮
  [...document.querySelectorAll('pre.highlight')].forEach(pre => {
    pre.setAttribute('coder-main', '')
    pre.parentElement.setAttribute('coder', '')
    const found = Array.from(pre.parentElement.parentElement.classList).find(e => e.startsWith('language-'))
    const language = found && found.slice(9)
    ensureCoderHeader(pre.parentElement, { language })
  })

  const externals = [
    [() => window.mermaid, (script) => script.src.indexOf('mermaid') > -1, function mermaid() {
      window.mermaid.initialize({
        startOnLoad: true,
        theme: 'forest',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true
        }
      })
      window.mermaid.init(undefined, document.querySelectorAll('.language-mermaid'))
    }],
    [() => window.pseudoCode, (script) => script.src.indexOf('pseudo-code') > -1, function pseudo() {
      [...document.body.querySelectorAll('code.language-pseudo')].forEach(code => {
        window.pseudoCode([code])
        const coder = buildCoder(code)
        ensureCoderHeader(coder)
      })
    }]
  ]
  for (const external of externals) {
    if (external[0]()) {
      external[2]()
    } else {
      for (const script of document.scripts) {
        if (external[1](script)) {
          script.onload = external[2]()
        }
      }
    }
  }

  el('style').attr('id', ident('style')).html(`
[theme="dark"] .${ident('menu')} {
  background-color: #1e1e20;
}
[theme="dark"] .${ident('menu')} a {
  color: #d3d3d3;
}
html, body {
  min-width: 100%;
  min-height: 100%;
}
.${ident('breadcrumb')} a {
  color: white;
  font-size: 1.5rem;
}
.${ident('breadcrumb')} .btn:hover {
  background: unset;
}
.${ident('breadcrumb')} .btn.current {
  color: white;
  background: unset;
  font-weight: bold;
}
@media (max-width: 104rem) {
  .${ident('custom')}.${ident('has-menu')} {
    padding-left: 24rem;
  }
  .${ident('custom')} {
    transition: padding-left .3s;
  }
  .${ident('custom')}.${ident('closed')}{
    padding-left: 0;
  }
}
.${ident('custom')}.${ident('closed')} .${ident('menu')}{
  left: -30rem;
}
.${ident('menu')} {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 24rem;
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
.${ident('menu')}.${ident('transitionable')}  {
  transition: left .3s;
}
.${ident('menu')} ul {
  padding-inline-start: 1em;
}
.${ident('menu')} li {
  list-style: none;
  margin: 6px 0;
  padding: 0;
}
.${ident('menu')} .${ident('handle')} {
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
.${ident('menu')} li.${ident('close')}:not(:has(.hover)) > ul {
  height: 0;
  margin: 0;
  overflow: hidden;
}
.${ident('menu')} li.${ident('close')}:not(:has(.hover)) > .${ident('handle')} {
  transform: rotate(0);
}
.${ident('bar')} {
  position: fixed;
  z-index: 999;
  left: 20px;
  bottom: 20px;
  color: #006bff;
  display: flex;
}
.${ident('bar')} > * {
  width: 40px;
  height: 40px;
  line-height: 40px;
  outline: none;
  border: none;
  appearance: none;
  border-radius: 50%;
  box-shadow: 0 0 5px #b1b1b1, 0 0 30px #b1b1b1;
  margin-right: 5px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
}
.${ident('bar')} .handle:before {
  content: "🐵";
}
.${ident('custom')}.${ident('closed')} .${ident('bar')} .handle:before {
  content: "🙈";
}
.${ident('custom')}.${ident('closed')} .${ident('bar')} .level {
  display: none;
}
.${ident('global-nav')} {
  position: relative;
}
.${ident('global-nav')}:before, .${ident('global-nav')}:after {
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
.${ident('global-nav')}:after {
  width: 0%;
  height: 0%;
  background-color: white;
}
.${ident('global-nav')}:hover:before {
  width: 100%;
  height: 100%;
}
.${ident('global-nav')}:hover:after {
  width: 40%;
  height: 40%;
}
.${ident('global-nav')} > div > div {
  display: flex;
  align-items: center;
}
.${ident('global-nav')} > div > div > div {
  margin-right: 10px;
}
.${ident('global-nav')} input {
  outline: none;
  border-radius: 2px;
  padding: 2px;
  border: none;
  border-bottom: solid 1px;
  color: #006bff;
  font-weight: bold;
  font-family: Optima;
  font-size: 1.4em;
}
.${ident('global-nav')} ul {
  transition: 0.3s;
  list-style: none;
  padding: 0px 20px;
  text-align: left;
  line-height: normal;
}
.${ident('global-nav')}:hover > div {
  transform: scale(1);
}
.${ident('global-nav')} > div {
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
.${ident('global-nav')} > div > ul {
  max-height: 80vh;
  overflow-y: auto;
}
.${ident('global-nav')} li {
  white-space: nowrap;
  transition: .3s;
}
.${ident('menu')}::-webkit-scrollbar-thumb,
.${ident('global-nav')} > div > ul::-webkit-scrollbar-thumb {
  background-image: linear-gradient(180deg, #00f2ff, #006bff);
}
.${ident('menu')}::-webkit-scrollbar,
.${ident('global-nav')} > div > ul::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  border-radius: 2px;
}
.${ident('menu')}::-webkit-scrollbar-track,
.${ident('global-nav')} > div > ul::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.${ident('position-relative')} {
  position: relative!important;
}
.${ident('overflow-hidden')} {
  overflow: hidden!important;
}
.${ident('loading')} {
  z-index: 999;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 50px;
  height: 50px;
  margin: auto;
  color: rgb(0, 0, 0, 0.3);
}
.${ident('button-close')} {
  z-index: 999;
  position: absolute;
  top: 5px;
  left: 5px;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: rgb(255, 0, 0, 0.9);
  box-shadow: 0 0 2px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.${ident('button-close')} svg {
  color: rgb(0, 0, 0, 0.6);
  opacity: 0;
  transition: .2s;
}
.${ident('button-close')}:hover svg {
  opacity: 1;
}

#${ident('modal')} {
  z-index: 999;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
  border-radius: 5px;
  backdrop-filter: blur(2px);
}
#${ident('modal')} {
  position: fixed;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  display: flex;
}
#${ident('modal')} .${ident('wrap')} {
  margin: auto;
  max-height: 100%;
  max-width: 100%;
}
#${ident('modal')}.${ident('fullscreen')} .${ident('wrap')} {
  height: 100%;
  width: 100%;
}
#${ident('modal')} .${ident('overlay')} {
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background-color: #000;
  opacity: 0.9;
  transition: all 0.1s cubic-bezier(0.05, 0.03, 0.35, 1);
}
img:not([${ident('previewing')}]) {
  cursor: pointer;
}
`).mount(document.head)
}())
