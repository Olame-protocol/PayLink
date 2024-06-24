import { create } from "zustand";

type BalanceStore = {
    cUSDBalance: string;
    setcUSDBalance: (balance: string) => void;
}
export const useBalanceStore = create<BalanceStore>((set) => ({
  cUSDBalance: "0.0",
  setcUSDBalance: (balance: string) => set((state) => ({ ...state, cUSDBalance: balance })),
}));
