import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexOptions
} from "ng-apexcharts";
import { ChartOptions } from './ChartOptions';
import { dataSeries } from './timeSeriesChartData';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  apiResponse: any;
  

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(token)
      return true;
    }
    return false;
  }

  logOut = () => {
    localStorage.removeItem("jwt");
  }

  getData() {
    this.http.get("https://localhost:7253/WeatherForecast")
      .subscribe({
        next: (result: any) => this.apiResponse = result,
        error: (err: HttpErrorResponse) => console.log(err)
      })
  }

  series= [
    {
      name: "My-series",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ];

  plotOptions= {
    bar: {
      columnWidth: '30%'
    },
  };

  dataLabels = {
    enabled: false, // Set this to false to hide the numbers inside bars
  };  

  xaxis = {
    labels: {
      show: false, // Hide x-axis labels
    },
  }
  yaxix = {
    labels: {
      show: false, // Hide x-axis labels
    },
  }

  lineChart:ApexChart  = {
    type: 'line',
    height: 150,
    toolbar: {
      show: false
    }
  };

  barChart:ApexChart  = {
    type: 'bar',
    height: 150,
    toolbar: {
      show: false
    }
  };

  pieChart:ApexChart  = {
    type: 'donut',
    height: 160,
    toolbar: {
      show: false
    }
  };

  fill= {
    type: "gradient"
  };

  title={
    text: "My First Angular Chart"
  };

  chartColors = ['#008FFB'];


  // pieChart = {
  //   type: 'pie',
  // };
  pieSeries =  [44, 55, 13, 43, 22]; // Example data series for the pie chart
  pieLabels= ['Label A', 'Label B', 'Label C', 'Label D', 'Label E']; // Example labels for the pie chart
  pieColors = ['#008FFB', '#E81994', '#6DC180','#6C32AD','#FEE86D'];
 
  // radialBarChart:ApexChart= {
  //   height: 350,
  //   type: "radialBar",
  //   toolbar: {
  //     show: true
  //   }
  // };

  radial2Options: ChartOptions = {
    series: [76, 67, 61, 90],
    chart: {
      height: 250,
      type: "radialBar"
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
    legend: {
      show: true,
      floating: true,
      fontSize: "13px",
      position: "left",
      offsetX: 45,
      offsetY:  -13,
      labels: {
        useSeriesColors: true
      },
      formatter: function (seriesName: any, opts: any) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        horizontal: 3
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }
    ],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
  };

  radialBarChart: ChartOptions = {
    series: [75],
    chart: {
      height: 183,
      type: "radialBar",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px"
          },
          value: {
            formatter: function (val: any) {
              return parseInt(val.toString(), 10).toString();
            },
            color: "#111",
            fontSize: "36px",
            show: true
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "round"
    },
    labels: ["Percent"],
    colors: [],
    legend: {
    },
    responsive: []
  };


  dates: number[][] = [];

    timeSeries = [
      {
        name: "XYZ MOTORS",
        data: this.dates      }
    ];

    timeSerieschart:ApexChart = {
      type: "area",
      stacked: false,
      height: 212,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };

    timeSeriesDataLabels = {
      enabled: false
    };

    timeSeriesmarkers = {
      size: 0
    };

    timeSeriestitle = {
      text: "Stock Price Movement",
      align: "left"
    };

    timeSeriesFill = {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    };

    timeSeriesyaxis = {
      labels: {
        formatter: function(val:number) {
          return (val / 1000000).toFixed(0);
        }
      },
      title: {
        text: "Price"
      }
    };

    timeSeriesXaxis = {
      title: {
        text: "Date"
      }
    };

    // xaxis = {
    //   labels: {
    //     show: false, // Hide x-axis labels
    //   },
    // }

    timeSeriesTooltip = {
      shared: false,
      y: {
        formatter: function(val:any) {
          return (val / 1000000).toFixed(0);
        }
      }
    }



  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) { }

    
      ngOnInit(){

      }

        
   initChartData(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }
    this.dates = dates;
}
}