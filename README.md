# AWSInventoryManager
A scalable inventory management dashboard built with Next.js, designed to streamline inventory processes for businesses of all sizes. It provides a comprehensive solution for efficient inventory management, seamlessly integrating with AWS services to ensure reliable and effortless performance.

## Key Features
- The user interface is developed using Next.js and Tailwind CSS, ensuring a responsive and intuitive user experience.
- Authentication and authorization are securely managed with AWS Cognito, providing robust user authentication and role-based access control.
- The backend services are built with Node.js and Express.js, utilizing PostgreSQL as the primary database hosted on AWS RDS.
- Real-time inventory updates and notifications are implemented using WebSockets.
- The API layer is designed with RESTful APIs following best practices.
- The application is deployed on AWS EC2 with autoscaling groups, using Docker to maintain consistent deployment environments.
- For scalable object storage, AWS S3 is utilized.
- Monitoring and logging are handled by AWS CloudWatch.
- The CI/CD pipeline is automated with GitLab CI, ensuring continuous integration and deployment.
- Infrastructure management is achieved through Terraform and Ansible, following the principles of Infrastructure as Code.

## Tech Stack Used
- **Frontend:** Next.js styled with Tailwind CSS
- **Backend:** Node.js (using Prisma as the ORM), Express.js, PostgreSQL
- **Cloud Services:** AWS (EC2, RDS, S3, Cognito, and CloudWatch)
- **Deployment:** Docker, GitLab CI
- **Infrastructure Management:** Terraform, Ansible

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/stuartasiimwe7/AWSInventoryManager.git
    cd AWSInventoryManager
    ```

2. Install Dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a .env file in the root directory and add the necessary environment variables:
    ```bash
    DB_HOST=your-db-host
    DB_USER=your-db-user
    DB_PASSWORD=your-db-password
    AWS_ACCESS_KEY_ID=your-aws-access-key-id
    AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Access the dashboard: Open your browser and navigate to http://localhost:3000.

## Contributing 
Contributions are welcome! 
You can fork the repository and submit a pull request. 

## License 
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.