import { useUser } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Button, Text, Container, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useUser();

  async function login() {
    await supabaseClient.auth.signIn({
      provider: 'github',
    });
  }
  if (!user)
    return (
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
    );
  router.push('/nnect');
}
