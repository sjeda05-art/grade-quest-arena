import { useState } from "react";
import Intro from "../Intro/Intro";
import Login from "../Login/Login";

// 초기화면(타이포그래피) → 2초간 희미해짐 → 로그인 화면
export default function Start() {
  const [introDone, setIntroDone] = useState(false);
  return introDone ? <Login /> : <Intro onDone={() => setIntroDone(true)} />;
}
