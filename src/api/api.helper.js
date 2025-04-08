export const getContentType = () => ({
  'Content-Type': 'application/json'
})

export const errorCatch = (error) => {
  const message = error?.response?.error

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}
