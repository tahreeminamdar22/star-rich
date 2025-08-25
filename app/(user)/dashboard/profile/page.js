"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [origin, setOrigin] = useState("");
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user from API
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setFormData(data); // directly populate formData
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // ✅ Set origin for referral link
  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  if (status === "loading" || loading)
    return <p className="text-center mt-8 text-gray-300">Loading...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update profile");

      const updatedUser = await res.json();
      await update({ user: updatedUser }); // refresh session

      setFormData(updatedUser);
      setEditing(false);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  const handlePrint = () => {
    const printContents = cardRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(printContents);
    win.document.close();
    win.print();
  };

  const handleCopyReferral = () => {
    const referralLink = `${origin}/register?ref=${
      formData.referralCode || "guest"
    }`;
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", [55, 85]);
    pdf.addImage(imgData, "PNG", 0, 0, 85, 55);
    pdf.save(`${formData.name || "user"}-ID-Card.pdf`);
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `${formData.name || "user"}-ID-Card.png`;
    link.click();
  };

  return (
    <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto bg-gray-900 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-400">
          Welcome {formData.name || "Guest"} 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Manage your account, view stats, and explore your earnings.
        </p>
      </div>

      {/* Profile Info */}
      <section className="bg-gray-800 shadow rounded-lg p-6 mb-8 w-full">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Profile Info</h2>
        {editing ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Email"
            />
            <input
              type="text"
              name="contact"
              value={formData.contact || ""}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Contact"
            />
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Address"
            />
            <button
              onClick={handleSave}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
            <div>
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
            </div>
            <div>
              <p>
                <strong>Contact:</strong> {formData.contact}
              </p>
              <p>
                <strong>Address:</strong> {formData.address}
              </p>
            </div>
            <div className="sm:col-span-2 mt-3">
              <button
                onClick={() => setEditing(true)}
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ID Card */}
      <section className="flex justify-center mb-8">
        <div
          ref={cardRef}
          className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-200">
              {formData.name?.charAt(0) || "U"}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200">{formData.name}</h3>
              <p className="text-sm text-gray-400">{formData.email}</p>
            </div>
          </div>
          <div className="text-gray-300 text-sm">
            <p>
              <strong>ID:</strong> {formData.id}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {formData.joinedOn
                ? new Date(formData.joinedOn).toLocaleDateString()
                : "-"}
            </p>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Contact:</strong> {formData.contact}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
          </div>
          <div className="text-right text-xs text-gray-500">© Star Rich</div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={handlePrint}
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
        >
          Print
        </button>
        {/*
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
        <button
          onClick={handleDownloadImage}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Download PNG
        </button>
        */}
      </section>
      
      {/* Referral Link */}
      <section className="bg-gray-800 shadow rounded-lg p-6 w-full max-w-md mx-auto text-gray-200">
        <h2 className="text-xl font-semibold mb-4">Referral Link</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            readOnly
            value={`${origin}/register?ref=${formData.referralCode || "guest"}`}
            className="flex-1 p-3 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none"
          />
          <button
            onClick={handleCopyReferral}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Copy
          </button>
        </div>
      </section>
    </main>
  );
}
