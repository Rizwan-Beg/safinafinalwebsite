import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const Separator = React.forwardRef((props, ref) => {
  const {
    className = "",
    orientation = "horizontal",
    decorative = true,
    ...rest
  } = props;

  const baseClass = "shrink-0 bg-border";
  const orientationClass =
    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]";
  const finalClass = `${baseClass} ${orientationClass} ${className}`;

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={finalClass}
      {...rest}
    />
  );
});

Separator.displayName = "Separator";

export { Separator };
