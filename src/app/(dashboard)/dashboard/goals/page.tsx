import { Zap } from "lucide-react";

export default function GoalsPage() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Monthly Goals</h1>
            <p className="text-zinc-500 max-w-md">
                Detailed breakdown of your revenue, client acquisition, and project delivery goals.
                <br />
                <span className="text-sm opacity-50">(Module coming soon)</span>
            </p>
        </div>
    );
}
