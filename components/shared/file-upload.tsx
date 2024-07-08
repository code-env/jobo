import React from "react";

import { UploadDropzone } from "@/utils/uploadthing";

import Image from "next/image";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string[];
  endPoint: "imageUploader";
}

const FileUpload = ({ onChange, value, endPoint }: FileUploadProps) => {
  return (
    <div className="flex">
      {value.length !== 0 ? (
        value.map((val, index) => (
          <div key={index} className="flex flex-1 gap-3 relative h-28 max-w-28">
            <Image fill src={val} alt="nothing" />
          </div>
        ))
      ) : (
        <UploadDropzone
          onClientUploadComplete={(res) => {
            res.map((image) => onChange(image.url));
          }}
          endpoint={endPoint}
          className="dropzone"
          appearance={{
            button:
              "ut-uploading:cursor-not-allowed ut-uploading:bg outline-none nothing-btn after:bg-black dark:after:bg-white focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0",
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      )}
    </div>
  );
};

export default FileUpload;
