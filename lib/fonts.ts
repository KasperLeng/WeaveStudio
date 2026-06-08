import localFont from "next/font/local";
import { Ubuntu } from 'next/font/google'

export const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ubuntu',
})

export const dirtyline = localFont({
  src: "./fonts/Dirtyline.otf",
  variable: "--font-dirtyline",
  display: "swap",
});
