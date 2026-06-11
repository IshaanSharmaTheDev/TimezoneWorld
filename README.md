## 🚀 Live Demo: [TimezoneWorld](https://ishaansharmathedev.github.io/TimezoneWorld/)

> Try it in your browser: **[https://ishaansharmathedev.github.io/TimezoneWorld/](https://ishaansharmathedev.github.io/TimezoneWorld/)**

# TimezoneWorld

Live timezone clock for 21 world cities with meeting finder, day/night cards, and pin support.

## Features
- **21 cities** — live clocks updating every second
- **Day/night cards** — visual distinction between daytime and nighttime zones
- **Pin cities** — pin your most-used timezones to the top
- **Search** — filter by city name or region
- **Meeting finder** — find overlapping work hours between any two timezones
- **UTC offset display** — correct offsets including DST
- **Lightweight** — uses `Intl.DateTimeFormat` natively, no external libs

## Structure
```
src/zones.js   # Zone data, getTime(), getOffset(), isDaytime(), diffHours()
src/app.js     # Rendering, ticker, meeting finder, search, pin
```

## License
MIT
