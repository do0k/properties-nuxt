import type { FormInstance } from 'element-plus'
import type { Ref } from 'vue'
import type { AppFormData, AppFormDataValue } from '~/types'

export const defineAppForm = (target:AppFormData):[AppFormData, {[P in keyof AppFormData]:AppFormDataValue}, Ref<FormInstance>] => [
  reactive(target),
  reactive(resolveData(target)),
  // @ts-ignore
  ref<FormInstance>()
]
const resolveData = (target:AppFormData):{[P in keyof AppFormData]:AppFormDataValue} => {
  return Object.keys(target).reduce(
    (object, value) => (
      target[value].group ? { ...object, [value]: { ...resolveData(<AppFormData>target[value].group) } } : { ...object, [value]: target[value].value }
    ), {})
}
