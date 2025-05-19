
import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  children: React.ReactNode;
  to: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  external?: boolean;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  to,
  variant = "default",
  size = "default",
  isLoading = false,
  loadingText,
  className,
  leftIcon,
  rightIcon,
  fullWidth = false,
  external = false,
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

  const buttonClasses = cn(
    "relative flex items-center justify-center gap-2 transition-all",
    fullWidth && "w-full",
    className
  );

  if (external) {
    return (
      <ShadcnButton
        variant={variant}
        size={size}
        className={buttonClasses}
        disabled={isLoading}
        asChild
        {...props}
      >
        <a href={to} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      </ShadcnButton>
    );
  }

  return (
    <ShadcnButton
      variant={variant}
      size={size}
      className={buttonClasses}
      disabled={isLoading}
      asChild
      {...props}
    >
      <Link to={to}>
        {buttonContent}
      </Link>
    </ShadcnButton>
  );
};

export default ButtonLink;
