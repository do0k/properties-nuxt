import {db} from '~/server/db'

export default async () => {
	await db.$connect()
	await db.user.create({
		data: {
			name: 'محمدمهدی ایرانمنش',
			code: 2980956872,
			mobile: '09135306411',
			role: 'ADMIN'
		}
	})
	await db.$disconnect()
}