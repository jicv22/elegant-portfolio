import { SplitLanding } from "@/components/split-landing/SplitLanding";
import { splitLandingSections } from "@/config/split-landing";

export default function Home() {
  return <SplitLanding sections={splitLandingSections} />;
}
