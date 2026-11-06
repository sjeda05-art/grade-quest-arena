import { Link, useRouterState } from "@tanstack/react-router";
import { Users, GalleryHorizontalEnd, Castle, ClipboardList, Settings } from "lucide-react";
import { toast } from "sonner";
import * as S from "./BottomNav.style";

const ITEMS = [
  { key: "party", label: "토벌단", icon: Users },
  { key: "gallery", label: "전시관", icon: GalleryHorizontalEnd, to: "/gallery" },
  { key: "dungeon", label: "던전", icon: Castle, to: "/dungeons", center: true },
  { key: "grades", label: "성적관리", icon: ClipboardList },
  { key: "settings", label: "설정", icon: Settings },
];

export default function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <S.Nav aria-label="하단 메뉴">
      {ITEMS.map(({ key, label, icon: Icon, to, center }) => {
        const active = to ? pathname.startsWith(to) : false;
        const inner = (
          <>
            <S.IconWrap $center={center} $active={active}>
              <Icon />
            </S.IconWrap>
            <S.Label $active={active}>{label}</S.Label>
          </>
        );
        return to ? (
          <S.Item key={key} as={Link} to={to} $center={center}>
            {inner}
          </S.Item>
        ) : (
          <S.Item key={key} type="button" onClick={() => toast(`${label} 기능은 준비 중이에요`)}>
            {inner}
          </S.Item>
        );
      })}
    </S.Nav>
  );
}
