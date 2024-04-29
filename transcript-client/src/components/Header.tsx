import {
    Flex,
    IconButton,
    useDisclosure,
    Modal,
    ModalContent,
    Box,
    useColorMode,
    useColorModeValue,
    Button
} from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom';
import AboutModal from "./tutorials/AboutModal";
import TutorialPopup from "./tutorials/TutorialPopup";
import { List } from "@phosphor-icons/react";
import { FaMoon, FaSun } from 'react-icons/fa';
//@ts-ignore
import {ReactComponent as Logo} from 'src/assets/header_logo.svg';

function Header(){
    const { colorMode, toggleColorMode } = useColorMode();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0)     
    }
    const drawerBgColor = useColorModeValue("primary.gray.100", "black");
    return (
        <Flex 
            width="100%" 
            bg="blue.900" 
            height="80px" 
            alignItems="center" 
            pos="fixed" 
            padding=" 0 6rem" 
            boxShadow="0px 1px 2px  2px rgba(0, 0, 0, 0.13)" 
            justifyContent={{base: "center", md: "left"}}
        >   
            <Link to="/upload">
                <Logo as="button" onClick={refreshPage} width="40px" height="40px" fill='white' stroke='white' strokeWidth="10"/>
            </Link>
            <Link to="/upload">
                <Box as="button" onClick={refreshPage} ml="10px" color={"white"} fontWeight="bold" fontSize="30px">Captioning</Box>
            </Link>
            <Box width="100%" alignItems="center" justifyContent="end" display={{base: "none", md: "flex"}}>
                <AboutModal />
                <TutorialPopup />
                <IconButton
                    aria-label="toggle-color-mode"
                    icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
                    onClick={toggleColorMode}  
                    height="40px"
                    width="40px" 
                    bg="white"
                    ml="10px"
                />
            </Box>
            <Box display={{base: "flex", md: "none"}} alignItems="center" width="100vw">
                <IconButton 
                    aria-label="toggle-menu" 
                    variant="link" 
                    color="white" 
                    icon={<List size={36} />}
                    onClick={onOpen}
                    pos="absolute"
                    right="2"
                >
                </IconButton>
                <Modal isOpen={isOpen} onClose={onClose} motionPreset="none">
                    <ModalContent bg={drawerBgColor} display="flex" padding="6px" flexDirection="column" gap="6px" mt="80px" borderRadius="none">
                        <AboutModal />
                        <TutorialPopup />
                        <Button onClick={toggleColorMode} id="toggleTutorial" variant="link" fontSize="xl" color="white">Theme</Button>
                    </ModalContent>
                </Modal>
            </Box>
        </Flex>
    );
}

export default Header