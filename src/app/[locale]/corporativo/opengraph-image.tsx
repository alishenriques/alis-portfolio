import { ogImageRoute } from "@/lib/og/ogImageRoute";

const route = ogImageRoute("CORPORATE");

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
