export const getAuthorizationField = (req) => {
  return req?.headers?.authorization?.split('Bearer ')[1]
}
