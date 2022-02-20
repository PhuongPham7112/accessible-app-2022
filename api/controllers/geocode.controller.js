
exports.getCoordinate = async (address) => {
    var axios = require("axios");
    var settings = {
        "method": "get",
        "url": "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyD-QOR-6ksWJTvFVu4axvHN6TrLd62rJDY",
        headers: {
            "Content-Type": "application/json",
        }
    }

    var info, coordinate;

    try {
        info = await axios(settings).then(
            (res) => {
                coordinate = res.data.results[0].geometry.location;
                console.log(coordinate);
            }
        );
        console.log(coordinate);
        return coordinate;
    }
    catch (err) {
        return err;
    }
}