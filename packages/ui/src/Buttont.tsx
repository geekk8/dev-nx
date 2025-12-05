import * as React from "react";
import * as styles from "./Button.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClass = {
      default: styles.variantDefault,
      outline: styles.variantOutline,
      ghost: styles.variantGhost,
    }[variant];

    const sizeClass = {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
    }[size];

    const combinedClassName = [
      styles.buttonBase,
      variantClass,
      sizeClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={combinedClassName} {...props} />
    );
  }
);

Button.displayName = "Button";
