import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert,
  Center,
} from "@mantine/core";

import { login } from "../src/api";

export default function AuthenticationForm(props) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validate: {
      email: (value) =>
        value.length < 5 ? "Adj meg egy valós email címet!" : null,
      password: (value) =>
        value.length < 1 ? "A jelszó nem lehet üres!" : null,
    },
  });
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    login(data, (res) => {
      if (!res.success) {
        setError(res.error);
      } else {
        props.login();
      }
    });
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Bejelentkezés
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Jelentkezz be az adminisztrációs fiókoddal!
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            required
            label="Email"
            placeholder="E-mail címed"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="Jelszó"
            placeholder="Jelszavad"
            mt="md"
            {...form.getInputProps("password")}
          />

          <Group position="apart" mt="md">
            <Checkbox
              label="Jelszó megjegyzése"
              {...form.getInputProps("remember", { type: "checkbox" })}
            />
          </Group>

          <Button
            fullWidth
            mt="xl"
            type="submit"
            variant="gradient"
            gradient={{ from: "#f39e37", to: "#f5bf42" }}
          >
            Bejelentkezés
          </Button>

          {error && (
            <Alert color="red" variant="outline" mt={10}>
              <Center>{error}</Center>
            </Alert>
          )}
        </form>
      </Paper>
    </Container>
  );
}
