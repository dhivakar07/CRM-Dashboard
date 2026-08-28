import { Pencil, Trash2 } from "lucide-react";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
function Card({ customers, onedit }) {
  const deleteCustomer = useDeleteCustomer();
  const handleDelete = (id) => {
    if (confirm("Delete this customer? This cannot be undone.")) {
      deleteCustomer.mutate(id);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers.map((item) => (
        <div
          key={item.id}
          className="bg-[#12151C] border border-[#252A35] rounded-xl p-4 hover:border-[#333A4A] transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-semibold text-white">{item.name}</div>
              <div className="text-xs text-[#6F7485]">{item.company}</div>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                item.status === "active"
                  ? "bg-[#3FD68C1c] text-[#3FD68C]"
                  : "bg-[#edf10422] text-[#edf104]"
              }`}
            >
              {item.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="text-sm text-[#9BA0B4] space-y-1">
            <div>{item.email}</div>
            <div className="font-mono text-xs">{item.phone}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="mt-3 pt-3 border-t border-[#252A35] text-xs text-[#6F7485]">
              Last contact: {item.lastContactDate}
            </div>
            <div className="flex items-center gap-3">
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
          </div>
        </div>
      ))}
    </div>
  );
}
export default Card;
