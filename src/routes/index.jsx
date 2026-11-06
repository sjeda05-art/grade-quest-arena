import { createFileRoute } from "@tanstack/react-router";
import Start from "../pages/Start/Start";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "학점전선 - F급 용사의 반격" },
      { name: "description", content: "F급 용사가 되어 교수님 던전을 토벌하는 학점 RPG. 지금 로그인하고 반격을 시작하세요." },
      { property: "og:title", content: "학점전선 - F급 용사의 반격" },
      { property: "og:description", content: "F급 용사가 되어 교수님 던전을 토벌하는 학점 RPG." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Start,
});
