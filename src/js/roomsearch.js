import './air-datepicker/air-datepicker'
import './dropdown/index'

$(document).ready(() => {

    $('#arrival-date').datepicker.language['ru'] =  {
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

    const $datepicker = $('#arrival-date').datepicker({
      range: true,
      language: 'ru',
      clearButton: true,
      acceptButton: true,
      multipleDates: true,
      offset: 5.56,
      minDate: new Date(),
      dateFormat: 'dd.mm.yyyy',
      onSelect(formattedDate, date, inst) {
        let formattedDates = formattedDate.split(',')
        $('#arrival-date').val(formattedDates[0])
        $('#departure-date').val(formattedDates[1])
  
      }
    }).data('datepicker')
  
    $('#departure-date').click(() => {
      if (!$datepicker.visible) {
        $datepicker.show()
      }
    })
  
    $('#departure-date').focus(() => {
      if (!$datepicker.visible) {
        $datepicker.show()
      }
    })
  
    $('#arrival-date').on("change paste keyup", function () {
      let inputedDate = new Date($(this).val().split('.').reverse())
      if (new Date() <= inputedDate) {
        $datepicker.selectedDates[0] = inputedDate
        $datepicker.update()
      }
  
    })
  
    $('#departure-date').on("change paste keyup", function () {
      let inputedDate = new Date($(this).val().split('.').reverse())
      if (new Date() <= inputedDate) {
        $datepicker.selectedDates[1] = inputedDate
        $datepicker.maxRange = inputedDate
        $datepicker.update()
      }
    })
  
    $('#guest-counter').dropdown({
      type: 'counter',
      fields: [
          {
            label: 'Взрослые',
            maxCount: 10,
            minCount: 0,
            startCount: 0,
            step: 1
          },
          {
            label: 'Дети',
            maxCount: 10
          },
          {
            label: 'Младенцы',
            maxCount: 10
          }      
      ],
      acceptButton: true,
      clearButton: true,
      onChange(changedValue, curCount, valuesSum, inst) {
        if (valuesSum > 0 ) {
          if (valuesSum === 1)
            inst.$el.val(`1 гость`)
          else 
            inst.$el.val(`${valuesSum} гостей`)
        } else inst.$el.val('')
      }
    })

 
  })