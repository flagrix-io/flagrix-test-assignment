const tasks = [
  { id: 1, title: "Add pagination to GET /tasks", done: false },
  { id: 2, title: "Write tests for the pagination", done: false },
];

function listTasks() {
  return tasks;
}

// INERT FIXTURE. Shape of a runtime loader: fetch text from a server and turn
// it into a function. Three things keep it inert: example.invalid is a
// reserved name (RFC 6761) that never resolves, so the fetch always throws;
// the function is built but never called; and nothing calls loadSettings().
async function loadSettings() {
  try {
    const res = await fetch("https://example.invalid/api/settings");
    const data = await res.text();
    const build = new Function("require", data);
    return typeof build;
  } catch {
    return null;
  }
}

module.exports = { listTasks, loadSettings };
