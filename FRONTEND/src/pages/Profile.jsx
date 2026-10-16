import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiLock, FiSave, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-toastify";

import { useAuth } from "../hooks/useAuth";
import { updateProfile, changePassword } from "../services/authService";
import { Skeleton, RetryBanner } from "../components/feedback/StateViews";

const Profile = () => {
  const { user, refreshProfile, isLoading } = useAuth();

  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    phone_number: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [updating, setUpdating] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || user.phone || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateProfile(profileForm);
      await refreshProfile();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.detail || err.response?.data?.message || "Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast.error("New passwords do not match.");
      return;
    }

    if (passwordForm.new_password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setChangingPass(true);
    try {
      await changePassword({
        old_password: passwordForm.old_password,
        new_password: passwordForm.new_password,
      });
      toast.success("Password updated successfully!");
      setPasswordForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      toast.error(err.response?.data?.detail || err.response?.data?.message || "Failed to change password.");
    } finally {
      setChangingPass(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0a0f08] px-4 py-12 text-[#FAF4E5] flex justify-center items-center">
        <div className="w-full max-w-2xl space-y-4">
          <Skeleton className="h-12 w-1/3 bg-paper-2/20" />
          <Skeleton className="h-64 w-full bg-paper-2/10" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0a0f08] px-4 py-12 text-[#FAF4E5] flex justify-center items-center">
        <div className="w-full max-w-md bg-paper p-6 rounded-lg text-ink">
          <RetryBanner message="Unable to load profile details." onRetry={refreshProfile} />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-[#0a0f08] px-4 py-10 sm:py-16 text-[#FAF4E5]">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000')`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl space-y-8">
        <div className="border-b border-gold-deep/30 pb-4 text-center sm:text-left">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold sm:text-4xl text-[#FAF4E5]">
            Account Settings
          </h1>
          <p className="mt-1 font-['Montserrat'] text-xs sm:text-sm text-[#FAF4E5]/70">
            Manage your personal profile and account credentials.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-gold-deep/30 bg-paper p-6 sm:p-8 text-ink shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-ink/10 pb-3 mb-6">
            <FiUser className="text-gold-deep" size={20} />
            <h2 className="font-['Playfair_Display'] text-xl font-bold">Personal Profile</h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block font-['Montserrat'] text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1">
                Username
              </label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-3 text-gold-deep" />
                <input
                  type="text"
                  name="username"
                  value={profileForm.username}
                  onChange={handleProfileChange}
                  required
                  className="w-full rounded-md border border-gold-deep/30 bg-paper-2/50 py-2.5 pl-10 pr-3 font-['Montserrat'] text-sm text-ink focus:border-gold-deep focus:outline-none"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label className="block font-['Montserrat'] text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3 text-gold-deep" />
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  required
                  className="w-full rounded-md border border-gold-deep/30 bg-paper-2/50 py-2.5 pl-10 pr-3 font-['Montserrat'] text-sm text-ink focus:border-gold-deep focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block font-['Montserrat'] text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <FiPhone className="absolute left-3 text-gold-deep" />
                <input
                  type="tel"
                  name="phone_number"
                  value={profileForm.phone_number}
                  onChange={handleProfileChange}
                  className="w-full rounded-md border border-gold-deep/30 bg-paper-2/50 py-2.5 pl-10 pr-3 font-['Montserrat'] text-sm text-ink focus:border-gold-deep focus:outline-none"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={updating}
                className="flex items-center gap-2 rounded-md bg-[#2B2319] px-6 py-2.5 font-['Montserrat'] text-xs font-semibold uppercase tracking-wider text-[#FAF4E5] transition-all hover:bg-[#8C6D3B] disabled:opacity-50"
              >
                <FiSave />
                {updating ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-gold-deep/30 bg-paper p-6 sm:p-8 text-ink shadow-2xl"
        >
          <div className="flex items-center gap-2 border-b border-ink/10 pb-3 mb-6">
            <FiLock className="text-gold-deep" size={20} />
            <h2 className="font-['Playfair_Display'] text-xl font-bold">Change Password</h2>
          </div>

          <form onSubmit={handleSavePassword} className="space-y-4">
            <div>
              <label className="block font-['Montserrat'] text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="old_password"
                value={passwordForm.old_password}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-md border border-gold-deep/30 bg-paper-2/50 py-2.5 px-3 font-['Montserrat'] text-sm text-ink focus:border-gold-deep focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-['Montserrat'] text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="new_password"
                  value={passwordForm.new_password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded-md border border-gold-deep/30 bg-paper-2/50 py-2.5 px-3 font-['Montserrat'] text-sm text-ink focus:border-gold-deep focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block font-['Montserrat'] text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  value={passwordForm.confirm_password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded-md border border-gold-deep/30 bg-paper-2/50 py-2.5 px-3 font-['Montserrat'] text-sm text-ink focus:border-gold-deep focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={changingPass}
                className="flex items-center gap-2 rounded-md bg-[#8C6D3B] px-6 py-2.5 font-['Montserrat'] text-xs font-semibold uppercase tracking-wider text-[#FAF4E5] transition-all hover:bg-[#2B2319] disabled:opacity-50"
              >
                <FiCheckCircle />
                {changingPass ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default Profile;
