"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {
    FileText,
    Users,
    Briefcase,
    Plus,
    Settings,
    LayoutDashboard,
    Hammer,
    Sparkles,
} from "lucide-react";
import { useCommandMenu } from "@/hooks/use-command-menu";

export function CommandMenu() {
    const router = useRouter();
    const { open, setOpen } = useCommandMenu();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, setOpen]);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Quick Actions">
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/contracts/new"))}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        <span>New Contract</span>
                        <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/clients/new"))}
                    >
                        <Users className="mr-2 h-4 w-4" />
                        <span>Add Client</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/portfolio/new"))}
                    >
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Add Portfolio Item</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Navigation">
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard"))}
                    >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                        <CommandShortcut>⌘D</CommandShortcut>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/contracts"))}
                    >
                        <FileText className="mr-2 h-4 w-4 text-shield" />
                        <span>Contracts</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/clients"))}
                    >
                        <Users className="mr-2 h-4 w-4 text-radar" />
                        <span>Clients</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/portfolio"))}
                    >
                        <Briefcase className="mr-2 h-4 w-4 text-magnet" />
                        <span>Portfolio</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/products"))}
                    >
                        <Hammer className="mr-2 h-4 w-4 text-forge" />
                        <span>Products</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="AI Actions">
                    <CommandItem onSelect={() => runCommand(() => { })}>
                        <Sparkles className="mr-2 h-4 w-4 text-brand-500" />
                        <span>Ask Sovereign...</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Settings">
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/dashboard/settings"))}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <CommandShortcut>⌘,</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
