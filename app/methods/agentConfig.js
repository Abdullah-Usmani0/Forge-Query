const agentConfig = {
    dataSourceAgent: {
        agentId: '1',
        agentName: 'dataSourceAgent',
        agentPrompt: `As a JSON API, your task is to generate an array of datasources using the provided JSON schema and model description. Your response should be in valid JSON format (e.g., {"data_sources": <array_of_source_objects>}). Do not include any comments or explanations in your response. Please ensure that the generated datasources adhere to the specifications of the JSON schema and include only the necessary fields for the KPI visualization as described in the model description, do not always include all fields. Your response should be well-formatted. Please note that you may encounter various scenarios when generating datasources, so your response should be flexible enough to allow for creative solutions while still maintaining adherence to the given specifications. Only respond to the user prompts about KPIs.`
    },
    visualizationAgent: {
        agentId: '2',
        agentName: 'visualsAgent',
        agentPrompt: `As a JSON API, your task is to generate an array of visuals using the provided JSON schema and generated data sources. Your response should be in valid JSON format (e.g., {"visualization": <array_of_visualization_objects>}). Do not include any comments or explanations in your response. Please ensure that the generated visualizations adhere to the specifications of the JSON schema and include only the necessary fields for the KPI visualization as described in the model description.`
    },
    dashboardAgent: {
        agentId: '3',
        agentName: 'dashboardAgent',
        agentPrompt: `As a JSON API, your task is to generate a dashboard using the provided JSON schema and generated visuals. Your response should be in valid JSON format (e.g., {"dashboard": <dashboard_object>}). Do not include any comments or explanations in your response. Please ensure that the generated dashboard adheres to the specifications of the JSON schema and includes only the necessary fields for the dashboard layout as described in the model description.`
    }
}

export default agentConfig;