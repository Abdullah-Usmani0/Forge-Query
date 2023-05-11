//Purpose: a  to generate the dashboard JSON object based on the JSON schema provided. Uses the generated visuals to populate the dashboard.
import { NonRetriableError } from "inngest";
import querySchema from "./querySchema";
import agentConfig from "./agentConfig";

const jsonSchema = querySchema.dashboard
const systemPrompt = agentConfig.dashboardAgent.agentPrompt;

const generateDashboards = async (generatedVisuals: any, userPrompt: any) => {

    //logic to generate dashboard using gpt-4 api
    let dashboard: any = {}

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
                { role: 'user', content: `User Prompt: ${userPrompt}\nJSON Schema:\n${jsonSchema}\nVisuals:\n${JSON.stringify(generatedVisuals)}\n\nANSWER: { "dashboard": {<|ASSISTANT|>}}` }]
        })
    });
    //parse gpt-4 response as JSON
    // Check if the response is successful
    if (response.ok) {
        // Parse  response as JSON
        const data = await response.json();

        // Get the generated visuals JSON object from  response
        const gptResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (gptResponse) {
            console.log('Response: ', gptResponse)
            try {
                // Parse  generated JSON string into a JSON object
                dashboard = JSON.parse(gptResponse);
            } catch (error) {
                console.error("Error parsing generated JSON:", error);
                throw new NonRetriableError("Error parsing generated JSON:", { cause: error });
            }
        }
    } else {
        console.error("API call failed with status:", response.status);
        throw new Error(`API call failed with status: ${response.status}`);
    }

    //return datasources object
    return dashboard;

}

export default generateDashboards;