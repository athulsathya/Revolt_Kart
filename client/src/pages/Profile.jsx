import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import Myorder from "./Myorder";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();

  const [updateUser, setUpdateUser] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   if (user) {
  //     setUpdateUser({
  //       firstname: user.firstname || "",
  //       lastname: user.lastname || "",
  //       email: user.email || "",
  //       phone: user.phone || "",
  //       address: user.address || "",
  //       city: user.city || "",
  //       zipCode: user.zipCode || "",
  //       profilepic: user.profilepic || "",
  //       role: user.role || "",
  //     });
  //   }
  // }, [user]);

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
        `http://localhost:4000/api/user/update/${userId}`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Tabs defaultValue="profile" className="w-full">
          {/* Tabs */}
          <TabsList className="grid w-full max-w-md grid-cols-2 h-14 bg-white rounded-2xl shadow-md p-1">
            <TabsTrigger
              value="profile"
              className="rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>

            <TabsTrigger
              value="orders"
              className="rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white"
            >
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="mt-6 border-0 rounded-3xl overflow-hidden bg-white shadow-xl">
              {/* Cover */}
              <div className="relative h-52 sm:h-64 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800">
                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute -bottom-16 left-1/2 sm:left-8 -translate-x-1/2 sm:translate-x-0">
                  <img
                    src={
                      updateUser.profilePic ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA_HrQLjkHiJ2Ag5RGuwbFeDKRLfldnDasw&s"
                    }
                    alt="profile"
                    className="h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                </div>
              </div>

              <CardContent className="pt-24 px-4 sm:px-8 pb-8">
                {/* User Details */}
                <div className="text-center sm:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                    {updateUser.firstname} {updateUser.lastname}
                  </h2>

                  <p className="mt-2 text-slate-500 break-all">
                    {updateUser.email}
                  </p>

                  <div className="flex justify-center sm:justify-start">
                    <span className="mt-4 inline-flex px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                      {updateUser.role}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8">
                  {/* Upload */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <input
                      type="file"
                      id="profilepic"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() =>
                        document.getElementById("profilepic")?.click()
                      }
                    >
                      Change Profile Photo
                    </Button>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        First Name
                      </label>

                      <input
                        name="firstname"
                        value={updateUser.firstname}
                        onChange={handleChange}
                        className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        Last Name
                      </label>

                      <input
                        name="lastname"
                        value={updateUser.lastname}
                        onChange={handleChange}
                        className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        Email
                      </label>

                      <input
                        name="email"
                        value={updateUser.email}
                        onChange={handleChange}
                        className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        Phone
                      </label>

                      <input
                        name="phone"
                        value={updateUser.phone}
                        onChange={handleChange}
                        className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        City
                      </label>

                      <input
                        name="city"
                        value={updateUser.city}
                        onChange={handleChange}
                        className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        Zip Code
                      </label>

                      <input
                        name="zipCode"
                        value={updateUser.zipCode}
                        onChange={handleChange}
                        className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-slate-600">
                        Address
                      </label>

                      <textarea
                        rows={4}
                        name="address"
                        value={updateUser.address}
                        onChange={handleChange}
                        className="w-full mt-2 rounded-xl border border-slate-200 p-4 resize-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Desktop Button */}
                  <Button
                    type="submit"
                    className="hidden sm:flex mt-8 h-12 px-8 rounded-xl bg-slate-900 hover:bg-slate-800"
                  >
                    Save Changes
                  </Button>

                  {/* Mobile Sticky Button */}
                  <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl shadow-xl bg-slate-900 hover:bg-slate-800"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Myorder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
