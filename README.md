## Hygraph with Netlify Visual Editor 

### How to run locally

1. Create Hygraph project from "Cosmetics Shop" (skncre) template.

2. Clone this repo.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Update `.env` with your values:

   1. `HYGRAPH_PROJECT_ID`: Hygraph project ID. Can be found in project settings screen in Hygraph Studio.
   2. `HYGRAPH_REGION`: Hygraph project region. Can be found in project settings screen in Hygraph Studio.
   3. `HYGRAPH_ENVIRONMENT`: Hygraph project environment.
   4. `HYGRAPH_ENDPOINT`: Hygraph content API endpoint URL. Must match the configured region.
   5. `HYGRAPH_ASSET_UPLOAD_API`: Hygraph management API endpoint URL. Must match the configured region.
   6. `HYGRAPH_MANAGEMENT_API`: Hygraph management API endpoint URL. Must match the configured region.
   7. `HYGRAPH_MANAGEMENT_TOKEN`: Hygraph management token.

5. Open a terminal window and run Next.js dev server. This will start a local dev server on localhost:3000. Open it in your browser and validate that site is working properly and renders the content from Hygraph.

   ```bash
   npm run dev
   ```

6. Open a 2nd terminal and create a public tunnel to your machine's 8090 port with [ngrok](https://ngrok.com/). A public tunnel is needed to allow the local Visual Editor receive webhooks from Hygraph:
   
   ```bash
   ngrok http 8090
   ```

   Take a note of the public URL address created by ngrok, it should match a pattern similar to https://HASH.ngrok.app. Keep this terminal window opened.

7. Open a 3rd terminal and install `@stackbit/cli`:

   ```bash
   npm i -g @stackbit/cli
   ```

8. Start Netlify Visual Editor by running the following command. Set the `--csi-webhook-url` argument to the ngrok's public URL address from the previous step with the `/_stackbit/onWebhook` path.

   ```bash
   stackbit dev --csi-webhook-url https://HASH.ngrok.app/_stackbit/onWebhook
   ```

   This command will print the final webhook URL in the following format:

   ```text
   https://HASH.ngrok.app/_stackbit/onWebhook/hygraph/HYGRAPH_PROJECT_ID
   ```

   Add this webhook to your Hygraph project. In webhook's configuration, set the method to POST, and check the "Include payload" option. Leave all the other settings empty.

   <img alt="Hygraph Webhook Config" height="600" src="./docs/hygraph-webhook-config.png" title="Hygraph Webhook Config"/>
   
9. Open http://localhost:8090/_stackbit in your browser. You can now work on your site, and edit the Hygraph content via the Visual Editor.
