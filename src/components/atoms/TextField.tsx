
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  fullWidth?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  className,
  leftElement,
  rightElement,
  fullWidth = false,
  ...props
}) => {
  const id = props.id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={cn("space-y-2", fullWidth && "w-full")}>
      {label && (
        <Label htmlFor={id} className={error ? "text-destructive" : ""}>
          {label}
        </Label>
      )}
      
      <div className="relative">
        {leftElement && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftElement}
          </div>
        )}
        
        <Input
          id={id}
          className={cn(
            className,
            error && "border-destructive",
            leftElement && "pl-9",
            rightElement && "pr-9",
            fullWidth && "w-full"
          )}
          {...props}
        />
        
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightElement}
          </div>
        )}
      </div>
      
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default TextField;
