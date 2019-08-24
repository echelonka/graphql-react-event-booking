import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const notAuth = () => {
    req.isAuth = false
    return next()
  }
  const authHeader = req.get('Authorization')
  if (!authHeader) return notAuth()

  const token = authHeader.split(' ')[1] // Bearer asdfghjkll
  if (!token || token === '') return notAuth()

  let decodedToken
  try {
    decodedToken = jwt.verify(token, 'somesupersecretkey')
  } catch (err) {
    return notAuth()
  }
  if (!decodedToken) return notAuth()

  req.isAuth = true
  req.userId = decodedToken.userId
  next()
}
