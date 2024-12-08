import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Box, Flex, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Image from "next/image";

export function AvatarCard({
    avatarUrl,
    nickName,
    coins,
    rating,
    ...props
}: {
    avatarUrl: string;
    nickName: string;
    coins: number;
    rating: number;
}) {
    const truncateString = (str: string, maxLength: number) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength - 3) + "...";
        }
        return str;
    };

    return (
        <Box maxWidth="300px" minWidth="180px" {...props}>
            <Card>
                <Flex gap="3" align="center" p="10px">
                    <Avatar>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <Box ml="10px">
                        <Text as="div" size="2" weight="bold">
                            {truncateString(nickName, 16)}
                        </Text>
                        <Flex align="center" gap="2">
                            <Image
                                src="/coin.svg"
                                alt="Coins"
                                width={16}
                                height={16}
                            />
                            <Text as="div" size="2" weight="bold">
                                {coins}
                            </Text>
                        </Flex>
                        <Flex align="center" gap="2">
                            <Image
                                src="/rating.svg"
                                alt="Rating"
                                width={16}
                                height={16}
                            />
                            <Text as="div" size="2" weight="bold">
                                {rating}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </Card>
        </Box>
    );
}
