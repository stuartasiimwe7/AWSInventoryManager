# AWSInventoryManager
 A robust and scalable inventory management dashboard built with Next.js, designed to streamline inventory processes for businesses of all sizes. It provides a comprehensive solution for efficient inventory management, seamlessly integrating with AWS services to ensure reliable and effortless performance.


## Key Features
- **User Interface:** Developed using Next.js and Tailwind CSS for a responsive and intuitive user experience.
- **Authentication and Authorization:** Integrated with AWS Cognito for secure user authentication and role-based access control.
- **Backend Services:** Built with Node.js and Express.js, utilizing PostgreSQL as the primary database hosted on AWS RDS.
- **Real-Time Updates:** Implemented using WebSockets for real-time inventory updates and notifications.
- **API Layer:** RESTful APIs designed following best practices.
- **Deployment:** Deployed on AWS EC2 with autoscaling groups, using Docker for consistent deployment environments.
- **Storage Solutions:** Utilizes AWS S3 for scalable object storage.
- **Monitoring and Logging:** Uses AWS CloudWatch for monitoring and logging.
- **CI/CD Pipeline:** Automated with GitLab CI for continuous integration and deployment.
- **Infrastructure as Code:** Managed with Terraform and Ansible.

## Technology Stack
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js, PostgreSQL
- **Cloud Services:** AWS EC2, RDS, S3, Cognito, CloudWatch
- **Deployment:** Docker, GitLab CI
- **Infrastructure Management:** Terraform, Ansible

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stuartasiimwe7/AWSInventoryManager.git
   cd AWSInventoryManager

2. Install Dependencies:
    ```bash
    npm install

3. Set up environment variables:
Create a .env file in the root directory and add the necessary environment variables:
    ```bash
    DB_HOST=your-db-host
    DB_USER=your-db-user
    DB_PASSWORD=your-db-password
    AWS_ACCESS_KEY_ID=your-aws-access-key-id
    AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key

4. Run the development server:
    ```bash
    npm run dev

5. Access the dashboard: Open your browser and navigate to http://localhost:3000.

# Contributing 
Contributions are welcome! Please fork the repository and submit a pull request. 

# License 
This project is licensed under the MIT License - see the LICENSE file for details.