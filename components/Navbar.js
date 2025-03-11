import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-transparent p-4 flex items-center justify-between relative border-b border-white border-opacity-50">
      

      {/* Logo na środku */}
      <div className="flex-grow flex justify-center">
        <Image
          src="/logo.png"
          alt="Logo Rummikub"
          width={450}
          height={150}
          priority
        />
      </div>
    </nav>
  );
}
