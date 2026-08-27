import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import { User, Activity } from "lucide-react";

const list = [
  {
    icon: User,
    perc: "3.2%",
    data: "14,782",
    name: "Total customers",
  },
  {
    icon: Activity,
    perc: "5.8%",
    data: "3,105",
    name: "Active leads",
  },
];

function Dashboard() {
  return (
    <section className="flex min-h-screen">
      <Sidenav />
      <main className="w-[82%]">
        <Header />
        <section className="p-6 bg-[#0B0D12] min-h-[calc(100vh-4rem)]">
          <header>
            <h2 className="text-2xl text-white font-bold">Dashboard</h2>
            <p className="text-[#9BA0B4] text-sm mt-1">
              Here's what's happening across your pipeline
            </p>
          </header>
          <div className="flex gap-4 items-center mt-6">
            {list.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="w-[220px] bg-[#12151C] p-4 rounded-xl border border-[#252A35]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 flex items-center justify-center bg-[#1C2029] rounded-lg mb-2">
                      <Icon
                        className="h-5 w-5 text-bold text-[#9496FF]"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div>
                      <span className="flex items-center justify-center px-2 py-1 bg-[#172A28] text-green-500 rounded-full text-[10px] font-semibold">
                        {item.perc}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.data}</h3>
                  <p className="text-sm text-[#9BA0B4] mt-1">{item.name}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </section>
  );
}

export default Dashboard;
