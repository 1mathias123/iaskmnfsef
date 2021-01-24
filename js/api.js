 var lohiarrprice=[];
    var lohiarrdate=[];
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';


    var symbol = "BTC"
    const urls = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc&order=market_cap_desc&sparkline=false";
    fetch(urls, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(resp => resp.json())
    .then(function(data) {

    // for btc coin list
    var overallTable;
    $("#mybtctbl").html("");
    for (let i = 0; i < 50; i++) {
        overallTable = ` <tr>
                <td class="tab-nm"><span class="user-ic"><img src="${data[i].image}" alt="icon"></span> ${data[i].name} (${data[i].symbol})</td>
                <td class="tab-num"><p>${scientificToDecimal(data[i].current_price)}<span>${symbol}</span></p></td>
                <td class="tab-num"><p>${data[i].market_cap}<span>${symbol}</span></p></td>
                <td class="tab-num"><p>${Math.abs(data[i].market_cap_change_24h.toFixed(2))}<span>${symbol}</span></p></td>
                <td class=`+ (data[i].price_change_percentage_24h.toFixed(2) >0 ?"pr-up" : "pr-down" )+`><span>${data[i].price_change_percentage_24h.toFixed(2)}%</span></td>
                <td><canvas class="priceschart" id="Pricechartbtcl`+i+`"></canvas></td>
            </tr>`;

            $("#mybtctbl").append(overallTable);



            // start fetching chart of btc coin list
            const charurl = "https://api.coingecko.com/api/v3/coins/"+ data[i].id+"/market_chart?vs_currency=btc&days=7&interval=daily";
            fetch(charurl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Retry-After": 1200
              }
            })
            .then(resp => resp.json())
            .then(function(dataf)
            {
                const datas = dataf.prices;
                
                for (var x =0; x<datas.length;x++) {
                    lohiarrprice.push(scientificToDecimal(datas[x][1]));
                    lohiarrdate.push(scientificToDecimal(datas[x][0]));                
                }

                var chartscript = document.createElement('script');
                chartscript.type = 'text/javascript';
                var code = `var ctx = document.getElementById("Pricechartbtcl`+i+`").getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: lohiarrdate,
                        datasets: [{
                            label: 'Series 1', // Name the series
                            data: lohiarrprice, // Specify the data values array
                            fill: false,
                            borderColor: '#2196f3', // Add custom color border (Line)
                            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                            borderWidth: 1, // Specify bar border width
                            pointRadius: 0,
                        }]},
                    options: {
                    tooltips: {
                      enabled: false,
                    },
                    legend: {
                      display: false,
                    },
                    pointDot: false,
                    scales: {
                      xAxes: [{
                        display: false,
                      }],
                      yAxes: [{
                        display: false,
                      }],
                    }
                  }
                });`;


                try {
                  chartscript.appendChild(document.createTextNode(code));
                  document.body.appendChild(chartscript);
                  lohiarrprice=[];
                    lohiarrdate=[];
                } catch (e) {
                  chartscript.text = code;
                  document.body.appendChild(chartscript);
                }

            })

            // end fetching chart of btc coin list
            
            
        }
    

    

    // for top gainers
    var topgainerbtc;
    btcdataarray =data;
    btcdataarray.sort(GetSortOrder("price_change_percentage_24h")); 

     $("#btctopgainer").html("");
    for (let i = 99; i > 94; i--) {
        topgainerbtc = `  <tr>
            <td class="tab-nm"><span class="user-ic"><img src="${btcdataarray[i].image}" alt="icon"></span> ${btcdataarray[i].name} (${btcdataarray[i].symbol})</td>
            <td class="tab-num"><p>${scientificToDecimal(btcdataarray[i].current_price)}<span>BTC</span></p></td>
            <td class="pr-up"><span>${btcdataarray[i].price_change_percentage_24h.toFixed(2)}%</span></td>
            <td><canvas class="priceschart" id="Pricechartbtcgain`+i+`"></canvas></td>
        </tr>`;

        $("#btctopgainer").append(topgainerbtc);


         // start fetching chart of btc top gainer

        const charurl = "https://api.coingecko.com/api/v3/coins/"+ btcdataarray[i].id+"/market_chart?vs_currency=btc&days=7&interval=daily";
        fetch(charurl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Retry-After": 600
          }
        })
        .then(resp => resp.json())
        .then(function(dataf)
        {
            const datas = dataf.prices;
            
            for (var x =0; x<datas.length;x++) {
                lohiarrprice.push(scientificToDecimal(datas[x][1]));
                lohiarrdate.push(scientificToDecimal(datas[x][0]));
               
            }

            var chartscript = document.createElement('script');
            chartscript.type = 'text/javascript';
            var code = `var ctx = document.getElementById("Pricechartbtcgain`+i+`").getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lohiarrdate,
                    datasets: [{
                        label: 'Series 1', // Name the series
                        data: lohiarrprice, // Specify the data values array
                        fill: false,
                        borderColor: '#2196f3', // Add custom color border (Line)
                        backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                        borderWidth: 1, // Specify bar border width
                        pointRadius: 0,
                    }]},
                options: {
                tooltips: {
                  enabled: false,
                },
                legend: {
                  display: false,
                },
                pointDot: false,
                scales: {
                  xAxes: [{
                    display: false,
                  }],
                  yAxes: [{
                    display: false,
                  }],
                }
              }
            });`;


            try {
              chartscript.appendChild(document.createTextNode(code));
              document.body.appendChild(chartscript);
              lohiarrprice=[];
                lohiarrdate=[];
            } catch (e) {
              chartscript.text = code;
              document.body.appendChild(chartscript);
            }

        })

        // end fetching chart of top gainer 
    }
    

    //////////////////////////////






    // for top losers
    var toploserbtc;; 
    $("#btctoploser").html("");
    for (let i = 0; i < 5; i++) {
        toploserbtc = `  <tr>
            <td class="tab-nm"><span class="user-ic"><img src="${data[i].image}" alt="icon"></span> ${data[i].name} (${data[i].symbol})</td>
            <td class="tab-num"><p>${scientificToDecimal(data[i].current_price)}<span>USD</span></p></td>
            <td class="pr-down"><span>${data[i].price_change_percentage_24h.toFixed(2)}%</span></td>
             <td><canvas class="priceschart" id="Pricechartbtcloss`+i+`"></canvas></td>
        </tr>`;

        $("#btctoploser").append(toploserbtc);


         // start fetching chart of btc top loser
        const charurl = "https://api.coingecko.com/api/v3/coins/"+ data[i].id+"/market_chart?vs_currency=btc&days=7&interval=daily";
        fetch(charurl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Retry-After": 600
          }
        })
        .then(resp => resp.json())
        .then(function(dataf)
        {
            const datas = dataf.prices;
            
            for (var x =0; x<datas.length;x++) {
                lohiarrprice.push(scientificToDecimal(datas[x][1]));
                lohiarrdate.push(scientificToDecimal(datas[x][0]));
               
            }

            var chartscript = document.createElement('script');
            chartscript.type = 'text/javascript';
            var code = `var ctx = document.getElementById("Pricechartbtcloss`+i+`").getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: lohiarrdate,
                    datasets: [{
                        label: 'Series 1', // Name the series
                        data: lohiarrprice, // Specify the data values array
                        fill: false,
                        borderColor: '#2196f3', // Add custom color border (Line)
                        backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
                        borderWidth: 1, // Specify bar border width
                        pointRadius: 0,
                    }]},
                options: {
                tooltips: {
                  enabled: false,
                },
                legend: {
                  display: false,
                },
                pointDot: false,
                scales: {
                  xAxes: [{
                    display: false,
                  }],
                  yAxes: [{
                    display: false,
                  }],
                }
              }
            });`;


            try {
              chartscript.appendChild(document.createTextNode(code));
              document.body.appendChild(chartscript);
              lohiarrprice=[];
                lohiarrdate=[];
            } catch (e) {
              chartscript.text = code;
              document.body.appendChild(chartscript);
            }

        })

        // end fetching chart of top loser 
    }
    

  })
  .catch(function(error) {
    console.log(error);
  });














//sorting function
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}           




function scientificToDecimal (num) {
    var nsign = Math.sign(num);
    //remove the sign
    num = Math.abs(num);
    //if the number is in scientific notation remove it
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        var zero = '0',
                parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
                e = parts.pop(), //store the exponential part
                l = Math.abs(e), //get the number of zeros
                sign = e / l,
                coeff_array = parts[0].split('.');
        if (sign === -1) {
            l = l - coeff_array[0].length;
            if (l < 0) {
              num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
            } 
            else {
              num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
            }
        } 
        else {
            var dec = coeff_array[1];
            if (dec)
                l = l - dec.length;
            if (l < 0) {
              num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
            } else {
              num = coeff_array.join('') + new Array(l + 1).join(zero);
            }
        }
    }

    return nsign < 0 ? '-'+num : num;
};