import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Fallback in case no key is provided, so it doesn't crash during build
const apiKey = process.env.GOOGLE_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
    try {
        if (!apiKey) {
            return NextResponse.json(
                { error: "API key not configured." },
                { status: 500 }
            );
        }

        const { messages } = await req.json();
        const prompt = messages[messages.length - 1].content;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You are the Noble Rock AI Concierge. You assist potential clients with information about Noble Rock Private Wealth.
Noble Rock is an Australian wealth management firm headquartered in Sydney (Est. 1987), ASIC Regulated, $4.2B+ AUM, offering fee-only fiduciary advice. Our office is located at Level 42, Governor Phillip Tower, 1 Farrer Place, Sydney NSW 2000.
Core disciplines include Fixed Income, Strategic Equities, Family Office, and Retirement Planning.
Be highly professional, concise, respectful, and adopt an "Old Money" and institutional tone. Use British/Australian spelling. Do not make up facts. If asked something outside your knowledge, gracefully direct them to contact us via the /contact page.`
        });

        const result = await model.generateContentStream(prompt);

        // Create a streaming response
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    // Send formatted chunk that `ai` SDK expects (if using standard protocol, or we can just send raw text)
                    // For simplicity in standard non-SDK implementation, we just send standard text
                    // Actually, we'll respond with standard Vercel AI SDK format if possible, but let's just make it simple custom stream for now.
                    // Since the client will manually read the stream:
                    controller.enqueue(new TextEncoder().encode(chunkText));
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "An error occurred while generating the response." },
            { status: 500 }
        );
    }
}
