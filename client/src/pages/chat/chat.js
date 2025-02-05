import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Icon,
  HStack,
  Stack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import io from "socket.io-client";
import { Avatar } from "../../components/ui/avatar";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

//const socket = io("http://localhost:5000"); // Connect to the backend

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  // Listen for incoming messages
  useEffect(() => {
    /* socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    }); */
    //return () => socket.disconnect(); // Cleanup on unmount
  }, []);

  // Send a message
  const sendMessage = () => {
    if (message.trim()) {
      //socket.emit("send_message", { message });
      setMessage("");
    }
  };

  const backTpoMyChatpage = () => {
    navigate("/my-chats");
  };

  return (
    <Flex
      direction="column"
      height="100vh"
      maxWidth={isMobile ? "100%" : "600px"}
      margin="0 auto"
      padding="4"
      bg="gray.50"
      borderRadius={isMobile ? "none" : "lg"}
      boxShadow={isMobile ? "none" : "lg"}
    >
      <HStack gap="4">
        <Icon
          fontSize="2xl"
          color="pink.700"
          mt={2}
          cursor="pointer"
          onClick={backTpoMyChatpage}
        >
          <IoIosArrowBack />
        </Icon>
        <Avatar name="John doe" size="lg" src="https://bit.ly/dan-abramov" />
        <Stack gap="0">
          <Text fontWeight="medium">John Doe</Text>
          <Text color="fg.muted" textStyle="sm">
            Offline
          </Text>
        </Stack>
      </HStack>
      <Box flex="1" overflowY="auto" mb="4">
        <VStack spacing="4" align="stretch">
          {messages.map((msg, index) => (
            <Flex
              key={index}
              direction="column"
              align={msg.sender === "You" ? "flex-end" : "flex-start"}
            >
              <Flex align="center">
                <Avatar size="sm" name={msg.sender} mr="2" />
                <Text fontWeight="bold">{msg.sender}</Text>
              </Flex>
              <Box
                bg={msg.sender === "You" ? "blue.500" : "gray.200"}
                color={msg.sender === "You" ? "white" : "black"}
                px="4"
                py="2"
                borderRadius="lg"
                maxWidth="80%"
              >
                <Text>{msg.message}</Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Box>
      <Flex>
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          flex="1"
          mr="2"
        />
        <Button colorScheme="blue" onClick={sendMessage}>
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default Chat;
