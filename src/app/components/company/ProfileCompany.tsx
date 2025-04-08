'use client'
import React, { useEffect, useState } from 'react'
import vector from "@/assets/Rectangle 1080.svg"
import placeholder from "@/assets/icons8-user-40.png"
import vector2 from "@/assets/Vector 5.svg"
import Image from 'next/image'
import Vector from "@/assets/Vector 5.svg"
import rectangle from "@/assets/Rectangle 1080.svg"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'
import { useGetProfileDataMutation, useUpdatePasswordMutation, useUpdateProfileMutation } from '@/services/auth/AuthService'
import Loading from '../Loading'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { RootState } from '@/services/store'
import { MdEdit } from 'react-icons/md'
import { logout } from '@/services/auth/authSlice'
import { getInitialsOrLogo } from '@/services/useFilter'
import { FiUpload } from 'react-icons/fi'
import TextArea from 'antd/es/input/TextArea'

const ProfileCompany = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<any>({});
    const { mutateAsync, isLoading } = useGetProfileDataMutation();
    const { profiledata } = useSelector((state: RootState) => state.auth);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [finalLogoFile, setFinalLogoFile] = useState<File | null>(null)
    const [initialsImage, setInitialsImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [passwordForm, setPasswordForm] = useState({
        old_password: '',
        password: '',
        password_confirmation: ''
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });
    };
    const { mutateAsync: updatePasswordMutation, isLoading: isLoadingPassword } = useUpdatePasswordMutation();
    const handlePasswordUpdate = async () => {
        if (passwordForm.password !== passwordForm.password_confirmation) {
            toast.error("New passwords do not match!");
            return;
        }
        await updatePasswordMutation({
            old_password: passwordForm.old_password,
            password: passwordForm.password,
            password_confirmation: passwordForm.password_confirmation
        });
        onSubmit()
    };
    // Handle File Selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFinalLogoFile(file); // Store in another state
        }
    };
    // const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setSelectedFile(file);
    //         setSelectedFileName(file.name);
    //         setProfileData((prev) => ({ ...prev, logo: file })); // Update profileData logo with file
    //     }
    // };
    console.log('File selected:', finalLogoFile);


    // Upload Profile Logo

    const generateInitialsImage = (name: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        // Background color
        ctx.fillStyle = "#3B8FCD";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Text settings
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Extract initials
        const initials = name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();

        ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

        return canvas.toDataURL(); // Convert canvas to base64 image
    };
    useEffect(() => {
        onSubmit();
    }, []);

    useEffect(() => {
        if (profiledata) {
            setEditedProfile(profiledata); // Set initial values when profile data loads
        }
    }, [profiledata]);
    console.log("profiledata loaded:", profiledata);
    const onSubmit = async () => {
        try {
            await mutateAsync();
        } catch (error: any) {
            toast.error(error || "Login failed");
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditedProfile({
            ...editedProfile,
            [e.target.name]: e.target.value,
        });
    };
    const { mutate } = useUpdateProfileMutation()

    const handleSave = async () => {
        const formData = new FormData();

        formData.append("name", editedProfile.name);
        formData.append("email", editedProfile.email);
        formData.append("phone_number", editedProfile.phone_number);
        formData.append("address", editedProfile.address);
        formData.append("company_name", editedProfile.company_name);
        formData.append("postal_code", editedProfile.postal_code);
        console.log("Logo file bahr:", finalLogoFile);

        if (finalLogoFile) {
            formData.append("logo", finalLogoFile);
        }
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        console.log("Saving profile:", formData.get("logo"), finalLogoFile);

        try {
            await mutate(formData);
            mutateAsync();
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };


    useEffect(() => {
        if (profiledata.logo == null && profiledata.name) {
            const initialsImage = generateInitialsImage(profiledata.name);
            setInitialsImage(initialsImage);
        }
    }, [profiledata.logo, profiledata.name]);
    if (isLoading) return <Loading />;
    const logo = `https://be.myweightlosscentre.co.uk/${profiledata.logo}`
    const namelogo = getInitialsOrLogo(profiledata.name)
    return (
        <>


            <Image
                src={Vector}
                alt="Profile"
                className="absolute top-10 right-0 transform rounded-b-3xl h-40 mt-5"
            />
            <Image
                src={rectangle}
                alt="Profile"
                className="absolute top-12 right-1 transform rounded-b-3xl h-40 mt-5"
            />
            {/* </div> */}
            <div className="h-40 w-full md:w-1/2 mt-20 flex items-center gap-4 rounded-xl pb-4 bg-white shadow-sm px-8 py-6 relative bg-opacity-60 ">
                <div className="relative">
                    {finalLogoFile ? (
                        <Image
                            src={URL.createObjectURL(finalLogoFile)}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="h-12 w-12 rounded-full"
                        />
                    ) : profiledata.logo ? (
                        <Image
                            src={logo}
                            alt="Profile"
                            width={100}
                            height={100}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : initialsImage ? (
                        <span className="text-white font-bold text-lg bg-[#4FD1C5] w-12 h-12 rounded-full flex items-center justify-center">{namelogo}</span>

                    ) : (
                        <Image
                            src={placeholder}
                            alt="Profile"
                            className="w-20 h-20 border p-2 rounded-xl"
                        />
                    )}

                    {isEditing && (
                        <div className="mt-2 flex flex-col items-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="logo-upload"
                            />
                            <label htmlFor="logo-upload" className="cursor-pointer bg-[#4FD1C5] px-4 py-1 rounded-lg text-white">
                                Upload
                            </label>
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{profiledata.name}</h2>
                    <p className="text-gray-500">{profiledata.email}</p>
                </div>
            </div>

            <Card className="p-2 shadow-sm mt-4 border-none">
                <div className='flex justify-end'>
                    <MdEdit size={30} color='green' className="cursor-pointer" onClick={handleEditClick} />
                </div>

                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Profile Information</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-black font-semibold">Company Name</Label>
                            <Input
                                name="company_name"
                                disabled={!isEditing}
                                value={editedProfile.company_name || ""}
                                onChange={handleChange}
                                className="bg-gray-100 border-none text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-black font-semibold">Name</Label>
                            <Input
                                name="name"
                                disabled={!isEditing}
                                value={editedProfile.name || ""}
                                onChange={handleChange}
                                className="bg-gray-100 border-none text-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-black font-semibold">Role</Label>
                            <Input
                                name="role"
                                disabled
                                value={editedProfile.role || ""}
                                onChange={handleChange}
                                className="bg-gray-100 border-none text-black"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-black font-semibold">Email Address</Label>
                            <Input
                                name="email"
                                disabled
                                value={editedProfile.email || ""}
                                onChange={handleChange}
                                className="bg-gray-100 border-none text-black"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-black font-semibold">Phone No</Label>
                            <Input
                                name="phone_number"
                                disabled={!isEditing}
                                value={editedProfile.phone_number || ""}
                                onChange={handleChange}
                                className="bg-gray-100 border-none text-black"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-black font-semibold">Address</Label>
                            <TextArea
                                name="address"
                                disabled={!isEditing}
                                value={editedProfile.address || ""}
                                onChange={handleChange}
                                className="bg-gray-100 border-none text-black"
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = "auto"; // Reset height
                                    target.style.height = `${target.scrollHeight}px`; // Set new height
                                }}
                                style={{ minHeight: "10px", overflow: "hidden" }} // Ensure proper resizing
                                // rows={1}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-black font-semibold">Postal Code</Label>
                            <Input
                                name="postal_code"
                                disabled={!isEditing}
                                value={editedProfile.postal_code || ""}
                                onChange={handleChange}
                                className="bg-gray-100 border-none text-black"
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <div className="mt-6 flex justify-end">
                            <Button className="bg-[#4FD1C5] text-white" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card className='bg-white mt-4 border-none'>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <CardTitle className="text-lg font-semibold">Security</CardTitle>
                        <Button
                            className='w-fit bg-[#4FD1C5] cursor-pointer relative z-10'
                            onClick={() => {
                                console.log("Button Clicked");
                                setShowForm(!showForm);
                            }}
                        >
                            {showForm ? "Cancel" : "Change Password"}
                        </Button>
                    </div>
                </CardHeader>
                {showForm && (
                    <Card className="p-4 border-none">
                        <div className="space-y-4 w-1/2">
                            <div>
                                <Label className="text-black font-semibold">Current Password</Label>
                                <Input
                                    name='old_password'
                                    type="password"
                                    className="bg-gray-200 border-none text-black"
                                    value={passwordForm.old_password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div>
                                <Label className="text-black font-semibold">New Password</Label>
                                <Input
                                    name='password'
                                    type="password"
                                    className="bg-gray-200 border-none text-black"
                                    value={passwordForm.password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div>
                                <Label className="text-black font-semibold">Confirm Password</Label>
                                <Input
                                    name='password_confirmation'
                                    type="password"
                                    className="bg-gray-200 border-none text-black"
                                    value={passwordForm.password_confirmation}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <Button
                                className="bg-[#4FD1C5] mt-4"
                                onClick={handlePasswordUpdate}
                                disabled={isLoadingPassword}
                            >
                                {isLoadingPassword ? "Updating..." : "Save Password"}
                            </Button>
                        </div>
                    </Card>
                )}
            </Card>
        </>
    );
};

export default ProfileCompany;
