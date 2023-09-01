import * as React from "react";
import { useEffect, useContext } from "react";
import { Context } from "../main";
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
import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";

const ReviewList = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    getReviews();
  }, [store.isSaving]);

  const [reviews, setReviews] = React.useState<IReview[]>([]);

  const getReviews = async () => {
    try {
      const response = await ReviewService.fetchReviews();
      setReviews(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleEditClick = (id: GridRowId) => () => {
    navigate(`${id}/edit`);
  };

  const handleDeleteImage = (image: string) => {
    const imageRef = ref(storage, image);
    deleteObject(imageRef)
      .then(() => {
        console.log("File deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };
  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      await ReviewService.deleteReview(+id);
    } catch (e) {
      console.log(e);
    }
    const imgUrl = reviews.filter((row) => row.id == id)[0].img;
    if (imgUrl) handleDeleteImage(imgUrl);
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
      field: "status",
      headerName: "Status",
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
