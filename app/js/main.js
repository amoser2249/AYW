// main.js
$(window).load(function() {
  'use strict';

  console.log('MAIN.JS');

  var $forgotModal = $('<div id="ouibounce-modal" style="display: none;"> <div class="modal-underlay blue"> </div> <div class="modal-wrapper"> <div class="modal-close"> <i class="icon ion-close"></i> </div> <div class="card-wrap"> <div class="modal-cta"> <div class="responsive-img"> <img src="/images/piggy-bank-white.svg" alt="PiggyBank"> </div> <div class="modal-cta-text"> <span>You forgot your $50!</span> </div> </div> <div class="card"> <p>Wait! If we can\'t save you money, we\'ll give you a $50 Amazon card. Seriously.</p> <p class="emphasis">Go on, get $50.</p> <div class="modal-buttons"> <a href="#" id="modal-yes" title="Yes">Try it!</a> </div> </div> </div> </div> </div>');

  var $wantMoney = $('<div id="ouibounce-modal"> <div class="modal-underlay blue"> </div> <div class="modal-wrapper"> <div class="modal-close"> <i class="material-icons md-48 md-light">clear</i> </div> <div class="card-wrap"> <div class="modal-cta"> <div class="responsive-img"> <img src="/images/piggy-bank-white.svg" alt="PiggyBank"> </div> <div class="modal-cta-text"> <span>Do you want $50?</span> </div> </div> <div class="card"> <p>We really want to save you money on insurance. So if we can\'t, we\'ll just give you $50. Sound good?</p> <div class="modal-buttons multi"> <a href="" id="modal-yes" title="Yes">YES!</a> <a href="#" id="modal-no" title="No">No</a> </div> </div> </div> </div> </div>');

  $('body').prepend($forgotModal);

  // $('body').prepend($wantMoney);

  console.log('ouibounce');

  var _ouibounce = ouibounce(document.getElementById('ouibounce-modal'), {
    aggressive: true,
    timer: 0,
    callback: function() {
      console.log('ouibounce fired!');
    }
  });

  $('body').on('click', function() {
    $('#ouibounce-modal').fadeOut('fast');
  });

  $('#ouibounce-modal #modal-no, .modal-close'). on('click', function() {
    $('#ouibounce-modal').fadeOut('fast');
  });

  $('#ouibounce-modal #modal-yes'). on('click', function() {
    window.location.href = 'http://www.getmargo.com/get-50/';
  });

  $('#ouibounce-modal .card-wrap').on('click', function(e) {
    e.stopPropagation();
  });

  // $('.modal-close').on('click', function() {
  //   $('#ouibounce-modal').fadeOut('fast');
  // });



});
