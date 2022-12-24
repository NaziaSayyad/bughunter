import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { GoSearch } from "react-icons/go";

import AuthPop from "../Auth/AuthPop";
import AuthLogin from "../Auth/AuthLogin";
import { FcHome, FcSearch } from "react-icons/fc";
import { TbNotebook } from "react-icons/tb";
import { ImPencil } from "react-icons/im";
import { BsFillPeopleFill, BsFillChatTextFill } from "react-icons/bs";
import { GrNotification } from "react-icons/gr";
import { ImSearch } from "react-icons/im";
import { MdOutlineNotificationsNone } from "react-icons/md";

import styles from "./navbar.module.css";
function Navbar() {
  return (
    <div>
      <Box>
        <Flex
          w="100%"
          bg="#011627"
          // position={"fixed"}
          zIndex="100"
          h="60px"
          color="white"
          justifyContent="space-between"
          px={{ sm: "10px", md: "20px", lg: "80px" }}
          alignItems={"center"}
          boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        >
          <Flex align={"center"} gap="10px">
            <ImSearch color="white" fontSize={"30px"} />
            <Heading>Finder</Heading>
          </Flex>
          <Stack
            display={{ sm: "none", md: "none", lg: "flex" }}
            ml="30px"
            direction={"row"}
            gap="40px"
          >
            <FcHome className={styles.homelogo} />
            <ImPencil className={styles.homelogo} />
            <BsFillPeopleFill className={styles.homelogo} />
            <MdOutlineNotificationsNone className={styles.homelogo} />
            <BsFillChatTextFill className={styles.homelogo} />
          </Stack>
          <Flex align={"center"}>
            <InputGroup display={["none", "flex"]}>
              <InputLeftElement
                pointerEvents="none"
                children={<GoSearch color="gray" fontSize={"23px"} />}
              />

              <Input
                w={{ sm: "100", md: "auto", lg: "300px" }}
                ml=""
                type="text"
                placeholder="Search..."
                _placeholder={{
                  color: "white",
                }}
              />
            </InputGroup>
            <Box mr="20px" display={{ sm: "none", md: "flex", lg: "none" }}>
              <BsFillChatTextFill fontSize={"30px"} />
            </Box>
            <Flex w={{ sm: "auto", md: "200px", lg: "200px" }} gap="10px">
              <AuthPop />
              <AuthLogin />
            </Flex>
          </Flex>{" "}
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;
