import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

type TypographyProps = {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  text: string;
  className?: string;
} & HTMLAttributes<HTMLElement>;

const classNames = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-16 text-3xl font-bold tracking-tight lg:text-4xl",
  h3: "scroll-m-12 text-2xl font-semibold tracking-tight lg:text-3xl",
  h4: "scroll-m-10 text-xl font-medium tracking-tight lg:text-2xl",
  h5: "scroll-m-8 text-lg font-normal tracking-tight lg:text-xl",
  h6: "scroll-m-6 text-base font-normal tracking-tight lg:text-lg",
  p: "scroll-m-4 text-base font-normal tracking-tight lg:text-base",
};

export const Typography: FC<TypographyProps> = ({ variant, text, className, ...props }) => {
  const Tag = variant;
  const defaultClassNames = classNames[variant];
  const combinedClassNames = cn(defaultClassNames, className);

  return (
    <Tag className={combinedClassNames} {...props}>
      {text}
    </Tag>
  );
};
