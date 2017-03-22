(function () {
    var $chartDataSelect = $('#chartDataSelect');
    var $seriesTypeSelect = $('#seriesTypeSelect');
    var $scaleTypeSelect = $('#scaleTypeSelect');
    var $indicatorTypeSelect = $('#indicatorTypeSelect');
    var $indicatorSettingsModal = $('#indicatorSettingsModal');
    var $resetBtn = $('#resetButton');
    var $addIndicatorBtn = $('#addIndicatorButton');
    var $indicatorNavPanel = $('#indicatorNavPanel');
    var $indicatorForm = $('#indicatorForm');

    var savedSettings = {};
    savedSettings['data'] = {};
    savedSettings['chartType'] = $seriesTypeSelect.val();
    savedSettings['scale'] = $scaleTypeSelect.val();
    savedSettings['indicators'] = {};

    var container = 'chart-container';

    var indicator = {
        name: '',
        plotIndex: 0,
        defaultSettings: {
            ama: {
                period: 20,
                fastPeriod: 2,
                slowPeriod: 30,
                seriesType: 'line'
            },
            aroon: {
                period: 20,
                upSeriesType: 'line',
                downSeriesType: 'line'
            },
            atr: {
                period: 14,
                seriesType: 'line'
            },
            bbands: {
                period: 20,
                deviation: 2,
                upperSeriesType: 'line',
                lowerSeriesType: 'line',
                middleSeriesType: 'line'
            },
            bbandsB: {
                period: 20,
                deviation: 2,
                seriesType: 'line'
            },
            bbandsWidth: {
                period: 20,
                deviation: 2,
                seriesType: 'line'
            },
            ema: {
                period: 20,
                seriesType: 'line'
            },
            stochastic: {
                kPeriod: 14,
                kMAPeriod: 1,
                dPeriod: 3,
                smoothingType: ['sma', 'ema'],
                kMAType: 'sma',
                dMAType: 'sma',
                kSeriesType: 'line',
                dSeriesType: 'line'
            },
            fastStochastic: {
                kPeriod: 20,
                kMAPeriod: 10,
                dPeriod: 3,
                smoothingType: ['sma', 'ema'],
                kMAType: 'sma',
                dMAType: 'sma',
                kSeriesType: 'line',
                dSeriesType: 'line'
            },
            slowStochastic: {
                kPeriod: 14,
                kMAPeriod: 3,
                dPeriod: 3,
                smoothingType: ['sma', 'ema'],
                kMAType: 'sma',
                dMAType: 'sma',
                kSeriesType: 'line',
                dSeriesType: 'line'
            },
            kdj: {
                kPeriod: 14,
                kMAPeriod: 5,
                dPeriod: 5,
                smoothingType: ['sma', 'ema'],
                kMAType: 'ema',
                dMAType: 'ema',
                kMultiplier: -2,
                dMultiplier: 3,
                kSeriesType: 'line',
                dSeriesType: 'line',
                jSeriesType: 'line'
            },
            mma: {
                period: 20,
                seriesType: 'line'
            },
            macd: {
                fastPeriod: 12,
                slowPeriod: 26,
                signalPeriod: 9,
                macdSeriesType: 'line',
                signalSeriesType: 'line',
                histogramSeriesType: 'column'
            },
            roc: {
                period: 20,
                seriesType: 'line'
            },
            rsi: {
                period: 14,
                seriesType: 'line'
            },
            sma: {
                period: 20,
                seriesType: 'line'
            }
        },
        overviewIndicator: {
            ama: {
                title: 'Adaptive Moving Average (AMA)',
                description: '<p>An Adaptive Moving Average (AMA) is another indicator like SMA, MMA and EMA, but has more parameters. It changes its sensitivity due to the price fluctuations. The Adaptive Moving Average becomes more sensitive during periods when price is moving in a certain direction and becomes less sensitive to price movements when it become unstable.</p></p>',
                parameters: '<p>AMA indicator needs five parameters: mapping with value field in it (required), three periods: period, fast period and slow period; and a type of series. It is possible to change the series type any time using the seriesType() method.</p>'
            },
            aroon: {
                title: 'Aroon',
                description: '<p>Developed by Tushar Chande in 1995, Aroon is an indicator system that determines whether a stock is trending or not and how strong the trend is. \"Aroon" means \"Dawn\'s Early Light\" in Sanskrit. Chande chose this name because the indicators are designed to reveal the beginning of a new trend.</p><p>The Aroon indicators measure the number of periods since price recorded an x-day high or low. There are two separate indicators: Aroon-Up and Aroon-Down. A 25-day Aroon-Up measures the number of days since a 25-day high. A 25-day Aroon-Down measures the number of days since a 25-day low. In this sense, the Aroon indicators are quite different from typical momentum oscillators, which focus on price relative to time. Aroon is unique because it focuses on time relative to price. Chartists can use the Aroon indicators to spot emerging trends, identify consolidations, define correction periods and anticipate reversals.</p>',
                parameters: '<p>Aroon indicator has only one type specific parameter - period: mapping with value field in it, period and types of Up and Down series.</p>'
            },
            atr: {
                title: 'Average True Range (ATR)',
                description: '<p>Developed by J. Welles Wilder, the Average True Range (ATR) is an indicator that measures volatility. As with most of his indicators, Wilder designed ATR with commodities and daily prices in mind. Commodities are frequently more volatile than stocks. They were are often subject to gaps and limit moves, which occur when a commodity opens up or down its maximum allowed move for the session. A volatility formula based only on the high-low range would fail to capture volatility from gap or limit moves. Wilder created Average True Range to capture this "missing" volatility. It is important to remember that ATR does not provide an indication of price direction, just volatility.</p>',
                parameters: '<p>Average True Range indicator has three parameters: mapping, period, which has to be an integer value more than 1, and series type.</p>'
            },
            bbands: {
                title: 'Bollinger Bands (BBands)',
                description: '<p>Bollinger Bands are a volatility indicator that is displayed as two lines (bands): one drawn above a simple moving average of the price and one - below. These bands move closer to the moving average when price volatility is low and move farther away from the moving average when price volatility increases.</p>',
                parameters: '<p>Bollinger Bands parameters can be adjusted. The default parameters are: 20 periods for the simple moving average and 2 for the standard deviations (the distance between each band and the SMA). Increasing the number of periods - decreases the volatility of the SMA, and decreasing their number - increases the volatility of the SMA. Increasing the number of standard deviations moves the bands farther away from the SMA, and decreasing - moves the bands closer to the SMA.</p>',
                function: '<p>Bollinger Bands are used to determine how volatile a stock is. Stocks move between levels of high and low volatility, and when the Bollinger bands grip a stock, it is a sign that the stock is consolidating and that a breakout is inevitable. When the Bollinger bands widen, it is a sign that the stock has burst out into a new trend.</p>'
            },
            bbandsB: {
                title: 'Bollinger Bands %B (BBands B)',
                description: '<p>Bollinger Bands %B is an indicator derived from Bollinger Bands.</p>%B quantifies a security\'s price relative to the upper and lower Bollinger Band. There are six basic relationship levels: ' +
                '<ul>' +
                '<li>%B equals 1 when price is at the upper band</li>' +
                '<li>%B equals 0 when price is at the lower band</li>' +
                '<li>%B is above 1 when price is above the upper band</li>' +
                '<li>%B is below 0 when price is below the lower band</li>' +
                '<li>%B is above .50 when price is above the middle band (SMA)</li>' +
                '<li>%B is below .50 when price is below the middle band (SMA)</li>' +
                '</ul>',
                parameters: 'Bollinger Bands %B indicator requires only the "mapping" parameter. Optional parameters are "period", "deviation" and "series type".'
            },
            bbandsWidth: {
                title: 'Bollinger Bands Width (BBands Width)',
                description: '<p>Bollinger Bands Width is an indicator derived from Bollinger Bands.</p><p>Non-normalized Bollinger Bands Width measures the distance, or difference, between the upper band and the lower band. Bollinger Bands Width decreases as Bollinger Bands narrow and increases as Bollinger Bands widen because Bollinger Bands are based on the standard deviation.</p>',
                parameters: 'Bollinger Bands Width indicator requires only the "mapping" parameter. Optional parameters are "period", "deviation" and "series type".'
            },
            ema: {
                title: 'Exponential moving average (EMA)',
                description: '<p>An Exponential Moving Average is a trending indicator - a single line that shows the weighted mean of the stock price during a specified period of time. This type of moving average that is similar to a Simple Moving Average, except that more weight is given to the latest data.</p>',
                parameters: '<p>EMA period parameter can be adjusted. The default parameter is 20 periods. Increasing the number of periods will decrease the volatility, and decreasing the number of periods will increase the volatility.</p>',
                function: '<p>Exponential Moving Averages are used by traders to detect the trend of the stock and to identify possible levels of support and resistance. If the Exponential Moving Average is trending higher and the price is above it, the stock is considered to be in an uptrend, in other case - if it is trending lower and the price is below it, the stock is considered to be in a downtrend. Also, when the price is above an uptrending EMA line, the Exponential Moving Average can act as a possible support level. In the same way, when the price below a downtrending EMA line - the Exponential Moving Average can act as a possible resistance level.</p>'
            },
            stochastic: {
                title: 'Stochastic Oscillator (Full)',
                description: '<p>The Full Stochastic Oscillator is a momentum indicator that consists of two lines - %K and %D, these lines move in a range between 0 and 100. The full stochastic shows the interrelation of the current closing price to the trading range in the past. If the current closing price is toward the top of the past trading range, %K moves higher. If the current closing price is toward the bottom of the past trading range, %K moves lower.</p>',
                parameters: '<p>The full stochastic parameters can be adjusted. The default parameters are 20 periods for the time frame, 5 periods for the %K, and 3 periods for the %D smoothing. Increasing the number of periods for the time frame decreases the volatility of the full stochastic, decreasing the number of periods for the time frame increases the volatility of the full stochastic. Increasing the number of periods for the %K decreases the volatility of the %K line, and decreasing the number of periods for the time frame increases the volatility of the %K line. Also, increasing the number of periods for the %D smoothing decrease the volatility of the %D line, and decreasing the number of periods for the time frame increases the volatility of the %D line.</p>',
                function: '<p>The Full Stochastic Oscillator is used to determine is there bullish or bearish momentum behind a stock. When %K is above %D, the full stochastic shows bullish momentum, %K below %D - shows bearish momentum. Also, %K above 80 shows the market may be overbought, and %K below 20 - the market may be oversold.</p>'
               },
            fastStochastic: {
                title: 'Stochastic Oscillator (Fast)',
                description: '<p>The Fast Stochastic Oscillator is a momentum indicator that consists of two lines - %K and %D, these lines move in the range between 0 and 100. The fast stochastic shows the interrelation of the current closing price to the trading range in the past. When the current closing price is toward the top of the past trading range, %K moves higher. If the current closing price is toward the bottom of the past trading range, %K moves lower.</p>',
                parameters: '<p>The fast stochastic parameters can be adjusted. The default parameters are 20 periods for the time frame and 3 periods for the %D smoothing. Increasing the number of periods for the time frame decreases the volatility of the indicator, and decreasing the number of periods - decreases the volatility. Increasing the number of periods for the %D smoothing decreases the volatility of the %D line and decreasing the number of periods for the time frame increases the volatility of the %D line.</p>',
                function: '<p>The Fast Stochastic Oscillator is used to determine whether there is bullish or bearish momentum behind a stock. %K above %D in the fast stochastic shows a bullish momentum, and %K below %D - shows a bearish momentum. Also, when %K is above 80, it shows that the market may be overbought, and %K below 20 - shows the market may be oversold.</p>'
               },
            slowStochastic: {
                title: 'Stochastic Oscillator (Slow)',
                description: '<p>The Slow Stochastic Oscillator is a momentum indicator that consists of two lines - %K and %D, these lines move in the range between 0 and 100. The slow stochastic shows the interrelation of the current closing price to the trading range in the past. If the current closing price is toward the top of the past trading range, %K moves higher. If the current closing price is toward the bottom of the past trading range, %K moves lower.</p>',
                parameters: '<p>Slow stochastic parameters can be adjusted. The default parameters are 20 periods for the time frame and 5 periods for the %D smoothing. Increasing the number of periods for the time frame decreases the volatility of the slow stochastic, and decreasing the number of periods for the time frame will increase the volatility of the slow stochastic. Also, increasing the number of periods for the %D smoothing decreases the volatility of the %D line, and decreasing the number of periods for the time frame increases the volatility of the %D line.</p>',
                function: '<p>The Slow Stochastic Oscillator is used to determine whether there is bullish or bearish momentum behind a stock. %K above %D in the slow stochastic shows bullish momentum, and %K below %D - shows bearish momentum. Also, when %K is above 80, it shows the market may be overbought, and when %K is below 20 - shows the market may be oversold.</p>'
            },
            kdj: {
                title: 'KDJ',
                description: '<p>KDJ indicator is a technical indicator used to analyze and predict changes in stock trends and price patterns in a traded asset. KDJ indicator is also known as the random index. It is a very practical technical indicator which is most commonly used in market trend analysis of short-term stock.</p> <p> KDJ is a derived form of the Stochastic Oscillator Indicator with the only difference of having an extra line called the J line. Values of %K and %D lines show if the security is overbought (over 80) or oversold (below 20). The moments of %K crossing %D are the moments for selling or buying. The J line represents the divergence of the %D value from the %K. The value of J can go beyond [0, 100] for %K and %D lines on the chart.</p>',
                parameters: 'KDJ indicator has a lot of optional parameters:' +
                '<ul>' +
                '<li>a period for the %K value</li>' +
                '<li>the moving average type of the indicator for the %K value</li>' +
                '<li>a period for the smoothed %K value</li>' +
                '<li>the moving average type of the indicator for the %D value</li>' +
                '<li>a period for the %D value</li>' +
                '<li>multipliers of the %K and %D values for %J value calculating</li>' +
                '<li>series types of the %K, %D and %J values.</li>' +
                '</ul>' +
                'The following code shows how to create a KDJ indicator with %K value with period of 10 and EMA smoothing and %D value with period of 20 and SMA smoothing.' +
                'There are three series that form the KDJ indicator, so there is a methods for each of them:' +
                '<ul>' +
                '<li>kSeries() for the %K series</li>' +
                '<li>dSeries() for the %D series</li>' +
                '<li>jSeries() for the %J series</li>' +
                '</ul>' +
                'It is possible to change the series type any time using the seriesType() method.'
            },
            mma: {
                title: 'Modified Moving Average (MMA)',
                description: '<p>A Modified Moving Average (MMA) (also known as Running Moving Average (RMA), or SMoothed Moving Average (SMMA)) is an indicator that shows the average value of a security\'s price over a period of time. It works very similar to the Exponential Moving Average, they are equivalent but for different periods (e.g. the MMA value for a 14-day period will be the same as EMA-value for a 27-days period).</p><p>MMA is partly calculated like SMA: the first point of the MMA is calculated the same way it is done for SMA. However, other points are calculated differently:the new price is added first and then the last average is subtracted from the resulting sum.</p>',
                parameters: 'MMA indicator needs three parameters, as SMA and EMA: mapping with value field in it, period and a type of series. It is possible to change the series type at any time using the seriesType() method.'
            },
            macd: {
                title: 'Moving Average Convergence/Divergence (MACD)',
                description: '<p>The Moving Average Convergence/Divergence (MACD) is a momentum indicator that consists of two lines - an indicator line and a signal line. The indicator line displays the difference between two exponential moving averages with different smoothing factors, and the signal line displays an exponential moving average of the difference between mentioned two exponential moving averages.</p>',
                parameters: '<p>MACD parameters can be adjusted. The default parameters are 26 for the slow exponential moving average, 12 for the fast exponential moving average and 20 for the signal line. Decreasing any of the parameters decreases the volatility of the related line, and increasing them - increases the volatility of the related line.</p>',
                function: '<p>The MACD is used to determine is there bullish or bearish momentum behind a stock. When the indicator line is above the signal line, the MACD shows bullish momentum, and the indicator line below the signal line in the MACD shows bearish momentum.</p>'
            },
            roc: {
                title: 'Rate of Change (ROC)',
                description: '<p>The Rate of Change oscillator is a momentum indicator that consists of one line. The ROC measures the percentage change in the price from one trading period to the next. If the percentage change is big, the ROC line moves harshly up or down, depending on price changing direction. In other case - if the percentage change is small, the ROC line moves slowly up or down, depending on the price changing direction.</p>',
                parameters: '<p>The ROC indicator parameters can be adjusted. The default parameter is 12 periods for the time frame. Increasing the number of periods for the time frame decreases the volatility of the ROC indicator, and decreasing the number of periods for the time frame increases the volatility of the ROC indicator.</p>',
                function: '<p>The ROC oscillator is used to determine is there bullish or bearish momentum behind a stock. The ROC line above the zero line shows bullish momentum, and the ROC line below the zero line shows bearish momentum.</p>'
            },
            rsi: {
                title: 'Relative Strength Index (RSI)',
                description: '<p>The Relative Strength Index (RSI) oscillator is a momentum indicator that consists of one line that moves in a range between 0 and 100.</p>',
                parameters: '<p>The RSI parameters are adjustable. The default parameter is 14 periods for the time frame. Increasing the number of periods for the time frame decreases the volatility of the RSI, and decreasing the number of periods for the time frame decreases it.</p>',
                function: '<p>The RSI oscillator is used to determine is there bullish or bearish momentum behind a stock. The RSI line moving higher shows bullish momentum, and the RSI line moving lower shows bearish momentum. Also, the RSI line above 70 shows the market may be overbought, and the RSI line below 30 - the market may be oversold.</p>'
            },
            sma: {
                title: 'Simple Moving Average (SMA)',
                description: '<p>A Simple Moving Average is a trending indicator that is displayed as a single line that shows the mean price during a specified period of time. For example, a 20-day SMA shows the average stock price during the last 20 trading periods (including the current period).</p>',
                parameters: '<p>SMA period parameter can be adjusted. The default parameter is 20 periods. Increasing the number of periods will decrease the volatility, and decreasing the number of periods will increase the volatility.</p>',
                usage: '<p>Simple Moving Averages are used by traders to detect the trend of the stock and to identify possible levels of support and resistance. If the Simple Moving Average is trending higher and the price is above it, the stock is considered to be in an uptrend, in other case - if it is trending lower and the price is below it, the stock is considered to be in a downtrend. Also, when the price is above an uptrending SMA line, the Simple Moving Average can act as a possible support level. In the same way, when the price below a downtrending SMA line - the Simple Moving Average can act as a possible resistance level.</p>'
            }
        },
        seriesType: [
            'area',
            'column',
            'jumpLine',
            'line',
            'marker',
            'spline',
            'splineArea',
            'stepArea',
            'stepLine',
            'stick'
        ]
    };

    var chart;
    var dataTable;

    var inputHtml =
        '<div class="col-sm-4">' +
        '<div class="form-group" id="indicatorFormGroup">' +
        '<label for="" class="control-label"></label>' +
        '<input type="number" class="form-control" id="">' +
        '</div>' +
        '</div>';

    var selectHtml =
        '<div class="col-sm-4">' +
        '<div class="form-group" id="indicatorFormGroup">' +
        '<label for="" class="control-label"></label>' +
        '<select class="form-control select show-tick" id=""></select>' +
        '</div>' +
        '</div>';

    var app = {
        createChart: createChart,
        removeChart: removeChart
    };

    anychart.onDocumentReady(function () {
        initHeightChart();

        // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
        // (http://cdn.anychart.com/js/latest/data-adapter.min.js)
        // Load JSON data and create a chart by JSON data.
        anychart.data.loadJsonFile($chartDataSelect.val(), function (data) {
            savedSettings['data']['msft'] = data;
            // init, create chart
            app.createChart(container);
        });

        // event to set data to chart
        $chartDataSelect.on('change', function () {
            var name = $(this).find('option:selected').text().toLowerCase();

            if (!~Object.keys(savedSettings['data']).indexOf(name)) {
                // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
                // (http://cdn.anychart.com/js/latest/data-adapter.min.js)
                // Load JSON data and create a chart by JSON data.
                anychart.data.loadJsonFile($(this).val(), function (data) {
                    savedSettings['data'][name] = data;
                    dataTable.addData(data);
                    chart.plot().getSeries(0).name(name.toUpperCase());
                });
            } else {
                dataTable.addData(savedSettings['data'][name]);
                chart.plot().getSeries(0).name(name.toUpperCase());
            }
        });

        // event to set chart type
        $seriesTypeSelect.on('change', function () {
            var type = $(this).val();

            // set chart type
            chart.plot().getSeries(0).seriesType(type);
            // save chart type
            savedSettings['chartType'] = type;
        });

        // event to show modal indicator settings
        $indicatorTypeSelect.on('change', function () {

            if ($(this).val()) {
                if ($(this).val().length === 1) {
                    updateTextForIndicatorTypeSelect();
                }
            }

            if ($(this).val() === null || $(this).val().length < Object.keys(savedSettings.indicators).length) {

                app.removeChart();

                if ($(this).val() !== null) {
                    for (keyIndicator in savedSettings.indicators) {
                        if (!~$(this).val().indexOf(keyIndicator)) {
                            delete savedSettings.indicators[keyIndicator]
                        }
                    }
                } else {
                    savedSettings.indicators = {};
                }

                app.createChart(container, true);

                return
            }

            for (var i = 0; i < $(this).val().length; i++) {
                if (!~Object.keys(savedSettings.indicators).indexOf($(this).val()[i])) {
                    // set indicator name
                    indicator.name = $(this).val()[i];
                    break;
                }
            }

            // set plot index
            indicator.plotIndex = $(this).find('option[value="' + indicator.name + '"]').data().plotIndex;

            // create html if form (input/select)
            createHtmlToIndicatorForm();
            // set default indicator settings to input/select
            setDefaultIndicatorSettings();

            // show indicator settings modal
            $indicatorSettingsModal.modal('show');
            // hide dropdown menu, select
            $indicatorNavPanel.find('.select.open').removeClass('open');
        });

        // event to change scale
        $scaleTypeSelect.on('change', function () {
            app.removeChart();
            // save scale type
            savedSettings['scale'] = $(this).val();
            app.createChart(container, true);
        });

        // remove selected class, if indicator not selected
        $indicatorSettingsModal.on('hidden.bs.modal', function () {
            var lastAddedIndicator;

            for (var i = 0; i < $indicatorTypeSelect.val().length; i++) {
                if (!~Object.keys(savedSettings.indicators).indexOf($indicatorTypeSelect.val()[i])) {
                    // set indicator name
                    lastAddedIndicator = $indicatorTypeSelect.val()[i];
                    break;
                }
            }

            if (!lastAddedIndicator) {
                // update select text/title
                updateTextForIndicatorTypeSelect();
                return false
            }

            var indexOption = $indicatorTypeSelect.find('[value="' + lastAddedIndicator + '"]').index();

            // unselect option
            $indicatorTypeSelect.find('[value="' + lastAddedIndicator + '"]').removeAttr('selected');
            // remove selected class
            $indicatorTypeSelect.prev('.dropdown-menu').find('li[data-original-index="' + indexOption + '"]').removeClass('selected');
            // update select text/title
            updateTextForIndicatorTypeSelect();
        });

        // init selectpicker to all select in indicator settings modal
        $indicatorSettingsModal.on('show.bs.modal', function () {
            $indicatorForm.find('.select').selectpicker();
        });

        // reset all settings
        $resetBtn.on('click', function (e) {
            e.preventDefault();

            app.removeChart();
            // reset saved settings
            savedSettings['indicators'] = {};
            savedSettings['scale'] = 'linear';
            savedSettings['chartType'] = 'line';

            $chartDataSelect.val('data/msft.json').selectpicker('refresh');
            $seriesTypeSelect.val('line').selectpicker('refresh');
            $indicatorTypeSelect.val('').selectpicker('refresh');
            $scaleTypeSelect.val('linear').selectpicker('refresh');

            // init, create chart
            app.createChart(container);
        });

        // event to add indicator
        $addIndicatorBtn.on('click', function () {
            var mapping = dataTable.mapAs({'value': 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4});
            var keys = Object.keys(indicator.defaultSettings[indicator.name]);
            var settings = [mapping];
            var indicatorName = indicator.name;

            // for slow/fast stochastic
            if (~indicatorName.toLowerCase().indexOf('stochastic')) {
                indicatorName = 'stochastic';
            }

            for (var i = 0; i < keys.length; i++) {
                if (keys[i] !== 'smoothingType') {
                    settings.push($('#' + keys[i]).val());
                }
            }

            // save settings for indicator
            savedSettings['indicators'][indicator.name] = {};
            savedSettings['indicators'][indicator.name]['settings'] = settings;
            savedSettings['indicators'][indicator.name]['plotIndex'] = indicator.plotIndex;

            var plot = chart.plot(indicator.plotIndex);
            plot[indicatorName].apply(plot, settings);
            // hide indicator settings modal
            $indicatorSettingsModal.modal('hide');
        });
    });

    $(window).on('resize', initHeightChart);

    function initHeightChart() {
        var creditsHeight = 10;
        $('#chart-container').height($(window).height() - $indicatorNavPanel.outerHeight() - creditsHeight);
    }

    function createChart(container, updateChart) {
        var dataName = $chartDataSelect.find('option:selected').text();
        // create data table on loaded data
        dataTable = anychart.data.table();

        var lineSeries;

        // map loaded data
        var mapping = dataTable.mapAs({'value': 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4});

        // create stock chart
        chart = anychart.stock();

        // create plot on the chart
        var plot = chart.plot(0);

        dataTable.addData(savedSettings['data'][dataName.toLowerCase()]);

        if (updateChart) {
            var indicatorName;
            var indicatorPlot;
            var indicatorSettings = [];

            // create line series
            lineSeries = plot[savedSettings['chartType']](mapping);
            lineSeries.name(dataName.toUpperCase());

            plot.yScale(savedSettings['scale']);

            for (keyIndicator in savedSettings['indicators']) {
                indicatorName = keyIndicator;

                if (savedSettings['indicators'].hasOwnProperty(keyIndicator)) {
                    indicatorSettings = savedSettings['indicators'][keyIndicator]['settings'];
                    indicatorSettings[0] = mapping;
                }

                // for slow/fast stochastic
                if (~indicatorName.toLowerCase().indexOf('stochastic')) {
                    indicatorName = 'stochastic';
                }

                if (savedSettings['indicators'].hasOwnProperty(keyIndicator)) {
                    indicatorPlot = chart.plot(savedSettings['indicators'][keyIndicator]['plotIndex']);
                    indicatorPlot[indicatorName].apply(indicatorPlot, indicatorSettings);
                }
            }

        } else {
            // create line series
            lineSeries = plot.line(mapping);
            lineSeries.name(dataName.toUpperCase());
        }

        lineSeries.stroke('2px #64b5f6');

        // adding extra Y axis to the right side
        var yAxis = plot.yAxis(1);
        yAxis.orientation('right');
        // setting chart padding to fit both Y axes
        chart.padding(10, 50, 20, 50);

        // create scroller series with mapped data
        chart.scroller().line(mapping);

        // set chart selected date/time range
        chart.selectRange('2004-11-14', '2007-11-15');

        // set container id for the chart
        chart.container(container);

        // initiate chart drawing
        chart.draw();

        // create range picker
        rangePicker = anychart.ui.rangePicker();
        // init range picker
        rangePicker.render(chart);

        // create range selector
        rangeSelector = anychart.ui.rangeSelector();
        // init range selector
        rangeSelector.render(chart);

        chart.listen('chartDraw', function () {
            $('#loader').hide();
        });

    }

    function removeChart() {
        if (chart) {
            chart.dispose();
            chart = null;
        }
    }

    function updateTextForIndicatorTypeSelect() {
        if ($indicatorTypeSelect.val()) {
            if ($indicatorTypeSelect.val().length > 1) {
                $indicatorTypeSelect.find('option:selected').each(function () {
                    $(this).text($(this).attr('data-abbr'))
                });
            } else {
                $indicatorTypeSelect.find('option:selected').each(function () {
                    $(this).text($(this).attr('data-full-text'))
                });
            }

            $indicatorTypeSelect.selectpicker('refresh').closest('.bootstrap-select').find('.dropdown-menu.inner').find('span.text').each(function (index) {
                $(this).text($indicatorTypeSelect.find('option').eq(index).attr('data-full-text'));
            });
        }
    }

    function createHtmlToIndicatorForm() {
        var $indicatorFormGroup;
        var isSmoothingType;
        var indicatorSettings = indicator.defaultSettings[indicator.name];
        var $option;
        var i = 0;

        $('#indicatorSettingsModalTitle').text(indicator.overviewIndicator[indicator.name].title);

        // empty form
        $indicatorForm.empty();
        // create row
        $indicatorForm.append('<div class="row"></div>');
        var $indicatorFormRow = $indicatorForm.find('.row');

        for (key in indicatorSettings) {
            if (indicatorSettings.hasOwnProperty(key)) {
                if (typeof indicatorSettings[key] === 'string') {
                    $indicatorFormRow.append(selectHtml);
                    $indicatorFormGroup = $('#indicatorFormGroup');
                    $indicatorFormGroup.find('select').attr('id', key);
                    $indicatorFormGroup.find('label').attr('for', key).text(getText(key));

                    isSmoothingType = false;

                    if (indicatorSettings.hasOwnProperty('smoothingType')) {
                        for (i = 0; i < indicatorSettings.smoothingType.length; i++) {
                            if (indicatorSettings[key] == indicatorSettings.smoothingType[i]) {
                                isSmoothingType = true;
                                break;
                            }
                        }
                    }

                    if (isSmoothingType) {
                        for (i = 0; i < indicatorSettings.smoothingType.length; i++) {
                            $option = $('<option></option>');
                            $option.val(indicatorSettings.smoothingType[i].toLowerCase());
                            $option.text(indicatorSettings.smoothingType[i].toUpperCase());
                            $indicatorFormGroup.find('select').append($option);
                        }
                    } else {
                        for (i = 0; i < indicator.seriesType.length; i++) {
                            $option = $('<option></option>');
                            $option.val(indicator.seriesType[i].toLowerCase());
                            $option.text(getText(indicator.seriesType[i]));
                            $indicatorFormGroup.find('select').append($option);
                        }
                    }

                    $indicatorFormGroup.removeAttr('id');

                } else if (typeof indicatorSettings[key] === 'number') {
                    $indicatorFormRow.append(inputHtml);
                    $indicatorFormGroup = $('#indicatorFormGroup');
                    $indicatorFormGroup.find('input').attr('id', key);

                    $indicatorFormGroup.removeAttr('id').find('label').attr('for', key).text(getText(key));
                }
            }
        }

        // col class to form el
        setColClass();
        // indicator overview text
        overviewText();
    }

    function overviewText() {
        $indicatorForm.find($("[class*='col-sm-']")).last().after('<div class="col-xs-12" id="overviewText"></div>');

        for (keyIndicator in indicator.overviewIndicator[indicator.name]) {
            if (indicator.overviewIndicator[indicator.name].hasOwnProperty(keyIndicator) && keyIndicator !== 'title') {
                $indicatorForm.find('#overviewText').append(
                    '<h5>' + keyIndicator[0].toUpperCase() + keyIndicator.substr(1) + '</h5>' +
                    indicator.overviewIndicator[indicator.name][keyIndicator]
                );
            }
        }
    }

    function setColClass() {
        // column count for row
        var ROW_COUNT = 12;
        var COLUMN_COUNT = 3;
        var index = $indicatorForm.find('.col-sm-4').length;
        var lastIndex = $indicatorForm.find('.col-sm-4').last().index();
        var colClass;

        if (index === COLUMN_COUNT) {
            return
        }

        if (index > COLUMN_COUNT) {
            while (index > COLUMN_COUNT) {
                index -= COLUMN_COUNT;
            }
        }

        colClass = ROW_COUNT / index;

        while (index) {
            --index;
            $indicatorForm.find($("[class*='col-sm-']")).eq(lastIndex - index).removeClass('col-sm-4').addClass('col-sm-' + colClass);
        }
    }

    function getText(keyText) {
        var text = '';
        var result = [];

        keyText.split(/(?=[A-Z])/).filter(function (item) {
            if (item.length == 1) {
                text += item;
            } else {
                text += ' ';
                text += item;
            }
        });
        text = text.trim();
        text = text[0].toUpperCase() + text.substr(1);

        text.split(' ').filter(function (item, index) {
            if (item.length == 1 && index !== text.split(' ').length - 1) {
                result.push(item + '-');
            } else {
                result.push(item);
            }
        });

        return result.join(' ').replace(/-\s/, '-');
    }

    function setDefaultIndicatorSettings() {
        var indicatorSettings = indicator.defaultSettings[indicator.name];

        for (key in indicatorSettings) {
            if (indicatorSettings.hasOwnProperty(key)) {
                $('#' + key).val(indicatorSettings[key]);
            }
        }
    }
})();




