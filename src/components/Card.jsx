import { Pencil, Trash2 } from "lucide-react";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
function Card({ customers, onedit, onViewDetails }) {
  const deleteCustomer = useDeleteCustomer();
  const handleDelete = (id) => {
    if (confirm("Delete this customer? This cannot be undone.")) {
      deleteCustomer.mutate(id);
    }
  };
  const avatarColors = [
    "#7A7CFF",
    "#3FD68C",
    "#F5B85C",
    "#FF6B6B",
    "#C46BE0",
    "#4C4FE0",
    "#E0714F",
    "#5DD5D5",
  ];
  function getInitials(name) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers.map((item, index) => (
        <div
          key={item.id}
          onClick={() => onViewDetails(item)}
          className="bg-[#12151C] border border-[#252A35] rounded-xl p-4 hover:border-[#333A4A] transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: avatarColors[index % avatarColors.length],
                }}
              >
                <span className="text-black font-bold text-[18px]">
                  {getInitials(item.name)}
                </span>
              </div>
              <div>
                <div className="font-semibold text-white">{item.name}</div>
                <div className="text-xs text-[#6F7485]">{item.company}</div>
              </div>
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
                onClick={() => {
                  e.stopPropagation();
                  onedit(item);
                }}
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
