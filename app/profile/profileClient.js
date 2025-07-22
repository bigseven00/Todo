"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Popup from "@/components/Popup";
import { Trash2 } from "lucide-react";

export default function ProfileClient({ user }) {
  const [profilePicture, setProfilePicture] = useState(
    user.profile_picture || ""
  );
  const [popupOpen, setPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ redirect: false });
    router.push("/login");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-profile", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        setProfilePicture(url);
      } else {
        const { error } = await res.json();
        setError(`Failed to upload profile picture: ${error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePicture = () => {
    setPopupOpen(true);
  };

  const confirmRemovePicture = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/remove-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profilePicture }),
      });
      if (res.ok) {
        setProfilePicture("");
      } else {
        const { error } = await res.json();
        setError(`Failed to remove profile picture: ${error}`);
      }
    } catch (error) {
      console.error("Error removing profile picture:", error);
      setError("Failed to remove profile picture");
    } finally {
      setIsLoading(false);
      setPopupOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
        {isLoading && (
          <div className="text-center text-gray-500 mb-4">Loading...</div>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <p>{user.first_name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <p>{user.last_name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <p>{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <p>{user.phone_number || "Not provided"}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          {profilePicture ? (
            <div className="flex items-center">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-2"
              />
              <button
                onClick={handleRemovePicture}
                className="ml-4 text-red-500 hover:text-red-700 disabled:text-gray-400"
                aria-label="Remove Profile Picture"
                disabled={isLoading}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ) : (
            <p>No profile picture uploaded.</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="mt-2"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white rounded-md px-4 py-2 w-full hover:bg-red-600 disabled:bg-red-300"
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
      {popupOpen && (
        <Popup
          title="Are you sure you want to remove your profile picture?"
          closePopup={() => setPopupOpen(false)}
          onConfirm={confirmRemovePicture}
        />
      )}
    </div>
  );
}