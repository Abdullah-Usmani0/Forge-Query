//Purpose: [Main endpoint] generate 3 (kpis) based on the user prompt and return only JSON schema of the visual and dashboard layout.
import { inngest } from "@/app/inngest/client";
import getDataSources from "../methods/generateDatasources";
import getVisuals from "../methods/generateVisuals";
import getDashboard from "../methods/generateDashboard";
import getFinal from "../methods/generateFinal";


const generateKPIs = inngest.createFunction(
  { name: "Generate KPIs" },
  { event: "ai/generate.kpis" },
  async ({ event, step }) => {
    //get the user data from the event
    const userPrompt: string = event.data.userPrompt;
    // const userId: string = event.user.user_id;
    // const userEmail: string = event.user.email;

    //get the generatedDataSources from  
    const generatedDataSources = await step.run("Get Generated Datasources", async () => {
      return await getDataSources(userPrompt);
    });
    //get the generatedVisuals from 
    const generatedVisuals = await step.run("Get Generated Visuals", async () => {
      return await getVisuals(generatedDataSources, userPrompt);
    }
    );
    //get the generatedDashboard from 
    const generatedDashboards = await step.run("Get Generated Dashboard", async () => {
      return await getDashboard(generatedVisuals, userPrompt);
    }
    );
    //get the finalJSON
    const finalObject = await step.run("Get Final JSON", async () => {
      return await getFinal(generatedDataSources, generatedVisuals, generatedDashboards);
    }
    );
    return finalObject;
  }
);
export default generateKPIs;