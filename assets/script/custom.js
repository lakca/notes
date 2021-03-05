(function() {
  document.head.appendChild((function() {var style = document.createElement('style'); style.innerHTML = '' +
  '.page-header .breadcrumb {' +
    'font-size: 1.5rem;' +
    'margin: 1rem 0 -2rem 0;' +
  '}' +
  '.page-header .breadcrumb a {' +
    'color: white;' +
  '}' +
  '.page-header .breadcrumb span {' +
    'text-decoration: overline;' +
  '}' +
  '.main-content.has-menu {' +
    'position: relative;' +
    'padding-left: 29rem;' +
    'max-width: 93rem;' +
  '}' +
  '.main-content.has-menu > .fixed-menu {' +
    'position: absolute;' +
    'left: 0;' +
    'top: 0;' +
    'width: 28rem;' +
    'padding: 0 1rem;' +
    'box-sizing: border-box;' +
    'overflow-y: scroll;' +
    'border: solid transparent 20px;' +
    'height: 95vh;' +
  '}' +
  '.fixed-menu::-webkit-scrollbar {' +
    'width: 5px;' +
  '}' +
  '.fixed-menu::-webkit-scrollbar-track {' +
    'box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);' +
    'border-radius: 2px;' +
  '}' +
  '.fixed-menu::-webkit-scrollbar-thumb {' +
    'background-color: darkgrey;' +
    'outline: 1px solid slategrey;' +
    'background-color: #159957;' +
  '}' +
  ''; return style}()))
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
  function onScroll() {
    var menu = getMenu()
    if (!menu) return
    var rect = document.querySelector('.main-content').getBoundingClientRect()
    if (rect.y < 0) {
      menu.setAttribute('style', 'top: ' + -rect.y + 'px')
    } else {
      menu.setAttribute('style', '')
    }
  }
  var isIndex = window.location.pathname.slice(-1) === '/'
  function breadcrumb() {
    var arr = location.pathname.split('/').slice(1)
    var last = arr.pop()
    if (isIndex) last = arr.pop()
    var items = arr.map((e, i) => '<a href=' + ("../".repeat(arr.length - i - 1) || '.') + '>' + e + '</a>')
    var div = document.createElement('div')
    div.setAttribute('class', 'breadcrumb')
    // remove 'src'
    items.splice(arr.indexOf('src'), 1)
    items.push('<span>' + last + '</span>')
    div.innerHTML = items.join(' / ').toUpperCase()
    getHeader().appendChild(div)
  }
  breadcrumb()
  if (!isIndex) {
    getContent() && getContent().classList.add('has-menu')
    getMenu() && getMenu().classList.add('fixed-menu')
    document.addEventListener('scroll', onScroll)
    onScroll()
  }
}())
