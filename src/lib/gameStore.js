import { useSyncExternalStore } from "react";

// 데모용 저장소: 이 브라우저(localStorage)에만 저장됩니다.
const KEY = "hakjeom-jeonseon-v1";
const DEFAULT_STATE = { user: null, baseGrades: null, dungeons: [] };

let state = DEFAULT_STATE;
let loaded = false;
const listeners = new Set();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    state = DEFAULT_STATE;
  }
}

function setState(updater) {
  load();
  state = typeof updater === "function" ? updater(state) : updater;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* 저장 공간이 없을 때는 메모리에만 유지 */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

export function useGameStore(selector = (s) => s) {
  const snap = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_STATE);
  return selector(snap);
}

const newId = () => `d${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const actions = {
  login(name) {
    setState((s) => ({ ...s, user: { name } }));
  },
  logout() {
    setState((s) => ({ ...s, user: null }));
  },
  setBaseGrades(baseGrades) {
    setState((s) => ({ ...s, baseGrades }));
  },
  createDungeon(data) {
    const dungeon = { id: newId(), result: null, ...data };
    setState((s) => ({ ...s, dungeons: [...s.dungeons, dungeon] }));
    return dungeon.id;
  },
  updateDungeon(id, data) {
    setState((s) => ({ ...s, dungeons: s.dungeons.map((d) => (d.id === id ? { ...d, ...data } : d)) }));
  },
  deleteDungeon(id) {
    setState((s) => ({ ...s, dungeons: s.dungeons.filter((d) => d.id !== id) }));
  },
  saveResult(id, result) {
    setState((s) => ({
      ...s,
      dungeons: s.dungeons.map((d) => (d.id === id ? { ...d, result: { ...result, date: Date.now() } } : d)),
    }));
  },
  loadSampleDungeons() {
    const samples = [
      { course: "일반물리학", professor: "김뉴턴", avatar: "prof1", ratio: { attendance: 10, assignment: 20, midterm: 30, final: 40 }, result: { grade: "A+", score: 96, success: true } },
      { course: "글쓰기와 표현", professor: "박빨펜", avatar: "prof2", ratio: { attendance: 20, assignment: 30, midterm: 20, final: 30 }, result: { grade: "A0", score: 91, success: true } },
      { course: "유기화학실험", professor: "이플라스크", avatar: "prof3", ratio: { attendance: 20, assignment: 20, midterm: 30, final: 30 }, result: { grade: "B+", score: 86, success: true } },
      { course: "서양미술사", professor: "최우아", avatar: "prof4", ratio: { attendance: 10, assignment: 10, midterm: 40, final: 40 }, result: { grade: "B0", score: 81, success: true } },
      { course: "선형대수", professor: "정행렬", avatar: "prof1", ratio: { attendance: 10, assignment: 20, midterm: 35, final: 35 }, result: { grade: "C+", score: 76, success: false } },
      { course: "경영학원론", professor: "한마케팅", avatar: "prof2", ratio: { attendance: 20, assignment: 20, midterm: 30, final: 30 }, result: null },
    ];
    setState((s) => ({ ...s, dungeons: [...s.dungeons, ...samples.map((d) => ({ id: newId(), ...d }))] }));
  },
};
