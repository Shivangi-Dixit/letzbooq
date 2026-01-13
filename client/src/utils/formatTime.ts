export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
};
