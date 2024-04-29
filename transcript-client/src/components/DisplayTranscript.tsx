import { Box, Flex } from "@chakra-ui/react";
import { useDisplayTranscriptContext } from "src/hooks/useDisplayTranscriptContext";
import VideoInteractiveView from './views/VideoInteractive';


const DisplayTranscript = () => {
  const {
    isVideo,
  } = useDisplayTranscriptContext();

  if( isVideo ){
    return (
      <Box height="100%" p={4}>
        <Flex flexDirection={{ base: "column", md: "row" }} gap={{ base: "2", md: "4" }}>
          <VideoInteractiveView/>
        </Flex>
      </Box>
    )
  }
};

export default DisplayTranscript;
