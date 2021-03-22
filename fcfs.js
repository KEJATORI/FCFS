const fcfsAlgo = (processes) => {
    processes = sortByArrivalTime(processes);
    let fcfsResult = [];
    let summary = {
        waitingTimeSum: 0,
        turnAroundTimeSum: 0,
        waitingTimeAvg: 0,
        turnAroundTimeAvg: 0,
        burstTimeSum: 0,
        burstTimeAvg: 0
    };
    let currentTime = 0;
    currentTime = processes[0].arrivalTime;

    processes.forEach((process) => {
        process.completionTime = currentTime + process.burstTime;
        currentTime = process.completionTime;
        const turnAroundTime = process.completionTime - process.arrivalTime;
        const waitingTime = turnAroundTime - process.burstTime;
        
        fcfsResult.push({
            processName: process.processName,
            turnAroundTime,
            waitingTime,
            burstTime : process.burstTime
        });

        summary.waitingTimeSum += waitingTime;
        summary.turnAroundTimeSum += turnAroundTime;
        summary.burstTimeSum += process.burstTime;
    });
    
    summary.turnAroundTimeAvg = summary.turnAroundTimeSum / fcfsResult.length;
    summary.waitingTimeAvg = summary.waitingTimeSum / fcfsResult.length;
    summary.burstTimeAvg = summary.burstTimeSum / fcfsResult.length;
    return {
        fcfsResult,
        summary
    };
}

const sortByArrivalTime = (processes) => {
    let swapp;
    let n = processes.length - 1;

    do {
        swapp = false;
        for (let i = 0; i < n; i++)
        {
            if (processes[i].arrivalTime > processes[i + 1].arrivalTime)
            {
               let temp = processes[i];
               processes[i] = processes[i + 1];
               processes[i + 1] = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);

    return processes; 
}