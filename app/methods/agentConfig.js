const agentConfig = {
    dataSourceAgent: {
        agentId: '1',
        agentName: 'dataSourceAgent',
        agentPrompt: `As a JSON API, your task is to generate an array of datasources using the provided JSON schema and model description. Your response should be in valid JSON format. Do not include any comments or explanations in your response. Please ensure that the generated datasources adhere to the specifications of the JSON schema and include all necessary fields as described in the model description. Your response should be well-formatted and easy to read, with attention to detail and accuracy. Please note that you may encounter various scenarios when generating datasources, so your response should be flexible enough to allow for creative solutions while still maintaining adherence to the given specifications.`
    },
    visualsAgent: {
        agentId: '2',
        agentName: 'visualsAgent',
        agentPrompt: ``
    }
}

export default agentConfig;