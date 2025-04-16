# Target Account Matching API

## 🚀 Quick Start

![Image 1](images/image1.png)
![Image 2](images/image2.png)
![Image 3](images/image3.png)
![Image 4](images/image4.png)
![Image 5](images/image5.png)

```bash
git clone https://github.com/yourusername/target-account-api.git
cd target-account-api
npm install
echo "MONGODB_URI=mongodb://localhost:27017/accountMatching
JWT_SECRET=your_secure_secret
PORT=3000" > .env
npm start


## 🔑 Authentication

### Signup

http

Copy

POST /signup
Content-Type: application/json
{
  "username": "admin",
  "password": "secure123"
}

### Login

http

Copy

POST /login
Content-Type: application/json
{
  "username": "admin",
  "password": "secure123"
}

## 💼 Company Management

### Create Company

http

Copy

POST /companies
Authorization: Bearer <token>
Content-Type: application/json
{
  "name": "TechCorp",
  "domain": "techcorp.com",
  "matchScore": 85
}

### Get All Companies

http

Copy

GET /accounts
Authorization: Bearer <token>

### Update Status

http

Copy

POST /accounts/:id/status
Authorization: Bearer <token>
Content-Type: application/json
{
  "status": "Target"
}

## 🛠️ Project Structure

Copy

target-account-api/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── .env
├── .gitignore
├── package.json
└── server.js

## 🔧 Example Usage

javascript

Copy

// Frontend API Call Example
const createCompany \= async (companyData) \=> {
  const response \= await fetch('http://localhost:3000/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer ${localStorage.getItem('token')}\`
    },
    body: JSON.stringify(companyData)
  });
  return await response.json();
};

## ⚠️ Error Handling

json

Copy

{
  "error": "Invalid credentials",
  "statusCode": 401
}

## 📜 License