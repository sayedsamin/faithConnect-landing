import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: [{ title: 'Contact Page' }],
  }),
})

function ContactPage() {
  return (
    <>
      <p>This is the contact page.</p>
    </>
  )
}
