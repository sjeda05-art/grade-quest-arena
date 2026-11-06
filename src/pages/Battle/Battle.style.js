import styled, { css, keyframes } from "styled-components";
import { u } from "../../styles/unit";

/* ---------- 애니메이션 ---------- */
const shake = keyframes`
  0%, 100% { transform: translateX(0); filter: none; }
  15% { transform: translateX(-8%); filter: brightness(1.8); }
  30% { transform: translateX(7%); }
  45% { transform: translateX(-5%); filter: brightness(1.8); }
  60% { transform: translateX(4%); }
  80% { transform: translateX(-2%); }
`;

const idle = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3%); }
`;

const wobble = keyframes`
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(4deg); }
`;

const floatUp = keyframes`
  0% { opacity: 0; transform: translate(-50%, 20%) scale(0.8); }
  20% { opacity: 1; transform: translate(-50%, -20%) scale(1.1); }
  100% { opacity: 0; transform: translate(-50%, -160%) scale(1); }
`;

const angelFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.08); }
`;

/* ---------- 헤더 ---------- */
export const BackLink = styled.a`
  display: grid;
  place-items: center;
  width: ${u(10)};
  height: ${u(10)};
  border-radius: ${u(3)};
  background: var(--card);
  color: var(--ink);
  box-shadow: var(--shadow-soft);

  svg { width: ${u(6)}; height: ${u(6)}; }
`;

export const HeaderSpacer = styled.span`
  width: ${u(10)};
`;

export const Missing = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u(4)};
  font-size: ${u(4.4)};
  color: var(--muted-foreground);
`;

/* ---------- 배틀 필드 ---------- */
export const Arena = styled.section`
  position: relative;
  height: ${u(100)};
  border-radius: ${u(5)};
  background: var(--gradient-sky);
  overflow: hidden;
  box-shadow: inset 0 0 0 ${u(0.8)} var(--card), var(--shadow-soft);
`;

export const InfoBox = styled.div`
  position: absolute;
  z-index: 3;
  width: ${u(47)};
  padding: ${u(2.2)} ${u(3)} ${u(2)};
  background: var(--card);
  border: ${u(0.7)} solid var(--ink);
  box-shadow: ${u(0.9)} ${u(0.9)} 0 var(--ink);

  ${({ $side }) =>
    $side === "enemy"
      ? css`
          top: ${u(3)};
          left: ${u(2.5)};
          border-radius: ${u(3)} ${u(1)} ${u(3)} ${u(3)};
        `
      : css`
          bottom: ${u(5)};
          right: ${u(2.5)};
          border-radius: ${u(3)} ${u(3)} ${u(1)} ${u(3)};
        `}
`;

export const InfoName = styled.p`
  display: flex;
  align-items: center;
  gap: ${u(1.2)};
  margin: 0 0 ${u(1.2)};
  font-size: ${u(3.6)};
  color: var(--ink);
  white-space: nowrap;
`;

const tag = css`
  padding: ${u(0.2)} ${u(1.4)};
  border-radius: ${u(1)};
  font-size: ${u(2.6)};
`;

export const Boss = styled.span`
  ${tag};
  background: var(--primary);
  color: var(--primary-foreground);
`;

export const Lv = styled.span`
  ${tag};
  background: var(--lavender);
  color: var(--ink);
`;

export const Blessed = styled.span`
  ${tag};
  background: var(--gold);
  color: var(--ink);
`;

export const HpRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${u(1.2)};
`;

export const HpTag = styled.span`
  padding: 0 ${u(1.2)};
  border-radius: ${u(1)};
  background: var(--ink);
  color: var(--gold);
  font-size: ${u(2.6)};
`;

export const HpTrack = styled.div`
  position: relative;
  flex: 1;
  height: ${u(2.6)};
  border-radius: 999px;
  background: var(--hp-track);
  overflow: visible;
`;

export const HpFill = styled.div`
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s ease, background 0.3s;
  background: ${({ $ratio }) => ($ratio > 0.5 ? "var(--hp-high)" : $ratio > 0.2 ? "var(--hp-mid)" : "var(--hp-low)")};
`;

