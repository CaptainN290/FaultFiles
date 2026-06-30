import type { ArchiveFile, FileSystemTree } from '../types';

// Automatically imports all .ts files under src/files/
const modules = import.meta.glob('../files/**/*.ts', { eager: true });

export function loadFileSystem(): FileSystemTree {
  const tree: FileSystemTree = {};

  for (const path in modules) {
    // Extract folder name and file name
    const match = path.match(/\.\.\/files\/([^/]+)\/(.+)\.ts$/);
    if (match) {
      const folderName = match[1];
      const fileData = (modules[path] as any).default as ArchiveFile;
      
      if (fileData) {
        if (!tree[folderName]) {
          tree[folderName] = [];
        }
        tree[folderName].push(fileData);
      }
    }
  }

  // Sort folders alphabetically. Sort files by ID.
  const sortedTree: FileSystemTree = {};
  Object.keys(tree).sort().forEach(key => {
    sortedTree[key] = tree[key].sort((a, b) => a.id.localeCompare(b.id));
  });

  return sortedTree;
}

export function getAllFiles(tree: FileSystemTree): ArchiveFile[] {
  return Object.values(tree).flat();
}
