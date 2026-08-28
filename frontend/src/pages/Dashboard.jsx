import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import { User, Activity, TrendingDown, Check } from "lucide-react";
import { useCustomers } from "../hooks/useCustomers";
import { useState } from "react";

function Dashboard() {
  const { data: customers = [] } = useCustomers();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activecount = customers.filter(
    (item) => item.status === "active",
  ).length;
  const inactive = customers.filter(
    (item) => item.status === "inactive",
  ).length;

  const list = [
    {
      icon: User,
      perc: "3.2%",
      data: customers.length,
      name: "Total customers",
    },
    {
      icon: Activity,
      perc: "5.8%",
      data: activecount,
      name: "Active leads",
    },
    {
      icon: TrendingDown,
      perc: "2.8%",
      data: inactive,
      name: "Inactive leads",
    },
    {
      icon: Check,
      perc: "1.8%",
      data: 8,
      name: "Tasks due this week",
    },
  ];

  return (
    <section className="flex  min-h-screen">
      <Sidenav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="w-full md:w-[75%] lg:w-[82%]">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <section className="p-4 sm:p-5 md:p-6 bg-[#0B0D12] min-h-[calc(100vh-4rem)]">
          <header>
            <h2 className="sm:text-2xl text-xl text-white font-bold">
              Dashboard
            </h2>
            <p className="text-[#9BA0B4] text-xs sm:text-sm mt-1">
              Here's what's happening across your pipeline
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {list.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="w-full bg-[#12151C] p-4 rounded-xl border border-[#252A35]"
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
