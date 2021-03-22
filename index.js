const form = document.querySelector('form');
const dataSource = document.querySelector('.data-source');
const dataOutput = document.querySelector('.data-output');
const executeButton = document.querySelector('.execute');
const processes = [];
let processCount = 0;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const tr = document.createElement('tr');
    processCount++;

    const del = document.createElement('button');
    del.append('Delete');
    del.setAttribute('class', 'btn btn-danger')

    renderRow(tr,{
        processName: processCount,
        arrivalTime: form.arrivalTime.value,
        burstTime: form.burstTime.value,
        delete: del
    })
    dataSource.append(tr);
    processes.push({
        processName: processCount,
        arrivalTime: parseInt(form.arrivalTime.value),
        burstTime: parseInt(form.burstTime.value),
        completionTime: 0
    })
});

dataSource.addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON') {
        event.target.parentNode.parentNode.remove();
    }

    const processName = parseInt(event.target.parentNode.parentNode.firstChild.textContent);  
    for (let i = 0; i < processes.length; i++) {
        if (processes[i].processName === processName) {
            processes.splice(i, 1);
            break;
        }
    }
})

executeButton.addEventListener('click', () => {
    if (processes.length === 0) {
        alert("No Process to execute!");
        return;
    }
    const list = fcfsAlgo(processes);
    dataOutput.innerHTML = '';
    renderTable(dataOutput, list.fcfsResult);
    const trSum = document.createElement('tr');
    renderRow(trSum, {
        title: 'SUM', 
        turnAroundTimeSum: list.summary.turnAroundTimeSum,
        waitingTimeSum: list.summary.waitingTimeSum,
        burstTimeSum: list.summary.burstTimeSum
    })
    dataOutput.append(trSum);
    const trAvg = document.createElement('tr');
    renderRow(trAvg, {
        title: 'AVG',
        turnAroundTimeAvg: list.summary.turnAroundTimeAvg,
        waitingTimeAvg: list.summary.waitingTimeAvg,
        burstTimeAvg: list.summary.burstTimeAvg
    })
    dataOutput.append(trAvg);
});


function renderTable(table, data) {
    data.forEach(d => {
        const tr = document.createElement('tr');
        renderRow(tr, d);
        table.append(tr);
    });
}

function renderRow(tr, object){
    for (const key in object) {
        const td = document.createElement('td');
        td.append(object[key]);
        tr.append(td);
    }
}