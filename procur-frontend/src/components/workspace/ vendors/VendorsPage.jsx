import { useEffect, useState } from "react";
import { api } from "../../../apis/api";
import toast from "react-hot-toast";



export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);



  const [search, setSearch] = useState("");
  const [selectedVendorIds, setSelectedVendorIds] = useState([]);



  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("");



  async function load() {
    try {
      setLoading(true);
      const data = await api.getVendors();
      setVendors(data);
    } catch (err) {
      toast.error(err.message || "Failed to load vendors");
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    load();
  }, []);



  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      (v.company && v.company.toLowerCase().includes(search.toLowerCase()))
  );



  const toggleVendor = (id) => {
    setSelectedVendorIds((prev) =>
      prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]
    );
  };



  async function handleAddVendor() {
    if (!newName.trim() || !newEmail.trim()) {
      toast.error("Vendor name and email are required");
      return;
    }



    const payload = {
      name: newName.trim(),
      email: newEmail.trim(),
      company: newCompany.trim() || "",
    };



    try {
      await api.createVendor(payload);



      toast.success("Vendor added successfully");



      setNewName("");
      setNewEmail("");
      setNewCompany("");



      await load();
    } catch (err) {
      toast.error(err.message || "Failed to create vendor");
    }
  }



  return (
    <div className="flex flex-col p-6 bg-slate-900/80 rounded-3xl border border-slate-800/50 shadow-2xl shadow-slate-900/30 backdrop-blur-xl h-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-100 mb-6">
        Vendor Management
      </h2>



      <input
        type="text"
        placeholder="Search vendors by name, email, or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 rounded-lg border border-slate-700/50 bg-slate-950/50 p-3 text-slate-200 placeholder-slate-500 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
      />



      {loading && (
        <p className="text-slate-400 mb-4 animate-pulse">Loading vendors...</p>
      )}



      <div className="mb-6 max-h-60 overflow-y-auto divide-y divide-slate-700 border border-slate-800 rounded-lg">
        {filteredVendors.length === 0 ? (
          <p className="p-4 text-center text-slate-500 font-medium">
            No vendors found.
          </p>
        ) : (
          filteredVendors.map((vendor) => (
            <label
              key={vendor.id}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/70 transition"
            >
              <div className="flex items-center gap-4">
                
                <div>
                  <p className="text-slate-200 font-semibold">{vendor.name}</p>
                  <p className="text-sm text-slate-400">{vendor.email}</p>
                  {vendor.company && (
                    <p className="text-xs text-slate-500 mt-1">
                      {vendor.company}
                    </p>
                  )}
                </div>
              </div>
            </label>
          ))
        )}
      </div>



      <div className="border-t border-slate-800 pt-6">
        <h3 className="text-lg font-semibold text-slate-300 mb-4">
          Add New Vendor
        </h3>



        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <input
            type="text"
            placeholder="Vendor Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700/50 bg-slate-950/50 p-3 text-slate-200 
            placeholder-slate-500 focus:border-indigo-500 focus:ring-2"
          />



          <input
            type="email"
            placeholder="Vendor Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700/50 bg-slate-950/50 p-3 text-slate-200 
            placeholder-slate-500 focus:border-indigo-500 focus:ring-2"
          />



          <input
            type="text"
            placeholder="Company (Optional)"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700/50 bg-slate-950/50 p-3 text-slate-200 
            placeholder-slate-500 focus:border-indigo-500 focus:ring-2"
          />



          <button
            onClick={handleAddVendor}
            className="whitespace-nowrap rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold 
            shadow-lg hover:bg-indigo-700 transition"
          >
            Add Vendor
          </button>
        </div>
      </div>
    </div>
  );
}