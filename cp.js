function sortObj(a, b, val) {
  return ((a.val > b.val) ? -1 : ((a.val < b.val) ? 1 : 0));
}
function sortNums(a, b) {
  return (b-a)
}

var edCats = ["Less than high school",
  "High school diploma/GED",
  "Some college",
  "Associate's degree",
  "Bachelor's degree",
  "Master's degree",
  "Doctoral degree",
  "Professional degree"];
var edCats4 = ["Bachelor's degree",
  "Master's degree",
  "Doctoral degree",
  "Professional degree"];
var genderCats = ["Women", "Men"];
 var raceCats = ["Hispanic/Latino",
  "Black/African-American",
  "Asian",
  "American Indian/Alaskan Native",
  "Native Hawaiian/Pacific Islander",
  "Multiracial",
  "Other",
  "White"];
  var majorCats = ["Agriculture and natural resources",
    "Architecture and engineering",
    "Arts",
    "Biology and life sciences",
    "Business",
    "Communications and journalism",
    "Computers, statistics, and mathematics",
    "Education",
    "Health",
    "Humanities and liberal arts",
    "Industrial arts, consumer services, and recreation",
    "Law and public policy",
    "Physical sciences",
    "Psychology and social work",
    "Social sciences"];
  var occCats = ["Architecture and engineering",
    "Arts, design, entertainment, sports, and media",
    "Building and grounds cleaning and maintenance",
    "Business and financial operations",
    "Community and social service",
    "Computer and mathematical",
    "Construction and extraction",
    "Education",
    "Farming, fishing, and forestry",
    "Food preparation and serving",
    "Health practice",
    "Health support",
    "Installation, maintenance, and repair",
    "Management",
    "Office and administrative support",
    "Personal care and service",
    "Production",
    "Protective service",
    "Sales",
    "Transportation and material moving"];
  var indCats = ["Administrative services",
    "Agriculture",
    "Arts",
    "Construction",
    "Educational services",
    "Financial activities and real estate",
    "Financial activities and real estate",
    "Food services",
    "Health services",
    "Information",
    "Manufacturing",
    "Mining",
    "Other services",
    "Professional and management services",
    "Public administration",
    "Retail trade",
    "Transportation",
    "Utilities",
    "Wholesale trade"];
  var stateCats = ["Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"];

var ageColors = ["#114175", "#0074cc", "#f9a21c", "#266150", "#f1d117", "#b9d9ec", "#de354c", "#591c0b"];

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

