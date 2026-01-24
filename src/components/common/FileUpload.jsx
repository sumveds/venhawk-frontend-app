import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FiUpload, FiX } from 'react-icons/fi';

/**
 * FileUpload Component
 * @description File upload component with drag-and-drop support
 */
const FileUpload = ({
  label,
  name,
  accept,
  onChange,
  error,
  required = false,
  disabled = false,
  multiple = false,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const filesArray = Array.from(fileList);
    setFiles(filesArray);
    if (onChange) {
      onChange(filesArray);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onChange) {
      onChange(updatedFiles);
    }
  };

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label className="block text-sm font-normal text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={clsx(
          'relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200',
          'bg-gray-50',
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : error
            ? 'border-red-500'
            : 'border-gray-300 hover:border-gray-400',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          multiple={multiple}
          className="hidden"
        />

        <label
          htmlFor={name}
          className={clsx(
            'cursor-pointer flex flex-col items-center',
            disabled && 'cursor-not-allowed'
          )}
        >
          <div className="w-12 h-12 mb-3 text-gray-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12h6m-6 0l3-3m-3 3l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2v7m0 0L9 6m3 3l3-3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-sm text-gray-700 font-medium mb-1">
            {files.length > 0 ? `${files.length} file(s) selected` : 'Upload files'}
          </p>
          {accept && (
            <p className="text-xs text-gray-500">
              Supported formats: {accept}
            </p>
          )}
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
            >
              <span className="text-sm text-gray-700 truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  className: PropTypes.string,
};

export default FileUpload;
