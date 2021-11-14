import React from "react";
import UserForm from "../../components/UserForm/UserForm";

const CreateUser = () => {
  const pageAttr = {
    title: "Create",
  };

  return (
    <UserForm 
      title={pageAttr.title}
    />
  )
};

export default CreateUser;