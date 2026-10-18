"use client";
import FileInput from "@/app/components/FileInput";
import FormField from "@/app/components/FormField";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { ChangeEvent, SubmitEvent, useState } from "react";

const page = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormdata] = useState<VideoFormValues>({
    title: "",
    description: "",
    tags: "",
    visibility: "public",
  });
  const video = useFileInput(MAX_VIDEO_SIZE);
  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  //envoyer le formulaire
  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (!video.file || !thumbnail.file) {
        setError("Veuillez importer les fichiers vidéo et les miniatures.");
        return;
      }

      if (!formData.title || !formData.description) {
        setError("Veuillez remplir tous les champs obligatoires.");
        return;
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="wrapper-md upload-page">
      <h1>Importer une video</h1>

      {error && <div className="error-field"> {error}</div>}

      <form
        className="rounded-20 shadow-10 gap-6 w-full flex flex-col
      px-5 py-7.5"
        onSubmit={onSubmit}
      >
        <FormField
          id="title"
          label="Titre"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Saisissez un titre de vidéo clair et concis"
        />

        <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          as="textarea"
          placeholder="Décrivez le sujet de cette vidéo."
        />

        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleChangeFile}
          onReset={video.resetFile}
          type="video"
        />

        <FileInput
          id="miniature"
          label="Miniature"
          accept="image/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleChangeFile}
          onReset={thumbnail.resetFile}
          type="image"
        />

        <FormField
          id="visibility"
          label="Visibilité"
          value={formData.visibility}
          onChange={handleInputChange}
          as="select"
          options={[
            { value: "public", label: "Public" },
            { value: "private", label: "Privé" },
          ]}
        />

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Importation en cours..." : "Importer"}
        </button>
      </form>
    </main>
  );
};

export default page;
