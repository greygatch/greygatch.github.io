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

function printConsoleMessage() {
  const yoursTruly = {
    name: 'Evan',
    interests: {
      books: ['Aristotle', 'Plato'],
      sports: {
        description: 'I like to play and watch sports.',
        favSports: ['Frisbee, Football, Baseball'],
        favTeams: ['Georgia Bulldogs', 'Atlanta Braves']
      },
      travel: {
        description: 'I love to travel!',
        notableDestinations: ['Europe', 'National Parks', 'Mexico'],
      }
    },
    skills: {
      computerScience: {
        aglorithms: {},
        dataStructures: {}
      },
      continuousIntegration: {
        tools: {}
      },
      dataScience: {
        tools: {},
        skills: {}
      },
      paradigms: {
        functional: {
          languages: {
            erlang: {},
            elixir: {}
          }
        },
        obectOriented: {
          languages: {
            javascript: {},
            python: {}
          }
        }
      }
    }
  };
  return yoursTruly;
}
