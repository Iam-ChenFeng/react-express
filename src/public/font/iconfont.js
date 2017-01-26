;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-wenjianjia" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M974.498074 321.362148c-8.572236-11.17041-21.563108-17.576307-35.642778-17.576307l-91.813079 0 0-40.021505c0-26.010397-21.161972-47.171346-47.172369-47.171346l-433.165514 0c-2.185782 0-4.241604-0.851391-5.786797-2.396583l-58.488089-58.488089c-8.909927-8.909927-20.75572-13.817704-33.356712-13.817704L87.405187 141.890614c-26.010397 0-47.171346 21.161972-47.171346 47.172369l0 645.87608c0 26.010397 21.160949 47.172369 47.171346 47.172369l0-0.332575c1.798972 0.215918 3.623527 0.332575 5.467525 0.332575l715.097628 0c20.298302 0 38.142715-13.69286 43.396369-33.298384l130.884956-488.470097C985.895659 346.740142 983.069287 332.533582 974.498074 321.362148zM87.405187 180.877557l181.668573 0c2.185782 0 4.241604 0.851391 5.786797 2.397606l58.489112 58.490136c8.909927 8.908904 20.75572 13.814634 33.354666 13.814634l433.165514 0c4.51278 0 8.184403 3.671623 8.184403 8.184403l0 40.021505-584.297606 0c-20.297278 0-38.142715 13.69286-43.396369 33.299407L79.220784 714.545042 79.220784 189.06196C79.220784 184.54918 82.892407 180.877557 87.405187 180.877557zM944.591951 350.250082 813.705971 838.72018c-0.693802 2.592035-3.052522 4.402263-5.735631 4.402263L92.872712 843.122443c-2.548032 0-4.046153-1.456165-4.711302-2.323928-0.666172-0.868787-1.684362-2.691295-1.02433-5.15337l130.884956-488.469074c0.694825-2.592035 3.053546-4.402263 5.736655-4.402263l715.097628 0c2.548032 0 4.045129 1.455141 4.711302 2.323928C944.23277 345.965499 945.251983 347.789031 944.591951 350.250082z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wenjian" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M-2490.0608 1132.19072"  ></path>' +
    '' +
    '<path d="M668.73856 1.72032 240.49152 1.72032c-75.9552 0-137.74848 61.78816-137.74848 137.73824l0 745.08288c0 75.94496 61.79328 137.73312 137.74848 137.73312l543.02208 0c75.9552 0 137.74848-61.78816 137.74848-137.73312L921.26208 283.9552 668.73856 1.72032zM689.02912 261.25824 689.02912 134.53312l113.39264 126.72512L689.02912 261.25824zM176.16896 139.45856c0-35.46112 28.85632-64.31232 64.32256-64.31232l375.10656 0 0 259.53792 232.23296 0 0 549.85728c0 35.46112-28.85632 64.3072-64.32256 64.3072L240.49152 948.84864c-35.46624 0-64.32256-28.84608-64.32256-64.3072L176.16896 139.45856z"  ></path>' +
    '' +
    '<path d="M334.08 519.68l355.84 0c21.21216 0 38.4-17.18784 38.4-38.4s-17.18784-38.4-38.4-38.4l-355.84 0c-21.21216 0-38.4 17.18784-38.4 38.4S312.86784 519.68 334.08 519.68z"  ></path>' +
    '' +
    '<path d="M334.08 673.28l355.84 0c21.21216 0 38.4-17.18784 38.4-38.4s-17.18784-38.4-38.4-38.4l-355.84 0c-21.21216 0-38.4 17.18784-38.4 38.4S312.86784 673.28 334.08 673.28z"  ></path>' +
    '' +
    '<path d="M334.08 816.64l355.84 0c21.21216 0 38.4-17.18784 38.4-38.4s-17.18784-38.4-38.4-38.4l-355.84 0c-21.21216 0-38.4 17.18784-38.4 38.4S312.86784 816.64 334.08 816.64z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)