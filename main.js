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

// === Pan-Indo-European Ritual Calendar with Solar + Lunar Events ===
// Displays next solar and lunar events, includes traditional Full Moon names.

(function () {
    const now = new Date();
    const currentYear = now.getFullYear();

    // --- Solar Holidays ---
    const solarHolidays = [
        { name: "Winter Solstice", date: new Date(`${currentYear}-12-21`), how: "Honor rebirth and renewal. Light candles, offer bread or mead.", gods: ["Dyeus Pater", "Sol", "Perun"] },
        { name: "Imbolc", date: new Date(`${currentYear}-02-02`), how: "Celebrate purification and new beginnings. Offer milk, oats, or spring water.", gods: ["Brigid", "Hestia", "Eostre"] },
        { name: "Spring Equinox", date: new Date(`${currentYear}-03-20`), how: "Mark balance and renewal of life. Plant seeds, light fires, pour libations.", gods: ["Freyr", "Persephone", "Cernunnos"] },
        { name: "Beltane", date: new Date(`${currentYear}-05-01`), how: "Celebrate fertility and life. Dance, feast, and offer flowers.", gods: ["Freyr", "Aphrodite", "Pan"] },
        { name: "Summer Solstice", date: new Date(`${currentYear}-06-21`), how: "Honor the sun at its height. Offer mead, dance around fire, celebrate abundance.", gods: ["Helios", "Sól", "Dazbog"] },
        { name: "Lughnasadh", date: new Date(`${currentYear}-08-01`), how: "Give thanks for the first harvest. Offer bread or grain.", gods: ["Lugh", "Demeter", "Svetovit"] },
        { name: "Autumn Equinox", date: new Date(`${currentYear}-09-22`), how: "Honor balance, reflection, and gratitude. Share food with others.", gods: ["Dagda", "Persephone", "Tyr"] },
        { name: "Samhain", date: new Date(`${currentYear}-11-01`), how: "Honor the ancestors. Light candles, leave offerings for the departed.", gods: ["Odin", "Hades", "Veles"] },
    ];

    // --- Full Moon Names (Northern Hemisphere, traditional North Euro-American) ---
    const fullMoonNames = {
        0: "Wolf Moon",       // January
        1: "Snow Moon",       // February
        2: "Worm Moon",       // March
        3: "Pink Moon",       // April
        4: "Flower Moon",     // May
        5: "Strawberry Moon", // June
        6: "Buck Moon",       // July
        7: "Sturgeon Moon",   // August
        8: "Harvest Moon",    // September (can shift to October)
        9: "Hunter’s Moon",   // October
        10: "Beaver Moon",    // November
        11: "Cold Moon"       // December
    };

    // --- Lunar Phase Generator ---
    function moonPhaseDates(year) {
        const events = [];
        const synodicMonth = 29.53058867; // average lunar cycle in days
        const knownNewMoon = new Date("2000-01-06T18:14:00Z").getTime();
        const yearStart = new Date(`${year}-01-01T00:00:00Z`).getTime();
        let lunation = Math.floor((yearStart - knownNewMoon) / (synodicMonth * 86400000));

        for (let i = 0; i < 30; i++) {
            const newMoon = new Date(knownNewMoon + (lunation + i) * synodicMonth * 86400000);
            const fullMoon = new Date(newMoon.getTime() + (synodicMonth / 2) * 86400000);

            // if (newMoon.getFullYear() === year) {
            //     events.push({
            //         name: "New Moon",
            //         date: newMoon,
            //         how: "Reflect, reset intentions, and honor mystery.",
            //         gods: ["Mani", "Soma", "Selene"],
            //     });
            // }

            if (fullMoon.getFullYear() === year) {
                const moonMonth = fullMoon.getMonth();
                const moonName = fullMoonNames[moonMonth] || "Full Moon";
                events.push({
                    name: `${moonName} (Full Moon)`,
                    date: fullMoon,
                    how: "Celebrate fullness and illumination. Feast and give thanks.",
                    gods: ["Artemis", "Chandra", "Freya"],
                });
            }
        }

        return events;
    }

    const lunarHolidays = moonPhaseDates(currentYear);

    // --- Helpers ---
    function findNext(events) {
        return events.find((h) => h.date > now) || events[0];
    }

    const nextSolar = findNext(solarHolidays);
    const nextLunar = findNext(lunarHolidays);

    function formatDate(d) {
        return d.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
    }

    // --- Display ---
    const output = `
    <h2>Upcoming Celestial Festivals</h2>

    <div style="margin-top:1em;">
      <h3>☀️ Next Solar Event</h3>
      <p><strong>${nextSolar.name}</strong><br>
      Date: ${formatDate(nextSolar.date)}<br>
      <em>How to celebrate:</em> ${nextSolar.how}</p>
      <p><strong>Gods to honor:</strong> ${nextSolar.gods.join(", ")}</p>
    </div>

    <div style="margin-top:2em;">
      <h3>🌕 Next Lunar Event</h3>
      <p><strong>${nextLunar.name}</strong><br>
      Date: ${formatDate(nextLunar.date)}<br>
      <em>How to celebrate:</em> ${nextLunar.how}</p>
      <p><strong>Gods to honor:</strong> ${nextLunar.gods.join(", ")}</p>
    </div>
  `;

    console.log('Loading holiday...');
    const el = document.getElementById("holiday");
    if (el) el.innerHTML = output;
    // document.addEventListener("DOMContentLoaded", () => {
        
    //     const el = document.getElementById("holiday");
    //     if (el) el.innerHTML = output;
    // });
})();

