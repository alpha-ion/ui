"use client";

import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import gsap from "gsap";
import * as React from "react";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: "sm" | "md" | "lg";
  label?: string;
  tooltip?: string;
}

const sizeVariants = {
  sm: {
    track: "h-7 w-11",
    thumb: { width: 20, height: 20 },
    expandedWidth: 24,
    padding: 2,
    fontSize: "text-sm",
    offsetX: 3,
  },
  md: {
    track: "h-8 w-[3.25rem]",
    thumb: { width: 24, height: 24 },
    expandedWidth: 28,
    padding: 3,
    fontSize: "text-base",
    offsetX: 3,
  },
  lg: {
    track: "h-10 w-16",
    thumb: { width: 28, height: 28 },
    expandedWidth: 32,
    padding: 3,
    fontSize: "text-lg",
    offsetX: 3,
  },
};

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ size = "md", label, tooltip, className, ...props }, ref) => {
  const thumbRef = React.useRef<HTMLSpanElement>(null);
  const trackRef = React.useRef<HTMLSpanElement>(null);
  const id = React.useId();
  const [showTooltip, setShowTooltip] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = React.useRef(false);
  const [internalChecked, setInternalChecked] = React.useState(
    props.defaultChecked || false
  );

  const config = sizeVariants[size];
  const isControlled = props.checked !== undefined;
  const isChecked = isControlled ? props.checked : internalChecked;

  React.useEffect(() => {
    if (!thumbRef.current || !trackRef.current) return;

    const thumb = thumbRef.current;
    const track = trackRef.current;

    if (!isInitializedRef.current) {
      const trackWidth = track.offsetWidth;
      const thumbWidth = config.thumb.width;
      const maxX = trackWidth - thumbWidth - config.padding * 2;

      // Initial setup without animation
      gsap.set(thumb, {
        x: isChecked ? maxX : config.offsetX,
        width: config.thumb.width,
        height: config.thumb.height,
      });

      gsap.set(track, {
        backgroundColor: isChecked ? "rgb(0, 0, 0)" : "rgb(209, 213, 219)",
      });

      isInitializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (!isInitializedRef.current || !thumbRef.current || !trackRef.current)
      return;

    const thumb = thumbRef.current;
    const track = trackRef.current;
    const trackWidth = track.offsetWidth;
    const thumbWidth = config.thumb.width;
    const maxX = trackWidth - thumbWidth - config.padding * 2;
    const tl = gsap.timeline();
    tl.to(thumb, {
      width: config.expandedWidth,
      transformOrigin: isChecked ? "right" : "left",
      duration: 0.3,
      ease: "power2.out",
    });

    tl.to(
      thumb,
      {
        x: isChecked ? maxX : config.offsetX,
        duration: 0.25,
        ease: "power2.inOut",
      },
      "-=0.05"
    );
    tl.to(
      track,
      {
        backgroundColor: isChecked ? "rgb(0, 0, 0)" : "rgb(209, 213, 219)",
        duration: 0.3,
        ease: "power2.inOut",
      },
      "-=0.25"
    );

    tl.to(
      thumb,
      {
        width: config.thumb.width,
        transformOrigin: isChecked ? "left" : "right",
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.25"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const handleCheckedChange = (checked: boolean) => {
    if (!isControlled) {
      setInternalChecked(checked);
    }
    props.onCheckedChange?.(checked);
  };

  const handleMouseEnter = () => {
    if (!tooltip || props.disabled) return;
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 500);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowTooltip(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const SwitchComponent = (
    <SwitchPrimitive.Root
      ref={ref}
      id={id}
      checked={isChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "relative inline-flex items-center rounded-full",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
        "dark:focus-visible:ring-white",
        "transition-opacity duration-200",
        config.track,
        props.disabled
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:opacity-90",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      value={props.value}
    >
      <span
        ref={trackRef}
        className="absolute inset-0 rounded-full border border-black/5 shadow-inner dark:border-white/5"
        style={{
          backgroundColor: isChecked ? "rgb(0, 0, 0)" : "rgb(209, 213, 219)",
          padding: `${config.padding}px`,
          willChange: "transform, background-color",
        }}
      />
      <span
        ref={thumbRef}
        className="relative block rounded-full bg-white shadow-lg border border-transparent dark:bg-black dark:border-white/10 pointer-events-none"
        style={{
          width: config.thumb.width,
          height: config.thumb.height,
          touchAction: "none",
          willChange: "transform, width",
        }}
      />
    </SwitchPrimitive.Root>
  );

  return (
    <div className="inline-flex items-center gap-3">
      <TooltipProvider>
        {tooltip ? (
          <Tooltip open={showTooltip} onOpenChange={setShowTooltip}>
            <TooltipTrigger asChild>{SwitchComponent}</TooltipTrigger>
            <TooltipContent
              side="top"
              align="center"
              className="bg-gray-900 text-white text-xs py-1 px-2 rounded-md shadow-lg dark:bg-gray-100 dark:text-black"
            >
              {tooltip}
            </TooltipContent>
          </Tooltip>
        ) : (
          SwitchComponent
        )}
      </TooltipProvider>
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            "font-medium text-gray-700 dark:text-gray-300 select-none",
            config.fontSize,
            props.disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
          )}
        >
          {label}
        </Label>
      )}
    </div>
  );
});

Switch.displayName = "Switch";