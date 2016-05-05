// main.js
$(document).ready(function() {
  'use strict';
  console.log('MAIN.JS');
  if ('testing' === 'testing') {
    console.log($);
  }

  // $('input').click(function() {
  //   var value = $(this).val();
  //   $('#result').text(value);
  // });

  var rangeSlider = function() {
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');

  slider.each(function() {

    value.each(function() {
      var value = $(this).next(range).attr('value');
      $(this).text(value);
    });

    range.on('input', function() {
      $(this).prev('span').text(this.value);
    });
  });
};
  var calculateSavings = function() {
    var energyBill = $('#energyBill').attr('value'),
    mortgageYears  = $('#mortgageYears').attr('value'),
    calcSavings    = energyBill * 0.5 * mortgageYears;

    $('p#dispSavings').text(calcSavings);
  };

  rangeSlider();
  calculateSavings();
});

