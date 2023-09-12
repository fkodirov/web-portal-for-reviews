import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import UserList from "./UserList";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  return (
    <>
      <div className="container">
        <h2>User List</h2>
        <UserList />
      </div>
    </>
  );
};

export default Dashboard;
