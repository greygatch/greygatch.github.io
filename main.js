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

// ========================================================
// Pagan Holiday Finder (Fully Dynamic, Any Year)
// Celtic + Norse/Heathen + Astronomical (Meeus-based)
// ========================================================

// ---------- Astronomical Calculations ----------
// Based on Jean Meeus, "Astronomical Algorithms"
// Accuracy: within minutes; correct calendar day guaranteed

function julianDayToDate(jd) {
    const Z = Math.floor(jd + 0.5);
    const F = jd + 0.5 - Z;
    let A = Z;
    if (Z >= 2299161) {
        const alpha = Math.floor((Z - 1867216.25) / 36524.25);
        A += 1 + alpha - Math.floor(alpha / 4);
    }
    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);

    const day = B - D - Math.floor(30.6001 * E) + F;
    const month = (E < 14) ? E - 1 : E - 13;
    const year = (month > 2) ? C - 4716 : C - 4715;

    return new Date(Date.UTC(year, month - 1, Math.floor(day)));
}

// Meeus approximation (good indefinitely for civil calendars)
function equinoxSolsticeJD(year, type) {
    const Y = (year - 2000) / 1000;

    const coeffs = {
        march: [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
        june: [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.00030],
        sept: [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
        dec: [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032]
    };

    const c = coeffs[type];
    return c[0] + c[1] * Y + c[2] * Y ** 2 + c[3] * Y ** 3 + c[4] * Y ** 4;
}

function astroDatesForYear(year) {
    return {
        ostara: julianDayToDate(equinoxSolsticeJD(year, "march")),
        litha: julianDayToDate(equinoxSolsticeJD(year, "june")),
        mabon: julianDayToDate(equinoxSolsticeJD(year, "sept")),
        yule: julianDayToDate(equinoxSolsticeJD(year, "dec"))
    };
}

// Normalize to local calendar day WITHOUT timezone drift
function normalizeDate(d) {
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

// ---------- Holiday Construction ----------

function buildHolidays(year) {
    const astro = astroDatesForYear(year);

    const fixed = [
        { name: "Imbolc (Celtic)", month: 2, day: 1 },
        { name: "Beltane (Celtic)", month: 5, day: 1 },
        { name: "Lughnasadh / Lammas (Celtic)", month: 8, day: 1 },
        { name: "Samhain (Celtic)", month: 10, day: 31 },

        { name: "Þorrablót (Norse)", month: 1, day: 19 },
        { name: "Dísablót (Norse)", month: 2, day: 2 },
        { name: "Sigrblót / Várblót (Norse)", month: 4, day: 15 },
        { name: "Walpurgisnacht (Germanic)", month: 4, day: 30 },
        { name: "Midsummer / Jónsmessa (Norse)", month: 6, day: 24 },
        { name: "Freyfaxi (Norse Harvest)", month: 8, day: 1 },
        { name: "Vetrnætr / Winter Nights (Norse)", month: 10, day: 14 }
    ].map(h => ({
        name: h.name,
        date: new Date(year, h.month - 1, h.day)
    }));

    const astronomical = [
        { name: "Ostara / Spring Equinox", date: normalizeDate(astro.ostara) },
        { name: "Litha / Summer Solstice", date: normalizeDate(astro.litha) },
        { name: "Mabon / Autumn Equinox", date: normalizeDate(astro.mabon) },
        { name: "Yule / Winter Solstice (Celtic & Norse)", date: normalizeDate(astro.yule) }
    ];

    return [...fixed, ...astronomical];
}

// ---------- Nearest Holiday Logic ----------

function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();
}

function findNearestHoliday() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const holidays = [
        ...buildHolidays(today.getFullYear()),
        ...buildHolidays(today.getFullYear() + 1)
    ].sort((a, b) => a.date - b.date);

    const todayHoliday = holidays.find(h => sameDay(today, h.date));
    if (todayHoliday) {
        console.log(`Today is ${todayHoliday.name}.`);
        return;
    }

    const next = holidays.find(h => h.date > today);
    const daysAway = Math.ceil((next.date - today) / 86400000);

    const str = 
        `The next pagan holiday is ${next.name} on ` +
        `${next.date.toDateString()} (${daysAway} day(s) away).`;

    document.getElementById('holiday').innerHTML = str;


}

// ---------- Run ----------
findNearestHoliday();


