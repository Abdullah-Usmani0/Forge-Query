// Purpose: A GPT-4 agent that receives the user prompt and outputs the potential table names based on the user query and KPI description.
import querySchema from "./querySchema";
import modelSchema from "./modelSchema";

const modelDescription = modelSchema
const dataSourceSchema =  querySchema.data_source

const generateDataSources = async (userPrompt: string) => {
    
    const systemPrompt = `As a JSON API, your task is to generate an array of datasources using the provided JSON schema ${dataSourceSchema} and model description ${modelDescription}. Your response should be in valid JSON format. Do not include any comments or explanations in your response. Please ensure that the generated datasources adhere to the specifications of the JSON schema and include all necessary fields as described in the model description. Your response should be well-formatted and easy to read, with attention to detail and accuracy. Please note that you may encounter various scenarios when generating datasources, so your response should be flexible enough to allow for creative solutions while still maintaining adherence to the given specifications.`;
    //generate the datasource JSON object using the table names and fields
    let generatedDataSources: any = {}
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

        // Get the generated datasource JSON object from GPT-4 response
        const gptResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (gptResponse) {
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