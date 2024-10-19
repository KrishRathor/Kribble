import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { SocketProvider } from "@/context/SocketProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <RecoilRoot>
      <SocketProvider>
        <SessionProvider session={session}>
          <main className={`font-sans ${inter.variable}`}>
            <Component {...pageProps} />
          </main>
        </SessionProvider>
      </SocketProvider>
    </RecoilRoot>
  );
};

export default api.withTRPC(MyApp);
