import { Link } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Layout from "../../components/Layout/Layout";
import { useGameStore } from "../../lib/gameStore";
import { GRADE_ORDER, SUCCESS_GRADES } from "../../lib/grades";
import { getProfessorAvatar } from "../../data/characters";
import * as C from "../../components/common/Common.style";
import * as S from "./Gallery.style";

export default function Gallery() {
  const dungeons = useGameStore((s) => s.dungeons);

  // 토벌 성공(A+~B0)만, 높은 성적순
  const cleared = dungeons
    .filter((d) => d.result && SUCCESS_GRADES.includes(d.result.grade))
    .sort(
      (a, b) =>
        GRADE_ORDER.indexOf(a.result.grade) - GRADE_ORDER.indexOf(b.result.grade) ||
        (b.result.score ?? 0) - (a.result.score ?? 0),
    );

  return (
    <Layout title="전시관">
      <S.Intro>
        <Trophy /> 토벌한 교수님 {cleared.length}명 · 높은 성적순
      </S.Intro>

      {cleared.length === 0 ? (
        <S.Empty>
          <S.EmptyText>아직 전시할 교수님이 없어요.</S.EmptyText>
          <S.EmptySub>B0 이상으로 토벌하면 이곳에 전시돼요.</S.EmptySub>
          <C.Button as={Link} to="/dungeons">
            던전으로 가기
          </C.Button>
        </S.Empty>
      ) : (
        <S.SwiperWrap>
          <S.Arrow type="button" className="gallery-prev" aria-label="이전 교수님" $side="left">
            <ChevronLeft />
          </S.Arrow>
          <Swiper
            modules={[Navigation, EffectCoverflow]}
            effect="coverflow"
            slidesPerView={3}
            centeredSlides
            grabCursor
            spaceBetween={0}
            navigation={{ prevEl: ".gallery-prev", nextEl: ".gallery-next" }}
            coverflowEffect={{ rotate: 38, stretch: 0, depth: 160, modifier: 1, scale: 0.86, slideShadows: false }}
          >
            {cleared.map((d, i) => {
              const avatar = getProfessorAvatar(d.avatar);
              return (
                <SwiperSlide key={d.id}>
                  <S.Card $grade={d.result.grade}>
                    <S.Rank>#{i + 1}</S.Rank>
                    <S.Photo>
                      <img src={avatar.src} alt={`${d.professor} 교수님`} loading="lazy" width={816} height={816} />
                    </S.Photo>
                    <S.Grade $grade={d.result.grade}>{d.result.grade}</S.Grade>
                    <S.Name>{d.professor}</S.Name>
                    <S.Course>{d.course}</S.Course>
                  </S.Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <S.Arrow type="button" className="gallery-next" aria-label="다음 교수님" $side="right">
            <ChevronRight />
          </S.Arrow>
        </S.SwiperWrap>
      )}
    </Layout>
  );
}
