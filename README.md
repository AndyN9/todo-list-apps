# todo-list-apps
Sooo many todos; yet sooo little time. A collection of the same todo list app re-created using different technologies (JavaScript frameworks). Inspired by [Web Dev Simplified](https://www.youtube.com/watch?v=jBmrduvKl5w) and [TodoMVC](https://todomvc.com/).

## Spec
App will:
 - load initial todo tasks from `localStorage`
 - render todo tasks to a unordered list as list items
 - user can add to todo task to list via
   - input field and 'Add' submit button
 - user can remove specific todo task from list via
   - respective todo task list item 'Remove' anchor link

## Current Implementations
[Vite](https://vitejs.dev/) is used in all implementation as the frontend bundler.

- Vanilla
- Typescript
- React
- Typescript & React

### Installation
```
// change directory to an implementation
cd [implementation]

// local development
npm install
npm run dev

// local build and preview
npm run build
npm run preview
```

### TODOs
- [ ] Add [Vitest](https://vitest.dev/) for unit testing
- [ ] Add [Playwright](https://playwright.dev/) for e2e testing
- [ ] Update to mono repo?

## License
[MIT](https://choosealicense.com/licenses/mit/)
