async function getDataset(){
    const response = await fetch('https://json.extendsclass.com/bin/f1791e212a9f',{
        method: 'GET'
      });
    return response.json();
}

const dataset = await getDataset();
console.log("dataset : ",dataset);


const myJSON = "https://json.extendsclass.com/bin/b594f88f29b1";
let jsonData = {
    "data": null
}

async function getData(url) {
    const response = await fetch(url);

    return response.json();
}


const data = await getData(myJSON);

// console.log('data in json format : ', { data });

jsonData.data = data;

// console.log('1. data in json format : ', jsonData);
// console.log('2. data in json format : ', jsonData.data);
console.log('3. data in json format : ', jsonData.data[0]);

console.log("rendering chart ......");
let arrayNeeded = [['ds','Original Value','yhat','yhat_lower','yhat_lower']];
/*
additive_terms: 767.2456327928148
additive_terms_lower: 767.2456327928148
additive_terms_upper: 767.2456327928148
ds: "1961-01-01"
index: 0
multiplicative_terms: 0
multiplicative_terms_lower: 0
multiplicative_terms_upper: 0
trend: -715.285395
trend_lower: -715.285395
trend_upper: -715.285395
yearly: 767.2456327928148
yearly_lower: 767.2456327928148
yearly_upper: 767.2456327928148
yhat: 51.96023779281484
yhat_lower: -11.818409315790671
yhat_upper: 115.05392617898865
*/
console.log("array needed :",arrayNeeded);
for(let i=0;i<110;i++){
    if(i<61){
        let index = 60-i;
        console.log("added original data for year : ",(1961+i),'\n access index:',index);
        arrayNeeded.push([1961+i,dataset[index]['Per_Capita_in_USD'],data[i]['yhat'],data[i]['yhat_lower'],data[i]['yhat_upper']]);
    }
    // console.log('......',i,'............');
    // console.log(data[i]);
    arrayNeeded.push([1961+i,null,data[i]['yhat'],data[i]['yhat_lower'],data[i]['yhat_upper']]);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
console.log("array needed : ",arrayNeeded);

function drawChart() {
  var data = google.visualization.arrayToDataTable(arrayNeeded);

  var options = {
    title: 'predictions for per capita',
    vAxis: {title: 'per capita'},
    hAxis: {title: 'years', minValue: 1960, maxValue: 2070 },
                        
    explorer: { 
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomOut:2,
        maxZoomIn: 4.0
        },
        colors: ['#981B48', '#ECA403', '#63A74A','#15A0C8'],
        theme:'material',
        series:{
            0: { pointShape: { type: 'star', sides: 3, dent: 0.7 }},
            1: { type: 'line',lineWidth: 1, pointSize: 1 },
            2: { type: 'line',lineWidth: 2, pointSize: 2 },
            3: { type: 'line' , lineWidth: 1, pointSize: 1 },
        }
    };
    /*
    series:{
            1: { type: 'line',lineWidth: 1, pointSize: 1 },
            2: { type: 'line',lineWidth: 2, pointSize: 2 },
            3: { type: 'line' , lineWidth: 1, pointSize: 1 },
    }
    */

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

  chart.draw(data, options);
}


