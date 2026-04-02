"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/web3/wagmi";
import { useChainSync } from "@/hooks/useChainSync";

const queryClient = new QueryClient();

// 自定义 RainbowKit 主题，匹配项目设计风格
const customTheme = lightTheme({
  borderRadius: "none",
  fontStack: "system",
  overlayBlur: "small",
});

// 内部组件，用于同步链 ID
function ChainSyncWrapper({ children }: { children: React.ReactNode }) {
  useChainSync();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={customTheme}
          modalSize="compact"
        >
          <ChainSyncWrapper>
            {children}
          </ChainSyncWrapper>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
