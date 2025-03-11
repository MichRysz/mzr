import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-transparent p-4 h-screen">
      <ul className="space-y-4 text-lg">
        <li><Link href="/liga" className="hover:text-white">Liga</Link></li>
        <li><Link href="/turnieje" className="hover:text-white">Turnieje</Link></li>
        <li><Link href="/regulamin" className="hover:text-white">Regulamin</Link></li>
      </ul>
    </aside>
  );
}
