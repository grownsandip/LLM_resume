import React, { useState} from "react";
import "./just.css";
import Groq from "groq-sdk";
import pdfToText from "react-pdftotext";
import EditorComponent from "./EditorComponent";


const Just = () => {
  const [prompt, setPrompt] = useState("");;
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [chatText,setChatText]=useState("")
  const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const extractTextFromPDF = async (uploadedFile) => {
    try {
      const extractedText = await pdfToText(uploadedFile);
      //console.log(extractedText);
      return extractedText;
    } catch (err) {
      console.log("error occured", err);
      return null;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    if (file && file.type === "application/pdf") {
      //setUploadedFile(file)
      //console.log(uploadedFile)
      const text = await extractTextFromPDF(file);
      // console.log(text)
      if (text) {
        setExtractedText(text); 
      }
      setUploadedFile(null); 
    } else {
      console.log("Please upload a valid PDF file.");
    }
  };
  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    const trick="you are providing output on a web based document editor only out put the HTML and styling content the output will be dompurified";
    const finalPrompt = `${extractedText} ${prompt} ${trick}`.trim();
    setPrompt("");
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: finalPrompt,
          },
        ],
        model: "llama-3.1-70b-versatile",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null,
      });
      let chatResponse = "";
      for await (const chunk of chatCompletion) {
        chatResponse+=chunk.choices[0]?.delta?.content|| "";
        setChatText(chatResponse)
      }
    } catch (err) {
      console.log("error generating content", err);
    }
  };
  
  return (
    <div className="main">
      <EditorComponent
          chatText={chatText}
          />
      <div className="prompt">
        <form className="form" onSubmit={handlePromptSubmit}>
          <label htmlFor="file">
            <img src="/attachment.png" alt="upload" />
          </label>
          <input
            type="file"
            id="file"
            multiple={false}
            hidden
            onChange={handleFileChange}
          />
          <textarea
            type="text"
            placeholder="provide job details and get tailored resume ready"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit">
            <img src="/arrow.png" alt="submit" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Just;
