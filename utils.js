import { exec } from 'child_process';

export async function isParcelInstalled() {
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