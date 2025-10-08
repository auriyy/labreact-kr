import { useState } from "react";

export function useAddressBook() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const addContact = (contact) => {
    const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
    const newContact = { id: newId, ...contact };
    setContacts((prev) => [...prev, newContact]);
  };

  const updateContact = (id, updatedData) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
    setEditingId(null);
  };

  const deleteContact = (id) => {
    setContacts((prev) =>
      prev
        .filter((c) => c.id !== id)
        .map((c, i) => ({ ...c, id: i + 1 }))
    );
  };

  const filteredContacts = contacts.filter((c) =>
    [c.firstName, c.lastName, c.phone]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return {
    contacts: filteredContacts,
    addContact,
    updateContact,
    deleteContact,
    search,
    setSearch,
    editingId,
    setEditingId,
  };
}
