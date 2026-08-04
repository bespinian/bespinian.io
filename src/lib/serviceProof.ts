/**
 * Which customer stories back each service landing page.
 *
 * Kept here rather than in the per-language service JSON so the curation is
 * not triplicated: the customers collection is already resolved per language,
 * so the quote appears in the visitor's language on its own.
 *
 * The logo strip is labelled "we've done this work for", so only list customers
 * where we really did that kind of work. The testimonial should be the story
 * closest to what the service delivers.
 */
export interface ServiceProof {
  logoIds: string[];
  testimonialId?: string;
}

export const serviceProof: Record<string, ServiceProof> = {
  "serverless-application-acceleration": {
    logoIds: ["meteoswiss", "comet", "amaise", "medisante"],
    testimonialId: "amaise",
  },
  "cloud-native-empowerment": {
    logoIds: [
      "postfinance",
      "swisscom-health",
      "bernmobil",
      "swisssign",
      "zeilenwerk",
    ],
    testimonialId: "swisscom-health",
  },
  "saas-transformation": {
    logoIds: ["xovis", "20-minuten", "medisante", "talk"],
    testimonialId: "xovis",
  },
  // The thinnest of the four: amaise and Comet are the only engagements with a
  // real AI or ML workload at the centre. Extend this as soon as there are
  // references from an actual AI adoption engagement.
  "pragmatic-ai-adoption": {
    logoIds: ["amaise", "comet"],
    testimonialId: "amaise",
  },
};
