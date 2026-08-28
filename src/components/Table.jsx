import { Pencil, Trash2 } from "lucide-react";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
function Table({ customers, onedit }) {
  const deleteCustomer = useDeleteCustomer();
  const handleDelete = (id) => {
    if (confirm("Delete this customer? This cannot be undone.")) {
      deleteCustomer.mutate(id);
    }
  };
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
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#252A35] last:border-0 hover:bg-[#181C26]"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="text-xs text-[#6F7485]">{item.email}</div>
                </td>
                <td className="px-4 py-3 text-[#9BA0B4]">{item.company}</td>
                <td className="px-4 py-3 text-[#9BA0B4] font-mono text-xs">
                  {item.phone}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.status === "active"
                        ? "bg-[#3FD68C1c] text-[#3FD68C]"
                        : "bg-[#edf10422] text-[#edf104]"
                    }`}
                  >
                    {item.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#9BA0B4]">
                  {item.lastContactDate}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Pencil
                      className="h-4 w-4 text-[#9BA0B4]"
                      strokeWidth={1.5}
                      onClick={() => onedit(item)}
                    />
                    <Trash2
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDelete(item.id);
                      }}
                      className="h-4 w-4 text-[#9BA0B4]"
                      strokeWidth={1.5}
                    />
                  </div>
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
