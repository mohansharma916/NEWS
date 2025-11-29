import { create } from "zustand";

type NavState = {
  Number: number;
  Width: number;
  Left: number;
  setNumber: (value: number) => void;
  setWidth: (value: number) => void;
  setLeft: (value: number) => void;
};

export const useNavStore = create<NavState>()((set) => ({
  Number: -1,
  Width: 0,
  Left: 0,
  setNumber: (value) => set(() => ({ Number: value })),
  setWidth: (value) => set(() => ({ Width: value })),
  setLeft: (value) => set(() => ({ Left: value })),
}));

type SearchStore = {
  Search: string;
  setSearch: (value: string) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
  Search: "",
  setSearch: (value) => set(() => ({ Search: value })),
}));
