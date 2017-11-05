# Front-End Challenge Submission

## Changes to mark up

I prefixed the products's classes with 'product' to distinguish its common indentifiers like 'tagline'
I removed the rows as anything that is a simple page layout or a list of items can be handled by flex-box.
Admittedly, I didn't use bootstrap for the content as the effect I wanted was simpler in flex-box although I think it pulls it out of any uniform grid system.
I think removing the row divs and having the items slide in to fill the empty space makes deleting items worth it.
Otherwise items are either balooning in size taking disproportionate attention or empty spaces are left behind making perusal for then user inefficient.

## Changes to script

As far as things that could be done I think the helpers I wrote, the product view and the page view can all be in seperate files.
The density of user action desired in the product cards merits that. If I were to use a library I might use Backbone or React.
Backbone is a light weight framework appropriate for simples apps. It handles nested views well. In Backbone the fetching of product data could be handled by a seperate model from the code that renders it. I think the conventions in Backbone would have helped guide code away from the async issues and it's solution in setTimeout. It's pretty to easy to set up listeners on whether data fetching and rendering when ready. I'm not familiar enough with React to have deep opinions but it's patterns would have also alleviated the async issues.


