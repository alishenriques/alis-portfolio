import { ogImageRoute } from "@/lib/og/ogImageRoute";

const route = ogImageRoute("HOME");

export const generateImageMetadata = route.generateImageMetadata;
export default route.Image;
