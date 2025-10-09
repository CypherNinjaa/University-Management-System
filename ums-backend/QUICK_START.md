# Quick Start Guide - 3 Steps Only!

## Step 1: Setup MySQL Database ⚡

Open MySQL Workbench (or command line) and run:

```sql
-- Copy and paste the entire content of database_schema.sql file
-- Or run this command in terminal:
mysql -u root -p9199 < database_schema.sql
```

This creates everything you need with sample data!

## Step 2: Start Backend Server 🚀

```bash
cd ums-backend
npm start
```

You should see:

```
✅ Database connected successfully!
🚀 Server running on: http://localhost:5000
```

## Step 3: Test It! 🧪

Open your browser and go to:

```
http://localhost:5000
```

You should see the API welcome message!

### Test Login API:

Use Postman or any API client:

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Test Events API:

```
GET http://localhost:5000/api/events
```

You'll see 6 sample events!

## That's It! 🎉

Your backend is now running with:

- ✅ Admin authentication
- ✅ Students CRUD
- ✅ Teachers CRUD
- ✅ Courses CRUD
- ✅ Events CRUD

## Common Issues:

**Can't connect to database?**

- Make sure MySQL is running
- Check password in `.env` file (should be 9199)
- Verify database exists: `SHOW DATABASES;`

**Port 5000 already in use?**

- Change PORT in `.env` file
- Or stop the process using port 5000

**Dependencies missing?**

- Run: `npm install`

## Next: Connect to Frontend

In your React app (`ums` folder):

1. Install axios: `npm install axios`
2. Create API calls to `http://localhost:5000/api/...`
3. Store admin data in localStorage after login
4. Build admin dashboard for CRUD operations

See `SETUP_COMPLETE.md` for detailed integration guide!
