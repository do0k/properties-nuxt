<script lang="ts" setup>
import { Icon as Iconify } from '@iconify/vue'
import type { Ref } from 'vue'
import type { AppFormDataRecord, AppFormDataValue } from '~/types'
import { FFDigits, PlateFormatter, PDigit } from '~/utils/formatters'

const props = defineProps<{
  field: AppFormDataRecord,
  prop: string | string[],
  modelValue: AppFormDataValue
}>()
const emits = defineEmits(['update:modelValue'])
const model = useVModel(props, 'modelValue', emits)
const [icon, size] = computed<[string | undefined, string | undefined]>(() => {
  if (props.field.icon) { return String(props.field.icon).split('|') }
  return [undefined, undefined]
}).value
const fixed:Ref<boolean> = ref(false)
onMounted(() => {
  if (props.field.type === 'scale') {
    const { $socket } = useNuxtApp()
    $socket.on('scale', (_weight: string, _fixed) => {
      emits('update:modelValue', _weight)
      fixed.value = _fixed
    })
  }
})
</script>

<template lang="pug">
template(v-if="field.group")
  el-divider(content-position="left" style="margin:48px 0;")
    .flex.items-center.text-gray-400
      iconify.mr-2(v-if="!!icon" :icon="icon" :width="size || '24px'" :height="size || '24px'")
      .font-light {{ field.label }}
  template(v-for="(_field, key) in field.group" :key="key")
    app-form-item(v-model="model[key]" :field="_field", :prop="`${prop}.${String(key)}`")
el-form-item(v-else, :label="field.label" :prop="prop")
  el-input(v-if="field.type === 'password'" v-model="model" v-bind="field.props" show-password clearable)
    template(v-if="!!icon", #prefix)
      iconify(:icon="icon" :width="size || '15px'" :height="size || '15px'")
  el-date-picker.w-full(v-else-if="field.type === 'date'" v-model="model" v-bind="field.props" format="YYYY/MM/DD" clearable)
  el-select-v2.prefix(v-else-if="field.type === 'select'" v-model="model" :options="field.options" v-bind="field.props" clearable)
    template(v-if="!!icon", #prefix)
      iconify.mx-3(:icon="icon" :width="size || '15px'" :height="size || '15px'")
  el-input.p-0(v-else-if="field.type === 'plate'" v-model="model" :formatter="PlateFormatter" v-bind="field.props" clearable)
    template(v-if="!!icon", #prefix)
      iconify(:icon="icon" :width="size || '15px'" :height="size || '15px'")
  el-input(v-else-if="field.type === 'currency'" v-model="model" :formatter="FFDigits", v-bind="field.props" clearable)
    template(#suffix)
      .text-lg(class="mb-[-5px]") ریالءء
    template(v-if="!!icon", #prefix)
      iconify(:icon="icon" :width="size || '15px'" :height="size || '15px'")
  el-cascader.w-full(
    v-else-if="field.type === 'cascader'"
    v-model="model"
    :options="field.options",
    placeholder="ورود/انتخاب"
    filterable,
    v-bind="field.props",
    :show-all-levels="false"
    clearable)
    template(#empty)
      .text-stone-500 چنین کالایی ثبت نشده است
  el-input(
    v-else-if="field.type === 'scale'"
    v-model="model"
    :formatter="FFDigits"
    :parser="PDigit"
    v-bind="field.props"
    readonly
    style="--el-font-size-base: 18px")
    template(v-if="!!icon", #prefix)
      iconify(:icon="icon" :width="size || '15px'" :height="size || '15px'")
    template(#suffix)
      .text-gray-400 کیلوگرم
    template(#append)
      iconify(icon="ic:twotone-circle" :class="fixed ? 'text-emerald-500' : 'text-rose-500'" width="15px" height="15px")
      //- iconify(icon="svg-spinners:90-ring-with-bg" width="15px" height="15px")
  el-input(v-else v-model="model" :type="field.type" v-bind="field.props" clearable)
    template(v-if="!!icon", #prefix)
      iconify(:icon="icon" :width="size || '15px'" :height="size || '15px'")
    template(v-if="field.props?.suffix" #suffix)
      .text-gray-400 {{ field.props?.suffix }}

</template>
