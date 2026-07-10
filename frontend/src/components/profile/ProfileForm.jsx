import { useEffect, useState } from "react";

function ProfileForm({ user, onSave }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {

        if (user) {

            setFormData({
                name: user.name,
                email: user.email,
            });

        }

    }, [user]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    return (

        <form
            className="profile-form"
            onSubmit={handleSubmit}
        >

            <div className="avatar">

                {formData.name.charAt(0).toUpperCase()}

            </div>

            <div className="form-group">

                <label>Full Name</label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

            </div>

            <div className="form-group">

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

            </div>

            <div className="form-group">

                <label>Member Since</label>

                <input
                    type="text"
                    value={
                        new Date(
                            user.createdAt
                        ).toLocaleDateString()
                    }
                    disabled
                />

            </div>

            <button
                className="save-btn"
                type="submit"
            >
                Save Changes
            </button>

        </form>

    );

}

export default ProfileForm;