export function usePageSeo(opts: { title: string; description?: string; image?: string }) {
  const { public: { siteUrl } } = useRuntimeConfig()
  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogImage: opts.image,
    twitterCard: 'summary_large_image',
  })
  useHead({
    link: [{ rel: 'canonical', href: siteUrl + useRoute().path }],
  })
}
