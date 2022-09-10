import { useEffect, useState } from "react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Container, Grid, Text, Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import Markdown from "marked-react";
import ProfileCard from "../../components/ProfileCard";
import AppBar from "../../components/AppBar";

export const getServerSideProps = withPageAuth({ redirectTo: "/" });

export default function UserPage() {
  const { user } = useUser();
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
      <AppBar user={user} />
      <Container>
        <Grid.Container gap={2} justify="center">
          <Grid sm md lg xl>
            <ProfileCard rubyist={rubyist} />
            <Grid.Container
              sm={10}
              md={10}
              lg={10}
              xl={10}
              gap={2}
              justify="center"
            >
              <Card>
                <Card.Header>
                  <Text b>Introduction</Text>
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
