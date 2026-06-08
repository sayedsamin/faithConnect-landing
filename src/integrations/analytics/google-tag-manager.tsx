import { useEffect, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { env } from '#/lib/env'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function GoogleTagManagerScript() {
  const containerId = env.VITE_GTM_CONTAINER_ID

  if (!containerId) {
    return null
  }

  const containerIdJson = JSON.stringify(containerId)

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${containerIdJson});`,
      }}
    />
  )
}

export function GoogleTagManagerNoScript() {
  const containerId = env.VITE_GTM_CONTAINER_ID

  if (!containerId) {
    return null
  }

  const containerIdQuery = encodeURIComponent(containerId)

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${containerIdQuery}`}
        height="0"
        width="0"
        title="Google Tag Manager"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

export function GoogleTagManagerPageView() {
  const location = useRouterState({
    select: (state) => state.location,
  })
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!env.VITE_GTM_CONTAINER_ID) {
      return
    }

    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({
      event: 'questura.page_view',
      page_location: window.location.href,
      page_path: location.pathname,
      page_title: document.title,
    })
  }, [location.href, location.pathname])

  return null
}
