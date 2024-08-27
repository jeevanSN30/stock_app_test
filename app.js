$(document).ready(function () {
    $.ajax({
        url: 'https://raw.githubusercontent.com/shaktids/stock_app_test/main/dump.csv',
        dataType: 'text',
    }).done(successFunction);

    function successFunction(data) {
        const rows = data.split('\n');
        const companies = [];

        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            if (columns[0]) {
                companies.push({
                    name: columns[0],
                    metric1: columns[1],
                    metric2: columns[2],
                    metric3: columns[3]
                });
            }
        }

        // Populate company list
        companies.forEach((company, index) => {
            $('#companyList').append(
                <li class="list-group-item" data-index="${index}">${company.name}</li>
            );
        });

        // Event listener for company click
        $('.list-group-item').on('click', function () {
            const index = $(this).data('index');
            const company = companies[index];
            drawChart(company);
        });
    }

    function drawChart(company) {
        const ctx = document.getElementById('companyChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Metric 1', 'Metric 2', 'Metric 3'],
                datasets: [{
                    label: company.name,
                    data: [company.metric1, company.metric2, company.metric3],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
