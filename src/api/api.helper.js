export const getContentType = () => ({
  'Content-Type': 'application/json',
})

export const errorCatch = (error) => {
  const data = error?.response?.data;
  const message = data?.message || data?.error || data;

  return message
    ? typeof message === 'object'
      ? Array.isArray(message)
        ? message[0]
        : JSON.stringify(message)
      : message
    : error?.message || 'Unknown error';
}
