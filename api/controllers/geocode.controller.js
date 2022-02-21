
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