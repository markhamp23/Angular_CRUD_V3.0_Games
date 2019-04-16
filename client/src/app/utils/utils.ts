export default class Utils {

    static setCookie(cname, cvalue, exhours) {
        var d = new Date();
        d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static deleteCookie(cname) {
        console.log("Borrant cookie: " + cname);
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    static toInstance<T>(obj: T, json: string): T {
        var jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }

    static getEdat(datanaix: Date) {
        var dob = datanaix;
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    static unionMap(map1: Map<string,string>, map2: Map<string,string>) : Map<string,string> {
        var resultMap : Map<string,string> = new Map<string,string>();
        if(map1){
            map1.forEach((value:string, key: string) => {
                resultMap.set(key,value);
            });
        }
        if(map2){
            map2.forEach((value:string, key: string) => {
                resultMap.set(key,value);
            });
        }
        return resultMap;   
    }

/*
    static scrollToTop() {
        var scrollStep = -window.scrollY / (1000 / 15),
            scrollInterval = setInterval(function () {
                if (window.scrollY != 0) {
                    window.scrollBy(0, scrollStep);
                }
                else clearInterval(scrollInterval);
            }, 15);
    }
*/
}