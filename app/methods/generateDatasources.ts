// Purpose: A GPT-4 agent that receives the user prompt and outputs the potential table names based on the user query and KPI description.
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
            "model": "gpt-4",
            "messages": [
                { role: "system", content: systemPrompt },
                { role: 'user', content: `JSON Schema:\n\n${jsonSchema}\n\n$Model Description:\n\n${modelDescription}\n\nUser Prompt: ${userPrompt}` }
            ]
        })
    });

    // Check if the response is successful
    if (response.ok) {
        // Parse GPT-4 response as JSON
        const data = await response.json();

        // Get the generated datasource JSON object from GPT-4 response
        const gptResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (gptResponse) {
            console.log('Response: ', gptResponse)
            try {
                // Parse GPT-4 generated JSON string into a JSON object
                generatedDataSources = JSON.parse(gptResponse);
            } catch (error) {
                console.error("Error parsing GPT-4 generated JSON:", error);
            }
        }
    } else {
        console.error("GPT-4 API call failed with status:", response.status);
    }

    // Return the table names
    return generatedDataSources;
}

export default generateDataSources;