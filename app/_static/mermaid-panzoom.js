(function () {
  var TOOLBAR_HTML =
    '<div class="mermaid-toolbar">' +
      '<button class="mermaid-tb-btn" data-action="zoomin" title="Zoom in">+</button>' +
      '<button class="mermaid-tb-btn" data-action="zoomout" title="Zoom out">&minus;</button>' +
      '<button class="mermaid-tb-btn" data-action="reset" title="Reset">&#8634;</button>' +
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

    // svg must have width/height attributes for svg-pan-zoom
    if (!svg.getAttribute('width')) svg.setAttribute('width', '100%');
    if (!svg.getAttribute('height')) {
      var box = svg.getBoundingClientRect();
      svg.setAttribute('height', box.height || 400);
    }

    var pz = svgPanZoom(svg, {
      zoomEnabled: true,
      controlIconsEnabled: false,
      fit: true,
      center: true,
      minZoom: 0.5,
      maxZoom: 10,
      zoomScaleSensitivity: 0.3
    });

    // toolbar events
    wrapper.querySelector('.mermaid-toolbar').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var action = btn.dataset.action;
      if (action === 'zoomin') pz.zoomIn();
      else if (action === 'zoomout') pz.zoomOut();
      else if (action === 'reset') { pz.resetZoom(); pz.resetPan(); }
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
