import * as S from "./Intro.style";

export default function Intro({ onDone }) {
  return (
    <S.Screen onClick={onDone}>
      <S.Typo
        onAnimationEnd={(e) => {
          if (e.animationName === S.fadeOutName) onDone();
        }}
      >
        <S.Title>학점전선</S.Title>
        <S.Subtitle>F급 용사의 반격</S.Subtitle>
      </S.Typo>
    </S.Screen>
  );
}
