/*
 * This script use on browser.
 */

setTimeout(() => {
  // Create WebSocket connection.
  const socket = new WebSocket("ws://localhost:6141");

  // Event on connected.
  socket.addEventListener("open", (event) => {
    console.log("--- SERVER CONNECTED ---");
  });

  // Waiting for reception.
  socket.addEventListener("message", (event) => {
    if (event.data == "reload") {
      location.reload();
    }
  });
}, "1000");
