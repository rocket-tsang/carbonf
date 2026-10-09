<script setup lang="ts">
const model = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<{
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  required?: boolean
  placeholder?: string
}>(), {
  type: 'text',
  required: false,
  placeholder: '',
})

const inputId = useId()
</script>

<template>
  <div>
    <label :for="inputId" class="block text-sm font-semibold text-brand-ink">
      {{ label }}
      <span v-if="required" class="text-brand-accent">*</span>
    </label>
    <textarea
      v-if="type === 'textarea'"
      :id="inputId"
      v-model="model"
      :required="required"
      :placeholder="placeholder"
      rows="5"
      class="mt-2 block w-full rounded-md border border-brand-line bg-white px-3 py-2.5 text-sm text-brand-ink placeholder:text-brand-mute focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
    />
    <input
      v-else
      :id="inputId"
      v-model="model"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      class="mt-2 block w-full rounded-md border border-brand-line bg-white px-3 py-2.5 text-sm text-brand-ink placeholder:text-brand-mute focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
    />
  </div>
</template>
