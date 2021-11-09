# Getting Started with Visity Frontend

## Installing Backend Project
1. Clone visity-backend project [here](https://github.com/BukuTamuKita/visity-backend)
2. Make your own .env file or just rename .env.example into .env
3. Inside .env file, change database settings:
```env
DB_DATABASE=visiti
```
4. Install project dependencies
```bash
composer install
```
5. Update project dependencies 
```bash
composer update
```
6. Generate laravel project key
```bash
php artisan key:generate
```
7. Generate JWT secret key
```bash
php artisan jwt:secret
```
8. Migrate database
```bash
php artisan migrate --seed
```
9. Turn on Xampp/Mamp

10. Run the project
```bash
php artisan serve
```

**Note:**
>password for all users: "password" (without double quotation marks)


## Installing Frontend Project
1. Clone visity-frontend project 
```bash
https://github.com/BukuTamuKita/visity-frontend.git
```
2. Pull branch sprintReview

3. Install project dependencies
```bash
npm install
```
4. Run the project
```bash
npm start
```


## Frontend Routes
- /appointment-create
- /appointment-history
- /user-list
- /user-create
- /user-update
- /guest-list
- /testing
