//Purpose: a  agent that uses the generatedDataSources and the userPrompt to generate 3 visuals (KPIs) based on the JSON schema provided.
import { NonRetriableError } from "inngest";
import querySchema from "./querySchema";
import agentConfig from "./agentConfig";

const jsonSchema = querySchema.visualization;
const systemPrompt = agentConfig.visualizationAgent.agentPrompt;

const generateVisuals = async (generatedDataSources: any, userPrompt: any) => {

    //logic to call gpt-4 api and general visuals
    let generatedVisuals: any = [];
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
                { role: 'user', content: `User Prompt: ${userPrompt}\nJSON Schema:\n${jsonSchema}\nDatasources:\n${JSON.stringify(generatedDataSources)}\n\nANSWER: { "visualizations": [<|ASSISTANT|>]}` }]
        })
    });

    // Check if the response is successful
    if (response.ok) {
        // Parse response as JSON
        const data = await response.json();

        // Get the generated visuals JSON object from response
        const gptResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (gptResponse) {
            console.log('Response: ', gptResponse)
            try {
                // Parse generated JSON string into a JSON object
                generatedVisuals = JSON.parse(gptResponse);
            } catch (error) {
                console.error("Error parsing generated JSON:", error);
                throw new NonRetriableError("Error parsing generated JSON:", { cause: error });
            }
        }
    } else {
        console.error("API call failed with status:", response.status);
        throw new Error(`API call failed with status: ${response.status}`);
    }

    // Return visuals object
    return generatedVisuals;
}

export default generateVisuals;