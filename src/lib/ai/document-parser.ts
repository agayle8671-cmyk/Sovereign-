// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse.js";
import mammoth from "mammoth";

export async function parseDocument(
    buffer: Buffer,
    mimeType: string
): Promise<string> {
    switch (mimeType) {
        case "application/pdf":
            return parsePDF(buffer);

        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return parseWord(buffer);

        case "text/plain":
            return buffer.toString("utf-8");

        default:
            throw new Error(`Unsupported file type: ${mimeType}`);
    }
}

async function parsePDF(buffer: Buffer): Promise<string> {
    try {
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error("PDF parsing error:", error);
        throw new Error("Failed to parse PDF. Please ensure it's a valid PDF file.");
    }
}

async function parseWord(buffer: Buffer): Promise<string> {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } catch (error) {
        console.error("Word parsing error:", error);
        throw new Error("Failed to parse Word document.");
    }
}
