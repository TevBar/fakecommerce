import React, { useEffect, useState } from "react";
import { getOrInitializeUserProfile, updateUserProfile, deleteUserProfile } from "../../services/userService";
import { auth } from "../../firebase.config";
import { onAuthStateChanged, deleteUser } from "firebase/auth";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  interface UserProfile {
    uid: string;
    email: string;
    name?: string;
    address?: string;
  }

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: "", address: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getOrInitializeUserProfile();
        if (profile) {
          setUserProfile(profile);
          setFormData({
            name: profile.name || "",
            address: profile.address || "",
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (userProfile) {
      await updateUserProfile(formData);
      setUserProfile({ ...userProfile, ...formData });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }
  };

  const handleDeleteProfile = async () => {
    if (!auth.currentUser) return;

    const confirm = window.confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (!confirm) return;

    try {
      await deleteUserProfile(); // Deletes Firestore user doc
      await deleteUser(auth.currentUser); // Deletes Firebase Auth user
      toast.success("Profile deleted successfully.");

      // Optionally redirect
      window.location.href = "/";
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete profile. Try again.");
    }
  };

  if (!userProfile) {
    return <div className="text-center mt-10">Loading user profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="block font-medium">Email:</label>
        <p className="border p-2 rounded bg-gray-100">{userProfile.email}</p>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Name:</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        ) : (
          <p className="border p-2 rounded bg-gray-100">
            {userProfile.name || "Not set"}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium">Address:</label>
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        ) : (
          <p className="border p-2 rounded bg-gray-100">
            {userProfile.address || "Not set"}
          </p>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      )}

      <button
        onClick={handleDeleteProfile}
        className="w-full bg-red-600 text-white py-2 mt-4 rounded hover:bg-red-700 transition"
      >
        Delete Profile
      </button>
    </div>
  );
};

export default Profile;
