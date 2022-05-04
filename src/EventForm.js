import React from "react";
import { TextInput, Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function EventForm(props) {
  // instead of random ids, use fetch to get the ids
  const tempId = Math.floor(Math.random() * (10000 - 200 + 1)) + 200;

  const form = useForm({
    initialValues: {
      name: props.data?.name,
      location: props.data?.location,
      date: props.data?.date,
      description: props.data?.description,
    },

    validate: {
      name: (value) => (value.length < 3 ? "Túl rövid név!" : null),
      location: (value) =>
        value.length < 3 ? "Túl rövid helyszín név!" : null,
      date: (value) => (value.length < 3 ? "Túl rövid időpont!" : null),
      description: (value) =>
        value.length < 3 ? "Túl rövid rendezvény!" : null,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        props.onSubmit({ id: props.data?.id || tempId, ...values })
      )}
    >
      <TextInput
        label="Rendezvény neve"
        placeholder="Az appban megjelenő rövid név"
        mb={5}
        disabled={props.readOnly}
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Rendezvény helyszíne (Google támogatott)"
        placeholder="Az appban megjelenő helyszín"
        mb={5}
        disabled={props.readOnly}
        {...form.getInputProps("location")}
      />
      <TextInput
        label="Rendezvény időpontja (HH.NN ÓÓ:PP)"
        placeholder="Az appban megjelenő dátum és időpont"
        mb={5}
        disabled={props.readOnly}
        {...form.getInputProps("date")}
      />
      <Textarea
        label="Rendezvény leírása"
        placeholder="Az appban megjelenő leírás, max. 300 karakter"
        mb={5}
        autosize
        minRows={2}
        maxRows={5}
        disabled={props.readOnly}
        {...form.getInputProps("description")}
      />

      {!props.readOnly && (
        <Button
          fullWidth
          mt="xl"
          type="submit"
          variant="gradient"
          gradient={{ from: "#f39e37", to: "#f5bf42" }}
        >
          Kész
        </Button>
      )}
    </form>
  );
}
