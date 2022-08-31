import { Grid, Card, Text, Row } from "@nextui-org/react";

export default function UserCard({ rubyist }) {
  return (
    <Grid css={{ margin: 20 }}>
      <Card isPressable css={{ width: 200 }}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={rubyist.image}
            objectFit="cover"
            width="100%"
            alt={rubyist.nickname}
          />
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>{rubyist.nickname}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}
