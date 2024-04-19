1. This metadata is a representation of a component's features.
2. It tells our code how to select it using Testing Library's accessiblity selectors such as ByRole and ByText.

3. In our `Callout` component, we've added a way to select the top-level container component as well as the link, text, and title.
4. It's in the same file as our component, so it's easier to maintain as components change.

5. `TextField` is another component, but it doesn't have a top-level wrapper. In this case, we only expose its features.

6. We consolidate all of our testing metadata into a generated JSON file for use with Java and Selenium.

7. Now, we're going to look at how we've integrated these selectors into our own tests.

8. Instead of using Playwright directly, Odyssey uses Storybook's built-in interaction testing.
9. In this special `Callout` example, we're wanting to check if the link exists, so we call `queryOdysseySelector` with the right information. It's even aware of which template args are available for that component.
10. This this example, we've chained off the result to grab the link element.

> // show adding the Template Args.

11. `queryOdysseySelector` does this by parsing that metadata and finding the appropriate definitions while staying type-safe.
12. When it's done processing, you'll either get an element, the features of that component (which you can chain), or both.

13. Here's what that same interaction test looks like when executed in Storybook. At this point, there's no link, so the test is failing. Now that I've added the link, it passes!

> // show failing interaction test, then show it passing.

14. Next, let's see how this metadata looks when it's consumed by Selenium in the monolith!
