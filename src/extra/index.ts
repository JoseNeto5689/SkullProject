import * as child from 'child_process';

child.exec("python3 extra/workspace/main.py", (error, result) => {
    console.log(result)
})

