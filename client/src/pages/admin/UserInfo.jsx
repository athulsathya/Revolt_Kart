import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import axios from "axios";


function UserInfo() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.id;

  const [updateUser, setUpdateUser] = useState(null);
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   phone: "",
  //   city: "",
  //   zipCode: "",
  //   address: "",
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateUser);

    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();

      formData.append("firstname", updateUser.firstname);
      formData.append("lastname", updateUser.lastname);
      formData.append("email", updateUser.email);
      formData.append("phone", updateUser.phone);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);

      if (file) {
        formData.append("profilePic", file); //image for backend multter
      }

      const res = await axios.put(
        `${import.meta.env.VITE_URL}/api/user/update/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  const getUserDeatils = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/user/get_user/${userId}`,
      );
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDeatils();
  }, []);

  return (
 <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 py-10 px-4">
  <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">

    {/* Cover Banner */}
    <div className="relative h-56 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">

      <Button
        variant="secondary"
        size="icon"
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/30"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      {/* Profile Section */}
      <div className="absolute -bottom-16 left-8 flex items-end gap-5">
        <img
          src={
            updateUser?.profilePic ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&s"
          }
          alt="profile"
          className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-2xl"
        />

        <div className="pb-5 text-white">
          <h2 className="text-3xl font-bold">
            {updateUser?.firstname} {updateUser?.lastname}
          </h2>
          <p className="text-white/90 text-sm">{updateUser?.email}</p>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="pt-24 px-8 pb-10">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Personal Information
        </h1>
        <p className="text-slate-500 mt-1">
          Manage and update your profile details
        </p>
      </div>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={updateUser?.firstname || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={updateUser?.lastname || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={updateUser?.email || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={updateUser?.phone || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={updateUser?.city || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={updateUser?.zipCode || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Address
          </label>
          <textarea
            name="address"
            rows={4}
            value={updateUser?.address || ""}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-slate-200">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="rounded-xl px-6"
        >
          Cancel
        </Button>

        <Button onChange={handleSubmit}
          className="rounded-xl px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
        >
          Save Changes
        </Button>
      </div>

    </div>
  </div>
</div>
  );
}

export default UserInfo;
