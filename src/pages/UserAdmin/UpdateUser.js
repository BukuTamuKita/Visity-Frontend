import React, { useState, useEffect } from "react";
import axios from "axios";
import { JWT_HEADER, SHOW_USER } from "../../constants/urls";
import UserForm from "../../components/UserForm/UserForm";

const UpdateUser = (props) => {
  const { state } = props.location;
  console.log("ini dari updateuser: ", state);
  const [user, setUser] = useState({});

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        Authorization: `Bearer ${JWT_HEADER}`,
    },
  });

  const fetchUser = () => {
    authAxios.get(SHOW_USER(state))
    .then((res) => {
      setUser(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("realuser: ", user);

  const pageAttr = {
    title: "Update",
  };

  return (
    <UserForm 
      title={pageAttr.title}
      user={user}
    />
  )
}

export default UpdateUser;