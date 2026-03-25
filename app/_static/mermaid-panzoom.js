(function () {
  // SVG icons
  var ICON_ZOOMIN = '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/><path fill="currentColor" d="M10.344 11.742a.5.5 0 0 1 .707 0l4.136 4.136a.5.5 0 0 1-.707.707l-4.136-4.136a.5.5 0 0 1 0-.707z"/><path fill="currentColor" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"/></svg>';
  var ICON_ZOOMOUT = '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/><path fill="currentColor" d="M10.344 11.742a.5.5 0 0 1 .707 0l4.136 4.136a.5.5 0 0 1-.707.707l-4.136-4.136a.5.5 0 0 1 0-.707z"/><path fill="currentColor" d="M3.5 6a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6z"/></svg>';
  var ICON_RESET = '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 1 1 .908-.418A6 6 0 1 1 8 2v1z"/><path fill="currentColor" d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>';
  var ICON_EXPAND = '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/></svg>';
  var ICON_SHRINK = '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.12a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.878a.5.5 0 0 0 0-.707z"/></svg>';
  var ICON_POPUP = '<svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill="currentColor" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>';

  var TOOLBAR_HTML =
    '<div class="mermaid-toolbar">' +
      '<button class="mermaid-tb-btn" data-action="zoomin" title="Zoom in">' + ICON_ZOOMIN + '</button>' +
      '<button class="mermaid-tb-btn" data-action="zoomout" title="Zoom out">' + ICON_ZOOMOUT + '</button>' +
      '<button class="mermaid-tb-btn" data-action="reset" title="Reset">' + ICON_RESET + '</button>' +
      '<button class="mermaid-tb-btn" data-action="expand" title="Expand">' + ICON_EXPAND + '</button>' +
      '<button class="mermaid-tb-btn" data-action="popup" title="Open in new window">' + ICON_POPUP + '</button>' +
    '</div>';

  function initPanZoom(mermaidDiv) {
    if (mermaidDiv.dataset.panzoomInit) return;
    var svg = mermaidDiv.querySelector('svg');
    if (!svg) return;

    mermaidDiv.dataset.panzoomInit = '1';

    // wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'mermaid-panzoom-wrap';
    mermaidDiv.parentNode.insertBefore(wrapper, mermaidDiv);
    wrapper.appendChild(mermaidDiv);
    wrapper.insertAdjacentHTML('beforeend', TOOLBAR_HTML);

    // state - CSS transform based, no SVG manipulation
    var state = { zoom: 1, panX: 0, panY: 0, dragging: false, startX: 0, startY: 0 };

    function applyTransform() {
      svg.style.transform = 'translate(' + state.panX + 'px,' + state.panY + 'px) scale(' + state.zoom + ')';
      svg.style.transformOrigin = '0 0';
    }

    // scroll to zoom
    mermaidDiv.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = mermaidDiv.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;

      var oldZoom = state.zoom;
      var factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      state.zoom = Math.min(10, Math.max(0.3, state.zoom * factor));

      // zoom toward cursor position
      var ratio = state.zoom / oldZoom;
      state.panX = mouseX - ratio * (mouseX - state.panX);
      state.panY = mouseY - ratio * (mouseY - state.panY);
      applyTransform();
    }, { passive: false });

    // drag to pan
    mermaidDiv.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      state.dragging = true;
      state.startX = e.clientX - state.panX;
      state.startY = e.clientY - state.panY;
      mermaidDiv.style.cursor = 'grabbing';
      e.preventDefault();
    });
    document.addEventListener('mousemove', function (e) {
      if (!state.dragging) return;
      state.panX = e.clientX - state.startX;
      state.panY = e.clientY - state.startY;
      applyTransform();
    });
    document.addEventListener('mouseup', function () {
      if (!state.dragging) return;
      state.dragging = false;
      mermaidDiv.style.cursor = '';
    });

    // toolbar events
    wrapper.querySelector('.mermaid-toolbar').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var action = btn.dataset.action;
      if (action === 'zoomin') {
        state.zoom = Math.min(10, state.zoom * 1.3);
        applyTransform();
      }
      else if (action === 'zoomout') {
        state.zoom = Math.max(0.3, state.zoom / 1.3);
        applyTransform();
      }
      else if (action === 'reset') {
        state.zoom = 1; state.panX = 0; state.panY = 0;
        applyTransform();
      }
      else if (action === 'expand') {
        var isExpanded = wrapper.classList.toggle('mermaid-expanded');
        btn.innerHTML = isExpanded ? ICON_SHRINK : ICON_EXPAND;
        btn.title = isExpanded ? 'Shrink' : 'Expand';
        state.zoom = 1; state.panX = 0; state.panY = 0;
        applyTransform();
      }
      else if (action === 'popup') {
        var svgEl = wrapper.querySelector('.mermaid svg');
        if (!svgEl) return;
        var clone = svgEl.cloneNode(true);
        clone.style.transform = '';
        clone.style.transformOrigin = '';
        var svgData = new XMLSerializer().serializeToString(clone);
        var isDark = document.querySelector('main').getAttribute('data-theme') === 'dark';
        var bg = isDark ? '#0d1117' : '#ffffff';
        var fg = isDark ? '#c9d1d9' : '#24292e';
        var html = '<!DOCTYPE html><html><head><title>Mermaid Diagram</title>' +
          '<style>' +
            'html,body{margin:0;height:100%;overflow:hidden;background:' + bg + ';color:' + fg + '}' +
            '.container{width:100%;height:100%}' +
            'svg{display:block;max-width:none!important}' +
          '</style>' +
          '<script src="/_static/svg-pan-zoom.min.js"><\/script>' +
          '</head><body>' +
          '<div class="container">' + svgData + '</div>' +
          '<script>' +
            'var s=document.querySelector("svg");' +
            's.setAttribute("width","100%");s.setAttribute("height","100%");' +
            'svgPanZoom(s,{zoomEnabled:true,controlIconsEnabled:true,fit:true,center:true,minZoom:0.3,maxZoom:20});' +
          '<\/script></body></html>';
        var popup = window.open('', '_blank', 'width=1200,height=800');
        if (popup) { popup.document.write(html); popup.document.close(); }
      }
    });
  }

  function processAll() {
    var divs = document.querySelectorAll('.mermaid[data-processed="true"], .mermaid svg');
    divs.forEach(function (el) {
      var div = el.classList.contains('mermaid') ? el : el.closest('.mermaid');
      if (div) initPanZoom(div);
    });
  }

  // observe DOM changes for mermaid rendering
  var observer = new MutationObserver(function () {
    setTimeout(processAll, 100);
  });

  function startObserving() {
    var target = document.querySelector('.markdown-body');
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserving);
  } else {
    startObserving();
  }
})();
