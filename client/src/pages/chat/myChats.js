import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Avatar } from "../../components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Icon } from "@chakra-ui/react";

const chats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "10:30 AM",
    avatar: "https://bit.ly/dan-abramov",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Let’s catch up soon!",
    timestamp: "Yesterday",
    avatar: "https://bit.ly/kent-c-dodds",
  },
  {
    id: 3,
    name: "Alice Johnson",
    lastMessage: "Did you see the email?",
    timestamp: "2 days ago",
    avatar: "https://bit.ly/ryan-florence",
  },
];

const MyChats = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const navigateToChatPageHandler = (chat) => {
    console.log(chat);
    navigate("/chat");
  };

  const goToUserProfilePage = () => {
    navigate("/user-profile");
  };

  const navigateToCreateGrpChat = () => {
    navigate("/create-group-chat");
  };

  return (
    <Box p={4} maxWidth={isMobile ? "100%" : "600px"} margin="0 auto">
      <Flex gap="4" justify="space-between">
        <Heading as="h1" size="lg" mb={4}>
          Chats
        </Heading>
        <div marginEnd="auto">
          <Icon
            fontSize="2xl"
            color="pink.700"
            mt={2}
            cursor="pointer"
            onClick={navigateToCreateGrpChat}
          >
            <IoIosAddCircleOutline />
          </Icon>
          <Avatar
            size="md"
            src="https://bit.ly/dan-abramov"
            ml={2}
            cursor="pointer"
            onClick={goToUserProfilePage}
          />
        </div>
      </Flex>
      <VStack spacing={4} align="stretch">
        {chats.map((chat) => (
          <>
            <Flex
              p={4}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              _hover={{ bg: "gray.50" }}
              cursor="pointer"
              onClick={() => navigateToChatPageHandler(chat)}
            >
              {/* <div>{chat.name}</div>
              <div>{chat.lastMessage}</div> */}

              <Avatar size="md" name={chat.name} src={chat.avatar} mr={4} />

              <Box flex="1">
                <Text fontWeight="bold">{chat.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {chat.lastMessage}
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.500">
                {chat.timestamp}
              </Text>
            </Flex>
          </>
        ))}
      </VStack>
    </Box>
  );
};

export default MyChats;
