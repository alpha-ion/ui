import { Announcement } from "@/components/announcement"
import Container from "@/components/Container"
import { ExamplesNav } from "@/components/examples-nav"
import { PageNav } from "@/components/page-nav"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { RootComponents } from "./components"
import ToggleDemo from "@/registry/examples/toggle-demo/toggle-demo"
import { Toggle } from "@/registry/ui/toggle"
import { BookmarkIcon } from "lucide-react"

const Home = () => {
  const t = useTranslations("home")
  return (
    <div className="min-h-[81.6vh] py-8 md:py-10 lg::py-14">
      <Container>
        <section className="space-y-6 md:space-y-8 mb-12">
          <div className="flex justify-start -mb-6">
            <Announcement />
          </div>
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight max-w-xl text-balance tracking-tight lg:leading-[1.1] xl:tracking-tighter">
              {t("title")} <br />
              <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r w-fit from-[#0898f4] from-[0%] via-[#f34d7a] via-[70%] to-[#f95032]">
                {t("highlight")}{" "}
              </span>
              {t("subtitle")}
            </h1>
            <p className="text-base md:text-lg lg:text-xl font-normal md:max-w-2xl max-w-xl text-foreground/80 leading-relaxed">
              {t("description")}
            </p>
          </div>
          <div className="space-x-2 md:space-x-3 rtl:space-x-reverse">
            <Link href="/docs/introduction">
              <Button className="h-9 px-4 text-sm font-medium lg:h-10 lg:px-6 lg:text-sm">
                {t("getStarted")}
              </Button>
            </Link>
            <Link href={"/ui-blocks"}>
              <Button variant={"ghost"} className="h-9 px-4 text-sm font-medium lg:h-10 lg:px-6 lg:text-sm">
                {t("browseBlocks")}
              </Button>
            </Link>
          </div>
        </section>
        <div>
          <PageNav className="hidden md:flex mt-2">
            <ExamplesNav className="[&>a:first-child]:text-primary flex-1 overflow-hidden" />
            {/* <ThemeSelector className="mr-4 hidden md:flex" /> */}
          </PageNav>
          <section className="border-border/50 -mx-4 overflow-hidden rounded-lg md:hidden px-2">
            <Image
              src="/block-mokeup/dashboard-3-light.png"
              width={1200}
              height={875}
              alt="Dashboard"
              className="block dark:hidden"
              priority
            />
            <Image
              src="/block-mokeup/dashboard-3-dark.png"
              width={1200}
              height={875}
              alt="Dashboard"
              className="hidden dark:block"
              priority
            />
          </section>
          <section className="hidden md:block mt-4">
            <RootComponents />
          </section>
        </div>
      </Container>
    </div >
  )
}

export default Home
