import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { Container, Grid, Row, Card, Text, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import Markdown from 'marked-react';
import { rubyistsState } from '../../components/store/rubyists';
import { FaGithub, FaTwitter } from 'react-icons/fa';
export const getServerSideProps = withPageAuth({ redirectTo: '/' });

export default function UserPage({ user }) {
  const router = useRouter();
  const rubyists = useRecoilValue(rubyistsState);
  const rubyist = rubyists
    .filter(function (rubyist) {
      if (rubyist.nickname === router.query.nickname) {
        return rubyist;
      }
    })
    .pop();
  return (
    <>
      <Container>
        <Grid.Container gap={2} justify="center">
          <Grid sm md lg xl css={{ margin: 20 }}>
            <Card css={{ w: '300px', h: '400px' }}>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={rubyist.image}
                  objectFit="cover"
                  width="100%"
                  alt={rubyist.nickname}
                />
              </Card.Body>
              <Card.Footer
                isBlurred
                css={{
                  position: 'absolute',
                  bgBlur: '#ffffff66',
                  borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                  bottom: 0,
                  zIndex: 1,
                }}>
                <Row wrap="wrap" justify="center" align="center">
                  {rubyist?.github_url ? (
                    <Link href={rubyist.github_url} target="_blank">
                      <FaGithub size="50px"></FaGithub>
                    </Link>
                  ) : (
                    ''
                  )}
                  {rubyist?.twitter_name ? (
                    <Link href={`https://twitter.com/${rubyist.twitter_name}`} target="_blank">
                      <FaTwitter size="50px"></FaTwitter>
                    </Link>
                  ) : (
                    ''
                  )}
                </Row>
              </Card.Footer>
            </Card>
            <Grid sm md lg xl />
            <Grid.Container sm={9} md={9} lg={9} xl={9} gap={2} justify="center">
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
