
exports.getCoordinate = async (address) => {
    var axios = require("axios");
    var settings = {
        "method": "get",
        "url": "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyD6-vEbG48GdZ4k4yGEwJHWq4XFn8L_O58",
        headers: {
            "Content-Type": "application/json",
        }
    }
    var info, coordinate;
    try {
        info = await axios(settings).then(
            (res) => {
                coordinate = res.data.results[0].geometry.location;
            }
        );
        return coordinate;
    }
    catch (err) {
        return err;
    }
}

exports.getCoordinates = async (addresses) => {
    var axios = require("axios");
    try {
        const results = [];
        const coordinates = await Promise.all(addresses.map((p) => {
            return axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + p.building_address + "&key=AIzaSyD6-vEbG48GdZ4k4yGEwJHWq4XFn8L_O58")
            .then((res) => {
                results.push(res.data.results[0].geometry.location);
            })
            .catch((err) => {
                console.log(err.message, " of ", p.building_address);
            });
        }))
        console.log("done ", results);
        return results;
    }
    catch (err) {
        console.log(err.message);
    }
}