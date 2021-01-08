import React from "react";
import { AmplifySignUp } from "@aws-amplify/ui-react";
import "./Signup.css";

const Signup = () => {
  return (
    <AmplifySignUp
      slot="sign-up"
      usernameAlias="email"
      formFields={[
        {
          type: "email",
          label: "Email *",
          placeholder: "Email",
          required: true
        },
        {
          type: "password",
          label: "Password *",
          placeholder: "Password",
          required: true
        },
        {
          type: "name",
          label: "First Name *",
          placeholder: "First Name",
          required: true
        },
        {
          type: "family_name",
          label: "Last Name *",
          placeholder: "Last Name",
          required: true
        },
        {
          type: "phone_number",
          label: "Phone number",
          placeholder: "Phone Number",
          required: false
        }
      ]}
    />
  );
};

export default Signup;
