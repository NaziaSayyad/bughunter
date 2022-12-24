import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Postcard from "../Components/postCard";

export default function MyPost() {
  const [data, setData] = useState();
   
  function getData() {
    return fetch("https://my-app-sooty-gamma.vercel.app/api/posts/getuser", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => res.json())
      .then((res) => {
         setData(res.myposts);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      <Box
        pt="70px"
        w={{ base: "100%", md: "100%", xl: "100%" }}
        m={{ base: "auto", md: "auto" }}
      >
        <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(2,1fr)" }}>
          {data?.map((e, i) => (
            <GridItem>
              <Postcard key={i + 1} data={e} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
