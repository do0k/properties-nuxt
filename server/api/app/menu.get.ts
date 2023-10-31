export default defineEventHandler(() => {
	return [
		{
			label: 'داشبورد',
			icon: 'teenyicons:imac-outline',
			route: { name: 'index' },
		},
		{
			label: 'کاربران',
			icon: 'teenyicons:users-outline',
			items: [
				{label: 'مدیریت کاربران', icon: 'teenyicons:clipboard-tick-outline', route: {name: 'receptions-receptions'}},
				{label: 'رزرواسیون', icon: 'teenyicons:calendar-tick-outline', route: {name: 'receptions-reservations'}}
			]
		},
		{
			label: 'گزارشات',
			icon: 'teenyicons:area-chart-outline',
			items: [
				{ label: 'وضعیت واحدها', icon: 'teenyicons:bed-single-outline', route: { name: 'reports-rooms' } },
				// { label: 'پذیرش ماهانه', icon: 'teenyicons:sort-up-outline', route: { name: 'reports-receptions' } },
				{ label: 'مالی', icon: 'teenyicons:dollar-outline', route: { name: 'reports-financial' } },
			],
		},
		{
			label: 'مدیریت واحدها',
			icon: 'teenyicons:bed-single-outline',
			items: [
				{ label: 'واحدهای سه تخته', icon: 'teenyicons:bed-single-outline', route: { name: 'rooms-suits' } },
				{ label: 'واحدهای چهار تخته', icon: 'teenyicons:bed-single-outline', route: { name: 'rooms-single' } },
				{ label: 'واحدهای پنج تخته', icon: 'teenyicons:bed-single-outline', route: { name: 'rooms-double' } },
			],
		},
		{
			label: 'کاربران',
			icon: 'teenyicons:users-outline',
			route: {name: 'users'}
		},
	]
})