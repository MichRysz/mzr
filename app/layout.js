import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../app/globals.css"; // Import Tailwind CSS

export const metadata = {
  title: "Rummikub",
  description: "Strona turniejowa Rummikub",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className="min-h-screen flex flex-col bg-gradient-to-tr from-[#bb0808] to-[#ff7878]">

        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow p-6 text-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
