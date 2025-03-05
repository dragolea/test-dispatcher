# Changelog

All notable changes to this project will be documented in this file.

## [0.0.1] - 2025-03-05

### 🚀 Features

- New `@FieldsFormatter` decorator which can be used to format the fields based on predefined actions before reaching the callback. `@Validate` decorator can be used to validate fields based on on predefined actions.
- Added more actions to `@Validate` & `@FieldsFormatter`
- Added to formatter the following actions: 'camelCase', 'kebabCase' and 'snakeCasse'
- New decorators added : `@Req` `@Results / @Result` `@Next` `@Error` `@IsPresent` `@IsRole` `@IsColumnSupplied` `@GetQueryProperty` `@GetRequestProperty` `@SingleInstanceSwitch`
- Final refactoring for new parameter decorators.
- New @Prepend, @Res and @AfterReadSingleInstance decorators.
- New `@PrependDraft` decorator which can be used to catch the event before reaching the original event.
- Updated tests
- Added `@AfterAll`, `@BeforeAll`, `@OnAll` decorators to combine multiple decorators in only one go, new `@EntityHandler` overload decorator to support all entities
- Added new decorator `AfterReadEachInstance`
- *(decorators)* Added new events to the prepend decorator
- *(dispatcher)* Added outboxed srv, changes to CDSDipatcher affected by migration of cds to v8
- *(locale)* New `@Locale` decorator to get the locale in the parameter method
- *(validator)* `@Validate` now can behave like an `if-else` by catching the flags in the method
- *(env)* New `@Env` parameter decorator to fetch cds env directly into method parameter
- *(postinstall)* `npm install` will generate `@dispatcher` folder which contains env interfaces
- *(postinstall)* Regenerated postinstall scripts
- *(bla)* Changes
- *(eeea)* Dacffdfg
- *(change)* Dafghgfd

### 🐛 Bug Fixes

