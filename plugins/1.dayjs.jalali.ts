import dayjs from 'dayjs'
import jalaliday from 'jalaliday'
export default defineNuxtPlugin(() => {
  // eslint-disable-next-line import/no-named-as-default-member
  dayjs.extend(jalaliday)
  // @ts-ignore
  dayjs.calendar('jalali')
})
