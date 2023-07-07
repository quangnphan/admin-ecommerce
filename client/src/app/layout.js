import "./styles/globals.css";
import { Providers } from "@/redux/provider";

export const metadata = {
  title: "Admin Dashboard",
  description: "Backend for E-commerce application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
