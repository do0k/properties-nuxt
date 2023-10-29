<script lang="ts" setup>
import type { Ref } from 'vue'
const notifies:Ref<string[]> = ref([])
const reads:Ref<string[]> = ref([])
const drawer = ref(false)
const action = (command:string | number) => {
  if (typeof command === 'string') {
    // TODO: show all message (read & unreaded)
  } else {
    reads.value.push(notifies.value[command])
    notifies.value.splice(command, 1)
  }
}
onMounted(() => {
  const { $socket } = useNuxtApp()
  $socket.on('message', (message:string) => {
    notifies.value.push(message)
  })
})
</script>

<template lang="pug">
el-dropdown(trigger="click" @command="action")
  el-badge(is-dot, :hidden="notifies?.length === 0")
    el-button(text circle)
      template(#icon)
        icon(name="teenyicons:bell-outline" size="15px")
  template(#dropdown)
    el-dropdown-menu(v-if="notifies.length > 0")
      el-dropdown-item(v-for="(notify, key) in notifies" :key="key" :command="key")
        el-tag.w-full.justify-start(type="success" size="large" class="min-w-[200px]") {{ notify }}
      el-dropdown-item(v-if="true" command="show-all")
        el-tag.w-full(type="info") نمایش همه
    el-empty.mx-20(v-else description="هیچ پیامی ندارید" :image-size="80")
el-drawer(v-model="drawer", width="300px", append-to-body)
</template>
