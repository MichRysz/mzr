import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-transparent p-4 flex justify-center items-center">
      <Image 
        src="/logo.png" 
        alt="Logo Rummikub" 
        width={450} 
        height={150} 
        priority
         
      />
    </nav>
  );
}
