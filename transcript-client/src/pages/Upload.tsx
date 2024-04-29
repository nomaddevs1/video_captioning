import { Center, Button} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useUploader from "src/hooks/useUploader";
import Progress from "src/components/uploads/Progress";
import UploadedFileInfo from "src/components/uploads/UploadedFileInfo";
import FileUploadArea from "src/components/uploads/FileUploadArea";
import { useTranscription } from "src/hooks/useTranscription";
import { useTutorialContext } from "src/context/TutorialContext";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateTranscript } from "src/utils/backendCalls";

const uploadTutorials = {
  id: "upload",
  tutorials: [
    {
      position: {
        pos: "fixed",
        top: { base: "130px", md: "50%" },
        right: { md: "15%" },
      },
      text: "Upload a mp4 or webm video file . Once uploaded, select the caption language from the dropdown menu and click 'Transcribe'.",
    },
  ],
};

function Upload() {
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0);
  const { getInputProps, getRootProps } = useUploader(setUploaded);
  const navigate = useNavigate();
  const { setTranscriptionData, setTranscriptionVTT, isVideo, setVideoFile, setIsVideo } =
    useTranscription();
  const [languageCode, setLanguageCode] = useState("null");
  const { updateTutorialList } = useTutorialContext();

  useEffect(() => {
    updateTutorialList(uploadTutorials);
  }, [updateTutorialList]);

  
  
  const passTranscript = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (uploaded) {
      try {
        // add file format and size checks before making request
        const allowedFormats = [
          ".mp4",
          ".webm",
          ".mpeg",
        ];
        const maxFileSize = 300; // max file size in MB

        if (
          !allowedFormats.some((format) =>
            uploaded.name.toLowerCase().endsWith(format)
          )
        ) {
          toast.error("File format not supported");
          return;
        } // file size too large error
        else if (uploaded.size > maxFileSize * 1000000) {
          toast.error(
            "File size is too large. Please upload file smaller than 300 MB."
          );
          return;
        }

        const data = await generateTranscript(
          uploaded,
          languageCode,
          isVideo,
          setProgress
        );
       
     
        toast.success("File successfully uploaded");
        setTimeout(() => {
          if (isVideo) {
            setTranscriptionVTT(data);
            setVideoFile(uploaded)
            navigate("/transcription", { state: { uploadedFile: uploaded } });
          } else {
            setTranscriptionData(data.transcript);
          }
          navigate("/transcription", { state: { uploadedFile: uploaded } });
        }, 1000); // Pass the uploaded file to the TranscriptionPage
      } catch (err: any) {
        setIsLoading(false);
        if (err.message) {
          if (languageCode === "null"){
            toast.error("Please select a language.")
          } else {
          toast.error(err.message); // get error message from server
          }
        } else {
          toast.error(
            "Error uploading file. Please ensure file is an acceptable format."
          );
        }
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setUploaded(null);
      }
    }
  };

  return (
    <Center textAlign="center" height="100%">
      {isLoading ? (
        <Progress value={progress} />
      ) : uploaded ? (
        <UploadedFileInfo
          file={uploaded}
          onChange={(value) => setLanguageCode(value)}
          onVideoFlagChange ={(isVideo) => setIsVideo(isVideo)} 
          
        >
          <Button width="100%" bg="blue.200" onClick={passTranscript}>
            Transcribe
          </Button>
        </UploadedFileInfo>
      ) : (
        <FileUploadArea
          getInputProps={getInputProps}
          getRootProps={getRootProps}
        />
      )}
    </Center>
  );
}

export default Upload;