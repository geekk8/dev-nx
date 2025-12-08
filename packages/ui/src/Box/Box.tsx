import React from "react";
import Slot from "../Slot/Slot";

// ============================================
// Polymorphic 타입 유틸리티
// ============================================

// 1. as prop 타입
type AsProp<C extends React.ElementType> = {
  as?: C;
};

// 2. 중복 제거할 키 타입
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// 3. Polymorphic Props (ref 제외)
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// 4. Ref 타입
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

// 5. Props + Ref 결합
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// ============================================
// Box Props
// ============================================
type BoxProps<C extends React.ElementType = "div"> =
  PolymorphicComponentPropWithRef<
    C,
    {
      asChild?: boolean;
    }
  >;

// ============================================
// Box Component Type
// ============================================
type BoxComponent = <C extends React.ElementType = "div">(
  props: BoxProps<C>
) => React.ReactElement | null;

// ============================================
// Box Implementation
// ============================================
const BoxInner = <C extends React.ElementType = "div">(
  { as, asChild = false, children, ...props }: BoxProps<C>,
  ref?: PolymorphicRef<C>
) => {
  const Component = as || "div";
  const Comp = asChild ? Slot : Component;

  return (
    <Comp {...props} ref={ref}>
      {children}
    </Comp>
  );
};

// forwardRef는 제네릭 함수와 타입 호환성 문제가 있어서 any를 거쳐야 함
const Box = React.forwardRef(BoxInner as any) as BoxComponent & {
  displayName?: string;
};

Box.displayName = "Box";

export default Box;
export type { BoxProps };
