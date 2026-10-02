"use client";
import FileInput from "@/app/components/FileInput";
import FormField from "@/app/components/FormField";
import { ChangeEvent, useState } from "react";

const page = () => {
  const [error, setError] = useState(null);
  const [formData, setFormdata] = useState({
    title: "",
    description: "",
    visibility: "public",
  });

  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>

      {error && <div className="error-field"> {error}</div>}

      <form
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col
      px-5 py-7.5"
      >
        <FormField
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a clear and concise video title"
        />

        <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          as="textarea"
          placeholder="Describe what this vidéo is about"
        />

        <FileInput />

        <FileInput />

        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          onChange={handleInputChange}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Private" },
          ]}
        />
      </form>
    </div>
  );
};

export default page;
