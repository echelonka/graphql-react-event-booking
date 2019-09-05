import express from 'express'
import { json } from 'body-parser'
import graphQlHttp from 'express-graphql'
import mongoose from 'mongoose'

import graphQlSchema from './graphql/schema'
import graphQlResolvers from './graphql/resolvers'
import isAuth from './middleware/is-auth'
import { errorType } from './helpers/constants'

const getErrorCode = errorName => errorType[errorName]

const app = express()

app.use(json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)

app.use('/api', graphQlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
  customFormatErrorFn: err => getErrorCode(err.message)
}))

const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-h6otv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    app.listen(8000)
  })
  .catch(err => console.error(err))
