import { useState } from "react";
import { useAddCustomer } from "../hooks/useAddCustomer";
function AddCustomer({ isOpen, onClose }) {
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "active",
    lastContactDate: "",
    notes: "",
  };
  const [form, setform] = useState(emptyForm);
  const addCustomer = useAddCustomer();
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[\d\s()+\-]{7,}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!form.lastContactDate) {
      newErrors.lastContactDate = "lastContactDate is required";
    }
    if (!form.notes.trim()) {
      newErrors.notes = "Note is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const errorMessages = Object.values(errors).filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addCustomer.mutate(form, {
      onSuccess: () => {
        setform(emptyForm);
        setErrors({});
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#12151C] border border-[#252A35] rounded-xl p-4 sm:p-5 md:p-6 w-full max-w-[400px] max-h-[90vh] overflow-y-auto flex flex-col gap-3"
      >
        <h2 className="text-white font-semibold text-lg mb-2">Add customer</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm outline-none text-white focus:border-[#9496FF]"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className=" w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm outline-none text-white focus:border-[#9496FF]"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm outline-none text-white focus:border-[#9496FF]"
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm outline-none text-white focus:border-[#9496FF]"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#9496ff]"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input
          type="date"
          name="lastContactDate"
          value={form.lastContactDate}
          onChange={handleChange}
          className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm outline-none text-white focus:border-[#9496FF]"
        />
        <textarea
          name="notes"
          value={form.notes || ""}
          onChange={handleChange}
          placeholder="Meeting notes and follow-up items"
          rows={2}
          className="w-full bg-[#181C26] border border-[#252A35] rounded-lg px-3 py-2 text-sm text-white placeholder:text-[#6F7485] outline-none focus:border-[#9496FF] resize-none w-full"
        />
        {errorMessages.length > 0 && (
          <p className="text-xs text-red-400">{errorMessages.join(" · ")}</p>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              setErrors({});
            }}
            className="w-full sm:w-auto px-4 py-2 text-sm text-[#9BA0B4] border border-[#252A35] rounded-lg hover:bg#181C26] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 text-sm bg-[#7A7CFF] text-white rounded-lg font-semibold hover:bg-[#696BEE] active:scale-95 transition-all"
          >
            Add customer
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
