import { AspectRatio } from "@/registry/ui/aspect-ratio"
import Image from "next/image"

export default function AspectRatioDemo() {
    return (
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-2xl">
            <Image
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Photo by Drew Beamer"
                fill
                className="h-full w-full rounded-2xl object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </AspectRatio>
    )
}
