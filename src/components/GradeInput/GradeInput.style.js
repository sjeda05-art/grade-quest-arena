import styled from "styled-components";
import { u } from "../../styles/unit";

export const Desc = styled.p`
  margin: 0 0 ${u(4)};
  font-size: ${u(3.6)};
  color: var(--muted-foreground);
  text-align: center;
  line-height: 1.5;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${u(2.5)};
  margin-bottom: ${u(5)};
`;

export const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u(1.5)};
  padding: ${u(2.5)} ${u(1.5)};
  border-radius: ${u(3.5)};
  background: var(--background);
`;

export const Grade = styled.span`
  font-family: var(--font-title);
  font-size: ${u(5.5)};
  color: ${({ $grade }) =>
    $grade.startsWith("A") ? "var(--primary-strong)" : $grade.startsWith("B") ? "var(--lavender-strong)" : "var(--muted-foreground)"};
`;

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: ${u(1.5)};
`;

export const Step = styled.button`
  display: grid;
  place-items: center;
  width: ${u(7)};
  height: ${u(7)};
  border: none;
  border-radius: 50%;
  background: var(--lavender);
  color: var(--ink);

  svg { width: ${u(3.5)}; height: ${u(3.5)}; }
`;

export const Count = styled.span`
  min-width: ${u(5)};
  text-align: center;
  font-size: ${u(4.6)};
  color: var(--ink);
`;
