
function autocomplete(targetDivId, url) {
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

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status !== 200) {
                console.error(request.responseText);
                return;
            }
            updateDatalist(JSON.parse(request.responseText).entries);

        };
        request.open('GET', url + query);
        request.send();
    }

    function updateDatalist(options) {
        while (datalist.firstChild) {
            datalist.removeChild(datalist.firstChild);
        }

        options.forEach(function (option) {
            var element = document.createElement('option');
            var display = option.english;
            element.value = display;
            element.appendChild(document.createTextNode(display));
            datalist.appendChild(element);
        });

        input.focus();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    autocomplete('translate-search', 'https://spyu.ca/api/');
});