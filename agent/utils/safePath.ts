import path from "path";
import fs from "fs";

const PROJECT_ROOT = process.cwd(); 
const PROJECT_ROOT_RESOLVED = fs.realpathSync(PROJECT_ROOT); //removes symlinks

// Prevents directory traversal attacks by ensuring any path used is within the project root directory.

//this function checks if the path is safe to use, and it is within the security scope of ai - the project root | All the system paths, and paths which do not match the project directories will be rejected by this function
export default function safePath( inputPath: string ) {
    const candidate = path.resolve(PROJECT_ROOT, inputPath); //absolute path
    const candidateResolved = fs.realpathSync(candidate); //resolved path, removed any symlinks

    const rootCmp = normalizeForComparision(PROJECT_ROOT_RESOLVED);
    const candidateCmp = normalizeForComparision(candidateResolved);

    //add a seperator / to the rootCmp
    const rootCmpWithSep = rootCmp.endsWith(path.sep) ? rootCmp : rootCmp + path.sep;

    if (candidateCmp !== rootCmp && !candidateCmp.startsWith(rootCmpWithSep)) {
        throw new Error(`Path ${candidateResolved} is not within the security scope of ai | Error while safePath check`);
    }

    return candidateResolved;
}

//Normalizes the path because in windows we should do case-insensitive comparison
function normalizeForComparision( path: string ) {
    if( process.platform === 'win32' ) {
        return path.toLowerCase();
    }
    return path;
}