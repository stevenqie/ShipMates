import { Box, Button, Input, VStack, Heading, Text, Image, Container} from "@chakra-ui/react";
import HomePageResponsive from "@/components/HomePageResponsive";
export default function Home() {
  const bgColor = "gray.50"; // Light & dark mode support

  return (
    <Box minH="100vh" bg={bgColor} display="flex" alignItems="center" justifyContent="center">
      <Container maxW="lg" textAlign="center" py={10}>
        {/* App Logo */}
        <Image src="/logo.png" alt="What's in Your Cart?" boxSize="100px" mx="auto" mb={4} />

        {/* Title and Description */}
        <Heading size="xl" color="blue.600">What's in Your Cart?</Heading>
        <Text fontSize="lg" mt={3} color="gray.600">
          Powered by Capital One. Find the best deals near you.
        </Text>
        <HomePageResponsive/>

      </Container>
    </Box>
  );
}
