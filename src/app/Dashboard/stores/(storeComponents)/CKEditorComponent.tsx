// CKEditor.tsx
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CKEditorProps {
  value: string;
  onChange: (event: any, editor: any) => void;
  placeholder: string;
  style?: React.CSSProperties;
}

const CKEditorComponent: React.FC<CKEditorProps> = ({
  value,
  onChange,
  placeholder,
  style,
}) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: placeholder,
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "imageUpload",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
          ],
          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:full",
              "imageStyle:side",
            ],
          },
          mediaEmbed: {
            previewsInData: true,
          },
          simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: "/upload", // Update this to your server's upload endpoint
            // Enable the XMLHttpRequest.withCredentials property.
            withCredentials: true,
            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
              "X-CSRF-TOKEN": "CSRF-Token",
              Authorization: "Bearer <JSON Web Token>",
            },
          },
        }}
        data={value}
        onChange={onChange}
       
      />
    </div>
  );
};

export default CKEditorComponent;
