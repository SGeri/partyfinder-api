import React, { useState, useEffect } from "react";

import {
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
  Table,
  ActionIcon,
  Alert,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import { getEvents, removeEvent as removeEventAPI } from "./api";

import { PlusCircle, Edit2, Trash2 } from "react-feather";

import Header from "./Header";
import EventForm from "./EventForm";

export default function Dashboard(props) {
  const modals = useModals();

  const [events, setEvents] = useState([]);
  const [rows, setRows] = useState([]);

  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("auth_token");
    props.logout();
  };

  const createEvent = () => {
    modals.openModal({
      title: "Esemény hozzáadása",
      children: <EventForm onSubmit={(data) => addEventEntry(data)} />,
    });
  };

  const editEvent = (id) => {
    modals.openModal({
      title: "Esemény szerkesztése",
      children: (
        <EventForm
          data={events.find((e) => e.id === id)}
          onSubmit={(data) => updateEventEntry(data)}
        />
      ),
    });
  };

  const removeEvent = (id) => {
    modals.openConfirmModal({
      title: "Művelet megerősítése",
      children: (
        <Text size="sm">
          Az esemény törlése nem visszavonható!
          <br />
          Biztosan törölni szeretnéd?
        </Text>
      ),
      labels: { confirm: "Rendben", cancel: "Mégsem" },
      confirmProps: {
        variant: "gradient",
        gradient: { from: "#f39e37", to: "#f5bf42" },
      },
      onConfirm: () => {
        removeEventAPI(id, (res) => {
          if (!res.success) {
            showNotification({
              type: "error",
              message: res.error,
            });
          } else {
            removeEventEntry(id);

            showNotification({
              type: "success",
              message: "Az esemény törölve!",
            });
          }
        });
      },
    });
  };

  const addEventEntry = (data) => {
    const newEvents = [...events, data];
    setEvents(newEvents);

    modals.closeAll();

    showNotification({
      type: "success",
      message: "Az esemény létrehozva!",
    });
  };

  const updateEventEntry = (data) => {
    const event = events.find((e) => e.id === data.id);
    const index = events.indexOf(event);

    const newEvents = [...events];
    newEvents[index] = data;

    setEvents(newEvents);

    modals.closeAll();

    showNotification({
      type: "success",
      message: "Az esemény módosítva!",
    });
  };

  const removeEventEntry = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const viewEvent = (event) => {
    modals.openModal({
      title: "Esemény részletei",
      children: <EventForm data={event} readOnly />,
    });
  };

  useEffect(() => {
    getEvents((res) => {
      if (!res.success) {
        setError(res.error);
      } else {
        setEvents(res.events);
      }
    });
  }, []);

  useEffect(() => {
    const newRows = events.map(
      (event, index) => {
        return (
          <tr key={index}>
            <td style={{ cursor: "pointer" }} onClick={() => viewEvent(event)}>
              {event.name}
            </td>
            <td>{event.date}</td>
            <td>
              <Group spacing="sm">
                <ActionIcon
                  variant="outline"
                  color="yellow"
                  onClick={() => editEvent(event.id)}
                >
                  <Edit2 size={16} />
                </ActionIcon>
                <ActionIcon
                  variant="outline"
                  color="red"
                  onClick={() => removeEvent(event.id)}
                >
                  <Trash2 size={16} />
                </ActionIcon>
              </Group>
            </td>
          </tr>
        );
      },
      [events]
    );

    setRows(newRows);
  }, [events]);

  return (
    <>
      <Header logout={logout} />

      <Container mt={20}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
          mb={20}
        >
          Rendezvények
        </Title>

        <Center mb={20}>
          <Button
            variant="gradient"
            gradient={{ from: "#f39e37", to: "#f5bf42" }}
            leftIcon={<PlusCircle color="black" />}
            onClick={createEvent}
          >
            <p style={{ color: "#2C2E33" }}>Hozzáadás</p>
          </Button>
        </Center>

        {error && (
          <Alert color="red" variant="outline" mt={10}>
            <Center>{error}</Center>
          </Alert>
        )}

        <Table
          horizontalSpacing="xl"
          verticalSpacing="xs"
          fontSize="md"
          highlightOnHover
        >
          <thead>
            <tr>
              <th>Név</th>
              <th>Időpont</th>
              <th>Szerkesztés</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </>
  );
}
