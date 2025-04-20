import { app } from './app';

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });
}

export default app;