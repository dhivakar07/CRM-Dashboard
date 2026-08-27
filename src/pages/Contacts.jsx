import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Table from "../components/Table";
import Card from "../components/Card";
import { Plus, Search, ListFilterPlus, Table2, LayoutGrid } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
function Contacts() {
  const [view, setView] = useState("table");
  const [search, setsearch] = useState("");

  const API_URL = import.meta.env.VITE_SERVER_API;

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(API_URL);
        setCustomers(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const value = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(value) ||
      c.email.toLowerCase().includes(value) ||
      c.company.toLowerCase().includes(value)
    );
  });

  return (
    <section className="flex min-h-screen">
      <Sidenav />
      <main className="w-[82%]">
        <Header />
        <section className="p-6 bg-[#0B0D12] min-h-[calc(100vh-4rem)]">
          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-white">Contacts</h1>
              <p className="text-sm text-[#9BA0B4] mt-1">
                {customers.length} total contacts
              </p>
            </div>
            <button className="flex items-center gap-1.5 bg-[#7A7CFF] px-3 py-2 text-[14px] rounded-lg font-semibold hover:bg-[#7678f492] active:scale-95 transition-all duration-200">
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add contact
            </button>
          </header>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="relative w-[280px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9BA0B4]"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  placeholder="Search by name, email or company..."
                  className="w-full h-9 bg-[#12151C] border border-[#252A35] rounded-lg pl-10 pr-4 text-sm text-white placeholder:text-[#6F7485] outline-none focus:border-[#9496FF] transition-colors"
                />
              </div>
              <div className="h-9 inline-flex items-center gap-2 px-2 bg-[#12151C] rounded-lg text-[#9BA0B4] border border-[#252A35]">
                <ListFilterPlus className="h-4 w-4" strokeWidth={1.5} />
                Filter
              </div>
            </div>
            <div className="flex items-center p-1 bg-[#12151C] rounded-lg border border-[#252A35]">
              <button
                onClick={() => setView("table")}
                className={`h-8 flex items-center gap-1.5 px-3 rounded-md text-sm transition-all ${
                  view === "table"
                    ? "bg-[#20233A] text-[#9496FF]"
                    : "text-[#9BA0B4] hover:text-white"
                }`}
              >
                <Table2 className="h-4 w-4" />
                Table
              </button>
              <button
                onClick={() => setView("card")}
                className={`h-8 flex items-center gap-1.5 px-3 rounded-md text-sm transition-all ${
                  view === "card"
                    ? "bg-[#20233A] text-[#9496FF]"
                    : "text-[#9BA0B4] hover:text-white"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Card
              </button>
            </div>
          </div>
          {loading && <p className="text-[#9BA0B4]">Loading customers…</p>}
          {error && (
            <p className="text-red-400">Something went wrong: {error}</p>
          )}

          {!loading &&
            !error &&
            (view === "table" ? (
              <Table customers={filteredCustomers} />
            ) : (
              <Card customers={filteredCustomers} />
            ))}
        </section>
      </main>
    </section>
  );
}
export default Contacts;
