import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { toast } from "sonner";
import {
  displayName,
  getUser,
  logout,
  type User,
} from "./dashboard.service.ts";
import {
  Avatar,
  DetailList,
  PageHeader,
  card,
  inputCls,
  outlineBtn,
  primaryBtn,
} from "./ui.tsx";

const fields = [
  ["Full name", "name"],
  ["Phone", "phone"],
] as const;

const Profile = () => {
  const user: User = getUser() ?? {};
  const navigate = useNavigate();
  const initial = { name: displayName(user), phone: user.phone ?? "" };
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initial);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  const save = () => {
    toast.info("Saving will be available once it's connected to the backend.");
    setEditing(false);
  };
  const cancel = () => {
    setForm(initial);
    setEditing(false);
  };
  const updatePassword = () => {
    if (pw.next.length < 8)
      return void toast.error("New password must be at least 8 characters");
    if (pw.next !== pw.confirm)
      return void toast.error("Passwords don't match");
    toast.info(
      "Password change will be available once it's connected to the backend.",
    );
    setPw({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        text="Manage your personal information and account."
      />

      <section
        className={`${card} flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:text-left`}
      >
        <Avatar user={user} className="h-20 w-20 text-2xl" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-semibold">
            {displayName(user)}
          </h3>
          <p className="truncate text-sm text-gray-500">{user.email ?? "—"}</p>
          <p className="text-sm text-gray-500">
            {user.phone || "No phone added"}
          </p>
        </div>
        {!editing && (
          <button className={outlineBtn} onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </section>

      <section className={`${card} p-5`}>
        <h3 className="mb-4 font-semibold">Personal Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([label, key]) => (
            <label key={key} className="text-sm font-medium">
              {label}
              <input
                className={`${inputCls} mt-1`}
                disabled={!editing}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </label>
          ))}
          <label className="text-sm font-medium sm:col-span-2">
            Email
            <input
              className={`${inputCls} mt-1`}
              disabled
              value={user.email ?? ""}
            />
          </label>
        </div>
        {editing && (
          <div className="mt-5 flex justify-end gap-2">
            <button className={outlineBtn} onClick={cancel}>
              Cancel
            </button>
            <button className={primaryBtn} onClick={save}>
              Save Changes
            </button>
          </div>
        )}
      </section>

      <section className={`${card} p-5`}>
        <h3 className="mb-4 font-semibold">Change Password</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {(
            [
              ["Current password", "current"],
              ["New password", "next"],
              ["Confirm password", "confirm"],
            ] as const
          ).map(([label, key]) => (
            <label key={key} className="text-sm font-medium">
              {label}
              <input
                type="password"
                autoComplete={
                  key === "current" ? "current-password" : "new-password"
                }
                className={`${inputCls} mt-1`}
                value={pw[key]}
                onChange={(e) => setPw({ ...pw, [key]: e.target.value })}
              />
            </label>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <button
            className={primaryBtn}
            disabled={!pw.current || !pw.next}
            onClick={updatePassword}
          >
            Update Password
          </button>
        </div>
      </section>

      <section className={`${card} p-5`}>
        <h3 className="mb-4 font-semibold">Account &amp; Security</h3>
        <DetailList
          cols="grid-cols-1 sm:grid-cols-2"
          rows={[
            [
              "Account type",
              <span className="capitalize">{user.role ?? "guest"}</span>,
            ],
            ["Login email", user.email ?? "—"],
          ]}
        />
        <button
          className={`${outlineBtn} mt-5 text-red-600`}
          onClick={() => {
            logout();
            toast.success("Logged out");
            navigate("/");
          }}
        >
          <FiLogOut /> Sign out
        </button>
      </section>
    </div>
  );
};

export default Profile;
