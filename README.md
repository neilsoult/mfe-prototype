

# MfePrototype

This project was generated using [Nx](https://nx.dev).

New Year, New, fresh start.

## Prototype 1

Prototype 1 consists of two remote/standalone apps and one shell app.

to run locally, in three different shells, run the following commands ( one per shell, natch )

`# npx nx run app-one:serve`
`# npx nx run app-two:serve`
`# npx nx run shell:serve`

the sites are available at `http://localhost:4201`, `http://localhost:4202`, and `http://localhost:4200`, respectively.

This prototype demonstrates that the AppComponent for the two remote/standalone apps displays the same router-outlet content (HomeComponent)
as the shell app when loading the remotes into it's own AppComponent through routing (made easier with the nav links)

## Prototype 2

Coming soon, with pug and @angular-builders/custom-webpack!
