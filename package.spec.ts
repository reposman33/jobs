/**
 * Tests for package.json and package-lock.json dependency version updates.
 * Validates that security-related dependency bumps in this PR are correctly reflected.
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname);

interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

interface LockPackageEntry {
  version: string;
  resolved?: string;
  integrity?: string;
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}

interface PackageLockJson {
  lockfileVersion: number;
  packages: Record<string, LockPackageEntry>;
}

function readPackageJson(): PackageJson {
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
}

function readPackageLockJson(): PackageLockJson {
  return JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package-lock.json'), 'utf-8')
  );
}

function lockEntry(
  lock: PackageLockJson,
  pkgPath: string
): LockPackageEntry | undefined {
  return lock.packages[pkgPath];
}

describe('package.json dependency version updates', () => {
  let pkg: PackageJson;

  beforeAll(() => {
    pkg = readPackageJson();
  });

  it('should have @angular-devkit/build-angular at version 20.3.25', () => {
    expect(pkg.dependencies?.['@angular-devkit/build-angular']).toBe('20.3.25');
  });

  it('should not reference the old vulnerable @angular-devkit/build-angular version 20.3.18', () => {
    const dep = pkg.dependencies?.['@angular-devkit/build-angular'] ?? '';
    expect(dep).not.toContain('20.3.18');
  });

  it('should have @angular-devkit/build-angular pinned to an exact version (no range prefix)', () => {
    const dep = pkg.dependencies?.['@angular-devkit/build-angular'] ?? '';
    // Exact pin: no leading ^, ~, >, <, =, or *
    expect(dep).toMatch(/^\d+\.\d+\.\d+$/);
  });
});

describe('package-lock.json resolved version consistency', () => {
  let lock: PackageLockJson;

  beforeAll(() => {
    lock = readPackageLockJson();
  });

  describe('@angular-devkit/build-angular', () => {
    it('should resolve to version 20.3.25', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.version).toBe('20.3.25');
    });

    it('should not reference old version 20.3.18 in its resolved URL', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.resolved).not.toContain('20.3.18');
    });

    it('should reference version 20.3.25 in its resolved URL', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.resolved).toContain('20.3.25');
    });

    it('should depend on @angular-devkit/architect at 0.2003.25', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['@angular-devkit/architect']).toBe(
        '0.2003.25'
      );
    });

    it('should depend on @angular-devkit/build-webpack at 0.2003.25', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['@angular-devkit/build-webpack']).toBe(
        '0.2003.25'
      );
    });

    it('should depend on @angular-devkit/core at 20.3.25', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['@angular-devkit/core']).toBe('20.3.25');
    });

    it('should depend on @angular/build at 20.3.25', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['@angular/build']).toBe('20.3.25');
    });

    it('should depend on @ngtools/webpack at 20.3.25', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['@ngtools/webpack']).toBe('20.3.25');
    });

    it('should require esbuild optional dependency at 0.28.0', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.optionalDependencies?.['esbuild']).toBe('0.28.0');
    });

    it('should depend on copy-webpack-plugin at 14.0.0', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['copy-webpack-plugin']).toBe('14.0.0');
    });

    it('should depend on esbuild-wasm at 0.28.0', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['esbuild-wasm']).toBe('0.28.0');
    });

    it('should depend on picomatch at 4.0.4', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['picomatch']).toBe('4.0.4');
    });

    it('should depend on postcss at 8.5.12', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-angular');
      expect(entry?.dependencies?.['postcss']).toBe('8.5.12');
    });
  });

  describe('@angular-devkit/build-webpack nested', () => {
    it('should resolve to version 0.2003.25', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-webpack');
      expect(entry?.version).toBe('0.2003.25');
    });

    it('should not reference old version 0.2003.18 in resolved URL', () => {
      const entry = lockEntry(lock, 'node_modules/@angular-devkit/build-webpack');
      expect(entry?.resolved).not.toContain('0.2003.18');
    });
  });

  describe('@ngtools/webpack', () => {
    it('should resolve to version 20.3.25', () => {
      const entry = lockEntry(lock, 'node_modules/@ngtools/webpack');
      expect(entry?.version).toBe('20.3.25');
    });

    it('should not reference old version 20.3.18 in resolved URL', () => {
      const entry = lockEntry(lock, 'node_modules/@ngtools/webpack');
      expect(entry?.resolved).not.toContain('20.3.18');
    });
  });

  describe('copy-webpack-plugin', () => {
    it('should resolve to version 14.0.0', () => {
      const entry = lockEntry(lock, 'node_modules/copy-webpack-plugin');
      expect(entry?.version).toBe('14.0.0');
    });

    it('should not reference old version 13.0.1 in resolved URL', () => {
      const entry = lockEntry(lock, 'node_modules/copy-webpack-plugin');
      expect(entry?.resolved).not.toContain('13.0.1');
    });

    it('should depend on serialize-javascript ^7.0.3 or higher', () => {
      const entry = lockEntry(lock, 'node_modules/copy-webpack-plugin');
      const serializeJsDep = entry?.dependencies?.['serialize-javascript'] ?? '';
      // Must be 7.x series, not the old 6.x
      expect(serializeJsDep).toMatch(/^\^?7\./);
    });
  });

  describe('copy-webpack-plugin/serialize-javascript', () => {
    it('should include a nested serialize-javascript at 7.x', () => {
      const entry = lockEntry(
        lock,
        'node_modules/copy-webpack-plugin/node_modules/serialize-javascript'
      );
      expect(entry?.version).toMatch(/^7\./);
    });

    it('should not use old serialize-javascript 6.x', () => {
      const entry = lockEntry(
        lock,
        'node_modules/copy-webpack-plugin/node_modules/serialize-javascript'
      );
      expect(entry?.version).not.toMatch(/^6\./);
    });
  });

  describe('postcss (top-level)', () => {
    it('should resolve to version 8.5.12', () => {
      const entry = lockEntry(lock, 'node_modules/postcss');
      expect(entry?.version).toBe('8.5.12');
    });

    it('should not reference old version 8.5.6 in resolved URL', () => {
      const entry = lockEntry(lock, 'node_modules/postcss');
      expect(entry?.resolved).not.toContain('8.5.6');
    });
  });

  describe('esbuild-wasm', () => {
    it('should resolve to version 0.28.0', () => {
      const entry = lockEntry(lock, 'node_modules/esbuild-wasm');
      expect(entry?.version).toBe('0.28.0');
    });

    it('should not reference old version 0.25.9 in resolved URL', () => {
      const entry = lockEntry(lock, 'node_modules/esbuild-wasm');
      expect(entry?.resolved).not.toContain('0.25.9');
    });
  });

  describe('build-angular nested esbuild', () => {
    it('should resolve to version 0.28.0', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/esbuild'
      );
      expect(entry?.version).toBe('0.28.0');
    });

    it('should not reference old esbuild version 0.25.9 in resolved URL', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/esbuild'
      );
      expect(entry?.resolved).not.toContain('0.25.9');
    });

    it('should include all platform optional dependencies at 0.28.0', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/esbuild'
      );
      const optDeps = entry?.optionalDependencies ?? {};
      const platforms = [
        '@esbuild/linux-x64',
        '@esbuild/darwin-arm64',
        '@esbuild/win32-x64',
        '@esbuild/android-arm64',
      ];
      platforms.forEach((platform) => {
        expect(optDeps[platform]).toBe('0.28.0');
      });
    });
  });

  describe('build-angular nested picomatch', () => {
    it('should resolve to version 4.0.4', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/picomatch'
      );
      expect(entry?.version).toBe('4.0.4');
    });

    it('should not reference old picomatch version 4.0.3 in resolved URL', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/picomatch'
      );
      expect(entry?.resolved).not.toContain('4.0.3');
    });
  });

  describe('build-angular nested @angular-devkit/architect', () => {
    it('should resolve to version 0.2003.25', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular-devkit/architect'
      );
      expect(entry?.version).toBe('0.2003.25');
    });

    it('should not reference old version 0.2003.18 in resolved URL', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular-devkit/architect'
      );
      expect(entry?.resolved).not.toContain('0.2003.18');
    });
  });

  describe('build-angular nested @angular-devkit/core', () => {
    it('should resolve to version 20.3.25', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular-devkit/core'
      );
      expect(entry?.version).toBe('20.3.25');
    });

    it('should not reference old version 20.3.18 in resolved URL', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular-devkit/core'
      );
      expect(entry?.resolved).not.toContain('20.3.18');
    });

    it('should depend on picomatch at 4.0.4', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular-devkit/core'
      );
      expect(entry?.dependencies?.['picomatch']).toBe('4.0.4');
    });
  });

  describe('build-angular nested @angular/build', () => {
    it('should resolve to version 20.3.25', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular/build'
      );
      expect(entry?.version).toBe('20.3.25');
    });

    it('should not reference old version 20.3.18 in resolved URL', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular/build'
      );
      expect(entry?.resolved).not.toContain('20.3.18');
    });

    it('should depend on esbuild at 0.28.0', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular/build'
      );
      expect(entry?.dependencies?.['esbuild']).toBe('0.28.0');
    });

    it('should depend on picomatch at 4.0.4', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular/build'
      );
      expect(entry?.dependencies?.['picomatch']).toBe('4.0.4');
    });

    it('should depend on vite at 7.3.2', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular/build'
      );
      expect(entry?.dependencies?.['vite']).toBe('7.3.2');
    });
  });

  describe('build-angular nested vite', () => {
    it('should resolve to version 7.3.2', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular/build/node_modules/vite'
      );
      expect(entry?.version).toBe('7.3.2');
    });

    it('should not reference old version 7.1.11 in resolved URL', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular/build/node_modules/vite'
      );
      expect(entry?.resolved).not.toContain('7.1.11');
    });

    it('should depend on esbuild ^0.27.0 (not old ^0.25.0)', () => {
      const entry = lockEntry(
        lock,
        'node_modules/@angular-devkit/build-angular/node_modules/@angular/build/node_modules/vite'
      );
      const esbuildDep = entry?.dependencies?.['esbuild'] ?? '';
      expect(esbuildDep).toMatch(/^\^?0\.2[7-9]|^\^?0\.[3-9]/);
      expect(esbuildDep).not.toContain('0.25');
    });
  });

  describe('package.json and package-lock.json consistency', () => {
    it('lock file root entry should reference @angular-devkit/build-angular ^20.3.25', () => {
      const rootEntry = lock.packages[''];
      const dep = rootEntry?.dependencies?.['@angular-devkit/build-angular'] ?? '';
      expect(dep).toContain('20.3.25');
    });

    it('lock file version for @angular-devkit/build-angular should match package.json major.minor.patch', () => {
      const pkg2 = readPackageJson();
      const pkgVersion = pkg2.dependencies?.['@angular-devkit/build-angular'] ?? '';
      const lockVersion =
        lockEntry(lock, 'node_modules/@angular-devkit/build-angular')?.version ??
        '';
      // Both should be 20.3.25
      expect(lockVersion).toBe(pkgVersion);
    });

    it('lock file should be version 3 (modern lockfile format)', () => {
      expect(lock.lockfileVersion).toBe(3);
    });
  });

  describe('no old vulnerable versions remaining in primary package paths', () => {
    const oldVersionChecks: Array<[string, string, string]> = [
      [
        'node_modules/@angular-devkit/build-angular',
        '20.3.18',
        '@angular-devkit/build-angular',
      ],
      [
        'node_modules/@angular-devkit/build-webpack',
        '0.2003.18',
        '@angular-devkit/build-webpack',
      ],
      ['node_modules/@ngtools/webpack', '20.3.18', '@ngtools/webpack'],
      ['node_modules/copy-webpack-plugin', '13.0.1', 'copy-webpack-plugin'],
      ['node_modules/postcss', '8.5.6', 'postcss'],
      ['node_modules/esbuild-wasm', '0.25.9', 'esbuild-wasm'],
    ];

    oldVersionChecks.forEach(([pkgPath, oldVersion, pkgName]) => {
      it(`should not have ${pkgName} at old version ${oldVersion}`, () => {
        const entry = lockEntry(lock, pkgPath);
        expect(entry?.version).not.toBe(oldVersion);
      });
    });
  });
});
