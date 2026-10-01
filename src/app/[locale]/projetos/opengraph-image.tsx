import { ogImageRoute } from "@/lib/og/ogImageRoute";

const route = ogImageRoute("PROJECTS");

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
