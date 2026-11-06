import styled, { keyframes } from "styled-components";
import { u } from "../../styles/unit";

const rise = keyframes`
  from { transform: translateY(12%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: oklch(0.3 0.05 300 / 0.35);
`;

export const Sheet = styled.div`
  width: var(--frame-w);
  max-height: 92dvh;
  overflow-y: auto;
  padding: ${u(6)} ${u(5)} ${u(7)};
  background: var(--card);
  border-top-left-radius: ${u(7)};
  border-top-right-radius: ${u(7)};
  box-shadow: var(--shadow-card);
  animation: ${rise} 0.25s ease-out;
`;

export const Title = styled.h2`
  margin: 0 0 ${u(4)};
  font-family: var(--font-title);
  font-weight: 400;
  font-size: ${u(6)};
  color: var(--ink);
  text-align: center;
`;
