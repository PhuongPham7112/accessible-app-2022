
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
            }
        );
        return coordinate;
    }
    catch (err) {
        return err;
    }
}

exports.getCoordinates = async (entries) => {
    var axios = require("axios").create({
        baseURL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
        headers: {
          "Content-Type": "application/json",
        },
    });

    try {
        var coordinates = [];
        var promises = [];
        for (let i = 0; i < entries.length; i++) {
            promises.push(axios.get(entries[i].building_address.replace(/\s/g, '+') + "&key=AIzaSyD-QOR-6ksWJTvFVu4axvHN6TrLd62rJDY").then(response => {
                coordinates.push(response);
            }))
        }
        
        Promise.all(promises).then(
            () => {
                for (let i = 0; i < coordinates.length; i++) {
                    coordinates[i] = coordinates[i].data.results[0].geometry.location;
                }
                console.log(coordinates); 
            }
        )
        return coordinates;
    }
    catch (err) {
        return err;
    }
}