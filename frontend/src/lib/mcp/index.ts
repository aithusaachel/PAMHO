import { defineMcp } from "@lovable.dev/mcp-js";
import listPagesTool from "./tools/list-pages";
import getOrganizationInfoTool from "./tools/get-organization-info";

export default defineMcp({
  name: "pamho-mcp",
  title: "PAMHO",
  version: "0.1.0",
  instructions:
    "Tools for the Pan-African Mental Health Organization (PAMHO) website. Use `get_organization_info` for the mission and key participation links, and `list_pages` to enumerate public pages.",
  tools: [listPagesTool, getOrganizationInfoTool],
});