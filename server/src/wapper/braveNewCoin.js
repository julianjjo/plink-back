import config from "../../config/wappers/configBraveNewCoin";


class BraveNewCoin {

    constructor(unirest) {
        this.unirest = unirest;
        this.config = config;
    }

    get(query, responseCallback){
        this.setMethod("GET");
        this.setQuery(query);
        this.setHeaders();
        this.req.end(responseCallback);
    }

    setMethod(method){
        this.req = this.unirest(method, this.config.url);
    }

    setQuery(query){
        this.req.query(query);
    }

    setHeaders(){
        this.req.headers({
            "x-rapidapi-host": "bravenewcoin-v1.p.rapidapi.com",
            "x-rapidapi-key": this.config.key
        });
    }
}

export default BraveNewCoin;
