import { Search, Bell, Menu } from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between w-full h-16 px-4 md:px-6 bg-[#0B0D12] border-b border-[#1F232D]">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[#9BA0B4] hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-[220px] sm:max-w-[280px] md:max-w-[350px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9BA0B4]"
            strokeWidth={1.5}
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-10 bg-[#12151C] border border-[#252A35] rounded-lg pl-10 pr-4 text-sm text-white placeholder:text-[#6F7485] outline-none focus:border-[#9496FF]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 text-[#9BA0B4]" strokeWidth={1.5} />

        <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-white rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-[18px]">D</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
