
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';
import { serverClient } from '@/app/_trpc/serverClient';
import type { Schemes } from '@prisma/client';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    console.log("hi");
    const user = await currentUser();
    // const userId = user?.id
    const body = await req.json();
    const { messages } = body;
    // console.log(messages[0])
    // if(!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // console.log(messages)
    // if(!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    if(!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Missing messages", { status: 400 });
    }
    // const fetchres = fetch("givtschem")
    // You are a government schemes query resolver. You must answer only for government schemes.
    var schemes:string[] = [];
    if(messages[0].role == "user"){
      const topSevenSchemes :Schemes[] = await serverClient.scheme.getSchemes();
      schemes = topSevenSchemes.map(item => item.schemeName)
    }
    console.log(schemes)
      const instructionMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: messages[0].role == "user" ? 
      `You are a government schemes query resolver. 
      You must answer only for government schemes related to agriculture and tourism.
       If they ask about recent government schemes, you should provide details only about the schemes I've provided to you.
        If they have any doubts about the provided scheme, you should resolve their query.
         If they ask you to list some schemes, you should list the top 5 schemes in the order I provided to you.
          These are the schemes I provide to you ${schemes}`
        :
        `I provide you a long paragraph and all you need to do is separate this paragraph by 
        Details,Benefits,Eligibility,Exclusions,Application Process,Documents Required, you need to 
        convert this to json type object this details is always there for you with this same oreder 
        in the paragraph`,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });


    return new NextResponse(JSON.stringify(response.data.choices[0].message), { status: 200 });

  } catch (error) {
    console.error("[CONVERSATION_ERROR]",error);
    console.log(error)
  //  console.log(error.message) 
    return new NextResponse("Internal error", { status: 500 });
  }
}