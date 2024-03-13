import { Heading, Box, Flex, Text, AspectRatio } from "@radix-ui/themes";

export default function Page() {
  return (
    <Box p="6" className="space-y-5">
      <Flex direction="column">
        <Heading size="7">Young Achievers School of Caloocan</Heading>
        <Text size="3" ml="1" weight="medium">
          Welcome to the Young Achievers School of Caloocan
        </Text>
      </Flex>
      <Box>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          facere repudiandae magni distinctio. Corrupti neque reprehenderit
          error totam? Atque dolorum ipsa tempora quos similique sapiente
          quibusdam sint enim nobis magnam! Provident minima dolore tempora,
          voluptatibus accusantium aut esse aliquam est, laudantium illum et
          adipisci fugit rerum totam quaerat harum! Ullam animi ipsum, incidunt
          veritatis repellat unde aperiam possimus quos accusamus. Maiores rem
          dolores ipsum atque quaerat libero non sapiente expedita error. Nihil
          facere necessitatibus omnis, suscipit quibusdam deserunt dolorem
          iusto. Dolorem porro dignissimos est provident. Numquam quasi illum
          soluta quisquam?
        </Text>
        <AspectRatio ratio={16 / 8}>
          <img
            src="/raizel.jpg"
            alt="A house in a forest"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </AspectRatio>
      </Box>
    </Box>
  );
}
