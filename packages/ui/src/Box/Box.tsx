import React from "react";
import Slot from "../Slot/Slot";

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = "div", asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot {...props} ref={ref}>
          {children}
        </Slot>
      );
    }

    return (
      <Component {...props} ref={ref}>
        {children}
      </Component>
    );
  }
);

Box.displayName = "Box";

export default Box;
export type { BoxProps };
