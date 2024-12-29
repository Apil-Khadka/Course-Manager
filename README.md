# Course Manager

**Course Manager** is a Laravel-based React application designed for creating and managing courses with the ability to assign lessons, create quizzes, and manage user roles. This project provides a seamless interface for educators and learners to interact with course content in an organized manner.

## Features

- **Course Management**: Create, update, and manage courses easily.
- **Lesson Assignment**: Assign lessons to courses efficiently.
- **Quiz Management**: Create and assign quizzes to courses for student evaluation.
- **User Roles**: Admins can manage courses and lessons, while students can view courses and take quizzes.
- **Responsive Design**: Built with React for a modern and responsive user experience.
- **Backend with Laravel**: Leverages the power of Laravel for a robust and secure backend.

## Demo

Explore the live demo here: [Course Manager Demo](https://cotapp.helioho.st/)

## Installation

Follow these steps to set up the project on your local machine:

### Prerequisites
- **PHP**: Ensure PHP 8.0 or higher is installed.
- **Node.js**: Required for React and frontend dependencies.
- **Composer**: For managing PHP dependencies.
- **MySQL**: Or another compatible database.

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Apil-Khadka/Course-Manager.git
   cd Course-Manager
   ```

2. **Install Backend Dependencies**
   ```bash
   composer install
   ```

3. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update database credentials and other environment variables in the `.env` file.

5. **Database Migration**
   ```bash
   php artisan migrate
   ```

6. **Build Frontend Assets**
   ```bash
   npm run dev
   ```

7. **Run the Application**
   ```bash
   php artisan serve
   ```
   Access the application at [http://localhost:8000](http://localhost:8000).

## Usage

1. **Create a Course**: Use the intuitive interface to add a new course.
2. **Assign Lessons**: Link lessons to specific courses.
3. **Create Quizzes**: Add quizzes to courses for student assessment.
4. **Manage Content**: Update or delete courses, lessons, and quizzes as needed.
5. **Student Interaction**: Students can view courses, take lessons, and complete quizzes.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/Apil-Khadka/Course-Manager) or contact the author.

## Author

Developed by [Apil Khadka](https://github.com/Apil-Khadka).

