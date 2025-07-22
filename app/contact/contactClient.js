"use client";
import { useState } from "react";

export default function ContactClient({ userEmail, userName }) {
  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail || "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({
          name: userName || "",
          email: userEmail || "",
          message: "",
        });
      } else {
        const data = await res.json();
        setStatus(`error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error: Network issue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mt-14 text-center">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4 flex flex-row gap-3">
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4 flex flex-row gap-3">
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            required
            disabled={isLoading}
          ></textarea>
        </div>
        {status?.startsWith("success") && (
          <p className="text-green-500 mb-4">Thank you for your message!</p>
        )}
        {status?.startsWith("error") && (
          <p className="text-red-500 mb-4">
            Failed to send message: {status.split(":")[1]}. Please try again.
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-medium disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}