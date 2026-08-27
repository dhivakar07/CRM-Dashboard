import { Search, Bell } from "lucide-react";
function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-6 bg-[#0B0D12] border-b border-[#1F232D] transition-all duration-300">
      <div className="relative w-[350px]">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9BA0B4]"
          strokeWidth={1.5}
        />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full h-10 bg-[#12151C] border border-[#252A35] rounded-lg pl-10 pr-4 text-sm text-white placeholder:text-[#6F7485] outline-none focus:border-[#9496FF] transition-colors"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center">
          <Bell
            className="h-5 w-5 text-[#9BA0B4] hover:text-white transition-colors"
            strokeWidth={1.5}
          />
        </button>
        <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-white rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-[18px]">D</span>
        </div>
      </div>
    </header>
  );
}
export default Header;
