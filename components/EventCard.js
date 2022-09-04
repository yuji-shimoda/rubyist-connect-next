import { Grid, Card, Text, Row, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';

export default function EventCard({ event }) {
  const router = useRouter();
  return (
    <Grid css={{ margin: 20 }}>
      <Card
        isPressable
        css={{ w: '240px', h: '240px' }}
        onPress={() => {
          router.push(event.url);
        }}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image src={event.image} objectFit="cover" width="100%" alt={event.name} />
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
            <Link color="error" href={event.url} target="_blank">
              <Text b>{event.name}</Text>
            </Link>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}
