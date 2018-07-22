const staticAnswers = {
    's': ['s1', 's2', 's3', 'su1', 'su2'],
    'su': ['su1', 'su2', 'su3', 'sum1', 'sum2'],
    'sum': ['sum1', 'sum2', 'sum3', 'summer1', 'summer2'],
    'summ': ['summer1', 'summer2', 'summer3'],
    'summe': ['summer1', 'summer2', 'summer3'],
    'summer': ['summer1', 'summer2', 'summer3'],
    'summer1': ['summer1'],
    'summer2': ['summer2'],
    'summer3': ['summer3']
}

function autocomplete(targetDivId) {
    var container = document.getElementById(targetDivId);
    var input = container.querySelector('input');
    var datalist = container.querySelector('datalist');

    input.addEventListener('input', onChange);

    function onChange(e) {
        var query = e.target.value;
        if (query === '') {
            while (datalist.firstChild) {
                datalist.removeChild(datalist.firstChild);
            }
            return;
        }

        const options = staticAnswers[query] || [];
        setTimeout(() => updateDatalist(options), 200);
    }

    function updateDatalist(options) {
        while (datalist.firstChild) {
            datalist.removeChild(datalist.firstChild);
        }

        options.forEach(function (option) {
            var element = document.createElement('option');
            element.value = option;
            element.appendChild(document.createTextNode(option));
            datalist.appendChild(element);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    autocomplete('translate-search');
});