# TimezoneWorld

A world clock and timezone converter. Add cities, see all their times at once, convert any time between zones instantly.

Built this because I'm always doing math like "it's 9pm here in Jaipur, what time is that in San Francisco?" and I wanted to stop doing it in my head.

## Features

- Search and add any city in the world
- All clocks update live every second
- Click any clock to set a reference time — all others update to show what that moment is in their timezone
- Shows UTC offset and whether the city is currently on DST
- Date display — handles the "tomorrow/yesterday" cases when timezones cross midnight
- Clean minimal UI, no clutter

## How to run

```
git clone https://github.com/AadhhyaSharma/TimezoneWorld
cd TimezoneWorld
# open index.html
```

Works offline once loaded. Uses the browser's built-in `Intl.DateTimeFormat` API for timezone handling — no external timezone database needed.

## Supported timezones

Anything the browser's `Intl` API supports, which is basically every IANA timezone. That's hundreds of cities.

## Default cities

Loads with Jaipur, London, New York, San Francisco, Tokyo, Sydney by default. You can add or remove any of them.

---

Simple tool. I use it pretty much daily. Zero dependencies.
