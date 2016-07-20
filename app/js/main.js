// main.js
$(document).ready(function() {
  'use strict';

  var friendsData = [{
    id: 1,
    name: 'Tricia',
    age: 35
  }, {
    id: 2,
    name: 'Joanna',
    age: 39
  }, {
    id: 3,
    name: 'Sarah',
    age: 30
  }, {
    id: 4,
    name: 'Kit',
    age: 31
  },];

  friendsData.forEach(function(name, index) {
    console.log(friendsData[index].name);
  });

});
