import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { actions } from "../../lib/gameStore";
import { getStudentAvatar } from "../../data/characters";
import * as S from "./Login.style";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const hero = getStudentAvatar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력해 주세요");
      return;
    }
    actions.login(id.trim());
    navigate({ to: "/home" });
  };

  return (
    <S.Screen>
      <S.Logo>
        <S.LogoTitle>학점전선</S.LogoTitle>
        <S.LogoSub>F급 용사의 반격</S.LogoSub>
      </S.Logo>

      <S.Hero src={hero.src} alt={hero.label} width={816} height={816} />

      <S.Form onSubmit={handleSubmit}>
        <S.Field>
          아이디
          <S.Input value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요" autoComplete="username" />
        </S.Field>
        <S.Field>
          비밀번호
          <S.Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
          />
        </S.Field>
        {error && <S.Error>{error}</S.Error>}
        <S.Submit type="submit">모험 시작하기</S.Submit>
      </S.Form>

      <S.Links>
        <S.TextButton type="button" onClick={() => toast("회원가입은 준비 중이에요")}>
          회원가입
        </S.TextButton>
        <S.Divider />
        <S.TextButton type="button" onClick={() => toast("비밀번호 찾기는 준비 중이에요")}>
          비밀번호 찾기
        </S.TextButton>
      </S.Links>
    </S.Screen>
  );
}
