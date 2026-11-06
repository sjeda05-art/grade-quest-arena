import { createFileRoute } from "@tanstack/react-router";
import Gallery from "../pages/Gallery/Gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "전시관 | 학점전선" },
      { name: "description", content: "토벌에 성공한 교수님들을 높은 성적순으로 전시하는 명예의 전당." },
      { property: "og:title", content: "전시관 | 학점전선" },
      { property: "og:description", content: "토벌에 성공한 교수님들을 높은 성적순으로 전시하는 명예의 전당." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});
