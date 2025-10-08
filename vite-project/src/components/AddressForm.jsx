import { useState, useEffect } from "react";
import React from 'react'

export default function AddressForm({ onSubmit, editingContact, cancelEdit }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingContact) setForm(editingContact);
  }, [editingContact]);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "The first name is required";
    if (!form.lastName.trim()) errs.lastName = "The last name is required";
    if (!form.phone.trim()) errs.phone = "The phone is required";

    else if (!/^\d{7,15}$/.test(form.phone))
      errs.phone = "The phone must be 7-15 digits";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm({ firstName: "", lastName: "", phone: "" });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center mb-2">
        {editingContact ? "Edit Contact" : "Add New Contact"}
      </h2>

      {["firstName", "lastName", "phone"].map((field) => (
        <div key={field}>
          <input
            type="text"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className={`border ${
              errors[field] ? "border-red-500" : "border-gray-300"
            } rounded-md px-3 py-2 w-full`}
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {editingContact ? "Update" : "Add"}
        </button>

        {editingContact && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
