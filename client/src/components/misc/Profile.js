import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

const Profile = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen} style={{ cursor: "pointer" }}>
          {children}
        </span>
      ) : (
        <FaBell onClick={onOpen} style={{ cursor: "pointer" }} />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading className=" text-center text-l">Profile</Heading>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody className=" mb-10 ">
            <Flex flexDirection="column" align="center">
              <Text fontSize="lg">User : {user.name}</Text>
              <Text>User Email : {user.email}</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
