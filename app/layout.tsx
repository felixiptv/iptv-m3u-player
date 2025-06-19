import "./globals.css";

export const metadata = {
  title: "M3U8 IPTV Player",
  description: "Paste your M3U8 playlist and start watching",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}