import { MailComponent } from "./components/mail";
import { accounts, mails } from "./data";
import Image from "next/image";
export default function Page() {
  return (
    <>
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
      <main className="h-screen w-full md:block hidden">
        <MailComponent
          accounts={accounts}
          mails={mails}
          defaultLayout={[20, 80]}
          defaultCollapsed={false}
          navCollapsedSize={4}
        />
      </main>
    </>
  )
}
