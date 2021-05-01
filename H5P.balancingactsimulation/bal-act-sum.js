var H5P = H5P || {};

H5P.balancingactsimulation = function (options, contentId) {
  var $ = H5P.jQuery;
  var $iframe = null;
  var $finish = null;
  this.$ = $(this);

  options = H5P.jQuery.extend({
    width: "500px",
    minWidth: "300px",
    height: "500px",
    source: "",
    resizeSupported: true
  }, options);

  if (!this instanceof H5P.balancingactsimulation){
    return new H5P.balancingactsimulation(options, contentId);
  }

  this.attach = function ($wrapper) {
    // Set up an iframe with the correct source, and append
    // it to '$wrapper'.

    var iFrameSource = '';

    if (options.source !== undefined) {
      if (options.source.trim().toLowerCase().substring(0, 4) === 'http') {
        iFrameSource = options.source;
      }
      else {
        iFrameSource = H5P.getContentPath(contentId) + '/' + options.source;
      }
    }
    // console.log(iFrameSource);
    $iframe = $('<iframe/>', {
      src: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_en.html',
      scrolling: 'no',
      frameBorder: 0,
      'id': 'phcit-balancing-act',      
      'class': 'h5p-iframe-content h5p-iframe-wrapper',
      css: {
        width: options.width,
        height: options.height,
        display: 'block'
      }
    });

    $finish = $('<button/>',{
      'class': 'h5p-question-finish',
      title: "finish",
      type: "button",
      text:"Finish"
    });

    // <button class="h5p-question-finish h5p-joubelui-button" title="Finish" type="button">Finish</button>

    $wrapper.html('');
    $wrapper.append($iframe);
    $wrapper.append($finish);

    if(options.resizeSupported === false) {
      /* Unfortunately fullscreen-button is not in DOM yet.
       * Therefore we need to remove it using a timer */
      setTimeout(function () {
        $('.h5p-enable-fullscreen').hide();
      }, 1);
    }

    this.$.trigger('resize');
  };

  this.resize = function () {
    // Set size of 'iframe' on startup, and when the browser
    // is resized, or enters fullscreen.
    if(options.resizeSupported) {
      $iframe.css(
        (H5P.isFullscreen) ? {width: '100%', height: '100%'} : getElementSize($iframe)
      );
    }
  };

  if (options.resizeSupported && this.on !== undefined) {
    this.on('resize', this.resize);
  }

  var getElementSize = function ($element) {
    // Get width of 'element' parent. Return width and height
    // so that 'element' scales (with the proper ratio) to fit
    // the parent. Make sure 'element' doesn't scale below
    // 'options.minWidth'.
    var elementMinWidth = parseInt(options.minWidth ,10);
    var elementSizeRatio = parseInt(options.height, 10) / parseInt(options.width, 10);
    var parentWidth = $element.parent().width();
    var elementWidth = (parentWidth > elementMinWidth) ? parentWidth : elementMinWidth;

    return {
      width: elementWidth + 'px',
      height: elementWidth * elementSizeRatio + 'px'
    };
  };

  // This is a fix/hack to make touch work in iframe on mobile safari,
  // like if the iframe is listening to touch events on the iframe's
  // window object. (like in PHET simulations)
  window.addEventListener("touchstart", function () {});
};
