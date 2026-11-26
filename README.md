This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Estado del proyecto (26 Nov 2026)

- **Producción:** https://fonseca-topaz.vercel.app
- **Repositorio:** https://github.com/andyyamarte/fonseca (rama `main`)
- **Último commit desplegado:** `5379a50`

### Lo que falta pendiente

El acceso de administrador funciona en dos pasos: correo corporativo + contraseña → el sistema envía **automáticamente** un código de 6 dígitos al correo de la empresa y a los dos teléfonos publicados en la página → pantalla «Coloca aquí tu código» → sesión de 90 días. Sin el código no se puede entrar a `/admin`.

En Vercel ya están configuradas `ADMIN_EMAIL`, `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET`. **Faltan estas variables para que el código se envíe de verdad:**

| Variable | Dónde obtenerla |
| --- | --- |
| `RESEND_API_KEY` | https://resend.com → API Keys (dominio `marinesuppliers.cl` verificado) |
| `ADMIN_FROM_EMAIL` | Remitente verificado, p. ej. `Marine Suppliers <seguridad@marinesuppliers.cl>` |
| `TWILIO_ACCOUNT_SID` | https://twilio.com → Console → Account SID |
| `TWILIO_AUTH_TOKEN` | https://twilio.com → Console → Auth Token |
| `TWILIO_FROM_NUMBER` | Número Twilio con capacidad SMS, formato `+56...` |
| `ADMIN_EMAIL_DOMAIN` | Opcional; por defecto `marinesuppliers.cl` |

Mientras no estén, `/api/admin/login` devuelve `503` y nadie puede entrar al panel en producción. En local el código se muestra en la pantalla («Development code») para poder probar el flujo.

### Para retomar

1. Agregar las variables en Vercel → Settings → Environment Variables → Production.
2. Hacer un nuevo deploy: `npx vercel --prod --yes`.
3. Servidor local: `npm run dev` → http://127.0.0.1:3000

### Notas de seguridad

- La sesión es una cookie `httpOnly`, `SameSite=strict`, `Secure` en producción, con caducidad de 90 días.
- El `localStorage` guarda solo estado visual; se elimina al hacer **Log Out**. La autorización real siempre la valida el servidor.
- Límite de intentos: 5 logins y 10 códigos por IP cada 15 minutos. Códigos de un solo uso con vigencia de 5 minutos.
- Los teléfonos **no** se escriben en el formulario: el código se envía a los números definidos en `SITE_CONTACT`.
