
import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: "a";
  href?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  isLoading = false,
  loadingText,
  className,
  leftIcon,
  rightIcon,
  fullWidth = false,
  as,
  href,
  target,
  rel,
  ...props
}) => {
  const buttonContent = (
    <>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
      {isLoading && loadingText ? loadingText : children}
      {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </>
  );

  const buttonClassName = cn(
    "relative flex items-center justify-center gap-2 transition-all",
    fullWidth && "w-full",
    className
  );

  // Handle <a> tag rendering
  if (as === "a" && href) {
    return (
      <ShadcnButton
        variant={variant}
        size={size}
        className={buttonClassName}
        asChild
        {...props}
      >
        <a href={href} target={target} rel={rel}>
          {buttonContent}
        </a>
      </ShadcnButton>
    );
  }

  return (
    <ShadcnButton
      variant={variant}
      size={size}
      className={buttonClassName}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {buttonContent}
    </ShadcnButton>
  );
};

export default Button;
