// server-only guarantees this only runs on the server
import "server-only";
import mammoth from "mammoth";

// Using dynamic import for pdfjs-dist to avoid build issues
export async function parseDocument(
    fileBuffer: Buffer,
    fileType: string
): Promise<string> {
    if (fileType === "application/pdf") {
        // Standard import for Next.js server actions / API routes
        const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

        // Convert Buffer to Uint8Array
        const uint8Array = new Uint8Array(fileBuffer);

        // Load document
        const loadingTask = getDocument({
            data: uint8Array,
            useSystemFonts: true,
            disableFontFace: true,
            verbosity: 0,
        });

        const pdfDocument = await loadingTask.promise;
        let fullText = "";

        // Iterate through pages
        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(" ");
            fullText += pageText + "\n";
        }

        return fullText;
    }

    if (
        fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        return result.value;
    }

    if (fileType === "text/plain") {
        return fileBuffer.toString("utf-8");
    }

    throw new Error(`Unsupported file type: ${fileType}`);
}
