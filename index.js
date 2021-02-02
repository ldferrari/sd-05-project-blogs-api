const express = require('express');
const { loginController, userController } = require('./controllers');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});
app.use('/user', userController);
app.use('/login', loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
