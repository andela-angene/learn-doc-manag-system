const TodoItem = require('../models').TodoItem;

module.exports = {
  list(req, res) {
    return TodoItem.findAll()
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    return TodoItem.create({
      content: req.body.content,
      todoId: req.params.todoId
    })
    .then(todoItem => res.status(201).send(todoItem))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return TodoItem.find({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId
      }
    })
    .then((todo) => {
      if (!todo) return res.status(404).send('TodoItem not found');
      return res.status(200).send(todo);
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return TodoItem.find({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId
      }
    })
    .then((todoItem) => {
      if (!todoItem) {
        return res.status(404).send({ message: 'Todo not found' });
      }
      return todoItem.update(req.body, { fields: Object.keys(req.body) })
      .then(updatedItem => res.status(200).send(updatedItem))
      .catch(error => res.status(400).send(error));
    })
   .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return TodoItem.find({
      where: {
        id: req.params.todoItemId,
        todoId: req.params.todoId
      }
    })
    .then((todoItem) => {
      if (!todoItem) {
        return res.status(404).send({ message: 'TodoItem not found' });
      }
      return todoItem.destroy()
        .then(() => res.status(200).send({ message: 'TodoItem deleted' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};
