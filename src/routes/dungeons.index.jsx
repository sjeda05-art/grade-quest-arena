import { createFileRoute } from "@tanstack/react-router";
import DungeonList from "../pages/DungeonList/DungeonList";

export const Route = createFileRoute("/dungeons/")({
  head: () => ({
    meta: [
      { title: "던전 리스트 | 학점전선" },
      { name: "description", content: "강의 계획표로 교수님 던전을 만들고 토벌에 도전하세요." },
      { property: "og:title", content: "던전 리스트 | 학점전선" },
      { property: "og:description", content: "강의 계획표로 교수님 던전을 만들고 토벌에 도전하세요." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DungeonList,
});
