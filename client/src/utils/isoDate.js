export const formatDate = (isoDate, format = 'DD-MM-YYYY HH:mm:ss') => {
    const date = new Date(isoDate);
    const pad = (n) => (n < 10 ? '0' + n : n);
  
    const replacements = {
      DD: pad(date.getDate()),
      MM: pad(date.getMonth() + 1),
      YYYY: date.getFullYear(),
      HH: pad(date.getHours()),
      mm: pad(date.getMinutes()),
      ss: pad(date.getSeconds()),
    };
  
    return format.replace(/DD|MM|YYYY|HH|mm|ss/g, (match) => replacements[match]);
  };
  