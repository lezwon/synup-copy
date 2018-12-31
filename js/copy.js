

button = document.createElement('button');
button.textContent = "Copy Listing"
button.style.cursor = "pointer";
button.addEventListener('click', copyListing)
button.classList = "edit-category chiclet-link chiclet-link--with-text show-tooltip"
document.querySelector(".biz-page-header-left").appendChild(button)


function copyListing(e){
    e.preventDefault()
    listing = {
        'live_link': document.querySelector("input[name='og:url']").value,
        'name': document.querySelector("h1.biz-page-title").textContent.trim(),
        'street': document.querySelector("span[itemprop='streetAddress']").innerHTML.replace("<br>", ", "),
        'city': document.querySelector("span[itemprop='addressLocality']").textContent,
        'country': document.querySelector("meta[itemprop='addressCountry']").getAttribute('content'),
        'postal_code': document.querySelector("span[itemprop='postalCode']").textContent,
        'phone': document.querySelector(".biz-phone").textContent.trim()
    }

    if (listing['country'] == "NZ") {
        street_city = document.querySelector("span[itemprop='streetAddress']").innerHTML.split('<br>')
        listing['state'] =  listing['city']
        listing['street'] = street_city[0]
        listing['city'] = street_city[1]
    }
    else{
        listing['state'] = document.querySelector("span[itemprop='addressRegion']").textContent
    }
    

    listing_list = [];

    chrome.storage.local.get('listing_list', function(result) {
        listing_list = result['listing_list'] ? result['listing_list']:listing_list

        if (listing_list.length == 10) { delete listing_list[0] }
        listing_list.push(listing)
    
        chrome.storage.local.set({listing_list: listing_list}, function() {
            console.log(listing)
            e.target.textContent = "Copied!"
            e.target.disabled = true;
        });
    });


}
