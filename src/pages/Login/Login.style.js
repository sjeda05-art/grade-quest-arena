import styled, { keyframes } from "styled-components";
import { u } from "../../styles/unit";

// 로그인 화면 요소는 기본 크기의 120%
const SCALE = 1.2;
const L = (n) => u(n * SCALE);

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2%); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4%); }
`;

export const Screen = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${L(4)};
  padding: ${L(6)} ${u(7)};
  animation: ${fadeIn} 0.8s ease-out both;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${L(1)};
`;

export const LogoTitle = styled.h1`
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: ${L(11)};
  line-height: 1;
  background: var(--gradient-title);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const LogoSub = styled.p`
  margin: 0;
  font-size: ${L(4)};
  color: var(--lavender-strong);
  letter-spacing: 0.1em;
`;

export const Hero = styled.img`
  width: ${L(36)};
  height: ${L(36)};
  object-fit: contain;
  animation: ${float} 3s ease-in-out infinite;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${L(3)};
  padding: ${L(5)};
  background: var(--card);
  border-radius: ${L(5)};
  box-shadow: var(--shadow-soft);
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${L(1.2)};
  font-size: ${L(3.4)};
  color: var(--muted-foreground);
`;

export const Input = styled.input`
  width: 100%;
  padding: ${L(2.8)} ${L(3.2)};
  border: ${u(0.5)} solid var(--input);
  border-radius: ${L(3)};
  background: var(--background);
  color: var(--ink);
  font-size: ${L(3.8)};
  outline: none;

  &:focus { border-color: var(--ring); }
`;

export const Error = styled.p`
  margin: 0;
  font-size: ${L(3.2)};
  color: var(--destructive);
  text-align: center;
`;

export const Submit = styled.button`
  margin-top: ${L(1)};
  padding: ${L(3.2)};
  border: none;
  border-radius: ${L(3.5)};
  background: var(--gradient-primary);
  color: var(--primary-foreground);
  font-size: ${L(4.4)};
  box-shadow: var(--shadow-pop);

  &:active { transform: translateY(2px); }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  gap: ${L(3)};
`;

export const TextButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-size: ${L(3.3)};
  color: var(--muted-foreground);
`;

export const Divider = styled.span`
  width: ${u(0.4)};
  height: ${L(3)};
  background: var(--border);
`;