export const ClearLine = styled.span`
  position: absolute;
  top: ${u(-1)};
  bottom: ${u(-1)};
  width: ${u(0.6)};
  background: var(--primary-strong);
  border-radius: 999px;
`;

export const InfoSub = styled.p`
  margin: ${u(1)} 0 0;
  font-size: ${u(2.9)};
  color: var(--muted-foreground);
  text-align: right;
`;

export const Platform = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  height: ${u(9)};
  border-radius: 50%;
  background: radial-gradient(ellipse at center, var(--mint) 0%, var(--mint-strong) 60%, transparent 72%);
  opacity: 0.85;
`;

export const EnemySpot = styled.div`
  position: absolute;
  top: ${u(4)};
  right: ${u(2)};
  width: ${u(38)};
  height: ${u(40)};
`;

export const HeroSpot = styled.div`
  position: absolute;
  bottom: ${u(1)};
  left: ${u(1)};
  width: ${u(44)};
  height: ${u(46)};
`;

export const Sprite = styled.img`
  position: absolute;
  left: 50%;
  bottom: ${u(2.5)};
  width: 92%;
  height: auto;
  margin-left: -46%;
  object-fit: contain;
  transform-origin: bottom center;
  animation: ${idle} 2.6s ease-in-out infinite;

  ${({ $groggy }) =>
    $groggy &&
    css`
      animation: ${wobble} 0.9s ease-in-out infinite;
      filter: saturate(0.6);
    `}

  ${({ $hit }) =>
    $hit &&
    css`
      animation: ${shake} 0.6s ease-in-out;
    `}
`;

export const Popup = styled.span`
  position: absolute;
  left: 50%;
  top: ${({ $hero }) => ($hero ? u(6) : u(4))};
  z-index: 4;
  padding: ${u(0.8)} ${u(2.5)};
  border-radius: 999px;
  background: var(--card);
  color: ${({ $hero }) => ($hero ? "var(--destructive)" : "var(--primary-strong)")};
  font-family: var(--font-title);
  font-size: ${u(5)};
  white-space: nowrap;
  box-shadow: var(--shadow-soft);
  animation: ${floatUp} 1s ease-out forwards;
  pointer-events: none;
`;

/* ---------- 대천사 ---------- */
export const Angel = styled.button`
  position: absolute;
  z-index: 2;
  top: ${u(27)};
  left: ${u(13)};
  width: ${u(21)};
  padding: 0;
  border: none;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${angelFloat} 3s ease-in-out infinite;

  &:disabled { cursor: default; }
  ${({ $used }) =>
    $used &&
    css`
      filter: grayscale(0.9);
      opacity: 0.55;
    `}
`;

export const AngelGlow = styled.span`
  position: absolute;
  inset: -20% -25% 10%;
  border-radius: 50%;
  background: var(--gradient-angel);
  animation: ${pulse} 2s ease-in-out infinite;
  ${({ $used }) => $used && "animation: none; opacity: 0.3;"}
`;

export const AngelImg = styled.img`
  position: relative;
  width: 100%;
  height: auto;
`;

export const AngelLabel = styled.span`
  position: relative;
  margin-top: ${u(-1.5)};
  padding: ${u(0.6)} ${u(2)};
  border-radius: 999px;
  background: ${({ $used }) => ($used ? "var(--muted)" : "var(--gold)")};
  color: var(--ink);
  font-size: ${u(2.7)};
  white-space: nowrap;
  box-shadow: var(--shadow-soft);
`;

/* ---------- 메시지 & 커맨드 ---------- */
export const MessageBox = styled.div`
  min-height: ${u(15)};
  margin: ${u(3)} 0 ${u(2.5)};
  padding: ${u(3)} ${u(4)};
  border: ${u(0.7)} solid var(--ink);
  border-radius: ${u(3)};
  background: var(--card);
  box-shadow: inset 0 0 0 ${u(0.8)} var(--lavender), ${u(0.9)} ${u(0.9)} 0 var(--ink);
  font-size: ${u(3.8)};
  line-height: 1.45;
  color: var(--ink);
