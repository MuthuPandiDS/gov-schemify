import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
        return NextResponse.json(
            { error: "Invalid request format" },
            { status: 400 }
        );
    }

    try {
        const configuration = new Configuration({
            basePath: 'https://api.deepseek.com/v1', // Added /v1 endpoint
            apiKey: process.env.DEEPSEEK_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model : "openai/gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                ...messages
            ],
        });

        return NextResponse.json({
            result: completion.data.choices[0].message?.content
        });

    } catch (error: any) {
        console.error("Deep Seek API Error:", error.response?.data || error.message);
        return NextResponse.json(
            { 
                error: error.response?.data?.error?.message || "API request failed",
                code: error.response?.data?.error?.code
            },
            { status: error.response?.status || 500 }
        );
    }
}