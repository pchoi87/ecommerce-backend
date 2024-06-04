# E-commerce Back End 

## Description

This project is a back end for an e-commerce site. It uses Sequelize to interact with a PostgreSQL database and includes the following functionalities:
- Connecting to a database using Sequelize
- Creating and seeding the database with test data
- Starting the server and syncing Sequelize models to the database
- Performing CRUD operations on categories, products, and tags

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name/Develop

2. Install dependencies: 
   npm install

3. Create a .env file in the root of the Develop directory and add your PostgreSQL database credentials:
   DB_NAME='ecommerce_db'
   DB_USER='your-username'
   DB_PASSWORD='your-password'

4. Create the database and schema: 
   psql -U postgres

   In the psql shell:  
   CREATE DATABASE ecommerce_db;
   \q

5. Grant privileges to your user: `psql -U postgres` 
   In the psql shell: 
   `GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO your-username; \c ecommerce_db 
   `GRANT ALL PRIVILEGES ON SCHEMA public TO your-username; 
   `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your-username; 
   `GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your-username; 
   \q`

6. Seed the database: 
   `npm run seed`

## Usage 

To start the server, run:

```bash
npm start

The server will start and listen on port 3001 

## Endpoints

Categories
GET /api/categories - Get all categories
GET /api/categories/:id - Get a single category by its id
POST /api/categories - Create a new category
PUT /api/categories/:id - Update a category by its id
DELETE /api/categories/:id - Delete a category by its id

Products
GET /api/products - Get all products
GET /api/products/:id - Get a single product by its id
POST /api/products - Create a new product
PUT /api/products/:id - Update a product by its id
DELETE /api/products/:id - Delete a product by its id

Tags
GET /api/tags - Get all tags
GET /api/tags/:id - Get a single tag by its id
POST /api/tags - Create a new tag
PUT /api/tags/:id - Update a tag by its id
DELETE /api/tags/:id - Delete a tag by its id


## Technologies
Node.js
Express.js
Sequelize
PostgreSQL
dotenv

## License
This project is licensed under the MIT License.
