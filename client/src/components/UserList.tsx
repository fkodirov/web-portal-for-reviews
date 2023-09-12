// import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
// import EditIcon from "@mui/icons-material/Edit";
// import PreviewIcon from "@mui/icons-material/Preview";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
// import ReviewService from "../services/ReviewService";
import { IUser } from "../models/IUser";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const UserList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getUsers();
  }, []);
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEnterClick = (id: GridRowId) => () => {
    navigate(`/user/${id}/reviews`);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      minWidth: 200,
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 1,
      editable: false,
      type: "string",
    },
    {
      field: "actions",
      type: "actions",
      minWidth: 100,
      flex: 1,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<LoginIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEnterClick(id)}
            color="inherit"
            title="Enter"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default UserList;
