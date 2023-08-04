import * as child from 'child_process';
import util from "util"

const exec = util.promisify(child.exec)

export default async function SendEmail() {
    const result = await exec("python3 src/extra/workspace/main.py")
    return result.stdout ? result.stdout : ""
}