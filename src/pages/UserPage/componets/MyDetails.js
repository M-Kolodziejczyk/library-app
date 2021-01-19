import React from "react";
import { useAuthContext } from "../../../context/auth/AuthState";
import "./MyDetails.css";

const MyDetails = () => {
  const { user } = useAuthContext();
  console.log("Details user", user);

  return (
    <div className="myDetails">
      <h2>My Details</h2>
      <div className="myDetails__personalInformation">
        <h5>Personal Information</h5>
        <div className="myDetails__personalInformationGroup">
          <p className="myDetails__personalInformationLabel">Email:</p>
          <p className="myDetails__personalInformationContent">
            {user && user.email}
          </p>
        </div>
        <div className="myDetails__personalInformationGroup">
          <p className="myDetails__personalInformationLabel">First Name:</p>
          <p className="myDetails__personalInformationContent">
            {user && user.given_name}
          </p>
        </div>
        <div className="myDetails__personalInformationGroup">
          <p className="myDetails__personalInformationLabel">Last Name:</p>
          <p className="myDetails__personalInformationContent">
            {user && user.family_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
