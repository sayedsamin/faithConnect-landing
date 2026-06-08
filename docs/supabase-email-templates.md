# Supabase Auth Email Templates

Use these templates in Supabase Dashboard -> Authentication -> Email Templates.

Keep the call-to-action links as `{{ .ConfirmationURL }}`. Supabase uses that URL to verify the token, then redirects back to the `emailRedirectTo` / `redirectTo` value sent by the app.

For this app, make sure Supabase Dashboard -> Authentication -> URL Configuration includes:

- Site URL: `https://questura.ca`
- Redirect URLs:
  - `https://questura.ca/signin`
  - `https://questura.ca/reset-password`
  - `https://questura.ca/**`
  - `http://localhost:3000/**`

## Confirm Signup

Subject:

```text
Confirm your Questura account
```

Body:

```html
<div
  style="margin:0;background:#f6f2e8;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#102033;"
>
  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2d8c4;border-radius:12px;overflow:hidden;"
  >
    <tr>
      <td style="padding:28px 28px 16px;">
        <p
          style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1e5a48;"
        >
          Questura Academy
        </p>
        <h1 style="margin:0;font-size:28px;line-height:1.2;color:#08213d;">
          Confirm your account
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding:0 28px 8px;">
        <p
          style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;"
        >
          Welcome to Questura. Confirm your email address to finish setting up
          your account.
        </p>
        <p
          style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#475569;"
        >
          This link is unique to {{ .Email }} and should only be used by you.
        </p>
        <a
          href="{{ .ConfirmationURL }}"
          style="display:inline-block;background:#f4c542;color:#08213d;text-decoration:none;font-size:16px;font-weight:700;padding:14px 22px;border-radius:8px;"
        >
          Confirm account
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 28px 28px;">
        <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
          If the button does not work, copy and paste this link into your
          browser:
        </p>
        <p
          style="margin:8px 0 0;font-size:13px;line-height:1.6;color:#64748b;word-break:break-all;"
        >
          {{ .ConfirmationURL }}
        </p>
      </td>
    </tr>
  </table>
</div>
```

## Reset Password

Subject:

```text
Reset your Questura password
```

Body:

```html
<div
  style="margin:0;background:#f6f2e8;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#102033;"
>
  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2d8c4;border-radius:12px;overflow:hidden;"
  >
    <tr>
      <td style="padding:28px 28px 16px;">
        <p
          style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1e5a48;"
        >
          Questura Academy
        </p>
        <h1 style="margin:0;font-size:28px;line-height:1.2;color:#08213d;">
          Reset your password
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding:0 28px 8px;">
        <p
          style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#334155;"
        >
          We received a request to reset the password for your Questura account.
        </p>
        <p
          style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#475569;"
        >
          Use the button below to choose a new password. If you did not request
          this, you can ignore this email.
        </p>
        <a
          href="{{ .ConfirmationURL }}"
          style="display:inline-block;background:#f4c542;color:#08213d;text-decoration:none;font-size:16px;font-weight:700;padding:14px 22px;border-radius:8px;"
        >
          Choose new password
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 28px 28px;">
        <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
          If the button does not work, copy and paste this link into your
          browser:
        </p>
        <p
          style="margin:8px 0 0;font-size:13px;line-height:1.6;color:#64748b;word-break:break-all;"
        >
          {{ .ConfirmationURL }}
        </p>
      </td>
    </tr>
  </table>
</div>
```
