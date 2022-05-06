import React from "react";
import { TextInput, Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function EventForm(props) {
  const form = useForm({
    initialValues: {
      name: props.data?.name,
      organizer: props.data?.organizer,
      locationDisplay: props.data?.locationDisplay,
      locationCoords: props.data?.locationCoords,
      date: props.data?.date,
      description: props.data?.description,
      link: props.data?.link,
    },

    validate: {
      name: (value) => (value.length < 3 ? "Túl rövid név!" : null),
      organizer: (value) => (value.length < 3 ? "Túl rövid szervező!" : null),
      locationDisplay: (value) =>
        value.length < 3 ? "Túl rövid helyszín!" : null,
      locationCoords: (value) =>
        value.length < 3 ? "Túl rövid helyszín!" : null,
      date: (value) => (value.length < 3 ? "Túl rövid időpont!" : null),
      description: (value) =>
        value.length < 3 ? "Túl rövid rendezvény!" : null,
      link: (value) => (value.length < 3 ? "Túl rövid jegycím!" : null),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        props.onSubmit({ id: props.data?.id, ...values })
      )}
    >
      <TextInput
        label="Rendezvény neve"
        placeholder="Az applikációban megjelenő rövid név"
        mb={5}
        disabled={props.readOnly}
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Szervező neve"
        placeholder="Az szervezőcég megjelenő neve"
        mb={5}
        disabled={props.readOnly}
        {...form.getInputProps("organizer")}
      />
      <TextInput
        label="Rendezvény helyszíne (Szórakozóhely neve)"
        placeholder="Az appban megjelenő helyszín"
        mb={5}
        disabled={props.readOnly}
        {...form.getInputProps("locationDisplay")}
      />
      <TextInput
        label="Rendezvény helyszíne (Koordináták; X, Y)"
        placeholder="A térképen megjelenő helyszín koordinátái"
        mb={5}
        disabled={props.readOnly}
        {...form.getInputProps("locationCoords")}
      />
      <TextInput
        label="Rendezvény időpontja (ÉÉÉÉ-HH-NN/T/ÓÓ:PP)"
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
      <TextInput
        label="Jegyvásárlási webcím"
        placeholder="A jegyvásárláskori átirányítás weboldal teljes címe"
        mb={5}
        disabled={props.readOnly}
        {...form.getInputProps("link")}
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
