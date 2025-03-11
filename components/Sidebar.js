"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-transparent p-4 h-full">
      <ul className="flex flex-col space-y-4 text-lg">
        {/* HOME */}
        <li>
          <Link href="/">
            <button className="relative w-48 h-12 flex items-center justify-center transform transition-transform hover:scale-105 text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              <span className="relative z-10">Home</span>
              <span className="absolute z-0 left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-500 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>

        {/* LIGA */}
        <li>
          <Link href="/liga">
            <button className="relative w-48 h-12 flex items-center justify-center transform transition-transform hover:scale-105 text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              <span className="relative z-10">Liga</span>
              <span className="absolute z-0 left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-500 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>

        {/* TURNIEJE */}
        <li>
          <Link href="/turnieje">
            <button className="relative w-48 h-12 flex items-center justify-center transform transition-transform hover:scale-105 text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              <span className="relative z-10">Turnieje</span>
              <span className="absolute z-0 left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-500 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>

        {/* REGULAMIN */}
        <li>
          <Link href="/regulamin">
            <button className="relative w-48 h-12 flex items-center justify-center transform transition-transform hover:scale-105 text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              <span className="relative z-10">Regulamin</span>
              <span className="absolute z-0 left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-500 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>

        {/* REJESTRACJA */}
        <li>
          <Link href="/register">
            <button className="relative w-48 h-12 flex items-center justify-center transform transition-transform hover:scale-105 text-white rounded-md bg-gradient-to-tr from-[#bb0808] to-[#ff7878] hover:from-[#ff7878] hover:to-[#bb0808] overflow-hidden group shadow-[6px_6px_12px_rgba(0,0,0,0.8)] hover:shadow-[10px_10px_18px_rgba(0,0,0,1)]">
              <span className="relative z-10">Rejestracja</span>
              <span className="absolute z-0 left-[-70%] top-[-50%] w-[50px] h-[100px] bg-white bg-opacity-50 transform skew-x-[-15deg] transition-all duration-500 group-hover:left-[110%]"></span>
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
