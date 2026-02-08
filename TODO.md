# Todo

## Dev

- ~ vehicle page
- account page
- landing page
- onboarding
- monetization (polar.sh)
- pwa
- mobile native (capacitor)
  -> Supabase PKCE Flows
  -> Play Store (25€ one-time)
  -> App Store (100€/y) (+ apple login)
- /auth/auth-code-error page
- 404 page
- auto-fill car info for
  -> add vehicle form with vin / license plate
  -> add event with picture

### Email example

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        body {
            margin: 0;
            padding: 0;
            background-color: #0a0908;
            font-family: sans-serif;
            color: #fafaf9;
            -webkit-font-smoothing: antialiased;
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #0a0908;
            padding-bottom: 40px;
        }

        .main {
            background-color: #0a0908;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
            color: #fafaf9;
        }

        .content {
            padding: 48px 32px;
            border: 1px solid #292524;
            background-color: #0a0908;
            border-radius: 0px !important; 
        }

        .header {
            padding: 40px 0;
            text-align: center;
        }

        .logo-square {
            display: inline-block;
            background-color: #f0a500;
            width: 16px;
            height: 16px;
            margin-right: 8px;
            vertical-align: middle;
            border-radius: 0px !important;
        }

        .brand-name {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: -0.025em;
            color: #fafaf9;
            vertical-align: middle;
        }

        h1 {
            font-size: 24px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 16px;
            color: #fafaf9;
            letter-spacing: -0.05em;
        }

        p {
            font-size: 15px;
            line-height: 1.6;
            color: #a8a29e;
            margin-bottom: 24px;
        }

        .button {
            display: inline-block;
            background-color: #f0a500;
            color: #1a1817 !important;
            padding: 14px 28px;
            font-weight: 700;
            text-decoration: none;
            font-size: 13px;
            border-radius: 0px !important;
            text-transform: uppercase;
        }

        .footer {
            padding-top: 32px;
            text-align: center;
            font-size: 11px;
            color: #57534e;
        }

        .divider {
            border-top: 1px solid #292524;
            margin: 32px 0;
        }

        @media screen and (max-width: 600px) {
            .content {
                padding: 32px 20px;
                border: none;
            }
        }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main" role="presentation">
            <tr>
                <td class="header">
                    <div class="logo-square" style="border-radius: 3px !important;"></div>
                    <span class="brand-name">VinTrace</span>
                </td>
            </tr>
            <tr>
                <td class="content" style="border-radius: 0px !important;">
                    <h1 style="margin-top: 0;">Réinitialiser votre mot de passe</h1>
                    <p>
                        Une demande de réinitialisation a été effectuée pour votre garage numérique <strong>VinTrace</strong>. Cliquez sur le bouton ci-dessous pour configurer votre nouveau mot de passe.
                    </p>
                    
                    <a href="{{ .ConfirmationURL }}" class="button" style="border-radius: 0px !important;">
                        Nouveau mot de passe
                    </a>

                    <div class="divider"></div>
                    
                    <p style="font-size: 13px; margin-bottom: 0;">
                        Si vous n'avez pas sollicité cette action, vous pouvez ignorer cet email.
                    </p>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    &copy; 2026 VinTrace
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
```

## PROD

- Emails (style)
- Emails (SMTP)
- DN (vintrace.fr)
- Site URL (vintrace.vercel.app)
- google oauth domain
- google oauth application home page
- google oauth DN
- Open Source -> License
- legal (ToS, Privacy Policy + export data) -> Google OAuth Branding

## IDEAS

- Referral CarVertical link on the VIN in the Showcase page
