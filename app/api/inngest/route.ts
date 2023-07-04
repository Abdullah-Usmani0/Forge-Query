import { serve } from "inngest/next";
import { inngest } from "@/app/inngest/client";
import generateKPIs from "@/app/events/generateKPIs";

export const runtime= "edge"
// Create an API that hosts zero functions
export const { GET, POST, PUT } = serve(inngest, [generateKPIs], {
    streaming: "allow",
});