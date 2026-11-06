import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { useGameStore } from "../../lib/gameStore";
import BottomNav from "../BottomNav/BottomNav";
import * as S from "./Layout.style";

export default function Layout({ title, left, right, showHome = true, hideNav = false, children }) {
  const user = useGameStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate({ to: "/" });
  }, [user, navigate]);

  return (
    <S.Page $hideNav={hideNav}>
      {title && (
        <S.Header>
          {left ?? (showHome ? (
            <S.IconButton as={Link} to="/home" aria-label="홈으로">
              <Home />
            </S.IconButton>
          ) : (
            <S.HeaderSpacer />
          ))}
          <S.Title>{title}</S.Title>
          {right ?? <S.HeaderSpacer />}
        </S.Header>
      )}
      <S.Content>{children}</S.Content>
      {!hideNav && <BottomNav />}
    </S.Page>
  );
}
