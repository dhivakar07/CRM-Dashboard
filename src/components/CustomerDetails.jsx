import { Pencil, Trash2, X } from "lucide-react";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
function CustomerDetails({ customer, onClose, onedit }) {
  if (!customer) return null;
  const deleteCustomer = useDeleteCustomer();

  const handleDelete = (id) => {
    if (confirm("Delete this customer? This cannot be undone.")) {
      deleteCustomer.mutate(id);
    }
  };
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/80 z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-[420px] bg-[#12151C] border border-[#252A35] rounded-2xl p-4 shadow-2xl pointer-events-auto">
          <div className="flex items-center justify-between border-b border-[#9ba0b46f] p-2">
            <h2 className="text-white">Customer Detail</h2>
            <button
              onClick={onClose}
              className="text-[#9BA0B4] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-[#7A7CFF] to-purple-500">
                <span className="text-white font-bold text-sm">
                  {customer.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-white font-semibold text-base">
                  {customer.name}
                </h2>
                <p className="text-xs text-[#6F7485]">{customer.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Pencil
                className="h-4 w-4 text-[#9BA0B4]"
                strokeWidth={1.5}
                onClick={(e) => {
                  e.stopPropagation();
                  onedit(customer);
                  onClose();
                }}
              />
              <Trash2
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDelete(customer.id);
                  onClose();
                }}
                className="h-4 w-4 text-[#9BA0B4]"
                strokeWidth={1.5}
              />
            </div>
          </div>
          <div className=" flex items-center justify-between">
            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-wide text-[#6F7485] mb-3">
                Contact information
              </p>
              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <p className="text-[#6F7485] text-xs">Email</p>
                  <p className="text-white">{customer.email}</p>
                </div>
                <div>
                  <p className="text-[#6F7485] text-xs">Phone</p>
                  <p className="text-white font-mono">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-[#6F7485] text-xs">Company</p>
                  <p className="text-white">{customer.company}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-wide text-[#6F7485] mb-2">
                  Status
                </p>
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                    customer.status === "active"
                      ? "bg-[#3FD68C1c] text-[#3FD68C]"
                      : "bg-[#1F2430] text-[#6F7485]"
                  }`}
                >
                  {customer.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-wide text-[#6F7485] mb-2">
                  Last contact
                </p>
                <p className="text-white text-sm">
                  {customer.lastContactDate || "—"}
                </p>
              </div>
            </div>
          </div>
          <div className="text-white">
            <h2 className="text-[#6F7485] text-[11px] uppercase tracking-wide mb-3">
              Notes & Interactions
            </h2>
            <p className="text-[14px] p-2 border border-[#6F7485] rounded-xl">
              {customer.notes}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails;
