//Purpose: a GPT-4 agent that uses the generatedDataSources and the userPrompt to generate 3 visuals (KPIs) based on the JSON schema provided.
import querySchema from "./querySchema";
const visualsSchema = querySchema.visualization;

const generateVisuals = async (generatedDataSources: any, userPrompt: any) => {

    const systemPrompt = `As a JSON API, your task is to generate an array of visuals using the provided JSON schema and generated data sources. Your response should be in valid JSON format. Do not include any comments or explanations in your response. Please ensure that the generated datasources adhere to the specifications of the JSON schema and include all necessary fields as described in the model description.`;

    //logic to call gpt-4 api and general visuals
    let generatedVisuals: any = [];
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-4",
            "messages": [{ "role": "system", "content": systemPrompt }, { role: 'user', content: userPrompt }]
        })
    });

    // Check if the response is successful
    if (response.ok) {
        // Parse GPT-4 response as JSON
        const data = await response.json();

        // Get the generated visuals JSON object from GPT-4 response
        const gptResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (gptResponse) {
            console.log('Response: ', gptResponse)
            try {
                // Parse GPT-4 generated JSON string into a JSON object
                generatedVisuals = JSON.parse(gptResponse);
            } catch (error) {
                console.error("Error parsing GPT-4 generated JSON:", error);
            }
        }
    } else {
        console.error("GPT-4 API call failed with status:", response.status);
    }

    // Return visuals object
    return generatedVisuals;
}

export default generateVisuals;