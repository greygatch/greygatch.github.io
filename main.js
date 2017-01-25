'use strict';

$(document).ready(init);

function printConsoleMessage(){
  console.log('Hello, world!!!!')
}

function init(){
  $('#fullpage').fullpage();

  $('.hidden').hide();
  $('.hidden').fadeIn(2500);

  printConsoleMessage();

}
