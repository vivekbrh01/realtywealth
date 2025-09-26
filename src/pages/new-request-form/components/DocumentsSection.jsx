import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const DocumentsSection = ({ documents, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // File type configurations
  const allowedFileTypes = {
    'image/jpeg': { icon: 'Image', color: 'blue', label: 'JPEG' },
    'image/png': { icon: 'Image', color: 'blue', label: 'PNG' },
    'image/gif': { icon: 'Image', color: 'blue', label: 'GIF' },
    'application/pdf': { icon: 'FileText', color: 'red', label: 'PDF' },
    'application/msword': { icon: 'FileText', color: 'blue', label: 'DOC' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { icon: 'FileText', color: 'blue', label: 'DOCX' },
    'application/vnd.ms-excel': { icon: 'BarChart', color: 'green', label: 'XLS' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { icon: 'BarChart', color: 'green', label: 'XLSX' },
    'application/vnd.ms-powerpoint': { icon: 'Monitor', color: 'orange', label: 'PPT' },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': { icon: 'Monitor', color: 'orange', label: 'PPTX' },
    'text/plain': { icon: 'FileText', color: 'gray', label: 'TXT' },
    'text/csv': { icon: 'BarChart', color: 'green', label: 'CSV' }
  };

  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxFiles = 5;

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  // Get file type info
  const getFileTypeInfo = (type) => {
    return allowedFileTypes?.[type] || { icon: 'File', color: 'gray', label: 'Unknown' };
  };

  // Validate files
  const validateFiles = (fileList) => {
    const files = Array.from(fileList);
    const errors = [];

    // Check file count
    if (documents?.length + files?.length > maxFiles) {
      errors?.push(`Maximum ${maxFiles} files allowed. You can upload ${maxFiles - documents?.length} more files.`);
      return { valid: false, errors };
    }

    // Check each file
    files?.forEach((file, index) => {
      // Check file size
      if (file?.size > maxFileSize) {
        errors?.push(`File "${file?.name}" is too large. Maximum size is ${formatFileSize(maxFileSize)}.`);
      }

      // Check file type
      if (!allowedFileTypes?.[file?.type]) {
        errors?.push(`File "${file?.name}" has unsupported format. Please use supported formats.`);
      }

      // Check for duplicates
      const duplicate = documents?.find(doc => doc?.name === file?.name && doc?.size === file?.size);
      if (duplicate) {
        errors?.push(`File "${file?.name}" is already uploaded.`);
      }
    });

    return { valid: errors?.length === 0, errors };
  };

  // Handle file selection
  const handleFileSelect = (files) => {
    const validation = validateFiles(files);

    if (!validation?.valid) {
      alert(validation?.errors?.join('\n'));
      return;
    }

    const newFiles = Array.from(files)?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      file: file,
      uploadProgress: 0,
      uploaded: false
    }));

    // Simulate file upload
    newFiles?.forEach(fileObj => {
      simulateUpload(fileObj);
    });

    onChange([...documents, ...newFiles]);
  };

  // Simulate file upload progress
  const simulateUpload = (fileObj) => {
    const interval = setInterval(() => {
      fileObj.uploadProgress += Math.random() * 30;

      if (fileObj?.uploadProgress >= 100) {
        fileObj.uploadProgress = 100;
        fileObj.uploaded = true;
        clearInterval(interval);
      }

      // Trigger re-render by updating documents array
      onChange(documents?.map(doc => doc?.id === fileObj?.id ? { ...fileObj } : doc));
    }, 200);
  };

  // Handle drag events
  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    if (e?.dataTransfer?.files?.length > 0) {
      handleFileSelect(e?.dataTransfer?.files);
    }
  };

  // Remove file
  const removeFile = (fileId) => {
    onChange(documents?.filter(doc => doc?.id !== fileId));
  };

  // Open file input
  const openFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Supporting Documents
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload relevant documents, quotations, approvals, or any files that support your request.
        </p>
      </div>

      {/* Upload Area */}
      <div className="space-y-6">
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
            dragActive
              ? "border-primary bg-primary/5" : "border-border bg-muted/50 hover:border-primary/50 hover:bg-muted"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={Object.keys(allowedFileTypes)?.join(',')}
            onChange={(e) => handleFileSelect(e?.target?.files)}
            className="hidden"
          />

          <div className="space-y-4">
            {/* Upload Icon */}
            <div className={cn(
              "w-16 h-16 mx-auto rounded-full flex items-center justify-center",
              dragActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}>
              <Icon name="Upload" size={32} />
            </div>

            {/* Upload Text */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">
                {dragActive ? "Drop your files here" : "Upload supporting documents"}
              </h4>
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or{" "}
                <button
                  type="button"
                  onClick={openFileInput}
                  className="text-primary hover:underline font-medium"
                >
                  browse files
                </button>
              </p>
            </div>

            {/* Upload Guidelines */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Maximum file size: {formatFileSize(maxFileSize)}</p>
              <p>Maximum files: {maxFiles} | Remaining: {maxFiles - documents?.length}</p>
              <p>Supported: PDF, DOC, XLS, PPT, Images, TXT, CSV</p>
            </div>
          </div>
        </div>

        {/* Quick Upload Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={openFileInput}
            iconName="FileText"
          >
            Documents
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={openFileInput}
            iconName="Image"
          >
            Images
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={openFileInput}
            iconName="BarChart"
          >
            Spreadsheets
          </Button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {documents?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Paperclip" size={18} className="text-primary" />
              <span>Uploaded Files ({documents?.length})</span>
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange([])}
              iconName="Trash2"
              disabled={documents?.length === 0}
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-3">
            {documents?.map((doc) => {
              const fileTypeInfo = getFileTypeInfo(doc?.type);

              return (
                <div
                  key={doc?.id}
                  className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
                >
                  {/* File Icon */}
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    `bg-${fileTypeInfo?.color}-100`
                  )}>
                    <Icon
                      name={fileTypeInfo?.icon}
                      size={20}
                      className={`text-${fileTypeInfo?.color}-600`}
                    />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground truncate">
                        {doc?.name}
                      </p>
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full",
                        `bg-${fileTypeInfo?.color}-100 text-${fileTypeInfo?.color}-700`
                      )}>
                        {fileTypeInfo?.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(doc?.size)}
                    </p>

                    {/* Upload Progress */}
                    {!doc?.uploaded && (
                      <div className="mt-2">
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${doc?.uploadProgress || 0}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploading... {Math.round(doc?.uploadProgress || 0)}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* File Status */}
                  <div className="flex items-center space-x-2">
                    {doc?.uploaded ? (
                      <Icon name="CheckCircle" size={20} className="text-green-600" />
                    ) : (
                      <Icon name="Clock" size={20} className="text-muted-foreground" />
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(doc?.id)}
                      iconName="X"
                      className="text-muted-foreground hover:text-destructive"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Document Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} className="text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Helpful Documents:</p>
              <ul className="text-xs space-y-1 text-blue-700">
                <li>Quotations and price comparisons</li>
                <li>Technical specifications</li>
                <li>Previous approvals or references</li>
                <li>Budget breakdowns or cost analysis</li>
              </ul>
            </div>
          </div >
        </div >

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={18} className="text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">Document Tips:</p>
              <ul className="text-xs space-y-1 text-green-700">
                <li>Clear, readable scans or photos</li>
                <li>Organize files logically</li>
                <li>Include version numbers if applicable</li>
                <li>Ensure sensitive info is redacted</li>
              </ul >
            </div >
          </div >
        </div >
      </div >

      {/* Optional Notice */}
      {
        documents?.length === 0 && (
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="FileText" size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">No documents uploaded</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Documents are optional but can help speed up the approval process
            </p>
          </div>
        )
      }
    </div >
  );
};

export default DocumentsSection;