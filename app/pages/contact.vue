<script setup lang="ts">
const { t, locale } = useI18n()
usePageSeo({ title: t('contact.title') + ' — ' + t('site.brand') })

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
})
const submitting = ref(false)
const submitted  = ref(false)
const error      = ref('')

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function submit() {
  error.value = ''
  if (!form.name || !form.message) {
    error.value = locale.value === 'zh' ? '请填写姓名和留言内容' : 'Name and message are required'
    return
  }
  if (form.email && !emailRe.test(form.email)) {
    error.value = t('contact.form.invalidEmail')
    return
  }
  submitting.value = true
  try {
    const api = useApi()
    await api('/web/userMessage/submit', {
      method: 'POST',
      body: {
        userName:  form.name,
        userEmail: form.email,
        userPhone: form.phone,
        company:   form.company,
        subject:   form.subject,
        content:   form.message,
      },
    })
    submitted.value = true
    Object.assign(form, { name: '', email: '', phone: '', company: '', subject: '', message: '' })
  } catch (e: any) {
    error.value = e?.message || 'Submit failed'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-brand-ink to-brand-ink-2 text-white">
      <div class="container-x py-20 lg:py-28">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent-2">{{ t('contact.title') }}</p>
        <h1 class="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
          {{ t('contact.subtitle') }}
        </h1>
        <p class="mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
          {{ t('contact.intro') }}
        </p>
      </div>
    </section>

    <section class="container-x grid gap-10 py-20 lg:grid-cols-5 lg:py-24">
      <!-- INFO -->
      <aside class="lg:col-span-2 space-y-8">
        <div class="rounded-2xl border border-brand-line bg-white p-6">
          <div class="flex items-center gap-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-cloud text-brand-accent">
              <Icon name="lucide:map-pin" size="20" />
            </span>
            <h3 class="text-base font-bold text-brand-ink">{{ t('contact.info.addressTitle') }}</h3>
          </div>
          <p class="mt-3 text-sm text-brand-mute leading-relaxed">{{ t('contact.info.address') }}</p>
        </div>

        <div class="rounded-2xl border border-brand-line bg-white p-6">
          <div class="flex items-center gap-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-cloud text-brand-accent">
              <Icon name="lucide:phone" size="20" />
            </span>
            <h3 class="text-base font-bold text-brand-ink">{{ t('contact.info.phoneTitle') }}</h3>
          </div>
          <p class="mt-3 text-sm text-brand-mute">{{ t('contact.info.phoneMob') }}</p>
          <p class="text-sm text-brand-mute">{{ t('contact.info.phoneTel') }}</p>
        </div>

        <div class="rounded-2xl border border-brand-line bg-white p-6">
          <div class="flex items-center gap-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-cloud text-brand-accent">
              <Icon name="lucide:mail" size="20" />
            </span>
            <h3 class="text-base font-bold text-brand-ink">{{ t('contact.info.emailTitle') }}</h3>
          </div>
          <a class="mt-3 inline-block text-sm text-brand-mute hover:text-brand-accent" :href="`mailto:${t('contact.info.email')}`">
            {{ t('contact.info.email') }}
          </a>
        </div>
      </aside>

      <!-- FORM -->
      <form
        class="lg:col-span-3 rounded-2xl border border-brand-line bg-white p-6 sm:p-8"
        @submit.prevent="submit"
      >
        <div v-if="submitted" class="rounded-md bg-brand-success/10 px-4 py-3 text-sm text-brand-success mb-6">
          {{ t('actions.submitted') }}
        </div>
        <div v-if="error" class="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600 mb-6">
          {{ error }}
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <Field
            v-model="form.name"
            :label="t('contact.form.name')"
            required
          />
          <Field
            v-model="form.email"
            type="email"
            :label="t('contact.form.email')"
          />
          <Field
            v-model="form.phone"
            :label="t('contact.form.phone')"
          />
          <Field
            v-model="form.company"
            :label="t('contact.form.company')"
          />
        </div>
        <Field
          v-model="form.subject"
          :label="t('contact.form.subject')"
          class="mt-4"
        />
        <Field
          v-model="form.message"
          type="textarea"
          :label="t('contact.form.message')"
          required
          class="mt-4"
        />

        <button
          type="submit"
          :disabled="submitting"
          class="mt-6 inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-md bg-brand-accent px-8 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-accent-2 disabled:opacity-60"
        >
          {{ submitting ? t('actions.submitting') : t('actions.submit') }}
        </button>
      </form>
    </section>
  </div>
</template>
