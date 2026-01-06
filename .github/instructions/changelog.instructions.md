---
applyTo: '**/CHANGELOG.md,**/package.json'
---

# NestJS Git CLI Changelog Guide

**IMPORTANT**: Always use Git CLI commands to analyze changes before creating changelog entries. Create version tags to facilitate rollbacks in case of errors.

## Chat Behavior

**DO NOT EXPLAIN** what you are going to do. **EXECUTE** the Git CLI commands **DIRECTLY** and create the changelog entries. Upon completion, **ONLY** provide a brief explanation stating whether the release is MAJOR, MINOR, or PATCH and why.

## Mandatory Workflow

### 1. Change Analysis with Git CLI

Before creating any changelog entry, **ALWAYS** execute these commands to understand the context:

```bash
# Review commits since the last version/date
git log --oneline --since="YYYY-MM-DD" --until="YYYY-MM-DD"

# View detailed diffs since the last tag
git diff $(git describe --tags --abbrev=0)..HEAD

# List modified files to identify affected Modules/Services
git diff --name-only $(git describe --tags --abbrev=0)..HEAD

# View commits by author (optional)
git log --pretty=format:"%h - %an, %ar : %s" --since="YYYY-MM-DD"

```

### 2. Version Update

Update the version in `package.json` following [Semantic Versioning](https://semver.org/):

```yaml
version: X.Y.Z+build_number

```

### 3. Version Tag Creation

**MANDATORY**: After updating the changelog, create a tag for potential rollbacks:

```bash
# Create an annotated tag with a message
git tag -a vX.Y.Z -m "Release version X.Y.Z - [Short description]"

# Push the tag to the remote repository
git push origin vX.Y.Z

# Verify that the tag was created correctly
git tag -l | grep vX.Y.Z

```

### 4. Rollback Commands (Emergencies Only)

In case of errors, use these commands to revert:

```bash
# View all available tags
git tag -l

# Revert to the previous version
git checkout vX.Y.Z-previous

# Create a hotfix branch from the previous tag
git checkout -b hotfix/vX.Y.Z-fix vX.Y.Z-previous

```

## Changelog Format

Changes must be recorded in `changelog.md` following [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) guidelines, **based exclusively on the Git CLI analysis**.

### Version Format

Versions follow the `MAJOR.MINOR.PATCH+BUILD` format where:

* **MAJOR**: Incompatible API changes (e.g., changing DTO validation rules strictly, altering API route signatures).
* **MINOR**: Functionality added in a backward-compatible manner (e.g., new Modules, new Endpoints).
* **PATCH**: Backward-compatible bug fixes (e.g., fixing Service logic, patching a Guard).
* **BUILD**: Incremental build number.

### Mandatory Sections

**ALL releases MUST include these sections** (use "None" if not applicable):

* **Added**: For new features (Modules, Endpoints, Providers).
* **Changed**: For changes in existing functionality (Service logic, Middleware).
* **Removed**: For deprecated features removed in this release.
* **Fixed**: For any bug fixes.

### Entry Format with Git Reference

```markdown
## Version X.Y.Z+BUILD [YYYY-MM-DD]

> **Included Commits**: `git log --oneline vX.Y.Z-previous..vX.Y.Z`
> **Tag**: `vX.Y.Z`

### Added

- Module `AuthModule` (Commit: `abc1234`)
- Endpoint `GET /users/profile` (Commit: `abc1234`)

### Changed

- Guard `RolesGuard` logic (Commit: `def5678`)

### Removed

- None

### Fixed

- Service `UsersService` method `findOne` (Commit: `ghi9012`)

```

### Hierarchical Format for NestJS (Grouping)

When multiple changes affect the same **Module** or **Domain**, group them hierarchically:

```markdown
### Added

- **UsersModule** (Commits: `abc1234`, `def5678`):
  - `UsersController`: Added `POST /users/invite` endpoint
  - `UsersService`: Implemented `inviteUser` logic with email notification
  - `CreateUserDto`: Added validation for `referralCode`
- **Infrastructure** (Commit: `ghi9012`):
  - `DatabaseModule`: Added TypeORM migration for user roles
  - `RedisService`: Added generic caching method
- **Shared** (Commit: `jkl3456`):
  - `JwtAuthGuard`: Implemented token blacklist check

### Changed

- **AuthModule** (Commit: `mno7890`):
  - `AuthService`: Updated `login` to return refresh tokens
  - `JwtStrategy`: Changed payload validation logic

```

**Rules for NestJS formatting:**

1. **Grouping**: Always group by the parent **Module** (e.g., `AuthModule`, `OrdersModule`) or architectural layer (e.g., `Infrastructure`, `Shared`, `Core`).
2. **Terminology**: Use precise NestJS terms: `Controller`, `Service`, `Guard`, `Interceptor`, `Pipe`, `DTO`, `Entity`, `Decorator`.
3. **Backticks**: Use backticks for class names (`UsersService`) and method names (`findAll`).
4. **Traceability**: Include commit hashes in parentheses at the Module/Group level if possible.

### Best Practices

1. **DO NOT EXPLAIN** the process - execute commands directly.
2. **ALWAYS** analyze changes with Git CLI before writing.
3. **MANDATORY** to create the version tag after the changelog.
4. Keep one record per version.
5. Most recent entries go at the top.
6. Always include the release date in [YYYY-MM-DD] format.
7. Reference specific commits for traceability.
8. **Group by NestJS Modules** to keep the log clean and architectural.
9. Be specific and concise.
10. Verify the tag was created correctly before finishing.
11. **AT THE END**, briefly explain if it is MAJOR, MINOR, or PATCH.

### Final Verification Commands

Before finishing the process, execute:

```bash
# Verify the tag exists
git tag -l | grep vX.Y.Z

# Verify the tag points to the correct commit
git show vX.Y.Z

# Verify the tag is in the remote repository
git ls-remote --tags origin | grep vX.Y.Z

```

### Changelog Commit Template

```bash
git add changelog.md package.json
git commit -m "chore(release): update changelog and version to vX.Y.Z

- Updated changelog with changes from $(git describe --tags --abbrev=0)..HEAD
- Bumped version to X.Y.Z in package.json
- Created tag vX.Y.Z for rollback purposes"

```

### Final Response Format

Upon completing the entire process, provide **ONLY** this information:

```
✅ Changelog updated to version X.Y.Z
📋 Type: [MAJOR/MINOR/PATCH] - [Brief reason for version type]
🏷️ Tag vX.Y.Z created and verified

```

**Example of final response:**

```
✅ Changelog updated to version 2.1.0
📋 Type: MINOR - Added UsersModule and new endpoints in AuthController
🏷️ Tag v2.1.0 created and verified

```
