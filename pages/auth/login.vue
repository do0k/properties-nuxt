<!--suppress TypeScriptValidateTypes -->
<script lang="ts" setup>
definePageMeta({
  auth: false,
  layout: 'auth'
})
useHead({
  title: 'ورود به سیستم'
})
const { signIn } = useAuth()
const code = ref('')
const mobile = ref('')
const passwordInput = ref<null | HTMLInputElement>(null)
const usernameInput = ref<null | HTMLInputElement>(null)
const loading = ref<boolean>(false)
const login = async () => {
  loading.value = true
  try {
    const { error, url, ok } = await signIn('daal-auth', {
      code: code.value,
      mobile: mobile.value,
      redirect: false,
      callbackUrl: undefined
    })
    if (error) {
      ElMessage({
        message: 'نام‌کاربری و/یا رمزورود اشتباه است',
        grouping: true,
        type: 'error'
      })
      usernameInput.value?.focus()
    } else {
      ElMessage({
        message: 'شما با موفقیت وارد سیستم شدید',
        grouping: true,
        type: 'success'
      })
    }
    if (ok && url) {
      const route = getRouteFromUrl(url)
      await navigateTo(route === '/auth/login' ? '/' : route, { replace: true, redirectCode: 301 })
    }
  } catch (e) { }
  loading.value = false
}
const focusPass = () => {
  passwordInput.value?.focus()
}
</script>

<template lang="pug">
.flex.flex-col.items-center
  //el-image.w-60.mb-5(src="/logo.png")
  el-card
    el-bar(title="ورود به سیستم" icon="teenyicons:lock-outline" icon-size="15px" )
    .max-w-md.mt-3
      el-input(
        ref="usernameInput"
        v-model="username"
        type="text"
        placeholder="نام‌کاربری"
        clearable
        autofocus,
        @keydown.enter="focusPass"
      ).mb-2
        template(#prepend)
          icon(name="teenyicons:user-outline" size="15px" ).text-sky-600
      el-input(
        ref="passwordInput"
        v-model="mobile"
        type="text"
        placeholder="رمزورود"
        clearable
        show-password,
        @keydown.enter="login"
      ).mb-2
        template(#prepend)
          icon(name="teenyicons:password-outline" size="15px" ).text-sky-600
      el-button(type="primary" :loading="loading", @click="login").w-full ورود به سیستم
        template(#loading)
          icon(name="svg-spinners:90-ring-with-bg" size="22px" ).mx-4
      el-divider یا
      el-button().w-full بازیابی رمزورود
</template>
