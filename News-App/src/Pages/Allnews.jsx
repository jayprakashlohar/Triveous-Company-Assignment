import {
  Box,
  Button,
  Grid,
  Heading,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";

function Allnews() {
  const [allnews, setAllnews] = useState([]);
  const [grid, setGrid] = useState(false);
  const [total, setTotal] = useState(0);
  const api = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0593ba556f5d4d33978b00fa62d15097`;
  useEffect(() => {
    const getdata = async () => {
      let res = await fetch(api);
      let data = await res.json();
      setAllnews(data.articles);
      setTotal(data.articles.length);
      localStorage.setItem("news", JSON.stringify(data.articles));
    };
    getdata();
  }, []);
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="90%"
        m="auto"
        p="20px"
      >
        <Heading fontSize="30px" padding="18px" fontFamily="sans-serif">
          Top Latest News
        </Heading>
        <Button
          colorScheme="teal"
          mb="10px"
          onClick={() => setGrid((grid) => !grid)}
        >
          {grid ? <BsFillGrid3X3GapFill /> : <FaThList />}
        </Button>
      </Box>

      {!grid && (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          shadow="base"
          w={"90%"}
          m={"auto"}
        >
          {allnews &&
            allnews.map((el) => (
              <UnorderedList
                gap={10}
                w="90%"
                m={"5"}
                p={"8"}
                shadow="lg"
                color={"blue"}
              >
                <ListItem textAlign={"justify"} fontFamily="sans-serif">
                  <Link to={`/detailnews/${el.source.name}`}>{el.title}</Link>
                </ListItem>
              </UnorderedList>
            ))}
        </Grid>
      )}

      {grid && (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          shadow="base"
          w={"90%"}
          m={"auto"}
        >
          {allnews &&
            allnews.map((el) => (
              <UnorderedList
                gap={10}
                w="90%"
                m={"5"}
                p={"5"}
                shadow="lg"
                color={"blue"}
              >
                <ListItem textAlign={"justify"} fontFamily="sans-serif">
                  <Link to={`/detailnews/${el.source.name}`}>{el.title}</Link>
                </ListItem>
              </UnorderedList>
            ))}
        </Grid>
      )}
    </Box>
  );
}

export default Allnews;
