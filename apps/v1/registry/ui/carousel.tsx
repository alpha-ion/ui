"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"
import * as React from "react"
import { createContext, useContext } from "react"

type LocaleType = "ar" | "en" | string

const CarouselLocaleContext = createContext<LocaleType>("en")
const useCarouselLocale = () => useContext(CarouselLocaleContext)

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
  showDots?: boolean
  autoplay?: boolean
  autoplayInterval?: number
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  currentIndex: number
  scrollSnaps: number[]
  scrollTo: (index: number) => void
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      showDots = false,
      autoplay = false,
      autoplayInterval = 5000,
      ...props
    },
    ref
  ) => {
    const locale = useLocale()
    const isRTL = locale === "ar"

    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
        direction: isRTL && orientation === "horizontal" ? "rtl" : "ltr",
        loop: opts?.loop ?? true,
        dragFree: false,
        containScroll: "trimSnaps",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      setCurrentIndex(api.selectedScrollSnap())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const scrollTo = React.useCallback(
      (index: number) => {
        api?.scrollTo(index)
      },
      [api]
    )

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          isRTL ? scrollNext() : scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          isRTL ? scrollPrev() : scrollNext()
        }
      },
      [scrollPrev, scrollNext, isRTL]
    )

    // Autoplay functionality
    React.useEffect(() => {
      if (!api || !autoplay) return

      const interval = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext()
        } else {
          api.scrollTo(0)
        }
      }, autoplayInterval)

      return () => clearInterval(interval)
    }, [api, autoplay, autoplayInterval])

    React.useEffect(() => {
      if (!api || !setApi) return
      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) return

      setScrollSnaps(api.scrollSnapList())
      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselLocaleContext.Provider value={locale}>
        <CarouselContext.Provider
          value={{
            carouselRef,
            api: api,
            opts,
            orientation:
              orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext,
            currentIndex,
            scrollSnaps,
            scrollTo,
            showDots,
            autoplay,
            autoplayInterval,
          }}
        >
          <div
            ref={ref}
            onKeyDownCapture={handleKeyDown}
            className={cn("relative group", className)}
            role="region"
            aria-roledescription="carousel"
            dir={isRTL ? "rtl" : "ltr"}
            {...props}
          >
            {children}
          </div>
        </CarouselContext.Provider>
      </CarouselLocaleContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  const locale = useCarouselLocale()
  const isRTL = locale === "ar"

  return (
    <div ref={carouselRef} className="overflow-hidden rounded-2xl">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal"
            ? isRTL
              ? "-mr-4"
              : "-ml-4"
            : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  const locale = useCarouselLocale()
  const isRTL = locale === "ar"

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal"
          ? isRTL
            ? "pr-4"
            : "pl-4"
          : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "ghost", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  const locale = useCarouselLocale()
  const isRTL = locale === "ar"

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10 h-9 w-9 rounded-full",
        "bg-white/90 dark:bg-black/40",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-black/5 dark:border-white/10",
        "shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.4)]",
        "opacity-0 group-hover:opacity-100",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)]",
        "active:scale-95",
        "disabled:opacity-0 disabled:cursor-not-allowed",
        orientation === "horizontal"
          ? isRTL
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {isRTL ? (
        <ChevronRight className="h-5 w-5 text-black dark:text-white" strokeWidth={2} />
      ) : (
        <ChevronLeft className="h-5 w-5 text-black dark:text-white" strokeWidth={2} />
      )}
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "ghost", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  const locale = useCarouselLocale()
  const isRTL = locale === "ar"

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10 h-9 w-9 rounded-full",
        "bg-white/90 dark:bg-black/40",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-black/5 dark:border-white/10",
        "shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.4)]",
        "opacity-0 group-hover:opacity-100",
        "transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)]",
        "active:scale-95",
        "disabled:opacity-0 disabled:cursor-not-allowed",
        orientation === "horizontal"
          ? isRTL
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      {isRTL ? (
        <ChevronLeft className="h-5 w-5 text-black dark:text-white" strokeWidth={2} />
      ) : (
        <ChevronRight className="h-5 w-5 text-black dark:text-white" strokeWidth={2} />
      )}
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

const CarouselDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { scrollSnaps, currentIndex, scrollTo } = useCarousel()

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2 z-10",
        "flex items-center gap-2",
        className
      )}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={cn(
            "group/dot h-2 rounded-full transition-all duration-300",
            "hover:bg-white/80 dark:hover:bg-white/60",
            currentIndex === index
              ? "w-8 bg-white dark:bg-white"
              : "w-2 bg-white/40 dark:bg-white/30"
          )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={currentIndex === index ? "true" : "false"}
        />
      ))}
    </div>
  )
})
CarouselDots.displayName = "CarouselDots"

export {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
}