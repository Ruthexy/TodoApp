import CalendarCard from "@/components/calendar-card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f8fafc] to-[#e0f2fe] flex flex-col justify-center items-center p-8 font-sans text-center">
      <h1 className="text-[2.5rem] text-[#1e3a8a] font-bold mb-4 [text-shadow:1px_1px_2px_rgba(30,58,138,0.3)]">
        Welcome to your todo app📑</h1>
      <p className="text-[1.1rem] text-[#334155] mb-8 max-w-[90%]">
        Productivity starts here — prioritise, plan, and accomplish.
      </p>
      <CalendarCard />
      <Link
        href="/todos"
        className="bg-green-500 text-white py-3 px-6 text-base font-semibold rounded-lg no-underline shadow-lg transition-all duration-300 ease-in-out hover:bg-green-600 hover:scale-105"
      >
        Click here to get started
      </Link>
    </div>
  );
}
