const agentConfig = {
    dataSourceAgent: {
        agentId: '1',
        agentName: 'dataSourceAgent',
        agentPrompt: `As a JSON API, your task is to generate an array of datasources using the provided JSON schema and model description. Your response should be in valid JSON format. Do not include any comments or explanations in your response. Please ensure that the generated datasources adhere to the specifications of the JSON schema and include only the necessary fields as described in the model description. Your response should be well-formatted.`
    },
    visualizationAgent: {
        agentId: '2',
        agentName: 'visualsAgent',
        agentPrompt: `As a JSON API, your task is to generate an array of visuals using the provided JSON schema and data sources. Your response should be in valid JSON format. Do not include any comments or explanations in your response. Please ensure that the generated visualizations adhere to the specifications of the JSON schema and include only the necessary fields as described in the model description. Your response should be well-formatted.`
    },
    dashboardAgent: {
        agentId: '3',
        agentName: 'dashboardAgent',
        agentPrompt: `As a JSON API, your task is to generate a dashboard using the provided JSON schema and visuals. Your response should be in valid JSON format. Do not include any comments or explanations in your response. Please ensure that the generated dashboard adheres to the specifications of the JSON schema and includes only the necessary fields as described in the model description. Your response should be well-formatted.`
    }
}

export default agentConfig;