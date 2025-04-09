export const getContentType = () => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'location.origin',
})

export const errorCatch = (error) => {

  console.log(error)

  const message = error?.response?.error

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}
