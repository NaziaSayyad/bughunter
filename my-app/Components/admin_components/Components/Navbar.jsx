import { Flex,Box, Button, Heading, Text, Center } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Admin_Navbar = () => {
  return (
    <Box bg="yellow.300" mt="3">
        <Center>

        <Flex gap={"50"}>
            <Link href="/admin"><Text  fontWeight={"500"} fontSize={{ base: '2xl', md: '4xl', lg: '3xl' }}>Manage Users</Text></Link>
           <Link href="/admin/adduser">
           <Text fontSize={{ base: '2xl', md: '4xl', lg: '3xl' }} fontWeight={"500"}>Add Users</Text>
           </Link>
        </Flex>
        </Center>
    </Box>
  )
}

export default Admin_Navbar