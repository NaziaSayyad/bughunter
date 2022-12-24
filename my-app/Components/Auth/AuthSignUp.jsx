import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  Img,
  Heading,
  Text,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
const initValue = {
  name: "",
  email: "",
  password: "",
};
export default function AuthSignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, setFormState] = useState(initValue);
  const toast = useToast();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }
  const { name, email, password } = formState;
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  function strongPassword(str) {
    if (
      str.match(/[a-z]/g) &&
      str.match(/[A-Z]/g) &&
      str.match(/[0-9]/g) &&
      str.match(/[^a-zA-Z\d]/g) &&
      str.length >= 8
    ) {
      return true;
    } else {
      return false;
    }
  }
  function AutoClose() {
    setTimeout(() => {
      onClose();
    }, 500);
  }
  function handleSubmit2(e) {
    e.preventDefault();
    if (!validateEmail(formState.email)) {
      toast({
        title: "error",
        description: "Invalid Email Address",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!strongPassword(formState.password)) {
      toast({
        title: "error",
        description:
          "password must contain Uppercase , Lowercase , SpecialCharacter,Number",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    return fetch("https://my-app-sooty-gamma.vercel.app/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.msg === "Sucessfully") {
          toast({
            title: "Sucessfully",
            description: "Successfully Registered",
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "top",
          });

          AutoClose();
          setFormState(initValue);
          return;
        }
        if (res.msg === "already exist") {
          toast({
            title: "failed",
            description: "Already Exist",
            status: "error",
            duration: 1000,
            isClosable: true,
            position: "top",
          });
          setFormState(initValue);
          return;
        }
      });
  }
  return (
    <>
      <Text
        cursor={"pointer"}
        onClick={onOpen}
        textAlign="center"
        fontSize={"15px"}
      >
        Don't have an account?{" "}
        <span style={{ fontWeight: "bold" }}>Sign up for MyPost</span>
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#f5f5f5" pb="30px">
          <ModalCloseButton />
          <ModalBody>
            <Stack fontFamily={"Noto Sans', sans-serif"}>
              <Stack py="30px" direction={"row"} gap="10px">
                <Img
                  h="60px"
                  w="120px"
                  src="https://i.imgur.com/Pt5qPA4.jpg"
                  atl="logo"
                />
                <Box>
                  <Heading fontWeight={"500"} fontSize="30px">
                    Create a Finder account
                  </Heading>
                  <Text fontWeight={"500"} fontSize="13px">
                    Enter your details to create account.
                  </Text>
                </Box>
              </Stack>
              <Stack
                bg="white"
                p="40px"
                boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
                rounded={"10px"}
              >
                <form onSubmit={handleSubmit2}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    borderWidth={"2px"}
                    borderColor="pink"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required={true}
                  />
                  <FormLabel>Email Adress</FormLabel>
                  <Input
                    borderWidth={"2px"}
                    borderColor="pink"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required={true}
                  />
                  <FormLabel>password</FormLabel>
                  <Input
                    borderWidth={"2px"}
                    borderColor="pink"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required={true}
                  />

                  <Button mt="35px" type="submit" w="100%" colorScheme={"red"}>
                    Create account
                  </Button>
                </form>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
