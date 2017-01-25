'use strict';

$(document).ready(init);

function printConsoleMessage(){
  console.log('Hello, world!!!!')
}

function init(){
  $('#fullpage').fullpage({
    navigation: true,
    navigationPosition: 'left'
  });

  $('.hidden').hide();
  $('.hidden').fadeIn(1500);

  printConsoleMessage();

}
