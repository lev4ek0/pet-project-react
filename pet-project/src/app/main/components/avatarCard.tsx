import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Box, Flex, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export function AvatarCard({
    avatarUrl,
    nickName,
    ...props
}: {
    avatarUrl: string;
    nickName: string;
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
                    </Box>
                </Flex>
            </Card>
        </Box>
    );
}
