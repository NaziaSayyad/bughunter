import React, { useEffect, useState } from "react";
import {
  Box,
  useToast,
  Flex,
  Heading,
  TableContainer,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
  Select,
  useDisclosure,
  Thead,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  PopoverArrow,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  Tfoot,
  ModalContent,
  Image,
  ModalCloseButton,
  FormControl,
  Input,
  ModalBody,
  FormLabel,
  Spacer,
  Divider,
  Skeleton,
  Stack,
  ModalFooter,
  Center,
} from "@chakra-ui/react";
import Admin_Navbar from "../../Components/admin_components/Components/Navbar";

function index({ user }) {
  const toast = useToast();
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const [nameofuser, setnameofuser] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin?name=${search}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [search]);

  const handleDelete = (a, id) => {
    a();
    fetch(`/api/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        toast({
          title: "User Deleted Successfully.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .then(() =>
        fetch(`/api/admin`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setData(res);
            setLoading(false);
          })
      );
  };

  return (
    <Box>
      <Admin_Navbar />
      <Box>
        <Center>
          <Flex m="4">
            <Input
              type="text"
              placeholder="Search here....."
              boxShadow="outline"
              onChange={(e) => setSearch(e.target.value)}
              w="150"
              ml="10px"
              mr="10px"
            />
          </Flex>
        </Center>
        <Box>
          {loading ? (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
              <Skeleton height="20px" />
              <Skeleton
                startColor="pink.500"
                endColor="orange.500"
                height="20px"
              />
            </Stack>
          ) : (
            <TableContainer>
              <Table
                variant="striped"
                colorScheme="purple"
                size={{ base: "25%", md: "50%", lg: "100%" }}
              >
                <TableCaption>User's Post</TableCaption>
                <Thead size={{ base: "25%", md: "50%", lg: "100%" }}>
                  <Tr>
                    <Th>User Id</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>No. of Posts</Th>
                    <Th>Role</Th>
                    <Th> Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  
                  {data.length > 0 &&
                    data.map((el) => {
                      return (
                        <Tr
                          key={el._id}
                          size={{ base: "25%", md: "50%", lg: "100%" }}
                        >
                          <Td>{el._id}</Td>
                          <Td>{el.name}</Td>
                          <Td>{el.email}</Td>
                          <Td>{el.myposts.length}</Td>
                          <Td>{el.role}</Td>
                          <Td>
                            <Button
                              onClick={() => {
                                setnameofuser(el);
                                return onOpen();
                              }}
                              colorScheme="purple"
                            >
                              Delete User
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
              <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Are You Sure To Delete</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody w="50">
                    Name: {nameofuser ? nameofuser.name : ""}
                    <Divider h="5" />
                    Email: {nameofuser ? nameofuser.email : ""}
                    <Divider h="5" />
                    Role: {nameofuser ? nameofuser.role : ""}
                    <Divider h="10" />
                    <Button
                      onClick={() => handleDelete(onClose, nameofuser._id)}
                      colorScheme="red"
                    >
                      Confirm
                    </Button>
                    <Button ml="10" onClick={onClose} colorScheme="green">
                      Cancel
                    </Button>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default index;
