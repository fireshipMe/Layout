(function () {
  const templates = {
      counter: '<div class = "dropdown__counters dropdown__body">' +
        '<div class = "dropdown__fields"</div>' +
        '</div>',
      checkbox: '<div class = "dropdown__fields dropdown__checkboxes dropdown__body">' +
        '<div class = "dropdown__fields"</div>' +
        '</div>'
    },
    buttonsContainerTemplate = '<div class="dropdown__buttons"></div>',
    button = '<button class="dropdown__button" data-action="#{action}">#{label}</button>',
    dropdown = $.fn.dropdown,
    dp = dropdown.Constructor

  dropdown.Body = class Body {

    constructor(d, type, opts) {
      this.d = d
      this.type = type
      this.opts = opts
      this.$el = $('')
      this.$buttonsContainer = '';

      this.init()
    }

    init() {
      this._buildBaseHtml()
      this._render()
      this._addClasses()
      this._bindEvents()
    }

    _addClasses() {
      if (this.type === 'counter') {
        let $values = $('.dropdown__counter-value', this.$el)
        $values.each((i, $value) => {
          this.d._checkCounterValue($($value))
        })
      }
    }

    _bindEvents() {
      this.$el.on('click', '.dropdown__operator', $.proxy(this._onClickOperator, this))
      this.d.$dropdown.on('click', '.dropdown__button', $.proxy(this._onClickButton, this))
    }

    _buildBaseHtml() {
      this.$el = $(templates[this.type]).appendTo(this.d.$content)
      this.$fields = $('.dropdown__fields', this.$el)

      this._addButtonsIfNeed();
    }

    _getCountersHtml() {

      let html = ''
      this.opts.fields.forEach(field => {
        html += this._getCounterHtml(field)
      })

      return html
    }

    _getCounterHtml(field) {
      let {
        label,
        minCount = 0,
        maxCount = 100,
        step = 1,
        startCount = minCount
      } = field
      let data =
        `data-minCount = "${minCount}" ` +
        `data-maxCount = "${maxCount}" ` +
        `data-step=${step}`
      return (
        '<div class = "dropdown__field">' +
        `<div class = "dropdown__counter-label">${label}</div>` +
        '<div class = "dropdown__counter">' +
        '<button class = "dropdown__counter-dec dropdown__operator"> - </button>' +
        `<div class = "dropdown__counter-value" ${data}>${startCount}</div>` +
        '<button class = "dropdown__counter-inc dropdown__operator"> + </button>' +
        '</div>' +
        '</div>'
      )
    }

    _render() {
      let html
      if (this.type == 'counter') {
        html = this._getCountersHtml()
      }

      this.$fields.html(html)
    }

    _onClickOperator(e) {
      var $el = $(e.target).closest('.dropdown__operator')

      if ($el.hasClass('disabled')) return

      this._handleOperatorClick.bind(this)($el)
    }

    _handleOperatorClick($el) {
      if (this.type === 'counter') {

        let $value = $el.siblings('.dropdown__counter-value')

        if ($el.hasClass('dropdown__counter-inc')) {
          $value.html(+$value.html() + +$value.data('step'))
        }

        if ($el.hasClass('dropdown__counter-dec')) {
          $value.html(+$value.html() - +$value.data('step'))
        }

        this.d._checkCounterValue($value)
        if (this.opts.onChange) {
          let label = $el.parent().siblings('.dropdown__counter-label').html(),
            guestsCounter = this._getGuestsCounter(this.$el)
          this.opts.onChange(label, $value.html(), guestsCounter, this.d)

        }
      }
    }

    _getGuestsCounter($el) {
      let $values = $('.dropdown__counter-value', $el),
        guestsCounter = 0
      $values.each((i, $value) => {
        guestsCounter += +$($value).html()
      })

      return guestsCounter
    }

    _addButtonsIfNeed() {

      if (this.opts.clearButton) {
        this._addButton('очистить')
      }

      if (this.opts.acceptButton) {
        this._addButton('принять')
      }
    }

    _addButton(type) {
      if (!this.$buttonsContainer.length) {
        this._addButtonsContainer()
      }

      let data = {
          action: type,
          label: type
        },
        html = dp.template(button, data)

      if ($('[data-action=' + type + ']', this.$buttonsContainer).length) 
        return

        this.$buttonsContainer.append(html)
    }

    _addButtonsContainer() {
      this.d.$dropdown.append(buttonsContainerTemplate)
      this.$buttonsContainer = $('.dropdown__buttons', this.d.$dropdown)
    }

    _onClickButton(e) {
      var $el = $(e.target).closest('[data-action]'),
        action = $el.data('action')

      this.d[action]()
    }
  }
})()