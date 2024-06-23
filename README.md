# Test Assessment

Test assessment showcasing a chat app to communicate with a ChatGPT model. The app is built using Next.js, PostgreSQL, Drizzle ORM, and Tailwind CSS.

## Screencast

TODO: add screencast

## Get Started

1. Install dependencies:

   a. Note that Node.js version `>=20` is required.

   ```bash
   npm install
   ```

2. Start the database:

   ```bash
   docker-compose up -d
   ```

3. Create a `.env` file in the root directory with the environment variables from the `.env.example` file.

   a. Note that the `DB_URL` variable is already correctly set in the `.env.example` file.
   b. Set the `OPENAI_API_KEY` variable to your OpenAI API key.

4. Run the database migrations:

   ```bash
   npm run migrations:migrate
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Useful commands

- `npm run format` - automatically fixes code style according to prettier rules
- `npm run lint` - checks for eslint, prettier, and TS errors
- `npm run lint:js` - runs eslint check
- `npm run lint:types` - runs types check
- `npm run migrations:generate` - generates a new migration file`
- `npm run migrations:migrate` - runs the migrations
- `npm run migrations:drop` - drops the migrations

CI/CD pipeline automatically runs linter checks on push and pull requests.
