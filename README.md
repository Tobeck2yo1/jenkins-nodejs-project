# Jenkins CI/CD Pipeline Project

## Project Overview

This project demonstrates the implementation of a CI/CD pipeline using Jenkins, GitHub, Node.js, NPM, and Jest.

The objective was to configure Jenkins to retrieve application source code from a GitHub repository and automatically perform the build, testing, packaging, and simulated deployment processes through a Declarative Jenkins Pipeline.

## Technologies Used

- Jenkins
- Git and GitHub
- Node.js
- NPM
- Jest
- Ubuntu Linux
- Declarative Jenkins Pipeline

## Project Structure

The repository contains:

- `src/` – Node.js application source code
- `tests/` – Automated unit tests
- `Jenkinsfile` – Jenkins Declarative Pipeline configuration
- `package.json` – Node.js project configuration and NPM scripts
- `package-lock.json` – Locked dependency versions
- `.gitignore` – Files and directories excluded from Git
- `screenshots/` – Evidence of the Jenkins pipeline execution

## Jenkins Environment Setup

Jenkins was installed and configured on an Ubuntu Linux environment.

Java was installed as a prerequisite for Jenkins, after which the Jenkins package repository was configured and Jenkins was installed and started as a system service.

The Jenkins web interface was accessed through port `8080`, and the initial setup wizard was used to configure the Jenkins administrator account and required plugins.

## Source Control Integration

GitHub was used as the source control platform.

The project source code, Jenkinsfile, tests, and configuration files were committed to the Git repository and pushed to GitHub.

Jenkins was configured to retrieve the project directly from the GitHub repository using the `main` branch.

The Pipeline configuration uses:

- Definition: `Pipeline script from SCM`
- SCM: Git
- Branch: `main`
- Script Path: `Jenkinsfile`

SCM polling was configured to allow Jenkins to check the Git repository for new commits and automatically start the pipeline when changes are detected.

The polling schedule used was:

`H/5 * * * *`

## Jenkins Pipeline

The CI/CD workflow is defined as code using a Declarative Pipeline stored in the `Jenkinsfile`.

The pipeline performs the following operations:

### Checkout

Jenkins retrieves the latest version of the application from the GitHub repository.

### Install Dependencies

The pipeline installs the Node.js dependencies required by the application using NPM.

### Build

The application is validated and prepared for the subsequent stages of the CI/CD process.

### Unit Testing

Automated tests are executed using Jest.

A failed unit test causes the Jenkins pipeline to fail, preventing unsuccessful code from progressing to the packaging and deployment stages.

### Package Artifact

After successful testing, the application is packaged into a compressed artifact.

Jenkins archives the generated artifact so that it can be accessed from the completed build.

### Deployment

The final stage simulates deployment to a test environment.

The packaged application is copied to a test deployment location, demonstrating how a real deployment stage could be incorporated into the pipeline.

## Security

Sensitive credentials are not stored directly in the Jenkinsfile or application source code.

Jenkins credentials are managed through the Jenkins Credentials store where required.

The `.gitignore` file also prevents unnecessary files such as `node_modules`, build artifacts, environment files, and logs from being committed to the repository.

## Challenges Encountered

Several issues were encountered while completing the project.

### Jenkins Repository Signing Error

During the Jenkins installation, the package repository initially produced a repository signing error. This prevented the Jenkins package from being available through APT.

The issue was resolved by configuring the current Jenkins repository signing key and recreating the Jenkins APT repository configuration.

### Jenkins Authentication

An authentication issue was encountered when accessing Jenkins. The difference between the initial Jenkins unlock password and the administrator credentials created during the Jenkins setup process was identified while troubleshooting the issue.

### GitHub Webhook Accessibility

Because Jenkins was running in a local environment, GitHub could not directly access Jenkins through a private IP address or localhost.

SCM polling was therefore used for the project instead of exposing the local Jenkins server publicly.

The polling configuration allows Jenkins to periodically check GitHub and trigger a new pipeline execution when a commit is detected.

## Pipeline Validation

The completed pipeline was executed through Jenkins.

The pipeline successfully completed the required CI/CD stages:

1. Source code checkout
2. Dependency installation
3. Application build
4. Automated unit testing
5. Artifact packaging
6. Simulated deployment

The Jenkins build dashboard and console output were reviewed to confirm successful end-to-end execution.

Screenshots of the successful Jenkins execution are included in the `screenshots` directory.

## Result

The project successfully demonstrates a basic CI/CD workflow using Jenkins and GitHub.

Changes stored in source control can be detected by Jenkins, after which the application is automatically built, tested, packaged, and deployed to a simulated test environment.

The use of a Jenkinsfile ensures that the pipeline configuration is version-controlled alongside the application source code.

## Author

Oluwatobi Oguntuyo

