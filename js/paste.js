button = document.createElement('button');
button.textContent = "Paste Listing"
button.style.cursor = "pointer";
button.addEventListener('click', pasteListing)
button.classList = "btn btn-status text-uppercase"
document.querySelector(".form-group-wrapper").prepend(button)


function pasteListing(e){
    e.preventDefault()

    chrome.storage.local.get('listing_list', function(result) {
        listing_list = result['listing_list']
        if ( listing_list.length == 0 ){ return }

        listing = listing_list[listing_list.length - 1]

        let changeEvent = new Event('change');
        country_index = document.querySelector("select[data-behavior=country-select] option[value="+ listing['country'] +"]").index

        state_index = null

        if (listing['country'] == "NZ"){
            nz_options = document.getElementsByClassName('NZ')
            for (let option of nz_options){
                state_index = option.textContent == listing['state'] ? option.index : 0
                break
            };
        }
        else
            state_index = document.querySelector("select[data-behavior=state-select] option[value="+ listing['state'] +"]").index

        phone = listing['phone'].replace(/^\+[\d]+/, "0")

    
        document.getElementById("scan_query_name").value = listing["name"]
        document.getElementById("scan_query_city").value = listing["city"]
        document.getElementById("scan_query_street").value = listing["street"]
        document.getElementById("scan_query_postal_code").value = listing["postal_code"]
        document.getElementById("scan_query_phone").value = phone
        document.getElementsByName("scan_query[country]")[0].selectedIndex = country_index
        document.getElementsByName("scan_query[country]")[0].dispatchEvent(changeEvent);
        document.getElementsByName("scan_query[state]")[0].selectedIndex = state_index
        
    });


}
