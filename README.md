# Firefox datalist (doesn't fully update unless backspace pressed) bug

## To reproduce

1. Open `index.html` directly in a browser
2. Type in the beginning part of "summer" (e.g.: just type "sum")
3. Note that there's no results
4. Hit "backspace" once (input should contain the string "su")
5. There's results again

Also note that, even when there's no results, if you inspect the `datalist`, it _does_ have children.

## How does this work

If you're dynamically updating a datalist, Firefox seems to cache and re-use the datalist in the state it was the _first_ time it had content.
If the content (the datalist options) change, Firefox seems to ignore that until the user hits the "backspace" key.