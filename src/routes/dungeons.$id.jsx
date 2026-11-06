import { createFileRoute } from "@tanstack/react-router";
import Battle from "../pages/Battle/Battle";

export const Route = createFileRoute("/dungeons/$id")({
  head: () => ({
    meta: [
      { title: "던전 토벌 | 학점전선" },
      { name: "description", content: "출석 체크, 과제 어택, 시험 스킬로 교수님을 토벌하세요." },
      { property: "og:title", content: "던전 토벌 | 학점전선" },
      { property: "og:description", content: "출석 체크, 과제 어택, 시험 스킬로 교수님을 토벌하세요." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Battle,
});
