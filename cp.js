function sortObj(a, b, val) {
  return ((a.val > b.val) ? -1 : ((a.val < b.val) ? 1 : 0));
}
function sortNums(a, b) {
  return (b-a)
}

var edCats = ["Less than high school",
  "High school diploma/GED",
  "Some college",
  "Associate's",
  "Bachelor's",
  "Master's",
  "Professional",
  "Doctoral"];
var genderCats = ["Women", "Men"];
var raceCats = ["Hispanic/Latino",
  "Black/African-American",
  "Asian",
  "American Indian/Alaskan Native",
  "Multiracial",
  "Other",
  "White"];
var majorCats = ["Education",
  "Psychology and social work",
  "Arts",
  "Humanities and liberal arts",
  "Law and public policy",
  "Agriculture and natural resources",
  "Industrial arts, consumer services, and recreation",
  "Health",
  "Biology and life sciences",
  "Communications and journalism",
  "Physical sciences",
  "Social sciences",
  "Business",
  "Computers, statistics, and mathematics",
  "Architecture and engineering"];
var occCats = ["Food preparation and serving",
  "Personal care and service",
  "Building and grounds cleaning and maintenance",
  "Farming, fishing, and forestry",
  "Health support",
  "Production",
  "Office and administrative support",
  "Sales",
  "Transportation and material moving",
  "Community and social service",
  "Protective service",
  "Construction and extraction",
  "Installation, maintenance, and repair",
  "Education",
  "Arts, design, entertainment, sports, and media",
  "Business and financial operations",
  "Health practice",
  "Management",
  "Architecture and engineering",
  "Computer and mathematical"];
var indCats = ["Food services",
  "Health services",
  "Agriculture",
  "Administrative services",
  "Arts",
  "Retail trade",
  "Other services",
  "Manufacturing",
  "Educational services",
  "Financial activities and real estate",
  "Wholesale trade",
  "Construction",
  "Transportation",
  "Public administration",
  "Financial activities and real estate",
  "Information",
  "Utilities",
  "Professional and management services",
  "Mining"];
var stateCats = ["Florida",
"North Carolina",
"Arkansas",
"Tennessee",
"Georgia",
"South Carolina",
"Texas",
"Arizona",
"California",
"Mississippi",
"New Mexico",
"Alabama",
"Nevada",
"Missouri",
"Nebraska",
"Idaho",
"Oklahoma",
"Illinois",
"Kentucky",
"New York",
"Oregon",
"Kansas",
"Indiana",
"Ohio",
"Utah",
"Virginia",
"Minnesota",
"Iowa",
"Wisconsin",
"Michigan",
"Colorado",
"Pennsylvania",
"Washington",
"Rhode Island",
"Hawaii",
"New Jersey",
"Delaware",
"Maryland",
"Louisiana",
"Connecticut",
"West Virginia",
"Massachusetts",
"New Hampshire"];

function drawChart(div, xaxis, chartData, chartDataP50, chartsubtitle) {
  Highcharts.chart(div, {
    chart: {
      style: {
        // fontFamily: "'Open+Sans', 'PT+Serif+Caption'"
      },
      inverted: true
    },
    accessibility: {
        description: 'Image description: A chart that shows the range in lifetime earnings by highest educational attainment'
    },
    title: {
      text: 'Lifetime earnings by highest educational attainment'
    },
    subtitle: {
      text: chartsubtitle
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: xaxis
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        enabled: false
      }
    },
    tooltip: {
      formatter: function() {
        if (this.series.name == "Median lifetime earnings") {
          return 'Median lifetime earnings of ' + (this.x).toLowerCase() + ': ' + (this.y/1e6).toFixed(1) + 'M'
        } else if (this.series.name == "Lifetime earnings range") {
          return '25th percentile = $' +(this.point.low/1e6).toFixed(1) + 'M; ' +
            '75th percentile = $' +(this.point.high/1e6).toFixed(1) + 'M'
        }

      }
    },
    plotOptions: {
      columnrange: {
        pointWidth: 10,
        dataLabels: {
          enabled: true,
          // format: "{point.y:,..0f}"
          formatter: function () {
            return '$' +(this.y/1e6).toFixed(1) + 'M'
          }
        }
      },
      scatter: {
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      enabled: false
    },

    series: [{
      type: 'columnrange',
      name: 'Lifetime earnings range',
      data: chartData
    }, {
      type: 'scatter',
      name: 'Median lifetime earnings',
      data: chartDataP50
    }]
  });
}

function getChartObjByEd (obj) {
  var chartRawData = obj;
  var xaxis = chartRawData.map((obj,i) => {
    return obj.schlcat;
  });
  var chartData = chartRawData.map((obj, i) => {
    return {x: i,
      low: obj.p25,
      high: obj.p75
    }
  });
  var chartDataP50 = chartRawData.map((obj, i) => {
    return {x: i,
      y: obj.p50
    };
  });
  return [xaxis, chartData, chartDataP50];
}

function subChart (obj, navItem, div) {
  chartData = $.grep(obj[0].data, function(n,i) {
    return n.detail == navItem
  })
  chartData = getChartObjByEd(chartData);
  drawChart(div, chartData[0], chartData[1], chartData[2], navItem);
}
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position

$(document).ready(function() {

  // dataobj defined by collegePayoff-forWeb.js
  var educationObj = $.grep(dataobj, function(n,i) {
    return n.category == "Education"
  });
  var raceObj = $.grep(dataobj, function(n,i) {
    return n.category == "Race"
  });
  var genderObj = $.grep(dataobj, function(n,i) {
    return n.category == "Gender"
  });
  var majorObj = $.grep(dataobj, function(n,i) {
    return n.category == "Field of study"
  });
  var occObj = $.grep(dataobj, function(n,i) {
    return n.category == "Major occupations"
  });
  var indObj = $.grep(dataobj, function(n,i) {
    return n.category == "Major industry"
  });
  var statesObj = $.grep(dataobj, function(n,i) {
    return n.category == "States"
  });
  var chartData = getChartObjByEd(educationObj[0].data);
  drawChart('chart-area-0', chartData[0], chartData[1], chartData[2]);

  $("#nav-ed").on('click', function(n, i) {
    var numChild = $(".chart > div").length;
    var i, navItem, divId;
    $(".chart .col-6").remove();
    divId = 'chart-area-' + i;
    $("<div>", {class: "col-6", id: divId})
    .appendTo(".chart")
    chartData = getChartObjByEd(educationObj[0].data);
    drawChart(divId, chartData[0], chartData[1], chartData[2]);
  })

  $("#nav-sex").on('click', function() {
    var numChild = $(".chart > div").length;
    var i, navItem, divId;
    $(".chart .col-6").remove();
    for (i = 0; i < genderCats.length; i++) {
      navItem = genderCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart")
      subChart(genderObj, navItem, divId);
    }
  });

  $("#nav-race").on('click', function() {
    var numChild = $(".chart > div").length;
    var i, navItem, divId;
    $(".chart .col-6").remove();
    for (i = 0; i < raceCats.length; i++) {
      navItem = raceCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart")
      subChart(raceObj, navItem, divId);
    }
  });

  $("#nav-major").on('click', function() {
    var numChild = $(".chart > div").length;
    var i, navItem, divId;
    $(".chart .col-6").remove();
    for (i = 0; i < majorCats.length; i++) {
      navItem = majorCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart")
      subChart(majorObj, navItem, divId);
    }
  });
})
