const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const postController = require('./controllers/postsController');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', postController);

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
