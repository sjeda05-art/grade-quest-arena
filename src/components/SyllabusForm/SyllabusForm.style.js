import styled, { css } from "styled-components";
import { u } from "../../styles/unit";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${u(3.5)};
`;

export const SectionLabel = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${u(1)} 0 0;
  font-size: ${u(3.6)};
  color: var(--muted-foreground);
`;

export const Total = styled.span`
  padding: ${u(0.8)} ${u(2.5)};
  border-radius: 999px;
  font-size: ${u(3.2)};
  background: ${({ $ok }) => ($ok ? "var(--mint)" : "var(--peach)")};
  color: var(--ink);
`;

export const Avatars = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${u(2)};
`;

export const AvatarOption = styled.button`
  aspect-ratio: 1;
  padding: ${u(1)};
  border: ${u(0.7)} solid transparent;
  border-radius: ${u(3.5)};
  background: var(--background);
  transition: transform 0.15s;

  img { width: 100%; height: 100%; object-fit: contain; }

  ${({ $selected }) =>
    $selected &&
    css`
      border-color: var(--primary);
      background: color-mix(in oklab, var(--primary) 15%, var(--card));
      transform: translateY(-3%);
    `}
`;

export const RatioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${u(2.5)};
`;

export const RatioCell = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: ${u(1.5)} ${u(2)};
  padding: ${u(2.5)} ${u(3)};
  border-radius: ${u(3.5)};
  background: var(--background);
`;

export const RatioName = styled.span`
  font-size: ${u(4)};
  color: var(--ink);
`;

export const RatioInput = styled.input`
  width: 100%;
  padding: ${u(1.8)} ${u(2.5)};
  border: ${u(0.5)} solid var(--input);
  border-radius: ${u(2.5)};
  background: var(--card);
  color: var(--ink);
  font-size: ${u(4.2)};
  text-align: right;
  outline: none;

  &:focus { border-color: var(--ring); }
`;

export const RatioSkill = styled.span`
  grid-column: 1 / -1;
  font-size: ${u(3)};
  color: var(--lavender-strong);
`;
