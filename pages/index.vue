<script lang="ts" setup>
import type {Ref} from 'vue'
import {err, msg} from '~/utils/helpers'

useHead({
  title: 'داشبورد'
})
const {error} = await useLazyFetch('/api/app/dashboard', {server: false})
const weight = ref('')
const loading: Ref<boolean> = ref(false)
const send = async () => {
  loading.value = true
  const {data, error} = await useSend<{ message: string }>('api/scale', {
    method: 'POST',
    body: {
      weight: weight.value
    }
  })
  loading.value = false
  err(error)
  msg(data)
}
const date = ref()
</script>

<template lang="pug">
error-observer(:error="error")
  .flex.items-center.p-3
    label.w-40(for="test-scale") وزن باسکول
    el-input#test-scale(v-model="weight" placeholder="تست ارسال وزن باسکول")
    el-button.mx-5(type="success" :loading="loading" @click="send") ارسال وزن
  .flex
    el-date-picker(v-model="date" type="datetime")
    code.w-80.m-3.bg-gray-400.text-right(dir="ltr") {{ date?.toISOString() }}
</template>
