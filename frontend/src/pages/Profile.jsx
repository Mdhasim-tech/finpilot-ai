import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import ProfileForm from "../components/profile/ProfileForm";

import {
    getProfile,
    updateProfile,
} from "../services/profileService";

import "../styles/profile.css";

function Profile() {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const data = await getProfile();

            setUser(data.user);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleSave = async (profileData) => {

        try {

            const data = await updateProfile(profileData);

            setUser(data.user);

            alert("Profile updated successfully.");

        } catch (error) {

            console.log(error);

            alert("Unable to update profile.");

        }

    };

    if (loading) {

        return (

            <Layout>

                <h2>Loading...</h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="profile-page">

                <h1>My Profile</h1>

                <ProfileForm

                    user={user}

                    onSave={handleSave}

                />

            </div>

        </Layout>

    );

}

export default Profile;