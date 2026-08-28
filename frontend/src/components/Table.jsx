import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Pencil,
  Trash2,
  GripVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import { useState, useEffect } from "react";

function Table({ customers, onedit, onViewDetails }) {
  const deleteCustomer = useDeleteCustomer();

  const [orderedcustomers, setorderedcustomers] = useState(customers);

  const [currentpage, setcurrentpage] = useState(1);
  const [pagerow, setpagerow] = useState(10);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setorderedcustomers(customers);
  }, [customers]);

  const totalPages = Math.ceil(orderedcustomers.length / pagerow);

  const startIndex = (currentpage - 1) * pagerow;
  const endIndex = startIndex + pagerow;

  const currentcustomers = orderedcustomers.slice(startIndex, endIndex);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = orderedcustomers.findIndex((c) => c.id === active.id);
    const newIndex = orderedcustomers.findIndex((c) => c.id === over.id);
    setorderedcustomers(arrayMove(orderedcustomers, oldIndex, newIndex));
  };

  const handleDelete = (id) => {
    if (confirm("Delete this customer? This cannot be undone.")) {
      deleteCustomer.mutate(id);
    }
  };

  const handlePageRow = (e) => {
    setpagerow(Number(e.target.value));
    setcurrentpage(1);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="w-full bg-[#12151C] border border-[#252A35] rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-[#6F7485] border-b border-[#252A35]">
                <th className="px-3 sm:px-4 py-3 w-8"></th>
                <th className="px-3 sm:px-4 py-3">Name</th>
                <th className="px-3 sm:px-4 py-3">Company</th>
                <th className="px-3 sm:px-4 py-3">Phone</th>
                <th className="px-3 sm:px-4 py-3">Status</th>
                <th className="px-3 sm:px-4 py-3">Last contact</th>
                <th className="px-3 sm:px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <SortableContext
              items={currentcustomers.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {currentcustomers.map((item, index) => (
                  <SortableRow
                    index={startIndex + index}
                    key={item.id}
                    item={item}
                    onedit={onedit}
                    onViewDetails={onViewDetails}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </SortableContext>
          </table>
        </div>
        <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 py-3 border-t border-[#252A35]">
          <div className="flex items-center justify-between sm:justify-start gap-2 text-xs sm:text-sm text-[#9BA0B4]">
            <span className="whitespace-nowrap">Rows per page</span>
            <select
              value={pagerow}
              onChange={handlePageRow}
              className=" bg-[#181C26] border border-[#252A35] text-white rounded-lg px-2 py-1 outline-none text-xs sm:text-sm "
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <p className="text-xs sm:text-sm text-[#9BA0B4] text-center">
            {orderedcustomers.length === 0
              ? "0 of 0"
              : `${startIndex + 1}-${Math.min(
                  endIndex,
                  orderedcustomers.length,
                )} of ${orderedcustomers.length}`}
          </p>
          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button
              onClick={() => setcurrentpage((prev) => Math.max(prev - 1, 1))}
              disabled={currentpage === 1}
              className=" w-8 h-8 flex items-center justify-center rounded-lg border border-[#252A35] text-[#9BA0B4] hover:bg-[#181C26] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors "
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-xs sm:text-sm text-white px-2 whitespace-nowrap">
              {currentpage} / {totalPages || 1}
            </span>

            <button
              onClick={() =>
                setcurrentpage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentpage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#252A35] text-[#9BA0B4] hover:bg-[#181C26] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
function SortableRow({ index, item, onedit, onViewDetails, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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
    <tr
      ref={setNodeRef}
      style={style}
      onClick={() => onViewDetails(item)}
      className="border-b border-[#252A35] last:border-0 hover:bg-[#181C26] cursor-pointer"
    >
      <td className="px-3 sm:px-4 py-3">
        <button
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab text-[#6F7485] hover:text-white"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </td>
      <td className="px-3 sm:px-4 py-3">
        <div className="flex items-center gap-2 min-w-[180px]">
          <div
            className=" w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: avatarColors[index % avatarColors.length],
            }}
          >
            <span className="text-white font-bold text-[11px] sm:text-[13px]">
              {getInitials(item.name)}
            </span>
          </div>
          <div className="min-w-0">
            <div className="font-medium text-white whitespace-nowrap">
              {item.name}
            </div>
            <div className="text-xs text-[#6F7485] whitespace-nowrap">
              {item.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-3 sm:px-4 py-3 text-[#9BA0B4] whitespace-nowrap">
        {item.company}
      </td>
      <td className="px-3 sm:px-4 py-3 text-[#9BA0B4] font-mono text-xs whitespace-nowrap">
        {item.phone}
      </td>
      <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            item.status === "active"
              ? "bg-[#3FD68C1c] text-[#3FD68C]"
              : "bg-[#1F2430] text-[#6F7485]"
          }`}
        >
          {item.status === "active" ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-3 sm:px-4 py-3 text-[#9BA0B4] whitespace-nowrap">
        {item.lastContactDate}
      </td>
      <td className="px-3 sm:px-4 py-3">
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onedit(item);
            }}
            className="p-1 rounded hover:bg-[#20232D]"
          >
            <Pencil
              className="h-4 w-4 text-[#9BA0B4] hover:text-white"
              strokeWidth={1.5}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="p-1 rounded hover:bg-[#20232D]"
          >
            <Trash2
              className="h-4 w-4 text-[#9BA0B4] hover:text-red-400"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Table;
