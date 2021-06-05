export const msToTime = (time: number) => {
  return new Date(time).toLocaleTimeString('cs-CZ', {
    timeZone: 'Etc/UTC',
    hour12: false,
    minute: '2-digit',
    second: '2-digit',
  });
};
