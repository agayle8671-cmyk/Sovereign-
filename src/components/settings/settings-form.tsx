"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserAvatar } from "@/components/ui/avatar";
import {
    User,
    Shield,
    Bell,
    CreditCard,
    Palette,
    Loader2,
    Save,
} from "lucide-react";
import { toast } from "sonner";

interface SettingsFormProps {
    user: {
        id: string;
        name: string | null;
        email: string;
        avatarUrl: string | null;
        timezone: string | null;
        subscriptionTier: string | null;
    };
    vault: {
        id: string;
        settings: any;
        aiPreferences: any;
        defaultRates: any;
    } | null;
}

export function SettingsForm({ user, vault }: SettingsFormProps) {
    const { user: clerkUser } = useUser();
    const [isSaving, setIsSaving] = useState(false);

    // Profile settings
    const [name, setName] = useState(user.name || "");
    const [timezone, setTimezone] = useState(user.timezone || "UTC");

    // Vault settings
    const [defaultCurrency, setDefaultCurrency] = useState(
        vault?.settings?.defaultCurrency || "USD"
    );
    const [defaultPaymentTerms, setDefaultPaymentTerms] = useState(
        vault?.settings?.defaultPaymentTerms || "NET_30"
    );
    const [hourlyRate, setHourlyRate] = useState(
        vault?.defaultRates?.hourlyRate?.toString() || ""
    );
    const [scopeCreepSensitivity, setScopeCreepSensitivity] = useState(
        vault?.settings?.scopeCreepSensitivity || "medium"
    );

    // Notification settings
    const [emailNotifications, setEmailNotifications] = useState(
        vault?.settings?.notificationPreferences?.email ?? true
    );
    const [pushNotifications, setPushNotifications] = useState(
        vault?.settings?.notificationPreferences?.push ?? true
    );

    // AI settings
    const [aiTone, setAiTone] = useState(
        vault?.aiPreferences?.preferredTone || "professional"
    );
    const [autoNegotiate, setAutoNegotiate] = useState(
        vault?.aiPreferences?.autoNegotiate ?? false
    );

    const handleSave = async () => {
        setIsSaving(true);

        try {
            const response = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    timezone,
                    settings: {
                        defaultCurrency,
                        defaultPaymentTerms,
                        scopeCreepSensitivity,
                        notificationPreferences: {
                            email: emailNotifications,
                            push: pushNotifications,
                        },
                    },
                    aiPreferences: {
                        preferredTone: aiTone,
                        autoNegotiate,
                    },
                    defaultRates: {
                        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
                    },
                }),
            });

            if (!response.ok) throw new Error("Failed to save settings");

            toast.success("Settings saved successfully");
        } catch (error) {
            toast.error("Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
                <TabsTrigger value="profile">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                </TabsTrigger>
                <TabsTrigger value="business">
                    <Shield className="w-4 h-4 mr-2" />
                    Business
                </TabsTrigger>
                <TabsTrigger value="notifications">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                </TabsTrigger>
                <TabsTrigger value="ai">
                    <Palette className="w-4 h-4 mr-2" />
                    AI Preferences
                </TabsTrigger>
                <TabsTrigger value="billing">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Billing
                </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <UserAvatar
                                user={{ name: user.name, avatarUrl: user.avatarUrl }}
                                size="xl"
                            />
                            <div>
                                <Button
                                    variant="outline"
                                    onClick={() => clerkUser?.setProfileImage({ file: null })}
                                >
                                    Change Avatar
                                </Button>
                                <p className="text-sm text-neutral-500 mt-2">
                                    Managed through your Clerk account
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={user.email} disabled />
                                <p className="text-xs text-neutral-500">
                                    Managed through Clerk
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select value={timezone} onValueChange={setTimezone}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UTC">UTC</SelectItem>
                                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                                    <SelectItem value="Europe/London">London</SelectItem>
                                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Business Tab */}
            <TabsContent value="business">
                <Card>
                    <CardHeader>
                        <CardTitle>Business Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Default Currency</Label>
                                <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USD">USD ($)</SelectItem>
                                        <SelectItem value="EUR">EUR (€)</SelectItem>
                                        <SelectItem value="GBP">GBP (£)</SelectItem>
                                        <SelectItem value="CAD">CAD ($)</SelectItem>
                                        <SelectItem value="AUD">AUD ($)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Default Payment Terms</Label>
                                <Select
                                    value={defaultPaymentTerms}
                                    onValueChange={setDefaultPaymentTerms}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NET_15">Net 15</SelectItem>
                                        <SelectItem value="NET_30">Net 30</SelectItem>
                                        <SelectItem value="NET_45">Net 45</SelectItem>
                                        <SelectItem value="NET_60">Net 60</SelectItem>
                                        <SelectItem value="ON_COMPLETION">On Completion</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hourlyRate">Default Hourly Rate</Label>
                            <div className="relative max-w-xs">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                    $
                                </span>
                                <Input
                                    id="hourlyRate"
                                    type="number"
                                    value={hourlyRate}
                                    onChange={(e) => setHourlyRate(e.target.value)}
                                    className="pl-7"
                                    placeholder="150"
                                />
                            </div>
                            <p className="text-sm text-neutral-500">
                                Used for scope creep cost estimates
                            </p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h4 className="font-medium text-neutral-100">
                                Shield Core Settings
                            </h4>

                            <div className="space-y-2">
                                <Label>Scope Creep Detection Sensitivity</Label>
                                <Select
                                    value={scopeCreepSensitivity}
                                    onValueChange={setScopeCreepSensitivity}
                                >
                                    <SelectTrigger className="max-w-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">
                                            Low - Only flag obvious requests
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Medium - Balanced detection
                                        </SelectItem>
                                        <SelectItem value="high">
                                            High - Flag anything uncertain
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
                <Card>
                    <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-neutral-100">
                                    Email Notifications
                                </p>
                                <p className="text-sm text-neutral-400">
                                    Receive updates about contracts and client activity
                                </p>
                            </div>
                            <Switch
                                checked={emailNotifications}
                                onCheckedChange={setEmailNotifications}
                            />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-neutral-100">
                                    Push Notifications
                                </p>
                                <p className="text-sm text-neutral-400">
                                    Browser notifications for real-time alerts
                                </p>
                            </div>
                            <Switch
                                checked={pushNotifications}
                                onCheckedChange={setPushNotifications}
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* AI Tab */}
            <TabsContent value="ai">
                <Card>
                    <CardHeader>
                        <CardTitle>AI Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Communication Tone</Label>
                            <Select value={aiTone} onValueChange={setAiTone}>
                                <SelectTrigger className="max-w-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="professional">Professional</SelectItem>
                                    <SelectItem value="friendly">Friendly</SelectItem>
                                    <SelectItem value="casual">Casual</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-neutral-500">
                                How Sovereign writes emails and messages on your behalf
                            </p>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-neutral-100">
                                    Auto-Generate Negotiation Drafts
                                </p>
                                <p className="text-sm text-neutral-400">
                                    Automatically create counter-proposals for risky contracts
                                </p>
                            </div>
                            <Switch
                                checked={autoNegotiate}
                                onCheckedChange={setAutoNegotiate}
                            />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
                <Card>
                    <CardHeader>
                        <CardTitle>Billing & Subscription</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 rounded-lg bg-brand-500/10 border border-brand-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-neutral-100">
                                        Current Plan:{" "}
                                        <span className="text-brand-400">
                                            {user.subscriptionTier?.toUpperCase() || "FREE"}
                                        </span>
                                    </p>
                                    <p className="text-sm text-neutral-400 mt-1">
                                        {user.subscriptionTier === "free"
                                            ? "5 contract scans per month"
                                            : "Unlimited access to all features"}
                                    </p>
                                </div>
                                <Button variant="outline">
                                    {user.subscriptionTier === "free"
                                        ? "Upgrade to Pro"
                                        : "Manage Subscription"}
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h4 className="font-medium text-neutral-100 mb-4">
                                Payment Method
                            </h4>
                            <Button variant="outline">
                                <CreditCard className="w-4 h-4 mr-2" />
                                Add Payment Method
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Changes
                </Button>
            </div>
        </Tabs>
    );
}
