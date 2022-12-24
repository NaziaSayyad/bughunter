import { Box, Text, Card, CardBody, Stack, Divider, CardFooter, Button, Heading, Image } from "@chakra-ui/react";
import { useState } from "react";
import { BsHeart, BsChat, BsHeartFill } from "react-icons/bs";


export const Postcard = ({ data }) => {
  const { title, content, image } = data;

  const [like, setLike] = useState(false);
  const img = "https://images.macrumors.com/t/XABJRV39eYQjwu-Qqoy0AmlWGQQ=/2000x/article-new/2022/09/apple-watch-series-3.jpg"
  return (
    <Box w={{ base: "100%", md: "70%", lg: "90%" }} m={"auto"} alignItems={"center"} mx={"20px"} my={"30px"}>
      <Card maxW="xxxl" m={"auto"}>
        <CardBody>
          <Image src={image || img} alt="img"
          borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text>{content}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button
            flex="1"
            variant="ghost"
            leftIcon={like ? <BsHeartFill /> : <BsHeart />}
            onClick={() => {
              setLike(!like);
            }}
          >
            Like
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BsChat />}>
            Comment
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};
