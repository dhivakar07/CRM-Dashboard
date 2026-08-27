function Table({ customers }) {
  return (
    <>
      <div className="bg-[#12151C] border border-[#252A35] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-[#6F7485] border-b border-[#252A35]">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last contact</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-b border-[#252A35] last:border-0 hover:bg-[#181C26]"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-white">{c.name}</div>
                  <div className="text-xs text-[#6F7485]">{c.email}</div>
                </td>
                <td className="px-4 py-3 text-[#9BA0B4]">{c.company}</td>
                <td className="px-4 py-3 text-[#9BA0B4] font-mono text-xs">
                  {c.phone}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      c.status === "active"
                        ? "bg-[#3FD68C1c] text-[#3FD68C]"
                        : "bg-[#edf10422] text-[#edf104]"
                    }`}
                  >
                    {c.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#9BA0B4]">
                  {c.lastContactDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
