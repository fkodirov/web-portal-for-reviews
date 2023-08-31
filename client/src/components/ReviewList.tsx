import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import ReviewService from "../services/ReviewService";
import { IReview } from "../models/IReview";
import { useNavigate } from "react-router-dom";

const ReviewList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getReviews();
  }, []);

  // const [rows, setRows] = React.useState(initialRows);
  const [reviews, setReviews] = React.useState<IReview[]>([]);

  const getReviews = async () => {
    try {
      const response = await ReviewService.fetchReviews();
      setReviews(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEditClick = (id: GridRowId) => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    navigate(`${id}/edit`);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setReviews(reviews.filter((row) => row.id !== id));
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "text",
      headerName: "Content",
      type: "string",
      minWidth: 200,
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: false,
      valueGetter: (params) => params.value.replace(/(<([^>]+)>)/gi, ""),
    },
    {
      field: "nameofart",
      headerName: "Name of art",
      type: "string",
      flex: 1,
      minWidth: 100,
      editable: false,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 1,
      editable: false,
      type: "string",
    },
    {
      field: "tags",
      headerName: "Tags",
      minWidth: 100,
      flex: 1,
      editable: false,
      type: "string",
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 100,
      flex: 0.7,
      editable: false,
      type: "number",
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
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
        rows={reviews}
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
export default ReviewList;
