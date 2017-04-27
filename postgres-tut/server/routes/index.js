const todoController = require('../controllers').todos;
const todoItemController = require('../controllers').todoitems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome!'
  }));

  // Todo Routes
  app.get('/todos', todoController.list);

  app.post('/todos', todoController.create);

  app.get('/todos/:todoId', todoController.retrieve);

  app.put('/todos/:todoId', todoController.update);

  app.delete('/todos/:todoId', todoController.destroy);

  // TodoItem Routes
  app.get('/todoitems', todoItemController.list);

  app.post('/todos/:todoId/items', todoItemController.create);

  app.put('/todos/:todoId/items/:todoItemId', todoItemController.update);

  app.delete('/todos/:todoId/items/:todoItemId', todoItemController.destroy);

  app.get('/todos/:todoId/items/:todoItemId', todoItemController.retrieve);
};