- FieldsFormatter now works as expected when parameter decorators are being used
- ExecutionAllowedForRoles renamed to ExecutionAllowedForRole
- `GetQueryType['columns']['forDelete'] was replaced by ['forSelect'] as delete does not has type columns
- Package.version increased manually due to inconsistency between NPM version and github version.
- NextEvent now returns `Function` instead of `void`
- *(config)* Fixed package.json script
- *(gitattributes)* Fix gittattributes
- *(package)* Reverted back the deleted lint-staged
- *(readme)* Fixed readme anchors
- *(tests)* Fixed tests by adding a `npm run build` before testing the new `@Env` decorator
- *(tests)* Added `npm run build` before e2e tests
- *(test)* Excluded from ignore the `@dispatcher folder` for test
- *(env)* Fixed `@Env` when project was `mbt build` for production ready
- Updated "ActionReturn" type to be compatible with the latest version of "cds-typer"
- *(postinstall)* Fixed `postinstall` on `windows 10` by using the `cross-spawn` package
- *(github-actions)* Fixed actions after were refactored
- *(dispatcher)* Fixed `CDS_DISPATCHER.ALLENTITIES` due to cds `8.6.0`
- *(request)* According to cds-types v9 `TypedRequest` was renamed to `Request`

### 🚜 Refactor

- *(util)* Deprecated SRV in favor of CDS_DISPATCHER.SRV
- *(types)* Eslint v9 changes
- *(types)* Created custom Constructable type as sap deleted it in v8
- *(env)* Moved Verifier outside of postinstall folder, added esm and cjs to compilation of env
- *(tsup)* Added `cjs` and `esm` to compilation of postinstall

### 📚 Documentation

- *(doc)* Created technical documentation
- *(doc)* Readme updated
- *(doc)* Removed from README.md unused types
- *(doc)* Readme updated

### 🧪 Testing

- *(tests)* Added allhandler.ts file to show example of usage of the overload for entityhandler
- *(tests)* Updated tests after adding new prepend events
- *(tests)* Updated tests due to cds-typer version increase
- *(cds-typer)* Updated generated cds typed entities

### ⚙️ Miscellaneous Tasks

- Version bump to 0.1.13
- Version bump to 0.1.14
- Version bump to 0.1.15
- Version bump to 0.1.16
- Version bump to 0.1.17
- Version bump to 0.1.18
- Version bump to 0.1.19
- Version bump to 0.1.20
- Version bump to 0.1.21
- Version bump to 0.1.22
- Version bump to 0.1.23
- Version bump to 0.1.24
- Version bump to 0.1.25
- Version bump to 1.0.0
- Version bump to 1.0.1
- Version bump to 1.0.2
- Version bump to 1.0.3
- Version bump to 1.0.4
- Version bump to 1.0.5
- Version bump to 1.0.6
- Added `.vscode` predefined settings for inlay TS
- Version bump to 1.1.0
- Added launch.json and settings.json for `.vscode` folder.
- Added `.devcontainer` for easy development around team.
- Version bump to 1.1.1
- Version bump to 1.1.2
- Deleted files
- Package.json changes to scrips.
- Moved files
- Updated devcontainer
- Jsdoc updated
- Version bump to 2.0.0
- Settings.json updates
- Update package-lock.json
- Version bump to 2.0.1
- Version bump to 2.0.2
- Version bump to 2.0.3
- Cleanup project
- Version bump to 2.0.4
- Version bump to 2.0.5
- Version bump to 2.0.6
- Version bump to 2.0.8
- Updated eslintignore
- Version bump to 2.0.9
- Version bump to 2.0.10
- Version bump to 2.0.11
- Changes to versions
- Version bump to 2.0.12
- Version bump to 2.0.13
- Version bump to 2.0.14
- Version bump to 2.0.15
- Version bump to 2.0.16
- Version bump to 2.0.17
- Version bump to 2.0.18
- Bump versions
- Update readme
- Version bump to 2.0.19
- Version bump to 2.0.20
- Readme updates
- Version bump to 2.0.21
- Readme updates.
- Version bump to 2.0.22
- *(config)* Commitlint added to husky and lint-staged
- *(config)* Added .md files to prettier and release now uses conventional commits
- *(doc)* Small changes to documentation of the project
- Version bump to 2.0.23
- *(build)* Added create pull request to release.yml
- Version bump to 2.0.24
- *(build)* Changes to release.yml workflow
- Version bump to 2.0.25
- *(build)* Added initial version of to 2.0.24
- *(build)* Changes to name of the release
- Version bump to 2.0.25
- *(build)* Changes to release.yml
- Version bump to 2.0.26
- *(build)* Added create PR step in release workflow
- *(build)* Updated pull-requests to write
- *(doc)* Refactored AfterAll, BeforeAll and OnAll documentation
- Version bump to 2.1.0
- *(config)* Commit lint type enum now follows cliff categories
- *(build)* Package will be deployed for testing internally on github npm
- *(config)* Fixing release workflow
- *(config)* Fixing release workflow
- *(config)* Prettier, eslint will not touch docs folder
- *(doc)* Added typedoc configs
- *(tests)* Tests updated to to increase of cds-typer version
- *(doc)* Added new typedoc/jsdoc description and changed some descriptions
- Version bump to 2.1.1
- Version bump to 2.1.2
- *(build)* Added node version 21 and restricted cds-dk to 7.9.5
- Version bump to 2.1.3
- Version bump to 2.1.4
- *(config)* Migrated to ESLint v9
- *(config)* Commitlintrc, new type enums
- *(readme)* Readme updated
- *(config)* Removed deprecated husky sh
- *(build)* Dropped node 21 and changed cds-dk to latest
- *(e2e)* Generated cds-typer new entities
- *(e2e)* Cleanup testing files
- *(unit)* Updated unit tests due to migration of v8
- *(unit)* Cds-format has been used on this file
- *(e2e)* Fixed a date in a CSV which failed when deployed
- *(e2e)* Added 2 instead of cents for the minorUnit as deployed it failed
- *(e2e)* Updated newman tests
- *(build)* Dropped ubuntu-latest on the matrix of the tests
- Version bump to 3.0.0
- *(build)* Dropped unit tests as fails on github actions
- *(build)* Commented the needs of test-e2e
- *(gitattributes)* Added gitattribute to remove the lib/docs from the stats of githubc
- *(commitlint)* Removed mandatory scopes
- *(gitattributes)* Refactored to remove from that github stats html files
- Version bump to 3.1.0
- *(actions)* Refactored github actions to split the bump and release and deployment
- Version bump to 3.1.1
- *(tests)* Updated tests
- *(github)* Added linguist-vendored to be excluded from github stats the html files
- *(readme)* Updated readme
- Version bump to 3.1.2
- *(commitlint)* Removed mandatory scopes
- *(lint)* Added `dist` and `@dispatcher` folder to lint ignore
- *(test)* Test workflow now tests the newly `@Env` decorator on all platforms (windows,mac,linux)
- *(test)* Updated tests for the newly `@Env` decorator
- *(readme)* Updated readme with the usage of the new `@Env` decorator
- *(gitignore)* Updated .gitignore
- Version bump to 3.2.0
- *(tsup)* Split compilation into 2 parts, one for postinstall one for the library
- *(dist)* PostInstall will always be pushed to dist as is needed for `npm install` command
- *(gitignore)* Excluded from gitingore the `./dist/postinstall` as is needed when `npm install`
- *(tsconfig)* Excluded form compilation the `./dist/postinstall`
- Version bump to 3.2.1
- *(readme)* Readme updates
- *(eslint)* Added eslint to ignore
- *(gitignore)* Removed dispatcher form gitignore
- Version bump to 3.2.2
- *(tsdoc)* Removed unnecesary tsdoc from some properties and rearanged a bit some tsdocs
- *(readme)* Fixed the shield of the `last commit` by changing to `dev` branch
- Version bump to 3.2.3
- *(deployment,release)* Refactored github actions for better visibility by moving some steps
- *(readme)* Small update to `last commit` shield
- *(test)* Extending tests for windows
- *(github-action)* Fixed the release github action after refactoring
- *(release)* Fixed create pull request of the release workflow
- *(release)* Updated CHANGELOG.md and bump version increased
- *(readme)* Small changes to README.md
- *(readme)* Changed `build` shield to deployment.yml
- *(release)* Updated CHANGELOG.md and bump version increased
- *(readme)* Fixed deployment badge
- *(actions)* Renamed enforce-label and tests github actions for better visibility
- *(release)* Updated CHANGELOG.md and bump version increased
- *(release)* Updated CHANGELOG.md and bump version increased
- *(workflows)* Small modifications to release and tests
- *(test)* Updates tests after renaming `TypedRequest` to `Request`
- *(readme)* Changed `TypedRequest` to only `Request`
- *(workflow)* Commented unit testing
- *(release)* Updated CHANGELOG.md and bump version increased
- *(readme)* Updated
- *(release)* Updated CHANGELOG.md and bump version increased
- *(build)* Eeadcax
- *(build)* Eeee
- *(eee)* Dasdghf

### Chore

- Updated versions

### Deleted

- Tests file

### FIX

- Middleware next now is a Promise, it must be called with await next(), initially this was not a promise and caused issue when req.reject was used.

### UPDATE

- README.md

### Update

- Next middleware now returns unknown.
- Readme
- Readme
- Readme.md

### Updated

- Package.json versions
- Tests, readme and development process updates
- Tests due to fail on github of the unit tests

### Feautre

- New decorator `ExecutionAllowedForRoles` to allow execution of methods when user roles are being used

### Upadte

- E2e tests

### Update

- Readme and workflow actions versions
- Readme.md
- Unit tests
- E2e tests for`@Validator` and `@FieldsFormatter`
- Added documentation for 2 new decorators `@FieldsFormatter` and `@Validate`
- Package.json versions increased.
- Files moved
- README
- Package.json versions
- Tests.yaml
- Unit tests
- Tests
- Readme.md
- Added connectivity sdk
- Prettierignore
- Types for GetQuery decorator
- Tests
- Tests
- README
- README
- Tests
- Clean up project and refactored `findRequest` method
- Readme
- E2e tests & unit tests
- Tests
- Readme.md
- Readme
- Unit test & e2e tests
- Readme.md for @Prepend, @Res and @AfterReadSingleInstance
- Unit test & e2e tests for `@PrependDraft`
- Package versions
- Readme.md with `@PrependDraft`
- Added to `release workflow` the publish to github npm
- Readme added tip for cds typer
- Release workflow by adding to publish github npm the organizaiton
- Release.yml

### Updated

- Tests
- .eslintrc
- Tests
- Tests

<!-- generated by git-cliff -->
