const TimeZones = (() => {
  const ZONES = [
    {name:'New York',tz:'America/New_York',lat:40.7,lon:-74,region:'Americas'},
    {name:'Los Angeles',tz:'America/Los_Angeles',lat:34,lon:-118,region:'Americas'},
    {name:'Chicago',tz:'America/Chicago',lat:41.8,lon:-87.6,region:'Americas'},
    {name:'Toronto',tz:'America/Toronto',lat:43.6,lon:-79.4,region:'Americas'},
    {name:'São Paulo',tz:'America/Sao_Paulo',lat:-23.5,lon:-46.6,region:'Americas'},
    {name:'London',tz:'Europe/London',lat:51.5,lon:-0.12,region:'Europe'},
    {name:'Paris',tz:'Europe/Paris',lat:48.85,lon:2.35,region:'Europe'},
    {name:'Berlin',tz:'Europe/Berlin',lat:52.5,lon:13.4,region:'Europe'},
    {name:'Moscow',tz:'Europe/Moscow',lat:55.75,lon:37.6,region:'Europe'},
    {name:'Dubai',tz:'Asia/Dubai',lat:25.2,lon:55.27,region:'Asia'},
    {name:'Mumbai',tz:'Asia/Kolkata',lat:19.07,lon:72.87,region:'Asia'},
    {name:'Delhi',tz:'Asia/Kolkata',lat:28.6,lon:77.2,region:'Asia'},
    {name:'Singapore',tz:'Asia/Singapore',lat:1.35,lon:103.82,region:'Asia'},
    {name:'Tokyo',tz:'Asia/Tokyo',lat:35.68,lon:139.69,region:'Asia'},
    {name:'Beijing',tz:'Asia/Shanghai',lat:39.9,lon:116.4,region:'Asia'},
    {name:'Seoul',tz:'Asia/Seoul',lat:37.56,lon:126.97,region:'Asia'},
    {name:'Sydney',tz:'Australia/Sydney',lat:-33.87,lon:151.2,region:'Pacific'},
    {name:'Auckland',tz:'Pacific/Auckland',lat:-36.86,lon:174.76,region:'Pacific'},
    {name:'Cairo',tz:'Africa/Cairo',lat:30.04,lon:31.23,region:'Africa'},
    {name:'Lagos',tz:'Africa/Lagos',lat:6.45,lon:3.39,region:'Africa'},
    {name:'Nairobi',tz:'Africa/Nairobi',lat:-1.29,lon:36.82,region:'Africa'},
  ];

  function getTime(tz) {
    return new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:tz,hour12:false}).format(new Date());
  }

  function getOffset(tz) {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const local = new Date(new Intl.DateTimeFormat('en-US',{timeZone:tz,hour:'numeric',minute:'numeric',second:'numeric',hour12:false,year:'numeric',month:'numeric',day:'numeric'}).format(d));
    const diff = (local - d) / 36e5;
    const sign = diff >= 0 ? '+' : '-';
    const abs = Math.abs(diff);
    const h = Math.floor(abs);
    const m = Math.round((abs - h) * 60);
    return `UTC${sign}${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  }

  function isDaytime(tz) {
    const h = parseInt(getTime(tz).split(':')[0]);
    return h >= 6 && h < 20;
  }

  function getAll() { return ZONES; }

  function search(q) {
    const lq = q.toLowerCase();
    return ZONES.filter(z => z.name.toLowerCase().includes(lq) || z.region.toLowerCase().includes(lq) || z.tz.toLowerCase().includes(lq));
  }

  function diffHours(tzA, tzB) {
    const fmt = tz => new Date(new Intl.DateTimeFormat('en-US',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date())).getTime();
    return (fmt(tzA) - fmt(tzB)) / 36e5;
  }

  return { getAll, getTime, getOffset, isDaytime, search, diffHours };
})();
