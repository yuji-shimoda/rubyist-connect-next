import Head from 'next/head';
import { useUser } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Button, Text, Container, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  return {
    props: {
      title: 'Rubyist Connect',
      description: 'Search for Rubyists close to you and connect with Rubyists.',
      image: '/ruby.png',
    },
  };
}

export default function LoginPage(ogp) {
  const router = useRouter();
  const { user, error } = useUser();
  async function login() {
    try {
      await supabaseClient.auth.signIn({
        provider: 'github',
      });
    } catch (err) {
      console.error(err);
    }
  }
  if (error) return <p>{error.message}</p>;
  if (!user)
    return (
      <>
        <Head>
          <title>Rubyist Connect</title>
          <meta property="og:title" content={ogp.title} />
          <meta property="og:description" content={ogp.description} />
          <meta property="og:image" content={ogp.image} />
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
  router.push('/nnect');
}
