import express from 'express'
import { json } from 'body-parser'
import graphQlHttp from 'express-graphql'
import mongoose from 'mongoose'

import graphQlSchema from './graphql/schema'
import graphQlResolvers from './graphql/resolvers'
import isAuth from './middleware/is-auth'

const app = express()

app.use(json())

app.use(isAuth)

app.use('/api', graphQlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}))

const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-h6otv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000)
  })
  .catch(err => console.error(err))
