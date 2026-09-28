# Connect private feedback on GitHub Pages

GitHub Pages cannot store form submissions. The supplied `Feedback.gs` saves them to a private Google Sheet owned by the admin. The web app accepts messages publicly, but it does not provide a public way to list stored feedback. The admin controls who can open the Sheet.

1. Sign into the **admin Google account**. Create a new Google Sheet named **AgriSentry Feedback**. Leave its sharing set to **Restricted**. Do not add a public link or publish the Sheet to the web.
2. From that Sheet, open **Extensions → Apps Script**. Replace the code in `Code.gs` with the complete contents of `Feedback.gs`, then save.
3. Select **Deploy → New deployment → Web app**. Set **Execute as: Me** (the admin) and **Who has access: Anyone**. Deploy and authorize the script. Copy the Web app URL ending in `/exec`. Use the deployment URL, not the `/dev` test URL.
4. In `script.js`, paste that URL between the quotes in `const feedbackEndpoint = '';`.
5. Commit `index.html`, `script.js`, and `styles.css` (and `assets/` if this is a new repository) to your GitHub Pages repository. Do **not** add `Feedback.gs` to a website folder served publicly if you customize it with any private values. This supplied script contains no credentials.
6. Open the website, send a test message, and check the admin's Sheet for a new row on the **Feedback** tab. Confirm a second ordinary user cannot open that Sheet.

Only the Sheet owner and people explicitly granted access to it can see feedback. Anyone who knows the form's public URL may submit, so review the Sheet's sharing and monitor for spam. The public `/exec` URL is a submission endpoint, **not** a password or secret.

If you edit `Feedback.gs` after deploying, use **Deploy → Manage deployments → Edit → New version → Deploy**. The `script.js` URL generally stays the same for that deployment.
