import { LayoutDashboard, User, X } from "lucide-react";
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

function Sidenav({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <section
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] lg:w-[18%] bg-[#12151C] px-4 py-6 border-r border-[#1F232D] transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <header className="flex items-center justify-between pb-8">
          <h1 className="font-bold text-white text-xl">CRM</h1>

          <button
            onClick={onClose}
            className="lg:hidden text-[#9BA0B4] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
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
                  onClick={onClose}
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
    </>
  );
}

export default Sidenav;
