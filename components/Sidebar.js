import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-transparent p-4 h-screen">
      <ul className="flex flex-col space-y-4 text-lg">
        <li>
          <Link href="/">
            <button className="relative w-48 h-12 flex items-center justify-center border border-white text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] transition overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              Home
              <span className="absolute left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-600 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>
        <li>
          <Link href="/liga">
            <button className="relative w-48 h-12 flex items-center justify-center border border-white text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] transition overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              Liga
              <span className="absolute left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-600 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>
        <li>
          <Link href="/turnieje">
            <button className="relative w-48 h-12 flex items-center justify-center border border-white text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] transition overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              Turnieje
              <span className="absolute left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-600 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>
        <li>
          <Link href="/regulamin">
            <button className="relative w-48 h-12 flex items-center justify-center border border-white text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] transition overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              Regulamin
              <span className="absolute left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-600 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
