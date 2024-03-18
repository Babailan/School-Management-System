import { cn } from "@/lib/utils";

export function TypographyH3({
  children,
  className,
  ...props
}: JSX.IntrinsicElements["h3"]) {
  return (
    <h3
      {...props}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}
