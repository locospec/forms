# Release Workflow Documentation

This document outlines how releases are managed in our UI component monorepo, which consists of two primary packages: **elements** and **blueprint** _(for now)_. We follow a structured release process using **Auto** to automate versioning, changelog generation, and npm package releases. This process supports alpha, beta, and stable releases, all based on the branching strategy and pull requests (PRs) with specific labels.

## Table of Contents

1. [Overview](#overview)
2. [Branching Strategy](#branching-strategy)
3. [Versioning](#versioning)
   - [Alpha Releases](#alpha-releases)
   - [Beta Releases](#beta-releases)
   - [Stable Releases](#stable-releases)
4. [Release Labels](#release-labels)
5. [Auto Workflow](#auto-workflow)
   - [Changelog Generation](#changelog-generation)
   - [Releasing to npm](#releasing-to-npm)
6. [Release Process for Elements and Blueprint](#release-process-for-elements-and-blueprint)
7. [Handling Pre-releases](#handling-pre-releases)

---

## 1. Overview

We use **Auto** for automating releases, which generates release notes, updates changelogs, bumps versions, and publishes packages to npm based on PR labels. The workflow covers pre-releases (alpha and beta) and normal semantic versioning (major, minor, patch).

### Key Features:

- Automatic changelog generation.
- Pre-releases (alpha, beta) based on specific branches.
- Stable releases based on merged pull requests.
- Semantic versioning based on PR labels.

---

## 2. Branching Strategy

We maintain different branches for pre-releases and stable releases:

- **`alpha` branch**: For alpha pre-releases. All alpha-level changes should be merged into this branch.
- **`beta` branch**: For beta pre-releases. Beta features should be more stable than alpha.
- **`main` branch**: For production-ready code. Once the code on the `beta` branch is ready, it gets merged into `main` to trigger stable releases.

### Workflow:

1. **Feature branches**: New features and fixes are developed in individual branches.
2. **Pull Requests (PRs)**: Contributions are merged into `alpha` or `beta` based on the release type.
3. **Release triggers**: The `auto` tool identifies the branch and labels to determine the type of release.

---

## 3. Versioning

The versioning strategy follows **semantic versioning** principles, but we also handle pre-releases like alpha and beta.

### Alpha Releases

- **Branch**: `alpha`
- **Versioning**: Versions are suffixed with `alpha.x` (e.g., `1.0.0-alpha.1`).
- **Purpose**: For features that are experimental and not yet ready for beta testing.

### Beta Releases

- **Branch**: `beta`
- **Versioning**: Versions are suffixed with `beta.x` (e.g., `1.0.0-beta.2`).
- **Purpose**: For features that are feature-complete but require testing before release.

### Stable Releases

- **Branch**: `main`
- **Versioning**: Follows semantic versioning (`x.y.z`), with major, minor, and patch versions. For example, `1.0.0`, `1.1.0`, or `1.0.1`.

---

## 4. Release Labels

We use the **auto-it plugin** called **conventional-commits** to determine which version of a package to release. This plugin parses conventional commit messages and uses them to automatically calculate the appropriate version number.

The plugin follows an extended version of the conventional commits specification, where the type of commit determines the release version. If a PR is not labeled, the plugin will check if any commit within the PR follows the conventional-commits format. If no conventional commit is found, the PR will be skipped.

### Version Calculation Rules:

- **fix:** Triggers a **patch** version bump (`x.x.1`)
- **feat:** Triggers a **minor** version bump (`x.1.x`)
- **BREAKING CHANGE** (in footer) or a **!** in the type: Triggers a **major** version bump (`1.x.x`)
- Any other types (e.g., docs, refactor, chore) are **skip-release** and will not trigger a new release.

### Extended Conventional Commits Behavior:

- `fix:` → **Patch** release.
- `feat:` → **Minor** release.
- `BREAKING` or `!` in the type → **Major** release.
- Commits with `BREAKING CHANGE` in the footer → **Major** release.
- All other commit types (e.g., docs, style, chore) → **No release** (skip-release).

With this setup, only conventional-commit messages that specify `fix`, `feat`, or breaking changes will trigger version bumps, while others will be ignored, ensuring that releases are only created for significant changes.

---

## 5. Auto Workflow

### Changelog Generation

When a **PR** is merged, **Auto** generates release notes based on the labels attached to the PR and updates the changelog file (`CHANGELOG.md`). It ensures that the changelog includes details about all changes, features, and bug fixes in a release.

### Releasing to npm

Auto is configured to automatically publish packages to npm after a successful PR merge. The release is published based on the branch it is merged into:

- **`alpha` branch**: Alpha releases are published with an `alpha` tag.
- **`beta` branch**: Beta releases are published with a `beta` tag.
- **`main` branch**: Stable releases are published with the `latest` tag.

---

## 6. Release Process for Elements and Blueprint

We handle releases for both **elements** and **blueprint** packages in the same way, but they are versioned independently.

### Steps for Releasing:

1. **Develop Features/Fixes**: All new features or bug fixes are developed on individual branches.
2. **Submit PR**: Submit a pull request to the appropriate branch (`alpha` or `beta`).
3. **Add Label**: Add the release label to mark PR to release a version upgrade. (`release`).
4. **Merge**: Once the PR is merged, Auto automatically:
   - Generates the changelog.
   - Bumps the version.
   - Publishes the package to npm under the correct tag.

---

## 7. Handling Pre-releases

### Alpha Releases

- **Branch**: `alpha`
- **Label**: `prerelease`
- **Version**: `x.y.z-alpha.n`
- **NPM Tag**: `alpha`

### Beta Releases

- **Branch**: `beta`
- **Label**: `prerelease`
- **Version**: `x.y.z-beta.n`
- **NPM Tag**: `beta`

---

## Conclusion

By using **Auto** and a well-defined branching strategy, we automate the release of both alpha/beta pre-releases and stable releases for our `elements` and `blueprint` packages. Each PR labeled appropriately triggers the correct version bump and npm release, allowing us to maintain a smooth and predictable release cycle.
