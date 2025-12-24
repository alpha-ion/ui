
import { formatNumber } from "@/lib/utils"
import { Card, CardContent } from "@/registry/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/registry/ui/carousel"
import { useLocale } from "next-intl"

export default function CarouselSpacingDemo() {
    const locale = useLocale()

    return (
        <Carousel className="w-full max-w-sm">
            <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-2xl font-semibold">{formatNumber(index + 1, locale)}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
