import React from 'react'

export default function AddressTable({ contacts, onEdit, onDelete }) {
  if (!contacts.length)
    return (
      <p className="text-center text-gray-500 mt-6 italic">
        No data to display
      </p>
    );

  return (
    <div className="overflow-x-auto mt-6 shadow-lg rounded-xl bg-white">
      <table className="min-w-full border-collapse">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-50 border-b">
          <tr>
            <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide border-b">
              ID
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide border-b">
              First Name
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide border-b">
              Last Name
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide border-b">
              Phone
            </th>
            <th className="p-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr
              key={c.id}
              className={`transition ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              <td className="p-4 border-b text-gray-700">{c.id}</td>
              <td className="p-4 border-b font-medium text-gray-800">
                {c.firstName}
              </td>
              <td className="p-4 border-b font-medium text-gray-800">
                {c.lastName}
              </td>
              <td className="p-4 border-b text-gray-700">{c.phone}</td>
              <td className="p-4 border-b text-center">
                <button
                  onClick={() => onEdit(c)}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium mr-3 transition"
                >
                    Edit
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="text-red-600 hover:text-red-800 hover:underline font-medium transition"
                >
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
