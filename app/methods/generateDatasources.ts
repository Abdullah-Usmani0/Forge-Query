// Purpose: A  agent that receives the user prompt and outputs the potential table names based on the user query and KPI description.
import { NonRetriableError } from "inngest";
import querySchema from "./querySchema";
import modelSchema from "./modelSchema";
import agentConfig from "./agentConfig";

const modelDescription = modelSchema
const jsonSchema = querySchema.data_source
const systemPrompt = agentConfig.dataSourceAgent.agentPrompt;

const generateDataSources = async (userPrompt: string) => {

    //generate the datasource JSON object using the table names and fields
    let generatedDataSources: any = []
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                { role: "system", content: systemPrompt },
                { role: 'user', content: 'From now you will only ever respond with JSON.' },
                { role: 'user', content: `User Prompt: ${userPrompt}\nJSON Schema:\n${jsonSchema}\nModel Description:\n${modelDescription}\n\nANSWER: { "data_sources": [<|ASSISTANT|>]}` }
            ]
        })
    });

    // Check if the response is successful
    if (response.ok) {
        // Parse response as JSON
        const data = await response.json();

        // Get the generated datasource JSON object from response
        const gptResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (gptResponse) {
            console.log('Response: ', gptResponse)
            try {
                // Parse generated JSON string into a JSON object
                generatedDataSources = JSON.parse(gptResponse);
            } catch (error) {
                console.error("Error parsing generated JSON:", error);
                throw new NonRetriableError("Error parsing generated JSON:", { cause: error });
            }
        }
    } else {
        console.error("API call failed with status:", response.status);
        throw new Error(`API call failed with status: ${response.status}`);
    }

    // Return the table names
    return generatedDataSources;
}

export default generateDataSources;