import styled, { css } from "styled-components";
import { u } from "../../styles/unit";

export const Count = styled.span`
  font-size: ${u(3.8)};
  color: var(--muted-foreground);
`;

export const Empty = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u(3)};
  padding: ${u(8)} ${u(5)};
  border: ${u(0.6)} dashed var(--border);
  border-radius: ${u(6)};
  background: var(--card);
`;

export const EmptyTitle = styled.h2`
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: ${u(6)};
  color: var(--ink);
`;

export const EmptyText = styled.p`
  margin: 0 0 ${u(2)};
  font-size: ${u(3.7)};
  color: var(--muted-foreground);
  text-align: center;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${u(1)} 0 ${u(3.5)};
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${u(3.5)};
`;

export const Card = styled.li`
  position: relative;
  border-radius: ${u(5)};
  background: var(--card);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
`;

export const CardLink = styled.a`
  display: grid;
  grid-template-columns: ${u(20)} 1fr auto;
  align-items: center;
  gap: ${u(3)};
  padding: ${u(3.5)} ${u(3.5)} ${u(9)};
  color: inherit;
  text-decoration: none;
`;

export const Portrait = styled.div`
  width: ${u(20)};
  height: ${u(20)};
  border-radius: ${u(4)};
  background: var(--sky);
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: contain; transform: scale(1.15) translateY(6%); }
`;

export const Info = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${u(1)};
`;

export const Course = styled.h3`
  margin: 0;
  font-size: ${u(4.6)};
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Professor = styled.p`
  margin: 0;
  font-size: ${u(3.4)};
  color: var(--muted-foreground);
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${u(1)};
  margin-top: ${u(0.5)};
`;

export const Chip = styled.span`
  padding: ${u(0.5)} ${u(1.8)};
  border-radius: 999px;
  background: var(--muted);
  font-size: ${u(2.8)};
  color: var(--lavender-strong);
`;

const statusColor = {
  ready: css`background: var(--accent); color: var(--accent-foreground);`,
  success: css`background: var(--mint); color: var(--ink);`,
  fail: css`background: var(--muted); color: var(--muted-foreground);`,
};

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${u(16)};
  height: ${u(16)};
  border-radius: ${u(4)};
  font-family: var(--font-grade);
  font-size: ${u(6.5)};
  ${({ $status }) => statusColor[$status]}

  small {
    font-family: var(--font-ui);
    font-size: ${u(2.7)};
  }
`;

export const EditButton = styled.button`
  position: absolute;
  right: ${u(3.5)};
  bottom: ${u(2.5)};
  display: flex;
  align-items: center;
  gap: ${u(1)};
  padding: ${u(1.2)} ${u(3)};
  border: none;
  border-radius: 999px;
  background: var(--lavender);
  color: var(--ink);
  font-size: ${u(3.1)};

  svg { width: ${u(3.2)}; height: ${u(3.2)}; }
`;
