
import { StreamingTextResponse} from 'ai'
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
//const { CohereEmbeddings } = require('langchain/embeddings/openai');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { ChatOpenAI } = require('langchain/chat_models/openai');
const { PineconeClient } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
// const { Pinecone } = require('langchain/vectorstores/pinecone');
// const pinecone = require('pinecone-client');
const axios = require('axios');
const { Document } = require("langchain/vectorstores/pinecone");
const { LLMChain } = require('langchain/chains');
const { PromptTemplate } = require('langchain/prompts');
import { CohereEmbeddings } from "langchain/embeddings/cohere";

let vectordb;

async function main() {
//const pineconeApiKey = '4b32c202-d434-411b-a161-4eaa90194320';
//const pineconeEnvironment = 'us-west4-gcp-free';
//const url = 'https://aleria-demo.forge-solutions.com/api/get-models-and-fields';
//const indexName = 'schema-embed2';

  // OpenAI setup
  // llm = new ChatOpenAI({openai_api_key:"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", temperature:0})
  const Embeddings = new OpenAIEmbeddings({ openAIApiKey: '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' });
  const pineconeApiKey = 'a3cb6b56-bc6f-43b0-aa04-874d10283030';
  const pineconeEnvironment = 'us-west1-gcp-free';
  const url = 'https://aleria-demo.forge-solutions.com/api/get-models-and-fields';
  const indexName = 'schema-embed2';



//const Embeddings = new CohereEmbeddings({
  //apiKey: "KAjf5zNL5itivqp39z3VgbnbARvx4N3hy8D6UFXS", // In Node.js defaults to process.env.COHERE_API_KEY
//});

  const textSplitter = new RecursiveCharacterTextSplitter({ chunk_size: 500, chunk_overlap: 0 });
  const llm = new ChatOpenAI({ openAIApiKey: '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', temperature: 0 });

  // // GET request using axios
  const response = await axios.get(url);
  const schema = response.data;
  console.log("Shema retrived")


  
 
  // console.log('Status code:', response.status);
  // console.log('Data:', schema);


  const myDoc = await textSplitter.splitText(JSON.stringify(schema));
 

  // Pinecone setup
  
  const client = new PineconeClient();
 
  await client.init({
    apiKey: pineconeApiKey,
    environment: pineconeEnvironment,
  });
//}
//client=getClient();

  const pineconeIndex = client.Index("schema-embed2");
  console.log('index: ', pineconeIndex)

  const myDocArray = myDoc.map(t => t);
  console.log('array: ', pineconeIndex)
  const metadatas = {}; // Adjust this according to your requirement
  const dbConfig = { pineconeIndex };
 vectordb= await PineconeStore.fromExistingIndex(
  Embeddings,dbConfig,
);

//vectordb = PineconeStore.fromTexts(myDocArray, metadatas, Embeddings, dbConfig);

console.log(vectordb);
return vectordb;

}
export {main};
//export{vectordb};




