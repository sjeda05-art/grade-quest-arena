import styled from "styled-components";
import { u } from "../../styles/unit";

export const Page = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ $hideNav }) => ($hideNav ? "0" : u(22))};
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${u(2)};
  padding: ${u(3.5)} ${u(4)};
  background: color-mix(in oklab, var(--background) 80%, transparent);
  backdrop-filter: blur(8px);
`;

export const Title = styled.h1`
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: ${u(5.6)};
  color: var(--ink);
  letter-spacing: 0.02em;
`;

export const IconButton = styled.button`
  display: grid;
  place-items: center;
  width: ${u(10)};
  height: ${u(10)};
  border: none;
  border-radius: ${u(3)};
  background: var(--card);
  color: var(--ink);
  box-shadow: var(--shadow-soft);

  svg {
    width: ${u(5)};
    height: ${u(5)};
  }
`;

export const HeaderSpacer = styled.span`
  width: ${u(10)};
`;

export const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 ${u(4)} ${u(4)};
`;
