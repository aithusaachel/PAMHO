import { defineTool } from "@lovable.dev/mcp-js";

const INFO = {
  name: "Pan-African Mental Health Organization",
  shortName: "PAMHO",
  website: "https://pamhoafrica.lovable.app",
  mission:
    "Advance policy, research, advocacy, and community care to strengthen mental health across Africa.",
  initiative: "Pan-African Mental Health Conversation",
  ctaPages: {
    applyToSpeak: "/conversation",
    joinAsParticipant: "/join",
    becomeAmbassador: "/ambassadors",
    partnerWithUs: "/partners",
    contact: "/contact",
  },
};

export default defineTool({
  name: "get_organization_info",
  title: "Get PAMHO organization info",
  description:
    "Return PAMHO's mission, website, and links to the main participation pages (speak, join, ambassador, partner, contact).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(INFO, null, 2) }],
    structuredContent: INFO,
  }),
});