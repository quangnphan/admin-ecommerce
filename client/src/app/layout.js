import "./styles/globals.css";
import { Providers } from "@/redux/provider";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Admin Dashboard",
  description: "Backend for E-commerce application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
              <Navbar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
