function FilterCustomer({
  isOpen,
  onClose,
  filters,
  setfilters,
  companies = [],
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleStatus = (status) => {
    setfilters((prev) => ({
      ...prev,
      status: prev.status?.includes(status)
        ? prev.status.filter((item) => item !== status)
        : [...(prev.status || []), status],
    }));
  };

  const clearAll = () => {
    setfilters({
      status: [],
      company: "",
      dateFrom: "",
      dateTo: "",
      phone: "",
      email: "",
    });
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />
      <aside className="fixed top-0 right-0 h-screen w-[320px] bg-[#12151C] border-l border-[#252A35] p-5 z-50 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold text-lg">Filters</h2>
          <button
            onClick={onClose}
            className="text-[#9BA0B4] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div>
          <label className="text-xs text-[#9BA0B4] block mb-2">Status</label>
          <div className="flex flex-col gap-2">
            {["active", "inactive"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 text-sm text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.status?.includes(status) || false}
                  onChange={() => toggleStatus(status)}
                />

                <span className="capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-[#9BA0B4] block mb-1">Company</label>
          <select
            name="company"
            value={filters.company || ""}
            onChange={handleChange}
            className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#9496FF]"
          >
            <option value="">All companies</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-[#9BA0B4] block mb-1">
            Last contact from
          </label>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom || ""}
            onChange={handleChange}
            className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#9496FF]"
          />
        </div>
        <div>
          <label className="text-xs text-[#9BA0B4] block mb-1">
            Last contact to
          </label>
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo || ""}
            onChange={handleChange}
            className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#9496FF]"
          />
        </div>
        <div>
          <label className="text-xs text-[#9BA0B4] block mb-1">
            Phone contains
          </label>
          <input
            type="text"
            name="phone"
            value={filters.phone || ""}
            onChange={handleChange}
            placeholder="Enter phone..."
            className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#6F7485] outline-none focus:border-[#9496FF]"
          />
        </div>
        <div>
          <label className="text-xs text-[#9BA0B4] block mb-1">
            Email contains
          </label>
          <input
            type="text"
            name="email"
            value={filters.email || ""}
            onChange={handleChange}
            placeholder="Enter email..."
            className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#6F7485] outline-none focus:border-[#9496FF]"
          />
        </div>
        <button
          onClick={clearAll}
          className="mt-auto py-2 text-sm text-[#9BA0B4] border border-[#252A35] rounded-lg hover:bg-[#181C26] hover:text-white transition-all"
        >
          Clear all
        </button>
      </aside>
    </>
  );
}

export default FilterCustomer;
