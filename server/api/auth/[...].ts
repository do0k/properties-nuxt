// noinspection JSUnusedGlobalSymbols

import CredentialsProvider from 'next-auth/providers/credentials'
import * as bcrypt from 'bcrypt'
import { NuxtAuthHandler } from '#auth'
import { db } from '~/server/db'

export default NuxtAuthHandler({
	secret: useRuntimeConfig().authSecret,
	providers: [
		// @ts-ignore
		CredentialsProvider.default({
			id: 'daal-auth',
			name: 'احراز هویت',
			type: 'credentials',
			credentials: {
				code: {label: 'کدملی', type: 'text'},
				mobile: {label: 'شماره موبایل', type: 'text'},
				otp: {label: 'کد تایید', type: 'text'}
			},
			authorize: async (credentials: any) => {
				try {
					const user = await db.user.findFirst({
						where: { code: credentials.code }
					})
					if (user) {
						// const auth = await bcrypt.compare(credentials.password.toString(), String(user?.password))
						// if (auth) {
						// 	delete user.password
						// 	return {
						// 		id: user.id,
						// 		name: user
						// 	}
						// }
						return {
							id: user.id,
							name: user.name
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
			return !!user
		},
		redirect: ({ url, baseUrl }) => {
			let _URL = baseUrl
			if (url.startsWith('/')) {
				_URL = `${ baseUrl }${ url }`
			} else if (new URL(url).origin === baseUrl) {
				_URL = url
			}
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
