# GitSummarize — RepoDoc — Dark AI Documentation Engine

A dark-theme React + Tailwind CSS redesign for a GitHub repository documentation generator.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Vite prints the local development URL.

## Backend integration

The Generate action validates GitHub repository URLs and sends:

```http
POST {VITE_API_BASE_URL}/v1/summarize
Content-Type: application/json

{ "repository_url": "https://github.com/owner/repository" }
```

The UI expects a JSON response. It renders `markdown` or `documentation` as the generated output. It also accepts a `repository.full_name` field for the result heading.

Example response:

```json
{
  "repository": { "full_name": "owner/repository" },
  "markdown": "# Project overview\\n..."
}
```

Set `VITE_API_BASE_URL` to the base URL of your own backend. Keep all provider API keys and GitHub tokens on the server; never embed secrets in Vite environment variables.

## Notes

- Example repositories populate the input; users still click Generate to start analysis.
- The repository endpoint is an integration contract. Connect it to the original GitSummarize analysis service to enable real AI-generated documentation.
- For private repositories, add secure server-side authentication rather than collecting tokens in this client.
