// main.js
$(document).ready(function() {
  'use strict';
  console.log('MAIN.JS');
  $('#example_id').ionRangeSlider();

  var $monthlyBillRange = $('#monthlyEnergyBill');
  var $monthlyBill = $('.monthly-bill');
  var $mortgageRange = $('#mortgageYears');
  var a = 200;
  var b = 100;
  var track = function(data) {
  $monthlyBill.html('Monthly Bill Amount: ' + data.from);
};

  var track = function(data) {
  $monthlyBill.html('Monthly Bill Amount: ' + data.from);
};

  $monthlyBillRange.ionRangeSlider({
    hide_min_max: false,
    keyboard: true,
    min: 0,
    max: 1000,
    step: 1,
    from: 200,
    prettify_enabled: true,
    prettify_separator: ',',
    prefix: '$',
    grid: false,
    onStart: track,
    onChange: track,
    onFinish: track,
    onChange: function(data) {
      b = data.from;
      updateSavings();
    }
  });

  $mortgageRange.ionRangeSlider({
    hide_min_max: false,
    keyboard: true,
    min: 0,
    max: 30,
    step: 1,
    from: 200,
    prettify_enabled: true,
    grid: false,
    onStart: track,
    onChange: function(data) {
      a = data.from;
      updateSavings();
    }
  });

  var $totalEnergySavings = $('.totalEnergySavings');

  function updateSavings() {
  var savingsCalc = a * b;
  $totalEnergySavings.text(savingsCalc);
}
  // SAMPLE CODE
  // function sum () {
  //     var total = (a * 15) + (b * 15) + (c * 15);
  //     $total.text(total);
  // }

  // function sum2 () {
  //     var totals = (a * 15) + (b * 15) + (c * 15);
  //     var k = Number(totals) + Number( $('#other_amount').val());
  //     $grand_total.text(k);
  // }

  // $('#other_amount').change(function() {
  //     sum2();
  // });

  // $("#range1").ionRangeSlider({
  //     min: 0,
  //     max: 25,
  //     postfix: " in Basket",
  //     hide_min_max: true,
  //     hide_from_to: false,
  //     grid: true,
  //     keyboard: true,
  //     keyboard_step: 1,
  //     force_edges: true,
  //     onChange: function (data) {
  //         a = data.from;
  //         sum();
  //         sum2();
  //     }
  // });

  // $("#range2").ionRangeSlider({
  //     min: 0,
  //     max: 25,
  //     postfix: " in Basket",
  //     hide_min_max: true,
  //     hide_from_to: false,
  //     grid: true,
  //     keyboard: true,
  //     keyboard_step: 1,
  //     force_edges: true,
  //     onChange: function (data) {
  //         b = data.from;
  //         sum();
  //         sum2();
  //     }
  // });

  // $("#range3").ionRangeSlider({
  //     min: 0,
  //     max: 25,
  //     postfix: " in Basket",
  //     hide_min_max: true,
  //     hide_from_to: false,
  //     grid: true,
  //     keyboard: true,
  //     keyboard_step: 1,
  //     force_edges: true,
  //     onChange: function (data) {
  //         c = data.from;
  //         sum();
  //         sum2();
  //     }
  // });

  // $monthlyBill.on('change', function() {
  //   var $this = $(this),
  //     value = $this.prop('value');
  //   $result.html(value);
  // });

});

// $(document).ready(function() {
//   var $range = $('#range_46'),
//     $result = $('#result_46');

//   var track = function(data) {
//     $result.html('Value: ' + data.from);
//   };

//   $range.ionRangeSlider({
//     type: 'single',
//     min: 1000,
//     max: 5000,
//     from: 2000,
//     step: 100,
//     onStart: track,
//     onChange: track,
//     onFinish: track,
//     onUpdate: track
//   });
// });
