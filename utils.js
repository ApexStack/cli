import { exec } from 'child_process';

export const isParcelInstalled = async () => {
    return new Promise((resolve, reject) => {
        exec('parcel --version', (error, stdout, stderr) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

export const removeGitRemote = async (path) => {
    return new Promise((resolve, reject) => {
        exec(`cd ${path} && git remote remove origin && rm -rf .git`, (error, stdout, stderr) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}