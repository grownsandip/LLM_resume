import React, { useRef, useState,useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import "./Editor.css";
import { DNA } from "react-loader-spinner";
const EditorComponent = ({chatText}) => {
    const editorRef = useRef(null);
    const [editorContent,setEditorContent]=useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (chatText) {
        const htmlContent = DOMPurify.sanitize(chatText);
        setEditorContent(htmlContent);
        if (editorRef.current) {
          editorRef.current.setContent(htmlContent); // Set content directly to TinyMCE
        }
      }
    }, [chatText]);

  //Handle change in editor content
  const handleEditorChange = (content) => {
      setEditorContent(content);
    
  };

  return (
    <div className="editor">{isLoading && (
        <DNA
        visible={true}
        height="600"
        width="300"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        />
      )}
        <Editor
          apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
          value={editorContent}
          onInit={(evt, editor) => {
            setIsLoading(false);
            editorRef.current = editor; // Set reference to TinyMCE editor
            //editor.setContent(editorContent);
          }}
          onEditorChange={handleEditorChange}
          init={{
            skin: "oxide-dark",
            content_css: "document",
            content_style: "body{text-color: #474e59;}",
            plugins: [
              // Core editing features
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "image",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until Oct 8, 2024:
              "checklist",
              "mediaembed",
              "casechange",
              "export",
              "formatpainter",
              "pageembed",
              "a11ychecker",
              "tinymcespellchecker",
              "permanentpen",
              "powerpaste",
              "advtable",
              "advcode",
              "editimage",
              "advtemplate",
              "mentions",
              "tinycomments",
              "tableofcontents",
              "footnotes",
              "mergetags",
              "autocorrect",
              "typography",
              "inlinecss",
              "markdown",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | bold italic underline | markdown",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
          }}
        />
    </div>
  )
}

export default EditorComponent