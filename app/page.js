"use client";

import axios from "axios";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Text,
  FormControl,
  Center,
} from "@chakra-ui/react";
// import "./page.css";

export default function Home() {
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState([
    "AI expert on music, cool talking. The AI is called Jojo.",
    "AI expert on music, cool talking. The AI is called Jojo.",
    "AI expert on music, cool talking. The AI is called Jojo.",
    "AI expert on music, cool talking. The AI is called Jojo.",
    "AI expert on music, cool talking. The AI is called Jojo.",
    "AI expert on music, cool talking. The AI is called Jojo.",
    "AI expert on music, cool talking. The AI is called Jojo.",
    "AI expert on music, cool talking. The AI is called Jojo.",
  ]);
  const [jojo, setJojo] = useState([]);
  const context = "AI expert on music, cool talking. The AI is called Jojo.";
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [low, setLow] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setUser([...user, query]);
    setLoading(true);
    axios
      .post("https://chat-bot-back.onrender.com/api/nlpcloud", {
        context,
        history,
        input: query,
      })
      .then((resp) => {
        const response = resp.data;
        setHistory(response.history);
        setLow(!response.history);
        setLoading(false);
        setJojo((elemento) => [
          ...elemento,
          response.response || "I'm sorry, I can't answer.",
        ]);
      })
      .catch((err) => {
        console.log(err);
      });

    setQuery("");
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [user, jojo]);

  return (
    <main>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundColor={"blue.300"}
      >
        <Flex
          direction="column"
          background="gray.100"
          p={12}
          rounded={6}
          width={{ bs: "90vw", sm: "60vw" }}
          maxWidth={{ sm: "60vw" }}
        >
          <Heading mb={3}>Future Bot :robot</Heading>
          <Text fontSize="xl" mb="3">
            Welcome to Future Bot, the bot that tells you everything about
            music.
          </Text>

          <Flex
            maxHeight={"40vh"}
            direction={"column"}
            overflow={"auto"}
            ref={containerRef}
            mb={1}
          >
            {user.map((u, i) => (
              <>
                <Text fontSize="xl">
                  <Text as="b">User:</Text> {u}
                </Text>
                <Text fontSize="xl">
                  <Text as="b">Jojo:</Text> {jojo[i]}
                </Text>
              </>
            ))}
          </Flex>

          <Center>
            {loading && (
              <Spinner
                thickness="4px"
                speed="1s"
                emptyColor="gray.200"
                color="green.300"
                size="xl"
              />
            )}
          </Center>
          {low ? (
            <Alert status="warning" mt={2}>
              <AlertIcon />
              <AlertTitle>Take it easy</AlertTitle>
              <AlertDescription>
                Looks like you used all your requests. Wait for an hour.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Input
                  placeholder="Write a question"
                  variant="filled"
                  mt={3}
                  mb={3}
                  type="text"
                  textAlign={"center"}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  border="black 1px solid"
                  required
                ></Input>
                <Button width="100%" colorScheme="teal" type="submit">
                  Ask
                </Button>
              </FormControl>
            </form>
          )}
        </Flex>
      </Flex>
    </main>
  );
}
