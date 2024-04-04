import { exec } from 'child_process';

// Map to keep track of timeouts for each Docker Compose project
const dockerComposeDownTimeouts: { [key: string]: NodeJS.Timeout } = {};


function runCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve(stdout);
        });
    });
}

function runLs(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve(stdout);
        });
    });
}

export async function manageDockerCompose(projectId: string, composeFilePath: string) {
    try {

        console.log("checking path");
        
        await runLs(`ls ${composeFilePath}`);

        await runLs('pwd');

        await runLs(`cat ${composeFilePath}/docker-compose.yml`);

        console.log(`[${projectId}] Running Docker Compose...`);
       
        await runCommand(`docker-compose -f ${composeFilePath}/docker-compose.yml up --build -d`);

        
        console.log(`[${projectId}] Docker Compose setup is up and running. It will be brought down in 1 minutes.`);
        
        // Clear existing timeout for this project if set
        if (dockerComposeDownTimeouts[projectId]) {
            clearTimeout(dockerComposeDownTimeouts[projectId]);
        }

        // Set a new timeout for 1 minutes before bringing down the Docker Compose setup
        dockerComposeDownTimeouts[projectId] = setTimeout(async () => {
            console.log(`[${projectId}] Bringing down Docker Compose...`);
            await runCommand(`docker-compose -f ${composeFilePath}/docker-compose.yml down`);
            console.log(`[${projectId}] Docker Compose has been successfully brought down.`);
        }, 60000); // 60000 milliseconds = 1 minutes
    } catch (error) {
        console.error(`[${projectId}] Failed to manage Docker Compose:`, error);
    }
}