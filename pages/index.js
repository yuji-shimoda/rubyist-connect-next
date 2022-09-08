import Head from 'next/head';
import { useUser } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Button, Text, Container, Spacer, Loading, Link } from '@nextui-org/react';
import UserIndexPage from './nnect';
import router from 'next/router';

export default function LoginPage(ogp) {
  const { user, isLoading } = useUser();
  async function login() {
    try {
      await supabaseClient.auth.signIn(
        {
          provider: 'github',
        },
        {
          redirectTo: '/nnect',
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
  if (isLoading)
    return (
      <Container
        as="main"
        display="flex"
        direction="column"
        justify="center"
        alignItems="center"
        alignContent="center"
        style={{ height: '100vh' }}>
        <Loading size="xl" />
      </Container>
    );

  if (!user) {
    return (
      <>
        <Head>
          <title>Rubyist Connect</title>
        </Head>
        <Container
          as="main"
          display="flex"
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: '100vh' }}>
          <Spacer />
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $purple600 -20%, $pink600 100%',
            }}
            weight="bold">
            Rubyist Connect
          </Text>
          <Text>Search for Rubyists close to you and connect with Rubyists.</Text>
          <Spacer />
          <Button color="error" ghost onPress={login}>
            Sign in with GitHub
          </Button>
        </Container>
      </>
    );
  } else {
    router.replace('/nnect');
    return <UserIndexPage />;
  }
}
