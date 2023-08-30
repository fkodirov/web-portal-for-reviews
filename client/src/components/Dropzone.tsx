import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "react-bootstrap-icons";
interface StyleType {
  [key: string]: string | number;
}
const baseStyle: StyleType = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle: StyleType = {
  borderColor: "#2196f3",
};

const acceptStyle: StyleType = {
  borderColor: "#00e676",
};

const rejectStyle: StyleType = {
  borderColor: "#ff1744",
};
interface DropzoneProps {
  onFileUpload: (file: File) => void;
  progress: number;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload, progress }) => {
  const [filename, setFilename] = useState("");
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        setFilename(file.name);
      });
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const uploadImage = () => {
    acceptedFiles.forEach((file) => {
      onFileUpload(file);
    });
  };
  return (
    <div className="d-flex justify-content-center flex-column">
      <div {...getRootProps({ style })}>
        <CloudUpload size={128}></CloudUpload>
        <input {...getInputProps()} />
        {filename ? (
          <p>{filename}</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div className="col mt-3">
        {progress ? (
          <button className="btn btn-danger" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span role="status"> Loading...</span>
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={uploadImage}
            type="button"
          >
            <span role="status">Upload</span>
          </button>
        )}
      </div>
    </div>
  );
};
export default Dropzone;
