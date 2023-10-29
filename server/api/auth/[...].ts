// noinspection JSUnusedGlobalSymbols

import CredentialsProvider from 'next-auth/providers/credentials'
import * as bcrypt from 'bcrypt'
import { NuxtAuthHandler } from '#auth'
import { db } from '~/server/db'
import type { AppUser } from '~/types'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      id: 'daal-auth',
      name: 'احراز هویت',
      type: 'credentials',
      credentials: {},
      authorize: async (credentials:any) => {
        try {
          const user:AppUser = await db.user.findFirst({
            where: { username: credentials.username },
            select: {
              id: true,
              username: true,
              email: true,
              password: true,
              active: true,
              socket: true,
              profile: {
                select: {
                  name: true,
                  family: true,
                  gender: true,
                  code: true,
                  brith: true,
                  born: true
                }
              },
              roles: {
                select: {
                  role: {
                    select: {
                      id: true,
                      name: true
                    }
                  }
                }
              }
            }
          })
          if (user) {
            const auth = await bcrypt.compare(credentials.password.toString(), String(user?.password))
            if (auth) {
              delete user.password
              return {
                id: user.id,
                name: user
              }
            }
          }
        } catch (e) {
          throw createError({ message: 'نام کاربری و رمزورود الزامی می‌باشد', statusCode: 422 })
        }
        return null
      }
    })
  ],
  callbacks: {
    signIn: ({ user }) => {
      return !!user && (user.name?.active || false)
    },
    redirect: ({ url, baseUrl }) => {
      let _URL = baseUrl
      if (url.startsWith('/')) { _URL = `${baseUrl}${url}` } else if (new URL(url).origin === baseUrl) { _URL = url }
      return _URL
    },
    jwt: (req) => {
      return req.token
    },
    session: (req) => {
      return req.session
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  }
})
