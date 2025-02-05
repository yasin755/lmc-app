import React from "react";
import {
  Box,
  Flex,
  Icon,
  VStack,
  Input,
  Button,
  Heading,
  useBreakpointValue,
  createListCollection,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import { Field } from "../../components/ui/field";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CreateGroupChat = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const backTpoMyChatpage = () => {
    navigate("/my-chats");
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
          <Flex direction="row" alignItems="center">
            <Icon
              fontSize="2xl"
              color="pink.700"
              cursor="pointer"
              onClick={backTpoMyChatpage}
            >
              <IoIosArrowBack />
            </Icon>
            <Heading as="h1" size="lg" mb={0}>
              Create Group Chat
            </Heading>
          </Flex>
          <form>
            <VStack mt={4} spacing={4} align="center">
              <Field label="Group Chat Name" required>
                <Input placeholder="Enter Group Chat Name" />
              </Field>
              <Field label="Select people" required>
                <SelectRoot multiple collection={frameworks} size="sm" required>
                  {/* <SelectLabel required>Select People</SelectLabel> */}
                  <SelectTrigger clearable>
                    <SelectValueText placeholder="Select People" />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <VStack mt={4} w="100%">
                <Button colorScheme="gray" size="md" w="100%">
                  Create
                </Button>
                <Button
                  variant="subtle"
                  size="md"
                  w="100%"
                  onClick={backTpoMyChatpage}
                >
                  Cancel
                </Button>
              </VStack>
            </VStack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

export default CreateGroupChat;
