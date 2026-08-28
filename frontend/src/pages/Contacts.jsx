import { Plus, Search, ListFilterPlus, Table2, LayoutGrid } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Table from "../components/Table";
import Card from "../components/Card";
import { useCustomers } from "../hooks/useCustomers";
import EditCustomer from "../components/EditCustomer";
import AddCustomer from "../components/AddCustomer";
import FilterCustomer from "../components/FilterCustomer";
import CustomerDetails from "../components/CustomerDetails";

function Contacts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState("table");
  const [search, setsearch] = useState("");
  const [edit, setedit] = useState(null);
  const [addopen, setaddopen] = useState(false);
  const [details, setdetails] = useState(null);

  const [filters, setfilters] = useState({
    status: [],
    company: "",
    dateFrom: "",
    dateTo: "",
    phone: "",
    email: "",
  });
  const [filteropen, setfilteropen] = useState(false);

  const { data: customers = [], isLoading, isError, error } = useCustomers();

  const companies = [...new Set(customers.map((item) => item.company))];

  const filteredCustomers = customers.filter((c) => {
    const entValue = search.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(entValue) ||
      c.email.toLowerCase().includes(entValue) ||
      c.company.toLowerCase().includes(entValue);

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(c.status);
    const matchesCompany = !filters.company || c.company === filters.company;
    const matchesDateFrom =
      !filters.dateFrom || c.lastContactDate >= filters.dateFrom;
    const matchesDateTo =
      !filters.dateTo || c.lastContactDate <= filters.dateTo;
    const matchesPhone = !filters.phone || c.phone.includes(filters.phone);
    const matchesEmail =
      !filters.email ||
      c.email.toLowerCase().includes(filters.email.toLowerCase());

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCompany &&
      matchesDateFrom &&
      matchesDateTo &&
      matchesPhone &&
      matchesEmail
    );
  });
  return (
    <section className="flex min-h-screen">
      <Sidenav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="w-full lg:w-[82%] min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <section className="p-4 sm:p-5 md:p-6 bg-[#0B0D12] min-h-[calc(100vh-4rem)]">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div>
              <h1 className="test-xl smtext-2xl font-bold text-white">
                Contacts
              </h1>
              <p className="text-xs sm:text-sm text-[#9BA0B4] mt-1">
                {customers.length} total contacts
              </p>
            </div>
            <button
              className="flex items-center justify-center gap-1.5 bg-[#7A7CFF] px-3 py-2 text-[14px] text-white rounded-lg font-semibold hover:bg-[#696BEE] active:scale-95 transition-all duration-200 w-full sm:w-auto"
              onClick={() => setaddopen(true)}
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              Add contact
            </button>
          </header>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-[280px] md:w-[320px]">
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
              <div
                onClick={() => setfilteropen(true)}
                className="h-9 inline-flex items-center justify-center gap-2 px-3 bg-[#12151C] rounded-lg text-[#9BA0B4] border border-[#252A35] hover:text-white hover:bg-[#181C26] transition-colors w-full sm:w-auto"
              >
                <ListFilterPlus className="h-4 w-4" strokeWidth={1.5} />
                Filter
              </div>
            </div>
            <div className="flex items-center p-1 bg-[#12151C] rounded-lg border border-[#252A35] w-full sm:w-fit">
              <button
                onClick={() => setView("table")}
                className={` h-8 flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 rounded-md text-sm transition-all
                  ${view === "table" ? "bg-[#20233A] text-[#9496FF]" : "text-[#9BA0B4] hover:text-white"}`}
              >
                <Table2 className="h-4 w-4" />
                Table
              </button>
              <button
                onClick={() => setView("card")}
                className={` h-8 flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 rounded-md text-sm transition-all
                  ${view === "card" ? "bg-[#20233A] text-[#9496FF]" : "text-[#9BA0B4] hover:text-white"}`}
              >
                <LayoutGrid className="h-4 w-4" />
                Card
              </button>
            </div>
          </div>
          {isLoading && <p className="text-[#9BA0B4]">Loading customers…</p>}
          {isError && (
            <p className="text-red-400">
              Something went wrong: {error.message}
            </p>
          )}

          <div className="w-full min-w-0 overflow-x-auto">
            {!isLoading &&
              !isError &&
              (view === "table" ? (
                <Table
                  customers={filteredCustomers}
                  onedit={setedit}
                  onViewDetails={setdetails}
                />
              ) : (
                <Card
                  customers={filteredCustomers}
                  onedit={setedit}
                  onViewDetails={setdetails}
                />
              ))}
          </div>

          <EditCustomer customer={edit} onClose={() => setedit(null)} />

          <AddCustomer isOpen={addopen} onClose={() => setaddopen(false)} />

          <FilterCustomer
            isOpen={filteropen}
            onClose={() => setfilteropen(false)}
            filters={filters}
            setfilters={setfilters}
            companies={companies}
          />

          <CustomerDetails
            customer={details}
            onClose={() => setdetails(null)}
            onedit={setedit}
          />
        </section>
      </main>
    </section>
  );
}
export default Contacts;
