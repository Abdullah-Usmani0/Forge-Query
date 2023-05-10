//Purpose: generate the final JSON object that combines generatedDatasources, generatedVisuals, and generatedDashboard in one JSON object.

const generateFinal = async (generatedDatasources: any, generatedVisuals: any, generatedDashboard: any) => {
    //logic to generate final JSON object
    let finalJSON: any = {}

    //combine all three objects into one JSON object
    finalJSON = {
        "data_source": generatedDatasources,
        "visualization": generatedVisuals,
        "dashboard": generatedDashboard
    }

    //return finalJSON object
    return finalJSON;

}

export default generateFinal;
