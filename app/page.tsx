"use client";

import { useState } from "react";
import { pinata } from "./lib/pinata";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      setUploading(true);
      const keyRequest = await fetch("/api/key");
      const keyData = await keyRequest.json();
      const upload = await pinata.upload.file(file).key(keyData.JWT);
      console.log(upload);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };
  return (
    <>
      <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
        <input type="file" onChange={handleChange} />
        <button type="button" disabled={uploading} onClick={uploadFile}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </main>
    </>
  );
}
