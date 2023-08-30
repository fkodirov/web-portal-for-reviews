import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomId,
//   randomArrayItem,
// } from "@mui/x-data-grid-generator";

// const roles = ["Market", "Finance", "Development"];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

const initialRows: GridRowsProp = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    joinDate: new Date("2023-01-15"),
    role: "Trader",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 36,
    joinDate: new Date("2022-08-10"),
    role: "Analyst",
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 19,
    joinDate: new Date("2023-03-22"),
    role: "Trader",
  },
  {
    id: 4,
    name: "Emily Williams",
    age: 28,
    joinDate: new Date("2021-11-05"),
    role: "Manager",
  },
  {
    id: 5,
    name: "William Brown",
    age: 23,
    joinDate: new Date("2023-05-18"),
    role: "Trader",
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar() {
  // const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    // const id = 1;
    // setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    // setRowModesModel((oldModel) => ({
    //   ...oldModel,
    //   [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    // }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    // setRowModesModel({
    //   ...rowModesModel,
    //   [id]: { mode: GridRowModes.View, ignoreModifications: true },
    // });
    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow!.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  // const processRowUpdate = (newRow: GridRowModel) => {
  //   const updatedRow = { ...newRow, isNew: false };
  //   setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  //   return updatedRow;
  // };

  // const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
  //   setRowModesModel(newRowModesModel);
  // };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180, editable: false },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "joinDate",
      headerName: "Join date",
      type: "date",
      width: 180,
      editable: false,
    },
    {
      field: "role",
      headerName: "Department",
      width: 220,
      editable: false,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        // const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        // if (isInEditMode) {
        //   return [
        //     <GridActionsCellItem
        //       icon={<SaveIcon />}
        //       label="Save"
        //       sx={{
        //         color: "primary.main",
        //       }}
        //       onClick={handleSaveClick(id)}
        //     />,
        //     <GridActionsCellItem
        //       icon={<CancelIcon />}
        //       label="Cancel"
        //       className="textPrimary"
        //       onClick={handleCancelClick(id)}
        //       color="inherit"
        //     />,
        //   ];
        // }

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
        rows={rows}
        columns={columns}
        // isCellEditable={() => false}
        // editMode="row"
        // rowModesModel={rowModesModel}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        // slotProps={{
        //   toolbar: { setRows, setRowModesModel },
        // }}
      />
    </Box>
  );
}
