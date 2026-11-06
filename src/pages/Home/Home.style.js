import styled, { keyframes } from "styled-components";
import { u } from "../../styles/unit";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3%); }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${u(4)} 0 ${u(2)};
`;

export const PowerBadge = styled.button`
  display: flex;
  align-items: center;
  gap: ${u(2)};
  padding: ${u(2.2)} ${u(4.5)} ${u(2.2)} ${u(3)};
  border: ${u(0.6)} solid var(--card);
  border-radius: 999px;
  background: var(--accent);
  color: var(--accent-foreground);
  box-shadow: var(--shadow-soft);

  svg {
    width: ${u(5)};
    height: ${u(5)};
    fill: var(--gold);
  }
`;

export const PowerLabel = styled.span`
  font-size: ${u(3.4)};
`;

export const PowerValue = styled.strong`
  font-family: var(--font-title);
  font-weight: 400;
  font-size: ${u(5.6)};
  color: var(--ink);
`;

export const LogoutButton = styled.button`
  display: grid;
  place-items: center;
  width: ${u(10)};
  height: ${u(10)};
  border: none;
  border-radius: ${u(3)};
  background: var(--card);
  color: var(--muted-foreground);
  box-shadow: var(--shadow-soft);

  svg { width: ${u(4.6)}; height: ${u(4.6)}; }
`;

export const Notice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${u(2)};
  padding: ${u(3)} ${u(4)};
  border-radius: ${u(4)};
  background: var(--peach);
  font-size: ${u(3.6)};
  color: var(--ink);
`;

export const NoticeButton = styled.button`
  padding: ${u(2)} ${u(3)};
  border: none;
  border-radius: 999px;
  background: var(--card);
  color: var(--primary-strong);
  font-size: ${u(3.3)};
`;

export const Stage = styled.section`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${u(6)} 0 ${u(3)};
`;

export const Bubble = styled.p`
  position: relative;
  margin: 0 0 ${u(3)};
  padding: ${u(2.5)} ${u(4.5)};
  border-radius: ${u(5)};
  background: var(--card);
  font-size: ${u(3.8)};
  color: var(--ink);
  box-shadow: var(--shadow-soft);

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: ${u(-2)};
    transform: translateX(-50%) rotate(45deg);
    width: ${u(4)};
    height: ${u(4)};
    background: var(--card);
  }
`;

export const Character = styled.img`
  position: relative;
  z-index: 1;
  width: ${u(62)};
  height: ${u(62)};
  object-fit: contain;
  animation: ${float} 3.2s ease-in-out infinite;
`;

export const Platform = styled.div`
  width: ${u(50)};
  height: ${u(9)};
  margin-top: ${u(-7)};
  border-radius: 50%;
  background: radial-gradient(ellipse, var(--mint) 0%, var(--mint) 55%, transparent 72%);
`;

export const NameTag = styled.div`
  display: flex;
  align-items: center;
  gap: ${u(2)};
  margin-top: ${u(2)};
  padding: ${u(2)} ${u(4)};
  border-radius: 999px;
  background: var(--card);
  font-size: ${u(4.4)};
  color: var(--ink);
  box-shadow: var(--shadow-soft);
`;

export const Rank = styled.span`
  padding: ${u(0.6)} ${u(2.2)};
  border-radius: 999px;
  background: var(--lavender);
  font-size: ${u(3.2)};
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${u(2.5)};
  margin: ${u(3)} 0 ${u(4)};
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u(0.5)};
  padding: ${u(3)} 0;
  border-radius: ${u(4)};
  background: var(--card);
  box-shadow: var(--shadow-soft);
`;

export const StatValue = styled.strong`
  font-family: var(--font-title);
  font-weight: 400;
  font-size: ${u(6)};
  color: var(--primary-strong);
`;

export const StatLabel = styled.span`
  font-size: ${u(3.2)};
  color: var(--muted-foreground);
`;

export const EnterButton = styled.a`
  display: block;
  padding: ${u(4)};
  border-radius: ${u(4.5)};
  background: var(--gradient-primary);
  color: var(--primary-foreground);
  font-size: ${u(4.8)};
  text-align: center;
  text-decoration: none;
  box-shadow: var(--shadow-pop);
`;
