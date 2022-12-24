import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Button,
  Container,
  Flex,
  VStack,
  useToast,
  Heading,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import Admin_Navbar from "../../Components/admin_components/Components/Navbar";


const initState = {
  name: "",
  email: "",
  title: "",
  content: "",
  image: "",
  role: "",
  id: "",
  password: "",
};
const adduser = () => {
  const toast = useToast();

  const [formData, setFormData] = useState(initState);
  const { name, email,   password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = () => {
    const payload = {
      name: name,
      email: email,
      password: password,
    };
    console.log(payload);
    fetch(`/api/admin/add`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          title: "User added Successfully.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch(() => alert("Something went wrong"));
  };
  return (
    <Box>
      <Admin_Navbar />
      <Container
        maxW="container.lg"
        padding="10"
        align={"center"}
        justify="center"
      >
        <Flex bg={"purple.100"} color={""}>
          <VStack
            w="full"
            h="full"
            p={10}
            spacing={10}
            justify={"center"}
            align={"center"}
          >
            <Heading>Add User</Heading>
            <SimpleGrid columns={2} columnGap={3} rowGap={4}>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel> Name:</FormLabel>
                  <Input
                    placeholder="Enter name"
                    name="name"
                    value={name}
                    boxShadow="outline"
                    onChange={handleChange}
                  ></Input>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel> Email:</FormLabel>
                  <Input
                    placeholder="Enter Email id:"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    boxShadow="outline"
                    variant={"outline"}
                  ></Input>
                </FormControl>
              </GridItem>
              
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel> Password:</FormLabel>
                  <Input
                    placeholder="Enter your secret password"
                    name="password"
                    boxShadow="outline"
                    value={password}
                    onChange={handleChange}
                    type={"password"}
                  ></Input>
                </FormControl>
              </GridItem>

              

              <GridItem colSpan={2}>
                <Button
                  width={"full"}
                  size="lg"
                  bg={"purple.400"}
                  onClick={handleSubmit}
                >
                  Add User
                </Button>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default adduser;
