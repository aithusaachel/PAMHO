import { defineTool } from "@lovable.dev/mcp-js";

const PAGES = [
  { path: "/", title: "Home", description: "PAMHO homepage and overview of the Pan-African Mental Health Conversation." },
  { path: "/about", title: "About", description: "PAMHO's mission, vision, and story." },
  { path: "/conversation", title: "Apply to Speak", description: "Apply to speak at the Pan-African Mental Health Conversation." },
  { path: "/join", title: "Join the Conversation", description: "Register as a participant." },
  { path: "/ambassadors", title: "Ambassadors", description: "Become a PAMHO Ambassador." },
  { path: "/partners", title: "Partners", description: "Partner with PAMHO." },
  { path: "/contact", title: "Contact", description: "Get in touch with PAMHO." },
];

export default defineTool({
  name: "list_pages",
  title: "List PAMHO pages",
  description: "List the public pages on the PAMHO website with their paths and short descriptions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PAGES, null, 2) }],
    structuredContent: { pages: PAGES },
  }),
});