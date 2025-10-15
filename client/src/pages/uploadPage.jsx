import React, { useState } from 'react';
import api from "../lib/api";
import { ArrowRight, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    // file type validation
    if (!file.name.endsWith(".xml")) {
      toast.error("Invalid file type. Please upload a valid XML file.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        toast.success("XML uploaded successfully!");
      } else {
        toast.error(res.data.message || "Upload failed. Please try again.");
      }
    } catch (err) {
      const backendMsg = err.response?.data?.message || "Upload failed. Please try again.";
      toast.error(backendMsg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-8 text-center min-h-[80svh] flex flex-col gap-6 justify-center items-center">
      <div className="bg-neutral-900 text-white shadow-lg py-10 px-6 flex flex-col gap-5 rounded-xl w-full max-w-md border border-neutral-700">
        <h1 className="text-3xl font-semibold mb-2">Upload XML File</h1>
        <p className="text-neutral-400 text-sm mb-2">Upload your Experian credit report (.xml) to generate insights.</p>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-600 rounded-lg py-8 cursor-pointer hover:border-white transition">
          <Upload size={28} className="text-gray-400 mb-2" />
          <span className="text-gray-300">{file ? file.name : "Choose XML file"}</span>
          <input
            type="file"
            accept=".xml"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`mt-2 bg-white text-black text-base font-semibold px-4 py-2 rounded cursor-pointer hover:bg-gray-100 transition ${isUploading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <Link to="/reports">
        <button className="group flex items-center gap-1 cursor-pointer bg-neutral-800 text-white px-5 py-2 rounded-md hover:bg-neutral-700 transition">
          See Report{" "}
          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition delay-100" />
        </button>
      </Link>
    </div>
  );
}
