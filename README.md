# Uber Clone REST API

# Use Case Diagram:
Subdomains and Bounded Contexts

For the clean architecture setup, it's essential to identify the subdomains and bounded contexts of the application. These will help in defining the scope of different modules and their interactions.
Subdomains

    Trip Management: Handling trip lifecycle, including creation, updates, and termination.

    User Management: Handling user profiles, authentication, and authorization.
    
	Payment Processing: Managing payment methods and processing payments.
    
	Notifications: Sending alerts and messages to users.
    
	Reporting: Generating reports for admin users about usage and activity.

```bash

                    +------------------------------------+
                    |              System                |
                    +------------------------------------+
                           |                |
            [Passenger]            [Driver]              [Admin]
                 |                  |                     |
      +---------+---------+  +-----+-----+  +-------------+
      |Create Trip        |  |Accept Trip|  |Manage Users |
      |Cancel Trip        |  |Complete Trip|  |View Reports |
      |Rate Trip          |  |Update Status|  +-------------+
      |View Trip History  |  +-------------+
      |Add Payment Method |         | 
      +-------------------+         |
               |                   | 
               +------> [System] <----+
                        |Send Notifications|
                        +------------------+
```

# Elaborated Diagram of Subdomains and Bounded Contexts:

```bash

+-------------------------------------------------------------+
|                           System                            |
|                                                             |
| +-------------------+  +-------------------+  +-----------+ |
| | Trip Management   |  | User Management   |  | Payment   | |
| | - Trip Context    |  | - User Context    |  | - Payment | |
| |                   |  |                   |  | Context   | |
| +-------------------+  +-------------------+  +-----------+ |
|           |                             |           |       |
| +-------------------+                   | +-----------------+
| | Notifications     |                   | | Reporting       |
| | - Notification    |                   | | - Report Context|
| | Context           |                   | |                 |
| +-------------------+                   | +-----------------+
+-------------------------------------------------------------+


```


# Class Diagram for the Trip Feature:

```bash
+---------------------------------+
|          TripEntity             |
+---------------------------------+
| - id: string                    |
| - currentLatitude: number       |
| - currentLongitude: number      |
| - destinationLatitude: number   |
| - destinationLongitude: number  |
| - createdAt: Date               |
| - passengerName: string         |
| - passengerPhone: string        |
| - currentPlaceName: string      |
| - destinationPlaceName: string  |
| - vehicleType: string           |
| - vehicleLicensePlate: string   |
| - driverName: string            |
| - status: TripStatusType        |
+---------------------------------+
| + fromJson(json: object): TripEntity |
+---------------------------------+
           ^   |
           |   | Inherits
           |   |
+---------------------------------+
|          CreateTripDto          |
+---------------------------------+
| <<static>> create(object: object): CreateTripDto |
+---------------------------------+

+---------------------------------+
|          UpdateTripDto          |
+---------------------------------+
| <<static>> create(object: object): UpdateTripDto |
+---------------------------------+

```


# Sequence Diagram for Trip Creation:


```bash

+------------+     +----------+     +---------+     +-----------+
| Passenger  |     |  System  |     |  Driver  |     | Payment   |
|            |     |          |     |         |     | Service   |
+------------+     +----------+     +---------+     +-----------+
       |                |                |                 |
       |---Request Trip----------------->|                 |
       |                |                |                 |
       |                |<--Validate Request--------------|
       |                |                |                 |
       |                |---Search for Drivers------------>|
       |                |                |                 |
       |                |                |<--Accept Trip---|
       |                |                |                 |
       |<--Confirm Trip------------------------------------|
       |                |                |                 |
       |                |---Notify Driver----------------->|
       |                |                |                 |
       |                |                |--Start Trip---->|
       |                |                |                 |
       |                |                |--End Trip------>|
       |                |                |                 |
       |                |<--Process Payment---------------|
       |                |                |                 |
       |                |---Notify Payment---------------->|
       |                |                |                 |
       |---Rate Trip-------------------------------------->|
       |                |                |<--Rate Passenger-|
       |                |                |                 |
       |                |---Send Notifications------------>|
       |                |                |                 |

```

This reporsitory contains a template for projects with Node, Express, Typescript. The test environment has been configured using Jest, and ESLint and Prettier have been integrated to set code style definitions. You can find the step-by-step construction of this project in this article:

[Boilerplate for your Node projects with Express](https://baguilar6174.medium.com/boilerplate-for-your-node-projects-with-express-add98ea89c9f)

Explore the world of API development using Node.js, Express, and TypeScript. Learn how to implement Clean Architecture and best programming practices to create robust, scalable, and maintainable web services. Whether you're a seasoned developer or just starting out, this repository provides comprehensive resources, tutorials, and examples to help you master API development with confidence.

[Modern API Development with Node.js, Express, and TypeScript using Clean Architecture](https://baguilar6174.medium.com/modern-api-development-with-node-js-express-and-typescript-using-clean-architecture-0868607b76de)

## Installation

Clone this repository

```bash
git clone https://github.com/baguilar6174/node-template-server.git
```

Install dependencies

```bash
yarn
```

Clone `.env.template` file and rename to `.env`.

Replace your environment variables in `.env` file

## Running the app

Run `yarn dev`

If your want to create build production, run `yarn build`

If your want to run tests, run `yarn test || yarn test:watch`

## My process

### Built with

- Node
- Typescript
- Express
- ESLint & Prettier
- Environment Variables
- Unit testing with Jest & Supertest
- Clean Architecture
- Repository Pattern
- Adapter Pattern
- Use Cases
- DTOs (Data Transfer Objects)

## API Documentation

This entire implementation is based on an in-memory database for example purposes. **NO** real database is being used, when the server is re-run, the in-memory database **will be re-created**.

Also, simple implementations have been created to **encrypt** and **validate authentication tokens** (no third party dependencies are used for this). If you use this repository as an example, it is recommended that you modify these implementations using libraries or your own implementations (`src/core/config` folder).

### Authentication

### POST `/api/v1/auth/register`

Registers a new user in memory database.

#### Request Body

```json
{
	"name": "string",
	"email": "string",
	"password": "string"
}
```

#### Response Codes

- `400 Bad Request`: Returned if the request body is invalid.
- `201 Created`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"user": {
			"id": "string",
			"name": "string",
			"email": "string",
			"emailVerified": "boolean",
			"role": "string[]"
		},
		"token": "string"
	}
}
```

### POST `/api/v1/auth/login`

Logs in a user.

#### Request Body

```json
{
	"email": "string",
	"password": "string"
}
```

#### Response Codes

- `400 Bad Request`: Returned if the request body is invalid.
- `200 OK`: Returned if the request is successful.

#### Response

```json
{
	"data": {
		"user": {
			"id": "string",
			"name": "string",
			"email": "string",
			"emailVerified": "boolean",
			"role": "string[]"
		},
		"token": "string"
	}
}
```

---


---

## Project Structure

```bash
node-template-server/
│
├── dist/
├── node_modules/
├── src/
│   ├── core/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── errors/
│   │   └── types/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── domain/
│   │   │   │   ├── datasources/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │
│   │   │   ├── infrastructure/
│   │   │   │   ├── local.datasource.impl.ts
│   │   │   │   └── repository.impl.ts
│   │   │   │
│   │   │   └── presentation/
│   │   │       ├── controller.ts
│   │   │       └── routes.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── domain/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   └── presentation/
│   │   │       └── middlewares/
│   │   │
│   │   ├── trip/
│   │   │   ├── domain/
│   │   │   │   ├── datasources/
│   │   │   │   ├── dtos/
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │
│   │   │   ├── infrastructure/
│   │   │   │   ├── local.datasource.impl.ts
│   │   │   │   └── repository.impl.ts
│   │   │   │
│   │   │   └── presentation/
│   │   │       ├── controller.ts
│   │   │       └── routes.ts
│   │   └── ...
│   ├── app.test.ts
│   ├── app.ts
│   ├── routes.ts
│   ├── server.ts
│   └── testServer.ts
├── .env
├── .env.template
├── .env.test
├── ...
├── package.json
└── ...
```

### Domain — Entities

Entities are objects that represent fundamental concepts of the application domain. These objects encapsulate the essential state and behavior of key elements within the system.

### Domain — Repositories

Repositories are a data access abstraction that act as an interface between the domain layer and the infrastructure layer. Their primary purpose is to encapsulate the logic related to data storage and retrieval, providing an abstraction layer that allows the domain layer to work with entities without worrying about the specific details of how data is stored or retrieved.

### Domain — Use cases

Use cases represent the specific actions or functionalities that can be performed by a user or a system within the application. These use cases encapsulate the business logic in a way that is independent of infrastructure and implementation details, making them portable and reusable in different contexts.

### Domain — Data sources

Data sources are interfaces or abstractions that represent the data source from which the data needed for the application is obtained. These data sources can be databases, web services, file systems, or any other form of data storage. The use of data sources helps decouple business logic from the specific details of the data source. This means that the domain layer can work with data sources through generic interfaces without knowing the specific implementation details, making it easy to exchange or update the data source without affecting the application logic.

### Domain — DTOs

DTOs (Data Transfer Objects) are objects that are used to transfer data between different layers of the application, especially between the presentation layer and the domain or infrastructure layer. DTOs encapsulate related data and transport it from one context to another without exposing the underlying business logic. The main function of DTOs is to represent information in a structured and coherent way, facilitating its transport through the application.

### Infrastructure — Repository Implementation

The repository implementation at the infrastructure layer is responsible for providing a concrete implementation of the methods defined in the repository interface at the domain layer. This implementation is responsible for interacting with the actual data source, such as a database, an external service or any other data persistence mechanism.

### Infrastructure — Data source Implementation

The data source implementation in the infrastructure layer is responsible for providing a concrete implementation of the methods defined in the data source interface in the domain layer. This component is responsible for interacting directly with the actual data source, such as a database, a web service or any other data storage medium.

### Presentation— Controller

Controllers are presentation layer components that act as entry points for client requests in an application. These controllers are responsible for receiving HTTP requests, processing them and directing them to the corresponding business logic in the domain layer.

### Presentation — Routes

Routes are presentation layer components that are responsible for defining routes and handling incoming HTTP requests to an application. These routes are used to map HTTP requests to the corresponding controllers and establish the API structure or routing of the application. It is also where our data source and our repository are initialized, the same that is necessary for our controller.

---

Implementing a REST API using Node.js, Express and following good development practices and Clean Architecture provides a solid foundation for developing modern and scalable web applications. By taking a modular approach and focusing on separation of concerns, developers can achieve a clean, maintainable architecture that encourages flexibility and continuous system evolution.

The application of Clean Architecture allows you to maintain a clear separation between the different layers of the application, such as the domain layer, the infrastructure layer, and the presentation layer, making it easier to understand and maintain the code over time. Additionally, adopting good development practices such as using middlewares for intermediate tasks, validating input data, and proper error handling contributes to creating a robust and secure API.

---

## Stay in touch

- Website - [www.bryan-aguilar.com](https://www.bryan-aguilar.com/)
- Medium - [baguilar6174](https://baguilar6174.medium.com/)
- LinkeIn - [baguilar6174](https://www.linkedin.com/in/baguilar6174)
