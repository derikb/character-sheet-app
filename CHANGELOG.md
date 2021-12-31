# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.0.1](https://github.com/derikb/character-sheet-5e/compare/v3.0.0...v3.0.1) (2021-12-31)


### Bug Fixes

* **notes:** Add CharacterNote class ([3af8e98](https://github.com/derikb/character-sheet-5e/commit/3af8e981bd6da6c86e8e1071a556ffa1f164f845)), closes [#89](https://github.com/derikb/character-sheet-5e/issues/89)
* **service worker:** Fix url reference ([e0c9a47](https://github.com/derikb/character-sheet-5e/commit/e0c9a47f6796b00dc15636d0b7894c683e19ac12))
* **substr:** Replace deprecated substr with substring ([ba11491](https://github.com/derikb/character-sheet-5e/commit/ba11491e9b397cc328ae49f9b57b79bbbd4e321c))
* **weapons:** Fix data type from array to class ([cb9e06b](https://github.com/derikb/character-sheet-5e/commit/cb9e06b6827a615c99812e42950d7d5805b6a975)), closes [#89](https://github.com/derikb/character-sheet-5e/issues/89)

## [3.0.0](https://github.com/derikb/character-sheet-5e/compare/v2.3.0...v3.0.0) (2021-12-31)


### Features

* **auth:** Add sign/out via firebase ([d589de7](https://github.com/derikb/character-sheet-5e/commit/d589de7ad02d94efbaadc9dd2d417027b6622769))
* Move to build, improve dir layout ([582b325](https://github.com/derikb/character-sheet-5e/commit/582b325c08f142d8241b257ef29a7b0b3dff9e86)), closes [#87](https://github.com/derikb/character-sheet-5e/issues/87)

## [2.3.0](https://github.com/derikb/character-sheet-5e/compare/v2.2.4...v2.3.0) (2021-11-24)


### Features

* **actions:** Add confirm for loading when unsaved ([5a142bf](https://github.com/derikb/character-sheet-5e/commit/5a142bf56646729e7b19a38bd70f9f49d19804ea)), closes [#85](https://github.com/derikb/character-sheet-5e/issues/85)
* **ui:** Add confirm before new character load ([3ca9f4d](https://github.com/derikb/character-sheet-5e/commit/3ca9f4d688956b1e69617ee04f6dd61535502c27)), closes [#85](https://github.com/derikb/character-sheet-5e/issues/85)


### Bug Fixes

* **skills:** Update skill mods on attribute change ([c8beebe](https://github.com/derikb/character-sheet-5e/commit/c8beebe4386a366309f23e75da3121719478163d)), closes [#81](https://github.com/derikb/character-sheet-5e/issues/81)
* **ui:** Only trigger save on different field values ([7eee5fe](https://github.com/derikb/character-sheet-5e/commit/7eee5fe7cffb806d74862bdd044446e25e344841)), closes [#82](https://github.com/derikb/character-sheet-5e/issues/82)

### [2.2.4](https://github.com/derikb/character-sheet-5e/compare/v2.2.3...v2.2.4) (2021-10-08)


### Bug Fixes

* **npm:** Updates and cleanup of dev dependencies ([7e73940](https://github.com/derikb/character-sheet-5e/commit/7e739403826846f1320962a52e7dc5576e1768e7))

### [2.2.2](https://github.com/derikb/character-sheet-5e/compare/v2.2.1...v2.2.2) (2020-07-25)


### Bug Fixes

* **table-edit:** Fix component changing array content ([2ef7be0](https://github.com/derikb/character-sheet-5e/commit/2ef7be0b3271d8342f326a4b0b544aa2ceff12a6))

### [2.2.1](https://github.com/derikb/character-sheet-5e/compare/v2.2.0...v2.2.1) (2020-04-11)

## [2.2.0](https://github.com/derikb/character-sheet-5e/compare/v2.1.0...v2.2.0) (2020-01-26)


### Features

* **class points:** Added, also more refactoring fixes ([dcc9902](https://github.com/derikb/character-sheet-5e/commit/dcc990265793e5ed35b9e84745569923270b0bb7))
* **design:** Make skills and attributes take up less space ([2116565](https://github.com/derikb/character-sheet-5e/commit/21165658eaeb8c445ba0575d41660abd8cfe4475)), closes [#67](https://github.com/derikb/character-sheet-5e/issues/67)
* **notes:** Add party members fields ([8520ea6](https://github.com/derikb/character-sheet-5e/commit/8520ea6ddccdbd25fd2b3ddb2afcc3dd2b72ef56)), closes [#70](https://github.com/derikb/character-sheet-5e/issues/70)
* **skills:** Add expertise checkbox ([6510e8e](https://github.com/derikb/character-sheet-5e/commit/6510e8e065e2ab9ada846140edaa01e33332dd70)), closes [#66](https://github.com/derikb/character-sheet-5e/issues/66)


### Bug Fixes

* **skills:** Fix sleight of hand skill typo ([eac2245](https://github.com/derikb/character-sheet-5e/commit/eac22457d95b62fddd13c1ec40b005183daabce6)), closes [#69](https://github.com/derikb/character-sheet-5e/issues/69)
* **spell fields:** Fix for bad values in relation to spell fields ([91f22c5](https://github.com/derikb/character-sheet-5e/commit/91f22c5d96d59fb3709f6f1b41ed9bea4829e0d9))

## [2.1.0](https://github.com/derikb/character-sheet-5e/compare/v2.0.1...v2.1.0) (2020-01-07)


### Features

* Add delete undo option ([5f9ef00](https://github.com/derikb/character-sheet-5e/commit/5f9ef008ba164eda9c91a26de8b24354ed51db45)), closes [#63](https://github.com/derikb/character-sheet-5e/issues/63)
* **accessibility:** Improve modal labelling ([f43196f](https://github.com/derikb/character-sheet-5e/commit/f43196f08485ac9fff02a7cf7ea448be022feb21))
* **accessibility:** Improvements to top toolbar/menu ([e54fd42](https://github.com/derikb/character-sheet-5e/commit/e54fd42eb6a1a86f3d6c9327273616ba6a09f133)), closes [#5](https://github.com/derikb/character-sheet-5e/issues/5)
* **accessibility:** Spme labelling improvements ([39ce8ff](https://github.com/derikb/character-sheet-5e/commit/39ce8ff9dea15c3577adf95516bcfa1f29946798))
* **shortcuts:** Add toggle load menu shortcut ([8d31bc6](https://github.com/derikb/character-sheet-5e/commit/8d31bc6fd3ed2f82cda9c0bc18986e4d20cbeeb2)), closes [#60](https://github.com/derikb/character-sheet-5e/issues/60)
* **ui:** Add save button to unsaved changes alert ([3dcd2ff](https://github.com/derikb/character-sheet-5e/commit/3dcd2ff12c4b5e24105ea77bab3c96d02f380e15)), closes [#59](https://github.com/derikb/character-sheet-5e/issues/59)


### Bug Fixes

* **css:** Fix margin on lists ([f1af8d4](https://github.com/derikb/character-sheet-5e/commit/f1af8d4ef73647c99fe272b68f6cc8950d5259f2)), closes [#61](https://github.com/derikb/character-sheet-5e/issues/61)
* **dialogs:** Fix backup dialog issues and a lot of refactoring ([eee2020](https://github.com/derikb/character-sheet-5e/commit/eee2020aabb19a1827afc3870a62c538955b0c43)), closes [#62](https://github.com/derikb/character-sheet-5e/issues/62)

### [2.0.1](https://github.com/derikb/character-sheet-5e/compare/v2.0.0...v2.0.1) (2020-01-01)


### Bug Fixes

* **Alert:** cleanup debug ([4ed3745](https://github.com/derikb/character-sheet-5e/commit/4ed37451033025693a1930024ee8ab9b90ffca9a)), closes [#58](https://github.com/derikb/character-sheet-5e/issues/58)

## [2.0.0](https://github.com/derikb/character-sheet-5e/compare/v1.7.0...v2.0.0) (2020-01-01)


### Features

* Convert features and equipment to arrays/lists ([57e246b](https://github.com/derikb/character-sheet-5e/commit/57e246bb8bb79bcf3d81b77e0db419501bc020f1)), closes [#57](https://github.com/derikb/character-sheet-5e/issues/57)
* Switch weapons to table format ([15f5f5b](https://github.com/derikb/character-sheet-5e/commit/15f5f5b91257774285ce3d7fa7988ecd8616a05b)), closes [#56](https://github.com/derikb/character-sheet-5e/issues/56)
* **Character:** Add more note types and make more into arrays ([8933b27](https://github.com/derikb/character-sheet-5e/commit/8933b27e9b35dfbd59f9cdfc2d2dbd7f69010ada)), closes [#44](https://github.com/derikb/character-sheet-5e/issues/44)
* **Layout:** Add tabs to separate crunch/fluff ([3fe0a97](https://github.com/derikb/character-sheet-5e/commit/3fe0a97db7dc6eab395cb58efcd23c1b296476f3)), closes [#47](https://github.com/derikb/character-sheet-5e/issues/47)
* **ui:** Add keyboard shortcuts for save/tabs ([f2297a5](https://github.com/derikb/character-sheet-5e/commit/f2297a52139e64c098b39ff80d54f0ffd1580888)), closes [#43](https://github.com/derikb/character-sheet-5e/issues/43)


### Bug Fixes

* **tabs:** Fix internal nav for tabs ([abca492](https://github.com/derikb/character-sheet-5e/commit/abca4929eb6915b5bed48c74bb5e5a77e51d16ec))
