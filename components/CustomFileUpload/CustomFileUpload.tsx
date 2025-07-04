import React, { useRef, useState, useCallback } from "react";
import { FieldError } from "react-hook-form";
import "./CustomFileUpload.scss";
import { MdAttachFile } from "react-icons/md";

interface CustomFileUploadProps {
  label?: string;
  error?: FieldError;
  isLoading?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
  onFilesChange: (files: File[]) => void;
  files: File[];
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  label = "Adjuntar archivos",
  error,
  isLoading = false,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt",
  maxFiles = 3,
  maxSizePerFile = 10,
  onFilesChange,
  files,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File): string | null => {
    // Check file size (convert MB to bytes)
    if (file.size > maxSizePerFile * 1024 * 1024) {
      return `El archivo "${file.name}" excede el tamaño máximo de ${maxSizePerFile}MB`;
    }

    // Check file type
    const acceptedTypes = accept.split(",").map((type) => type.trim());
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!acceptedTypes.includes(fileExtension)) {
      return `El archivo "${file.name}" no es un tipo válido`;
    }

    return null;
  };

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      const fileArray = Array.from(newFiles);
      const validFiles: File[] = [];
      const errors: string[] = [];

      // Check total file count
      if (files.length + fileArray.length > maxFiles) {
        errors.push(`Máximo ${maxFiles} archivos permitidos`);
        return;
      }

      // Validate each file
      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          // Check for duplicates
          const isDuplicate = files.some(
            (existingFile) =>
              existingFile.name === file.name && existingFile.size === file.size
          );

          if (!isDuplicate) {
            validFiles.push(file);
          } else {
            errors.push(`El archivo "${file.name}" ya está seleccionado`);
          }
        }
      });

      if (errors.length > 0) {
        console.warn("File upload errors:", errors);
        // You could show these errors in a toast or state
      }

      if (validFiles.length > 0) {
        onFilesChange([...files, ...validFiles]);
      }
    },
    [files, maxFiles, onFilesChange, maxSizePerFile, accept]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (isLoading) return;

      handleFiles(e.dataTransfer.files);
    },
    [handleFiles, isLoading]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input value to allow same file selection
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      case "txt":
        return "📃";
      default:
        return "📎";
    }
  };

  return (
    <div
      className={`custom-file-upload ${error ? "error" : ""} ${
        isLoading ? "loading" : ""
      }`}
    >
      {label && <label className="file-upload-label">{label}</label>}

      {/* Upload Area */}
      <div
        className={`file-upload-area ${dragActive ? "drag-active" : ""} ${
          files.length > 0 ? "has-files" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleInputChange}
          disabled={isLoading}
          style={{ display: "none" }}
        />

        <div className="upload-content">
          <div className="upload-icon">
            <MdAttachFile />
          </div>
          <div className="upload-text">
            <p className="primary-text">
              {dragActive
                ? "Suelta los archivos aquí"
                : "Arrastra archivos aquí o haz clic para seleccionar"}
            </p>
            <p className="secondary-text">
              Máximo {maxFiles} archivos • {maxSizePerFile}MB por archivo
            </p>
            <p className="accepted-types">
              Formatos: PDF, DOC, DOCX, JPG, PNG, TXT
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="file-item">
              <div className="file-info">
                <span className="file-icon">{getFileIcon(file.name)}</span>
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatFileSize(file.size)}</span>
                </div>
              </div>
              <button
                type="button"
                className="remove-file"
                onClick={() => removeFile(index)}
                disabled={isLoading}
                aria-label={`Eliminar ${file.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && <span className="error-message">{error.message}</span>}

      {/* File Count Info */}
      {files.length > 0 && (
        <div className="file-count-info">
          {files.length} de {maxFiles} archivos seleccionados
        </div>
      )}
    </div>
  );
};

export default CustomFileUpload;
