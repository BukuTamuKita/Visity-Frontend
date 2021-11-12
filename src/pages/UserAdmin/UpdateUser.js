import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  SHOW_USER 
} from "../../constants/urls";
import UserForm from "../../components/UserForm/UserForm";
import { getToken } from "../../utils/auth";

const UpdateUser = (props) => {
  const { state } = props.location;
  console.log("ini dari updateuser: ", state);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get(SHOW_USER(state), {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    
    fetchUser();
  }, [state]);

  console.log("realuser: ", user);

  const pageAttr = {
    title: "Update",
  };

  return (
    <UserForm 
      title={pageAttr.title}
      data={user}
    />
  )
}

export default UpdateUser;