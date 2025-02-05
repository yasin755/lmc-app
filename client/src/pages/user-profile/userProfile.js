import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  Image,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const backTpoMyChatpage = () => {
    navigate("/my-chats");
  };

  const logoutHandler = () => {
    navigate("/");
  };

  return (
    <>
      <Flex
        direction="column"
        height="100vh"
        maxWidth={isMobile ? "100%" : "600px"}
        margin="0 auto"
        padding="4"
        bg="gray.50"
        borderRadius={isMobile ? "none" : "lg"}
      >
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          maxW={isMobile ? "100%" : "600px"}
          w="100%"
        >
          <Icon
            fontSize="2xl"
            color="pink.700"
            mt={2}
            cursor="pointer"
            onClick={backTpoMyChatpage}
          >
            <IoIosArrowBack />
          </Icon>
          <VStack spacing={4} align="center">
            <Image
              src="https://bit.ly/naruto-sage"
              boxSize="150px"
              borderRadius="full"
              fit="cover"
              alt="Naruto Uzumaki"
            />
            <Text fontSize="2xl" fontWeight="bold">
              John Doe
            </Text>
            <Text fontSize="md" color="gray.600">
              Software Engineer
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Passionate about building scalable web applications and solving
              complex problems.
            </Text>
            <Button colorScheme="teal" size="md" w="100%">
              Edit Profile
            </Button>
            <Button
              colorScheme="gray"
              size="md"
              w="100%"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default UserProfile;
