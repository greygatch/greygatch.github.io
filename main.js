'use strict';

window.learnMore = printConsoleMessage;
$(document).ready(init);

function init(){
  $('#fullpage').fullpage({
    navigation: true,
    navigationPosition: 'left'
  });

  console.log(`For a look at some personal information run the method "learnMore()" in the console.` )

  $('.hidden').hide();
  $('.hidden').fadeIn(1500);
}

function printConsoleMessage(){
  const yoursTruly = {
    name: 'Evan',
    interests: {
      travel: {
        description: 'I love to travel!',
        notableDestinations: ['Europe', 'National Parks']
      },
      sports: {
        description: 'I like to play and watch sports.',
        favSports: ['Frisbee, Football'],
        favTeams: ['Georgia Bulldogs']
      }
    },
    skills: {}
  };
  return JSON.stringify(yoursTruly);
}
