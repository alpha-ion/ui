import * as React from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends React.ComponentProps<"textarea"> {
  isRTL?: boolean;
}

if (typeof document !== 'undefined') {
  const styleId = 'rtl-textarea-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      textarea[dir="rtl"]::placeholder,
      textarea[dir="rtl"]::-webkit-input-placeholder,
      textarea[dir="rtl"]::-moz-placeholder,
      textarea[dir="rtl"]:-ms-input-placeholder {
        text-align: right !important;
        direction: rtl !important;
      }
      textarea[dir="ltr"]::placeholder,
      textarea[dir="ltr"]::-webkit-input-placeholder,
      textarea[dir="ltr"]::-moz-placeholder,
      textarea[dir="ltr"]:-ms-input-placeholder {
        text-align: left !important;
        direction: ltr !important;
      }
    `;
    document.head.appendChild(style);
  }
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isRTL = false, placeholder, ...props }, ref) => {
    const detectRTL = placeholder ? /[\u0600-\u06FF]/.test(placeholder) : isRTL;

    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        dir={detectRTL ? "rtl" : "ltr"}
        placeholder={placeholder}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2",
          "text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          detectRTL ? "text-right" : "text-left",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }