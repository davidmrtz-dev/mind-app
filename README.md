# Mind App

React App that enables you to perform CRUD operations on users, teams, accounts and create relations between users and teams.

[![Netlify Status](https://api.netlify.com/api/v1/badges/2c01fcbb-9811-4e0e-b86c-e1b79e4f2c46/deploy-status)](https://app.netlify.com/sites/reactts-boilerplate/deploys)


---
  - [Installation](#installation)
  - [Technologies](#technologies)
  - [Project structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)
## Installation

- Clone this project
- Run

  ```bash
  $ npm install
  ```

- Run or build project
  ```bash
  # or npm run start / npm run build
  ```
- Visit: http://localhost:8080

Login
Admin User

```
username: user@example.com
password: password
```

Standard User
```
username: user-01@example.com
password: password
```

## Technologies
  - ESlint, Prettier
  - Styled-Components, Ant-Design
  - TypeScript
  - React Context
  - Functional programming with React hooks

## Project structure

<details>
<summary>Click me to expand</summary>

```tree
.
├── public
└── src
    ├── @types
    │   ├── IAccount.ts
    │   ├── ITeam.ts
    │   ├── IUser.ts
    │   ├── IUserTeam.ts
    │   └── index.ts
    ├── App.test.tsx
    ├── App.tsx
    ├── GlobalStyle.ts
    ├── Theme.ts
    ├── api
    │   ├── Http.ts
    │   ├── HttpsStatusCode.ts
    │   └── core
    │       ├── Account.ts
    │       ├── Auth.ts
    │       ├── Team.ts
    │       ├── User.ts
    │       └── UserTeam.ts
    ├── assets
    │   ├── css
    │   └── fonts
    ├── atoms
    │   ├── ActionButton.tsx
    │   ├── InitialScreen.tsx
    │   └── LoadingMask.tsx
    ├── components
    │   ├── accounts
    │   │   ├── AccountCreate.tsx
    │   │   ├── AccountForm.tsx
    │   │   ├── AccountUpdate.tsx
    │   │   └── index.tsx
    │   ├── alert
    │   │   └── index.tsx
    │   ├── containers
    │   │   ├── ElementContainer.tsx
    │   │   ├── NavigationContainer.tsx
    │   │   └── index.tsx
    │   ├── layouts
    │   │   └── Layout.tsx
    │   ├── navigation
    │   │   └── index.tsx
    │   ├── routes
    │   │   └── PrivateRoute.tsx
    │   ├── teams
    │   │   ├── TeamCreate.tsx
    │   │   ├── TeamForm.tsx
    │   │   ├── TeamUpdate.tsx
    │   │   └── index.tsx
    │   ├── title
    │   │   └── index.tsx
    │   ├── user-teams
    │   │   ├── UserTeamCreate.tsx
    │   │   ├── UserTeamForm.tsx
    │   │   ├── UserTeamUpdate.tsx
    │   │   └── index.tsx
    │   └── users
    │       ├── UserCreate.tsx
    │       ├── UserForm.tsx
    │       ├── UserUpdate.tsx
    │       └── index.tsx
    ├── context
    │   └── AuthContext.tsx
    ├── generators
    │   └── emptyObjects
    │       ├── Accounts.ts
    │       ├── Teams.ts
    │       ├── UserTeams.ts
    │       ├── Users.ts
    │       └── index.ts
    ├── hooks
    │   ├── useAuth.ts
    │   └── useDebouncedState.ts
    ├── index.tsx
    ├── pages
    │   ├── about
    │   │   └── index.tsx
    │   ├── accounts
    │   │   ├── Account.tsx
    │   │   └── index.tsx
    │   ├── login
    │   │   └── index.tsx
    │   ├── not-found
    │   │   └── index.tsx
    │   ├── profile
    │   │   └── index.tsx
    │   ├── routes.tsx
    │   ├── teams
    │   │   ├── Team.tsx
    │   │   └── index.tsx
    │   ├── user-teams
    │   │   ├── UserTeam.tsx
    │   │   └── index.tsx
    │   └── users
    │       ├── User.tsx
    │       └── index.tsx
    ├── react-app-env.d.ts
    ├── setupTests.ts
    └── utils
        └── index.tsx
```

</details>

---

## Contributing

Contributions are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes thoroughly.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.