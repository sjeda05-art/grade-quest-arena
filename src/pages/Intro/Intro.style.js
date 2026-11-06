import styled, { keyframes } from "styled-components";
import { u } from "../../styles/unit";

const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.85); letter-spacing: 0.3em; }
  100% { opacity: 1; transform: scale(1); letter-spacing: 0.04em; }
`;

// 글씨가 2초 동안 점점 희미해짐
const fadeOut = keyframes`
  from { opacity: 1; filter: blur(0); }
  to { opacity: 0; filter: blur(calc(var(--u) * 1)); }
`;

export const fadeOutName = fadeOut.getName();

export const Screen = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Typo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u(3)};
  animation:
    ${popIn} 0.8s ease-out both,
    ${fadeOut} 2s ease-in 1.4s forwards;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: ${u(19)};
  line-height: 1;
  background: var(--gradient-title);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 calc(var(--u) * 1) 0 var(--card));
`;

export const Subtitle = styled.p`
  margin: 0;
  font-family: var(--font-ui);
  font-size: ${u(6)};
  color: var(--lavender-strong);
  letter-spacing: 0.12em;
`;
