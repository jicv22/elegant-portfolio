import type { Metadata } from "next";
import { PinFieldLabView } from "@/components/effects/pin-field/PinFieldLabView";

export const metadata: Metadata = {
  title: "Pin Field Lab",
  robots: { index: false, follow: false },
};

export default function PinFieldLabPage() {
  return <PinFieldLabView />;
}