function drawChart(div, xaxis, chartData, chartDataP50, chartsubtitle) {
  Highcharts.chart(div, {
    chart: {
      style: {
        fontFamily: "'Open Sans', 'PT Serif Caption'"
      },
      inverted: true
    },
    accessibility: {
        description: 'Image description: A chart that shows the range in lifetime earnings by highest educational attainment'
    },
    title: {
      text: 'Lifetime earnings by highest educational attainment',
      style: {
        fontWeight: 'bold'
      }
    },
    subtitle: {
      text: chartsubtitle,
      style: {
        fontWeight: 'bold'
      }
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

function getChartObjByEd (obj, edlevels=edCats) {
  // In case we want to insert a null into arrays that do not have all educational categories
  var chartRawData = obj;
  // var benchEdCat = edlevels;
  // if (chartRawData.length != benchEdCat.length) {
  //   for (var i = 0; i < benchEdCat.length; i++) {
  //     if (i == chartRawData.length) {
  //       chartRawData.splice(i, 0, {schlcat: benchEdCat[i], p50: null, p25: null, p75: null})
  //     }
  //     if (chartRawData[i].schlcat != benchEdCat[i]) {
  //       chartRawData.splice(i, 0, {schlcat: benchEdCat[i], p50: null, p25: null, p75: null})
  //     }
  //   }
  // }

  // var x = [1,2,3,5,7];
  // console.log(x);
  // var bench = [1,2,3,4,5,6,7];
  // for (var i = 0; i<bench.length; i++) {
  //   if (x[i] != bench[i]) {
  //     x.splice(i, 0, bench[i])
  //   }
  // }
  // console.log(x);
  // var x = [1,2,3];
  // console.log(x);
  // var bench = [1,2,3,4,5,6,7];
  // for (var i = 0; i<bench.length; i++) {
  //   if (x[i] != bench[i]) {
  //     x.splice(i, 0, bench[i])
  //   }
  // }
  // console.log(x);

  var xaxis = chartRawData.map((obj,i) => {
    return obj.schlcat;
  });
  var chartData = chartRawData.map((obj, i) => {
    return {x: i,
      low: obj.p25,
      high: obj.p75,
      color: "#0074cc"
    }
  });
  var chartDataP50 = chartRawData.map((obj, i) => {
    return {x: i,
      y: obj.p50
    };
  });
  return [xaxis, chartData, chartDataP50];
}

function subChart (obj, navItem, div, edlevels=edCats) {
  chartData = $.grep(obj[0].data, function(n,i) {
    return n.detail == navItem
  })
  chartData = getChartObjByEd(chartData, edlevels);
  drawChart(div, chartData[0], chartData[1], chartData[2], navItem);
}
function ageChart(obj, div) {
  var xaxis = obj[0].data.map((obj,i) => {
    return obj.age;
  });
  var ageData = [];
  for (var i=0; i < obj.length; i++) {
    var ageChartObj = {name: null, data: null, color: null};
    ageChartObj.name = obj[i].schlcat;
    ageChartObj.color = ageColors[i];
    ageChartObj.data = obj[i].data.map((obj,i) => {
      return (Math.round(obj.p50/1000) * 1000);
    });
    ageData.push(ageChartObj);
  }
  Highcharts.chart(div, {
    chart: {
      style: {
        fontFamily: "'Open Sans', 'PT Serif Caption'"
      },
      type: 'line'
    },
    accessibility: {
        description: 'Image description: A chart that shows the earnings by educational attainment from age 25 to 64'
    },
    title: {
      text: '<b>Earnings by highest educational attainment from age 25 to 64</b>'
    },
    subtitle: {
      text: ''
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
        return "Age: " + this.x + '<br>' + this.series.name + ' $' + Highcharts.numberFormat(this.y, 0);
        // if (this.series.name == "Median lifetime earnings") {
        //   return 'Median lifetime earnings of ' + (this.x).toLowerCase() + ': ' + (this.y/1e6).toFixed(1) + 'M'
        // } else if (this.series.name == "Lifetime earnings range") {
        //   return '25th percentile = $' +(this.point.low/1e6).toFixed(1) + 'M; ' +
        //     '75th percentile = $' +(this.point.high/1e6).toFixed(1) + 'M'
        // }
      }
    },
    legend: {
      enabled: true
    },

    series: ageData
  });
}
function removeChartDivs() {
  $(".chart .col-6").remove();
  $(".chart .col-12").remove();
}

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
    return n.category == "State"
  });
  $("#nav-ed").on('click', function(n, i) {
    // var numChild = $(".chart > div").length;
    var i=0, navItem, divId;
    removeChartDivs();
    divId = 'chart-area-' + i;
    $("<div>", {class: "col-12", id: divId})
    .appendTo(".chart");
    $("#"+divId).css('height', '600');
    chartData = getChartObjByEd(educationObj[0].data);
    drawChart(divId, chartData[0], chartData[1], chartData[2]);
  })

  $("#nav-sex").on('click', function() {
    // var numChild = $(".chart > div").length;
    var i, navItem, divId;
    removeChartDivs();
    for (i = 0; i < genderCats.length; i++) {
      navItem = genderCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart");
      $("#"+divId).css('height', '600');
      subChart(genderObj, navItem, divId);
    }
  });

  $("#nav-race").on('click', function() {
    // var numChild = $(".chart > div").length;
    var i, navItem, divId;
    removeChartDivs();
    for (i = 0; i < raceCats.length; i++) {
      navItem = raceCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart");
      // $("#"+divId).css('height', 'auto');
      subChart(raceObj, navItem, divId);
    }
  });
  // var edCats4 = edCats.slice(4,8);

  $("#nav-major").on('click', function() {
    // var numChild = $(".chart > div").length;
    var i, navItem, divId;
    removeChartDivs();
    for (i = 0; i < majorCats.length; i++) {
      navItem = majorCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart");
      subChart(majorObj, navItem, divId, edCats4);
    }
  });
  $("#nav-age").on('click', function() {
    removeChartDivs();
    var i = 0;
    divId = 'chart-area-' + i;
    $("<div>", {class: "col-12", id: divId})
    .appendTo(".chart");
    $("#"+divId).css('height', '600');
    ageChart(ageObj, divId);
  });
  $("#nav-ind").on('click', function() {
    // var numChild = $(".chart > div").length;
    var i, navItem, divId;
    removeChartDivs();
    for (i = 0; i < indCats.length; i++) {
      navItem = indCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart")
      subChart(indObj, navItem, divId);
    }
  });
  $("#nav-occ").on('click', function() {
    // var numChild = $(".chart > div").length;
    var i, navItem, divId;
    removeChartDivs();
    for (i = 0; i < occCats.length; i++) {
      navItem = occCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart")
      subChart(occObj, navItem, divId);
    }
  });
  $("#nav-states").on('click', function() {
    // var numChild = $(".chart > div").length;
    var i, navItem, divId;
    removeChartDivs();
    for (i = 0; i < stateCats.length; i++) {
      navItem = stateCats[i];
      divId = 'chart-area-' + i;
      $("<div>", {class: "col-6", id: divId})
      .appendTo(".chart")
      subChart(statesObj, navItem, divId);
    }
  });

  $("#nav-ed").trigger('click');
})
