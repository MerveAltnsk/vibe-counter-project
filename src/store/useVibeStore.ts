import { create } from 'zustand';

interface VibeState {
  count: number;
  walletAddress: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  setCount: (count: number) => void;
  setWalletAddress: (address: string | null) => void;
  setIsConnected: (isConnected: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useVibeStore = create<VibeState>((set) => ({
  count: 0,
  walletAddress: null,
  isConnected: false,
  isLoading: false,
  error: null,
  setCount: (count) => set({ count }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
})); 