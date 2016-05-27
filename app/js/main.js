// main.js
$(document).ready(function() {
  'use strict';
  console.log('MAIN.JS');

  console.log('ouibounce');

  ouibounce(document.getElementById('ouibounce-modal'), {
    aggressive: true,
    sitewide: true,
    cookieDomain: '.example.com',
    timer: 0,
    callback: function() {
      console.log('ouibounce fired!');
    }
  });
});
