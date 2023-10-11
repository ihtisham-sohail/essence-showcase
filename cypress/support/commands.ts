// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('implicitLoginFlow', () => {
  cy.log('using google SSO to login');
  cy.request({
    method: 'POST',
    url: Cypress.env('authUrl'),
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('clientId'),
      client_secret: Cypress.env('clientSecret'),
      refresh_token: Cypress.env('refreshToken'),
    },
  }).then((body) => {
    const { access_token, id_token, scope } = body.body;
    let base64Url = id_token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const dateTime: number = Date.now();
    const hour = 60 * 60 * 1000;
    window.sessionStorage.setItem('expires_at', dateTime + hour + '');
    window.sessionStorage.setItem('id_token_expires_at', dateTime + hour + '');
    window.sessionStorage.setItem('access_token_stored_at', dateTime + '');
    window.sessionStorage.setItem('id_token_stored_at', dateTime + '');
    window.sessionStorage.setItem('id_token', id_token);
    window.sessionStorage.setItem('access_token', access_token);
    window.sessionStorage.setItem('id_token_claims_obj', jsonPayload);
    window.sessionStorage.setItem('session_state', 'undefined');
    window.sessionStorage.setItem(
      'granted_scopes',
      JSON.stringify(scope.split(' '))
    );
    cy.visit('/');
  });
});
//other commands here
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
