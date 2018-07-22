# Firefox datalist (doesn't fully update unless backspace pressed) bug

Demo available at [datalist.fuzzlesoft.ca](http://datalist.fuzzlesoft.ca)

## To reproduce

1. Open `index.html` directly in a browser and select the input
2. Type the letter `s` and wait for the datalist to update (should show five items)
3. Append the letter `u` (search should be `su` now). Note that only `su1` and `su2` appear in the dropdown, even though (by inspecting the DOM) it's clear that there should be five options
4. Complete the input character-by-character until it contains the word `summer`. Note that the autocomplete dropdown isn't shown at all.
5. Hit backspace once (input should contain `summe`). Note that there's now three results in the dropdown, even though there wasn't any before (even when you had the exact same text in the input).

## How does this work

I've added an `input` listener to populate the `datalist` with hardcoded options for

* `s`
* `su`
* `sum`
* `summ`
* `summe`
* `summer`
* `summer1`
* `summer2`
* `summer3`

There's a brief delay between the `input` callback being invoked and the datalist being updated. Without a large enough delay, Firefox won't reproduce the issue.

## My understanding of the bug

If you're dynamically updating a datalist, Firefox seems to cache and re-use the datalist in the state it was the _first_ time it had content.
If the content (the datalist options) change, Firefox seems to ignore that until the user hits the "backspace" key.