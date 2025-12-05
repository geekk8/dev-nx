import React from "react";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

// className 병합 유틸리티
function mergeClassNames(parent?: string, child?: string): string | undefined {
  if (!parent && !child) return undefined;
  if (!parent) return child;
  if (!child) return parent;
  return `${parent} ${child}`;
}

// 이벤트 핸들러 체이닝 유틸리티
function composeEventHandlers<E>(
  parentHandler?: (event: E) => void,
  childHandler?: (event: E) => void
) {
  return (event: E) => {
    parentHandler?.(event);
    childHandler?.(event);
  };
}

// Ref 병합 유틸리티
function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else if (typeof ref === "object" && ref !== null) {
        (ref as { current: T }).current = node;
      }
    });
  };
}

const Slot = React.forwardRef<any, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    // children 검증
    if (!React.isValidElement(children)) {
      return children as any;
    }

    const childrenProps = children.props as any;

    // Props 병합
    const mergedProps: any = {
      ...childrenProps,
      ...slotProps,
    };

    // className 병합
    if (slotProps.className || childrenProps.className) {
      mergedProps.className = mergeClassNames(
        slotProps.className,
        childrenProps.className
      );
    }

    // style 병합
    if (slotProps.style || childrenProps.style) {
      mergedProps.style = {
        ...childrenProps.style,
        ...slotProps.style,
      };
    }

    // 이벤트 핸들러 체이닝
    const eventHandlers = [
      "onClick",
      "onMouseDown",
      "onMouseUp",
      "onMouseEnter",
      "onMouseLeave",
      "onFocus",
      "onBlur",
      "onKeyDown",
      "onKeyUp",
    ];

    eventHandlers.forEach((handler) => {
      const parentHandler = slotProps[handler as keyof typeof slotProps];
      const childHandler = childrenProps[handler];

      if (parentHandler || childHandler) {
        mergedProps[handler] = composeEventHandlers(
          parentHandler as any,
          childHandler as any
        );
      }
    });

    // Ref 병합
    if (forwardedRef || childrenProps.ref) {
      mergedProps.ref = composeRefs(forwardedRef, childrenProps.ref);
    }

    // cloneElement로 새로운 element 반환
    return React.cloneElement(children, mergedProps);
  }
);

Slot.displayName = "Slot";

export default Slot;
