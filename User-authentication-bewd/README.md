-  Run the app
*npm run dev*

- 🔧 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Log in and receive tokens (cookies)
POST	/api/auth/refresh	Refresh access token using cookie
GET	/api/auth/profile	Protected route (access token req.)
POST	/api/auth/logout	Logout and clear cookies

✅ Features

🔐 Secure password hashing with bcryptjs

🔁 Token refresh using refresh token cookie

🧠 Middleware to protect private routes

🌐 Cross-Origin setup for frontend integration

🧪 API testable using Postman, Bruno, etc.