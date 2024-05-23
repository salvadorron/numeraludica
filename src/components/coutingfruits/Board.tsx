import { Flex, Grid, Stack, Text } from "@chakra-ui/react";

export default function Board() {
    return (
        <Flex direction='column' minHeight={'100vh'} justify={'flex-end'} gap={'40'}>
            <Flex border='1px solid red' justify='center' alignItems={'center'} gap={5}>
                <Grid gridTemplateColumns={'repeat(2, 150px)'}>
                    <Stack border='1px solid green' height={'150px'} justify={'center'} align={'center'}><Text>ITEM 1</Text></Stack>
                    <Stack border='1px solid green' height={'150px'} justify={'center'} align={'center'}><Text>ITEM 1</Text></Stack>
                    <Stack border='1px solid green' height={'150px'} justify={'center'} align={'center'}><Text>ITEM 1</Text></Stack>
                    <Stack border='1px solid green' height={'150px'} justify={'center'} align={'center'}><Text>ITEM 1</Text></Stack>
                </Grid>
                {/* <Grid gridTemplateColumns={'repeat(2, 150px)'}>
                    <Stack border='1px solid green' height={'150px'} justify={'center'} align={'center'}><Text>ITEM 1</Text></Stack>
                    <Stack border='1px solid green' height={'150px'} justify={'center'} align={'center'}><Text>ITEM 1</Text></Stack>
                    <Stack border='1px solid green' height={'150px'} justify={'center'} align={'center'}><Text>ITEM 1</Text></Stack>
                    <Stack border='1px solid green' height={'150px'} justify={'center'} align={'center'}><Text>ITEM 1</Text></Stack>
                </Grid> */}
            </Flex>
            <Stack border={'1px solid red'} height={'300px'}>

            </Stack>
        </Flex>

    )
}