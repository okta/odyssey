# Contributing

## Code of Conduct

Odyssey has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it.

Please read [the full text](/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Heuristics

[heuristic](<https://en.wikipedia.org/wiki/Heuristic_(computer_science)>)
/ˌhjʊ(ə)ˈrɪstɪk/

> A technique designed for solving a problem more quickly when classic methods are too slow, or for finding an approximate solution when classic methods fail to find any exact solution

- Code should be easy to reason about
- Code should be easy to delete
- Avoid early abstractions
- Avoid thinking too far into the future
- Complexity should be introduced when it is inevitable

## Questions

If you have questions about Odyssey, be sure to check out the docs where we have several examples and detailed API references that may help you solve your problem. For Oktanauts, you can also share your questions on [Slack](https://okta.slack.com/app_redirect?channel=odyssey)

## How to contribute

There are many ways to contribute to the project. Code is just one possible means of contribution.

- **Feedback.** Tell us what we're doing well or where we can improve.
- **Support.** You can answer questions on Slack or [GitHub Pull Requests](https://github.com/okta/odyssey/pulls).
- **Write.** If you come up with an interesting example, write about it. Post it online and share it with us. We'd love to see what folks in the community build with Odyssey!
- **Report.** Create new issues or [bug reports](https://github.com/okta/odyssey/issues/new/choose) so that we can make Odyssey even better.

## Working on your first Pull Request?

There are a lot of great resources on creating a good pull request. We've included a few below, but don't be shy. We appreciate all contriibutions and are happy to help those who are willing to help us!

- [How to Contribute to a Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Preparing a Pull Request

[Pull Requests](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) are always welcome, but before working on a large change, it is best to open an issue first to discuss it with maintainers.

A good PR is small, focuses on a single feature or improvement, and clearly communicates the problem it solves. Try not to include more than one issue in a single PR. It's much easier for us to review multiple small pull requests than one that is large and unwieldy.

1. Open source contributors should [fork the repository](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo).

2. Clone the fork to your local machine and add upstream remote:

```sh
git clone https://github.com/<your username>/odyssey.git
cd primitives
git remote add upstream https://github.com/okta/odyssey.git
```

3. Synchronize your local `develop` branch with the upstream remote:

```sh
git checkout develop
git pull upstream develop
```

1. Oktanauts should clone the repo directly:

```sh
git clone https://github.com/okta/odyssey.git
```

1. Install dependencies with [yarn](https://yarnpkg.com):

```sh
yarn install
```

1. Create a new branch related to your PR:

```sh
git checkout -b my-bug-fix
```

6. Make changes, then commit and push to your forked repository:

```sh
git push -u origin HEAD
```

7. Go to [the repository](https://github.com/okta/odyssey) and [make a Pull Request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

8. Oktanauts should [create an associated JIRA card](https://github.com/okta/odyssey/issues/new/choose) for any pull requests they open.

9. We will review your Pull Request and either merge it, request changes to it, or close it with an explanation.

## Working locally

The repo is managed with Yarn Workspaces.

### Development

```bash
# install dependencies
yarn install

# ensure git hooks are installed correctly
yarn postprepare

# start Storybook and see examples in the browser
yarn start
```

Make your changes and check that they resolve the problem with an example in Storybook. We also suggest adding tests to support your change, and then run `yarn test` to make sure nothing is broken.

Your commits should be formatted to include meaningful, machine parseable meta-data about your changes. Odyssey uses the [conventional-commits](https://www.conventionalcommits.org) standard for this purpose. The scope should only include the particular package changed in your commit. When operating on multiple packages, break the work into smaller commits. Run `yarn commitlint` to ensure your latest commit adheres to the convention.

Lastly, run `yarn prepare` to ensure that the build runs successfully before submitting the pull request.
