# NodeJS Express TypeScript REST API Starter

## :rocket: Overview
This is NodeJS Express TypeScript REST API Starter that is easy to use and customize. It uses NodeJS, Express, TypeScript, and MySQL with a Laravel inspired folder structure and command line system like `npm run make:controller`, `npm run make:model`, `npm run make:seeder` for rapid development. The starter kit includes features such as JWT Authentication, email notifications, file upload, and push notifications. 

## :sparkles: Features

- ExpressJS
- TypeScript support
- MySQL database
- CLI command line system
- Validations
- JWT authentication
- Node Mailer
- One Signal Push Notification
- File Upload & delete (local and AWS S3)
- API resources like laravel


## :file_folder: Folder Structure

```bash

app/

├── config/         # Configuration files
├── console/        # CLI commands
├── controllers/    # API controllers
├── database/       # Migrations and seeders
├── filters/        # Filters for API requests (Searching)
├── middlewares/    # API middlewares
├── models/         # Database models
├── public/         # Upload local Static files
├── resources/      # API resources
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Helper functions
└── validators/     # Input validation schemas
```

## :wrench: Postman Collection
You can import the Postman collection from the <a href="https://drive.google.com/file/d/1-Vr8de2-LYWe95yZrpRJ0hbHv1ik48gb/view?usp=sharing">`postman.json` </a>file.

## :inbox_tray: Getting Started

⚠️ Important: Node.js version must be ≥ v20.0.0

### Installation
Clone the repository:
````
git clone https://github.com/htetoozin/node-express-api-starter.git
````
Install dependencies:

```bash
npm install
```

### Configuration

Create .env file and configure your environment variables.

### Database Setup
This project uses Sutando as the ORM. For detailed documentation, visit <a href="https://sutando.org/"> Sutando</a> ORM .

Run the database migrations:
```bash
sutando migrate:run
```
Run the database seeders:

```bash
npm run db:seed userSeeder
```

### Start Server
```bash
npm start
```

## :computer: Usage

### Create Validator
If you want create validator, run `npm run make:validator` command line. After run this command, validator file is stored in the `app/validators/` directory.
```bash
npm run make:validator userValidator
```

### Create Model
If you want create model, run `npm run make:model` command line. After run this command, model file is stored in the `app/models/` directory.
```bash
npm run make:model userModel
```
### Create Controller
If you want create controller, run `npm run make:controller` command line. After run this command, controller file is stored in the `app/controllers/` directory.
```bash
npm run make:controller userController
```

## Database Migrations

### Create Migrations

<a href="https://sutando.org/">Sutando<a> ORM use for database migrations.

If you want create migration file, run `sutando migrate:make` command line. After run this command, migration file is stored in the `app/database/migrations` directory.

Create the database migrations:
```bash
sutando migrate:make create_users_table
```
### Running Migrations
If you want to execute migration, run `sutando migrate:run` command line.
```bash
sutando migrate:run
```

## Database Seeding

### Create Seeder
If you want create database seeder, run `npm run make:seeder` command line. After run this command, seeder file is stored in the `app/database/seeders` directory.
```bash
npm run make:seeder userSeeder
```
### Running Seeders
If you want to execute database seeder, run `npm run db:seed` command line
```bash
npm run db:seed userSeeder
```

## File Upload
This project provides `local` and `s3 cloud` storage.

## Local Upload
If you want to upload in local, file is stored in the `app/public` directory.
```
FILESYSTEM_DRIVER=public
```

#### Upload 
```javascript
uploadFile("path", folderPath, req, res)
    .then((image) => {})
```

#### Delete
```javascript
deleteFile(user.path);
```
## S3 Upload
If you want to upload in S3, file is stored in the s3 cloud. Add S3 credentials information in .env.
```
FILESYSTEM_DRIVER=s3

AWS_REGION=<aws-region>
AWS_ACCESS_KEY_ID=<aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<aws-secret-access-key>
AWS_BUCKET=<aws-bucket>
AWS_PREFIX=<aws-prefix>
AWS_REDIRECT_PATH=<aws-redirect-path>
```

#### Upload 
```javascript
uploadS3File("path", folderPath, req, res)
    .then((image) => {})
```

#### Delete
```javascript
deleteS3File(user.path);
```

### Create Filter
Filter is used for searching.

If you want create filter, run `npm run make:filter` command line. After run this command, filter file is stored in the `app/filters/` directory.
```bash
npm run make:filer userFilter
```

> [!IMPORTANT]  
> Array value and the method name must be the same; otherwise, the filter value doesn't work.

```javascript
import Filter from "./filter";

class UserFilter extends Filter {
  /**
   * Filter values
   */
  protected filterValues = ["keyword"];

  /**
   * Filter by name
   */
  keyword(value: string) {
    return this.builder.where("name", "like", `%${value}%`);
  }
}

export default UserFilter;
```

Add local scope in UserModel.
```javascript
  /**
   * Query Scopes
   */
  scopeFilter(query: any, filter: any) {
    return filter.apply(query);
  }
```

Using UserFilter in controller.

```javascript
const filter = new UserFilter(req.query);
const users = await User.query()
      .filter(filter)
      .latest()
      .paginate();
```

## API Resources

### Resource Collections

API resource collection is used for listing or pagination. 

If you want create resource collection, run `npm run make:collection` command line. After run this command, collection file is stored in the `app/resources/` directory.
```bash
npm run make:collection userCollection
```

### Resource

API resource is used for single resource.

If you want create resource, run `npm run make:resource` command line. After run this command, resource file is stored in the `app/resources/` directory.
```bash
npm run make:resource userResource
```

## :scroll: License
This project is licensed under the MIT License.