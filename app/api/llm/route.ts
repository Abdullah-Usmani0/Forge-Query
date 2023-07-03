// router.js
import { NextResponse } from 'next/server';
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabaseChain } from "langchain/chains";
import { getDb } from "../../../storage/db";  // adjust the path as needed

// Make sure to include an .env.local file in root dir with the following variables
// OPENAI_API_KEY=
// PSCALE_PWD=
// PSCALE_USR=

export async function POST(request: Request) {
    const res = await request.json();
    console.log('body: ', res);

    const db = await getDb();

    const chain = new SqlDatabaseChain({
        llm: new OpenAI({ temperature: 0.2 }),
        database: db,
    });

    const llmRes = await chain.run(res.prompt);
    console.log(llmRes);

    return NextResponse.json({ data: llmRes });
}