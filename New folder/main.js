console.log('This is f1.js')

{
    let form = document.getElementById('submit-btn');
//console.log(form);
async function handleSubmit(e){
    e.preventDefault();
    let inputSeason = e.target.seasonName.value;
    let inputRound = e.target.roundName.value;
    let race = await getRaceInfo(inputSeason, inputRound);
    buildRaceTable(race)
}
async function getRaceInfo(inputSeason, inputRound){
    let res = await fetch(`http://ergast.com/api/f1/${inputSeason}/${inputRound}/driverStandings.json`)
    let data = await res.json()
    return data
}
function buildRaceTable(raceObj){
    let table = document.createElement('table');
    table.className = 'table table-dark table-striped';
    let raceHead = document.createElement('thead');
    let raceHeadRow = document.createElement('tr')
    let racePosition = document.createElement('th');
    racePosition.scope = 'col'
    racePosition.innerHTML = "Position"
    raceHeadRow.append(racePosition);
    let driverName = document.createElement('th');
    driverName.scope = 'col'
    driverName.innerHTML = "Driver Name"
    raceHeadRow.append(driverName);
    let driverNationality = document.createElement('th')
    driverNationality.scope = 'col'
    driverNationality.innerHTML = "Driver Nationality"
    raceHeadRow.append(driverNationality)
    let constructor = document.createElement('th')
    constructor.scope = 'col'
    constructor.innerHTML = "Constructor"
    raceHeadRow.append(constructor);
    let points = document.createElement('th')
    points.scope= 'col'
    points.innerHTML ='Points'
    raceHeadRow.append(points)
    let tbody = document.createElement('tbody')
    raceHead.append(raceHeadRow)
    
    
    
    
    let driverstand_url = raceObj.MRData.StandingsTable.StandingsLists[0].DriverStandings
    
    console.log(driverstand_url)
    for (i in driverstand_url){
        let tableRow = document.createElement('tr')
        let position_row = document.createElement('th')
        position_row.scope = 'row'
        position_row.innerHTML = driverstand_url[i].position
        tableRow.append(position_row)
        let nameRow = document.createElement('td')
        nameRow.innerHTML = driverstand_url[i].Driver.familyName
        tableRow.append(nameRow)
        nationalityRow = document.createElement('td')
        nationalityRow.innerHTML = driverstand_url[i].Driver.nationality
        tableRow.append(nationalityRow)
        constructorRow = document.createElement('td')
        constructorRow.innerHTML = driverstand_url[i].Constructors[0].constructorId
        tableRow.append(constructorRow)
        pointsRow = document.createElement('td')
        pointsRow.innerHTML = driverstand_url[i].points
        tableRow.append(pointsRow)
        tbody.append(tableRow)
;
    }
    table.append(raceHead)
    table.append(tbody)
    document.getElementById('standingTable').append(table)
}
    form.addEventListener('submit', handleSubmit);
}
