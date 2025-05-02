import { useEffect, useState } from "react";
import { getProfile, updateProfile, updatePassword } from "../services/api";

interface UserProfile {
  fullName: string;
  email: string;
  dob: string;
  createdAt: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    dob: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
        setForm({
          fullName: res.data.fullName || "",
          email: res.data.email,
          dob: res.data.dob ? res.data.dob.substring(0, 10) : "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(form);
      setMessage("Profile updated successfully");
      setEdit(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      setMessage("Update failed");
    }
  };

  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwords;
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage("New passwords do not match");
      return;
    }
    try {
      await updatePassword({ currentPassword, newPassword });
      setPasswordMessage("Password updated successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error("Failed to update password", err);
      setPasswordMessage("Failed to update password");
    }
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            disabled={!edit}
            className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={!edit}
            className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            disabled={!edit}
            className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="text-sm text-gray-500">
          Member since: {new Date(profile.createdAt).toLocaleDateString()}
        </div>

        {message && (
          <p className="text-center text-sm text-green-600">{message}</p>
        )}

        <div className="flex justify-end space-x-4">
          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                  setForm({
                    fullName: profile.fullName || "",
                    email: profile.email,
                    dob: profile.dob ? profile.dob.substring(0, 10) : "",
                  });
                }}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
        <input
          name="currentPassword"
          type="password"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={handlePasswordChange}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="confirmNewPassword"
          type="password"
          placeholder="Confirm New Password"
          value={passwords.confirmNewPassword}
          onChange={handlePasswordChange}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {passwordMessage && (
          <p className="text-sm text-center text-red-500">{passwordMessage}</p>
        )}
        <div className="flex justify-end">
          <button
            onClick={handlePasswordUpdate}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
