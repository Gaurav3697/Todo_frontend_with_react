import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, isAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    } 
    if(user){
      setLoading(false);
      toast.success(user.name , " is logged in");
    }
  }, [isAuthenticated, user, navigate]);

    // Handle loading state or undefined user
    if (!user) {
      setLoading(true);
    }
  
  return (
    <main className="cd__main">
      <div className="profile-page">
        <div className="content">
          <div className="content__title">
            <h1>{user.name}</h1><span>Email: {user.email}</span>
          </div>
          <div className="content__description">
            <p>CreatedAt: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="bg">
          <div>
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div className="theme-switcher-wrapper" id="theme-switcher-wrapper">
          <span>Themes color</span>
        </div>
      </div>
    </main>
  );
}

export default Profile;
