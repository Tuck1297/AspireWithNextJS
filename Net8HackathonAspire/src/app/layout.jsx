import { Inter } from "next/font/google";
import "@/styles/Global.css";
import '@/styles/custom.scss';
import PageWrapper from "@/components/PageWrapper";

const inter = Inter({ subsets: ["latin"] });
const baseUrl = process.env["services__aspirewithnextjs.webapi__1"]

export const metadata = {
  title: "NetHackathonApp",
  description:
    "Created by Tucker Johnson in participation of the Net8 Hackathon in 2023.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageWrapper baseUrl={baseUrl}>{children}</PageWrapper>
      </body>
    </html>
  );
}
