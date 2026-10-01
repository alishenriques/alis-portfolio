import { ogImageRoute } from "@/lib/og/ogImageRoute";

const route = ogImageRoute("ABOUT");

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
