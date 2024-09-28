# SaaS-Like Contact Form Project

This project is a SaaS-like contact form system built using React/Next.js and Tailwind CSS. It allows an admin to create customizable contact forms for multiple clients. Each client can redirect their domain to our system, displaying a contact form with their branding. The project supports multi-tenant functionality, allowing clients to manage their own form submissions.

## Features

### Admin Panel
- **Admin Login:** Admin can log in using the following credentials:
  - **Email:** pawankumarlimba@12345
  - **Password:** 12345
- **Manage Clients:**
  - Create new clients with a custom domain, logo, heading, and contact email.
  - Assign unique usernames and passwords for clients to access their form submissions.
  - View and manage all existing clients, including total form submissions per domain.
  - Add or delete clients and their associated data.
  
### Client-Side (Whitelabel Contact Form)
- **Customizable Contact Form:**
  - Each client domain will display a unique contact form with fields: Name, Email, and Message.
  - The form is branded with the client's logo and heading.
- **Form Submission:**
  - Form responses are sent to the email address configured by the admin for that client.
- **Client Login:**
  - Clients can log in to view their form submissions using the credentials provided by the admin.

### Backend
- Handles admin authentication and client management.
- Provides an API for clients to view their form entries.
- Sends form responses to the specified email address.
- Stores client data, logos, and form submissions in a database (e.g., MongoDB, PostgreSQL).

### Frontend
- Built using React.js and Next.js.
- Styled with Tailwind CSS for a modern and responsive UI.

### Deployment
- Deployed to Vercel.
- Live URL: [https://my-app-two-delta-88.vercel.app/](https://my-app-two-delta-88.vercel.app/)

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pawankumarlimba/my-app.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add the following environment variables:
   ```bash
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   MONGODB_URI=<your-mongodb-uri>
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Usage

1. **Admin Login:**
   - Navigate to the admin login page at `/admin/login`.
   - Use the provided credentials to log in and manage clients.

2. **Client Login:**
   - Each client can log in using their unique username and password at `/client/login`.
   - Clients can view and manage their form submissions.

3. **Form Submission:**
   - Each client's domain will redirect to the customized contact form.
   - Users can fill out the form, and the responses will be sent to the configured email address.

## Contributing

Feel free to submit issues and pull requests if you find any bugs or want to contribute to the project.
