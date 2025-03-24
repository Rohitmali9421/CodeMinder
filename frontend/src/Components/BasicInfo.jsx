import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

function BasicInfo() {
  const { user } = useSelector((state) => state.auth);
  const [profileImage, setProfileImage] = useState(user?.profilePic?.url || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const degrees = ["B.Tech", "M.Tech", "B.E.", "MCA", "BCA", "B.Sc", "Other"];
  const branches = [
    "Computer Science", "IT", "Electronics", "Mechanical", "Civil", "AI/ML", "Others"
  ];
  const years = Array.from({ length: 55 }, (_, i) => 2030 - i);

  return (
    <Card className="p-8 w-full shadow-lg rounded-lg bg-white">
      <h3 className="text-2xl font-semibold text-gray-800">Basic Info</h3>
      <p className="text-gray-500 mb-6">Manage your profile details here.</p>

      <div className="flex flex-col items-center gap-4 sm:flex-row mt-4">
        <div className="relative">
          <img 
            src={profileImage || "/default-profile.png"} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-md"
          />
          <input type="file" accept="image/*" hidden id="fileInput" onChange={handleImageChange} />
          <label htmlFor="fileInput" className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md">
            <FiEdit className="text-lg" />
          </label>
          <Button 
            variant="destructive" 
            className="absolute bottom-2 left-2 p-2 shadow-md" 
            onClick={() => setProfileImage("")}
          >
            <FiX className="text-lg" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mt-6">
        <div>
          <Label className="text-gray-700">Name</Label>
          <Input value={user.name} readOnly className="bg-gray-100" />
        </div>

        <div>
          <Label className="text-gray-700">Email</Label>
          <Input value={user.email} readOnly className="bg-gray-100" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mt-8">Educational Details</h3>

      <div className="grid gap-6 sm:grid-cols-2 mt-4">
        <div>
          <Label className="text-gray-700">College</Label>
          <Input placeholder="Enter your college" defaultValue={user.college} />
        </div>

        <div>
          <Label className="text-gray-700">Degree</Label>
          <Select defaultValue={user.degree}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Degree" />
            </SelectTrigger>
            <SelectContent>
              {degrees.map((deg) => (
                <SelectItem key={deg} value={deg}>{deg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-700">Branch</Label>
          <Select defaultValue={user.branch}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((br) => (
                <SelectItem key={br} value={br}>{br}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-700">Year of Graduation</Label>
          <Select defaultValue={user.graduationYear}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Graduation Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md">
        Update Profile
      </Button>
    </Card>
  );
}

export default BasicInfo;
