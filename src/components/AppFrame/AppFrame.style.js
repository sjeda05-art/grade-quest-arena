import styled from "styled-components";
import { u } from "../../styles/unit";

export const Frame = styled.div`
  position: relative;
  width: var(--frame-w);
  min-height: 100dvh;
  margin: 0 auto;
  background: var(--gradient-page);
  box-shadow: var(--shadow-card);
  overflow-x: hidden;
`;

export const Fallback = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${u(3)};
  padding: ${u(8)};
  text-align: center;
  color: var(--foreground);
`;

export const FallbackCode = styled.h1`
  margin: 0;
  font-family: var(--font-title);
  font-size: ${u(20)};
  color: var(--primary-strong);
`;

export const FallbackTitle = styled.h2`
  margin: 0;
  font-size: ${u(6)};
`;

export const FallbackText = styled.p`
  margin: 0;
  font-size: ${u(4)};
  color: var(--muted-foreground);
`;

export const FallbackButton = styled.button`
  margin-top: ${u(3)};
  padding: ${u(3)} ${u(7)};
  border: none;
  border-radius: 999px;
  background: var(--primary);
  color: var(--primary-foreground);
  font-size: ${u(4.2)};
  text-decoration: none;
  box-shadow: var(--shadow-pop);
`;
