import styled, { css } from "styled-components";
import { u } from "../../styles/unit";

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  width: var(--frame-w);
  height: ${u(19)};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: end;
  padding: 0 ${u(2)} ${u(2.5)};
  background: var(--card);
  border-top-left-radius: ${u(6)};
  border-top-right-radius: ${u(6)};
  box-shadow: 0 calc(var(--u) * -1) calc(var(--u) * 5) oklch(0.5 0.08 300 / 0.12);
`;

export const Item = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u(1)};
  border: none;
  background: transparent;
  text-decoration: none;
  padding: 0;
`;

export const IconWrap = styled.span`
  display: grid;
  place-items: center;
  width: ${u(11)};
  height: ${u(11)};
  border-radius: ${u(3.5)};
  color: var(--muted-foreground);
  transition: transform 0.2s, background 0.2s;

  svg {
    width: ${u(6)};
    height: ${u(6)};
  }

  ${({ $active }) =>
    $active &&
    css`
      background: var(--lavender);
      color: var(--ink);
    `}

  ${({ $center }) =>
    $center &&
    css`
      width: ${u(15)};
      height: ${u(15)};
      margin-top: ${u(-8)};
      border-radius: 50%;
      background: var(--gradient-primary);
      color: var(--primary-foreground);
      border: ${u(1.2)} solid var(--card);
      box-shadow: var(--shadow-pop);

      svg {
        width: ${u(7.5)};
        height: ${u(7.5)};
      }
    `}
`;

export const Label = styled.span`
  font-size: ${u(3.1)};
  color: ${({ $active }) => ($active ? "var(--ink)" : "var(--muted-foreground)")};
`;
