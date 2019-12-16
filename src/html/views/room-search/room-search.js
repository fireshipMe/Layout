import '../../../js/air-datepicker/air-datepicker'
import noUiSlider from 'nouislider'

$(document).ready(function() {

    $("#room-search__dates").datepicker.language['ru'] =  {
        days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
        daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
        daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthsShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        today: 'Сегодня',
        clear: 'Очистить',
        dateFormat: 'dd.mm.yyyy',
        timeFormat: 'hh:ii',
        firstDay: 1
    };

    const $datepicker = $('#room-search__dates').datepicker({
        range: true,
        language: 'ru',
        clearButton: true,
        acceptButton: true,
        multipleDates: true,
        offset: 5.56,
        minDate: new Date(),
        dateFormat: 'dd.mm.yyyy',
        onSelect(formattedDate, date, inst) {
          let monthsShort = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
          let formattedDates = formattedDate.split(',')
          let firstMonth = formattedDates[0][3] + formattedDates[0][4]
          let secondMonth = formattedDates[1][3] + formattedDates[1][4]
          let firstDay = formattedDates[0][0] + formattedDates[0][1]
          let secondDay = formattedDates[1][0] + formattedDates[1][1]
          $('#room-search__dates').val(firstDay + " " + monthsShort[firstMonth-1] + " - " + secondDay  + " " + monthsShort[secondMonth-1])
        }
      }).data('datepicker')

      $('#room-search__dates').click(() => {
        if (!$datepicker.visible) {
          $datepicker.show()
        }
      })
    
      $('#room-search__dates').focus(() => {
        if (!$datepicker.visible) {
          $datepicker.show()
        }
      })
    
      $('#room-search__dates').on("change paste keyup", function () {
        let inputedDate = new Date($(this).val().split('.').reverse())
        if (new Date() <= inputedDate) {
          $datepicker.selectedDates[0] = inputedDate
          $datepicker.update()
        }
    
      })
    
      $('#room-search__dates').on("change paste keyup", function () {
        let inputedDate = new Date($(this).val().split('.').reverse())
        if (new Date() <= inputedDate) {
          $datepicker.selectedDates[1] = inputedDate
          $datepicker.maxRange = inputedDate
          $datepicker.update()
        }
      })

      var slider = document.getElementById('slider')

      noUiSlider.create(slider, {
        start: [5000, 10000],
        connect: true,
        range: {
            'min': 1000,
            'max': 15000
        },
        step: 10,

    });

      slider.noUiSlider.on('update.one', function() {
        let prices = slider.noUiSlider.get()
        document.getElementById('price').innerHTML = parseInt(prices[0]) + "₽" + " - " + parseInt(prices[1]) + '₽'
      })
});