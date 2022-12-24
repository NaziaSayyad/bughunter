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
  Flex,
  Text,
  Box,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { TfiWorld } from "react-icons/tfi";
import { TfiGallery } from "react-icons/tfi";
import { RiFontSize } from "react-icons/ri";
import { useState } from "react";
const initValue = {
  image: "",
  title: "",
  content: "",
  category: "",
};
export default function Create() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [post, setPost] = useState(initValue);
  const toast = useToast();
  function handleChange(e) {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    console.log(post);
    e.preventDefault();
    return fetch("https://my-app-sooty-gamma.vercel.app/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPost(initValue);
        if (res.msg === "New post added") {
          toast({
            title: "success",
            description: "Successfully post",
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "top",
          });
          return;
        }
      });
  }
  const { title, image, content, category } = post;
  return (
    <>
      <Text display={"inline"} onClick={onOpen}>
        Create Post
      </Text>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex align={"center"} justify={"center"} gap="5px">
              <TfiWorld />
              <Text
                fontFamily={"sans-serif"}
                fontSize="14px"
                fontWeight={"600"}
              >
                Everyone
              </Text>
            </Flex>
            <Box borderBottom={"2px solid teal"} pb="5px" mt="40px">
              <Heading
                color={"blue.800"}
                fontFamily={"normal"}
                fontSize="20px"
                fontWeight={"bold"}
              >
                Create Post
              </Heading>
            </Box>
            <form onSubmit={handleSubmit}>
              <Stack gap="10px" py="20px">
                <Input
                  variant="flushed"
                  placeholder="Title"
                  borderColor={"gray"}
                  name="title"
                  value={title}
                  onChange={handleChange}
                  required={true}
                />
                <Input
                  placeholder="Image"
                  borderColor={"gray"}
                  name="image"
                  value={image}
                  onChange={handleChange}
                  required={true}
                />
                <Input
                  placeholder="category"
                  borderColor={"gray"}
                  name="category"
                  value={category}
                  onChange={handleChange}
                  required={true}
                />
                <Textarea
                  placeholder="say something"
                  borderColor={"gray"}
                  name="content"
                  value={content}
                  onChange={handleChange}
                  required={true}
                />
              </Stack>
              <hr />
              <Flex py="10px" justify={"space-between"}>
                <Flex align={"center"} gap="20px">
                  <TfiGallery fontSize={"20px"} />
                  <RiFontSize fontSize={"24px"} />
                </Flex>
                <Button type="submit" colorScheme={"blue"}>
                  Post
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
