import { LayoutDashboard, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: User,
    name: "Contacts",
    path: "/contacts",
  },
];

function Sidenav() {
  return (
    <section className="sticky top-0 bg-[#12151C] w-[18%] h-screen px-4 py-6 border-r border-[#1F232D]">
      <header className="pb-8">
        <h1 className="font-bold text-white text-xl">CRM</h1>
      </header>
      <nav>
        <p className="text-[#9BA0B4] text-[11px] font-bold mb-3">WORKSPACE</p>
        <div className="flex flex-col gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-2 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[#20233A] text-[#9496FF]"
                      : "text-[#9BA0B4] hover:bg-[#20233A] hover:text-[#9496FF]"
                  }`
                }
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </section>
  );
}

export default Sidenav;
