"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Progress } from "./progress";
import {
    Upload,
    FileText,
    Image as ImageIcon,
    Video,
    X,
    Loader2,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface FileUploadProps {
    endpoint: keyof OurFileRouter;
    onUploadComplete: (url: string) => void;
    onUploadError?: (error: Error) => void;
    accept?: Record<string, string[]>;
    maxSize?: number;
    className?: string;
    children?: React.ReactNode;
}

export function FileUpload({
    endpoint,
    onUploadComplete,
    onUploadError,
    accept,
    maxSize = 10 * 1024 * 1024,
    className,
    children,
}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { startUpload } = useUploadThing(endpoint, {
        onUploadProgress: (p) => setProgress(p),
        onClientUploadComplete: (res) => {
            setUploading(false);
            setSuccess(true);
            if (res?.[0]?.url) {
                onUploadComplete(res[0].url);
            }
        },
        onUploadError: (err) => {
            setUploading(false);
            setError(err.message);
            onUploadError?.(err);
        },
    });

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            setFile(file);
            setError(null);
            setSuccess(false);
            setUploading(true);
            setProgress(0);

            await startUpload([file]);
        },
        [startUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        maxFiles: 1,
        disabled: uploading,
    });

    const removeFile = () => {
        setFile(null);
        setError(null);
        setSuccess(false);
        setProgress(0);
    };

    const getIcon = () => {
        if (!file) return <Upload className="w-10 h-10 text-neutral-500" />;
        if (file.type.startsWith("image/"))
            return <ImageIcon className="w-10 h-10 text-neutral-500" />;
        if (file.type.startsWith("video/"))
            return <Video className="w-10 h-10 text-neutral-500" />;
        return <FileText className="w-10 h-10 text-neutral-500" />;
    };

    return (
        <div className={className}>
            <div
                {...getRootProps()}
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                    isDragActive
                        ? "border-brand-500 bg-brand-500/5"
                        : "border-neutral-700 hover:border-neutral-600",
                    uploading && "pointer-events-none opacity-70",
                    error && "border-danger/50",
                    success && "border-success/50"
                )}
            >
                <input {...getInputProps()} />

                {file ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4">
                            {getIcon()}
                            <div className="text-left">
                                <p className="font-medium text-neutral-100 truncate max-w-xs">
                                    {file.name}
                                </p>
                                <p className="text-sm text-neutral-400">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            {!uploading && !success && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile();
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>

                        {uploading && (
                            <div className="space-y-2">
                                <Progress value={progress} />
                                <p className="text-sm text-neutral-400 flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Uploading... {progress}%
                                </p>
                            </div>
                        )}

                        {success && (
                            <p className="text-sm text-success flex items-center justify-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Upload complete!
                            </p>
                        )}

                        {error && (
                            <p className="text-sm text-danger flex items-center justify-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </p>
                        )}
                    </div>
                ) : (
                    children || (
                        <>
                            {getIcon()}
                            <p className="mt-4 text-neutral-300">
                                {isDragActive
                                    ? "Drop your file here..."
                                    : "Drag & drop a file, or click to browse"}
                            </p>
                            <p className="text-sm text-neutral-500 mt-1">
                                Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
                            </p>
                        </>
                    )
                )}
            </div>
        </div>
    );
}
