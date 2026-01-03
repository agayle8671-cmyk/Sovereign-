import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <SignUp
            appearance={{
                elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none w-full",
                    headerTitle: "text-2xl font-semibold text-white",
                    headerSubtitle: "text-neutral-400",
                    formButtonPrimary:
                        "bg-brand-500 hover:bg-brand-600 text-white border-0 h-11 text-base font-medium",
                    formFieldInput:
                        "bg-neutral-800 border-neutral-700 text-white h-11 rounded-lg",
                    formFieldLabel: "text-neutral-300 font-medium",
                    footerActionLink: "text-brand-500 hover:text-brand-400 font-medium",
                    identityPreviewText: "text-neutral-300",
                    identityPreviewEditButton: "text-brand-500",
                    formFieldAction: "text-brand-500",
                    dividerLine: "bg-neutral-700",
                    dividerText: "text-neutral-400",
                    socialButtonsBlockButton:
                        "bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-750 h-11",
                    socialButtonsBlockButtonText: "font-medium",
                },
            }}
            path="/signup"
            routing="path"
            signInUrl="/login"
            forceRedirectUrl="/dashboard"
        />
    );
}
