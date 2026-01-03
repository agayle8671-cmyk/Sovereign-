"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn, getInitials } from "@/lib/utils";

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
        size?: "xs" | "sm" | "default" | "lg" | "xl";
    }
>(({ className, size = "default", ...props }, ref) => {
    const sizeClasses = {
        xs: "h-6 w-6 text-2xs",
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
    };

    return (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full",
                sizeClasses[size],
                className
            )}
            {...props}
        />
    );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
        ref={ref}
        className={cn("aspect-square h-full w-full object-cover", className)}
        {...props}
    />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-neutral-800 font-medium text-neutral-300",
            className
        )}
        {...props}
    />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Convenience component
interface UserAvatarProps {
    user: {
        name?: string | null;
        imageUrl?: string | null;
        avatarUrl?: string | null;
    };
    size?: "xs" | "sm" | "default" | "lg" | "xl";
    className?: string;
}

function UserAvatar({ user, size = "default", className }: UserAvatarProps) {
    return (
        <Avatar size={size} className={className}>
            <AvatarImage
                src={user.imageUrl || user.avatarUrl || undefined}
                alt={user.name || "User"}
            />
            <AvatarFallback>
                {user.name ? getInitials(user.name) : "?"}
            </AvatarFallback>
        </Avatar>
    );
}

export { Avatar, AvatarImage, AvatarFallback, UserAvatar };