`;

const skillColor = {
  attendance: "var(--mint)",
  assignment: "var(--peach)",
  midterm: "var(--sky)",
  final: "var(--lavender)",
};

export const Commands = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${u(2.5)};
`;

export const SkillButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: ${u(1.4)};
  padding: ${u(2.6)} ${u(3)};
  border: ${u(0.6)} solid var(--ink);
  border-radius: ${u(3.5)};
  background: ${({ $skill }) => skillColor[$skill]};
  color: var(--ink);
  text-align: left;
  box-shadow: 0 ${u(1)} 0 var(--ink);
  transition: transform 0.1s, box-shadow 0.1s;

  &:active:not(:disabled) {
    transform: translateY(${u(0.8)});
    box-shadow: 0 ${u(0.2)} 0 var(--ink);
  }
  &:disabled {
    opacity: 0.5;
    filter: grayscale(0.6);
    cursor: not-allowed;
  }
`;

export const SkillTop = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${u(1)};
`;

export const SkillName = styled.span`
  font-size: ${u(3.7)};
  white-space: nowrap;
`;

export const SkillType = styled.span`
  padding: ${u(0.2)} ${u(1.4)};
  border-radius: ${u(1)};
  background: var(--card);
  font-size: ${u(2.5)};
  color: var(--muted-foreground);
`;

export const Balls = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: ${u(0.9)};
  min-height: ${u(3.2)};
`;

export const Ball = styled.span`
  width: ${u(3.2)};
  height: ${u(3.2)};
  border-radius: 50%;
  border: ${u(0.4)} solid var(--ink);
  background: linear-gradient(180deg, var(--primary-strong) 0 42%, var(--ink) 42% 58%, var(--card) 58% 100%);

  ${({ $empty }) =>
    $empty &&
    css`
      background: transparent;
      border-style: dashed;
      opacity: 0.45;
    `}
`;

export const NoPP = styled.span`
  font-size: ${u(2.8)};
  color: var(--muted-foreground);
`;

export const SkillBottom = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: ${u(2.9)};
  color: var(--muted-foreground);
`;

export const Footnote = styled.p`
  margin: ${u(2.5)} 0 0;
  font-size: ${u(3)};
  color: var(--muted-foreground);
  text-align: center;
`;

/* ---------- 결과 ---------- */
export const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u(3)};
`;

export const ResultImg = styled.img`
  width: ${u(32)};
  height: ${u(32)};
  object-fit: contain;
  ${({ $success }) =>
    $success
      ? css`
          transform: rotate(-80deg) translateX(-10%);
          filter: saturate(0.4);
        `
      : css`
          animation: ${idle} 2s ease-in-out infinite;
        `}
`;

export const ResultScore = styled.p`
  margin: 0;
  font-size: ${u(4)};
  color: var(--muted-foreground);

  strong {
    font-family: var(--font-title);
    font-weight: 400;
    font-size: ${u(8)};
    color: var(--primary-strong);
  }
`;

export const ResultDesc = styled.p`
  margin: 0;
  font-size: ${u(3.6)};
  color: var(--ink);
  text-align: center;
  line-height: 1.5;
`;

export const GradeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${u(2)};
  margin: ${u(1)} 0 ${u(2)};
`;

export const GradeOption = styled.button`
  width: ${u(14)};
  height: ${u(14)};
  border: ${u(0.6)} solid var(--border);
  border-radius: ${u(3.5)};
  background: var(--background);
  color: var(--ink);
  font-family: var(--font-title);
  font-size: ${u(5.5)};

  ${({ $selected, $success }) =>
    $selected &&
    css`
      border-color: ${$success ? "var(--mint-strong)" : "var(--lavender-strong)"};
      background: ${$success ? "var(--mint)" : "var(--lavender)"};
      transform: translateY(-6%);
    `}
`;
