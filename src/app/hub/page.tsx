import type { Metadata } from "next";
import { SplitLanding } from "@/components/split-landing/SplitLanding";
import { splitLandingSections } from "@/config/split-landing";

export const metadata: Metadata = {
  title: "Hub",
};

export default function HubPage() {
  return <SplitLanding sections={splitLandingSections} />;
}
