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
import { useEffect, useState } from "react";
import AuthSignUp from "./AuthSignUp";
const initValue = {
  email: "",
  password: "",
};
export default function AuthLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, setFormState] = useState(initValue);
  const [login, setLogin] = useState(false);
  const toast = useToast();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const { email, password } = formState;
  function handleSubmit(e) {
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

    return fetch("https://my-app-sooty-gamma.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.msg === "Login sucessfully") {
          toast({
            title: "success",
            description: "Login sucessfully",
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "top",
          });
          setFormState(initValue);
          localStorage.setItem("token", JSON.stringify(res.token));
          localStorage.setItem(
            "details",
            JSON.stringify({ name: res.name, email: res.email })
          );
          click();
          return;
        }
        if (res.msg === "password incorrect") {
          toast({
            title: "Failed",
            description: "Incorrect Password",
            status: "error",
            duration: 1000,
            isClosable: true,
            position: "top",
          });

          return;
        }
        if (res.msg === "email not registred");
        {
          toast({
            title: "failed",
            description: "Email not resgisterd",
            status: "error",
            duration: 1000,
            isClosable: true,
            position: "top",
          });

          return;
        }
      });
  }

  function click() {
    const login = JSON.parse(localStorage.getItem("details")) || "";
    if (login) {
      setLogin(true);
    }
  }
  return (
    <>
      <Text fontSize={"20px"} cursor={"pointer"} onClick={onOpen}>
        {login ? "Log out" : "Login"}
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
                    Log in to Finder
                  </Heading>
                  <Text fontWeight={"500"} fontSize="13px">
                    Enter your details to log in to your account.
                  </Text>
                </Box>
              </Stack>
              <Stack
                bg="white"
                p="40px"
                boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
                rounded={"10px"}
              >
                <form onSubmit={handleSubmit}>
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

                  <Text textDecoration={"underline"} fontWeight="500" mt="10px">
                    Forgot password ?
                  </Text>
                  <Stack mt="35px" gap="15px">
                    <Button type="submit" w="100%" colorScheme={"red"}>
                      Log in
                    </Button>
                  </Stack>
                </form>
                <AuthSignUp />
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
