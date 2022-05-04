import {
  Header as HeaderComponent,
  Container,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

export default function Header(props) {
  const theme = useMantineTheme();

  return (
    <HeaderComponent
      height={56}
      style={{
        background: theme.fn.linearGradient(45, "#f39e37", "#f5bf42"),
        borderBottom: 0,
      }}
    >
      <Container>
        <div
          style={{
            height: 56,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text size="xl" weight={500} color="dark">
            PartyFinder Admin
          </Text>
          <Group spacing={5}>
            <Button color="dark" onClick={props.logout}>
              Kijelentkezés
            </Button>
          </Group>
        </div>
      </Container>
    </HeaderComponent>
  );
}
