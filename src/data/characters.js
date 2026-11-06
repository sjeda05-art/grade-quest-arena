import studentImg from "../assets/char-student.png";
import prof1Img from "../assets/char-prof1.png";
import prof2Img from "../assets/char-prof2.png";
import prof3Img from "../assets/char-prof3.png";
import prof4Img from "../assets/char-prof4.png";
import angelImg from "../assets/char-angel.png";

// 나중에 설정 화면에서 사용자가 캐릭터를 고를 수 있도록 목록 형태로 둡니다.
export const STUDENT_AVATARS = [{ key: "student1", label: "F급 용사", src: studentImg }];

export const PROFESSOR_AVATARS = [
  { key: "prof1", label: "물리학 할아버지", src: prof1Img },
  { key: "prof2", label: "빨간펜 마스터", src: prof2Img },
  { key: "prof3", label: "실험실 괴짜", src: prof3Img },
  { key: "prof4", label: "우아한 원로", src: prof4Img },
];

export const ANGEL = { key: "angel", label: "대천사", src: angelImg };

export const getProfessorAvatar = (key) =>
  PROFESSOR_AVATARS.find((a) => a.key === key) ?? PROFESSOR_AVATARS[0];

export const getStudentAvatar = (key) =>
  STUDENT_AVATARS.find((a) => a.key === key) ?? STUDENT_AVATARS[0];
