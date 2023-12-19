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