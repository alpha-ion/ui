"use client"

import Container from "@/components/Container"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll<HTMLElement>(".animate-element")
    const timelineElements = sectionRef.current.querySelectorAll<HTMLElement>(".animate-timeline")

    elements.forEach((element: HTMLElement) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
            once: true,
          },
        }
      )
    })

    timelineElements.forEach((element: HTMLElement) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_500px]">
          <div className="grid gap-4">
            <div className="space-y-4 animate-element">
              <h2 className="font-bold tracking-tighter text-3xl sm:text-4xl md:text-5xl">
                About Our Company
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At Art Lighting Inc. we are a team of passionate innovators
                dedicated to pushing the boundaries of what&apos;s possible.
                Since our founding in 2010, we&apos;ve been on a mission to
                create cutting-edge products and services that transform the way
                people live and work.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Our Mission", desc: "To revolutionize the tech industry and empower people with innovative solutions." },
                { title: "Our Values", desc: "Integrity, Collaboration, Creativity, and Continuous Improvement." },
                { title: "Our Team", desc: "A diverse group of talented individuals who are passionate about making a difference." },
                { title: "Our Commitment", desc: "To deliver exceptional products and services that exceed our customers' expectations." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-gray-100 dark:bg-neutral-900 rounded-lg p-6 animate-element">
                  <h3 className="text-lg font-semibold text-primary">{title}</h3>
                  <p className="text-muted-foreground mt-2">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-element">
            <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10">
              {[
                "2010 - Founding of Art Lighting Inc.",
                "2010 - Launch of First Product",
                "2012 - Expansion into New Markets",
                "2013 - Breakthrough Innovation",
                "2014 - Local Expansion and Acquisition",
                "2015 - Sustainability Initiatives",
                "2016 - Art Lighting Inc. Goes Public",
                "2016 - Art Lighting Working with Military",
                "2020 - Pandemic Response and Resilience",
                "2023 - Our Factory Completed",
              ].map((event, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-1 text-sm relative animate-timeline"
                >
                  <div className="mt-[3px] aspect-square w-3 bg-primary rounded-full z-10" />
                  <div className="font-medium mt-[-1px]">{event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
