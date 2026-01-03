"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
    Star,
    Video,
    MessageSquare,
    Loader2,
    Play,
    Square,
    RotateCcw,
    Check,
    Sparkles,
} from "lucide-react";

interface TestimonialCaptureProps {
    token: string;
    freelancerName: string;
    freelancerAvatar: string | null;
}

type Step = "choose" | "text" | "video" | "recording" | "preview" | "submitting" | "success";

export function TestimonialCapture({
    token,
    freelancerName,
    freelancerAvatar,
}: TestimonialCaptureProps) {
    const [step, setStep] = useState<Step>("choose");
    const [rating, setRating] = useState(5);
    const [textContent, setTextContent] = useState("");
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: 1280, height: 720 },
                audio: true,
            });

            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: "video/webm;codecs=vp9",
            });

            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "video/webm" });
                setVideoBlob(blob);
                setVideoUrl(URL.createObjectURL(blob));
                setStep("preview");
            };

            mediaRecorder.start();
            setIsRecording(true);
            setStep("recording");
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => {
                    if (prev >= 60) {
                        stopRecording();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Could not access camera. Please check permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        }
    };

    const resetVideo = () => {
        setVideoBlob(null);
        setVideoUrl(null);
        setRecordingTime(0);
        setStep("video");
    };

    const handleSubmit = async () => {
        setStep("submitting");

        try {
            const formData = new FormData();
            formData.append("token", token);
            formData.append("rating", rating.toString());

            if (step === "text" || textContent) {
                formData.append("type", "text");
                formData.append("content", textContent);
            } else if (videoBlob) {
                formData.append("type", "video");
                formData.append("video", videoBlob, "testimonial.webm");
            }

            const response = await fetch("/api/testimonials/submit", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to submit");

            setStep("success");
        } catch (error) {
            console.error("Error submitting:", error);
            alert("Failed to submit testimonial. Please try again.");
            setStep(videoBlob ? "preview" : "text");
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl"
            >
                {/* Header */}
                {step !== "success" && (
                    <div className="text-center mb-8">
                        <UserAvatar
                            user={{ name: freelancerName, avatarUrl: freelancerAvatar }}
                            size="xl"
                            className="mx-auto mb-4"
                        />
                        <h1 className="text-2xl font-semibold text-neutral-100">
                            Share Your Experience
                        </h1>
                        <p className="text-neutral-400 mt-2">
                            {freelancerName} would love to hear about working together
                        </p>
                    </div>
                )}

                {/* Content */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
                    <AnimatePresence mode="wait">
                        {/* Choose Type */}
                        {step === "choose" && (
                            <motion.div
                                key="choose"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <p className="text-neutral-300">
                                        How would you like to share your feedback?
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setStep("text")}
                                        className="p-6 rounded-xl border border-neutral-700 hover:border-magnet hover:bg-magnet/5 transition-all text-center group"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-magnet/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <MessageSquare className="w-7 h-7 text-magnet" />
                                        </div>
                                        <span className="font-medium text-neutral-200 block">
                                            Write a Review
                                        </span>
                                        <span className="text-sm text-neutral-500 mt-1 block">
                                            Takes ~1 minute
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => setStep("video")}
                                        className="p-6 rounded-xl border border-neutral-700 hover:border-brand-500 hover:bg-brand-500/5 transition-all text-center group"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                            <Video className="w-7 h-7 text-brand-500" />
                                        </div>
                                        <span className="font-medium text-neutral-200 block">
                                            Record a Video
                                        </span>
                                        <span className="text-sm text-neutral-500 mt-1 block">
                                            30-60 seconds
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Text Review */}
                        {step === "text" && (
                            <motion.div
                                key="text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-3">
                                        How was your experience?
                                    </label>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="p-1 hover:scale-110 transition-transform"
                                            >
                                                <Star
                                                    className={cn(
                                                        "w-10 h-10 transition-colors",
                                                        star <= rating
                                                            ? "text-yellow-500 fill-current"
                                                            : "text-neutral-600"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                        Share your thoughts
                                    </label>
                                    <Textarea
                                        value={textContent}
                                        onChange={(e) => setTextContent(e.target.value)}
                                        placeholder="What stood out about working together? Any results you'd like to highlight?"
                                        className="h-32 resize-none"
                                    />
                                    <p className="text-xs text-neutral-500 mt-2">
                                        {textContent.length}/500 characters
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="outline" onClick={() => setStep("choose")}>
                                        Back
                                    </Button>
                                    <Button
                                        variant="magnet"
                                        className="flex-1"
                                        onClick={handleSubmit}
                                        disabled={!textContent.trim()}
                                    >
                                        Submit Review
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Video Setup */}
                        {step === "video" && (
                            <motion.div
                                key="video"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                                        <Video className="w-8 h-8 text-brand-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-neutral-100 mb-2">
                                        Record a Video Testimonial
                                    </h3>
                                    <p className="text-neutral-400 text-sm">
                                        Share your experience in 30-60 seconds. Just be yourself!
                                    </p>
                                </div>

                                <div className="bg-neutral-800 rounded-xl p-4">
                                    <h4 className="text-sm font-medium text-neutral-300 mb-2">
                                        Tips for a great testimonial:
                                    </h4>
                                    <ul className="text-sm text-neutral-400 space-y-1">
                                        <li>• Find good lighting (face a window)</li>
                                        <li>• Minimize background noise</li>
                                        <li>• Mention specific results or outcomes</li>
                                        <li>• Be genuine and conversational</li>
                                    </ul>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-3">
                                        Your rating
                                    </label>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="p-1 hover:scale-110 transition-transform"
                                            >
                                                <Star
                                                    className={cn(
                                                        "w-8 h-8 transition-colors",
                                                        star <= rating
                                                            ? "text-yellow-500 fill-current"
                                                            : "text-neutral-600"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="outline" onClick={() => setStep("choose")}>
                                        Back
                                    </Button>
                                    <Button
                                        variant="default"
                                        className="flex-1"
                                        onClick={startRecording}
                                    >
                                        <Video className="w-4 h-4 mr-2" />
                                        Start Recording
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Recording */}
                        {step === "recording" && (
                            <motion.div
                                key="recording"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transform scale-x-[-1]"
                                    />
                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-white text-sm font-medium">
                                            {formatTime(recordingTime)}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 text-white text-sm bg-black/50 px-3 py-1.5 rounded-full">
                                        Max 1:00
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Button
                                        size="lg"
                                        variant="destructive"
                                        onClick={stopRecording}
                                        className="px-8"
                                    >
                                        <Square className="w-5 h-5 mr-2 fill-current" />
                                        Stop Recording
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Preview */}
                        {step === "preview" && videoUrl && (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                                    <video
                                        src={videoUrl}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={resetVideo}>
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Re-record
                                    </Button>
                                    <Button
                                        variant="magnet"
                                        className="flex-1"
                                        onClick={handleSubmit}
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Submit Video
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Submitting */}
                        {step === "submitting" && (
                            <motion.div
                                key="submitting"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="py-12 text-center"
                            >
                                <Loader2 className="w-12 h-12 text-magnet animate-spin mx-auto mb-4" />
                                <p className="text-neutral-300">Submitting your testimonial...</p>
                            </motion.div>
                        )}

                        {/* Success */}
                        {step === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-8 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="w-20 h-20 rounded-full bg-success-muted flex items-center justify-center mx-auto mb-6"
                                >
                                    <Sparkles className="w-10 h-10 text-success" />
                                </motion.div>
                                <h2 className="text-2xl font-semibold text-neutral-100 mb-2">
                                    Thank You! 🎉
                                </h2>
                                <p className="text-neutral-400 max-w-sm mx-auto">
                                    Your testimonial has been submitted successfully. {freelancerName}{" "}
                                    truly appreciates your feedback!
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
