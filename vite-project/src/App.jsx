import { useState } from "react";
import React from 'react'
import { useAddressBook } from "./hooks/useAddressBook";
import AddressForm from "./components/AddressForm";
import AddressTable from "./components/AddressTable";

export default function App() {
  const {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    search,
    setSearch,
    editingId,
    setEditingId,
  } = useAddressBook();

  const editingContact = contacts.find((c) => c.id === editingId) || null;

  const handleSubmit = (data) => {
    if (editingId) updateContact(editingId, data);
    else addContact(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Address Book</h1>

      <AddressForm
        onSubmit={handleSubmit}
        editingContact={editingContact}
        cancelEdit={() => setEditingId(null)}
      />

      <div className="max-w-2xl mx-auto mt-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />

        <AddressTable
          contacts={contacts}
          onEdit={(c) => setEditingId(c.id)}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}
