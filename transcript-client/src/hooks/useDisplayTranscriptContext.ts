import { useTranscription } from "src/context/TranscriptionContext";
import { EditorState } from "draft-js";
import { TranscriptionSegment } from "src/types/transcriptionDataTypes";
import { useEditor } from "src/context/EditorContext";

interface UseDisplayTranscriptContextReturn {
  isVideo: boolean;
  transcriptionData: TranscriptionSegment[] | null;
  resetEditor: (initialEditorState: EditorState | null) => void;
}

export const useDisplayTranscriptContext = (): UseDisplayTranscriptContextReturn => {
  const { setEditorState } = useEditor();
  const {isVideo, transcriptionData, resetStyles } = useTranscription(); // Assume it returns transcription data and other relevant states

  const resetEditor = (initialEditorState: EditorState | null) => {
    // if (initialEditorState) {
    //@ts-ignore
      setEditorState(initialEditorState);
      resetStyles();
    // }
  };

  return {
    isVideo,
    transcriptionData,
    // onEditorChange,
    resetEditor,
  };
};
