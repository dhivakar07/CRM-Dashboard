import { LayoutDashboard, User } from "lucide-react";

const links = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
  },
  {
    icon: User,
    name: "Contacts",
  },
];

function Sidenav() {
  return (
    <section className="bg-[#12151C] w-[18%] h-screen px-4 py-6">
      <header className="pb-8">
        <h1 className="font-bold text-white text-xl">CRM</h1>
      </header>
      <nav>
        <p className="text-[#9BA0B4] text-[11px] font-bold mb-3">WORKSPACE</p>
        <div className="flex flex-col gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className=" flex items-center gap-3 w-full px-2 py-2.5 rounded-lg text-[#9BA0B4] font-semibold hover:bg-[#20233A] hover:text-[#9496FF] transition-all duration-300 text-left"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </section>
  );
}

export default Sidenav;
