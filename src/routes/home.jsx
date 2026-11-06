import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/Home/Home";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "메인 홈 | 학점전선" },
      { name: "description", content: "내 용사의 전투력을 확인하고 던전과 전시관으로 떠나세요." },
      { property: "og:title", content: "메인 홈 | 학점전선" },
      { property: "og:description", content: "내 용사의 전투력을 확인하고 던전과 전시관으로 떠나세요." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
