# Project Name

## Intro

The project is a simple database connection user application for PostgreSQL databases. It allows users to connect their PostgreSQL database in the cloud for easy and quick access without the need to download any software one's computer. This is an initial concept project built in participation of the 2023 Microsoft .NET Hackathon and therefore will have some features left out for brevity reasons such as encrypting personal data before storing it in the database.

## Project Setup Steps

### There are a few notes before setting up this project
1. The walkthrough of setting up this project will be using Visual Studio 2022 Preview
2. It's highly recommended that you have PgAdmin installed to set up some test databases to work with this example
3. Node will also be required in order to set up the React and Next.js frontend of this application.
4. .NET 8 will also be required in order to run this application

## Setup

1. **Clone the Repository:**
   - git clone https://github.com/Tuck1297/AspireWithNextJS.git
2. **Install NuGet Packages**
Install the following NuGet Packages under AspireWithNextJS.WebAPI project:
        * AutoMapper (12.0.1)
        * Azure.AI.OpenAI (1.0.0-beta.9)
        * BCrypt.Net-Next (4.0.3)
        * Dapper (2.1.24)
        * Microsoft.AspNetCore.Authentication.JwtBearer (8.0.0)
        * Microsoft.AspNetCore.Identity.EntityFrameworkCore (8.0.0)
        * Microsoft.AspNetCore.OpenApi (8.0.0)
        * Microsoft.AspNetCore.SpaProxy (8.0.0)
        * Microsoft.DotNet.Interactive.AIUtilities (1.0.0-beta.23562.1)
        * Microsoft.EntityFrameworkCore.Design (8.0.0)
        * Microsoft.EntityFrameworkCore.Tools (8.0.0)
        * Microsoft.IdentityModel.Tokens (7.0.3)
        * Microsoft.VisualStudio.Azure.Containers.Tools.Targets (1.19.6-Preview.1)
        * Newtonsoft.Json (13.0.3)
        * Npgsql.EntityFrameworkCore.PostgreSQL (8.0.0)
        * Swashbuckle.AspNetCore (6.4.0)
        * System.IdentityModel.Tokens.JWT (7.0.3)

3. **Create Local Databases in PgAdmin**
        Create three local databases in PgAdmin with the following names: HackathonDB, SupplyChain, and WebsiteInfo. Remember the connection credentials for all three of these databases.

4. **Update Environment Variables**
        Update the following variables in the AspireWithNextJS.WebAPI appsettings.json file:
            * DbString with connection details for HackathonDB database
            * SupplyChainConnection with connection details for SupplyChain database
            * WebsiteInfoConnection with connection details for WebsiteInfo database
            * OpenAIKey with key to Azure OpenAI
            * OpenAIProxyURL with proxy URL to Azure OpenAI
            * OpenAIDeploymentName to gpt-3.5-turbo

    The database connection strings should be formatted like the following:
    ```"host=localhost; database=HackathonDB; port=5432; user id=postgres; password=123456;"```

5. **Migrate Data to Created Databases**
        Run the following commands in the package manager console (if using Visual Studio 2022) to migrate all databases to the created PgAdmin databases:
        ```
            dotnet ef database update --context DataContext (for HackathonDB)
            dotnet ef database update --context SupplyChainContext (for SupplyChain)
            dotnet ef database update --context WebsiteContext (for WebsiteInfo)
        ```
        If you run into problems ensure you are within the directory of the AspireWithNextJS.WebAPI project

6. **Run the Application**
        Ensure you run the application in HTTPS, as access to the application frontend relies on setting refresh and session HttpOnly cookies that are only accessible in an HttpOnly testing connection environment.

7. **Explore the Application**
        Once started, visit the Aspire dashboard to manage different parts of the application. Navigate to the executables to see the Next.js application running.

8. **Sign in as Test User**
        Sign in as test1@hackathon.com with the password Password1!.

9. **Interact with Admin Privileges**
        Access the Admin tools under the projects to manage users and databases.

10. **Interact with a test database**
        In navigation click on Databases where you will see available databases to access.
        Click access and start exploring. Delete tables, update rows in tables, create new rows in tables and delete rows in tables. NOTE: This project only handles simple data types (Integers, Text, Uuids, and Utc Time with timestamp values, errors will be thrown if try to access tables with geometries, arrays objects and so forth in their columns)

11. **AI Summarizing Tool**
        Find the AI summarizing tool at the bottom of the page when viewing data in a particular table.

## Pages Summary

Here are the following pages to the front end of this application:

    Home: Home and welcome page for the application.
    Login: Page to log in (accessible only when not signed in).
    Register: Page to register (accessible only when not signed in).
    Profile: Page to update profile information (accessible only when signed in).
    Databases: Page to interact with connected databases (accessible only when signed in).
    New Connection: Page to add new database connection credentials (accessible only when signed in).
    Admin Tools: Accessible only for Admin accounts to manage users in the system.
    Logout: Button to log out and remove HttpOnly refresh and session tokens from the browser's cookies.

## Features of the Application

    1. Role-based user accounts.
    2. HttpOnly JWT authentication and refresh tokens implementation.
    3. Remote database connection and interaction allowing table deletion, row deletion, and 4. updating/creating new rows.
    5. AI data summarizer providing summaries of data and additional insights.
    6. Frontend built with Next.js and React.js.
    7. All forms include validation logic to prevent invalid data from hitting the API endpoints.