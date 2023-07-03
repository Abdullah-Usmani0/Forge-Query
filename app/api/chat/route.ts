import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { CallbackManager, ConsoleCallbackHandler } from 'langchain/callbacks'
import { OpenAI } from 'langchain/llms/openai'
import { SqlDatabaseChain } from 'langchain/chains'
import { AIChatMessage, HumanChatMessage } from 'langchain/schema'
import { getDb } from "../../../storage/db"
import { kv } from '@vercel/kv'

// export const runtime = 'edge'
//typeORM has issues with edge runtime

// this requires an .env.local file with the following variables:
// OPENAI_API_KEY=
// PSCALE_PWD=
// PSCALE_USR=
// KV_URL=
// KV_REST_API_URL=
// KV_REST_API_TOKEN=
// KV_REST_API_READ_ONLY_TOKEN=

export async function POST(req: Request) {
  const { messages } = await req.json()

  // filter out the user messages
  const userMessages = messages.filter((m: { role: string }) => m.role === 'user');
  // get the last user message
  const lastUserMessage = userMessages.pop();

  // Prepare a unique cache key based on the last user message
  const cacheKey = JSON.stringify(lastUserMessage);

  // Try to get a cached response
  const cachedSql = await kv.get(cacheKey);
  if (cachedSql) {
    // If a cached response exists, return it directly
    return new Response(cachedSql.toString());
  }

  const db = await getDb();

  const chain = new SqlDatabaseChain({
    llm: new OpenAI({
      temperature: 0.2,
      streaming: true,
      callbacks: [new ConsoleCallbackHandler()],
    }),
    database: db,
    sqlOutputKey: "sql"
  });

  let sqlStatement;
  try {
    const result = await chain.call({ query: lastUserMessage.content })
    sqlStatement = result.sql;

    // Cache the SQL statement for future use
    await kv.set(cacheKey, sqlStatement);
    await kv.expire(cacheKey, 60 * 60);  // Set the cache to expire in 1 hour
  } catch (error) {
    console.error(error);
    throw error;
  }

  return new StreamingTextResponse(sqlStatement)
}
