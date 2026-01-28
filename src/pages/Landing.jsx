import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useProject } from '../context/ProjectContext';
import { INDUSTRY_OPTIONS, PROJECT_CATEGORY_OPTIONS } from '../constants/projectOptions';
import { fileAPI } from '../services/api';
import Header from '../components/layout/Header';
import LeftSidebar from '../components/layout/LeftSidebar';
import Stepper from '../components/common/Stepper';
import Input from '../components/common/Input';
import Dropdown from '../components/common/Dropdown';
import SearchableDropdown from '../components/common/SearchableDropdown';
import Textarea from '../components/common/Textarea';
import Button from '../components/common/Button';

/**
 * Landing Page Component
 * @description Single-page questionnaire form to collect project requirements
 */
const Landing = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { projectData, updateProjectData } = useProject();

  // File upload state
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');

  // Local state for this page's fields
  const formData = {
    clientIndustry: projectData.clientIndustry,
    projectTitle: projectData.projectTitle,
    projectCategory: projectData.projectCategory,
    projectCategoryOther: projectData.projectCategoryOther,
    projectObjective: projectData.projectObjective,
    businessRequirements: projectData.businessRequirements,
    technicalRequirements: projectData.technicalRequirements,
    fileUploads: projectData.fileUploads,
  };

  const handleChange = (field, value) => {
    updateProjectData({ [field]: value });
  };

  // File validation constants
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const MAX_FILES = 10;

  // Validate file
  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      return `File ${file.name} exceeds 50MB limit`;
    }
    if (formData.fileUploads.length >= MAX_FILES) {
      return `Maximum ${MAX_FILES} files allowed`;
    }
    return null;
  };

  // Handle file selection and upload
  const handleFileSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    setUploadError('');

    for (const file of selectedFiles) {
      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setUploadError(validationError);
        continue;
      }

      // Add to uploading state
      const uploadId = Date.now() + Math.random();
      setUploadingFiles(prev => [...prev, { id: uploadId, name: file.name, progress: 0 }]);

      try {
        // Get access token
        const accessToken = await getAccessTokenSilently();

        // Upload file
        const response = await fileAPI.uploadFile(file, accessToken);

        // Add uploaded file to project data
        updateProjectData({
          fileUploads: [
            ...formData.fileUploads,
            {
              fileUrl: response.fileUrl,
              fileName: response.fileName,
              fileSize: response.fileSize,
              mimeType: response.mimeType,
            },
          ],
        });

        // Remove from uploading state
        setUploadingFiles(prev => prev.filter(f => f.id !== uploadId));
      } catch (error) {
        console.error('File upload error:', error);
        setUploadError(`Failed to upload ${file.name}: ${error.message}`);
        setUploadingFiles(prev => prev.filter(f => f.id !== uploadId));
      }
    }

    // Reset input
    e.target.value = '';
  };

  // Remove uploaded file
  const handleRemoveFile = (index) => {
    const newFiles = formData.fileUploads.filter((_, i) => i !== index);
    updateProjectData({ fileUploads: newFiles });
  };

  // Set default industry if not already set
  useEffect(() => {
    if (!formData.clientIndustry && INDUSTRY_OPTIONS.length === 1) {
      updateProjectData({ clientIndustry: INDUSTRY_OPTIONS[0].value });
    }
  }, []);

  // Check if all mandatory fields are filled
  const isFormValid = () => {
    const mandatoryFieldsFilled =
      formData.clientIndustry &&
      formData.projectTitle &&
      formData.projectCategory &&
      formData.projectObjective &&
      formData.businessRequirements;

    // If "Other" is selected for project category, projectCategoryOther is also required
    if (formData.projectCategory === 'other') {
      return mandatoryFieldsFilled && formData.projectCategoryOther;
    }

    return mandatoryFieldsFilled;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      console.log('Page 1 Data:', formData);
      // Navigate to Timeline & Budget page
      navigate('/budget-timeline');
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex-1 bg-gray-100 overflow-auto">
        <div className="relative min-h-full flex flex-col lg:flex-row">
          {/* Left Section with background */}
          <LeftSidebar />

          {/* Right Section */}
          <div className="flex-1 lg:px-12 px-6 py-8 flex flex-col items-center">
            <div className="w-full max-w-5xl">
              {/* Progress Stepper */}
              <div className="mb-3 py-4">
                <div className="flex items-start justify-between">
                  <Stepper
                    stepNumber={1}
                    label="Project Details"
                    isActive={true}
                  />
                  <Stepper
                    stepNumber={2}
                    label="Timeline & Budget"
                  />
                  <Stepper
                    stepNumber={3}
                    label="Review & Submit"
                  />
                </div>
              </div>

              {/* White Form Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="space-y-6">
                  <Dropdown
                    label="Client Industry"
                    name="clientIndustry"
                    options={INDUSTRY_OPTIONS}
                    value={formData.clientIndustry}
                    onChange={(e) => handleChange('clientIndustry', e.target.value)}
                    placeholder="Select industry"
                    required
                  />

                  <Input
                    label="Project Title"
                    name="projectTitle"
                    placeholder="Intapp Cloud Migration"
                    value={formData.projectTitle}
                    onChange={(e) => handleChange('projectTitle', e.target.value)}
                    required
                  />

                  <div>
                    <SearchableDropdown
                      label="Project Category"
                      name="projectCategory"
                      options={PROJECT_CATEGORY_OPTIONS}
                      value={formData.projectCategory}
                      onChange={(e) => handleChange('projectCategory', e.target.value)}
                      placeholder="Search for project category..."
                      required
                    />
                    {formData.projectCategory === 'other' && (
                      <div className="mt-4">
                        <Input
                          name="projectCategoryOther"
                          placeholder="Please specify your project category"
                          value={formData.projectCategoryOther}
                          onChange={(e) => handleChange('projectCategoryOther', e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <Textarea
                    label="Project Objective"
                    name="projectObjective"
                    rows={3}
                    placeholder="Migrate our existing on-prem Intapp application to the cloud to improve scalability, reliability, and performance while reducing infrastructure maintenance and operational risk."
                    value={formData.projectObjective}
                    onChange={(e) => handleChange('projectObjective', e.target.value)}
                    tooltip="What is the primary outcome of this project? Describe the business goal and success criteria. Avoid technical implementation details."
                    required
                  />

                  <Textarea
                    label="Business Requirements"
                    name="businessRequirements"
                    rows={4}
                    placeholder="The solution must support legal and finance teams across multiple offices, minimize downtime during migration, meet data security and retention requirements, and align with internal IT governance and change-management processes."
                    value={formData.businessRequirements}
                    onChange={(e) => handleChange('businessRequirements', e.target.value)}
                    tooltip="What does the business need from this project? Include scope, users, compliance needs, and operational constraints. Exclude technical specifics."
                    required
                  />

                  <Textarea
                    label="Technical Requirements"
                    name="technicalRequirements"
                    rows={4}
                    placeholder="Preference for Azure cloud environment. Must integrate with Microsoft Entra ID, Exchange Online, and existing monitoring tools. Hybrid deployment acceptable during transition."
                    value={formData.technicalRequirements}
                    onChange={(e) => handleChange('technicalRequirements', e.target.value)}
                    tooltip="List known technical constraints or preferences. If unsure, leave this blank—vendors can help define the approach."
                  />

                  <div>
                    <label className="block text-sm font-normal text-gray-700 mb-2">
                      File Uploads (Optional)
                      <span className="text-xs text-gray-500 ml-2">
                        Max 50MB per file, {MAX_FILES} files max
                      </span>
                    </label>

                    {/* Upload Error */}
                    {uploadError && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {uploadError}
                      </div>
                    )}

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="fileUploads"
                        name="fileUploads"
                        multiple
                        className="hidden"
                        onChange={handleFileSelect}
                        disabled={formData.fileUploads.length >= MAX_FILES}
                      />
                      <label htmlFor="fileUploads" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-3 text-gray-600">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <div className="text-center">
                            <span className="text-sm font-medium">
                              {formData.fileUploads.length >= MAX_FILES
                                ? 'Maximum files reached'
                                : 'Click to upload files'}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              PDFs, diagrams, specifications, or other relevant documents
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>

                    {/* Uploading Files */}
                    {uploadingFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {uploadingFiles.map((file) => (
                          <div key={file.id} className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded">
                            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="flex-1">{file.name}</span>
                            <span className="text-xs text-blue-600">Uploading...</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Uploaded Files */}
                    {formData.fileUploads.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.fileUploads.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 border border-green-200 px-3 py-2 rounded">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="flex-1">{file.fileName}</span>
                            <span className="text-xs text-gray-500">
                              {(file.fileSize / 1024).toFixed(1)} KB
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Remove file"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="primary"
                      size="large"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={!isFormValid()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
