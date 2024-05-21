#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./6-completed_tasks.js <API-URL>');
  process.exit(1);
}

const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  if (response.statusCode === 200) {
    const todos = JSON.parse(body);
    const completedTasksByUser = {};

    todos.forEach((todo) => {
      if (todo.completed) {
        const userId = todo.userId.toString();
        if (completedTasksByUser[userId]) {
          completedTasksByUser[userId]++;
        } else {
          completedTasksByUser[userId] = 1;
        }
      }
    });

    console.log(completedTasksByUser);
  } else {
    console.error(`Failed to retrieve information. Status code: ${response.statusCode}`);
    process.exit(1);
  }
});
