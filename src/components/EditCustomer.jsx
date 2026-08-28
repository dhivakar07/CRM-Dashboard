import { useState, useEffect } from "react";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";

function EditCustomer({ customer, onClose }) {
  const [form, setform] = useState({});
  const updateCustomer = useUpdateCustomer();

  useEffect(() => {
    if (customer) setform(customer);
  }, [customer]);

  if (!customer) return null;

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Name, email, and phone are required");
      return;
    }

    updateCustomer.mutate(form, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <form
        onSubmit={handleSubmit}
        className="bg-[#12151C] border border-[#252A35] rounded-xl p-6 w-[400px] flex flex-col gap-3"
      >
        <h2 className="text-white font-semibold mb-2">Edit customer</h2>

        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white"
        />
        <input
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white"
        />
        <input
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
          className="bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white"
        />
        <input
          name="company"
          value={form.company || ""}
          onChange={handleChange}
          placeholder="Company"
          className="bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white"
        />
        <select
          name="status"
          value={form.status || "active"}
          onChange={handleChange}
          className="bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input
          type="date"
          name="lastContactDate"
          value={form.lastContactDate || ""}
          onChange={handleChange}
          className="bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white"
        />

        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#9BA0B4]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-[#7A7CFF] text-black rounded-lg font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCustomer;
