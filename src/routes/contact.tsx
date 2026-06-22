import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [{ title: 'Contact Page' }],
  }),
})

function ContactPage() {
  return (
    <main className="page-wrap pt-32 pb-20">
      <p>This is the contact page.</p>
    </main>
  )
}
