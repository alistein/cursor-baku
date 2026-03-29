import AboutPage from "@/components/AboutPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Cursor Baku, the local community helping developers, founders, students, designers, and AI builders in Azerbaijan ship faster with Cursor.",
  path: "/about",
  keywords: [
    "about Cursor Baku",
    "Cursor community Azerbaijan",
    "Baku developers",
    "AI builders Azerbaijan",
  ],
  imageAlt: "Cursor Baku community for developers and builders in Azerbaijan",
});

export default function About() {
  return <AboutPage />;
}
