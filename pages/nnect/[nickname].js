import { useEffect, useState } from 'react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { Container, Grid, Avatar, Text, Card } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Markdown from 'marked-react';

export const getServerSideProps = withPageAuth({ redirectTo: '/' });

export default function UserPage() {
  const router = useRouter();
  const [rubyist, setRubyist] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/users/${router.query.nickname}`);
        if (res.ok) {
          const data = await res.json();
          setRubyist(data.pop());
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <Container>
        <Grid.Container gap={2} justify="center">
          <Grid sm md lg xl css={{ margin: 20 }}>
            <Avatar src={rubyist.avatar_url} alt={rubyist.nickname} css={{ size: '150px' }} />
            <Grid sm md lg xl />
            <Grid.Container sm={10} md={10} lg={10} xl={10} gap={2} justify="center">
              <Card>
                <Card.Header>
                  <Text b>自己紹介</Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                  <Markdown>{rubyist.introduction}</Markdown>
                </Card.Body>
              </Card>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
}
