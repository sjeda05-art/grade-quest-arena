import styled, { css } from "styled-components";
import { u } from "../../styles/unit";

const variants = {
  primary: css`
    background: var(--gradient-primary);
    color: var(--primary-foreground);
    box-shadow: var(--shadow-pop);
  `,
  mint: css`
    background: var(--mint);
    color: var(--ink);
    box-shadow: 0 calc(var(--u) * 0.8) 0 color-mix(in oklab, var(--mint-strong) 60%, transparent);
  `,
  ghost: css`
    background: var(--muted);
    color: var(--ink);
  `,
  danger: css`
    background: color-mix(in oklab, var(--destructive) 18%, var(--card));
    color: var(--destructive);
  `,
};

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${u(1.5)};
  padding: ${u(3.2)} ${u(5)};
  border: none;
  border-radius: ${u(4)};
  font-size: ${u(4.2)};
  text-decoration: none;
  transition: transform 0.12s, filter 0.2s;
  ${({ $variant = "primary" }) => variants[$variant]}
  ${({ $block }) => $block && "width: 100%;"}

  &:active { transform: translateY(2px); }
  &:disabled { filter: grayscale(0.8); opacity: 0.55; cursor: not-allowed; }

  svg { width: ${u(4.6)}; height: ${u(4.6)}; }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${u(1.5)};
  font-size: ${u(3.6)};
  color: var(--muted-foreground);
`;

export const Input = styled.input`
  width: 100%;
  padding: ${u(3)} ${u(3.5)};
  border: ${u(0.5)} solid var(--input);
  border-radius: ${u(3)};
  background: var(--background);
  color: var(--ink);
  font-size: ${u(4.2)};
  outline: none;

  &:focus { border-color: var(--ring); }
`;

export const ErrorText = styled.p`
  margin: 0;
  font-size: ${u(3.4)};
  color: var(--destructive);
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  gap: ${u(2.5)};
  & > * { flex: 1; }
`;
