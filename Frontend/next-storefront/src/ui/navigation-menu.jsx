import React, { forwardRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "lucide-react";

const NavigationMenu = forwardRef((props, ref) => {
  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className="relative z-10 flex max-w-max flex-1 items-center justify-center"
      {...props}
    >
      {props.children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  );
});

const NavigationMenuList = forwardRef((props, ref) => {
  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      className="group flex flex-1 list-none items-center justify-center space-x-1"
      {...props}
    />
  );
});

const NavigationMenuTrigger = forwardRef((props, ref) => {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
      {...props}
    >
      {props.children}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
});

const NavigationMenuContent = forwardRef((props, ref) => {
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className="left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto"
      {...props}
    />
  );
});

const NavigationMenuViewport = forwardRef((props, ref) => {
  return (
    <div className="absolute left-0 top-full flex justify-center">
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className="origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]"
        {...props}
      />
    </div>
  );
});

const NavigationMenuIndicator = forwardRef((props, ref) => {
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className="top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in"
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
});

const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuLink = NavigationMenuPrimitive.Link;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  NavigationMenuLink,
};
