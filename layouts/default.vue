<script lang="ts" setup>
import type { Ref } from 'vue'
import locale from '~/locales/fa/element-plus-locale.mjs'
import TruckScale from '~/components/TruckScale.vue'
useHead({
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl'
  },
  titleTemplate: title => `فارکو :: ${title}`
})
const collapse = ref(false)
const loading:Ref<boolean> = ref(true)

</script>

<template lang="pug">
el-config-provider(:locale="locale")
  el-container.h-screen
    app-menu(v-model="collapse")
    el-container
      NuxtLoadingIndicator(direction="right")
      el-header(height="40px").flex.items-center.bg-white.gap-2
        el-button(text circle @click="collapse = !collapse").mr-2
          template(#icon)
            icon(:name="collapse?'teenyicons:left-outline':'teenyicons:right-outline'" size="15px" )
        //- app-breadcrumb
        el-space
        user-dropdown
      el-main
        .bg-white.rounded-xl.min-h-full
          slot
      el-footer(height="26px").bg-zinc-200.text-zinc-600.flex.items-center
        icon.mr-2.text-sky-500(v-if="loading" name="svg-spinners:90-ring-with-bg" size="12px")
        icon.mr-2(v-else name="teenyicons:circle-solid" size="10px", :class="connected ? 'text-emerald-500' : 'text-rose-500'")
        .my-1.text-sm مجتمع فروآلیاژ رباط کرمان
</template>
