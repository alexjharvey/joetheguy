# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

## 📧 Dumpster Booking Email System

This project includes a complete dumpster rental booking system with email notifications powered by [Resend](https://resend.com).

### API Endpoints

#### `POST /api/send-booking`
Sends a booking confirmation email when a customer submits a dumpster rental request.

**Location:** `src/pages/api/send-booking.ts`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "(843) 555-1234",
  "address": "123 Main Street, Spartanburg, SC 29301",
  "deliveryNotes": "Gate code is 1234",
  "order": {
    "type": "20",
    "price": "525",
    "deliveryDate": "12/25/2025",
    "pickupDate": "01/01/2026"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": { /* Resend API response */ }
}
```

**Response (Error):**
```json
{
  "error": "Error message",
  "details": "Detailed error description"
}
```

### Configuration

#### API Key Location
The Resend API key is stored in `src/data/company-details.ts`:
```typescript
export const companyInfo = {
  // ... other fields
  emailKey: 'your-resend-api-key-here',
  bookingEmail: 'booking@JoeTheGuy.com'
};
```

**Security Note:** The API key is used server-side only in the API endpoint. Never expose it in client-side code.

#### Booking Email Configuration
The email address that receives booking notifications can be changed in `src/data/company-details.ts`:
```typescript
bookingEmail: 'booking@JoeTheGuy.com'  // Change this to your desired email
```

#### Dumpster Pricing
Prices for each dumpster size are configured in `src/pages/dumpsters.astro` (frontmatter):
```javascript
const price15Yard = 500;  // $500/week
const price20Yard = 525;  // $525/week
const price30Yard = 750;  // $750/week
```

### Email Template

The booking email includes:
- **Customer Information:** Name, email, phone, delivery address
- **Dumpster Details:** Size (cubic yards), price per week, delivery/pickup dates
- **Delivery Notes:** Optional special instructions from customer
- **Professional HTML Formatting:** Styled email with company branding
- **Reply-To Header:** Set to customer's email for easy responses

### Required Updates for Production

#### 1. Domain Verification (REQUIRED)
Currently, the email sender address is set to the Resend testing domain:
```javascript
from: 'Joe The Guy Bookings <onboarding@resend.dev>'
```

**Before going to production:**
1. Log in to your Resend account at https://resend.com
2. Go to **Domains** section
3. Add your domain (e.g., `joetheguy.com`)
4. Add the required DNS records (TXT, MX, CNAME) to your domain registrar
5. Wait for verification (usually takes a few minutes)
6. Update the `from` address in `src/pages/api/send-booking.ts` (line 98):
   ```javascript
   from: 'Joe The Guy Bookings <bookings@joetheguy.com>'
   ```

#### 2. API Key Configuration
**For Development:**
- API key is currently stored in `src/data/company-details.ts`

**For Production:**
- Move API key to environment variables for better security:
  1. Create a `.env` file (add to `.gitignore`)
  2. Add: `RESEND_API_KEY=your-actual-api-key`
  3. Update `src/pages/api/send-booking.ts`:
     ```typescript
     const resend = new Resend(import.meta.env.RESEND_API_KEY);
     ```
  4. Update deployment platform (Vercel/Netlify) with environment variable

#### 3. Email Deliverability
After domain verification:
- Set up SPF, DKIM, and DMARC records for better deliverability
- Test emails to ensure they don't go to spam
- Consider warming up your domain by starting with low volume

#### 4. Error Handling & Monitoring
**Production Considerations:**
- Add logging service (e.g., Sentry, LogRocket) for error tracking
- Monitor email delivery rates in Resend dashboard
- Set up alerts for failed emails
- Consider adding a database to store booking history

#### 5. Rate Limiting
**Production Security:**
- Add rate limiting to prevent abuse of the booking endpoint
- Consider implementing CAPTCHA on the form
- Add request validation middleware

#### 6. Booking Confirmation Page
**Enhancement:**
- Create a dedicated confirmation page instead of using `alert()`
- Display booking reference number
- Send confirmation email to customer (in addition to business)
- Add booking to a database for tracking

### Testing

**Test the booking flow:**
1. Run dev server: `npm run dev`
2. Navigate to `/dumpsters`
3. Select a dumpster size and dates
4. Click "Book Now"
5. Fill out delivery information
6. Submit booking
7. Check the configured booking email for notification

**Note:** With the test domain (`onboarding@resend.dev`), emails may go to spam. After domain verification, deliverability will improve significantly.

### Troubleshooting

**Email not sending:**
- Check Resend API key is correct in `company-details.ts`
- Verify API endpoint is accessible at `/api/send-booking`
- Check browser console for JavaScript errors
- Review server logs for detailed error messages

**Email going to spam:**
- Complete domain verification with Resend
- Set up proper DNS records (SPF, DKIM, DMARC)
- Avoid spam trigger words in email content
- Ensure sending domain has good reputation

**Form submission errors:**
- Ensure all required fields are filled
- Check that dates are selected before clicking "Book Now"
- Verify internet connection
- Check browser console for network errors

### File Structure

```text
src/
├── pages/
│   ├── api/
│   │   └── send-booking.ts          # Email API endpoint
│   ├── dumpsters.astro              # Dumpster selection page
│   └── dumpster-delivery-info.astro # Booking form page
├── data/
│   └── company-details.ts           # Configuration (email, API key, etc.)
└── scripts/
    └── datepicker.ts                # Flatpickr date picker initialization
```
