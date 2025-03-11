import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../app/globals.css"; // Import Tailwind CSS

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className="min-h-screen flex flex-col bg-gradient-to-tr from-red-900 to-red-400">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-red-900 to-red-500 -z-10 fixed" />
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow p-6 text-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
