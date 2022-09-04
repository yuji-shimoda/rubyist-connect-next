import { Grid, Card, Text, Row, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { FaGithub } from 'react-icons/fa';

export default function UserCard({ rubyist }) {
  const router = useRouter();
  return (
    <Grid css={{ margin: 20 }}>
      <Card
        isPressable
        css={{ w: '240px', h: '240px' }}
        onPress={() => {
          router.push(router.pathname + `/${encodeURIComponent(rubyist.nickname)}`);
        }}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image src={rubyist.image} objectFit="cover" width="100%" alt={rubyist.nickname} />
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
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>{rubyist.nickname}</Text>
            <Link color="error" href={rubyist.github_url} target="_blank">
              <FaGithub size="20px"></FaGithub>
            </Link>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}
