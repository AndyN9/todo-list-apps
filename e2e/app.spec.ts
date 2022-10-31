import { test, expect } from '@playwright/test';

const { IMPLEMENTATION, IMPLEMENTATION_PRETTY } = process.env;

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('app', () => {
  test('should render correct elements', async ({ page }, testInfo) => {
    const regex = new RegExp(`${IMPLEMENTATION_PRETTY} Todo List`);
    await expect(page).toHaveTitle(regex);

    expect(await page.screenshot()).toMatchSnapshot([
      `${IMPLEMENTATION}`,
      `${testInfo.title.replaceAll(' ', '-')}.png`,
    ]);
  });

  test('should add, complete, and remove todo tasks', async ({ page }) => {
    const TODO_TASK = 'Exercise for 15 minutes';

    const getCountOfTodos = () => page.$$eval('#todo-list > li', el => el.length)

    // initial todo list should be 0
    expect(await getCountOfTodos()).toBe(0);

    // add a todo task
    await page.locator('[aria-label="Enter in new todo task"]').fill(TODO_TASK);
    await page.getByText('Add').click();

    expect(await getCountOfTodos()).toBe(1);

    // persistent todo list via localStorage
    await page.reload({
      waitUntil: 'domcontentloaded'
    });
    expect(await getCountOfTodos()).toBe(1);

    // complete todo task
    const todoTask = await page.getByLabel(TODO_TASK);
    await todoTask.click();
    expect(await todoTask.isChecked()).toBe(true);

    // un-complete todo task
    await todoTask.click();
    expect(await todoTask.isChecked()).toBe(false);

    // delete a todo task
    await page.getByText('Remove').click(); // FIXME not dynamic enough for multiple todo tasks
    expect(await getCountOfTodos()).toBe(0);

    await page.reload({
      waitUntil: 'domcontentloaded'
    });
    expect(await getCountOfTodos()).toBe(0);
  });
});
