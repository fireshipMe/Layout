import './air-datepicker/air-datepicker'
import './dropdown/index'
import "inputmask/dist/jquery.inputmask.bundle";

$(document).ready(() => {

    const $datepicker = $('#arrival-date').datepicker({
      range: true,
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
  
    $('#departure-date').inputmask("99.99.9999")
    $('#arrival-date').inputmask("99.99.9999")
  
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
            label: 'Adults',
            maxCount: 10,
            minCount: 0,
            startCount: 0,
            step: 1
          },
          {
            label: 'Children',
            maxCount: 10
          },
          {
            label: 'Babies',
            maxCount: 10
          }      
      ],
      acceptButton: true,
      clearButton: true,
      onChange(changedValue, curCount, valuesSum, inst) {
        if (valuesSum > 0 ) {
          if (valuesSum === 1)
            inst.$el.val(`1 guest`)
          else 
            inst.$el.val(`${valuesSum} guests`)
        } else inst.$el.val('')
      }
    })
  
  })