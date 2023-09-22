import { useEffect, useContext, useState, FC } from "react";
import { Context } from "../main";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import ReviewService from "../services/ReviewService";
import { IReview } from "../models/IReview";
import { IUser } from "../models/IUser";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, deleteObject } from "firebase/storage";
import removeMd from "remove-markdown";
import RatingService from "../services/RatingService";

const ReviewList: FC<{ user: IUser }> = ({ user }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const { store } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(user) !== "{}") getUserReviews();
  }, [user, store.isSaving]);

  const getUserReviews = async () => {
    try {
      const response = await ReviewService.fetchUserReviews(user.id);
      setReviews(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`${id}/edit`);
  };

  const handlePreviewClick = (id: GridRowId) => () => {
    navigate(`${id}/preview`);
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
    try {
      await RatingService.deleteRating(+id);
      store.setRatings(store.reviewRating.filter((e) => e.reviewId != id));
    } catch (e) {
      console.log(e);
    }
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
      valueGetter: (params) => removeMd(params.value),
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
      field: "authorRating",
      headerName: "AuthorRating",
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
            title="Edit"
          />,
          <GridActionsCellItem
            icon={<PreviewIcon />}
            label="Preview"
            className="textPrimary"
            onClick={handlePreviewClick(id)}
            color="inherit"
            title="Preview"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            title="Delete"
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
