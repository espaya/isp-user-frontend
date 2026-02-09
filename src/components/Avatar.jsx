import { useRef, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function Avatar() {
  const apiBase = import.meta.env.VITE_API_URL;
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState("/images/avatar.png");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const uploadAvatar = async (file) => {
    if (!file) return;

    // Validate image
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid file",
        text: "Please upload an image file.",
      });
      return;
    }

    // Preview image immediately
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);

    try {
      const response = await fetch(`${apiBase}/api/upload-avatar`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Upload failed",
          text: data.message || "Something went wrong.",
        });
        return;
      }

      // If backend returns saved url
      if (data.avatar_url) {
        setPreview(data.avatar_url);
      }

      Swal.fire({
        icon: "success",
        title: "Uploaded",
        text: "Avatar updated successfully.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    uploadAvatar(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    uploadAvatar(file);
  };

  return (
    <div className="text-center">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`position-relative mx-auto rounded-circle shadow-sm ${
          dragging ? "border border-primary" : "border border-light"
        }`}
        style={{
          width: 110,
          height: 110,
          overflow: "hidden",
          cursor: "default",
          background: "#f8f9fa",
          borderStyle: dragging ? "dashed" : "solid",
          borderWidth: "2px",
        }}
      >
        {/* Avatar */}
        <img
          src={preview}
          alt="Avatar"
          className="w-100 h-100"
          style={{ objectFit: "cover", opacity: uploading ? 0.5 : 1 }}
        />

        {/* Uploading overlay */}
        {uploading && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(255,255,255,0.6)" }}
          >
            <small className="fw-bold text-dark">Uploading...</small>
          </div>
        )}

        {/* Camera Icon Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="btn btn-sm btn-dark position-absolute"
          style={{
            bottom: 5,
            right: 5,
            borderRadius: "50%",
            width: 32,
            height: 32,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="fas fa-camera" />
        </button>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          hidden
        />
      </div>

      <small className="text-muted d-block mt-2">Drag & drop to upload</small>
    </div>
  );
}
