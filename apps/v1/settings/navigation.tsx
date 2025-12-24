import { getPageRoutes } from "@/lib/pageRoutes"

export async function getNavigations() {
  const routes = await getPageRoutes()
  
  const firstDocsRoute = routes.find(route =>
    !route.href.startsWith('/components') && route.href !== '/components'
  )?.href || '/introduction'
  
  const firstComponentRoute = routes.find(route =>
    route.href.startsWith('/components/')
  )?.href || '/components/accordion'
  
  return [
    {
      title: "Docs",
      href: `/docs${firstDocsRoute}`,
    },
    {
      title: "Components",
      href: `/docs${firstComponentRoute}`,
    },
  ]
}