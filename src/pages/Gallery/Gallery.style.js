import styled, { css } from "styled-components";
import { u } from "../../styles/unit";

export const Intro = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${u(1.5)};
  margin: ${u(2)} 0 ${u(6)};
  font-size: ${u(3.8)};
  color: var(--muted-foreground);

  svg { width: ${u(4.5)}; height: ${u(4.5)}; color: var(--gold); }
`;

export const Empty = styled.div`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${u(2.5)};
  padding: ${u(10)} ${u(5)};
  border-radius: ${u(6)};
  background: var(--card);
`;

export const EmptyText = styled.p`
  margin: 0;
  font-size: ${u(4.6)};
  color: var(--ink);
`;

export const EmptySub = styled.p`
  margin: 0 0 ${u(2)};
  font-size: ${u(3.5)};
  color: var(--muted-foreground);
`;

export const SwiperWrap = styled.div`
  position: relative;
  margin: 0 ${u(-4)};
  padding: ${u(4)} ${u(8)};

  .swiper {
    padding: ${u(10)} 0;
  }

  .swiper-slide {
    transition: opacity 0.35s ease, filter 0.35s ease;
    opacity: 0;
  }

  /* 양옆 카드: 비스듬히 + 반투명 */
  .swiper-slide-prev,
  .swiper-slide-next {
    opacity: 0.5;
    filter: saturate(0.6);
  }

  /* 가운데 카드: 가장 크게 */
  .swiper-slide-active {
    opacity: 1;
    filter: none;
    z-index: 3;
  }

  .swiper-slide > article {
    transition: transform 0.35s ease;
  }

  .swiper-slide-active > article {
    transform: scale(1.32);
  }
`;

export const Arrow = styled.button`
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: ${u(7.5)};
  height: ${u(7.5)};
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--card);
  color: var(--ink);
  box-shadow: var(--shadow-soft);
  ${({ $side }) => ($side === "left" ? css`left: ${u(1)};` : css`right: ${u(1)};`)}

  svg { width: ${u(4.5)}; height: ${u(4.5)}; }

  &.swiper-button-disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const gradeTone = (grade) =>
  grade === "A+"
    ? "var(--gold)"
    : grade === "A0"
      ? "var(--primary)"
      : grade === "B+"
        ? "var(--sky)"
        : "var(--mint)";

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${u(3)} ${u(2)} ${u(4)};
  border-radius: ${u(5)};
  background: var(--card);
  border: ${u(0.8)} solid ${({ $grade }) => gradeTone($grade)};
  box-shadow: var(--shadow-card);
`;

export const Rank = styled.span`
  position: absolute;
  top: ${u(2)};
  left: ${u(2.5)};
  font-family: var(--font-title);
  font-size: ${u(3.6)};
  color: var(--muted-foreground);
`;

export const Photo = styled.div`
  width: 100%;
  aspect-ratio: 1;
  margin-top: ${u(3)};
  border-radius: ${u(4)};
  background: var(--gradient-page);
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: contain; }
`;

export const Grade = styled.strong`
  margin-top: ${u(-4)};
  padding: ${u(0.8)} ${u(3.5)};
  border-radius: 999px;
  background: ${({ $grade }) => gradeTone($grade)};
  color: var(--ink);
  font-family: var(--font-grade);
  font-weight: 400;
  font-size: ${u(6)};
  box-shadow: var(--shadow-soft);
`;

export const Name = styled.h3`
  margin: ${u(2)} 0 0;
  font-size: ${u(3.9)};
  color: var(--ink);
  white-space: nowrap;
`;

export const Course = styled.p`
  margin: ${u(0.5)} 0 0;
  font-size: ${u(2.9)};
  color: var(--muted-foreground);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;
