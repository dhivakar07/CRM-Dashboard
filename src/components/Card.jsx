function Card({ customers }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers.map((c) => (
        <div
          key={c.id}
          className="bg-[#12151C] border border-[#252A35] rounded-xl p-4 hover:border-[#333A4A] transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-semibold text-white">{c.name}</div>
              <div className="text-xs text-[#6F7485]">{c.company}</div>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                c.status === "active"
                  ? "bg-[#3FD68C1c] text-[#3FD68C]"
                  : "bg-[#edf10422] text-[#edf104]"
              }`}
            >
              {c.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="text-sm text-[#9BA0B4] space-y-1">
            <div>{c.email}</div>
            <div className="font-mono text-xs">{c.phone}</div>
          </div>
          <div className="mt-3 pt-3 border-t border-[#252A35] text-xs text-[#6F7485]">
            Last contact: {c.lastContactDate}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Card;
