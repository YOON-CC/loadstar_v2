/*회원정보 수정*/
import React from "react";
import "./mypage.css";
import { LockIcon, EmailIcon, InfoIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  FormControl,
  useDisclosure,
} from "@chakra-ui/react";

const Mypage_0 = () => {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <ChakraProvider>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen1}
        onClose={onClose1}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>비밀번호 변경</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input ref={initialRef} placeholder="현재 비밀번호" mr={3} />
            </FormControl>
            <FormControl mt={4}>
              <Input ref={initialRef} placeholder="새 비멀번호" />
            </FormControl>
            <FormControl>
              <Input ref={initialRef} placeholder="새 비멀번호 확인" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              변경
            </Button>
            <Button onClick={onClose1}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="mypage_container">
        <div className="mypage_top">회원정보 수정</div>
        <div className="mypage_0_content">
          <div className="mypage_0_3">
            <div className="mypage_0_user_password">
              {" "}
              <div className="mypage_password_icon">
                <LockIcon w={5} h={5} />
              </div>
              비밀번호{" "}
            </div>
            <Button
              className="change_user_password"
              onClick={onOpen1}
              size="sm"
              style={{
                paddig: 0,
                margin: 0,
              }}>
              {" "}
              수정{" "}
            </Button>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Mypage_0;
