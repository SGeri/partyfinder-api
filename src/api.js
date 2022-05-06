import axios from "axios";

const API_BASEURL = "http://localhost:3000";

export function login(data, callback) {
  axios
    .post(API_BASEURL + "/api/v1/login", data)
    .then(function (response) {
      if (response.data.error) {
        callback({ success: false, error: response.data.error });
        return;
      }

      localStorage.setItem("auth_token", response.data.token);
      callback({ success: true });
    })
    .catch(function (error) {
      callback({ success: false, error });
    });
}

export function getEvents(callback) {
  console.log(`Bearer ${localStorage.getItem("auth_token")}`);
  axios
    .get(API_BASEURL + "/api/v1/get_events", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
    .then(function (response) {
      callback({ success: true, events: response.data.events });
    })
    .catch(function (error) {
      if (error.status === 401) {
        callback({ success: false, error: "Hiányzó hitelesítési token." });
        return;
      }

      callback({
        success: false,
        error: error.message || JSON.stringify(error) || error,
      });
    });
}

export function createEvent(data, callback) {
  axios
    .post(
      API_BASEURL + "/api/v1/events/create",
      { data },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    )
    .then(function (response) {
      if (!response.data.success) {
        callback({ success: false, error: response.data.error });
      } else {
        callback({ success: true });
      }
    })
    .catch(function (error) {
      if (error.status === 401) {
        callback({ success: false, error: "Hiányzó hitelesítési token." });
        return;
      }

      callback({
        success: false,
        error: error.message || JSON.stringify(error) || error,
      });
    });
}

export function editEvent(data, callback) {
  axios
    .post(
      API_BASEURL + "/api/v1/events/edit",
      { data },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    )
    .then(function (response) {
      if (!response.data.success) {
        callback({ success: false, error: response.data.error });
      } else {
        callback({ success: true });
      }
    })
    .catch(function (error) {
      if (error.status === 401) {
        callback({ success: false, error: "Hiányzó hitelesítési token." });
        return;
      }

      callback({
        success: false,
        error: error.message || JSON.stringify(error) || error,
      });
    });
}

export function removeEvent(id, callback) {
  axios
    .post(
      API_BASEURL + "/api/v1/events/remove",
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    )
    .then(function (response) {
      if (!response.data.success) {
        callback({ success: false, error: response.data.error });
      } else {
        callback({ success: true });
      }
    })
    .catch(function (error) {
      if (error.status === 401) {
        callback({ success: false, error: "Hiányzó hitelesítési token." });
        return;
      }

      callback({
        success: false,
        error: error.message || JSON.stringify(error) || error,
      });
    });
}
