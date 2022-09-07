import { Grid, Card, Text, Row } from '@nextui-org/react';

export default function ProfileCard({ rubyist }) {
  return (
    <Grid css={{ margin: 20 }}>
      <Card css={{ w: '300px', h: '400px' }}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={rubyist.avatar_url}
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
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>{rubyist?.name ? rubyist.name : rubyist.nickname}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}
