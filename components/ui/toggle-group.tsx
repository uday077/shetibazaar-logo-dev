"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "./utils";

const toggleVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
	{
		variants: {
			variant: {
				default: "",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-10 px-3",
				sm: "h-9 px-2.5",
				lg: "h-11 px-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const ToggleGroupContext = React.createContext<{ size?: VariantProps<typeof toggleVariants>["size"] }>(
	{},
);

const ToggleGroup = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(({ className, size, variant, ...props }, ref) => (
	<ToggleGroupPrimitive.Root
		ref={ref}
		className={cn("grid gap-1", className)}
		{...props}
	>
		<ToggleGroupContext.Provider value={{ size }}>
			{props.children}
		</ToggleGroupContext.Provider>
	</ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
		VariantProps<typeof toggleVariants>
>(({ className, size, variant, ...props }, ref) => {
	const context = React.useContext(ToggleGroupContext);
	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={cn(toggleVariants({ variant, size: context.size || size }), className)}
			{...props}
		/>
	);
});
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
