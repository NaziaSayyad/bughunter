import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Postcard } from "./Postcard";


export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://my-app-sooty-gamma.vercel.app/api/posts/all")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
    
  }, []);

  return (
       
            
    <Box w={{ base: "100%", md: "100%", xl: "100%" }} m={{ base: "auto", md: "auto" }}>
     
      <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(2,1fr)" }}>
        {data.map((e, i) => {
          return (
            <GridItem>
              <Postcard key={i + 1} data={e} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
       
    );
}
