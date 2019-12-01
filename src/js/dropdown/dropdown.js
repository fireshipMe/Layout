(function () {
  let VERSION = "0.0.1",
    pluginName = 'dropdown',
    containerBuilt = false,
    $body, $dropdownsContainer,
    autoInitSelector = '.dropdown-here',
    baseTemplate =
    '<div class="dropdown">' +
    '<div class="dropdown__content"></div>' +
    '</div>',
    defaults = {
      fields: [],
      acceptButton: false,
      clearButton: false,

      showEvent: 'focus',
      inline: false,
      offset: 0,
      type: 'checkbox',

      onChange: ''

    }

  class Dropdown {

    static get VERSION() {
      return VERSION
    }

    constructor(el, options) {
      this.el = el
      this.$el = $(el)
      this.opts = $.extend(true, defaults, options, this.$el.data())

      if ($body == undefined) {
        $body = $('body')
      }

      if (this.el.nodeName == 'INPUT') {
        this.elIsInput = true
      }

      if (this.opts.classes) {
        this.$dropdown.addClass(this.opts.classes)
      }

      
      this.inited = false
      this.visible = false
      this.silent = false // Need to prevent unnecessary renderin

      this.init()
      this.inited = true;
    }

    init() {
      if (!containerBuilt && !this.opts.inline && this.elIsInput) {
        this._buildDropdownsContainer()
      }

      this._buildBaseHtml();
      this._bindEvents()
      this._setWidth()

      this.body = new $.fn.dropdown.Body(this, this.opts.type, this.opts)
      
      if (this.opts.type == 'counter') {
        this.$counters = $('.dropdown__counter', this.$dropdown)
      }

      this.$dropdown.on('mousedown', this._onMouseDownDropdown.bind(this))
      this.$dropdown.on('mouseup', this._onMouseUpDropdown.bind(this))
    }

    _buildDropdownsContainer() {
      containerBuilt = true
      $body.append('<div class="dropdowns-container" id="dropdowns-container"></div>')
      $dropdownsContainer = $('#dropdowns-container')
    }

    _buildBaseHtml() {
      let $appendTarget,
        $inline = $('<div class="dropdown-inline">')

      if (this.el.nodeName == 'INPUT') {
        if (!this.opts.inline) {
          $appendTarget = $dropdownsContainer
        } else {
          $appendTarget = $inline.insertAfter(this.$el)
        }
      } else {
        $appendTarget = $inline.appendTo(this.$el)
      }

      this.$dropdown = $(baseTemplate).appendTo($appendTarget)
      this.$content = $('.dropdown__content', this.$dropdown)
      this.$buttons = $('.dropdown__buttons', this.$dropdown)
    }

    _bindEvents() {
      this.$el.on(this.opts.showEvent + '.adp', this._onShowEvent.bind(this))
      this.$el.on('mouseup.adp', this._onMouseUpEl.bind(this))
      this.$el.on('blur.adp', this._onBlur.bind(this))
      $(window).on('resize.adp', this._onResize.bind(this));
      $('body').on('mouseup.adp', this._onMouseUpBody.bind(this));
    }

    _onShowEvent() {
      if (!this.visible) {
        this.show()
      }
    }

    _setWidth() {
      let width = this.$el.css('width')

      this.$dropdown.css('width', width)
    }

    _onMouseUpEl(e) {
      e.originalEvent.inFocus = true
      setTimeout(this._onKeyUpGeneral.bind(this), 4)
    }

    _onKeyUpGeneral() {
      var val = this.$el.val();

      if (!val) {
        this.clear();
      }
    }

    _onBlur() {
      if (!this.inFocus && this.visible) {
        this.hide()
      }
    }

    _onResize() {
      if (this.visible) {
        this.setPosition();
      }
    }

    _onMouseUpBody(e) {
      if (e.originalEvent.inFocus) return

      if (this.visible && !this.inFocus) {
        this.hide()
      }
    }

    _onMouseDownDropdown() {
      this.inFocus = true
    }

    _onMouseUpDropdown(e) {
      this.inFocus = false
      e.originalEvent.inFocus = true
    }

    show() {
      let onShow = this.opts.onShow

      this.setPosition()
      this.$dropdown.addClass('active')
      this.$el.addClass('active')
      this.visible = true

      if (onShow) {
        this._bindVisionEvents(onShow)
      }
    }

    hide() {
      let onHide = this.opts.onHide

      this.$dropdown
        .removeClass('active')
        .css({
          left: '-100000px'
        })

      this.inFocus = false
      this.visible = false
      this.$el.removeClass('active')
      this.$el.blur()

      if (onHide) {
        this._bindVisionEvents(onHide)
      }
    }

    clear() {
      this.$el.val('')
      if (this.opts.type == 'counter') {
        this.$counters.each((i, value) => {
          let $value = $(value, this.$dropdown).children('.dropdown__counter-value')
          $value.html($value.data('mincount'))
          this._checkCounterValue($value)
        })

        
      }
    }

    _checkCounterValue($value) {
      if (+$value.html() >= +$value.data('maxcount')) {
        $value.html(+$value.data('maxcount'))
        $value.siblings('.dropdown__counter-inc').addClass('disabled')
      } else $value.siblings('.dropdown__counter-inc').removeClass('disabled')

      if (+$value.html() <= +$value.data('mincount')) {
        $value.html(+$value.data('mincount'))
        $value.siblings('.dropdown__counter-dec').addClass('disabled')
      } else $value.siblings('.dropdown__counter-dec').removeClass('disabled')
    }

    accept() {
      this.hide()
    }
    _getDimensions($el) {
      var offset = $el.offset();
      return {
        width: $el.outerWidth(),
        height: $el.outerHeight(),
        left: offset.left,
        top: offset.top
      }
    }

    setPosition() {
      let dims = this._getDimensions(this.$el),
        selfDims = this._getDimensions(this.$dropdown),
        offset = this.opts.offset,
        top = dims.top + dims.height - 1 + offset,
        left = dims.left

      this.$dropdown
        .css({
          left: left,
          top: top
        })
    }

    static template(str, data) {
      return str.replace(/#\{([\w]+)\}/g, function (source, match) {
        if (data[match] || data[match] === 0) {
          return data[match]
        }
      });
    }
  }




  $.fn.dropdown = function (options) {
    return this.each(function () {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName,
          new Dropdown(this, options))
      } else {
        let _this = $.data(this, pluginName)

        _this.opts = $.extend(true, _this.opts, options)
        _this.update()
      }
    })
  }

  $.fn.dropdown.Constructor = Dropdown

})()