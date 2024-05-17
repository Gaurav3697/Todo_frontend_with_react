import React, { useContext } from 'react'
import { Context } from '../main';

const Profile = () => {
  const { user } = useContext(Context);
  return (
    <>
     {/* user information will be shown only untill user has logged in */}
    <h1 align='center'>UserId:{user._id}</h1>
    <h3 align='center'>UserName:{user.name}</h3>
    <h3 align='center'>Email:{user.email}</h3>
    <h3 align='center'>CreatedAt:{user.createdAt}</h3>
    </>
  )
}

export default Profile 