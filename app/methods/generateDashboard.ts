//Purpose: a GPT-4 to generate the dashboard JSON object based on the JSON schema provided. Uses the generated visuals to populate the dashboard.
import querySchema from "./querySchema";
const dashboardSchema = querySchema.dashboard

const generateDashboards = async (generatedVisuals: any, userPrompt: any) => {

    const systemPrompt = `As a JSON API, your task is to generate a dashboard using the provided JSON schema ${dashboardSchema}, userPrompt, and generatedVisuals. Your response should be in valid JSON format. Do not include any comments or explanations in your response. Please ensure that the generated datasources adhere to the specifications of the JSON schema and include all necessary fields as described in the model description.`
    //logic to generate dashboard using gpt-4 api
    let dashboard: any = {}

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `'Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-4",
            "messages": [{ "role": "system", "content": systemPrompt }, { role: 'user', content: userPrompt }]
        })
    });
    //parse gpt-4 response as JSON
    // Check if the response is successful
    if (response.ok) {
        // Parse GPT-4 response as JSON
        const data = await response.json();

        // Get the generated visuals JSON object from GPT-4 response
        const gptResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        if (gptResponse) {
            try {
                // Parse GPT-4 generated JSON string into a JSON object
                dashboard = JSON.parse(gptResponse);
            } catch (error) {
                console.error("Error parsing GPT-4 generated JSON:", error);
            }
        }
    } else {
        console.error("GPT-4 API call failed with status:", response.status);
    }

    //return datasources object
    return dashboard;

}

export default generateDashboards;