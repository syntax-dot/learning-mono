import 'reflect-metadata'
import { User } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { answerRoute } from './answer/answer.route'
import { initPrisma } from './app/prisma'
import { authRoute } from './auth/auth.route'
import { categoryRoute } from './category/category.route'
import { questionRoute } from './question/question.route'
import { themeRoute } from './theme/theme.route'

declare module 'express-session' {
  interface SessionData {
    user: User
  }
}

async function main() {
  await initPrisma()

  const app = express()
  const port = 3030

  app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
  console.log(process.env.CLIENT_URL)

  app.use(express.json())
  app.use(session({
    secret: 'vdgyhas4123jfvdghjaw2311v',
    resave: false,
    saveUninitialized: false,
  }))

  app.use(authRoute)
  app.use(categoryRoute.router)
  app.use(themeRoute.router)
  app.use(questionRoute.router)
  app.use(answerRoute.router)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()
