
import { StreamingTextResponse} from 'ai'
const { ChatOpenAI } = require('langchain/chat_models/openai');
const axios = require('axios');
const { Document } = require("langchain/vectorstores/pinecone");
const { LLMChain } = require('langchain/chains');
const { PromptTemplate } = require('langchain/prompts');
import { kv } from '@vercel/kv'
import { main } from '../../helper/vectorInit';
import { Keywords_template, TableNames_template,Date_template,SQL_template, ChartType_template, ChartTitle_template } from '../../Prompts/prompt';


export async function POST(req) {

const { messages } = await req.json()
console.log(messages)

 const userQuestions=messages[messages.length-1]
let userQuestion=userQuestions["content"]

console.log('User Question:', userQuestion);


  //const llm = new ChatOpenAI({ openAIApiKey: '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',model:"text-davinci-003", temperature: 0.5 });
  const llm = new ChatOpenAI({ openAIApiKey: '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',model:"gpt-3.5-turbo", temperature: 0.2 });

let vectordb=await main();
console.log(vectordb)


//Keywords_Agent
let QuestionCust = userQuestion;
let customerMessages = new PromptTemplate({
  template:Keywords_template ,
  inputVariables: ["Question"],
});

let chain = new LLMChain({ llm, prompt: customerMessages });
let Keywords=await chain.call({Question:QuestionCust})
console.log("Keywords :" ,Keywords);
let relevent_t=Keywords["text"]
console.log("relevent_t: " ,relevent_t);
let inter_table=JSON.parse(relevent_t)
let relevent_keywords=(inter_table["keywords"]).join()
console.log("Relevent Keywords: " ,relevent_keywords);

let docs =await vectordb.similaritySearch(relevent_keywords,5 );

console.log("Similarity search result: ",docs)

///---------------------------------------------------------------------------------------------------------


//TableNames_Agent
 QuestionCust = userQuestion;
 customerMessages = new PromptTemplate({
  template:TableNames_template ,
  inputVariables: ["Question", "schema"],
});

 chain = new LLMChain({ llm, prompt: customerMessages });



const answer=await chain.call({Question:QuestionCust,schema:docs})
console.log(answer)
const Tables = answer["text"];
console.log(Tables);

const response = await fetch('https://aleria-demo.forge-solutions.com/api/get-models-and-fields');
let forge_data = await response.json();

let tables_for_field=JSON.parse(Tables)["models"]
console.log("tables_for_field ",tables_for_field)

let validTable;
let tables_with_field=[];
for(let t of tables_for_field){
  console.log("table ",t)
  var index = await forge_data.findIndex(function(obj) {
    if(obj.model === t){
      validTable=true;
      return obj.model === t;
    }
    else{
    validTable=false;
    }
    
  });
  if(validTable==true){
  tables_with_field.push({"model":t,"field": forge_data[index].fields})
  //console.log("field" , forge_data[index].fields)
  }

}

console.log("tables with their fields",tables_with_field)
///---------------------------------------------------------------------------------------------------------



//Date_Agent
const { DateTime } = require('luxon');

let startDate = DateTime.now().toISODate();
let endDate=0;


const Dates = new PromptTemplate({
  template: Date_template,
  inputVariables: ["table_names", "Question", "schema", "start_date"],
});


 chain = new LLMChain({ llm, prompt: Dates });


const dates = await chain.call({Question:QuestionCust,schema: docs ,
  table_names: Tables,
  start_date: startDate,})

console.log(dates);

const date_agent=dates['text']
console.log(date_agent);

let dates_agent;

if(date_agent.includes("StartDate")){

let date_only=date_agent.replace(/^\s*[^{]+/, '');
console.log(date_only);
const parsed_date=date_only
dates_agent = JSON.parse(parsed_date);

console.log(dates_agent)


/// increase k=5, reduce chunk size, pass relevant keywords


if ("EndDate" in dates_agent) {
  endDate = dates_agent["EndDate"];
  console.log("End Date:");
  console.log(endDate);
}


if ("StartDate" in dates_agent) {
  startDate = dates_agent["StartDate"];
  console.log("Start Date:");
  console.log(startDate);
}

}

///---------------------------------------------------------------------------------------------------------



//SQL_Agent
const SQL_prompt = new PromptTemplate({
  template: SQL_template,
  inputVariables: ["table_names", "Question", "schema","tables_with_fields"],
});


chain = new LLMChain({ llm: llm, prompt: SQL_prompt });
const SQL =await chain.call({Question: QuestionCust,
  schema: docs,
  table_names: Tables,
  tables_with_fields:tables_with_field});

let SQL_agent=SQL["text"];
let sql=SQL_agent.replace('SQL Query:', '');

let Finalsql;

console.log("SQL without date",sql);

if(sql.includes("end_date")){
  Finalsql= sql.replace("end_date",endDate);
  Finalsql=Finalsql.replace("start_date",startDate);
}
else{
  Finalsql=sql;
}

console.log(Finalsql);

///---------------------------------------------------------------------------------------------------------


//Chart Type
const chart_prompt = new PromptTemplate({
  template: ChartType_template,
  inputVariables: ["Question", "SQL"],
});

chain = new LLMChain({ llm: llm, prompt: chart_prompt });

let charts=await chain.call({Question:QuestionCust,SQL:Finalsql})
let chart_type=charts["text"]
console.log(chart_type)
const chartData = JSON.parse(chart_type);
const chartType = Object.values(chartData)[0];
console.log(chartType)

///---------------------------------------------------------------------------------------------------------


//Chart Title
const Chart_Title_Prompt = new PromptTemplate({
  template: ChartTitle_template,
  inputVariables: ["Question", "SQL","ChartType"],
});

chain = new LLMChain({ llm: llm, prompt: Chart_Title_Prompt });

let chart_title=await chain.call({Question:QuestionCust,SQL:Finalsql,ChartType:charts})
let title=chart_title["text"]
console.log(title)
const Ctitle = JSON.parse(title);
const chartTitle = Object.values(Ctitle)[0];
console.log(chartTitle)


// Final JSON
let jsonSQL={"SQL":Finalsql,"values":{"endDate":endDate,"startDate":startDate},"Chart_Info":{"chart_type":chartType,"chart_title":chartTitle}}


console.log(jsonSQL);

return new StreamingTextResponse(jsonSQL["SQL"])

}

