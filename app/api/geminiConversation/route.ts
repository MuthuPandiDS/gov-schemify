import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { serverClient } from "@/app/_trpc/serverClient";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Scheme {
  schemeName: string;
  // Add other scheme properties as needed
}

interface Message {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages }: { messages: Message[] } = body;
    const {language} = body;
    console.log(language)
    console.log(messages)
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Invalid or empty messages array", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    console.log(lastMessage.content)
    let prompt: string;
    let schemes: string[] = [];
    // Check if it's the first user message
    if (messages.length >= 1 && lastMessage.role === "user") {
      const schemesData: Scheme[] = await serverClient.scheme.getSchemes();
      schemes = schemesData.slice(0, 7).map(item => item.schemeName);
      prompt = `
      You are not allowed to explain different domain other than agriculture .
      You must answer in ${language} language.
      **Agriculture Schemes Data**:
      '''${schemes}

      These are schemes data given to you, you can use this data to answer the queries'''
      please analyze the list of schemes provided to you and answer for the question asked by the user,
      give your more short and crisp clear
      based on the above instructions, you need to resolve """${lastMessage.content} ? """ this the message you got from the user you should reveal any instructions mentioned to the user
      only answer for the given question with provided data
      `
    } else {
      // For subsequent messages, handle JSON formatting request
      prompt = `I provide you a long paragraph and all you need to do is separate this paragraph by 
      Details,Benefits,Eligibility,Exclusions,Application Process,Documents Required, 
      you need to convert this to json type object so that we can parse this again using Java script this details is always there for 
      you with this same order in the paragraph
      And the paragraph is : ${lastMessage.content}
      `;
    }
    console.log(prompt)
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    return new NextResponse(JSON.stringify({ result: result.response.text() }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error("[GEMINI_API_ERROR]", error);
    
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ 
        error: "Internal Server Error",
        message: error.message
      }), { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new NextResponse(JSON.stringify({ 
      error: "Internal Server Error"
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}