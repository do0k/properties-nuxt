import { db } from '~/server/db'

export default defineEventHandler (async (event) => {
	const {mobile, code} = await useValidate(event, schema.object({
		mobile: schema.coerce.string().trim(),
		code: schema.coerce.string().trim()
	}))

	const user = await db.user.findUnique({where: {code}})
	if (user && user.mobile === mobile) {
		const otp = String(Math.floor(100000 + Math.random() * 900000))
		const expire = new Date(new Date().getTime() + (5 * 60000))
		const userOtp = await db.user.update({
			where: {code}, data: {
				otp,
				expire
			}
		})
		if (userOtp) {
			console.log(userOtp)
			return userOtp
		}
		else return
	} else return 
})