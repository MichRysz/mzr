import Link from "next/link";

export default function Liga() {
  return (
    <div className="flex flex-col text-white ">
      <h1 className="text-4xl font-bold">Strona Główna Ligi</h1>
      <p className="mt-4 text-lg">Wybierz swoją ligę:</p>
      <div className="mt-6 flex space-x-4">
        <Link href="/liga/pierwsza">
          <button className="px-6 py-3 bg-white text-red-700 rounded-md hover:bg-gray-300 transition">
            Pierwsza Liga
          </button>
        </Link>
        <Link href="/liga/druga">
          <button className="px-6 py-3 bg-white text-red-700 rounded-md hover:bg-gray-300 transition">
            Druga Liga
          </button>
        </Link>
      </div>
    </div>
  );
}
