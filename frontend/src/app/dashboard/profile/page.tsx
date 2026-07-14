"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  Shield,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {

  const {
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount
  } = useAuth();

  const [loading, setLoading] = useState(true);

  // Controls Account Information editing
  const [isEditing, setIsEditing] = useState(false);

  // Controls Password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    github: "",
    linkedin: "",
    portfolio: "",
    headline: "",
    bio: "",
    skills: [] as string[],
    avatar: ""
  });

  const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    github: "",
    linkedin: "",
    portfolio: "",
    headline: "",
    bio: "",
    skills: [] as string[],
    avatar: ""
  });

  const [passwordData, setPasswordData] = useState({

    currentPassword: "",
    newPassword: "",
    confirmPassword: ""

  });

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const res = await getProfile();

      const user = res.user;

      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
        headline: user.headline || "",
        bio: user.bio || "",
        skills: user.skills || [],
        avatar: user.avatar || ""
      });

      setEditedProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
        headline: user.headline || "",
        bio: user.bio || "",
        skills: user.skills || [],
        avatar: user.avatar || ""
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setEditedProfile({

      ...editedProfile,

      [e.target.name]: e.target.value

    });

  };

  const handleSaveProfile = async () => {

    try {

      await updateProfile(editedProfile);

      setProfile(editedProfile);

      setIsEditing(false);

      alert("Profile updated successfully.");

    } catch (error) {

      console.log(error);

      alert("Failed to update profile.");

    }

  };

  const handleCancelEdit = () => {

    setEditedProfile(profile);

    setIsEditing(false);

  };

  const handlePasswordChange = async () => {

    if (!passwordData.currentPassword) {

      return alert("Current password is required.");

    }

    if (!passwordData.newPassword) {

      return alert("New password is required.");

    }

    if (!passwordData.confirmPassword) {

      return alert("Confirm password is required.");

    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {

      return alert("New Password and Confirm Password do not match.");

    }

    try {

      await changePassword(passwordData);

      alert("Password changed successfully.");

      setPasswordData({

        currentPassword: "",
        newPassword: "",
        confirmPassword: ""

      });
    }

    catch (error: any) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to change password."
      );

    }

  };

  const handleDeleteAccount = async () => {

    if (!passwordData.currentPassword.trim()) {

      alert("Please enter your current password before deleting your account.");

      return;

    }

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!confirmDelete) return;

    try {

      await deleteAccount(passwordData.currentPassword);

    } catch (error) {

      console.log(error);

      alert("Failed to delete account.");

    }

  };

  const handleSkillChange = (
    index: number,
    value: string
  ) => {

    const updatedSkills = [...editedProfile.skills];

    updatedSkills[index] = value;

    setEditedProfile({

      ...editedProfile,

      skills: updatedSkills

    });

  };

  const addSkill = () => {

    setEditedProfile({

      ...editedProfile,

      skills: [...editedProfile.skills, ""]

    });

  };

  const removeSkill = (index: number) => {

    setEditedProfile({

      ...editedProfile,

      skills: editedProfile.skills.filter((_, i) => i !== index)

    });

  };

  if (loading) {

    return (

      <div className="flex h-[80vh] items-center justify-center text-xl text-white">

        Loading Profile...

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Heading */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            My Profile

          </h1>

          <p className="mt-2 text-gray-400">

            Manage your account settings and personal information.

          </p>

        </div>

      </div>

      {/* Account Information */}

      <div className="rounded-3xl border border-white/10 bg-[#111118] p-5 sm:p-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>

            <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">

              <User className="text-violet-500" />

              Account Information

            </h2>

            <p className="mt-2 text-gray-400">

              Update your personal information.

            </p>

          </div>

          {

            !isEditing ?

              (

                <button

                  onClick={() => setIsEditing(true)}

                  className="flex w-full items-center justify-center gap-2 rounded-xl  sm:w-auto bg-violet-600 px-5 py-3 text-white hover:bg-violet-500"

                >

                  <Pencil size={18} />

                  Edit

                </button>

              )

              :

              (

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button

                    onClick={handleCancelEdit}

                    className="flex w-full items-center justify-center gap-2 rounded-xl  sm:w-auto border border-red-500 px-5 py-3 text-red-400 hover:bg-red-500 hover:text-white"

                  >

                    <X size={18} />

                    Cancel

                  </button>

                  <button

                    onClick={handleSaveProfile}

                    className="flex w-full items-center justify-center gap-2 rounded-xl  sm:w-auto bg-green-600 px-5 py-3 text-white hover:bg-green-500"

                  >

                    <Save size={18} />

                    Save Changes

                  </button>

                </div>

              )

          }

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Name */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Full Name

            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input

                type="text"

                name="name"

                value={editedProfile.name}

                onChange={handleInputChange}

                disabled={!isEditing}

                className={`w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-4 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                  }`}

              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Email

            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input

                type="email"

                name="email"

                value={editedProfile.email}

                disabled

                className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-4 text-gray-400"

              />

            </div>

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Phone

            </label>

            <div className="relative">

              <Phone
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input

                type="text"

                name="phone"

                value={editedProfile.phone}

                onChange={handleInputChange}

                disabled={!isEditing}

                className={`w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-4 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                  }`}

              />

            </div>

          </div>

          {/* Address */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Address

            </label>

            <div className="relative">

              <MapPin
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input

                type="text"

                name="address"

                value={editedProfile.address}

                onChange={handleInputChange}

                disabled={!isEditing}

                className={`w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-4 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                  }`}

              />

            </div>

          </div>


          {/* GitHub */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              GitHub

            </label>

            <div className="relative">

              <FaGithub
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input

                type="text"

                name="github"

                value={editedProfile.github}

                onChange={handleInputChange}

                disabled={!isEditing}

                placeholder="https://github.com/username"

                className={`w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-4 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                  }`}

              />

            </div>

          </div>

          {/* LinkedIn */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              LinkedIn

            </label>

            <div className="relative">

              <FaLinkedin
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input

                type="text"

                name="linkedin"

                value={editedProfile.linkedin}

                onChange={handleInputChange}

                disabled={!isEditing}

                placeholder="https://linkedin.com/in/username"

                className={`w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-4 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                  }`}

              />

            </div>

          </div>

          {/* Portfolio */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm text-gray-400">

              Portfolio Website

            </label>

            <div className="relative">

              <Globe
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input

                type="text"

                name="portfolio"

                value={editedProfile.portfolio}

                onChange={handleInputChange}

                disabled={!isEditing}

                placeholder="https://yourportfolio.com"

                className={`w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-4 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                  }`}

              />

            </div>

          </div>

        </div>

      </div>

      {/* Professional Information */}

      <div className="rounded-3xl border border-white/10 bg-[#111118] p-5 sm:p-8">

        <div className="mb-8">

          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white">

            <User className="text-violet-500" />

            Professional Information

          </h2>

          <p className="mt-2 text-gray-400">

            Showcase yourself to project owners and collaborators.

          </p>

        </div>

        <div className="space-y-6">

          {/* Avatar */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Avatar URL

            </label>

            <input
              type="text"
              name="avatar"
              value={editedProfile.avatar}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="https://example.com/avatar.jpg"
              className={`w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                }`}
            />

            {editedProfile.avatar && (

              <img
                src={editedProfile.avatar}
                alt="Avatar"
                className="mt-4 h-24 w-24 rounded-full border-2 border-violet-500 object-cover"
              />

            )}

          </div>

          {/* Headline */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Headline

            </label>

            <input
              type="text"
              name="headline"
              value={editedProfile.headline}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Full Stack Developer | MERN | Open Source"
              className={`w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                }`}
            />

          </div>

          {/* Bio */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Bio

            </label>

            <textarea
              rows={5}
              name="bio"
              value={editedProfile.bio}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
                  bio: e.target.value
                })
              }
              disabled={!isEditing}
              placeholder="Tell everyone about yourself..."
              className={`w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-white outline-none ${isEditing
                  ? "focus:border-violet-500"
                  : "cursor-not-allowed opacity-70"
                }`}
            />

          </div>

          {/* Skills */}

          <div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <label className="text-sm text-gray-400">

                Skills

              </label>

              {isEditing && (

                <button
                  type="button"
                  onClick={addSkill}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-500 sm:w-auto"
                >

                  <Plus size={18} />

                  Add Skill

                </button>

              )}

            </div>

            <div className="space-y-3">

              {editedProfile.skills.map((skill, index) => (

                <div
                  key={index}
                  className="flex flex-col gap-3 sm:flex-row"
                >

                  <input
                    type="text"
                    value={skill}
                    disabled={!isEditing}
                    onChange={(e) =>
                      handleSkillChange(
                        index,
                        e.target.value
                      )
                    }
                    placeholder="React"
                    className={`flex-1 rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-white outline-none ${isEditing
                        ? "focus:border-violet-500"
                        : "cursor-not-allowed opacity-70"
                      }`}
                  />

                  {isEditing && (

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="flex items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-500"
                    >

                      <Trash2 size={18} />

                    </button>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Security */}

      <div className="rounded-3xl border border-white/10 bg-[#111118] p-5 sm:p-8">

        <div className="mb-8 flex items-center gap-3">

          <Shield className="text-violet-500" />

          <div>

            <h2 className="text-2xl font-semibold text-white">

              Security

            </h2>

            <p className="mt-2 text-gray-400">

              Change your account password.

            </p>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Current Password */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Current Password

            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-14 text-white outline-none focus:border-violet-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(
                    !showCurrentPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >

                {

                  showCurrentPassword ?

                    <EyeOff size={20} />

                    :

                    <Eye size={20} />

                }

              </button>

            </div>

          </div>

          {/* New Password */}

          <div>

            <label className="mb-2 block text-sm text-gray-400">

              New Password

            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-14 text-white outline-none focus:border-violet-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword(
                    !showNewPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >

                {

                  showNewPassword ?

                    <EyeOff size={20} />

                    :

                    <Eye size={20} />

                }

              </button>

            </div>

          </div>
          {/*Confirm new password */}
          <div>

            <label className="mb-2 block text-sm text-gray-400">

              Confirm Password

            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-500"
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({

                    ...passwordData,

                    confirmPassword: e.target.value

                  })
                }
                className="w-full rounded-xl border border-white/10 bg-[#181820] py-3 pl-12 pr-14 text-white outline-none focus:border-violet-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >

                {

                  showConfirmPassword ?

                    <EyeOff size={20} />

                    :

                    <Eye size={20} />

                }

              </button>

            </div>

          </div>
        </div>

        <button
          onClick={handlePasswordChange}
          className="mt-8 w-full rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500 sm:w-auto"        >

          Change Password

        </button>

      </div>

      {/* Delete Account */}

      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-5 sm:p-8">

        <h2 className="text-2xl font-semibold text-red-400">

          Danger Zone

        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-gray-400">

          Deleting your account is permanent. All your projects,
          requests, conversations and certificates may become
          inaccessible. This action cannot be undone.

        </p>

        <button
          onClick={handleDeleteAccount}
          className="mt-8 w-full rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-500 sm:w-auto"        >

          Delete My Account

        </button>

      </div>

    </div>

  );

}