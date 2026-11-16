// Minimal task-tracker API for the "assignment". No dependencies.
const http = require("node:http");
const { listTasks } = require("./controllers/taskController");

const server = http.createServer((req, res) => {
  if (req.url === "/tasks") {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(listTasks()));
    return;
  }
  res.statusCode = 404;
  res.end();
});

server.listen(3000, () => console.log("listening on http://localhost:3000"));
