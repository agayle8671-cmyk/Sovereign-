import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const f = createUploadthing();

async function authMiddleware() {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
        throw new Error("Unauthorized");
    }

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });

    if (!user) {
        throw new Error("User not found");
    }

    return { userId: user.id, clerkId };
}

export const uploadRouter = {
    // Contract documents
    contractDocument: f({
        pdf: { maxFileSize: "16MB", maxFileCount: 1 },
        "application/msword": { maxFileSize: "16MB", maxFileCount: 1 },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
            maxFileSize: "16MB",
            maxFileCount: 1,
        },
    })
        .middleware(authMiddleware)
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Contract uploaded:", file.url);
            return { uploadedBy: metadata.userId, url: file.url };
        }),

    // Portfolio images
    portfolioImage: f({
        image: { maxFileSize: "8MB", maxFileCount: 10 },
    })
        .middleware(authMiddleware)
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Portfolio image uploaded:", file.url);
            return { uploadedBy: metadata.userId, url: file.url };
        }),

    // Testimonial videos
    testimonialVideo: f({
        video: { maxFileSize: "64MB", maxFileCount: 1 },
    })
        .middleware(authMiddleware)
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Testimonial video uploaded:", file.url);
            return { uploadedBy: metadata.userId, url: file.url };
        }),

    // Avatar/profile images
    avatar: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    })
        .middleware(authMiddleware)
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Avatar uploaded:", file.url);
            return { uploadedBy: metadata.userId, url: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
